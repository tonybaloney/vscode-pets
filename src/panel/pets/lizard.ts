import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Lizard extends BasePetType {
    label = 'lizard';
    static possibleColors = [PetColor.green];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight],
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.sitIdle, States.walkLeft],
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.sitIdle, States.walkRight],
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [States.sitIdle],
            },
        ],
    };
    get emoji(): string {
        return '🦎';
    }
    get hello(): string {
        return `Ssssss!`;
    }
}

export const LIZARD_NAMES: ReadonlyArray<string> = [
    'David',
    'Lizzy',
    'Rango',
    'Iggy',
    'Spike',
    'Gecko',
    'Sally',
    'Lizardo',
    'Reptar',
    'Lizard King',
];
