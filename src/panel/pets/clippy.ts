import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Clippy extends BasePetType {
    label = 'clippy';
    possibleColors = [
        PetColor.black,
        PetColor.brown,
        PetColor.green,
        PetColor.yellow,
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
        return '📎';
    }
    get hello(): string {
        return ` Hi, I'm Clippy, would you like some assistance today? 👋!`;
    }
}

export const CLIPPY_NAMES: ReadonlyArray<string> = [
    'Clippy',
    'Karl Klammer',
    'Clippy Jr.',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
];
