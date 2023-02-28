import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Turtle extends BasePetType {
    label = 'turtle';
    static possibleColors = [
        PetColor.green,
        PetColor.orange
    ];
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
        return '🐢' ; 
    }
    get hello(): string {
        return ` Slow and steady wins the race!`;
    }
}

export const TURTLE_NAMES: ReadonlyArray<string> = [
    'Shelldon',
    "Shelly",
    "Shelley",
    "Sheldon",
    "Tortuga",
    "Tortellini",
    "Charlie",
    "Ross",
    "Squirt",
    "Crush",
    "Squirtle",
    "Koopa",
    "Bowser",
    "Bowsette",
    "Franklin",
    "Koopa Troopa",
    "Blastoise",
    "Cecil",
    "Wartortle",
    "Donatello",
    "Michaelangelo",
    "Leonardo",
    "Leo",
    "Donny",
    "Mikey",
    "Raphael",
    "Chelone",
    "Emily",
    "Joseph",
    "Anne",
    "Zagreus",
    "Kratos",
    "Atreus",
    "Loki",
    "Freya",
    "Brevity",
    "Arthur",
    "Doyle",
    "Sherlock",
    "Charli"
];
