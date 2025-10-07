import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Aspire extends BasePetType {
    label = 'aspire';
    static possibleColors = [
        PetColor.purple,
    ];
    sequence = {
        startingState: States.walkRight,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight],
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft],
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.walkRight],
            },
        ],
    };
    get emoji(): string {
        return '📎';
    }
    get hello(): string {
        return ` Hi, I'm Clippy, would you like some assistance today? 👋!`;
    }
}

export const ASPIRE_NAMES: ReadonlyArray<string> = [
    'Aspire',
];
