import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class AfricanGrey extends BasePetType {
    label = 'african-grey';
    static possibleColors = [PetColor.gray];
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
        return '🦜';
    }
    get hello(): string {
        return ` Hello, I'm a clever grey parrot 👋!`;
    }
}

export const AFRICAN_GREY_NAMES: ReadonlyArray<string> = [
    'Alex',
    'Coco',
    'Charlie',
    'Einstein',
    'Smokey',
    'Ash',
    'Pepper',
    'Gizmo',
    'Kiki',
    'Rio',
    'Merlin',
    'Zazu',
    'Sage',
    'Shadow',
    'Storm',
    'Misty',
    'Ghost',
    'Cinder',
    'Slate',
    'Ziggy',
    'Pixel',
    'Newton',
    'Tesla',
    'Socrates',
    'Plato',
    'Jasper',
    'Oscar',
    'Pablo',
    'Bruno',
    'Nikki',
];
