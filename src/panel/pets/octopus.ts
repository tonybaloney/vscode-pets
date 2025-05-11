import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Octopus extends BasePetType {
    label = 'octopus';
    static possibleColors = [PetColor.purple];

    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.runRight],
            },
            {
                state: States.walkRight,
                possibleNextStates: [
                    States.walkLeft,
                    States.sitIdle,
                    States.runLeft,
                ],
            },
            {
                state: States.runRight,
                possibleNextStates: [
                    States.walkLeft,
                    States.sitIdle,
                    States.runLeft,
                ],
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
                    States.sitIdle,
                ],
            },
        ],
    };

    get emoji(): string {
        return '🐙';
    }

    get hello(): string {
        return 'womp womp';
    }
}

export const OCTOPUS_NAMES: ReadonlyArray<string> = [
    'Love',
    'Lilly',
    'OciDoci',
    'Tentacles',
    'Pupupu',
];
