// Encodes the artist-authored pixel grids without generating or resampling artwork.
// Requires ImageMagick 7. Run with npm run generate:finley-pixel.
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const media = join(
    dirname(dirname(fileURLToPath(import.meta.url))),
    'media',
    'finley',
);
const states = ['idle', 'walk', 'walk_fast', 'run', 'swipe', 'with_ball'];
const size = 32;
const scale = 4;

function check(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function record(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function magick(args, input) {
    return execFileSync('magick', args, { input, maxBuffer: 16 * 1024 * 1024 });
}

function readArtwork() {
    const data = JSON.parse(
        readFileSync(join(media, 'pixel-art.json'), 'utf8'),
    );
    check(
        data.width === size && data.height === size && data.baseline === 30,
        'Expected a 32x32 canvas with baseline 30.',
    );
    check(record(data.palette), 'Missing pixel palette.');
    const entries = Object.entries(data.palette);
    check(
        entries.length > 1 && entries.length <= 16,
        'Palette must contain 2-16 entries.',
    );
    const palette = new Map();
    for (const [symbol, hex] of entries) {
        check(
            symbol.length === 1 &&
                typeof hex === 'string' &&
                /^#[0-9a-f]{8}$/i.test(hex),
            `Invalid palette entry ${symbol}.`,
        );
        const rgba = Buffer.from(hex.slice(1), 'hex');
        check(
            rgba[3] === 0 || rgba[3] === 255,
            `Partial alpha in palette entry ${symbol}.`,
        );
        palette.set(symbol, rgba);
    }
    check(
        Array.from(palette.values()).filter((rgba) => rgba[3] === 0).length ===
            1,
        'The palette must contain exactly one transparent entry.',
    );
    check(record(data.sprites), 'Missing pixel sprites.');
    for (const [name, rows] of Object.entries(data.sprites)) {
        check(
            Array.isArray(rows) && rows.length > 0 && rows.length <= size,
            `Invalid height for sprite ${name}.`,
        );
        const width = rows[0]?.length;
        check(width > 0 && width <= size, `Invalid width for sprite ${name}.`);
        for (const row of rows) {
            check(
                typeof row === 'string' && row.length === width,
                `Nonrectangular pixel rows in ${name}.`,
            );
            for (const pixel of row) {
                check(
                    palette.has(pixel),
                    `Unknown palette entry ${pixel} in ${name}.`,
                );
            }
        }
    }
    check(
        record(data.animations) &&
            Object.keys(data.animations).sort().join(',') ===
                [...states].sort().join(','),
        'Expected exactly the six Finley animations.',
    );
    return { data, palette };
}

function compose(frame, data, palette, label) {
    check(
        record(frame) && Array.isArray(frame.layers) && frame.layers.length > 0,
        `Missing layers in ${label}.`,
    );
    const pixels = Buffer.alloc(size * size * 4);
    for (const layer of frame.layers) {
        check(
            record(layer) && Object.hasOwn(data.sprites, layer.sprite),
            `Unknown sprite in ${label}.`,
        );
        const rows = data.sprites[layer.sprite];
        check(
            Number.isInteger(layer.x) &&
                Number.isInteger(layer.y) &&
                layer.x >= 0 &&
                layer.y >= 0 &&
                layer.x + rows[0].length <= size &&
                layer.y + rows.length <= size,
            `Layer ${layer.sprite} lies outside ${label}.`,
        );
        rows.forEach((row, y) => {
            for (let x = 0; x < row.length; x++) {
                const color = palette.get(row[x]);
                if (color[3] !== 0) {
                    color.copy(
                        pixels,
                        ((y + layer.y) * size + x + layer.x) * 4,
                    );
                }
            }
        });
    }
    let opaque = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (pixels[(y * size + x) * 4 + 3]) {
                opaque++;
                check(
                    x > 0 && y > 0 && x < size - 1 && y <= data.baseline,
                    `Artwork touches the canvas border in ${label}.`,
                );
            }
        }
    }
    check(opaque > 0, `Empty pixel frame in ${label}.`);
    return pixels;
}

function enlarge(pixels) {
    const output = Buffer.alloc(size * scale * size * scale * 4);
    for (let y = 0; y < size * scale; y++) {
        for (let x = 0; x < size * scale; x++) {
            const from =
                (Math.floor(y / scale) * size + Math.floor(x / scale)) * 4;
            pixels.copy(output, (y * size * scale + x) * 4, from, from + 4);
        }
    }
    return output;
}

