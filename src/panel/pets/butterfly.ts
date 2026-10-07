import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Butterfly extends BasePetType {
    label = 'butterfly';
    static possibleColors = [PetColor.blue];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.walkLeft],
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft],
            },
            {
                state: States.walkLeft,
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
                ],
            },
        ],
    };
    


    get emoji(): string {
        return '🦋';
    }
    get hello(): string {
        return `hii`;
    }
}

export const BUTTERFLY_NAMES: ReadonlyArray<string> = ['Flutterby'];
