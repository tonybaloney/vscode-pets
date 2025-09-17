import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Fish extends BasePetType {
    label = 'fish';
    static possibleColors = [PetColor.orange];

    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.walkLeft],
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft, States.sitIdle],
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.walkRight, States.sitIdle],
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
                    States.sitIdle,
                ],
            },
        ],
    };

    get emoji(): string {
        return '🐟';
    }

    get hello(): string {
        return ` Hi, I'm Finny the Fish 🐠!`;
    }
}

export const FISH_NAMES: ReadonlyArray<string> = [
    'Bubbles',
    'Finny',
    'Gill',
    'Splashy',
    'Wave',
    'Coral',
    'Nemo',
    'Dory',
    'Goldie',
    'Blue',
    'Sunny',
    'Pearl',
    'Sandy',
    'Aqua',
    'Skipper',
    'Flash',
    'Flow',
];
