import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Frog extends BasePetType {
    label = 'frog';
    static possibleColors = [PetColor.red, PetColor.green, PetColor.blue];
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
        return '🐸';
    }
    get hello(): string {
        return Math.random() > 0.5 ? `croak...` : `ribbit!`;
    }
}

export const FROG_NAMES: ReadonlyArray<string> = [
    'Blinky',
    'Bubbles',
    'Drift',
    'Frogger',
    'Freddy',
    'Hopper',
    'Jumpy',
    'Kermit',
    'Lily',
    'Leapster',
    'Marsh',
    'Misty',
    'Moss',
    'Pebbles',
    'Pip',
    'Pondy',
    'Quagmire',
    'Rango',
    'Razor',
    'Slick',
    'Swamper',
    'Swampy',
    'Sprout',
    'Thistle',
    'Tad',
    'Toady',
    'Warty',
    'Willow',
    'Wiggle',
];
