import { PetColor, PetRelativeSize, PetSize } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States, resolveState } from '../states';

const getRandomIntegerInRange = (low: number, high: number): number => {
    if (low > high) {
        [low, high] = [high, low]; // swapsies!
    }
    const min = Math.ceil(low);
    const max = Math.floor(high);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = <T>(array: T[]): T => {
    const randomIndex = getRandomIntegerInRange(0, array.length - 1);
    return array[randomIndex];
};

export class Squirrel extends BasePetType {
    private _resizeListener?: () => void;

    constructor(
        spriteElement: HTMLImageElement,
        collisionElement: HTMLDivElement,
        speechElement: HTMLDivElement,
        size: PetSize,
        relativeSize: PetRelativeSize,
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
            relativeSize,
            left,
            bottom,
            petRootClean,
            floor,
            name,
            speed * 1.15,
        );

        this._climbSpeed = 7;
        this._fallSpeed = 15;

        this._resizeListener = () => {
            this.adjustClimbHeight();
        };
        window.addEventListener('resize', this._resizeListener);
        this.adjustClimbHeight();
    }
    label = 'squirrel';
    static possibleColors = [
        PetColor.gray,
        PetColor.black,
        PetColor.brown,
        PetColor.purple,
        PetColor.white,
    ];

    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.walkLeft],
            },
            {
                state: States.standRight,
                // Can start walking either direction, or run to the right
                possibleNextStates: [
                    States.walkRight,
                    States.runRight,
                    States.walkLeft,
                ],
            },
            {
                state: States.standLeft,
                // Can start walking either direction, or run to the left
                possibleNextStates: [
                    States.walkLeft,
                    States.runLeft,
                    States.walkRight,
                    States.climbWallLeft,
                ],
            },
            {
                state: States.walkRight,
                // Can stand, start running, or switch directions
                possibleNextStates: [
                    States.standRight,
                    States.runRight,
                    States.walkLeft,
                    States.walkRight,
                ],
            },
            {
                state: States.walkLeft,
                // Can stand, start running, or switch directions
                possibleNextStates: [
                    States.standLeft,
                    States.runLeft,
                    States.climbWallLeft,
                    States.walkRight,
                    States.walkLeft,
                ],
            },
            {
                state: States.runRight,
                // Can switch directions or slow down to a walk (twice as likely), or even abruptly stop to eat
                possibleNextStates: [
                    States.runLeft,
                    States.walkRight,
                    States.walkRight,
                    States.standRight,
                ],
            },
            {
                state: States.runLeft,
                // Can switch directions or slow down to a walk (twice as likely), or even abruptly stop to eat
                possibleNextStates: [
                    States.runRight,
                    States.walkLeft,
                    States.walkLeft,
                    States.standLeft,
                    States.climbWallLeft,
                ],
            },
            {
                state: States.climbWallLeft,
                possibleNextStates: [States.wallDigLeft],
            },
            {
                state: States.wallDigLeft,
                possibleNextStates: [States.wallNap],
            },
            {
                state: States.wallNap,
                possibleNextStates: [States.wallHangLeft],
            },
            {
                state: States.wallHangLeft,
                possibleNextStates: [States.jumpDownLeft],
            },
            {
                state: States.jumpDownLeft,
                possibleNextStates: [States.land],
            },
            {
                state: States.land,
                possibleNextStates: [States.sitIdle, States.runRight],
            },
            {
                state: States.chase,
                // After the chase, the squirrel has the ball!
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.swipe,
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.idleWithBall,
                // Eat the ball, then go back to running
                possibleNextStates: [States.runRight, States.runLeft],
            },
        ],
    };
    get emoji(): string {
        return '🐿️';
    }
    get hello(): string {
        let response = 'Got any nuts?!';
        switch (this.name.toLowerCase()) {
            case 'bruce':
                response = "Wanna get nuts? Let's get nuts!";
                break;
            case 'hugo':
                response = "I'm the world's laziest squirrel!";
                break;
            case 'rocky':
                response = 'Oh, Bullwinkle! You did it again!';
                break;
            case 'slappy':
                response = 'You remind me of...';
                break;
            case 'bucky':
                response = '🎈🪡? 🐆🐆';
                break;
            case 'sandy':
                response = 'I don’t cry, I sweat through my eyes!';
                break;
            case 'sinan':
            case 'twiggy':
                response = 'Go Vols! 🍊';
                break;
            case 'charlie':
                response = 'Charie DO know!';
                break;
            case 'noah':
                response = 'Is that a 🌧️🌎 reference?';
                break;
            case 'eleanor':
                response = 'Meow?';
                break;
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
        const food = getRandomElement(['🌰', '🍕', '🥨', '🥜', '🥡', '🍏']);
        this.showSpeechBubble(`${food}?`);
    }

    chooseNextState(fromState: States): States {
        const nextState = super.chooseNextState(fromState);
        if (this.name.toLowerCase() === 'debug') {
            console.log(`${this.label}-> \x1b[1m${nextState}\x1b[0m`);
        }
        return nextState;
    }

    protected _variation = 0;
    protected _variationCounter = 0;
    protected _variationTimer = 10;

    get climbSpeed(): number {
        this._variationCounter++;
        if (this._variationCounter >= this._variationTimer) {
            // random number between -4 and +1
            this._variation = Math.floor(Math.random() * 6) - 4;
            // random number between 10 and 25
            this._variationTimer = Math.floor(Math.random() * 16) + 10;
            this._variationCounter = 0;
        }
        return this._climbSpeed + this._variation;
    }

    private adjustClimbHeight(): void {
        const viewportHeight = window.innerHeight;
        const elementHeight = this.calculateSpriteWidth(this.size, this.relativeSize);

        // Scale the climb height based on viewport height
        const minHeight = Math.floor(viewportHeight * 0.3);
        const maxHeight = Math.floor(viewportHeight * 0.8);

        this._climbHeight = getRandomIntegerInRange(
            Math.max(elementHeight * 2, minHeight),
            Math.min(viewportHeight - elementHeight, maxHeight),
        );

        if (this.name.toLowerCase() === 'debug') {
            console.log(
                `Squirrel ${this.name} adjusted climb height to ${this._climbHeight} (viewport: ${viewportHeight}, element: ${elementHeight})`,
            );
        }
    }

    remove(): void {
        if (this._resizeListener) {
            window.removeEventListener('resize', this._resizeListener);
            this._resizeListener = undefined;
        }
        super.remove();
    }
}

