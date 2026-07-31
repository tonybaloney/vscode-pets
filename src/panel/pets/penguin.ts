import { PetColor, PetSize } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States, resolveState } from '../states';

const getRandomElement = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export class Penguin extends BasePetType {
    
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

    label = 'penguin';

    setAnimation(face: string) {
        const penguinAnimation = `${this.petRoot}/walkingpenguinFixed.gif`;
        if (this.spriteSource.endsWith('walkingpenguinFixed.gif')) {
            return;
        }
        this.spriteSource = penguinAnimation;
    }

    static possibleColors = [
        PetColor.black,
        PetColor.white,
        PetColor.blue,
        PetColor.yellow,
        PetColor.magical,
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
            return '🌟';
        }
        return '🐧';
    }

    get hello(): string {
        let response = Math.random() > 0.5 ? 'Squawk!' : 'Waddle waddle!';
        switch (this.name.toLowerCase()) {
            case 'pingu':
                response = 'Noot noot!';
                break;
            case 'skipper':
                response = 'Just smile and wave.';
                break;
            case 'kowalski':
                response = 'Analyze this!';
                break;
            case 'private':
                response = 'Cute little feet!';
                break;
            case 'rico':
                response = '*Clicks teeth*';
                break;
            case 'gunter':
                response = 'Meep meep!';
                break;
            case 'feathers':
                response = 'Slide on!';
                break;
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
        this.showSpeechBubble('Squawk!');
    }
}

export const PENGUIN_NAMES: ReadonlyArray<string> = [
    'Pingu',
    'Skipper',
    'Kowalski',
    'Private',
    'Rico',
    'Gunter',
    'Feathers',
    'Waddles',
    'Flipper',
    'Pepper',
    'Pip',
    'Pebble',
    'Porky',
    'Peewee',
    'Pablo',
    'Percy',
    'Peggy',
    'Paula',
    'Polly',
    'Penny',
];
