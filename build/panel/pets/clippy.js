"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIPPY_NAMES = exports.Clippy = void 0;
const basepettype_1 = require("../basepettype");
class Clippy extends basepettype_1.BasePetType {
    label = 'clippy';
    static possibleColors = [
        "black" /* PetColor.black */,
        "brown" /* PetColor.brown */,
        "green" /* PetColor.green */,
        "yellow" /* PetColor.yellow */,
    ];
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
        return '📎';
    }
    get hello() {
        return ` Hi, I'm Clippy, would you like some assistance today? 👋!`;
    }
}
exports.Clippy = Clippy;
exports.CLIPPY_NAMES = [
    'Clippy',
    'Karl Klammer',
    'Clippy Jr.',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
];
//# sourceMappingURL=clippy.js.map