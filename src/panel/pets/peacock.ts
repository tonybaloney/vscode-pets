import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Peacock extends BasePetType {
    label = 'peacock';
    static possibleColors = [PetColor.blue, PetColor.green];
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
        return '🦚';
    }
    get hello(): string {
        return Math.random() > 0.5
            ? `Make way for a colorful strut!`
            : `Feathers out, bugs down.`;
    }
}

export const PEACOCK_NAMES: ReadonlyArray<string> = [
    'Azure',
    'Plume',
    'Indigo',
    'Jewel',
    'Rio',
    'Pavo',
    'Skye',
    'Opal',
    'Sultan',
    'Mistral',
];
