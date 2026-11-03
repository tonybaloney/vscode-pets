"""Package approved review GIFs and matching icons without committing loose assets.

Requires Python 3.10+ and only its standard library. The input is the offline
HTML matrix containing review-data, including its embedded GIFs and PNG posters.
"""

import argparse
import base64
import hashlib
import json
import struct
import zlib
from html.parser import HTMLParser
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo


STATES = (
    "idle", "walk", "walk_fast", "run", "swipe", "with_ball",
    "wallclimb", "wallgrab", "fall_from_grab", "land",
)
ONCE_STATES = frozenset(("fall_from_grab", "land"))
CATALOG = Path(__file__).resolve().parents[1] / "media" / "cat-colors.json"


class ReviewParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.capture = False
        self.parts = []
        self.found = False

    def handle_starttag(self, tag, attrs):
        if tag == "script" and dict(attrs).get("id") == "review-data":
            if self.found:
                raise ValueError("Multiple review-data scripts")
            self.found = self.capture = True

    def handle_endtag(self, tag):
        if tag == "script":
            self.capture = False

    def handle_data(self, data):
        if self.capture:
            self.parts.append(data)


def read_review(file):
    parser = ReviewParser()
    parser.feed(Path(file).read_text(encoding="utf-8"))
    if not parser.found:
        raise ValueError("Input must be the offline HTML animation matrix")
    return json.loads("".join(parser.parts))


def image_data(value, kind):
    prefix = f"data:image/{kind};base64,"
    if not value.startswith(prefix):
        raise ValueError(f"Expected an embedded {kind} image")
    return base64.b64decode(value[len(prefix):], validate=True)


def inspect_gif(data, state):
    if data[:6] not in (b"GIF87a", b"GIF89a"):
        raise ValueError("Invalid GIF header")
    width, height, packed = struct.unpack_from("<HHB", data, 6)
    if not 0 < width <= 512 or not 0 < height <= 512:
        raise ValueError("Unexpected cat canvas dimensions")
    pos = 13 + (3 * (1 << ((packed & 7) + 1)) if packed & 128 else 0)
    delays, loops = [], []
    control = None

    def take(count):
        nonlocal pos
        if pos + count > len(data):
            raise ValueError("Truncated GIF")
        value = data[pos:pos + count]
        pos += count
        return value

    def blocks():
        result = []
        while True:
            count = take(1)[0]
            if not count:
                return result
            result.append(take(count))

    while pos < len(data):
        tag = take(1)[0]
        if tag == 59:
            if pos != len(data) or len(delays) < 2:
                raise ValueError("Invalid GIF trailer or missing animation")
            expected = [] if state in ONCE_STATES else [0]
            if loops != expected:
                raise ValueError(f"Incorrect repeat metadata for {state}")
            return {"width": width, "height": height, "delays": delays,
                    "loop": state not in ONCE_STATES}
        if tag == 33:
            label = take(1)[0]
            payload = blocks()
            if label == 249:
                if len(payload) != 1 or len(payload[0]) != 4:
                    raise ValueError("Invalid frame control")
                flags, delay, transparent = struct.unpack("<BHB", payload[0])
                if not flags & 1 or not delay:
                    raise ValueError("Cat frames must have transparency and a delay")
                control = delay
            elif label == 255 and payload and payload[0] in (
                    b"NETSCAPE2.0", b"ANIMEXTS1.0"):
                if len(payload) != 2 or len(payload[1]) != 3 or payload[1][0] != 1:
                    raise ValueError("Invalid repeat extension")
                loops.append(int.from_bytes(payload[1][1:], "little"))
        elif tag == 44:
            left, top, fw, fh, flags = struct.unpack("<HHHHB", take(9))
            if not fw or not fh or left + fw > width or top + fh > height:
                raise ValueError("Frame lies outside GIF canvas")
            if control is None:
                raise ValueError("Missing frame control")
            delays.append(control)
            control = None
            if flags & 128:
                take(3 * (1 << ((flags & 7) + 1)))
            if not 2 <= take(1)[0] <= 8 or not blocks():
                raise ValueError("Invalid image data")
        else:
            raise ValueError(f"Unknown GIF block {tag}")
    raise ValueError("Missing GIF trailer")


def png_chunk(kind, payload):
    return (struct.pack(">I", len(payload)) + kind + payload +
            struct.pack(">I", zlib.crc32(kind + payload)))


def rgba_png(width, height, pixels):
    if len(pixels) != width * height * 4:
        raise ValueError("Invalid RGBA buffer")
    rows = b"".join(b"\0" + pixels[y * width * 4:(y + 1) * width * 4]
                    for y in range(height))
    return (b"\x89PNG\r\n\x1a\n" +
            png_chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)) +
            png_chunk(b"IDAT", zlib.compress(rows, 9)) + png_chunk(b"IEND", b""))


