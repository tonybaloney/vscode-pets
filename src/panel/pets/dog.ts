import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Dog extends BasePetType {
    label = 'dog';
    static possibleColors = [
        PetColor.akita,
    ];
    sequence = {
        startingState: States.sitIdleL,
        sequenceStates: [
            {
                state: States.sitIdleL,
                possibleNextStates: [
                    States.walkRightL,
                    States.runRightL,
                    States.lieL,
                ],
            },
            {
                state: States.sitIdleM,
                possibleNextStates: [
                    States.walkRightL,
                    States.runRightL,
                    States.lieL,
                ],
            },
            {
                state: States.sitIdleH,
                possibleNextStates: [
                    States.walkRightL,
                    States.runRightL,
                    States.lieL,
                ],
            },

            {
                state: States.sitIdleLL,
                possibleNextStates: [
                    States.lieLL,
                ],
            },
            {
                state: States.sitIdleLM,
                possibleNextStates: [
                    States.lieLM,
                ],
            },
            {
                state: States.sitIdleLH,
                possibleNextStates: [
                    States.lieLH,
                ],
            },

            {
                state: States.lieL,
                possibleNextStates: [States.walkRightL, States.runRightL],
            },
            {
                state: States.lieM,
                possibleNextStates: [States.walkRightM, States.runRightM],
            },
            {
                state: States.lieH,
                possibleNextStates: [States.walkRightH, States.runRightH],
            },

            {
                state: States.lieLL,
                possibleNextStates: [States.sitIdleLL],
            },
            {
                state: States.lieLM,
                possibleNextStates: [States.sitIdleLM],
            },
            {
                state: States.lieLH,
                possibleNextStates: [States.sitIdleLH],
            },
            

            {
                state: States.walkRightL,
                possibleNextStates: [States.walkLeftL, States.runLeftL],
            },

            {
                state: States.runRightL,
                possibleNextStates: [States.walkLeftL, States.runLeftL],
            },
            {
                state: States.walkLeftL,
                possibleNextStates: [
                    States.sitIdleL,
                    States.lieL,
                    States.walkRightL,
                    States.runRightL,
                ],
            },
            {
                state: States.runLeftL,
                possibleNextStates: [
                    States.sitIdleL,
                    States.lieL,
                    States.walkRightL,
                    States.runRightL,
                ],
            },

            {
                state: States.walkRightM,
                possibleNextStates: [States.walkLeftM, States.runLeftM],
            },
            {
                state: States.runRightM,
                possibleNextStates: [States.walkLeftM, States.runLeftM],
            },
            {
                state: States.walkLeftM,
                possibleNextStates: [
                    States.sitIdleM,
                    States.lieM,
                    States.walkRightM,
                    States.runRightM,
                ],
            },
            {
                state: States.runLeftM,
                possibleNextStates: [
                    States.sitIdleM,
                    States.lieM,
                    States.walkRightM,
                    States.runRightM,
                ],
            },
            {
                state: States.walkRightH,
                possibleNextStates: [States.walkLeftH, States.runLeftH],
            },
            {
                state: States.runRightH,
                possibleNextStates: [States.walkLeftH, States.runLeftH],
            },
            {
                state: States.walkLeftH,
                possibleNextStates: [
                    States.sitIdleH,
                    States.lieH,
                    States.walkRightH,
                    States.runRightH,
                ],
            },
            {
                state: States.runLeftH,
                possibleNextStates: [
                    States.sitIdleH,
                    States.lieH,
                    States.walkRightH,
                    States.runRightH,
                ],
            },
            
        ],
    };
    get emoji(): string {
        return '🐶';
    }
    get hello(): string {
        return ` Every dog has its day - and today is woof day! Today I just want to bark. Take me on a walk`;
    }
}

export const DOG_NAMES: ReadonlyArray<string> = [
    'Bella',
];
