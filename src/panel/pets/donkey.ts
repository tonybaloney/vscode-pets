import { PetColor, PetSize } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States, resolveState } from '../states';

const getRandomElement = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export class Donkey extends BasePetType {
    constructor(
        spriteElement: HTMLImageElement,
        collisionElement: HTMLDivElement,
        speechElement: HTMLDivElement,
        size: PetSize,
        left: number,
        bottom: number,
        petRoot: string,
        floor: number,
        name: string,
        speed: number,
    ) {
        const petRootClean = petRoot.replace(' ', '_');
        super(
            spriteElement,
            collisionElement,
            speechElement,
            size,
            left,
            bottom,
            petRootClean,
            floor,
            name,
            speed,
        );
    }

    label = 'donkey';

    static possibleColors = [
        PetColor.brown,
        PetColor.white,
        PetColor.black,
        PetColor.socksbeige,
        PetColor.socksblack,
        PetColor.socksbrown,
        PetColor.paintbeige,
        PetColor.paintblack,
        PetColor.paintbrown,
        PetColor.magical,
        PetColor.warrior,
    ];

    sequence = {
        startingState: States.standRight,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight],
            },
            {
                state: States.standRight,
                possibleNextStates: [
                    States.walkRight,
                    States.walkRight,
                    States.walkLeft,
                    States.standRight,
                ],
            },
            {
                state: States.standLeft,
                possibleNextStates: [
                    States.walkRight,
                    States.walkLeft,
                    States.walkLeft,
                    States.standLeft,
                ],
            },
            {
                state: States.walkRight,
                possibleNextStates: [
                    States.walkLeft,
                    States.runRight,
                    States.runLeft,
                    States.standRight,
                    States.standRight,
                    States.standRight,
                ],
            },
            {
                state: States.runRight,
                possibleNextStates: [
                    States.walkRight,
                    States.walkRight,
                    States.runLeft,
                ],
            },
            {
                state: States.walkLeft,
                possibleNextStates: [
                    States.walkRight,
                    States.runLeft,
                    States.runRight,
                    States.standLeft,
                    States.standLeft,
                    States.standLeft,
                ],
            },
            {
                state: States.runLeft,
                possibleNextStates: [
                    States.walkLeft,
                    States.walkLeft,
                    States.runRight,
                ],
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.swipe,
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [
                    States.runRight,
                    States.runLeft,
                    States.standRight,
                    States.standLeft,
                ],
            },
        ],
    };

    get emoji(): string {
        if (this.petRoot.endsWith('magical')) {
            return '🦄';
        }
        if (this.petRoot.endsWith('warrior')) {
            return getRandomElement(['🪓', '🗡️', '🪚', '🛡️', '🧨']);
        }
        return '🐴';
    }

    get hello(): string {
        let response = Math.random() > 0.5 ? 'Hee-haw!' : 'Need a lift?';
        switch (this.name.toLowerCase()) {
            case 'eeyore':
                response = "Oh, bother. I'm here.";
                break;
            case 'donkey':
                response = 'I am SHREK, wait… no, I am Donkey!';
                break;
            case 'burro':
                response = 'Burro says hello!';
                break;
            case 'jack':
                response = 'Jack of all donkeys, master of none.';
                break;
            case 'jenny':
                response = 'Jenny sees everything.';
                break;
            case 'muley':
                response = 'Muley muley kinda funny.';
                break;
            case 'doc':
                response = "I'm as stubborn as they come.";
                break;
        }
        if (this.petRoot.endsWith('warrior')) {
            response = response.toUpperCase();
        }
        if (this.petRoot.endsWith('magical')) {
            return `✨ ${response} ✨`;
        }
        return response;
    }

    swipe() {
        if (this.currentStateEnum === States.swipe) {
            return;
        }
        this.holdState = this.currentState;
        this.holdStateEnum = this.currentStateEnum;
        this.currentStateEnum = States.swipe;
        this.currentState = resolveState(this.currentStateEnum, this);
        this.showSpeechBubble('Hee-haw!');
    }
}

export const DONKEY_NAMES: ReadonlyArray<string> = [
    'Eeyore',
    'Donkey',
    'Burro',
    'Jenny',
    'Jack',
    'Muley',
    'Doc',
    'Hee-Haw',
    'Brock',
    'Neddy',
    'Rosita',
    'Lola',
    'Marshal',
    'Buddy',
    'Dusty',
    'Clover',
    'Duke',
    'Magnum',
    'Paco',
    'Sage',
];
