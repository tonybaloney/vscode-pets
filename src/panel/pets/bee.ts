import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Bee extends BasePetType {
    label = 'bee';
    static possibleColors = [PetColor.yellow];
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
        return '🐝';
    }
    get hello(): string {
        return `bzzz!`;
    }
}

export const BEE_NAMES: ReadonlyArray<string> = [
    'Buzz',
    'Bumble',
    'Honey',
    'Nectar',
    'Stinger',
    'Pollen',
    'Waggle',
    'Clover',
    'Maya',
    'Zippy',
    'Hive',
    'Blossom',
    'Amber',
    'Sting',
    'Fuzzy',
    'Dandelion',
];
