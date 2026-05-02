import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Raccoon extends BasePetType {
    label = 'raccoon';
    static possibleColors = [PetColor.black, PetColor.brown];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [
                    States.walkRight,
                    States.runRight,
                    States.swipe,
                ],
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
                state: States.swipe,
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [
                    States.walkRight,
                    States.walkLeft,
                    States.runLeft,
                    States.runRight,
                    States.swipe,
                ],
            },
        ],
    };
    get emoji(): string {
        return '🦝';
    }
    get hello(): string {
        return ` *Rummaging* Mind helping me sort through this trash?`;
    }
}

export const RACCOON_NAMES: ReadonlyArray<string> = [
    'Tanner',
    'Amy Lee',
    'Tin Head',
    'TrAsh Ketchum',
    'Ziggy',
    'Zigmund',
    'Zigzagoon',
    'Nidoking',
    'Nidoqueen',
    'Rattata',
    'Street Rat',
    'Oscar',
    'Chestnut',
    'Berry',
    'Evan',
    'Rigby',
];