function samePixels(actual, expected) {
    if (actual.length !== expected.length) {
        return false;
    }
    for (let index = 0; index < expected.length; index += 4) {
        if (actual[index + 3] !== expected[index + 3]) {
            return false;
        }
        if (
            expected[index + 3] &&
            !actual
                .subarray(index, index + 3)
                .equals(expected.subarray(index, index + 3))
        ) {
            return false;
        }
    }
    return true;
}

function generate() {
    check(
        magick(['-version']).toString().includes('ImageMagick 7.'),
        'ImageMagick 7 is required.',
    );
    const { data, palette } = readArtwork();
    const rendered = new Map();
    for (const state of states) {
        const frames = data.animations[state]?.frames;
        check(
            Array.isArray(frames) &&
                frames.length >= 2 &&
                frames.length % 2 === 0,
            `${state} requires an even frame count of at least two.`,
        );
        const pixels = frames.map((frame, index) =>
            compose(frame, data, palette, `${state}[${index}]`),
        );
        check(
            pixels.some((frame) => !frame.equals(pixels[0])),
            `${state} must contain actual motion.`,
        );
        rendered.set(state, pixels);
    }
    check(
        !Buffer.concat(rendered.get('run')).equals(
            Buffer.concat(rendered.get('walk_fast')),
        ),
        'Sprint and fast walk must be different animations.',
    );
    const icon = compose(data.icon, data, palette, 'icon');
    const temporary = mkdtempSync(join(tmpdir(), 'finley-pixel-'));
    try {
        const palettePath = join(temporary, 'palette.png');
        magick(
            [
                '-size',
                `${palette.size}x1`,
                '-depth',
                '8',
                'rgba:-',
                '-strip',
                palettePath,
            ],
            Buffer.concat(Array.from(palette.values())),
        );
        const outputs = [];
        for (const [state, frames] of rendered) {
            const paths = frames.map((pixels, index) => {
                const file = join(temporary, `${state}-${index}.png`);
                magick(
                    [
                        '-size',
                        '128x128',
                        '-depth',
                        '8',
                        'rgba:-',
                        '-strip',
                        file,
                    ],
                    enlarge(pixels),
                );
                return file;
            });
            const filename = `blue_pixel_${state}_8fps.gif`;
            const output = join(temporary, filename);
            magick([
                '-dispose',
                'Background',
                ...paths.flatMap((file, index) => [
                    '-delay',
                    index % 2 === 0 ? '12' : '13',
                    file,
                ]),
                '+dither',
                '-remap',
                palettePath,
                '-loop',
                '0',
                '-strip',
                output,
            ]);
            const metadata = magick([
                'identify',
                '-format',
                '%w %h %T %[opaque] %D\\n',
                output,
            ])
                .toString()
                .trim()
                .split('\n');
            check(
                metadata.length === frames.length &&
                    metadata.every(
                        (line, index) =>
                            line ===
                            `128 128 ${
                                index % 2 === 0 ? 12 : 13
                            } False Background`,
                    ),
                `Invalid encoded frame dimensions, timing or transparency in ${filename}.`,
            );
            const decoded = magick([
                output,
                '-coalesce',
                '-depth',
                '8',
                'rgba:-',
            ]);
            const frameBytes = 128 * 128 * 4;
            check(
                decoded.length === frames.length * frameBytes,
                `Invalid decoded length for ${filename}.`,
            );
            frames.forEach((pixels, index) => {
                check(
                    samePixels(
                        decoded.subarray(
                            index * frameBytes,
                            (index + 1) * frameBytes,
                        ),
                        enlarge(pixels),
                    ),
                    `GIF encoding changed the authored pixels in ${state}[${index}].`,
                );
            });
            outputs.push(filename);
        }
        const iconName = 'icon_blue_pixel.png';
        const iconPath = join(temporary, iconName);
        magick(
            ['-size', '32x32', '-depth', '8', 'rgba:-', '-strip', iconPath],
            icon,
        );
        check(
            samePixels(magick([iconPath, '-depth', '8', 'rgba:-']), icon),
            'Icon pixels changed during encoding.',
        );
        outputs.push(iconName);
        for (const filename of outputs) {
            copyFileSync(join(temporary, filename), join(media, filename));
        }
        console.log(
            `Generated ${outputs.length} pixel Finley assets from authored grids.`,
        );
    } finally {
        rmSync(temporary, { recursive: true, force: true });
    }
}

try {
    generate();
} catch (error) {
    console.error('Failed to generate pixel Finley assets:', error);
    process.exitCode = 1;
}
