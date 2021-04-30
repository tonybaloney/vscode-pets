/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/names.ts":
/*!*****************************!*\
  !*** ./src/common/names.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CRAB_NAMES = exports.DOG_NAMES = exports.CAT_NAMES = exports.PET_NAMES = void 0;
exports.PET_NAMES = new Map([
    [1, 'Bella'],
    [2, 'Charlie'],
    [3, 'Max'],
    [4, 'Molly'],
    [5, 'Coco'],
    [6, 'Buddy'],
    [7, 'Ruby'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
    [11, 'Milo'],
    [12, 'Daisy'],
    [13, 'Archie'],
    [14, 'Ollie'],
    [15, 'Rosie'],
    [16, 'Lola'],
    [17, 'Frankie'],
    [18, 'Toby'],
    [19, 'Roxy'],
    [20, 'Poppy'],
    [21, 'Luna'],
    [22, 'Jack'],
    [23, 'Millie'],
    [24, 'Teddy'],
    [25, 'Harry'],
    [26, 'Cooper'],
    [27, 'Bear'],
    [28, 'Rocky'],
    [29, 'Alfie'],
    [30, 'Hugo'],
    [31, 'Bonnie'],
    [32, 'Pepper'],
    [33, 'Lily'],
    [34, 'Tilly'],
    [35, 'Leo'],
    [36, 'Maggie'],
    [37, 'George'],
    [38, 'Mia'],
    [39, 'Marley'],
    [40, 'Harley'],
    [41, 'Chloe'],
    [42, 'Lulu'],
    [43, 'Missy'],
    [44, 'Jasper'],
    [45, 'Billy'],
    [46, 'Nala'],
    [47, 'Monty'],
    [48, 'Ziggy'],
    [49, 'Winston'],
    [50, 'Zeus'],
    [51, 'Zoe'],
    [52, 'Stella'],
    [53, 'Sasha'],
    [54, 'Rusty'],
    [55, 'Gus'],
    [56, 'Baxter'],
    [57, 'Dexter'],
    [58, 'Diesel'],
    [59, 'Willow'],
    [60, 'Barney'],
    [61, 'Bruno'],
    [62, 'Penny'],
    [63, 'Honey'],
    [64, 'Milly'],
    [65, 'Murphy'],
    [66, 'Simba'],
    [67, 'Holly'],
    [68, 'Benji'],
    [69, 'Henry'],
    [70, 'Lilly'],
    [71, 'Pippa'],
    [72, 'Shadow'],
    [73, 'Sam'],
    [74, 'Buster'],
    [75, 'Lucky'],
    [76, 'Ellie'],
    [77, 'Duke'],
    [78, 'Jessie'],
    [79, 'Cookie'],
    [80, 'Harvey'],
    [81, 'Bruce'],
    [82, 'Jax'],
    [83, 'Rex'],
    [84, 'Louie'],
    [85, 'Bentley'],
    [86, 'Jet'],
    [87, 'Banjo'],
    [88, 'Beau'],
    [89, 'Ella'],
    [90, 'Ralph'],
    [91, 'Loki'],
    [92, 'Lexi'],
    [93, 'Chester'],
    [94, 'Sophie'],
    [95, 'Chilli'],
    [96, 'Billie'],
    [97, 'Louis'],
    [98, 'Scout'],
    [99, 'Charlie'],
    [100, 'Cleo'],
]);
exports.CAT_NAMES = exports.PET_NAMES;
exports.DOG_NAMES = exports.PET_NAMES;
exports.CRAB_NAMES = new Map([
    [1, 'Ferris'],
    [2, 'Pinchy'],
    [3, 'Grabby'],
    [4, 'Big Red'],
    [5, 'Crabby'],
    [6, 'Buddy'],
    [7, 'Ruby'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey']
]);


/***/ }),

/***/ "./src/panel/pets.ts":
/*!***************************!*\
  !*** ./src/panel/pets.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPet = exports.InvalidPetException = exports.Crab = exports.RubberDuck = exports.Clippy = exports.Snake = exports.Dog = exports.Cat = exports.Totoro = exports.PetCollection = exports.PetElement = exports.InvalidStateException = void 0;
const states_1 = __webpack_require__(/*! ./states */ "./src/panel/states.ts");
const names_1 = __webpack_require__(/*! ../common/names */ "./src/common/names.ts");
class InvalidStateException {
}
exports.InvalidStateException = InvalidStateException;
class PetElement {
    constructor(el, collision, pet, color, type) {
        this.el = el;
        this.collision = collision;
        this.pet = pet;
        this.color = color;
        this.type = type;
    }
}
exports.PetElement = PetElement;
class PetCollection {
    constructor() {
        this._pets = new Array(0);
    }
    pets() {
        return this._pets;
    }
    push(pet) {
        this._pets.push(pet);
    }
    reset() {
        this._pets = [];
    }
    locate(name) {
        return this._pets.find((collection, value, obj) => {
            return collection.pet.name() === name;
        });
    }
    seekNewFriends() {
        if (this._pets.length <= 1) {
            return [];
        } // You can't be friends with yourself.
        var messages = new Array(0);
        this._pets.forEach(petInCollection => {
            if (petInCollection.pet.hasFriend()) {
                return;
            } // I already have a friend!
            this._pets.forEach(potentialFriend => {
                if (potentialFriend.pet.hasFriend()) {
                    return;
                } // Already has a friend. sorry.
                if (!potentialFriend.pet.canChase()) {
                    return;
                } // Pet is busy doing something else.
                if (potentialFriend.pet.left() > petInCollection.pet.left() &&
                    potentialFriend.pet.left() < petInCollection.pet.left() + petInCollection.pet.width()) {
                    // We found a possible new friend..
                    console.log(petInCollection.pet.name(), " wants to be friends with ", potentialFriend.pet.name(), ".");
                    if (petInCollection.pet.makeFriendsWith(potentialFriend.pet)) {
                        messages.push(`${petInCollection.pet.name()} (${petInCollection.pet.emoji()}): I'm now friends ❤️ with ${potentialFriend.pet.name()} (${potentialFriend.pet.emoji()})`);
                    }
                }
            });
        });
        return messages;
    }
}
exports.PetCollection = PetCollection;
function calculateSpriteWidth(size) {
    if (size === "nano" /* nano */) {
        return 30;
    }
    else if (size === "medium" /* medium */) {
        return 55;
    }
    else if (size === "large" /* large */) {
        return 110;
    }
    else {
        return 30; // Shrug
    }
}
class BasePetType {
    constructor(spriteElement, collisionElement, size, left, bottom, petRoot, floor, name) {
        this.label = "base";
        this.sequence = { startingState: "sit-idle" /* sitIdle */, sequenceStates: [] };
        this.el = spriteElement;
        this.collision = collisionElement;
        this.petRoot = petRoot;
        this._floor = floor;
        this._left = left;
        this._bottom = bottom;
        this.initSprite(size, left, bottom);
        this.currentStateEnum = this.sequence.startingState;
        this.currentState = states_1.resolveState(this.currentStateEnum, this);
        this._name = name;
    }
    initSprite(petSize, left, bottom) {
        this.el.style.left = `${left}px`;
        this.el.style.bottom = `${bottom}px`;
        this.el.style.width = "auto";
        this.el.style.height = "auto";
        this.el.style.maxWidth = `${calculateSpriteWidth(petSize)}px`;
        this.el.style.maxHeight = `${calculateSpriteWidth(petSize)}px`;
        this.collision.style.left = `${left}px`;
        this.collision.style.bottom = `${bottom}px`;
        this.collision.style.width = `${calculateSpriteWidth(petSize)}px`;
        this.collision.style.height = `${calculateSpriteWidth(petSize)}px`;
    }
    left() {
        return this._left;
    }
    bottom() {
        return this._bottom;
    }
    positionBottom(bottom) {
        this._bottom = bottom;
        this.el.style.bottom = `${this._bottom}px`;
        this.el.style.bottom = `${this._bottom}px`;
        this.collision.style.left = `${this._left}px`;
        this.collision.style.bottom = `${this._bottom}px`;
    }
    ;
    positionLeft(left) {
        this._left = left;
        this.el.style.left = `${this._left}px`;
        this.el.style.left = `${this._left}px`;
        this.collision.style.left = `${this._left}px`;
        this.collision.style.bottom = `${this._bottom}px`;
    }
    width() {
        return this.el.width;
    }
    floor() {
        return this._floor;
    }
    getState() {
        return { currentStateEnum: this.currentStateEnum };
    }
    recoverFriend(friend) {
        // Recover friends..
        this._friend = friend;
    }
    recoverState(state) {
        // TODO : Resolve a bug where if it was swiping before, it would fail
        // because holdState is no longer valid.
        this.currentStateEnum = state.currentStateEnum;
        this.currentState = states_1.resolveState(this.currentStateEnum, this);
        if (!states_1.isStateAboveGround(this.currentStateEnum)) {
            // Reset the bottom of the sprite to the floor as the theme
            // has likely changed.
            this.positionBottom(this.floor());
        }
    }
    canSwipe() {
        return !states_1.isStateAboveGround(this.currentStateEnum);
    }
    canChase() {
        return !states_1.isStateAboveGround(this.currentStateEnum) && this.currentStateEnum !== "chase" /* chase */;
    }
    swipe() {
        if (this.currentStateEnum === "swipe" /* swipe */) {
            return;
        }
        this.holdState = this.currentState;
        this.holdStateEnum = this.currentStateEnum;
        this.currentStateEnum = "swipe" /* swipe */;
        this.currentState = states_1.resolveState(this.currentStateEnum, this);
    }
    chase(ballState, canvas) {
        this.currentStateEnum = "chase" /* chase */;
        this.currentState = new states_1.ChaseState(this, ballState, canvas);
    }
    faceLeft() {
        this.el.style.webkitTransform = "scaleX(-1)";
    }
    faceRight() {
        this.el.style.webkitTransform = "scaleX(1)";
    }
    setAnimation(face) {
        const newFace = `${this.petRoot}_${face}_8fps.gif`;
        if (this.el.src === newFace) {
            return;
        }
        this.el.src = newFace;
    }
    chooseNextState(fromState) {
        // Work out next state
        var possibleNextStates = undefined;
        for (var i = 0; i < this.sequence.sequenceStates.length; i++) {
            if (this.sequence.sequenceStates[i].state === fromState) {
                possibleNextStates = this.sequence.sequenceStates[i].possibleNextStates;
            }
        }
        if (!possibleNextStates) {
            throw new InvalidStateException();
        }
        // randomly choose the next state
        const idx = Math.floor(Math.random() * possibleNextStates.length);
        return possibleNextStates[idx];
    }
    nextFrame() {
        if (this.currentState.horizontalDirection === states_1.HorizontalDirection.left) {
            this.faceLeft();
        }
        else if (this.currentState.horizontalDirection === states_1.HorizontalDirection.right) {
            this.faceRight();
        }
        this.setAnimation(this.currentState.spriteLabel);
        // What's my buddy doing?
        if (this.hasFriend() && this.currentStateEnum !== "chase-friend" /* chaseFriend */) {
            if (this.friend().isPlaying() && !states_1.isStateAboveGround(this.currentStateEnum)) {
                this.currentState = states_1.resolveState("chase-friend" /* chaseFriend */, this);
                this.currentStateEnum = "chase-friend" /* chaseFriend */;
                return;
            }
        }
        var frameResult = this.currentState.nextFrame();
        if (frameResult === states_1.FrameResult.stateComplete) {
            // If recovering from swipe..
            if (this.holdState && this.holdStateEnum) {
                this.currentState = this.holdState;
                this.currentStateEnum = this.holdStateEnum;
                this.holdState = undefined;
                this.holdStateEnum = undefined;
                return;
            }
            var nextState = this.chooseNextState(this.currentStateEnum);
            this.currentState = states_1.resolveState(nextState, this);
            this.currentStateEnum = nextState;
        }
        else if (frameResult === states_1.FrameResult.stateCancel) {
            if (this.currentStateEnum === "chase" /* chase */) {
                var nextState = this.chooseNextState("idle-with-ball" /* idleWithBall */);
                this.currentState = states_1.resolveState(nextState, this);
                this.currentStateEnum = nextState;
            }
            else if (this.currentStateEnum === "chase-friend" /* chaseFriend */) {
                var nextState = this.chooseNextState("idle-with-ball" /* idleWithBall */);
                this.currentState = states_1.resolveState(nextState, this);
                this.currentStateEnum = nextState;
            }
        }
    }
    hasFriend() {
        return this._friend !== undefined;
    }
    friend() {
        return this._friend;
    }
    name() {
        return this._name;
    }
    makeFriendsWith(friend) {
        this._friend = friend;
        console.log(this.name(), ": I'm now friends ❤️ with ", friend.name());
        return true;
    }
    isPlaying() {
        return this.currentStateEnum === "run-right" /* runRight */ || this.currentStateEnum === "run-left" /* runLeft */;
    }
    emoji() {
        return "🐶";
    }
}
class Totoro extends BasePetType {
    constructor() {
        super(...arguments);
        this.label = "totoro";
        this.sequence = {
            startingState: "sit-idle" /* sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* sitIdle */,
                    possibleNextStates: ["walk-right" /* walkRight */, "lie" /* lie */]
                },
                {
                    state: "lie" /* lie */,
                    possibleNextStates: ["walk-right" /* walkRight */, "walk-left" /* walkLeft */]
                },
                {
                    state: "walk-right" /* walkRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "sit-idle" /* sitIdle */]
                },
                {
                    state: "walk-left" /* walkLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "climb-wall-left" /* climbWallLeft */, "sit-idle" /* sitIdle */]
                },
                {
                    state: "climb-wall-left" /* climbWallLeft */,
                    possibleNextStates: ["wall-hang-left" /* wallHangLeft */]
                },
                {
                    state: "wall-hang-left" /* wallHangLeft */,
                    possibleNextStates: ["jump-down-left" /* jumpDownLeft */]
                },
                {
                    state: "jump-down-left" /* jumpDownLeft */,
                    possibleNextStates: ["land" /* land */]
                },
                {
                    state: "land" /* land */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "walk-right" /* walkRight */, "lie" /* lie */]
                },
                {
                    state: "chase" /* chase */,
                    possibleNextStates: ["idle-with-ball" /* idleWithBall */]
                },
                {
                    state: "idle-with-ball" /* idleWithBall */,
                    possibleNextStates: ["walk-right" /* walkRight */, "walk-left" /* walkLeft */]
                },
            ]
        };
    }
    emoji() {
        return "🐾";
    }
}
exports.Totoro = Totoro;
class Cat extends BasePetType {
    constructor() {
        super(...arguments);
        this.label = "cat";
        this.sequence = {
            startingState: "sit-idle" /* sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* sitIdle */,
                    possibleNextStates: ["walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "walk-right" /* walkRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "run-right" /* runRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "walk-left" /* walkLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "climb-wall-left" /* climbWallLeft */, "walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "run-left" /* runLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "climb-wall-left" /* climbWallLeft */, "walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "climb-wall-left" /* climbWallLeft */,
                    possibleNextStates: ["wall-hang-left" /* wallHangLeft */]
                },
                {
                    state: "wall-hang-left" /* wallHangLeft */,
                    possibleNextStates: ["jump-down-left" /* jumpDownLeft */]
                },
                {
                    state: "jump-down-left" /* jumpDownLeft */,
                    possibleNextStates: ["land" /* land */]
                },
                {
                    state: "land" /* land */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "chase" /* chase */,
                    possibleNextStates: ["idle-with-ball" /* idleWithBall */]
                },
                {
                    state: "idle-with-ball" /* idleWithBall */,
                    possibleNextStates: ["walk-right" /* walkRight */, "walk-left" /* walkLeft */, "run-left" /* runLeft */, "run-right" /* runRight */]
                },
            ]
        };
    }
    emoji() {
        return "🐱";
    }
}
exports.Cat = Cat;
class Dog extends BasePetType {
    constructor() {
        super(...arguments);
        this.label = "dog";
        this.sequence = {
            startingState: "sit-idle" /* sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* sitIdle */,
                    possibleNextStates: ["walk-right" /* walkRight */, "run-right" /* runRight */, "lie" /* lie */]
                },
                {
                    state: "lie" /* lie */,
                    possibleNextStates: ["walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "walk-right" /* walkRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "run-right" /* runRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "walk-left" /* walkLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "lie" /* lie */, "walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "run-left" /* runLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "lie" /* lie */, "walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "chase" /* chase */,
                    possibleNextStates: ["idle-with-ball" /* idleWithBall */]
                },
                {
                    state: "idle-with-ball" /* idleWithBall */,
                    possibleNextStates: ["walk-right" /* walkRight */, "walk-left" /* walkLeft */, "run-left" /* runLeft */, "run-right" /* runRight */]
                },
            ]
        };
    }
    emoji() {
        return "🐶";
    }
}
exports.Dog = Dog;
class Snake extends BasePetType {
    constructor() {
        super(...arguments);
        this.label = "snake";
        this.sequence = {
            startingState: "sit-idle" /* sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* sitIdle */,
                    possibleNextStates: ["walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "walk-right" /* walkRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "run-right" /* runRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "walk-left" /* walkLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "run-left" /* runLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "chase" /* chase */,
                    possibleNextStates: ["idle-with-ball" /* idleWithBall */]
                },
                {
                    state: "idle-with-ball" /* idleWithBall */,
                    possibleNextStates: ["walk-right" /* walkRight */, "walk-left" /* walkLeft */, "run-left" /* runLeft */, "run-right" /* runRight */]
                },
            ]
        };
    }
    emoji() {
        return "🐍";
    }
}
exports.Snake = Snake;
class Clippy extends BasePetType {
    constructor() {
        super(...arguments);
        this.label = "clippy";
        this.sequence = {
            startingState: "sit-idle" /* sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* sitIdle */,
                    possibleNextStates: ["walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "walk-right" /* walkRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "run-right" /* runRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "walk-left" /* walkLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */]
                },
                {
                    state: "run-left" /* runLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */]
                },
                {
                    state: "chase" /* chase */,
                    possibleNextStates: ["idle-with-ball" /* idleWithBall */]
                },
                {
                    state: "idle-with-ball" /* idleWithBall */,
                    possibleNextStates: ["walk-right" /* walkRight */, "walk-left" /* walkLeft */, "run-left" /* runLeft */, "run-right" /* runRight */]
                },
            ]
        };
    }
    emoji() {
        return "📎";
    }
}
exports.Clippy = Clippy;
class RubberDuck extends BasePetType {
    constructor() {
        super(...arguments);
        this.label = "rubber-duck";
        this.sequence = {
            startingState: "sit-idle" /* sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* sitIdle */,
                    possibleNextStates: ["walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "walk-right" /* walkRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "run-right" /* runRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "walk-left" /* walkLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */]
                },
                {
                    state: "run-left" /* runLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */]
                },
                {
                    state: "chase" /* chase */,
                    possibleNextStates: ["idle-with-ball" /* idleWithBall */]
                },
                {
                    state: "idle-with-ball" /* idleWithBall */,
                    possibleNextStates: ["walk-right" /* walkRight */, "walk-left" /* walkLeft */, "run-left" /* runLeft */, "run-right" /* runRight */]
                },
            ]
        };
    }
    emoji() {
        return "🐥";
    }
}
exports.RubberDuck = RubberDuck;
class Crab extends BasePetType {
    constructor() {
        super(...arguments);
        this.label = "crab";
        this.sequence = {
            startingState: "sit-idle" /* sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* sitIdle */,
                    possibleNextStates: ["walk-right" /* walkRight */, "run-right" /* runRight */]
                },
                {
                    state: "walk-right" /* walkRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "run-right" /* runRight */,
                    possibleNextStates: ["walk-left" /* walkLeft */, "run-left" /* runLeft */]
                },
                {
                    state: "walk-left" /* walkLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */]
                },
                {
                    state: "run-left" /* runLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */]
                },
                {
                    state: "chase" /* chase */,
                    possibleNextStates: ["idle-with-ball" /* idleWithBall */]
                },
                {
                    state: "idle-with-ball" /* idleWithBall */,
                    possibleNextStates: ["walk-right" /* walkRight */, "walk-left" /* walkLeft */, "run-left" /* runLeft */, "run-right" /* runRight */]
                },
            ]
        };
    }
    emoji() {
        return "🦀";
    }
}
exports.Crab = Crab;
class InvalidPetException {
}
exports.InvalidPetException = InvalidPetException;
function getPetName(collection, label, count) {
    if (collection.has(count)) {
        return collection.get(count);
    }
    else {
        return label + count;
    }
}
function createPet(petType, el, collision, size, left, bottom, petRoot, floor, name, count) {
    if (petType === "totoro") {
        if (name === undefined) {
            name = getPetName(names_1.PET_NAMES, "totoro" /* totoro */, count);
        }
        return new Totoro(el, collision, size, left, bottom, petRoot, floor, name);
    }
    if (petType === "cat") {
        if (name === undefined) {
            name = getPetName(names_1.CAT_NAMES, "cat" /* cat */, count);
        }
        return new Cat(el, collision, size, left, bottom, petRoot, floor, name);
    }
    else if (petType === "dog") {
        if (name === undefined) {
            name = getPetName(names_1.DOG_NAMES, "dog" /* dog */, count);
        }
        return new Dog(el, collision, size, left, bottom, petRoot, floor, name);
    }
    else if (petType === "snake") {
        if (name === undefined) {
            name = getPetName(names_1.PET_NAMES, "snake" /* snake */, count);
        }
        return new Snake(el, collision, size, left, bottom, petRoot, floor, name);
    }
    else if (petType === "clippy") {
        if (name === undefined) {
            name = getPetName(names_1.PET_NAMES, "clippy" /* clippy */, count);
        }
        return new Clippy(el, collision, size, left, bottom, petRoot, floor, name);
    }
    else if (petType === "crab") {
        if (name === undefined) {
            name = getPetName(names_1.CRAB_NAMES, "crab" /* crab */, count);
        }
        return new Crab(el, collision, size, left, bottom, petRoot, floor, name);
    }
    else if (petType === "rubber-duck") {
        if (name === undefined) {
            name = getPetName(names_1.PET_NAMES, "rubber-duck" /* rubberduck */, count);
        }
        return new RubberDuck(el, collision, size, left, bottom, petRoot, floor, name);
    }
    throw new InvalidPetException();
}
exports.createPet = createPet;


