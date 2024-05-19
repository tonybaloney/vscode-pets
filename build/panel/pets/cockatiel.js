"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COCKATIEL_NAMES = exports.Cockatiel = void 0;
const basepettype_1 = require("../basepettype");
class Cockatiel extends basepettype_1.BasePetType {
    label = 'cockatiel';
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
        return '🦜';
    }
    get hello() {
        // TODO: #191 Add a custom message for cockatiel
        return ` Hello, I'm a good bird 👋!`;
    }
}
exports.Cockatiel = Cockatiel;
exports.COCKATIEL_NAMES = [
    'Cocktail',
    'Pipsqueak',
    'Sir Chirps a Lot',
    'Nibbles',
    'Lord of the Wings',
    'Girl Nest Door',
    'Wingman',
    'Meryl Cheep',
    'Jack Sparrow',
    'Godfeather',
    'Mickey',
    'Baquack Obama',
    'Dame Judi Finch',
    'Kanye Nest',
    'Speck',
    'Cheecky',
    'Arthur',
    'Paco',
    'Bobo',
    'Walt',
    'Happy',
    'Junior',
    'Coco',
    'Yoyo',
    'Milo',
    'Skipper',
    'Scarlet',
    'Diva',
    'Ursula',
    'Donna',
    'Lola',
    'Kiko',
    'Luna',
];
//# sourceMappingURL=cockatiel.js.map