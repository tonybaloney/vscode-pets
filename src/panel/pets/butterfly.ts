import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Butterfly extends BasePetType {
    label= 'butterfly';
    static possibleColors = [
        PetColor.redbrown,
        PetColor.pinkblue,
    ];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.moveLeft,States.moveUp],
            },
            {
                state: States.moveLeft,
                possibleNextStates: [States.moveUp, States.moveRight],
            },
            {
                state: States.moveUp,
                possibleNextStates: [States.moveRight, States.moveDown],
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall],
            },
        ],
    };
    get emoji(): string {
        return '🦋';
    }
    get hello(): string {
        return ` Hi, I'm Butterfly, would you like some assistance today? 👋!`;
    }
}

export const CLIPPY_NAMES: ReadonlyArray<string> = [
    'Butterfly',
    'Maxx',
    'Bailey',
];
