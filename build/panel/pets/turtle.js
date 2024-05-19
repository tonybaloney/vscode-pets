"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TURTLE_NAMES = exports.Turtle = void 0;
const basepettype_1 = require("../basepettype");
class Turtle extends basepettype_1.BasePetType {
    label = 'turtle';
    static possibleColors = ["green" /* PetColor.green */, "orange" /* PetColor.orange */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                    "lie" /* States.lie */,
                ],
            },
            {
                state: "lie" /* States.lie */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "lie" /* States.lie */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "lie" /* States.lie */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '🐢';
    }
    get hello() {
        return ` Slow and steady wins the race!`;
    }
}
exports.Turtle = Turtle;
exports.TURTLE_NAMES = [
    'Shelldon',
    'Shelly',
    'Shelley',
    'Sheldon',
    'Tortuga',
    'Tortellini',
    'Charlie',
    'Ross',
    'Squirt',
    'Crush',
    'Squirtle',
    'Koopa',
    'Bowser',
    'Bowsette',
    'Franklin',
    'Koopa Troopa',
    'Blastoise',
    'Cecil',
    'Wartortle',
    'Donatello',
    'Michaelangelo',
    'Leonardo',
    'Leo',
    'Donny',
    'Mikey',
    'Raphael',
    'Chelone',
    'Emily',
    'Joseph',
    'Anne',
    'Zagreus',
    'Kratos',
    'Atreus',
    'Loki',
    'Freya',
    'Brevity',
    'Arthur',
    'Doyle',
    'Sherlock',
    'Charli',
];
//# sourceMappingURL=turtle.js.map