import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Pumpkin extends BasePetType {
    label = 'pumpkin';
    static possibleColors = [PetColor.orange];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight],
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.sitIdle, States.runRight],
            },
            {
                state: States.runRight,
                possibleNextStates: [States.sitIdle, States.walkRight],
            },
        ],
    };
    get emoji(): string {
        return '🎃';
    }

    get canChase(): boolean {
        return false;
    }

    get hello(): string {
        return 'Happy Halloween! 🎃';
    }
}

export const PUMPKIN_NAMES: ReadonlyArray<string> = [
    'Pumpky',
    'Jack',
    'Jack O.',
    'Jack Lantern',
    'The Gourd',
    'Spice Lord',
    'Gourdon',
    'Pumpkinator',
    'Lil’ Gourd',
    'Autumn Buddy',
    'Patchy',
    'Spooky Squash',
    'Gordie',
    'Lantern King',
    'Mr. Squash',
    'Cinderella',
    'Pie Face',
    'Spice Spice Baby',
    'Boo-tiful',
    'The Great Pumpkin',
    'Orange Wonder',
    'Lil’ Lantern',
    'Carvey',
    'Sir Gourdsworth',
];
