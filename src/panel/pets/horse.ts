import { PetColor, PetSize } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States, resolveState } from '../states';

const getRandomElement = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export class Horse extends BasePetType {
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
    label = 'horse';
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
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.runRight],
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft, States.runLeft],
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft],
            },
            {
                state: States.walkLeft,
                possibleNextStates: [
                    States.sitIdle,
                    States.walkRight,
                    States.runRight,
                ],
            },
            {
                state: States.runLeft,
                possibleNextStates: [
                    States.sitIdle,
                    States.walkRight,
                    States.runRight,
                ],
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [
                    States.walkRight,
                    States.walkLeft,
                    States.runLeft,
                    States.runRight,
                ],
            },
        ],
    };
    get emoji(): string {
        if (this.petRoot.endsWith('magical')) {
            return '🦄';
        }
        if (this.name.toLowerCase() === 'beau') {
            return '🤡';
        }
        if (this.petRoot.endsWith('warrior')) {
            return getRandomElement(['🗡️', '🪓', '🔪', '💣', '🧨']);
        }
        return '🐴';
    }
    get hello(): string {
        let response = Math.random() > 0.5 ? `Neigh!` : `Neigh?`;
        switch (this.name.toLowerCase()) {
            case 'artax':
                response = 'Swamps of Sadness? No thanks!';
                break;
            case 'hugo':
                response = "I'm the world's laziest horse!";
                break;
            case 'james baxter':
                response = 'James Baxter! James... Baxter!';
                break;
            case 'jimison':
                response = 'Son of Jimmy!';
                break;
            case 'mister ed':
            case 'mr. ed':
                response = 'Hello, Wilbur!';
                break;
            case 'mr. horse':
                response = "No sir, I don't like it.";
                break;
            case 'pony soprano':
            case 'tony the pony':
                response = 'Fuggedaboutit!';
                break;
            case 'vigo horsenberg':
            case 'tiny horse jr.':
            case 'ol jethro':
                response = 'To battle!';
                break;
            case 'shadowfax':
                response = 'I am Shadowfax, lord of all horses!';
                break;
            case 'silver':
                response = 'Hi ho, Silver!';
                break;
        }
        if (this.petRoot.endsWith('warrior')) {
            response = response.toUpperCase();
        }
        if (this.petRoot.endsWith('magical')) {
            return `🌈 ${response} ✨`;
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
        this.showSpeechBubble('Neigh!');
    }
}

export const TINYHORSE_NAMES: ReadonlyArray<string> = [
    'Tiny Horse jr.',
    'Mister Ed',
    'Tony the Pony',
    'Vigo Horsenberg',
    'Ol Jetrho',
    'Pony Soprano',
    'Hugo',
    'Jimison',
    'Copper',
    'Lightning',
    'Pilgrim',
    'Thunder',
    'Buddy',
    'Rusty',
    'Smokey',
    'Tennessee Stud',
    'Duke',
    'Tumbleweed',
    'Buster',
    'Scout',
    'Champ',
    'Whiskey',
    'Henry',
    'Artax', // Neverending Story
    'Silver', // Lone Ranger
    'Trigger', // Roy Rogers
    'Shadowfax', // Lord of the Rings
    'Mr Horse', // Ren & Stimpy
    'Beau', // Famous clown horse
    'Bullseye', // Toy Story
    'Tornado', // Zorro
    'Boxer', // Animal Farm
    'Clover', // Animal Farm
    'Warner', // Purple/Orange race horse
    'Binky', // Discworld
    'Porkpie', // Percy Jackson
    'James Baxter', // Adventure Time
    'Buttercup', // Toy Story
    'Maximus', // Tangled
    'Seabiscuit', // Famous race horse
];
