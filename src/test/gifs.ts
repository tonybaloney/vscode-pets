import * as fs from 'fs';

const pets = [
    'cat',
    'chicken',
    'clippy',
    'cockatiel',
    'crab',
    'dog',
    'fox',
    'mod',
    'rocky',
    'rubber-duck',
    'snake',
    'totoro',
    'zappy',
];

const colors = [
    'red',
    'white',
    'purple',
    'gray',
    'yellow',
    'green',
    'black',
    'brown',
    'lightbrown',
];
const states = [
    'idle',
    'run',
    'swipe',
    'land',
    'walk',
    'walk_fast',
    'wallclimb',
    'wallgrab',
    'with_ball',
    'fall_from_grab',
    'jump',
    'lie',
];

const fps = ['8fps'];

const gifFilenamePattern = new RegExp(
    `^(${colors.join('|')})_(${states.join('|')})_(${fps.join('|')}).gif$`,
);

function checkGifFilenames(folder: string) {
    const filenames = fs.readdirSync(folder);
    filenames.forEach((filename) => {
        if (pets.includes(filename)) {
            const petFolder = `${folder}/${filename}`;
            const petFilenames = fs.readdirSync(petFolder);
            petFilenames.forEach((petFilename) => {
                if (
                    petFilename.endsWith('.gif') &&
                    !gifFilenamePattern.test(petFilename)
                ) {
                    console.error(
                        `Filename "${petFilename}" does not match pattern in folder ${petFolder}. The pattern should be petColor_petState_8fps.gif.`,
                    );
                }
            });
        }
    });
}

const mediaFolder = './media';
checkGifFilenames(mediaFolder);
