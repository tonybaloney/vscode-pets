// Requires ImageMagick 7 on PATH. Run with npm run generate:finley.
// Artwork provenance and license are in media/finley/source.svg and LICENSE.
import { Resvg } from '@resvg/resvg-js';
import { execFileSync } from 'node:child_process';
import {
    copyFileSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const media = join(root, 'media', 'finley');
const source = readFileSync(join(media, 'source.svg'), 'utf8');
const animations = {
    idle: 24,
    walk: 8,
    walk_fast: 4,
    run: 4,
    swipe: 12,
    with_ball: 16,
};

function magick(args) {
    return execFileSync('magick', args, { encoding: 'utf8' });
}

function attribute(svg, id, name, value) {
    const pattern = new RegExp(`(<g id="${id}"[^>]*\\b${name}=")[^"]*(")`);
    if (!pattern.test(svg)) {
        throw new Error(`Missing ${name} on SVG group ${id}`);
    }
    return svg.replace(
        pattern,
        (_match, before, after) => before + value + after,
    );
}

function number(value) {
    return value.toFixed(4);
}

function frame(state, index, count) {
    const phase = (index / count) * Math.PI * 2;
    let svg = source;
    let pose;
    if (state === 'walk' || state === 'walk_fast' || state === 'run') {
        const running = state !== 'walk';
        const stride = Math.sin(phase);
        const bounce = (1 - Math.cos(phase * 2)) * (running ? 0.8 : 0.3);
        const tilt = (running ? 5 : 0) + stride * 3;
        pose = `translate(0 ${number(-bounce)}) rotate(${number(tilt)} 24 36)`;
        for (const [id, x, direction] of [
            ['left-foot', 19, 1],
            ['right-foot', 30, -1],
        ]) {
            const step = stride * direction;
            const lift = Math.max(0, step) * (running ? 2 : 1);
            svg = attribute(
                svg,
                id,
                'transform',
                `translate(0 ${number(-lift)}) rotate(${number(
                    step * (running ? 30 : 18),
                )} ${x} 34)`,
            );
        }
        svg = attribute(
            svg,
            'hand',
            'transform',
            `rotate(${number(stride * 14)} 34 29)`,
        );
    } else {
        const scale = 1 + (1 - Math.cos(phase)) * 0.02;
        pose = `translate(24 36) scale(${number(scale)}) translate(-24 -36)`;
    }
    if (state === 'swipe') {
        svg = attribute(
            svg,
            'hand',
            'transform',
            `rotate(${number(-100 + Math.cos(phase * 3) * 30)} 34 29)`,
        );
    }
    if (state === 'with_ball') {
        svg = attribute(svg, 'hand', 'opacity', '0');
        svg = attribute(svg, 'ball', 'opacity', '1');
    }
    return attribute(svg, 'character', 'transform', pose);
}

function generate() {
    const version = magick(['-version']);
    if (!version.includes('ImageMagick 7.')) {
        throw new Error('Finley asset generation requires ImageMagick 7.');
    }
    const temporary = mkdtempSync(join(tmpdir(), 'vscode-pets-finley-'));
    try {
        const frames = new Map();
        for (const [state, count] of Object.entries(animations)) {
            const paths = [];
            for (let index = 0; index < count; index++) {
                const pngPath = join(temporary, `${state}-${index}.png`);
                const renderer = new Resvg(frame(state, index, count));
                writeFileSync(pngPath, renderer.render().asPng());
                paths.push(pngPath);
            }
            frames.set(state, paths);
        }

        const palette = join(temporary, 'palette.png');
        magick([
            ...Array.from(frames.values()).flat(),
            '-channel',
            'A',
            '-threshold',
            '50%',
            '+channel',
            '-append',
            '+dither',
            '-colors',
            '256',
            '-unique-colors',
            palette,
        ]);
        const outputs = [];
        for (const [state, paths] of frames) {
            const filename = `blue_${state}_8fps.gif`;
            const output = join(temporary, filename);
            const inputs = paths.flatMap((path, index) => [
                '-delay',
                String(index % 2 === 0 ? 12 : 13),
                path,
            ]);
            magick([
                '-dispose',
                'Background',
                ...inputs,
                '-channel',
                'A',
                '-threshold',
                '50%',
                '+channel',
                '+dither',
                '-remap',
                palette,
                '-loop',
                '0',
                '-strip',
                output,
            ]);
            const metadata = magick([
                'identify',
                '-format',
                '%w %h %T %[opaque]\\n',
                output,
            ])
                .trim()
                .split('\n');
            if (
                metadata.length !== paths.length ||
                metadata.some(
                    (line, index) =>
                        line !== `128 128 ${index % 2 === 0 ? 12 : 13} False`,
                )
            ) {
                throw new Error(
                    `Invalid frame dimensions, timing or transparency: ${filename}`,
                );
            }
            outputs.push(filename);
        }
        magick([
            join(temporary, 'idle-0.png'),
            '-trim',
            '+repage',
            '-resize',
            '28x28',
            '-background',
            'none',
            '-gravity',
            'center',
            '-extent',
            '32x32',
            '-strip',
            join(temporary, 'icon.png'),
        ]);
        outputs.push('icon.png');
        for (const filename of outputs) {
            copyFileSync(join(temporary, filename), join(media, filename));
        }
        console.log(`Generated ${outputs.length} Finley assets.`);
    } finally {
        rmSync(temporary, { recursive: true, force: true });
    }
}

try {
    generate();
} catch (error) {
    console.error('Failed to generate Finley assets:', error);
    process.exitCode = 1;
}
