import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Deno extends BasePetType {
    label = 'deno';
    static possibleColors = [PetColor.green];
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
        return '🦕';
    }
    get hello(): string {
        return `I ❤️ TS`;
    }
}

export const DENO_NAMES: ReadonlyArray<string> = [
    'Dee',
    'Dee Dee',
    'Deno',
    'Deno Jr.',
    'Deno the Dino',
    'Deploydocus',
    'Dino',
    'Dippy',
    'Dr Deno',
    'Herby',
    'Littlefoot',
    'Ry',
];
