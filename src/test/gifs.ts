import * as fs from 'fs';

const pets: { [key: string]: { colors: string[]; states: string[] } } = {
    cat: {
        colors: ['black', 'brown', 'gray', 'lightbrown', 'white'],
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
        colors: ['white'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    clippy: {
        colors: ['black', 'brown', 'green', 'yellow'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
    },
    cockatiel: {
        colors: ['gray'],
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
    mod: {
        colors: ['purple'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast', 'with_ball'],
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

function checkGifFilenames(folder: string) {
    for (const pet in pets) {
        const allowedColors = pets[pet].colors;
        const allowedStates = pets[pet].states;
        if (!allowedColors) {
            console.error(`No colors found for pet "${pet}"`);
            return;
        }
        allowedColors.forEach((color) => {
            allowedStates.forEach((state) => {
                const filename = `${color}_${state}_8fps.gif`;
                const filePath = `${folder}/${pet}/${filename}`;
                if (!fs.existsSync(filePath)) {
                    // \x1b[31m is the ANSI escape code for red, and \x1b[0m resets the color back to the terminal's default.
                    console.error(
                        `\x1b[31mFile "${filePath}" does not exist.\x1b[0m`,
                    );
                    return false;
                } else {
                    console.log(`File "${filePath}" exists.`);
                }
            });
        });
    }
}

const mediaFolder = './media';
checkGifFilenames(mediaFolder);
