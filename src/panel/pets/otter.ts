import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States, SwipeState } from '../states';

// The otter's hover animation (standing up and looking around) is a little
// longer than most pets', so keep the swipe state on screen for 1.9 seconds
// instead of the default 1.5 so the animation is not cut off.
const OTTER_SWIPE_HOLD_TIME = 18;

export class Otter extends BasePetType {
    label = 'otter';
    static possibleColors = [PetColor.brown];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [
                    States.walkRight,
                    States.runRight,
                    States.lie,
                ],
            },
            {
                state: States.lie,
                possibleNextStates: [States.walkRight, States.walkLeft],
            },
            {
                state: States.walkRight,
                possibleNextStates: [
                    States.sitIdle,
                    States.lie,
                    States.walkLeft,
                    States.runLeft,
                ],
            },
            {
                state: States.runRight,
                possibleNextStates: [
                    States.sitIdle,
                    States.lie,
                    States.walkLeft,
                    States.runLeft,
                ],
            },
            {
                state: States.walkLeft,
                possibleNextStates: [
                    States.sitIdle,
                    States.lie,
                    States.walkRight,
                    States.runRight,
                ],
            },
            {
                state: States.runLeft,
                possibleNextStates: [
                    States.sitIdle,
                    States.lie,
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
                possibleNextStates: [States.sitIdle, States.lie],
            },
        ],
    };
    get emoji(): string {
        return '🦦';
    }
    get hello(): string {
        return `Splish splash! 🐚`;
    }

    swipe() {
        if (this.currentStateEnum === States.swipe) {
            return;
        }
        this.holdState = this.currentState;
        this.holdStateEnum = this.currentStateEnum;
        this.currentStateEnum = States.swipe;
        const state = new SwipeState(this);
        state.holdTime = OTTER_SWIPE_HOLD_TIME;
        this.currentState = state;
        this.showSpeechBubble('👀');
    }
}

export const OTTER_NAMES: ReadonlyArray<string> = [
    'Ollie',
    'Otto',
    'Pebble',
    'Shelly',
    'Splash',
    'Ripple',
    'Mochi',
    'Bubbles',
    'Clam',
    'Paddle',
    'Drift',
    'River',
    'Brook',
    'Kelp',
    'Pearl',
    'Nori',
    'Skipper',
    'Biscuit',
    'Toffee',
    'Hazel',
    'Walnut',
    'Cocoa',
    'Maple',
    'Squish',
    'Wiggles',
    'Floaty',
    'Sunny',
    'Coral',
    'Minnow',
    'Puddle',
];
