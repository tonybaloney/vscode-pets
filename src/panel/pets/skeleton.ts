import { PetColor, PetSize } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States, resolveState } from '../states';

const getRandomElement = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export class Skeleton extends BasePetType {
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
        // Replace spaces with underscores
        // Keeps file names consistent
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
    label = 'skeleton';
    static possibleColors = [
        PetColor.white,
        PetColor.brown,
        PetColor.blue,
        PetColor.pink,
        PetColor.yellow,
        PetColor.green,
        PetColor.red,
        PetColor.orange,
        PetColor.warrior,
    ];
    sequence = {
        startingState: States.standRight,
        sequenceStates: [
            {
                state: States.sitIdle,
                // Only on first adding the skeleton
                possibleNextStates: [States.walkRight],
            },
            {
                state: States.standRight,
                // Can start walking either direction (twice as likely to keep going right), or just keep standing
                possibleNextStates: [
                    States.walkRight,
                    States.walkRight,
                    States.walkLeft,
                    States.standRight,
                ],
            },
            {
                state: States.standLeft,
                // Can start walking either direction (twice as likely to keep going left), or just keep standing
                possibleNextStates: [
                    States.walkRight,
                    States.walkLeft,
                    States.walkLeft,
                    States.standLeft,
                ],
            },
            {
                state: States.walkRight,
                // Can switch directions or stand still
                possibleNextStates: [States.walkLeft, States.standRight],
            },
            {
                state: States.walkLeft,
                // Can switch directions or stand still
                possibleNextStates: [States.walkRight, States.standLeft],
            },
            {
                state: States.chase,
                // After the chase, the skeleton has the ball!
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.swipe,
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.idleWithBall,
                // Can go back to walking
                possibleNextStates: [States.walkRight, States.walkLeft],
            },
        ],
    };
    get emoji(): string {
        if (this.name.toLowerCase() === 'beau') {
            return '🤡';
        }
        if (this.petRoot.endsWith('warrior')) {
            return getRandomElement(['🗡️', '🏴‍☠️', '⚔️']);
        }
        return '💀';
    }
    get hello(): string {
        let response = 'Bone to be Wild!';
        switch (this.name.toLowerCase()) {
            case 'crypt keeper':
                response = 'Hello, kiddies!';
                break;
            case 'hugo':
                response = "I'm the world's laziest skeleton!";
                break;
            case 'skeletor':
                response = 'I have the power!';
                break;
            case 'jack skellington':
                response = 'Eureka! Merry Christmas!';
                break;
            case 'scorpion':
                response = 'Get over here!';
                break;
            case 'walter donovan':
                response = 'Choose wisely.';
                break;
        }
        if (this.petRoot.endsWith('warrior')) {
            response = response.toUpperCase();
        }
        if (this.name.toLowerCase() === 'warner') {
            return `💜 ${response} 🧡`;
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
        this.showSpeechBubble(
            this.petRoot.endsWith('orange')
                ? '🎃'
                : this.petRoot.endsWith('warrior')
                ? '🏴‍☠️'
                : '☠️',
        );
    }

    chooseNextState(fromState: States): States {
        const nextState = super.chooseNextState(fromState);
        if (this.name.toLowerCase() === 'debug') {
            console.log(`${this.label}-> \x1b[1m${nextState}\x1b[0m`);
        }
        return nextState;
    }
}

export const SKELETON_NAMES: ReadonlyArray<string> = [
    'Sans', //Undertale
    'Papyrus', //Undertale
    'Red Skull', //Marvel
    'Ghost Rider', //Marvel
    'Skeletor', //He-Man
    'Jack Skellington', //Nightmare Before Christmas
    'Grim', //Grim Adventures of Billy and Mandy
    'Brook', //One Piece
    'Bonejangles', //Corpse Bride
    'Smitty Werbenjagermanjensen', //SpongeBob
    'The Lich', //Adventure Time
    'Crypt Keeper', //Tales from the Crypt
    'Scorpion', //Mortal Kombat
    'Eddie', //Iron Maiden
    'Mister Bones', //DC
    'Imhotep', //The Mummy
    'Nito', //Dark Souls
    'Spinal', //Killer Instinct
    'Geoff Peterson', //The Late Late Show with Craig Ferguson
    'Horrorman', //Anpanman
    'Baron Samedi', //James Bond
    'Skelly',
    'Yorick', //Hamlet
    'Lucy',
    'Hugo',
    'The Horned King', //The Black Cauldron
    'Walter Donovan', //Indiana Jones and the Last Crusade
    'Sherlock Bones',
    'Napolean Bone-aparte',
    'Skellyman',
];
