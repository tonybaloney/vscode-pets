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
        startingState: States.standRight,
        sequenceStates: [
            {
                state: States.sitIdle,
                // Only on first adding the horse
                possibleNextStates: [States.walkRight],
            },
            {
                state: States.standRight,
                // Can start walking either direction (twice as likely to keep going right), or just keep on eating
                possibleNextStates: [
                    States.walkRight,
                    States.walkRight,
                    States.walkLeft,
                    States.standRight,
                ],
            },
            {
                state: States.standLeft,
                // Can start walking either direction (twice as likely to keep going left), or just keep on eating
                possibleNextStates: [
                    States.walkRight,
                    States.walkLeft,
                    States.walkLeft,
                    States.standLeft,
                ],
            },
            {
                state: States.walkRight,
                // Can switch directions, start running the same direction, or start eating (more likely)
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
                // Can switch directions or slow down to a walk (twice as likely)
                possibleNextStates: [
                    States.walkRight,
                    States.walkRight,
                    States.runLeft,
                ],
            },
            {
                state: States.walkLeft,
                // Can switch directions, start running the same direciton, or start eating (more likely)
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
                // Can switch directions or slow down to a walk (twice as likely)
                possibleNextStates: [
                    States.walkLeft,
                    States.walkLeft,
                    States.runRight,
                ],
            },
            {
                state: States.chase,
                // After the chase, the horse has the ball!
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.swipe,
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.idleWithBall,
                // Can go back to running or have a bite to eat
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

export const HORSE_NAMES: ReadonlyArray<string> = [
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
