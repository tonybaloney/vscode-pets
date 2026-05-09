import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Monkey extends BasePetType {
    label = 'monkey';
    static possibleColors = [PetColor.gray];
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
        return '🐒';
    }
    get hello(): string {
        return `Ooh ooh aah aah!`;
    }
}

export const MONKEY_NAMES: ReadonlyArray<string> = ['Punch'];
