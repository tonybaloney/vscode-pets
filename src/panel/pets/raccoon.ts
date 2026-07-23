import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Raccoon extends BasePetType {
    label = 'raccoon';
    static possibleColors = [PetColor.gray, PetColor.grayJimothy];
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
        return '🦝';
    }
    get hello(): string {
        return `BANZAAAIII`;
    }
}

export const RACCOON_NAMES: ReadonlyArray<string> = [
    'Bandit',
    'Rocket',
    'Rascal',
    'Ranger',
    'Cash',
    'Dusty',
    'Pumpkin',
    'Cinder',
    'Bandido',
    'Scout',
    'Rocky',
    'Peanut',
    'Whiskers',
    'Mochi',
    'Marbles',
    'Ziggy',
    'Trash',
    'Pretzel',
    'Copper',
    'Ringo',
    'Bindi',
    'Rummage',
    'Pilfer',
    'Nibbles',
    'Chubbs',
    'Zorro',
    'Meeko',
    'Rocket',
    'Fenwick',
    'Trixie',
    'Gizmo',
    'Buckwheat',
    'Sable',
    'Boomer',
    'Cheddar',
    'Ash',
    'Pockets',
    'Scrappy',
    'Dodger',
    'Bramble',
    'Chester',
    'Snickers',
    'Waffles',
    'Bijou',
    'Cascade',
    'Otis',
    'Puddin',
    'Rosco',
    'Sneak',
    'Tumbler',
    'Rambo',
    'Wisp',
    'Domino',
    'Pilot',
    'Bandy',
    'Charcoal',
    'Ivy',
    'Loot',
    'Mask',
    'Nugget',
];