export const SQUIRREL_NAMES: ReadonlyArray<string> = [
    'Twiggy', // Water-skiing squirrel from Knoxville
    'Scrat', // Ice Age
    'Rocky', // Rocky and Bullwinkle
    'Sandy', // Sandy Cheeks from Spongebob
    'Secret Squirrel', // The Atom Ant
    'Slappy', // Slappy the Squirrel from Animaniacs
    'Skippy', // Skippy Squirrel from Animaniacs
    'Conker', // Conker's Bad Fur Day
    'Bucky', // Emperor's New Groove
    'Guinevere', // Guinevere the Squirrel from The Sword in the Stone
    'Sally', // Sonic the Hedgehog and Pete the Cat - Wowee!
    'Chitter', // Smurfs
    'Squeaks', // Looney Tunes
    'Sinan', // World's Smallest Vol Fan
    'Nutsy', // Robin Hood
    'Lady Timbertail', // Ferngully 2
    'Nibbles', // Tom and Jerry
    'Nutty', // Happy Tree Friends
    'Twitchy', // Hoodwinked and Kung Fu Panda
    'Nutkin', // The Tale of Squirrel Nutkin
    'Acornelia', // Magic the Gathering
    'Sneezy', // Penn State Squirrel
    'Scamper',
    'Peanut',
    'Eleanor',
    'Acorn',
    'Bruce',
    'Walnut',
    'Hazel',
    'Noah',
    'Henry',
    'Ranger',
    'Link',
    'Tomato',
    'Charlie',
    'Pinecone',
];
