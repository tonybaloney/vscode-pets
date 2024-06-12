import { PetColor } from "../../common/types";
import { BasePetType } from "../basepettype";
import { ISequenceTree } from "../sequences";
import { RunRightState, States } from "../states";

export class Snail extends BasePetType {
    label = 'snail';
    static possibleColors: [PetColor.brown];

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
                ],
            },
        ],
    };

    get emoji(): string {
        return '🐌';
    }
    
    get hello(): string {
        return 'hello! 👋';
    }
}

export const SNAIL_NAMES: ReadonlyArray<string> = [
    'Flash',
    'Sonwy',
    'Shally',
    'Taggy',
];