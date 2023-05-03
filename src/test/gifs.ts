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
    dog: {
        colors: ['black', 'brown', 'red', 'white'],
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'stick-bug': {
        colors: ['green'],
        states: ['idle', 'run', 'swipe', 'walk', 'walk_fast'],
    },
    cbat: {
        colors: ['white'],
        states: ['idle', 'run', 'walk'],
    },
    chud: {
        colors: ['white'],
        states: ['idle', 'run', 'walk'],
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
                    console.error(`File "${filePath}" does not exist.`);
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