/***/ }),

/***/ "./src/panel/states.ts":
/*!*****************************!*\
  !*** ./src/panel/states.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JumpDownLeftState = exports.ClimbWallLeftState = exports.ChaseFriendState = exports.ChaseState = exports.RunLeftState = exports.RunRightState = exports.WalkLeftState = exports.WalkRightState = exports.IdleWithBallState = exports.SwipeState = exports.LandState = exports.WallHangLeftState = exports.LieState = exports.SitIdleState = exports.resolveState = exports.isStateAboveGround = exports.BallState = exports.FrameResult = exports.HorizontalDirection = exports.PetPanelState = exports.PetElementState = exports.PetInstanceState = void 0;
class PetInstanceState {
}
exports.PetInstanceState = PetInstanceState;
class PetElementState {
}
exports.PetElementState = PetElementState;
class PetPanelState {
}
exports.PetPanelState = PetPanelState;
var HorizontalDirection;
(function (HorizontalDirection) {
    HorizontalDirection[HorizontalDirection["left"] = 0] = "left";
    HorizontalDirection[HorizontalDirection["right"] = 1] = "right";
    HorizontalDirection[HorizontalDirection["natural"] = 2] = "natural"; // No change to current direction
})(HorizontalDirection = exports.HorizontalDirection || (exports.HorizontalDirection = {}));
var FrameResult;
(function (FrameResult) {
    FrameResult[FrameResult["stateContinue"] = 0] = "stateContinue";
    FrameResult[FrameResult["stateComplete"] = 1] = "stateComplete";
    // Special states
    FrameResult[FrameResult["stateCancel"] = 2] = "stateCancel";
})(FrameResult = exports.FrameResult || (exports.FrameResult = {}));
class BallState {
    constructor(cx, cy, vx, vy) {
        this.cx = cx;
        this.cy = cy;
        this.vx = vx;
        this.vy = vy;
        this.paused = false;
    }
}
exports.BallState = BallState;
function isStateAboveGround(state) {
    return (state === "climb-wall-left" /* climbWallLeft */ ||
        state === "jump-down-left" /* jumpDownLeft */ ||
        state === "land" /* land */ ||
        state === "wall-hang-left" /* wallHangLeft */);
}
exports.isStateAboveGround = isStateAboveGround;
function resolveState(state, pet) {
    switch (state) {
        case "sit-idle" /* sitIdle */: return new SitIdleState(pet);
        case "walk-right" /* walkRight */: return new WalkRightState(pet);
        case "walk-left" /* walkLeft */: return new WalkLeftState(pet);
        case "run-right" /* runRight */: return new RunRightState(pet);
        case "run-left" /* runLeft */: return new RunLeftState(pet);
        case "lie" /* lie */: return new LieState(pet);
        case "wall-hang-left" /* wallHangLeft */: return new WallHangLeftState(pet);
        case "climb-wall-left" /* climbWallLeft */: return new ClimbWallLeftState(pet);
        case "jump-down-left" /* jumpDownLeft */: return new JumpDownLeftState(pet);
        case "land" /* land */: return new LandState(pet);
        case "swipe" /* swipe */: return new SwipeState(pet);
        case "idle-with-ball" /* idleWithBall */: return new IdleWithBallState(pet);
        case "chase-friend" /* chaseFriend */: return new ChaseFriendState(pet);
    }
    return new SitIdleState(pet);
}
exports.resolveState = resolveState;
class AbstractStaticState {
    constructor(pet) {
        this.label = "sit-idle" /* sitIdle */;
        this.spriteLabel = "idle";
        this.holdTime = 50;
        this.horizontalDirection = HorizontalDirection.left;
        this.idleCounter = 0;
        this.pet = pet;
    }
    nextFrame() {
        this.idleCounter++;
        if (this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
class SitIdleState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "sit-idle" /* sitIdle */;
        this.spriteLabel = "idle";
        this.horizontalDirection = HorizontalDirection.right;
        this.holdTime = 50;
    }
}
exports.SitIdleState = SitIdleState;
class LieState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "lie" /* lie */;
        this.spriteLabel = "lie";
        this.horizontalDirection = HorizontalDirection.right;
        this.holdTime = 50;
    }
}
exports.LieState = LieState;
class WallHangLeftState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "wall-hang-left" /* wallHangLeft */;
        this.spriteLabel = "wallgrab";
        this.horizontalDirection = HorizontalDirection.left;
        this.holdTime = 50;
    }
}
exports.WallHangLeftState = WallHangLeftState;
class LandState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "land" /* land */;
        this.spriteLabel = "land";
        this.horizontalDirection = HorizontalDirection.left;
        this.holdTime = 10;
    }
}
exports.LandState = LandState;
class SwipeState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "swipe" /* swipe */;
        this.spriteLabel = "swipe";
        this.horizontalDirection = HorizontalDirection.natural;
        this.holdTime = 30;
    }
}
exports.SwipeState = SwipeState;
class IdleWithBallState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "idle-with-ball" /* idleWithBall */;
        this.spriteLabel = "with_ball";
        this.horizontalDirection = HorizontalDirection.left;
        this.holdTime = 30;
    }
}
exports.IdleWithBallState = IdleWithBallState;
class WalkRightState {
    constructor(pet) {
        this.label = "walk-right" /* walkRight */;
        this.skipSpeed = 3;
        this.spriteLabel = "walk";
        this.horizontalDirection = HorizontalDirection.right;
        this.leftBoundary = Math.floor(window.innerWidth * 0.95);
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionLeft(this.pet.left() + this.skipSpeed);
        if (this.pet.left() >= this.leftBoundary - this.pet.width()) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.WalkRightState = WalkRightState;
class WalkLeftState {
    constructor(pet) {
        this.label = "walk-left" /* walkLeft */;
        this.skipSpeed = 3;
        this.spriteLabel = "walk";
        this.horizontalDirection = HorizontalDirection.left;
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionLeft(this.pet.left() - this.skipSpeed);
        if (this.pet.left() <= 0) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.WalkLeftState = WalkLeftState;
class RunRightState extends WalkRightState {
    constructor() {
        super(...arguments);
        this.label = "run-right" /* runRight */;
        this.spriteLabel = "walk_fast";
        this.skipSpeed = 5;
    }
}
exports.RunRightState = RunRightState;
class RunLeftState extends WalkLeftState {
    constructor() {
        super(...arguments);
        this.label = "run-left" /* runLeft */;
        this.spriteLabel = "walk_fast";
        this.skipSpeed = 5;
    }
}
exports.RunLeftState = RunLeftState;
class ChaseState {
    constructor(pet, ballState, canvas) {
        this.label = "chase" /* chase */;
        this.skipSpeed = 3;
        this.spriteLabel = "run";
        this.horizontalDirection = HorizontalDirection.left;
        this.pet = pet;
        this.ballState = ballState;
        this.canvas = canvas;
    }
    nextFrame() {
        if (this.ballState.paused) {
            return FrameResult.stateCancel; // Ball is already caught
        }
        if (this.pet.left() > this.ballState.cx) {
            this.horizontalDirection = HorizontalDirection.left;
            this.pet.positionLeft(this.pet.left() - this.skipSpeed);
        }
        else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left() + this.skipSpeed);
        }
        if (this.canvas.height - this.ballState.cy < (this.pet.width() + this.pet.floor()) &&
            this.ballState.cx < this.pet.left() &&
            this.pet.left() < this.ballState.cx + 15) {
            // hide ball
            this.canvas.style.display = "none";
            this.ballState.paused = true;
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.ChaseState = ChaseState;
class ChaseFriendState {
    constructor(pet) {
        this.label = "chase-friend" /* chaseFriend */;
        this.skipSpeed = 3;
        this.spriteLabel = "run";
        this.horizontalDirection = HorizontalDirection.left;
        this.pet = pet;
    }
    nextFrame() {
        if (!this.pet.friend().isPlaying()) {
            return FrameResult.stateCancel; // Friend is no longer playing.
        }
        if (this.pet.left() > this.pet.friend().left()) {
            this.horizontalDirection = HorizontalDirection.left;
            this.pet.positionLeft(this.pet.left() - this.skipSpeed);
        }
        else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left() + this.skipSpeed);
        }
        return FrameResult.stateContinue;
    }
}
exports.ChaseFriendState = ChaseFriendState;
class ClimbWallLeftState {
    constructor(pet) {
        this.label = "climb-wall-left" /* climbWallLeft */;
        this.skipSpeed = 3;
        this.spriteLabel = "wallclimb";
        this.horizontalDirection = HorizontalDirection.left;
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionBottom(this.pet.bottom() + 1);
        if (this.pet.bottom() >= 100) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.ClimbWallLeftState = ClimbWallLeftState;
class JumpDownLeftState {
    constructor(pet) {
        this.label = "jump-down-left" /* jumpDownLeft */;
        this.skipSpeed = 3;
        this.spriteLabel = "fall_from_grab";
        this.horizontalDirection = HorizontalDirection.right;
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionBottom(this.pet.bottom() - 5);
        if (this.pet.bottom() <= this.pet.floor()) {
            this.pet.positionBottom(this.pet.floor());
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.JumpDownLeftState = JumpDownLeftState;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***************************!*\
  !*** ./src/panel/main.ts ***!
  \***************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.petPanelApp = void 0;
const pets_1 = __webpack_require__(/*! ./pets */ "./src/panel/pets.ts");
const states_1 = __webpack_require__(/*! ./states */ "./src/panel/states.ts");
const vscode = window.acquireVsCodeApi();
var allPets = new pets_1.PetCollection();
var petCounter;
function calculateBallRadius(size) {
    if (size === "nano" /* nano */) {
        return 2;
    }
    else if (size === "medium" /* medium */) {
        return 4;
    }
    else if (size === "large" /* large */) {
        return 8;
    }
    else {
        return 1; // Shrug
    }
}
function calculateFloor(size, theme) {
    switch (theme) {
        case "forest" /* forest */:
            switch (size) {
                case "medium" /* medium */:
                    return 40;
                case "large" /* large */:
                    return 65;
                case "nano" /* nano */:
                default:
                    return 23;
            }
        case "castle" /* castle */:
            switch (size) {
                case "medium" /* medium */:
                    return 80;
                case "large" /* large */:
                    return 120;
                case "nano" /* nano */:
                default:
                    return 45;
            }
    }
    return 0;
}
function handleMouseOver(e) {
    var el = e.currentTarget;
    allPets.pets().forEach(element => {
        if (element.collision === el) {
            if (!element.pet.canSwipe()) {
                return;
            }
            element.pet.swipe();
        }
    });
}
function startAnimations(collision, pet) {
    collision.addEventListener("mouseover", handleMouseOver);
    setInterval(() => {
        var updates = allPets.seekNewFriends();
        updates.forEach(message => {
            vscode.postMessage({
                text: message,
                command: 'info'
            });
        });
        pet.nextFrame();
        saveState();
    }, 100);
}
function addPetToPanel(petType, basePetUri, petColor, petSize, left, bottom, floor, name) {
    var petSpriteElement = document.createElement("img");
    petSpriteElement.className = "pet";
    document.getElementById("petsContainer").appendChild(petSpriteElement);
    var collisionElement = document.createElement("div");
    collisionElement.className = "collision";
    document.getElementById("petsContainer").appendChild(collisionElement);
    const root = basePetUri + '/' + petType + '/' + petColor;
    console.log("Creating new pet : ", petType, root);
    var newPet = pets_1.createPet(petType, petSpriteElement, collisionElement, petSize, left, bottom, root, floor, name, petCounter);
    petCounter++;
    startAnimations(collisionElement, newPet);
    return new pets_1.PetElement(petSpriteElement, collisionElement, newPet, petColor, petType);
}
function saveState() {
    var state = new states_1.PetPanelState();
    state.petStates = new Array();
    allPets.pets().forEach(petItem => {
        state.petStates.push({
            petName: petItem.pet.name(),
            petColor: petItem.color,
            petType: petItem.type,
            petState: petItem.pet.getState(),
            petFriend: petItem.pet.friend() ? petItem.pet.friend().name() : undefined,
            elLeft: petItem.el.style.left,
            elBottom: petItem.el.style.bottom
        });
    });
    state.petCounter = petCounter;
    vscode.setState(state);
}
function recoverState(basePetUri, petSize, floor) {
    var state = vscode.getState();
    if (state.petCounter === undefined || isNaN(state.petCounter)) {
        petCounter = 1;
    }
    else {
        petCounter = state.petCounter;
    }
    var recoveryMap = new Map();
    state.petStates.forEach(p => {
        // Fixes a bug related to duck animations
        if (p.petType === "rubber duck") {
            p.petType = "rubber-duck";
        }
        try {
            var newPet = addPetToPanel(p.petType, basePetUri, p.petColor, petSize, parseInt(p.elLeft), parseInt(p.elBottom), floor, p.petName);
            allPets.push(newPet);
            recoveryMap.set(newPet.pet, p);
        }
        catch (InvalidPetException) {
            console.log("State had invalid pet (" + p.petType + "), discarding.");
        }
    });
    recoveryMap.forEach((state, pet) => {
        // Recover previous state.
        pet.recoverState(state.petState);
        // Resolve friend relationships
        var friend = undefined;
        if (state.petFriend) {
            friend = allPets.locate(state.petFriend);
            if (friend) {
                pet.recoverFriend(friend.pet);
            }
        }
    });
}
function randomStartPosition() {
    return Math.floor(Math.random() * (window.innerWidth * 0.7));
}
let canvas, ctx;
function initCanvas() {
    canvas = document.getElementById("petCanvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
// It cannot access the main VS Code APIs directly.
function petPanelApp(basePetUri, theme, themeKind, petColor, petSize, petType) {
    const ballRadius = calculateBallRadius(petSize);
    var floor = 0;
    // Apply Theme backgrounds
    if (theme !== "none" /* none */) {
        var _themeKind = "";
        switch (themeKind) {
            case 2 /* Dark */:
                _themeKind = "dark";
                break;
            case 1 /* Light */:
                _themeKind = "light";
                break;
            case 3 /* HighContrast */:
            default:
                _themeKind = "light";
                break;
        }
        document.body.style.backgroundImage = `url('${basePetUri}/backgrounds/${theme}/background-${_themeKind}-${petSize}.png')`;
        document.getElementById("foreground").style.backgroundImage = `url('${basePetUri}/backgrounds/${theme}/foreground-${_themeKind}-${petSize}.png')`;
        floor = calculateFloor(petSize, theme); // Themes have pets at a specified height from the ground
    }
    else {
        document.body.style.backgroundImage = "";
        document.getElementById("foreground").style.backgroundImage = "";
    }
    /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
    const gravity = 0.2, damping = 0.9, traction = 0.8;
    var ballState;
    function resetBall() {
        canvas.style.display = "block";
        ballState = new states_1.BallState(100, 100, 2, 5);
    }
    function throwBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!ballState.paused) {
            requestAnimationFrame(throwBall);
        }
        if (ballState.cx + ballRadius >= canvas.width) {
            ballState.vx = -ballState.vx * damping;
            ballState.cx = canvas.width - ballRadius;
        }
        else if (ballState.cx - ballRadius <= 0) {
            ballState.vx = -ballState.vx * damping;
            ballState.cx = ballRadius;
        }
        if (ballState.cy + ballRadius + floor >= (canvas.height)) {
            ballState.vy = -ballState.vy * damping;
            ballState.cy = canvas.height - ballRadius - floor;
            // traction here
            ballState.vx *= traction;
        }
        else if (ballState.cy - ballRadius <= 0) {
            ballState.vy = -ballState.vy * damping;
            ballState.cy = ballRadius;
        }
        ballState.vy += gravity;
        ballState.cx += ballState.vx;
        ballState.cy += ballState.vy;
        ctx.beginPath();
        ctx.arc(ballState.cx, ballState.cy, ballRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#2ed851";
        ctx.fill();
    }
    console.log('Starting pet session', petColor, basePetUri, petType);
    // New session
    var state = vscode.getState();
    if (!state) {
        console.log('No state, starting a new session.');
        petCounter = 1;
        allPets.push(addPetToPanel(petType, basePetUri, petColor, petSize, randomStartPosition(), floor, floor, undefined));
        saveState();
    }
    else {
        console.log('Recovering state - ', state);
        recoverState(basePetUri, petSize, floor);
    }
    initCanvas();
    // Handle messages sent from the extension to the webview
    window.addEventListener("message", (event) => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case "throw-ball":
                resetBall();
                throwBall();
                allPets.pets().forEach(petEl => {
                    if (petEl.pet.canChase()) {
                        petEl.pet.chase(ballState, canvas);
                    }
                });
                break;
            case "spawn-pet":
                allPets.push(addPetToPanel(message.type, basePetUri, message.color, petSize, randomStartPosition(), floor, floor, undefined));
                saveState();
                break;
            case "reset-pet":
                allPets.pets().forEach(pet => {
                    pet.el.remove();
                    pet.collision.remove();
                });
                allPets.reset();
                allPets.push(addPetToPanel(message.type, basePetUri, message.color, message.size, randomStartPosition(), floor, floor, undefined));
                petCounter = 1;
                saveState();
                break;
        }
    });
}
exports.petPanelApp = petPanelApp;
;
window.addEventListener('resize', function () {
    initCanvas();
});

})();

self.petApp = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvY29tbW9uL25hbWVzLnRzIiwid2VicGFjazovL3BldEFwcC8uL3NyYy9wYW5lbC9wZXRzLnRzIiwid2VicGFjazovL3BldEFwcC8uL3NyYy9wYW5lbC9zdGF0ZXMudHMiLCJ3ZWJwYWNrOi8vcGV0QXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BldEFwcC8uL3NyYy9wYW5lbC9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYSxpQkFBUyxHQUF3QixJQUFJLEdBQUcsQ0FBaUI7SUFDbEUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO0lBQ2YsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO0lBQ2YsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FB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QjtZQUFDLElBQUksR0FBRyxVQUFVLENBQUMsaUJBQVMsdUJBQWlCLEtBQUssQ0FBQyxDQUFDO1NBQUM7UUFDekQsT0FBTyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDN0U7U0FDSSxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDM0IsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUNsQjtZQUFDLElBQUksR0FBRyxVQUFVLENBQUMsaUJBQVMseUJBQWtCLEtBQUssQ0FBQyxDQUFDO1NBQUM7UUFDMUQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDOUU7U0FDSSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7UUFDekIsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUNsQjtZQUFDLElBQUksR0FBRyxVQUFVLENBQUMsa0JBQVUscUJBQWdCLEtBQUssQ0FBQyxDQUFDO1NBQUM7UUFDekQsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDNUU7U0FDSSxJQUFJLE9BQU8sS0FBSyxhQUFhLEVBQUU7UUFDaEMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUNsQjtZQUFDLElBQUksR0FBRyxVQUFVLENBQUMsaUJBQVMsa0NBQXNCLEtBQUssQ0FBQyxDQUFDO1NBQUM7UUFDOUQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbEY7SUFDRCxNQUFNLElB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QUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtJQUNoQyxVQUFVLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFBFVF9OQU1FUzogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcbiAgICBbMSwgJ0JlbGxhJ10sXG4gICAgWzIsICdDaGFybGllJ10sXG4gICAgWzMsICdNYXgnXSxcbiAgICBbNCwgJ01vbGx5J10sXG4gICAgWzUsICdDb2NvJ10sXG4gICAgWzYsICdCdWRkeSddLFxuICAgIFs3LCAnUnVieSddLFxuICAgIFs4LCAnT3NjYXInXSxcbiAgICBbOSwgJ0x1Y3knXSxcbiAgICBbMTAsICdCYWlsZXknXSxcbiAgICBbMTEsICdNaWxvJ10sXG4gICAgWzEyLCAnRGFpc3knXSxcbiAgICBbMTMsICdBcmNoaWUnXSxcbiAgICBbMTQsICdPbGxpZSddLFxuICAgIFsxNSwgJ1Jvc2llJ10sXG4gICAgWzE2LCAnTG9sYSddLFxuICAgIFsxNywgJ0ZyYW5raWUnXSxcbiAgICBbMTgsICdUb2J5J10sXG4gICAgWzE5LCAnUm94eSddLFxuICAgIFsyMCwgJ1BvcHB5J10sXG4gICAgWzIxLCAnTHVuYSddLFxuICAgIFsyMiwgJ0phY2snXSxcbiAgICBbMjMsICdNaWxsaWUnXSxcbiAgICBbMjQsICdUZWRkeSddLFxuICAgIFsyNSwgJ0hhcnJ5J10sXG4gICAgWzI2LCAnQ29vcGVyJ10sXG4gICAgWzI3LCAnQmVhciddLFxuICAgIFsyOCwgJ1JvY2t5J10sXG4gICAgWzI5LCAnQWxmaWUnXSxcbiAgICBbMzAsICdIdWdvJ10sXG4gICAgWzMxLCAnQm9ubmllJ10sXG4gICAgWzMyLCAnUGVwcGVyJ10sXG4gICAgWzMzLCAnTGlseSddLFxuICAgIFszNCwgJ1RpbGx5J10sXG4gICAgWzM1LCAnTGVvJ10sXG4gICAgWzM2LCAnTWFnZ2llJ10sXG4gICAgWzM3LCAnR2VvcmdlJ10sXG4gICAgWzM4LCAnTWlhJ10sXG4gICAgWzM5LCAnTWFybGV5J10sXG4gICAgWzQwLCAnSGFybGV5J10sXG4gICAgWzQxLCAnQ2hsb2UnXSxcbiAgICBbNDIsICdMdWx1J10sXG4gICAgWzQzLCAnTWlzc3knXSxcbiAgICBbNDQsICdKYXNwZXInXSxcbiAgICBbNDUsICdCaWxseSddLFxuICAgIFs0NiwgJ05hbGEnXSxcbiAgICBbNDcsICdNb250eSddLFxuICAgIFs0OCwgJ1ppZ2d5J10sXG4gICAgWzQ5LCAnV2luc3RvbiddLFxuICAgIFs1MCwgJ1pldXMnXSxcbiAgICBbNTEsICdab2UnXSxcbiAgICBbNTIsICdTdGVsbGEnXSxcbiAgICBbNTMsICdTYXNoYSddLFxuICAgIFs1NCwgJ1J1c3R5J10sXG4gICAgWzU1LCAnR3VzJ10sXG4gICAgWzU2LCAnQmF4dGVyJ10sXG4gICAgWzU3LCAnRGV4dGVyJ10sXG4gICAgWzU4LCAnRGllc2VsJ10sXG4gICAgWzU5LCAnV2lsbG93J10sXG4gICAgWzYwLCAnQmFybmV5J10sXG4gICAgWzYxLCAnQnJ1bm8nXSxcbiAgICBbNjIsICdQZW5ueSddLFxuICAgIFs2MywgJ0hvbmV5J10sXG4gICAgWzY0LCAnTWlsbHknXSxcbiAgICBbNjUsICdNdXJwaHknXSxcbiAgICBbNjYsICdTaW1iYSddLFxuICAgIFs2NywgJ0hvbGx5J10sXG4gICAgWzY4LCAnQmVuamknXSxcbiAgICBbNjksICdIZW5yeSddLFxuICAgIFs3MCwgJ0xpbGx5J10sXG4gICAgWzcxLCAnUGlwcGEnXSxcbiAgICBbNzIsICdTaGFkb3cnXSxcbiAgICBbNzMsICdTYW0nXSxcbiAgICBbNzQsICdCdXN0ZXInXSxcbiAgICBbNzUsICdMdWNreSddLFxuICAgIFs3NiwgJ0VsbGllJ10sXG4gICAgWzc3LCAnRHVrZSddLFxuICAgIFs3OCwgJ0plc3NpZSddLFxuICAgIFs3OSwgJ0Nvb2tpZSddLFxuICAgIFs4MCwgJ0hhcnZleSddLFxuICAgIFs4MSwgJ0JydWNlJ10sXG4gICAgWzgyLCAnSmF4J10sXG4gICAgWzgzLCAnUmV4J10sXG4gICAgWzg0LCAnTG91aWUnXSxcbiAgICBbODUsICdCZW50bGV5J10sXG4gICAgWzg2LCAnSmV0J10sXG4gICAgWzg3LCAnQmFuam8nXSxcbiAgICBbODgsICdCZWF1J10sXG4gICAgWzg5LCAnRWxsYSddLFxuICAgIFs5MCwgJ1JhbHBoJ10sXG4gICAgWzkxLCAnTG9raSddLFxuICAgIFs5MiwgJ0xleGknXSxcbiAgICBbOTMsICdDaGVzdGVyJ10sXG4gICAgWzk0LCAnU29waGllJ10sXG4gICAgWzk1LCAnQ2hpbGxpJ10sXG4gICAgWzk2LCAnQmlsbGllJ10sXG4gICAgWzk3LCAnTG91aXMnXSxcbiAgICBbOTgsICdTY291dCddLFxuICAgIFs5OSwgJ0NoYXJsaWUnXSxcbiAgICBbMTAwLCAnQ2xlbyddLFxuXSk7XG5cbmV4cG9ydCBjb25zdCBDQVRfTkFNRVMgPSBQRVRfTkFNRVM7XG5cbmV4cG9ydCBjb25zdCBET0dfTkFNRVMgPSBQRVRfTkFNRVM7XG5cbmV4cG9ydCBjb25zdCBDUkFCX05BTUVTIDogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcbiAgICBbMSwgJ0ZlcnJpcyddLFxuICAgIFsyLCAnUGluY2h5J10sXG4gICAgWzMsICdHcmFiYnknXSxcbiAgICBbNCwgJ0JpZyBSZWQnXSxcbiAgICBbNSwgJ0NyYWJieSddLFxuICAgIFs2LCAnQnVkZHknXSxcbiAgICBbNywgJ1J1YnknXSxcbiAgICBbOCwgJ09zY2FyJ10sXG4gICAgWzksICdMdWN5J10sXG4gICAgWzEwLCAnQmFpbGV5J11cbl0pO1xuXG4iLCJpbXBvcnQgeyBQZXRDb2xvciwgUGV0U2l6ZSwgUGV0VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdHlwZXNcIjtcbmltcG9ydCB7IElTZXF1ZW5jZVRyZWUgfSBmcm9tIFwiLi9zZXF1ZW5jZXNcIjtcbmltcG9ydCB7IElTdGF0ZSwgU3RhdGVzLCByZXNvbHZlU3RhdGUsIEhvcml6b250YWxEaXJlY3Rpb24sIENoYXNlU3RhdGUsIEJhbGxTdGF0ZSwgRnJhbWVSZXN1bHQsIFBldEluc3RhbmNlU3RhdGUsIGlzU3RhdGVBYm92ZUdyb3VuZCwgUGV0RWxlbWVudFN0YXRlIH0gZnJvbSBcIi4vc3RhdGVzXCI7XG5pbXBvcnQgeyBQRVRfTkFNRVMsIENBVF9OQU1FUywgRE9HX05BTUVTLCBDUkFCX05BTUVTIH0gZnJvbSBcIi4uL2NvbW1vbi9uYW1lc1wiO1xuXG5leHBvcnQgY2xhc3MgSW52YWxpZFN0YXRlRXhjZXB0aW9uIHtcblxufVxuXG5leHBvcnQgY2xhc3MgUGV0RWxlbWVudCB7XG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuICAgIGNvbG9yOiBQZXRDb2xvcjtcbiAgICB0eXBlOiBQZXRUeXBlO1xuICBcbiAgICBjb25zdHJ1Y3RvcihlbDogSFRNTEltYWdlRWxlbWVudCwgY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudCwgcGV0OiBJUGV0VHlwZSwgY29sb3I6IFBldENvbG9yLCB0eXBlOiBQZXRUeXBlKXtcbiAgICAgIHRoaXMuZWwgPSBlbDtcbiAgICAgIHRoaXMuY29sbGlzaW9uID0gY29sbGlzaW9uO1xuICAgICAgdGhpcy5wZXQgPSBwZXQ7XG4gICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgfVxuXG5leHBvcnQgaW50ZXJmYWNlIElQZXRDb2xsZWN0aW9uIHtcbiAgICBwZXRzKCk6IEFycmF5PFBldEVsZW1lbnQ+O1xuICAgIHB1c2gocGV0OiBQZXRFbGVtZW50KTogdm9pZDtcbiAgICByZXNldCgpOiB2b2lkO1xuICAgIHNlZWtOZXdGcmllbmRzKCk6IHN0cmluZ1tdO1xuICAgIGxvY2F0ZShuYW1lOiBzdHJpbmcpOiBQZXRFbGVtZW50IHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY2xhc3MgUGV0Q29sbGVjdGlvbiBpbXBsZW1lbnRzIElQZXRDb2xsZWN0aW9uIHtcbiAgICBfcGV0czogQXJyYXk8UGV0RWxlbWVudD47XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLl9wZXRzID0gbmV3IEFycmF5KDApO1xuICAgIH1cblxuICAgIHBldHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZXRzO1xuICAgIH1cblxuICAgIHB1c2gocGV0OiBQZXRFbGVtZW50KXtcbiAgICAgICAgdGhpcy5fcGV0cy5wdXNoKHBldCk7XG4gICAgfVxuXG4gICAgcmVzZXQoKXtcbiAgICAgICAgdGhpcy5fcGV0cyA9IFtdO1xuICAgIH1cblxuICAgIGxvY2F0ZShuYW1lOiBzdHJpbmcpOiBQZXRFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BldHMuZmluZCgoY29sbGVjdGlvbiwgdmFsdWUsIG9iaikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ucGV0Lm5hbWUoKSA9PT0gbmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2Vla05ld0ZyaWVuZHMoKSA6IHN0cmluZ1tdIHsgXG4gICAgICAgIGlmICh0aGlzLl9wZXRzLmxlbmd0aCA8PSAxKVxuICAgICAgICAgICAge3JldHVybiBbXTt9IC8vIFlvdSBjYW4ndCBiZSBmcmllbmRzIHdpdGggeW91cnNlbGYuXG4gICAgICAgIHZhciBtZXNzYWdlcyA9IG5ldyBBcnJheTxzdHJpbmc+KDApO1xuICAgICAgICB0aGlzLl9wZXRzLmZvckVhY2gocGV0SW5Db2xsZWN0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChwZXRJbkNvbGxlY3Rpb24ucGV0Lmhhc0ZyaWVuZCgpKVxuICAgICAgICAgICAgICAgIHtyZXR1cm47fSAvLyBJIGFscmVhZHkgaGF2ZSBhIGZyaWVuZCFcbiAgICAgICAgICAgIHRoaXMuX3BldHMuZm9yRWFjaChwb3RlbnRpYWxGcmllbmQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwb3RlbnRpYWxGcmllbmQucGV0Lmhhc0ZyaWVuZCgpKVxuICAgICAgICAgICAgICAgICAgICB7cmV0dXJuO30gLy8gQWxyZWFkeSBoYXMgYSBmcmllbmQuIHNvcnJ5LlxuICAgICAgICAgICAgICAgIGlmICghcG90ZW50aWFsRnJpZW5kLnBldC5jYW5DaGFzZSgpKVxuICAgICAgICAgICAgICAgICAgICB7cmV0dXJuO30gLy8gUGV0IGlzIGJ1c3kgZG9pbmcgc29tZXRoaW5nIGVsc2UuXG4gICAgICAgICAgICAgICAgaWYgKHBvdGVudGlhbEZyaWVuZC5wZXQubGVmdCgpID4gcGV0SW5Db2xsZWN0aW9uLnBldC5sZWZ0KCkgJiZcbiAgICAgICAgICAgICAgICAgICAgcG90ZW50aWFsRnJpZW5kLnBldC5sZWZ0KCkgPCBwZXRJbkNvbGxlY3Rpb24ucGV0LmxlZnQoKSArIHBldEluQ29sbGVjdGlvbi5wZXQud2lkdGgoKSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBwb3NzaWJsZSBuZXcgZnJpZW5kLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBldEluQ29sbGVjdGlvbi5wZXQubmFtZSgpLCBcIiB3YW50cyB0byBiZSBmcmllbmRzIHdpdGggXCIsIHBvdGVudGlhbEZyaWVuZC5wZXQubmFtZSgpLCBcIi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGV0SW5Db2xsZWN0aW9uLnBldC5tYWtlRnJpZW5kc1dpdGgocG90ZW50aWFsRnJpZW5kLnBldCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChgJHtwZXRJbkNvbGxlY3Rpb24ucGV0Lm5hbWUoKX0gKCR7cGV0SW5Db2xsZWN0aW9uLnBldC5lbW9qaSgpfSk6IEknbSBub3cgZnJpZW5kcyDinaTvuI8gd2l0aCAke3BvdGVudGlhbEZyaWVuZC5wZXQubmFtZSgpfSAoJHtwb3RlbnRpYWxGcmllbmQucGV0LmVtb2ppKCl9KWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlcztcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBldFR5cGUge1xuICAgIG5leHRGcmFtZSgpOiB2b2lkXG5cbiAgICAvLyBTcGVjaWFsIG1ldGhvZHMgZm9yIGFjdGlvbnNcbiAgICBjYW5Td2lwZSgpOiBib29sZWFuXG4gICAgY2FuQ2hhc2UoKTogYm9vbGVhblxuICAgIHN3aXBlKCk6IHZvaWRcbiAgICBjaGFzZShiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWRcblxuICAgIC8vIFN0YXRlIEFQSVxuICAgIGdldFN0YXRlKCk6IFBldEluc3RhbmNlU3RhdGVcbiAgICByZWNvdmVyU3RhdGUoc3RhdGU6IFBldEluc3RhbmNlU3RhdGUpOiB2b2lkXG4gICAgcmVjb3ZlckZyaWVuZChmcmllbmQ6IElQZXRUeXBlKTogdm9pZFxuXG4gICAgLy8gUG9zaXRpb25pbmdcbiAgICBib3R0b20oKTogbnVtYmVyO1xuICAgIGxlZnQoKTogbnVtYmVyO1xuICAgIHBvc2l0aW9uQm90dG9tKGJvdHRvbTogbnVtYmVyKTogdm9pZDtcbiAgICBwb3NpdGlvbkxlZnQobGVmdDogbnVtYmVyKTogdm9pZDtcbiAgICB3aWR0aCgpOiBudW1iZXI7XG4gICAgZmxvb3IoKTogbnVtYmVyO1xuXG4gICAgLy8gRnJpZW5kcyBBUElcbiAgICBuYW1lKCk6IHN0cmluZztcbiAgICBlbW9qaSgpOiBzdHJpbmc7XG4gICAgaGFzRnJpZW5kKCk6IGJvb2xlYW47XG4gICAgZnJpZW5kKCk6IElQZXRUeXBlO1xuICAgIG1ha2VGcmllbmRzV2l0aChmcmllbmQ6IElQZXRUeXBlKTogYm9vbGVhbjtcbiAgICBpc1BsYXlpbmcoKTogYm9vbGVhbjtcbn0gXG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNwcml0ZVdpZHRoKHNpemU6IFBldFNpemUpOiBudW1iZXJ7XG4gICAgaWYgKHNpemUgPT09IFBldFNpemUubmFubyl7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLm1lZGl1bSl7XG4gICAgICByZXR1cm4gNTU7XG4gICAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLmxhcmdlKXtcbiAgICAgIHJldHVybiAxMTA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAzMDsgLy8gU2hydWdcbiAgICB9XG4gIH1cblxuYWJzdHJhY3QgY2xhc3MgQmFzZVBldFR5cGUgaW1wbGVtZW50cyBJUGV0VHlwZSB7XG4gICAgbGFiZWw6IHN0cmluZyA9IFwiYmFzZVwiO1xuICAgIHNlcXVlbmNlOiBJU2VxdWVuY2VUcmVlID0geyBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSwgc2VxdWVuY2VTdGF0ZXM6IFtdfTtcbiAgICBjdXJyZW50U3RhdGU6IElTdGF0ZTtcbiAgICBjdXJyZW50U3RhdGVFbnVtOiBTdGF0ZXM7XG4gICAgaG9sZFN0YXRlOiBJU3RhdGUgfCB1bmRlZmluZWQ7XG4gICAgaG9sZFN0YXRlRW51bTogU3RhdGVzIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjb2xsaXNpb246IEhUTUxEaXZFbGVtZW50O1xuICAgIHByaXZhdGUgX2xlZnQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9ib3R0b206IG51bWJlcjtcbiAgICBwZXRSb290OiBzdHJpbmc7XG4gICAgX2Zsb29yOiBudW1iZXI7XG4gICAgX2ZyaWVuZDogSVBldFR5cGUgfCB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgY29sbGlzaW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQsIHNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHBldFJvb3Q6IHN0cmluZywgZmxvb3I6IG51bWJlciwgbmFtZTogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5lbCA9IHNwcml0ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gY29sbGlzaW9uRWxlbWVudDtcbiAgICAgICAgdGhpcy5wZXRSb290ID0gcGV0Um9vdDtcbiAgICAgICAgdGhpcy5fZmxvb3IgPSBmbG9vcjtcbiAgICAgICAgdGhpcy5fbGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgdGhpcy5pbml0U3ByaXRlKHNpemUsIGxlZnQsIGJvdHRvbSk7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHRoaXMuc2VxdWVuY2Uuc3RhcnRpbmdTdGF0ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBpbml0U3ByaXRlKHBldFNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGA7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUuYm90dG9tID0gYCR7Ym90dG9tfXB4YDtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLm1heFdpZHRoID0gYCR7Y2FsY3VsYXRlU3ByaXRlV2lkdGgocGV0U2l6ZSl9cHhgO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLm1heEhlaWdodCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS5ib3R0b20gPSBgJHtib3R0b219cHhgO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS53aWR0aCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuaGVpZ2h0ID0gYCR7Y2FsY3VsYXRlU3ByaXRlV2lkdGgocGV0U2l6ZSl9cHhgO1xuICAgICAgfVxuXG4gICAgbGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcbiAgICB9XG5cbiAgICBib3R0b20oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdHRvbTtcbiAgICB9XG5cbiAgICBwb3NpdGlvbkJvdHRvbShib3R0b206IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLl9ib3R0b219cHhgO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuX2JvdHRvbX1weGA7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uLnN0eWxlLmxlZnQgPSBgJHt0aGlzLl9sZWZ0fXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuYm90dG9tID0gYCR7dGhpcy5fYm90dG9tfXB4YDtcbiAgICB9O1xuXG4gICAgcG9zaXRpb25MZWZ0KGxlZnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9sZWZ0ID0gbGVmdDtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5fbGVmdH1weGA7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3RoaXMuX2xlZnR9cHhgO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5fbGVmdH1weGA7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuX2JvdHRvbX1weGA7XG4gICAgfVxuXG4gICAgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwud2lkdGg7XG4gICAgfVxuXG4gICAgZmxvb3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zsb29yO1xuICAgIH1cblxuICAgIGdldFN0YXRlKCk6IFBldEluc3RhbmNlU3RhdGUgeyBcbiAgICAgICAgcmV0dXJuIHtjdXJyZW50U3RhdGVFbnVtOiB0aGlzLmN1cnJlbnRTdGF0ZUVudW19O1xuICAgIH1cblxuICAgIHJlY292ZXJGcmllbmQoZnJpZW5kOiBJUGV0VHlwZSl7XG4gICAgICAgIC8vIFJlY292ZXIgZnJpZW5kcy4uXG4gICAgICAgIHRoaXMuX2ZyaWVuZCA9IGZyaWVuZDtcbiAgICB9XG5cbiAgICByZWNvdmVyU3RhdGUoc3RhdGU6IFBldEluc3RhbmNlU3RhdGUpe1xuICAgICAgICAvLyBUT0RPIDogUmVzb2x2ZSBhIGJ1ZyB3aGVyZSBpZiBpdCB3YXMgc3dpcGluZyBiZWZvcmUsIGl0IHdvdWxkIGZhaWxcbiAgICAgICAgLy8gYmVjYXVzZSBob2xkU3RhdGUgaXMgbm8gbG9uZ2VyIHZhbGlkLlxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBzdGF0ZS5jdXJyZW50U3RhdGVFbnVtITtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCB0aGlzKTtcblxuICAgICAgICBpZiAoIWlzU3RhdGVBYm92ZUdyb3VuZCh0aGlzLmN1cnJlbnRTdGF0ZUVudW0pKXtcbiAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBib3R0b20gb2YgdGhlIHNwcml0ZSB0byB0aGUgZmxvb3IgYXMgdGhlIHRoZW1lXG4gICAgICAgICAgICAvLyBoYXMgbGlrZWx5IGNoYW5nZWQuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uQm90dG9tKHRoaXMuZmxvb3IoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Td2lwZSgpe1xuICAgICAgICByZXR1cm4gIWlzU3RhdGVBYm92ZUdyb3VuZCh0aGlzLmN1cnJlbnRTdGF0ZUVudW0pO1xuICAgIH1cblxuICAgIGNhbkNoYXNlKCl7XG4gICAgICAgIHJldHVybiAhaXNTdGF0ZUFib3ZlR3JvdW5kKHRoaXMuY3VycmVudFN0YXRlRW51bSkgJiYgdGhpcy5jdXJyZW50U3RhdGVFbnVtICE9PSBTdGF0ZXMuY2hhc2U7XG4gICAgfVxuXG4gICAgc3dpcGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPT09IFN0YXRlcy5zd2lwZSkgeyByZXR1cm47IH1cbiAgICAgICAgdGhpcy5ob2xkU3RhdGUgPSB0aGlzLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgdGhpcy5ob2xkU3RhdGVFbnVtID0gdGhpcy5jdXJyZW50U3RhdGVFbnVtO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBTdGF0ZXMuc3dpcGU7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSwgdGhpcyk7XG4gICAgfVxuICAgIFxuICAgIGNoYXNlKGJhbGxTdGF0ZTogQmFsbFN0YXRlLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IFN0YXRlcy5jaGFzZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBuZXcgQ2hhc2VTdGF0ZSh0aGlzLCBiYWxsU3RhdGUsIGNhbnZhcyk7XG4gICAgfVxuXG4gICAgZmFjZUxlZnQoKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZVgoLTEpXCI7XG4gICAgfVxuXG4gICAgZmFjZVJpZ2h0KCkge1xuICAgICAgICB0aGlzLmVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwic2NhbGVYKDEpXCI7XG4gICAgfVxuXG4gICAgc2V0QW5pbWF0aW9uKGZhY2U6IHN0cmluZykge1xuICAgICAgICBjb25zdCBuZXdGYWNlOiBzdHJpbmcgPSBgJHt0aGlzLnBldFJvb3R9XyR7ZmFjZX1fOGZwcy5naWZgO1xuICAgICAgICBpZiAodGhpcy5lbC5zcmMgPT09IG5ld0ZhY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsLnNyYyA9IG5ld0ZhY2U7XG4gICAgfVxuXG4gICAgY2hvb3NlTmV4dFN0YXRlKGZyb21TdGF0ZTogU3RhdGVzKTogU3RhdGVzIHtcbiAgICAgICAgLy8gV29yayBvdXQgbmV4dCBzdGF0ZVxuICAgICAgICB2YXIgcG9zc2libGVOZXh0U3RhdGVzOiBTdGF0ZXNbXSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgdGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2Uuc2VxdWVuY2VTdGF0ZXNbaV0uc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlcyA9IHRoaXMuc2VxdWVuY2Uuc2VxdWVuY2VTdGF0ZXNbaV0ucG9zc2libGVOZXh0U3RhdGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcG9zc2libGVOZXh0U3RhdGVzKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkU3RhdGVFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByYW5kb21seSBjaG9vc2UgdGhlIG5leHQgc3RhdGVcbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGVOZXh0U3RhdGVzLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBwb3NzaWJsZU5leHRTdGF0ZXNbaWR4XTtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjZUxlZnQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmZhY2VSaWdodCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKHRoaXMuY3VycmVudFN0YXRlLnNwcml0ZUxhYmVsKTtcblxuICAgICAgICAvLyBXaGF0J3MgbXkgYnVkZHkgZG9pbmc/XG4gICAgICAgIGlmICh0aGlzLmhhc0ZyaWVuZCgpICYmIHRoaXMuY3VycmVudFN0YXRlRW51bSAhPT0gU3RhdGVzLmNoYXNlRnJpZW5kKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyaWVuZCgpLmlzUGxheWluZygpICYmICFpc1N0YXRlQWJvdmVHcm91bmQodGhpcy5jdXJyZW50U3RhdGVFbnVtKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZShTdGF0ZXMuY2hhc2VGcmllbmQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IFN0YXRlcy5jaGFzZUZyaWVuZDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnJhbWVSZXN1bHQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5uZXh0RnJhbWUoKTtcbiAgICAgICAgaWYgKGZyYW1lUmVzdWx0ID09PSBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBJZiByZWNvdmVyaW5nIGZyb20gc3dpcGUuLlxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZFN0YXRlICYmIHRoaXMuaG9sZFN0YXRlRW51bSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmhvbGRTdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSB0aGlzLmhvbGRTdGF0ZUVudW07XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkU3RhdGVFbnVtID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5leHRTdGF0ZSA9IHRoaXMuY2hvb3NlTmV4dFN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZShuZXh0U3RhdGUsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gbmV4dFN0YXRlO1xuICAgICAgICB9IGVsc2UgaWYgKGZyYW1lUmVzdWx0ID09PSBGcmFtZVJlc3VsdC5zdGF0ZUNhbmNlbCl7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuY2hhc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5jaG9vc2VOZXh0U3RhdGUoU3RhdGVzLmlkbGVXaXRoQmFsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUobmV4dFN0YXRlLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBuZXh0U3RhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmNoYXNlRnJpZW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTdGF0ZSA9IHRoaXMuY2hvb3NlTmV4dFN0YXRlKFN0YXRlcy5pZGxlV2l0aEJhbGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKG5leHRTdGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gbmV4dFN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzRnJpZW5kKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyaWVuZCAhPT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZyaWVuZCgpIDogSVBldFR5cGUgeyBcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyaWVuZCE7XG4gICAgfVxuXG4gICAgbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG5cbiAgICBtYWtlRnJpZW5kc1dpdGgoZnJpZW5kOiBJUGV0VHlwZSk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLl9mcmllbmQgPSBmcmllbmQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSgpLCBcIjogSSdtIG5vdyBmcmllbmRzIOKdpO+4jyB3aXRoIFwiLCBmcmllbmQubmFtZSgpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaXNQbGF5aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMucnVuUmlnaHQgfHwgdGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMucnVuTGVmdCA7XG4gICAgfVxuXG4gICAgZW1vamkoKTogc3RyaW5nIHsgXG4gICAgICAgIHJldHVybiBcIvCfkLZcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3Rvcm8gZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XG4gICAgbGFiZWwgPSBcInRvdG9yb1wiO1xuICAgIHNlcXVlbmNlID0ge1xuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLmxpZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5saWUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMuY2xpbWJXYWxsTGVmdCwgU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2xpbWJXYWxsTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2FsbEhhbmdMZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGxIYW5nTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuanVtcERvd25MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmp1bXBEb3duTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMubGFuZF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5sYW5kLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMubGllXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xuICAgIGVtb2ppKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gXCLwn5C+XCI7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIENhdCBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwiY2F0XCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnQsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMuY2xpbWJXYWxsTGVmdCwgU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNsaW1iV2FsbExlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGxIYW5nTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxsSGFuZ0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmp1bXBEb3duTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5qdW1wRG93bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmxhbmRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMubGFuZCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xuICAgIGVtb2ppKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gXCLwn5CxXCI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRG9nIGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJkb2dcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodCwgU3RhdGVzLmxpZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5saWUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5saWUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMubGllLCBTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG4gICAgZW1vamkoKTogc3RyaW5nIHsgXG4gICAgICAgIHJldHVybiBcIvCfkLZcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbmFrZSBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwic25ha2VcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xuICAgIGVtb2ppKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gXCLwn5CNXCI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xpcHB5IGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJjbGlwcHlcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG4gICAgZW1vamkoKTogc3RyaW5nIHsgXG4gICAgICAgIHJldHVybiBcIvCfk45cIjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSdWJiZXJEdWNrIGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJydWJiZXItZHVja1wiO1xuICAgIHNlcXVlbmNlID0ge1xuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbiAgICBlbW9qaSgpOiBzdHJpbmcgeyBcbiAgICAgICAgcmV0dXJuIFwi8J+QpVwiO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENyYWIgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XG4gICAgbGFiZWwgPSBcImNyYWJcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG4gICAgZW1vamkoKTogc3RyaW5nIHsgXG4gICAgICAgIHJldHVybiBcIvCfpoBcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkUGV0RXhjZXB0aW9uIHtcbn1cblxuZnVuY3Rpb24gZ2V0UGV0TmFtZShjb2xsZWN0aW9uOiBNYXA8bnVtYmVyLCBzdHJpbmc+LCBsYWJlbDogc3RyaW5nLCBjb3VudDogbnVtYmVyKSA6IHN0cmluZyB7XG4gICAgaWYgKGNvbGxlY3Rpb24uaGFzKGNvdW50KSl7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmdldChjb3VudCkhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsYWJlbCArIGNvdW50O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBldChwZXRUeXBlOiBzdHJpbmcsIGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBjb2xsaXNpb246IEhUTUxEaXZFbGVtZW50LCBzaXplOiBQZXRTaXplLCBsZWZ0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBwZXRSb290OiBzdHJpbmcsIGZsb29yOiBudW1iZXIsIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCwgY291bnQ6IG51bWJlcikgOiBJUGV0VHlwZSB7XG4gICAgaWYgKHBldFR5cGUgPT09IFwidG90b3JvXCIpe1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge25hbWUgPSBnZXRQZXROYW1lKFBFVF9OQU1FUywgUGV0VHlwZS50b3Rvcm8sIGNvdW50KTt9XG4gICAgICAgIHJldHVybiBuZXcgVG90b3JvKGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IsIG5hbWUpO1xuICAgIH1cbiAgICBpZiAocGV0VHlwZSA9PT0gXCJjYXRcIil7XG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7bmFtZSA9IGdldFBldE5hbWUoQ0FUX05BTUVTLCBQZXRUeXBlLmNhdCwgY291bnQpO31cbiAgICAgICAgcmV0dXJuIG5ldyBDYXQoZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vciwgbmFtZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwiZG9nXCIpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtuYW1lID0gZ2V0UGV0TmFtZShET0dfTkFNRVMsIFBldFR5cGUuZG9nLCBjb3VudCk7fVxuICAgICAgICByZXR1cm4gbmV3IERvZyhlbCwgY29sbGlzaW9uLCBzaXplLCBsZWZ0LCBib3R0b20sIHBldFJvb3QsIGZsb29yLCBuYW1lKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJzbmFrZVwiKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7bmFtZSA9IGdldFBldE5hbWUoUEVUX05BTUVTLCBQZXRUeXBlLnNuYWtlLCBjb3VudCk7fVxuICAgICAgICByZXR1cm4gbmV3IFNuYWtlKGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IsIG5hbWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcImNsaXBweVwiKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7bmFtZSA9IGdldFBldE5hbWUoUEVUX05BTUVTLCBQZXRUeXBlLmNsaXBweSwgY291bnQpO31cbiAgICAgICAgcmV0dXJuIG5ldyBDbGlwcHkoZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vciwgbmFtZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwiY3JhYlwiKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7bmFtZSA9IGdldFBldE5hbWUoQ1JBQl9OQU1FUywgUGV0VHlwZS5jcmFiLCBjb3VudCk7fVxuICAgICAgICByZXR1cm4gbmV3IENyYWIoZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vciwgbmFtZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwicnViYmVyLWR1Y2tcIikge1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge25hbWUgPSBnZXRQZXROYW1lKFBFVF9OQU1FUywgUGV0VHlwZS5ydWJiZXJkdWNrLCBjb3VudCk7fVxuICAgICAgICByZXR1cm4gbmV3IFJ1YmJlckR1Y2soZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vciwgbmFtZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBJbnZhbGlkUGV0RXhjZXB0aW9uKCk7XG59XG5cbiIsImltcG9ydCB7IFBldENvbG9yLCBQZXRUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBlc1wiO1xuaW1wb3J0IHsgSVBldFR5cGUgfSBmcm9tIFwiLi9wZXRzXCI7XG5cbmV4cG9ydCBjbGFzcyBQZXRJbnN0YW5jZVN0YXRlIHtcbiAgICBjdXJyZW50U3RhdGVFbnVtOiBTdGF0ZXMgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQZXRFbGVtZW50U3RhdGUge1xuICAgIHBldFN0YXRlOiBQZXRJbnN0YW5jZVN0YXRlIHwgdW5kZWZpbmVkO1xuICAgIHBldFR5cGU6IFBldFR5cGUgfCB1bmRlZmluZWQ7XG4gICAgcGV0Q29sb3I6IFBldENvbG9yIHwgdW5kZWZpbmVkO1xuICAgIGVsTGVmdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGVsQm90dG9tOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcGV0TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHBldEZyaWVuZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY2xhc3MgUGV0UGFuZWxTdGF0ZSB7XG4gICAgcGV0U3RhdGVzOiBBcnJheTxQZXRFbGVtZW50U3RhdGU+IHwgdW5kZWZpbmVkO1xuICAgIHBldENvdW50ZXI6IG51bWJlciB8IHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZW51bSBIb3Jpem9udGFsRGlyZWN0aW9uIHtcbiAgICBsZWZ0LFxuICAgIHJpZ2h0LFxuICAgIG5hdHVyYWwgLy8gTm8gY2hhbmdlIHRvIGN1cnJlbnQgZGlyZWN0aW9uXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFN0YXRlcyB7XG4gICAgc2l0SWRsZSA9IFwic2l0LWlkbGVcIixcbiAgICB3YWxrUmlnaHQgPSBcIndhbGstcmlnaHRcIixcbiAgICB3YWxrTGVmdCA9IFwid2Fsay1sZWZ0XCIsXG4gICAgcnVuUmlnaHQgPSBcInJ1bi1yaWdodFwiLFxuICAgIHJ1bkxlZnQgPSBcInJ1bi1sZWZ0XCIsXG4gICAgbGllID0gXCJsaWVcIixcbiAgICB3YWxsSGFuZ0xlZnQgPSBcIndhbGwtaGFuZy1sZWZ0XCIsXG4gICAgY2xpbWJXYWxsTGVmdCA9IFwiY2xpbWItd2FsbC1sZWZ0XCIsXG4gICAganVtcERvd25MZWZ0ID0gXCJqdW1wLWRvd24tbGVmdFwiLFxuICAgIGxhbmQgPSBcImxhbmRcIixcbiAgICBzd2lwZSA9IFwic3dpcGVcIixcbiAgICBpZGxlV2l0aEJhbGwgPSBcImlkbGUtd2l0aC1iYWxsXCIsXG4gICAgY2hhc2UgPSBcImNoYXNlXCIsXG4gICAgY2hhc2VGcmllbmQgPSBcImNoYXNlLWZyaWVuZFwiXG59XG5cbmV4cG9ydCBlbnVtIEZyYW1lUmVzdWx0IHsgXG4gICAgc3RhdGVDb250aW51ZSxcbiAgICBzdGF0ZUNvbXBsZXRlLFxuICAgIC8vIFNwZWNpYWwgc3RhdGVzXG4gICAgc3RhdGVDYW5jZWxcbn1cblxuZXhwb3J0IGNsYXNzIEJhbGxTdGF0ZSB7XG4gICAgY3g6IG51bWJlcjtcbiAgICBjeTogbnVtYmVyO1xuICAgIHZ4OiBudW1iZXI7XG4gICAgdnk6IG51bWJlcjtcbiAgICBwYXVzZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihjeDogbnVtYmVyLCBjeTogbnVtYmVyLCB2eDogbnVtYmVyLCB2eTogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5jeCA9IGN4O1xuICAgICAgICB0aGlzLmN5ID0gY3k7XG4gICAgICAgIHRoaXMudnggPSB2eDtcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RhdGVBYm92ZUdyb3VuZChzdGF0ZTogU3RhdGVzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChzdGF0ZSA9PT0gU3RhdGVzLmNsaW1iV2FsbExlZnQgfHxcbiAgICAgICAgICAgIHN0YXRlID09PSBTdGF0ZXMuanVtcERvd25MZWZ0IHx8IFxuICAgICAgICAgICAgc3RhdGUgPT09IFN0YXRlcy5sYW5kIHx8XG4gICAgICAgICAgICBzdGF0ZSA9PT0gU3RhdGVzLndhbGxIYW5nTGVmdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlU3RhdGUoc3RhdGU6IHN0cmluZywgcGV0OiBJUGV0VHlwZSk6IElTdGF0ZSB7XG4gICAgc3dpdGNoKHN0YXRlKXtcbiAgICAgICAgY2FzZSBTdGF0ZXMuc2l0SWRsZTogcmV0dXJuIG5ldyBTaXRJZGxlU3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa1JpZ2h0OiByZXR1cm4gbmV3IFdhbGtSaWdodFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLndhbGtMZWZ0OiByZXR1cm4gbmV3IFdhbGtMZWZ0U3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMucnVuUmlnaHQ6IHJldHVybiBuZXcgUnVuUmlnaHRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5ydW5MZWZ0OiByZXR1cm4gbmV3IFJ1bkxlZnRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5saWU6IHJldHVybiBuZXcgTGllU3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMud2FsbEhhbmdMZWZ0OiByZXR1cm4gbmV3IFdhbGxIYW5nTGVmdFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmNsaW1iV2FsbExlZnQ6IHJldHVybiBuZXcgQ2xpbWJXYWxsTGVmdFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmp1bXBEb3duTGVmdDogcmV0dXJuIG5ldyBKdW1wRG93bkxlZnRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5sYW5kOiByZXR1cm4gbmV3IExhbmRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5zd2lwZTogcmV0dXJuIG5ldyBTd2lwZVN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmlkbGVXaXRoQmFsbDogcmV0dXJuIG5ldyBJZGxlV2l0aEJhbGxTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5jaGFzZUZyaWVuZDogcmV0dXJuIG5ldyBDaGFzZUZyaWVuZFN0YXRlKHBldCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2l0SWRsZVN0YXRlKHBldCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIHtcbiAgICBsYWJlbDogc3RyaW5nXG4gICAgc3ByaXRlTGFiZWw6IHN0cmluZ1xuICAgIGhvcml6b250YWxEaXJlY3Rpb246IEhvcml6b250YWxEaXJlY3Rpb25cbiAgICBwZXQ6IElQZXRUeXBlO1xuICAgIG5leHRGcmFtZSgpOiBGcmFtZVJlc3VsdFxufVxuXG5jbGFzcyBBYnN0cmFjdFN0YXRpY1N0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5zaXRJZGxlO1xuICAgIGlkbGVDb3VudGVyOiBudW1iZXI7XG4gICAgc3ByaXRlTGFiZWwgPSBcImlkbGVcIjtcbiAgICBob2xkVGltZSA9IDUwO1xuICAgIHBldDogSVBldFR5cGU7XG4gICAgXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcblxuICAgIGNvbnN0cnVjdG9yKHBldDogSVBldFR5cGUpIHtcbiAgICAgICAgdGhpcy5pZGxlQ291bnRlciA9IDA7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLmlkbGVDb3VudGVyKys7XG4gICAgICAgIGlmICh0aGlzLmlkbGVDb3VudGVyID4gdGhpcy5ob2xkVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2l0SWRsZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuc2l0SWRsZTtcbiAgICBzcHJpdGVMYWJlbCA9IFwiaWRsZVwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xuICAgIGhvbGRUaW1lID0gNTA7XG59XG5cbmV4cG9ydCBjbGFzcyBMaWVTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmxpZTtcbiAgICBzcHJpdGVMYWJlbCA9IFwibGllXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgaG9sZFRpbWUgPSA1MDtcbn1cblxuZXhwb3J0IGNsYXNzIFdhbGxIYW5nTGVmdFN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMud2FsbEhhbmdMZWZ0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxsZ3JhYlwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgaG9sZFRpbWUgPSA1MDtcbn1cblxuZXhwb3J0IGNsYXNzIExhbmRTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmxhbmQ7XG4gICAgc3ByaXRlTGFiZWwgPSBcImxhbmRcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgIGhvbGRUaW1lID0gMTA7XG59XG5cbmV4cG9ydCBjbGFzcyBTd2lwZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuc3dpcGU7XG4gICAgc3ByaXRlTGFiZWwgPSBcInN3aXBlXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubmF0dXJhbDtcbiAgICBob2xkVGltZSA9IDMwO1xufVxuXG5leHBvcnQgY2xhc3MgSWRsZVdpdGhCYWxsU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5pZGxlV2l0aEJhbGw7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndpdGhfYmFsbFwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgaG9sZFRpbWUgPSAzMDtcbn1cblxuZXhwb3J0IGNsYXNzIFdhbGtSaWdodFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy53YWxrUmlnaHQ7XG4gICAgcGV0OiBJUGV0VHlwZTtcbiAgICBza2lwU3BlZWQgPSAzO1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgbGVmdEJvdW5kYXJ5OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XG4gICAgICAgIHRoaXMubGVmdEJvdW5kYXJ5ID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aCAqIDAuOTUpO1xuICAgICAgICB0aGlzLnBldCA9IHBldDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSArIHRoaXMuc2tpcFNwZWVkKTtcbiAgICAgICAgaWYgKHRoaXMucGV0LmxlZnQoKSA+PSB0aGlzLmxlZnRCb3VuZGFyeSAtIHRoaXMucGV0LndpZHRoKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdhbGtMZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLndhbGtMZWZ0O1xuICAgIHNraXBTcGVlZCA9IDM7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgIHBldDogSVBldFR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkxlZnQodGhpcy5wZXQubGVmdCgpIC0gdGhpcy5za2lwU3BlZWQpO1xuICAgICAgICBpZiAodGhpcy5wZXQubGVmdCgpIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJ1blJpZ2h0U3RhdGUgZXh0ZW5kcyBXYWxrUmlnaHRTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMucnVuUmlnaHQ7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtfZmFzdFwiO1xuICAgIHNraXBTcGVlZCA9IDU7XG59XG5cbmV4cG9ydCBjbGFzcyBSdW5MZWZ0U3RhdGUgZXh0ZW5kcyBXYWxrTGVmdFN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5ydW5MZWZ0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcbiAgICBza2lwU3BlZWQgPSA1O1xufVxuXG5leHBvcnQgY2xhc3MgQ2hhc2VTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuY2hhc2U7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwicnVuXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBiYWxsU3RhdGU6IEJhbGxTdGF0ZTtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHBldDogSVBldFR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlLCBiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudClcbiAgICB7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgICAgICB0aGlzLmJhbGxTdGF0ZSA9IGJhbGxTdGF0ZTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIGlmICh0aGlzLmJhbGxTdGF0ZS5wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNhbmNlbDsgLy8gQmFsbCBpcyBhbHJlYWR5IGNhdWdodFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBldC5sZWZ0KCkgPiB0aGlzLmJhbGxTdGF0ZS5jeCkge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgICAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSAtIHRoaXMuc2tpcFNwZWVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkxlZnQodGhpcy5wZXQubGVmdCgpICsgdGhpcy5za2lwU3BlZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuYmFsbFN0YXRlLmN5IDwgKHRoaXMucGV0LndpZHRoKCkgKyB0aGlzLnBldC5mbG9vcigpKSAmJlxuICAgICAgICAgICAgdGhpcy5iYWxsU3RhdGUuY3ggPCB0aGlzLnBldC5sZWZ0KCkgJiZcbiAgICAgICAgICAgIHRoaXMucGV0LmxlZnQoKSA8IHRoaXMuYmFsbFN0YXRlLmN4ICsgMTUpIHtcbiAgICAgICAgICAgIC8vIGhpZGUgYmFsbFxuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgdGhpcy5iYWxsU3RhdGUucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENoYXNlRnJpZW5kU3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmNoYXNlRnJpZW5kO1xuICAgIHNraXBTcGVlZCA9IDM7XG4gICAgc3ByaXRlTGFiZWwgPSBcInJ1blwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgcGV0OiBJUGV0VHlwZTtcblxuICAgIGNvbnN0cnVjdG9yKHBldDogSVBldFR5cGUpIHtcbiAgICAgICAgdGhpcy5wZXQgPSBwZXQ7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIGlmICghdGhpcy5wZXQuZnJpZW5kKCkuaXNQbGF5aW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNhbmNlbDsgLy8gRnJpZW5kIGlzIG5vIGxvbmdlciBwbGF5aW5nLlxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBldC5sZWZ0KCkgPiB0aGlzLnBldC5mcmllbmQoKS5sZWZ0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICAgICAgICAgIHRoaXMucGV0LnBvc2l0aW9uTGVmdCh0aGlzLnBldC5sZWZ0KCkgLSB0aGlzLnNraXBTcGVlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xuICAgICAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSArIHRoaXMuc2tpcFNwZWVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENsaW1iV2FsbExlZnRTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuY2xpbWJXYWxsTGVmdDtcbiAgICBza2lwU3BlZWQgPSAzO1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxsY2xpbWJcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgIHBldDogSVBldFR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkJvdHRvbSh0aGlzLnBldC5ib3R0b20oKSArIDEpO1xuICAgICAgICBpZiAodGhpcy5wZXQuYm90dG9tKCkgPj0gMTAwKSB7XG4gICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSnVtcERvd25MZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmp1bXBEb3duTGVmdDtcbiAgICBza2lwU3BlZWQgPSAzO1xuICAgIHNwcml0ZUxhYmVsID0gXCJmYWxsX2Zyb21fZ3JhYlwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xuICAgIHBldDogSVBldFR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkJvdHRvbSh0aGlzLnBldC5ib3R0b20oKSAtIDUpO1xuICAgICAgICBpZiAodGhpcy5wZXQuYm90dG9tKCkgPD0gdGhpcy5wZXQuZmxvb3IoKSkge1xuICAgICAgICAgICAgdGhpcy5wZXQucG9zaXRpb25Cb3R0b20odGhpcy5wZXQuZmxvb3IoKSk7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfSAgIFxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gVGhpcyBzY3JpcHQgd2lsbCBiZSBydW4gd2l0aGluIHRoZSB3ZWJ2aWV3IGl0c2VsZlxuaW1wb3J0IHsgUGV0U2l6ZSwgUGV0Q29sb3IsIFBldFR5cGUsIFRoZW1lLCBDb2xvclRoZW1lS2luZCwgV2Vidmlld01lc3NhZ2UgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlUGV0LCBJUGV0VHlwZSwgSW52YWxpZFBldEV4Y2VwdGlvbiwgUGV0Q29sbGVjdGlvbiwgUGV0RWxlbWVudCwgSVBldENvbGxlY3Rpb24gfSBmcm9tICcuL3BldHMnO1xuaW1wb3J0IHsgQmFsbFN0YXRlLCBDaGFzZUZyaWVuZFN0YXRlLCBQZXRFbGVtZW50U3RhdGUsIFBldEluc3RhbmNlU3RhdGUsIFBldFBhbmVsU3RhdGUsIFN0YXRlcyB9IGZyb20gJy4vc3RhdGVzJztcblxuLyogVGhpcyBpcyBob3cgdGhlIFZTIENvZGUgQVBJIGNhbiBiZSBpbnZva2VkIGZyb20gdGhlIHBhbmVsICovXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBWc2NvZGVTdGF0ZUFwaSB7IFxuICAgIGdldFN0YXRlKCkgOiBQZXRQYW5lbFN0YXRlOyAvLyBBUEkgaXMgYWN0dWFsbHkgQW55LCBidXQgd2Ugd2FudCBpdCB0byBiZSB0eXBlZC5cbiAgICBzZXRTdGF0ZShzdGF0ZTogUGV0UGFuZWxTdGF0ZSk6IHZvaWQ7XG4gICAgcG9zdE1lc3NhZ2UobWVzc2FnZTogV2Vidmlld01lc3NhZ2UpOiB2b2lkO1xuICB9XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIGFjcXVpcmVWc0NvZGVBcGkoKTogVnNjb2RlU3RhdGVBcGk7XG4gIH1cbn1cblxuY29uc3QgdnNjb2RlID0gd2luZG93LmFjcXVpcmVWc0NvZGVBcGkoKTtcblxudmFyIGFsbFBldHM6IElQZXRDb2xsZWN0aW9uID0gbmV3IFBldENvbGxlY3Rpb24oKTtcbnZhciBwZXRDb3VudGVyOiBudW1iZXI7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUJhbGxSYWRpdXMoc2l6ZTogUGV0U2l6ZSk6IG51bWJlcntcbiAgaWYgKHNpemUgPT09IFBldFNpemUubmFubyl7XG4gICAgcmV0dXJuIDI7XG4gIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5tZWRpdW0pe1xuICAgIHJldHVybiA0O1xuICB9IGVsc2UgaWYgKHNpemUgPT09IFBldFNpemUubGFyZ2Upe1xuICAgIHJldHVybiA4O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAxOyAvLyBTaHJ1Z1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUZsb29yKHNpemU6IFBldFNpemUsIHRoZW1lOiBUaGVtZSk6IG51bWJlciB7XG4gIHN3aXRjaCAodGhlbWUpe1xuICAgIGNhc2UgVGhlbWUuZm9yZXN0OlxuICAgICAgc3dpdGNoIChzaXplKXtcbiAgICAgICAgY2FzZSBQZXRTaXplLm1lZGl1bTpcbiAgICAgICAgICByZXR1cm4gNDA7XG4gICAgICAgIGNhc2UgUGV0U2l6ZS5sYXJnZTpcbiAgICAgICAgICByZXR1cm4gNjU7XG4gICAgICAgIGNhc2UgUGV0U2l6ZS5uYW5vOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAyMztcbiAgICAgIH1cbiAgICBjYXNlIFRoZW1lLmNhc3RsZTpcbiAgICAgIHN3aXRjaCAoc2l6ZSl7XG4gICAgICAgIGNhc2UgUGV0U2l6ZS5tZWRpdW06XG4gICAgICAgICAgcmV0dXJuIDgwO1xuICAgICAgICBjYXNlIFBldFNpemUubGFyZ2U6XG4gICAgICAgICAgcmV0dXJuIDEyMDtcbiAgICAgICAgY2FzZSBQZXRTaXplLm5hbm86XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIDQ1O1xuICAgICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3VzZU92ZXIoZTogTW91c2VFdmVudCl7XG4gIHZhciBlbCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgYWxsUGV0cy5wZXRzKCkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBpZiAoZWxlbWVudC5jb2xsaXNpb24gPT09IGVsKXtcbiAgICAgIGlmICghZWxlbWVudC5wZXQuY2FuU3dpcGUoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbGVtZW50LnBldC5zd2lwZSgpO1xuICAgIH1cbiAgfSk7XG4gIFxufVxuXG5mdW5jdGlvbiBzdGFydEFuaW1hdGlvbnMoY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudCwgcGV0OiBJUGV0VHlwZSkge1xuICBjb2xsaXNpb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBoYW5kbGVNb3VzZU92ZXIpO1xuICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgdmFyIHVwZGF0ZXMgPSBhbGxQZXRzLnNlZWtOZXdGcmllbmRzKCk7XG4gICAgdXBkYXRlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgdnNjb2RlLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgdGV4dDogbWVzc2FnZSxcbiAgICAgICAgY29tbWFuZDogJ2luZm8nXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBwZXQubmV4dEZyYW1lKCk7XG4gICAgc2F2ZVN0YXRlKCk7XG4gIH0sIDEwMCk7XG59XG5cbmZ1bmN0aW9uIGFkZFBldFRvUGFuZWwocGV0VHlwZTogUGV0VHlwZSwgYmFzZVBldFVyaTogc3RyaW5nLCBwZXRDb2xvcjogUGV0Q29sb3IsIHBldFNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIGZsb29yOiBudW1iZXIsIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IFBldEVsZW1lbnQge1xuICB2YXIgcGV0U3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIHBldFNwcml0ZUVsZW1lbnQuY2xhc3NOYW1lID0gXCJwZXRcIjtcbiAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGV0c0NvbnRhaW5lclwiKSBhcyBIVE1MRGl2RWxlbWVudCkuYXBwZW5kQ2hpbGQocGV0U3ByaXRlRWxlbWVudCk7XG5cbiAgdmFyIGNvbGxpc2lvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29sbGlzaW9uRWxlbWVudC5jbGFzc05hbWUgPSBcImNvbGxpc2lvblwiO1xuICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXRzQ29udGFpbmVyXCIpIGFzIEhUTUxEaXZFbGVtZW50KS5hcHBlbmRDaGlsZChjb2xsaXNpb25FbGVtZW50KTtcblxuICBjb25zdCByb290ID0gYmFzZVBldFVyaSArICcvJyArIHBldFR5cGUgKyAnLycgKyBwZXRDb2xvcjtcbiAgY29uc29sZS5sb2coXCJDcmVhdGluZyBuZXcgcGV0IDogXCIsIHBldFR5cGUsIHJvb3QpO1xuICB2YXIgbmV3UGV0ID0gY3JlYXRlUGV0KHBldFR5cGUsIHBldFNwcml0ZUVsZW1lbnQsIGNvbGxpc2lvbkVsZW1lbnQsIHBldFNpemUsIGxlZnQsIGJvdHRvbSwgcm9vdCwgZmxvb3IsIG5hbWUsIHBldENvdW50ZXIpO1xuICBwZXRDb3VudGVyICsrIDtcbiAgc3RhcnRBbmltYXRpb25zKGNvbGxpc2lvbkVsZW1lbnQsIG5ld1BldCk7XG4gIHJldHVybiBuZXcgUGV0RWxlbWVudChwZXRTcHJpdGVFbGVtZW50LCBjb2xsaXNpb25FbGVtZW50LCBuZXdQZXQsIHBldENvbG9yLCBwZXRUeXBlKTtcbn1cblxuZnVuY3Rpb24gc2F2ZVN0YXRlKCl7XG4gIHZhciBzdGF0ZSA9IG5ldyBQZXRQYW5lbFN0YXRlKCk7XG4gIHN0YXRlLnBldFN0YXRlcyA9IG5ldyBBcnJheSgpO1xuXG4gIGFsbFBldHMucGV0cygpLmZvckVhY2gocGV0SXRlbSA9PiB7XG4gICAgc3RhdGUucGV0U3RhdGVzIS5wdXNoKHtcbiAgICAgIHBldE5hbWU6IHBldEl0ZW0ucGV0Lm5hbWUoKSxcbiAgICAgIHBldENvbG9yOiBwZXRJdGVtLmNvbG9yLFxuICAgICAgcGV0VHlwZTogcGV0SXRlbS50eXBlLFxuICAgICAgcGV0U3RhdGU6IHBldEl0ZW0ucGV0LmdldFN0YXRlKCksXG4gICAgICBwZXRGcmllbmQ6IHBldEl0ZW0ucGV0LmZyaWVuZCgpID8gcGV0SXRlbS5wZXQuZnJpZW5kKCkubmFtZSgpIDogdW5kZWZpbmVkLFxuICAgICAgZWxMZWZ0OiBwZXRJdGVtLmVsLnN0eWxlLmxlZnQsXG4gICAgICBlbEJvdHRvbTogcGV0SXRlbS5lbC5zdHlsZS5ib3R0b21cbiAgICB9KTtcbiAgfSk7XG4gIHN0YXRlLnBldENvdW50ZXIgPSBwZXRDb3VudGVyO1xuICB2c2NvZGUuc2V0U3RhdGUoc3RhdGUpO1xufVxuXG5mdW5jdGlvbiByZWNvdmVyU3RhdGUoYmFzZVBldFVyaTogc3RyaW5nLCBwZXRTaXplOiBQZXRTaXplLCBmbG9vcjogbnVtYmVyKXtcbiAgdmFyIHN0YXRlID0gdnNjb2RlLmdldFN0YXRlKCk7XG4gIFxuICBpZiAoc3RhdGUucGV0Q291bnRlciA9PT0gdW5kZWZpbmVkIHx8IGlzTmFOKHN0YXRlLnBldENvdW50ZXIpKXtcbiAgICBwZXRDb3VudGVyID0gMTtcbiAgfSBlbHNlIHtcbiAgICBwZXRDb3VudGVyID0gc3RhdGUucGV0Q291bnRlciE7XG4gIH1cblxuICB2YXIgcmVjb3ZlcnlNYXA6IE1hcDxJUGV0VHlwZSwgUGV0RWxlbWVudFN0YXRlPiA9IG5ldyBNYXAoKTtcbiAgc3RhdGUucGV0U3RhdGVzIS5mb3JFYWNoKHAgPT4ge1xuICAgIC8vIEZpeGVzIGEgYnVnIHJlbGF0ZWQgdG8gZHVjayBhbmltYXRpb25zXG4gICAgaWYgKHAucGV0VHlwZSBhcyBzdHJpbmcgPT09IFwicnViYmVyIGR1Y2tcIikgeyhwLnBldFR5cGUgYXMgc3RyaW5nKSA9IFwicnViYmVyLWR1Y2tcIjt9XG5cbiAgICB0cnkge1xuICAgICAgdmFyIG5ld1BldCA9IGFkZFBldFRvUGFuZWwoXG4gICAgICAgIHAucGV0VHlwZSEsIFxuICAgICAgICBiYXNlUGV0VXJpLCBcbiAgICAgICAgcC5wZXRDb2xvciEsIFxuICAgICAgICBwZXRTaXplLCBcbiAgICAgICAgcGFyc2VJbnQocC5lbExlZnQhKSwgXG4gICAgICAgIHBhcnNlSW50KHAuZWxCb3R0b20hKSwgXG4gICAgICAgIGZsb29yLFxuICAgICAgICBwLnBldE5hbWUpO1xuICAgICAgYWxsUGV0cy5wdXNoKG5ld1BldCk7XG4gICAgICByZWNvdmVyeU1hcC5zZXQobmV3UGV0LnBldCwgcCk7XG4gICAgfSBjYXRjaCAoSW52YWxpZFBldEV4Y2VwdGlvbil7XG4gICAgICBjb25zb2xlLmxvZyhcIlN0YXRlIGhhZCBpbnZhbGlkIHBldCAoXCIgKyBwLnBldFR5cGUgKyBcIiksIGRpc2NhcmRpbmcuXCIpO1xuICAgIH1cbiAgfSk7XG4gIHJlY292ZXJ5TWFwLmZvckVhY2goIChzdGF0ZSwgcGV0KSA9PiB7XG4gICAgLy8gUmVjb3ZlciBwcmV2aW91cyBzdGF0ZS5cbiAgICBwZXQucmVjb3ZlclN0YXRlKHN0YXRlLnBldFN0YXRlISk7XG5cbiAgICAvLyBSZXNvbHZlIGZyaWVuZCByZWxhdGlvbnNoaXBzXG4gICAgdmFyIGZyaWVuZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoc3RhdGUucGV0RnJpZW5kKXtcbiAgICAgIGZyaWVuZCA9IGFsbFBldHMubG9jYXRlKHN0YXRlLnBldEZyaWVuZCk7XG4gICAgICBpZiAoZnJpZW5kKXtcbiAgICAgICAgcGV0LnJlY292ZXJGcmllbmQoZnJpZW5kLnBldCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmFuZG9tU3RhcnRQb3NpdGlvbigpIDogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAqIDAuNykpO1xufVxuXG5sZXQgY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQsIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG5mdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuICBjYW52YXMgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXRDYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQpO1xuICBjdHggPSAoY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICBjdHguY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xufVxuXG4vLyBJdCBjYW5ub3QgYWNjZXNzIHRoZSBtYWluIFZTIENvZGUgQVBJcyBkaXJlY3RseS5cbmV4cG9ydCBmdW5jdGlvbiBwZXRQYW5lbEFwcChiYXNlUGV0VXJpOiBzdHJpbmcsIHRoZW1lOiBUaGVtZSwgdGhlbWVLaW5kOiBDb2xvclRoZW1lS2luZCwgcGV0Q29sb3I6IFBldENvbG9yLCBwZXRTaXplOiBQZXRTaXplLCBwZXRUeXBlOiBQZXRUeXBlKSB7XG4gIGNvbnN0IGJhbGxSYWRpdXM6IG51bWJlciA9IGNhbGN1bGF0ZUJhbGxSYWRpdXMocGV0U2l6ZSk7XG4gIHZhciBmbG9vciA9IDA7XG4gIC8vIEFwcGx5IFRoZW1lIGJhY2tncm91bmRzXG4gIGlmICh0aGVtZSAhPT0gVGhlbWUubm9uZSl7XG4gICAgdmFyIF90aGVtZUtpbmQgPSBcIlwiO1xuICAgIHN3aXRjaCAodGhlbWVLaW5kKSB7XG4gICAgICBjYXNlIENvbG9yVGhlbWVLaW5kLkRhcms6XG4gICAgICAgIF90aGVtZUtpbmQgPSBcImRhcmtcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENvbG9yVGhlbWVLaW5kLkxpZ2h0OlxuICAgICAgICBfdGhlbWVLaW5kID0gXCJsaWdodFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29sb3JUaGVtZUtpbmQuSGlnaENvbnRyYXN0OlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgX3RoZW1lS2luZCA9IFwibGlnaHRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG5cbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7YmFzZVBldFVyaX0vYmFja2dyb3VuZHMvJHt0aGVtZX0vYmFja2dyb3VuZC0ke190aGVtZUtpbmR9LSR7cGV0U2l6ZX0ucG5nJylgO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWdyb3VuZFwiKSEuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtiYXNlUGV0VXJpfS9iYWNrZ3JvdW5kcy8ke3RoZW1lfS9mb3JlZ3JvdW5kLSR7X3RoZW1lS2luZH0tJHtwZXRTaXplfS5wbmcnKWA7XG4gICAgXG4gICAgZmxvb3IgPSBjYWxjdWxhdGVGbG9vcihwZXRTaXplLCB0aGVtZSk7IC8vIFRoZW1lcyBoYXZlIHBldHMgYXQgYSBzcGVjaWZpZWQgaGVpZ2h0IGZyb20gdGhlIGdyb3VuZFxuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcmVncm91bmRcIikhLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwiXCI7XG4gIH1cblxuICAvLy8gQm91bmNpbmcgYmFsbCBjb21wb25lbnRzLCBjcmVkaXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI5OTgyMzQzXG4gIGNvbnN0IGdyYXZpdHk6IG51bWJlciA9IDAuMiwgZGFtcGluZzogbnVtYmVyID0gMC45LCB0cmFjdGlvbjogbnVtYmVyID0gMC44O1xuICB2YXIgYmFsbFN0YXRlOiBCYWxsU3RhdGU7XG5cbiAgZnVuY3Rpb24gcmVzZXRCYWxsKCkge1xuICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGJhbGxTdGF0ZSA9IG5ldyBCYWxsU3RhdGUoMTAwLCAxMDAsIDIsIDUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGhyb3dCYWxsKCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBpZiAoIWJhbGxTdGF0ZS5wYXVzZWQpIHtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhyb3dCYWxsKTt9XG5cbiAgICBpZiAoYmFsbFN0YXRlLmN4ICsgYmFsbFJhZGl1cyA+PSBjYW52YXMud2lkdGgpIHtcbiAgICAgIGJhbGxTdGF0ZS52eCA9IC1iYWxsU3RhdGUudnggKiBkYW1waW5nO1xuICAgICAgYmFsbFN0YXRlLmN4ID0gY2FudmFzLndpZHRoIC0gYmFsbFJhZGl1cztcbiAgICB9IGVsc2UgaWYgKGJhbGxTdGF0ZS5jeCAtIGJhbGxSYWRpdXMgPD0gMCkge1xuICAgICAgYmFsbFN0YXRlLnZ4ID0gLWJhbGxTdGF0ZS52eCAqIGRhbXBpbmc7XG4gICAgICBiYWxsU3RhdGUuY3ggPSBiYWxsUmFkaXVzO1xuICAgIH1cbiAgICBpZiAoYmFsbFN0YXRlLmN5ICsgYmFsbFJhZGl1cyArIGZsb29yID49IChjYW52YXMuaGVpZ2h0KSkge1xuICAgICAgYmFsbFN0YXRlLnZ5ID0gLWJhbGxTdGF0ZS52eSAqIGRhbXBpbmc7XG4gICAgICBiYWxsU3RhdGUuY3kgPSBjYW52YXMuaGVpZ2h0IC0gYmFsbFJhZGl1cyAtIGZsb29yO1xuICAgICAgLy8gdHJhY3Rpb24gaGVyZVxuICAgICAgYmFsbFN0YXRlLnZ4ICo9IHRyYWN0aW9uO1xuICAgIH0gZWxzZSBpZiAoYmFsbFN0YXRlLmN5IC0gYmFsbFJhZGl1cyA8PSAwKSB7XG4gICAgICBiYWxsU3RhdGUudnkgPSAtYmFsbFN0YXRlLnZ5ICogZGFtcGluZztcbiAgICAgIGJhbGxTdGF0ZS5jeSA9IGJhbGxSYWRpdXM7XG4gICAgfVxuXG4gICAgYmFsbFN0YXRlLnZ5ICs9IGdyYXZpdHk7XG5cbiAgICBiYWxsU3RhdGUuY3ggKz0gYmFsbFN0YXRlLnZ4O1xuICAgIGJhbGxTdGF0ZS5jeSArPSBiYWxsU3RhdGUudnk7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhiYWxsU3RhdGUuY3gsIGJhbGxTdGF0ZS5jeSwgYmFsbFJhZGl1cywgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMmVkODUxXCI7XG4gICAgY3R4LmZpbGwoKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCdTdGFydGluZyBwZXQgc2Vzc2lvbicsIHBldENvbG9yLCBiYXNlUGV0VXJpLCBwZXRUeXBlKTtcbiAgLy8gTmV3IHNlc3Npb25cbiAgdmFyIHN0YXRlID0gdnNjb2RlLmdldFN0YXRlKCk7XG4gIGlmICghc3RhdGUpIHtcbiAgICBjb25zb2xlLmxvZygnTm8gc3RhdGUsIHN0YXJ0aW5nIGEgbmV3IHNlc3Npb24uJyk7XG4gICAgcGV0Q291bnRlciA9IDE7XG4gICAgYWxsUGV0cy5wdXNoKGFkZFBldFRvUGFuZWwocGV0VHlwZSwgYmFzZVBldFVyaSwgcGV0Q29sb3IsIHBldFNpemUsIHJhbmRvbVN0YXJ0UG9zaXRpb24oKSwgZmxvb3IsIGZsb29yLCB1bmRlZmluZWQpKTtcbiAgICBzYXZlU3RhdGUoKTtcbiAgfSBlbHNlIHsgXG4gICAgY29uc29sZS5sb2coJ1JlY292ZXJpbmcgc3RhdGUgLSAnLCBzdGF0ZSk7XG4gICAgcmVjb3ZlclN0YXRlKGJhc2VQZXRVcmksIHBldFNpemUsIGZsb29yKTtcbiAgfVxuXG4gIGluaXRDYW52YXMoKTtcblxuICAvLyBIYW5kbGUgbWVzc2FnZXMgc2VudCBmcm9tIHRoZSBleHRlbnNpb24gdG8gdGhlIHdlYnZpZXdcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhOyAvLyBUaGUganNvbiBkYXRhIHRoYXQgdGhlIGV4dGVuc2lvbiBzZW50XG4gICAgc3dpdGNoIChtZXNzYWdlLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgXCJ0aHJvdy1iYWxsXCI6XG4gICAgICAgIHJlc2V0QmFsbCgpO1xuICAgICAgICB0aHJvd0JhbGwoKTtcbiAgICAgICAgYWxsUGV0cy5wZXRzKCkuZm9yRWFjaChwZXRFbCA9PiB7XG4gICAgICAgICAgaWYgKHBldEVsLnBldC5jYW5DaGFzZSgpKXtcbiAgICAgICAgICAgIHBldEVsLnBldC5jaGFzZShiYWxsU3RhdGUsIGNhbnZhcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic3Bhd24tcGV0XCI6XG4gICAgICAgIGFsbFBldHMucHVzaChhZGRQZXRUb1BhbmVsKG1lc3NhZ2UudHlwZSwgYmFzZVBldFVyaSwgbWVzc2FnZS5jb2xvciwgcGV0U2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCBmbG9vciwgZmxvb3IsIHVuZGVmaW5lZCkpO1xuICAgICAgICBzYXZlU3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmVzZXQtcGV0XCI6XG4gICAgICAgIGFsbFBldHMucGV0cygpLmZvckVhY2gocGV0ID0+IHtcbiAgICAgICAgICBwZXQuZWwucmVtb3ZlKCk7XG4gICAgICAgICAgcGV0LmNvbGxpc2lvbi5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFsbFBldHMucmVzZXQoKTtcbiAgICAgICAgYWxsUGV0cy5wdXNoKGFkZFBldFRvUGFuZWwobWVzc2FnZS50eXBlLCBiYXNlUGV0VXJpLCBtZXNzYWdlLmNvbG9yLCBtZXNzYWdlLnNpemUsIHJhbmRvbVN0YXJ0UG9zaXRpb24oKSwgZmxvb3IsIGZsb29yLCB1bmRlZmluZWQpKTtcbiAgICAgICAgcGV0Q291bnRlciA9IDE7XG4gICAgICAgIHNhdmVTdGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xuXG59O1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgaW5pdENhbnZhcygpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9