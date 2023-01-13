import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Chicken extends BasePetType {
    label = 'chicken';
    static possibleColors = [PetColor.white];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [
                    States.walkRight,
                    States.runRight,
                    States.swipe,
                ],
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
                state: States.swipe,
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [
                    States.walkRight,
                    States.walkLeft,
                    States.runLeft,
                    States.runRight,
                    States.swipe,
                ],
            },
        ],
    };
    get emoji(): string {
        return '🐔';
    }
    get hello(): string {
        return ` Puk Puk Pukaaak - just let me lay my egg. 🥚`;
    }
}

export const CHICKEN_NAMES: ReadonlyArray<string> = [
    'Hen Solo',
    'Cluck Vader',
    'Obi Wan Henobi',
    'Albert Eggstein',
    'Abrahen Lincoln',
    'Cluck Norris',
    'Sir Clucks-A-Lot',
    'Frank-hen-stein',
    'Richard',
    'Dixi',
    'Nugget',
    'Bella',
    'Cotton',
    'Pip',
    'Lucky',
    'Polly',
    'Mirabel',
    'Elsa',
    'Bon-Bon',
    'Ruby',
    'Rosie',
    'Teriyaki',
    'Penguin',
    'Sybil',
];
