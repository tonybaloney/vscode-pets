import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Rocky extends BasePetType {
    label = 'rocky';
    possibleColors = [PetColor.gray];
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.runRight],
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
        return '💎';
    }
    get canChase(): boolean {
        return false;
    }
    get hello(): string {
        return ` 👋 I'm rock! I always Rock`;
    }
}

export const ROCKY_NAMES: ReadonlyArray<string> = [
    'Rocky',
    'The Rock',
    'Quartzy',
    'Rocky I',
    'Rocky II',
    'Rocky III',
    'Pebbles Sr.',
    'Big Granite',
    'Boulder',
    'Rockefeller',
    'Pebble',
    'Rocksanne',
    'Rockstar',
    'Onix',
    'Rock and Roll',
    'Dolomite',
    'Granite',
    'Miss Marble',
    'Rock On',
    'Amberstone',
    'Rock With Me',
    'Rock On It',
    'Rock Out',
];
