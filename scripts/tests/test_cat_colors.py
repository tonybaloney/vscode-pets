import base64
import copy
import importlib.util
import json
import struct
import tempfile
import unittest
from pathlib import Path
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location(
    "cat_colors", ROOT / "scripts" / "package-cat-colors.py")
tool = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(tool)


def gif_fixture(loop):
    header = b"GIF89a" + struct.pack("<HHBBB", 85, 80, 0x80, 0, 0)
    header += b"\0\0\0\xFF\xFF\xFF"
    if loop:
        header += b"\x21\xFF\x0BNETSCAPE2.0\x03\x01\0\0\0"
    # Clear before each literal keeps this tiny test encoder at a fixed width.
    codes = [value for _ in range(85 * 80) for value in (4, 1)] + [5]
    bits = sum(code << (3 * i) for i, code in enumerate(codes))
    payload = bits.to_bytes((len(codes) * 3 + 7) // 8, "little")
    blocks = b"".join(bytes([len(payload[i:i + 255])]) + payload[i:i + 255]
                      for i in range(0, len(payload), 255)) + b"\0"
    frame = (b"\x21\xF9\x04\x09\x0D\0\0\0\x2C" +
             struct.pack("<HHHHB", 0, 0, 85, 80, 0) + b"\x02" + blocks)
    return header + frame * 2 + b"\x3B"


def url(kind, data):
    return f"data:image/{kind};base64," + base64.b64encode(data).decode("ascii")


def review_fixture(catalog):
    poster = tool.rgba_png(85, 80, b"\xFF\xFF\xFF\xFF" * 85 * 80)
    gif_urls = {loop: url("gif", gif_fixture(loop)) for loop in (False, True)}
    return {
        "states": list(tool.STATES),
        "coats": [{"id": coat["reviewId"], "group": coat["group"]} for coat in catalog],
        "animations": [
            {"coat": coat["reviewId"], "state": state, "width": 85, "height": 80,
             "delays": [13, 13], "frames": 2,
             "gif": gif_urls[state not in tool.ONCE_STATES], "poster": url("png", poster)}
            for coat in catalog for state in tool.STATES
        ],
    }


class CatPackagingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.catalog = json.loads(tool.CATALOG.read_text(encoding="utf-8"))
        cls.review = review_fixture(cls.catalog)

    def test_only_fall_and_land_are_single_play(self):
        for state in tool.STATES:
            loop = state not in tool.ONCE_STATES
            metadata = tool.inspect_gif(gif_fixture(loop), state)
            self.assertEqual(metadata["loop"], loop)
            self.assertEqual(metadata["delays"], [13, 13])
            with self.assertRaisesRegex(ValueError, "repeat metadata"):
                tool.inspect_gif(gif_fixture(not loop), state)

    def test_rejects_malformed_gifs(self):
        for data in (b"not a GIF", gif_fixture(True)[:-1], gif_fixture(True) + b"extra"):
            with self.assertRaises((ValueError, struct.error)):
                tool.inspect_gif(data, "idle")

    def test_reads_only_the_embedded_review_data(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "index.html"
            path.write_text('<script id="review-data" type="application/json">' +
                            json.dumps({"states": ["idle"]}) + "</script>")
            self.assertEqual(tool.read_review(path), {"states": ["idle"]})
            path.write_text("<html>No embedded artwork</html>")
            with self.assertRaisesRegex(ValueError, "offline HTML"):
                tool.read_review(path)

    def test_generates_pixel_exact_centered_icons(self):
        original = b"\x25\x35\x45\xFF" * 85 * 80
        icon = tool.make_icon(tool.rgba_png(85, 80, original), (85, 80))
        width, height, pixels = tool.read_poster(icon)
        self.assertEqual((width, height), (32, 32))
        visible = [pixels[i:i + 4] for i in range(0, len(pixels), 4) if pixels[i + 3]]
        self.assertEqual(visible, [b"\x25\x35\x45\xFF"] * 17 * 16)
        self.assertEqual(pixels[(8 * 32 + 7) * 4:(8 * 32 + 8) * 4],
                         b"\x25\x35\x45\xFF")

    def test_rejects_changed_poster_dimensions_and_pixel_grid(self):
        poster = tool.rgba_png(85, 80, b"\xFF" * 85 * 80 * 4)
        with self.assertRaisesRegex(ValueError, "dimensions differ"):
            tool.make_icon(poster, (90, 80))
        pixels = bytearray(b"\xFF" * 85 * 80 * 4)
        pixels[4] = 0
        with self.assertRaisesRegex(ValueError, "pixel grid"):
            tool.make_icon(tool.rgba_png(85, 80, pixels), (85, 80))

    def test_rejects_poster_checksum_errors(self):
        poster = bytearray(tool.rgba_png(85, 80, b"\xFF" * 85 * 80 * 4))
        poster[-5] ^= 1
        with self.assertRaisesRegex(ValueError, "checksum"):
            tool.read_poster(poster)

    def test_packages_all_coats_without_overwriting_legacy_assets(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "cat-colors.zip"
            self.assertEqual(tool.package(self.review, self.catalog, output), (170, 17))
            first = output.read_bytes()
            tool.package(self.review, self.catalog, output)
            self.assertEqual(first, output.read_bytes())
            with ZipFile(output) as archive:
                names = archive.namelist()
                self.assertEqual(len(names), 188)
                self.assertEqual(len([name for name in names if name.endswith(".gif")]), 170)
                self.assertEqual(len([name for name in names if name.endswith(".png")]), 17)
                self.assertIn("cat/solid_white_idle_8fps.gif", names)
                self.assertIn("cat/blue_point_run_8fps.gif", names)
                for legacy in ("black", "brown", "gray", "lightbrown", "orange", "white"):
                    self.assertNotIn(f"cat/{legacy}_idle_8fps.gif", names)
                manifest = json.loads(archive.read("cat/coat-manifest.json"))
                self.assertEqual(len(manifest["animations"]), 170)

    def test_rejects_missing_or_duplicate_animation_entries(self):
        with tempfile.TemporaryDirectory() as directory:
            for duplicate in (False, True):
                review = copy.deepcopy(self.review)
                if duplicate:
                    review["animations"].append(review["animations"][0])
                else:
                    review["animations"].pop()
                with self.assertRaises((ValueError, KeyError)):
                    tool.package(review, self.catalog, Path(directory) / "bad.zip")

    def test_rejects_mismatched_metadata_and_wrong_generation_groups(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "bad.zip"
            review = copy.deepcopy(self.review)
            review["animations"][0]["delays"] = [12, 12]
            with self.assertRaisesRegex(ValueError, "metadata differs"):
                tool.package(review, self.catalog, output)
            review = copy.deepcopy(self.review)
            review["coats"][0]["group"] = "new-region-masks"
            with self.assertRaisesRegex(ValueError, "group differs"):
                tool.package(review, self.catalog, output)
            self.assertFalse(output.exists())

    def test_committed_bundle_contains_only_protected_new_coat_assets(self):
        expected = {"cat/coat-manifest.json"}
        for coat in self.catalog:
            prefix = coat["color"].replace(" ", "_")
            expected.add(f"cat/icon_{prefix}.png")
            for state in tool.STATES:
                expected.add(f"cat/{prefix}_{state}_8fps.gif")
        with ZipFile(ROOT / "media" / "cat-colors.zip") as archive:
            files = [entry for entry in archive.infolist() if not entry.is_dir()]
            self.assertEqual({entry.filename for entry in files}, expected)
            self.assertEqual(len(files), len(expected))
            self.assertTrue(all(entry.flag_bits & 1 for entry in files))


if __name__ == "__main__":
    unittest.main()
