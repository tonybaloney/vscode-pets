import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Crab extends BasePetType {
    label = 'crab';
    possibleColors = [PetColor.red];
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
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.sitIdle],
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
        return '🦀';
    }
    get hello(): string {
        return ` Hi, I'm Crabsolutely Clawsome Crab 👋!`;
    }
}

export const CRAB_NAMES: ReadonlyArray<string> = [
    'Ferris',
    'Pinchy',
    'Grabby',
    'Big Red',
    'Crabby',
    'Buddy',
    'Ruby Red',
    'Oscar',
    'Lucy',
    'Bailey',
    'Crabito',
    'Percy',
    'Rocky',
    'Mr. Krabs',
    'Shelly',
    'Santa Claws',
    'Clawdia',
    'Scuttle',
    'Snappy',
    'Hermit',
    'Horseshoe',
    'Snapper',
    'Coconut',
    'Sebastian',
    'Abby',
    'Bubbles',
    'Bait',
    'Big Mac',
    'Biggie',
    'Claws',
    'Copper',
    'Crabette',
    'Crabina',
    'Crabmister',
    'Crusty',
    'Crabcake',
    'Digger',
    'Nipper',
    'Pincer',
    'Poopsie',
    'Recluse',
    'Salty',
    'Squirt',
    'Groucho',
    'Grumpy',
    'Lenny Krabitz',
    'Leonardo DaPinchy',
    'Peeves',
    'Penny Pincher',
    'Prickl',
];
