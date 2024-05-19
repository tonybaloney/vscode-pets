"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZAPPY_NAMES = exports.Zappy = void 0;
const basepettype_1 = require("../basepettype");
class Zappy extends basepettype_1.BasePetType {
    label = 'zappy';
    static possibleColors = ["yellow" /* PetColor.yellow */];
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
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
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
        return '⚡';
    }
    get hello() {
        // TODO: #193 Add a custom message for zappy
        return ` Hello this is Zappy! Do I look familiar?? I am the mascot for Azure Functions😉`;
    }
}
exports.Zappy = Zappy;
exports.ZAPPY_NAMES = [
    'Zappy',
    'Zippy',
    'Zappy Jr.',
    'Zoppy',
    'Zuppy',
    'Zeppy',
    'Big Z',
    'Little z',
    'The Flash',
    'Thor',
    'Electric Bolt',
    'Azula',
    'Lightning Bolt',
    'Power',
    'Sonic',
    'Speedy',
    'Rush',
];
//# sourceMappingURL=zappy.js.map