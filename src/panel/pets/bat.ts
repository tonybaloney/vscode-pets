import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { resolveState, States } from '../states';

export class Bat extends BasePetType {
    label = 'bat';
    static possibleColors = [PetColor.black];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [
                    States.walkRight,
                    States.walkLeft,
                    States.swipe,
                ],
            },
            {
                state: States.walkRight,
                possibleNextStates: [
                    States.walkLeft,
                    States.runRight,
                    States.sitIdle,
                ],
            },
            {
                state: States.walkLeft,
                possibleNextStates: [
                    States.walkRight,
                    States.runLeft,
                    States.sitIdle,
                ],
            },
            {
                state: States.runRight,
                possibleNextStates: [States.runLeft, States.walkLeft],
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.runRight, States.walkRight],
            },
            {
                state: States.swipe,
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [
                    States.sitIdle,
                    States.walkLeft,
                    States.walkRight,
                ],
            },
        ],
    };

    get emoji(): string {
        return '🦇';
    }

    get hello(): string {
        return "I'm just hanging around! 🦇";
    }

    swipe() {
        if (this.currentStateEnum === States.swipe) {
            return;
        }
        this.holdState = this.currentState;
        this.holdStateEnum = this.currentStateEnum;
        this.currentStateEnum = States.swipe;
        this.currentState = resolveState(this.currentStateEnum, this);
        this.showSpeechBubble('🦇');
    }
}

export const BAT_NAMES: ReadonlyArray<string> = [
    'Echo',
    'Pip',
    'Nimbus',
    'Vesper',
    'Flappy',
    'Nocturne',
    'Count Flapula',
    'Wingston',
    'Moonbeam',
    'Batzilla',
    'Squeak',
    'Midnight',
];
