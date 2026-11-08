import * as fs from 'fs';
import * as path from 'path';
import { Entry, open } from 'yauzl';
import { Cat } from '../panel/pets/cat';

const pets: { [key: string]: { colors: string[]; states: string[] } } = {
    bat: {
        colors: ['black'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    bunny: {
        colors: ['white', 'purple', 'gray'],
        states: [
            'lie',
            'idle',
            'run',
            'swipe',
            'walk',
            'walk_fast',
            'with_ball',
            'stand',
        ],
    },
    cat: {
        colors: Cat.possibleColors,
        states: [
            'fall_from_grab',
            'idle',
            'land',
            'run',
            'swipe',
            'walk',
            'walk_fast',
            'wallclimb',
            'wallgrab',
            'with_ball',
        ],
    },
    chicken: {
        colors: ['white', 'brown', 'gray'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    morph: {
        colors: ['purple'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    clippy: {
        colors: ['black', 'brown', 'green', 'yellow'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    cockatiel: {
        colors: ['gray', 'brown', 'whiteface', 'piedpearl'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    crab: {
        colors: ['red'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    deno: {
        colors: ['green'],
        states: ['idle', 'run', 'swipe', 'walk', 'with_ball'],
    },
    finley: {
        colors: ['blue'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    dog: {
        colors: ['black', 'brown', 'red', 'white', 'akita'],
        states: [
            'idle',
            'lie',
            'run',
            'swipe',
            'walk',
            'walk_fast',
            'with_ball',
        ],
    },
    fox: {
        colors: ['red', 'white'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    frog: {
        colors: ['green'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    mod: {
        colors: ['purple'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    panda: {
        colors: ['black', 'brown'],
        states: [
            'idle',
            'lie',
            'run',
            'swipe',
            'walk',
            'walk_fast',
            'with_ball',
        ],
    },
    rocky: {
        colors: ['gray'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast'],
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'rubber-duck': {
        colors: ['yellow'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    snail: {
        colors: ['brown'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    snake: {
        colors: ['green'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    totoro: {
        colors: ['gray'],
        states: [
            'fall_from_grab',
            'idle',
            'jump',
            'land',
            'lie',
            'run',
            'swipe',
            'walk',
            'wallclimb',
            'wallgrab',
            'with_ball',
        ],
    },
    zappy: {
        colors: ['yellow'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    rat: {
        colors: ['gray', 'white', 'brown'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    raccoon: {
        colors: ['gray', 'gray_jimothy'],
        states: ['idle', 'run', 'swipe', 'walk', 'with_ball', 'lie'],
    },
    turtle: {
        colors: ['green', 'orange'],
        states: ['idle', 'run', 'walk', 'lie', 'with_ball'],
    },
    horse: {
        colors: [
            'brown',
            'white',
            'black',
            'socks_beige',
            'socks_black',
            'socks_brown',
            'paint_beige',
            'paint_black',
            'paint_brown',
            'magical',
            'warrior',
        ],
        states: [
            'idle',
            'run',
            'swipe',
            'walk',
            'walk_fast',
            'with_ball',
            'stand',
        ],
    },
};

export function checkGifFilenames(
    fileExists: (filename: string) => boolean,
    logger: Pick<Console, 'error' | 'warn'> = console,
): boolean {
    let valid = true;
    for (const pet in pets) {
        const allowedColors = pets[pet].colors;
        const allowedStates = pets[pet].states;
        for (const color of allowedColors) {
            for (const state of allowedStates) {
                const filename = `${color}_${state}_8fps.gif`;
                const filePath = `${pet}/${filename}`;
                if (!fileExists(filePath)) {
                    // \x1b[31m is the ANSI escape code for red, and \x1b[0m resets the color back to the terminal's default.
                    logger.error(
                        `\x1b[31mFile "${filePath}" does not exist.\x1b[0m`,
                    );
                    valid = false;
                }
            }

            // Check icon as well
            const iconFilename = `icon_${color}.png`;
            const iconFilePath = `${pet}/${iconFilename}`;
            if (!fileExists(iconFilePath)) {
                if (fileExists(`${pet}/icon.png`)) {
                    logger.warn(
                        `\x1b[33mNo icon found for "${pet}" with color "${color}". Using default icon.\x1b[0m`,
                    );
                } else {
                    logger.error(
                        `\x1b[31mFile "${iconFilePath}" and "${pet}/icon.png" do not exist.\x1b[0m`,
                    );
                    valid = false;
                }
            }
        }
    }
    return valid;
}

export async function readArchivedFiles(folder: string): Promise<Set<string>> {
    const files = new Set<string>();
    for (const filename of ['extra.zip', 'extraIcons.zip']) {
        const archivePath = path.join(folder, filename);
        if (!fs.existsSync(archivePath)) {
            continue;
        }
        await new Promise<void>((resolve, reject) => {
            open(archivePath, { lazyEntries: true }, (error, archive) => {
                if (error || !archive) {
                    reject(
                        new Error(
                            `Cannot read "${archivePath}": ${
                                error?.message ?? 'ZIP directory unavailable'
                            }`,
                        ),
                    );
                    return;
                }
                archive.on('error', reject);
                archive.on('end', resolve);
                archive.on('entry', (entry: Entry) => {
                    if (!entry.fileName.endsWith('/')) {
                        files.add(entry.fileName);
                    }
                    archive.readEntry();
                });
                archive.readEntry();
            });
        });
    }
    return files;
}

async function main(): Promise<void> {
    const mediaFolder = './media';
    // ZIP directories expose filenames without decrypting the protected artwork.
    const archivedFiles = await readArchivedFiles(mediaFolder);
    const valid = checkGifFilenames(
        (filename) =>
            fs.existsSync(path.join(mediaFolder, filename)) ||
            archivedFiles.has(filename),
    );
    if (!valid) {
        process.exitCode = 1;
    }
}

if (require.main === module) {
    void main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
