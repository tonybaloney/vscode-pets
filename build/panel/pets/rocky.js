"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROCKY_NAMES = exports.Rocky = void 0;
const basepettype_1 = require("../basepettype");
class Rocky extends basepettype_1.BasePetType {
    label = 'rocky';
    static possibleColors = ["gray" /* PetColor.gray */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */, "run-right" /* States.runRight */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */, "walk-right" /* States.walkRight */],
            },
        ],
    };
    get emoji() {
        return '💎';
    }
    get canChase() {
        return false;
    }
    get hello() {
        return ` 👋 I'm rock! I always Rock`;
    }
}
exports.Rocky = Rocky;
exports.ROCKY_NAMES = [
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
//# sourceMappingURL=rocky.js.map