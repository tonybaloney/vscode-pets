"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_THEMES = exports.ALL_SCALES = exports.ALL_COLORS = exports.ALL_PETS = exports.WebviewMessage = void 0;
class WebviewMessage {
    text;
    command;
    constructor(text, command) {
        this.text = text;
        this.command = command;
    }
}
exports.WebviewMessage = WebviewMessage;
exports.ALL_PETS = [
    "cat" /* PetType.cat */,
    "chicken" /* PetType.chicken */,
    "clippy" /* PetType.clippy */,
    "cockatiel" /* PetType.cockatiel */,
    "crab" /* PetType.crab */,
    "dog" /* PetType.dog */,
    "fox" /* PetType.fox */,
    "mod" /* PetType.mod */,
    "rat" /* PetType.rat */,
    "rocky" /* PetType.rocky */,
    "rubber-duck" /* PetType.rubberduck */,
    "snake" /* PetType.snake */,
    "totoro" /* PetType.totoro */,
    "turtle" /* PetType.turtle */,
    "zappy" /* PetType.zappy */,
];
exports.ALL_COLORS = [
    "black" /* PetColor.black */,
    "brown" /* PetColor.brown */,
    "lightbrown" /* PetColor.lightbrown */,
    "green" /* PetColor.green */,
    "yellow" /* PetColor.yellow */,
    "gray" /* PetColor.gray */,
    "purple" /* PetColor.purple */,
    "red" /* PetColor.red */,
    "white" /* PetColor.white */,
    "orange" /* PetColor.orange */,
    "akita" /* PetColor.akita */,
    "null" /* PetColor.null */,
];
exports.ALL_SCALES = [
    "nano" /* PetSize.nano */,
    "small" /* PetSize.small */,
    "medium" /* PetSize.medium */,
    "large" /* PetSize.large */,
];
exports.ALL_THEMES = ["none" /* Theme.none */, "forest" /* Theme.forest */, "castle" /* Theme.castle */, "beach" /* Theme.beach */];
//# sourceMappingURL=types.js.map