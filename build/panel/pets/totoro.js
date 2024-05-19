"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOTORO_NAMES = exports.Totoro = void 0;
const basepettype_1 = require("../basepettype");
class Totoro extends basepettype_1.BasePetType {
    label = 'totoro';
    static possibleColors = ["gray" /* PetColor.gray */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "lie" /* States.lie */],
            },
            {
                state: "lie" /* States.lie */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "walk-left" /* States.walkLeft */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "sit-idle" /* States.sitIdle */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "climb-wall-left" /* States.climbWallLeft */,
                    "sit-idle" /* States.sitIdle */,
                ],
            },
            {
                state: "climb-wall-left" /* States.climbWallLeft */,
                possibleNextStates: ["wall-hang-left" /* States.wallHangLeft */],
            },
            {
                state: "wall-hang-left" /* States.wallHangLeft */,
                possibleNextStates: ["jump-down-left" /* States.jumpDownLeft */],
            },
            {
                state: "jump-down-left" /* States.jumpDownLeft */,
                possibleNextStates: ["land" /* States.land */],
            },
            {
                state: "land" /* States.land */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "walk-right" /* States.walkRight */,
                    "lie" /* States.lie */,
                ],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "walk-left" /* States.walkLeft */],
            },
        ],
    };
    get emoji() {
        return '🐾';
    }
    get hello() {
        return `Try Laughing. Then Whatever Scares You Will Go Away. 🎭`;
    }
}
exports.Totoro = Totoro;
exports.TOTORO_NAMES = [
    'Totoro',
    'トトロ',
    'Max',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
    'Big fella',
];
//# sourceMappingURL=totoro.js.map