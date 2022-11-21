import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Totoro extends BasePetType {
    label = 'totoro';
    static possibleColors = [PetColor.gray];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.lie],
            },
            {
                state: States.lie,
                possibleNextStates: [States.walkRight, States.walkLeft],
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft, States.sitIdle],
            },
            {
                state: States.walkLeft,
                possibleNextStates: [
                    States.sitIdle,
                    States.climbWallLeft,
                    States.sitIdle,
                ],
            },
            {
                state: States.climbWallLeft,
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
                possibleNextStates: [
                    States.sitIdle,
                    States.walkRight,
                    States.lie,
                ],
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [States.walkRight, States.walkLeft],
            },
        ],
    };
    get emoji(): string {
        return '🐾';
    }
    get hello(): string {
        return `Try Laughing. Then Whatever Scares You Will Go Away. 🎭`;
    }
}

export const TOTORO_NAMES: ReadonlyArray<string> = [
    'Totoro',
    'トトロ',
    'Max',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
    'Big fella',
];
