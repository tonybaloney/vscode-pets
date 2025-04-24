import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Bunny extends BasePetType {
    label = 'bunny';
    static possibleColors = [PetColor.white, PetColor.purple, PetColor.gray];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.lie,
                // Will sit idle after lying
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.sitIdle,
                // Can lie back, walk right/left or stand left/right
                possibleNextStates: [
                    States.lie,
                    States.walkRight,
                    States.walkLeft,
                    States.standLeft,
                    States.standRight,
                ],
            },
            {
                state: States.standLeft,
                // Can lie back, walk right, walk left (twice the chance)
                possibleNextStates: [
                    States.lie,
                    States.walkRight,
                    States.walkLeft,
                    States.walkLeft,
                ],
            },
            {
                state: States.standRight,
                // Can lie back, walk right, walk left (twice the chance)
                possibleNextStates: [
                    States.lie,
                    States.walkRight,
                    States.walkRight,
                    States.walkLeft,
                ],
            },
            {
                state: States.walkRight,
                // Can walk left, run right (twice the chance)
                possibleNextStates: [
                    States.walkLeft,
                    States.runRight,
                    States.runRight,
                ],
            },
            {
                state: States.walkLeft,
                // Can walk right, run left (twice the chance)
                possibleNextStates: [
                    States.walkRight,
                    States.runLeft,
                    States.runLeft,
                ],
            },
            {
                state: States.runRight,
                // Can walk left or run left (twice the chance)
                possibleNextStates: [
                    States.walkLeft,
                    States.runLeft,
                    States.runLeft,
                ],
            },
            {
                state: States.runLeft,
                // After running left always stand
                possibleNextStates: [States.standLeft],
            },
            {
                state: States.chase,
                // After the chase always idle with ball
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.idleWithBall,
                // Can walk right, walk left, run left, run right
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
        return '🐰';
    }

    get hello(): string {
        return `Your pookie bunny ${this.name} hopin' by!`;
    }
}

export const BUNNY_NAMES: ReadonlyArray<string> = [
    'Bella',
    'Bugs',
    'BunBun',
    'Bunny',
    'Bunny',
    'Boo',
    'Charlie',
    'Coco',
    'Daisy',
    'Daisy',
    'Ginger',
    'Hazel',
    'Honey',
    'Hopper',
    'Lily',
    'Lola',
    'Lucy',
    'Luna',
    'Minnie',
    'Misty',
    'Mocha',
    'Mocha',
    'Molly',
    'Oreo',
    'Penny',
    'Peter',
    'Pookie',
    'Rosie',
    'Ruby',
    'Sandy',
    'Sunny',
    'Thumper',
    'Willow',
];
