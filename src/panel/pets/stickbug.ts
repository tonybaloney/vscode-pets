import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class StickBug extends BasePetType {
    label = 'stick-bug';
    static possibleColors = [PetColor.green];
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
        return '🐛';
    }
    get canChase(): boolean {
        return false;
    }
    get hello(): string {
        return ` GET STICK BUGGED LOL`;
    }
}

export const STICKBUG_NAMES: ReadonlyArray<string> = [
    'Fred'
];