def read_poster(data):
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError("Invalid PNG poster")
    pos, compressed, header = 8, bytearray(), None
    ended = False
    while pos < len(data):
        if pos + 12 > len(data):
            raise ValueError("Truncated PNG chunk")
        length = struct.unpack_from(">I", data, pos)[0]
        kind = data[pos + 4:pos + 8]
        end = pos + 8 + length
        if end + 4 > len(data):
            raise ValueError("Truncated PNG payload")
        payload = data[pos + 8:end]
        if zlib.crc32(kind + payload) != struct.unpack_from(">I", data, end)[0]:
            raise ValueError("PNG checksum mismatch")
        pos = end + 4
        if kind == b"IHDR":
            header = struct.unpack(">IIBBBBB", payload)
        elif kind == b"IDAT":
            compressed.extend(payload)
        elif kind == b"IEND":
            ended = True
            break
    if not ended or pos != len(data) or header is None:
        raise ValueError("Incomplete PNG poster")
    width, height, depth, kind, compression, filtering, interlace = header
    if (depth, kind, compression, filtering, interlace) != (8, 6, 0, 0, 0):
        raise ValueError("Expected the review matrix's unfiltered RGBA poster")
    if not 0 < width <= 512 or not 0 < height <= 512:
        raise ValueError("Unexpected PNG dimensions")
    raw = zlib.decompress(compressed)
    stride = width * 4 + 1
    if len(raw) != stride * height or any(raw[y * stride] for y in range(height)):
        raise ValueError("Expected unfiltered review poster rows")
    return width, height, b"".join(
        raw[y * stride + 1:(y + 1) * stride] for y in range(height))


def make_icon(poster, canvas):
    width, height, pixels = read_poster(poster)
    if (width, height) != canvas:
        raise ValueError("Poster and GIF dimensions differ")
    occupied = [(x, y) for y in range(height) for x in range(width)
                if pixels[(y * width + x) * 4 + 3]]
    if not occupied:
        raise ValueError("Empty sitting pose")
    left = min(x for x, y in occupied)
    top = min(y for x, y in occupied)
    sprite_width = max(x for x, y in occupied) - left + 1
    sprite_height = max(y for x, y in occupied) - top + 1
    if (sprite_width, sprite_height) != (85, 80):
        raise ValueError("Expected the 17x16 sitting-pose pixel grid")
    cols, rows = sprite_width // 5, sprite_height // 5
    icon = bytearray(32 * 32 * 4)
    for y in range(rows):
        for x in range(cols):
            start = ((top + y * 5) * width + left + x * 5) * 4
            color = pixels[start:start + 4]
            for dy in range(5):
                for dx in range(5):
                    sample = ((top + y * 5 + dy) * width + left + x * 5 + dx) * 4
                    if pixels[sample:sample + 4] != color:
                        raise ValueError("Sitting pose is not on the original pixel grid")
            target = (((32 - rows) // 2 + y) * 32 + (32 - cols) // 2 + x) * 4
            icon[target:target + 4] = color
    return rgba_png(32, 32, icon)


def package(review, catalog, output):
    if set(review["states"]) != set(STATES) or len(review["states"]) != len(STATES):
        raise ValueError("Review does not contain the ten cat animation states")
    animations = {}
    for animation in review["animations"]:
        key = (animation["coat"], animation["state"])
        if key in animations:
            raise ValueError(f"Duplicate animation: {key}")
        animations[key] = animation
    coats = {coat["id"]: coat for coat in review["coats"]}
    files, manifest = {}, []
    colors = set()
    for coat in catalog:
        color, review_id = coat["color"], coat["reviewId"]
        if color in colors or not color.replace(" ", "").isalpha():
            raise ValueError(f"Invalid or duplicate color: {color}")
        colors.add(color)
        if coats[review_id]["group"] != coat["group"]:
            raise ValueError(f"Generation group differs for {color}")
        prefix = color.replace(" ", "_")
        canvas, poster = None, None
        for state in STATES:
            animation = animations[(review_id, state)]
            data = image_data(animation["gif"], "gif")
            metadata = inspect_gif(data, state)
            if (metadata["width"], metadata["height"], metadata["delays"]) != (
                    animation["width"], animation["height"], animation["delays"]):
                raise ValueError(f"Review metadata differs for {color}/{state}")
            if len(metadata["delays"]) != animation["frames"]:
                raise ValueError(f"Frame count differs for {color}/{state}")
            name = f"cat/{prefix}_{state}_8fps.gif"
            files[name] = data
            manifest.append({"file": name, "group": coat["group"],
                             "sha256": hashlib.sha256(data).hexdigest(), **metadata})
            if state == "idle":
                canvas = metadata["width"], metadata["height"]
                poster = image_data(animation["poster"], "png")
        files[f"cat/icon_{prefix}.png"] = make_icon(poster, canvas)
    files["cat/coat-manifest.json"] = (
        json.dumps({"coats": catalog, "animations": manifest}, indent=2) + "\n"
    ).encode("utf-8")
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = output.with_name(output.name + ".tmp")
    try:
        with ZipFile(temporary, "w", ZIP_DEFLATED) as archive:
            for name, data in sorted(files.items()):
                entry = ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
                entry.compress_type = ZIP_DEFLATED
                entry.external_attr = 0o644 << 16
                archive.writestr(entry, data)
        temporary.replace(output)
    finally:
        temporary.unlink(missing_ok=True)
    return len(manifest), len(catalog)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("review", type=Path, help="Approved offline HTML animation matrix")
    parser.add_argument("--output", type=Path, default=Path(".build-out/cat-colors.zip"))
    args = parser.parse_args()
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    gifs, icons = package(read_review(args.review), catalog, args.output)
    print(f"Packaged {gifs} GIFs and {icons} icons into {args.output}")


if __name__ == "__main__":
    main()
