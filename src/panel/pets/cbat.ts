import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Cbat extends BasePetType {
    label = 'cbat';
    static possibleColors = [PetColor.white];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.walkLeft],
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
              state: States.swipe,
              possibleNextStates: [States.sitIdle],
          },
        ],
    };
    get emoji(): string {
        return 'd[-_-]b';
    }
    get canChase(): boolean {
        return false;
    }
    get hello(): string {
        return ` WeeWoo`;
    }
}

export const CBAT_NAMES: ReadonlyArray<string> = [
    'Yeetus'
];
