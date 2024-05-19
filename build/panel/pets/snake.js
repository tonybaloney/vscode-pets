"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SNAKE_NAMES = exports.Snake = void 0;
const basepettype_1 = require("../basepettype");
class Snake extends basepettype_1.BasePetType {
    label = 'snake';
    static possibleColors = ["green" /* PetColor.green */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
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
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
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
        return '🐍';
    }
    get hello() {
        return `Sss... Oh. Oh my gosh! I'm a snake!`;
    }
}
exports.Snake = Snake;
exports.SNAKE_NAMES = [
    'Sneaky',
    'Mr Slippery',
    'Hissy Elliott',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Bailey',
    'Max',
    'Seb',
    'Kaa',
    'Mr Hiss',
    'Miss Hiss',
    'Snaku',
    'Kaa',
    'Madame Snake',
    'Sir Hiss',
    'Loki',
    'Steelix',
    'Gyarados',
    'Seviper',
    'Ekanes',
    'Arbok',
    'Snivy',
    'Servine',
    'Serperior',
    'Mojo',
    'Moss',
    'Nigel',
    'Tootsie',
    'Sammy',
    'Ziggy',
    'Asmodeus',
    'Attila',
    'Basil',
    'Diablo',
    'Eden',
    'Eve',
    'Heaven',
    'Hydra',
    'Indiana',
    'Jafaar',
    'Kaa',
    'Medusa',
    'Naga',
    'Severus',
    'Slytherin',
    'Snape',
    'Raven',
    'Slider',
    'Slinky',
    'Stripes',
];
//# sourceMappingURL=snake.js.map