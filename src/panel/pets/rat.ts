import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Rat extends BasePetType {
    label = 'rat';
    static possibleColors = [PetColor.gray, PetColor.white, PetColor.brown];
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
        return '🐀';
    }
    get hello(): string {
        return `Rat noises...`;
    }
}

export const RAT_NAMES: ReadonlyArray<string> = [
    'Molly',
    'Coco',
    'Ruby',
    'Lucy',
    'Milo',
    'Daisy',
    'Archie',
    'Ollie',
    'Rosie',
    'Lola',
    'Frankie',
    'Roxy',
    'Poppy',
    'Luna',
    'Millie',
    'Rocky',
    'Alfie',
    'Hugo',
    'Pepper',
    'Lily',
    'Tilly',
    'Leo',
    'Maggie',
    'Mia',
    'Chloe',
    'Lulu',
    'Missy',
    'Jasper',
    'Billy',
    'Nala',
    'Ziggy',
    'Zoe',
    'Penny',
    'Milly',
    'Holly',
    'Henry',
    'Lilly',
    'Pippa',
    'Shadow',
    'Lucky',
    'Duke',
    'Jessie',
    'Cookie',
    'Bruce',
    'Jax',
    'Rex',
    'Louie',
    'Jet',
    'Banjo',
    'Beau',
    'Ella',
    'Ralph',
    'Loki',
    'Lexi',
    'Chilli',
    'Billie',
    'Louis',
    'Scout',
    'Cleo',
    'Spot',
    'Bolt',
    'Ginger',
    'Daisy',
    'Amelia',
    'Oliver',
    'Ghost',
    'Midnight',
    'Pumpkin',
    'Shadow',
    'Binx',
    'Riley',
    'Lenny',
    'Mango',
    'Boo',
    'Botas',
    'Romeo',
    'Simon',
    'Mimmo',
    'Carlotta',
    'Felix',
    'Duchess',
    'Walter',
    'Jesse',
    'Hank',
    'Gus',
    'Mike',
    'Saul',
    'Hector',
    'Tuco',
    'Jupiter',
    'Venus',
    'Apollo',
    'Alexandrite',
    'Amazonite',
    'Flint',
    'Jett',
    'Kyanite',
    'Mica',
    'Micah',
    'Splinter',
    'Remy',
];
