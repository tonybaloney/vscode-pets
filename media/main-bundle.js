/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/names.ts":
/*!*****************************!*\
  !*** ./src/common/names.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DUCK_NAMES = exports.SNAKE_NAMES = exports.TOTORO_NAMES = exports.CLIPPY_NAMES = exports.CRAB_NAMES = exports.DOG_NAMES = exports.CAT_NAMES = exports.PET_NAMES = void 0;
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
    [101, 'Purfect'],
    [102, 'Spot'],
    [103, 'Harry'],
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
    [7, 'Ruby Red'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey']
]);
exports.CLIPPY_NAMES = new Map([
    [1, 'Clippy'],
    [2, 'Karl Klammer'],
    [3, 'Clippy Jr.'],
    [4, 'Molly'],
    [5, 'Coco'],
    [6, 'Buddy'],
    [7, 'Ruby'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
]);
exports.TOTORO_NAMES = new Map([
    [1, 'Totoro'],
    [2, 'トトロ'],
    [3, 'Max'],
    [4, 'Molly'],
    [5, 'Coco'],
    [6, 'Buddy'],
    [7, 'Ruby'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
]);
exports.SNAKE_NAMES = new Map([
    [1, 'Sneaky'],
    [2, 'Mr Slippery'],
    [3, 'Max'],
    [4, 'Molly'],
    [5, 'Coco'],
    [6, 'Buddy'],
    [7, 'Ruby'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
]);
exports.DUCK_NAMES = new Map([
    [1, 'Quacky'],
    [2, 'Floaty'],
    [3, 'Duck'],
    [4, 'Molly'],
    [5, 'Sunshine'],
    [6, 'Buddy'],
    [7, 'Chirpy'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
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
    constructor(spriteElement, collisionElement, size, left, bottom, petRoot, floor, name, speed) {
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
        this._speed = speed;
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
    speed() {
        return this._speed;
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
            name = getPetName(names_1.TOTORO_NAMES, "totoro" /* totoro */, count);
        }
        return new Totoro(el, collision, size, left, bottom, petRoot, floor, name, 3 /* normal */);
    }
    if (petType === "cat") {
        if (name === undefined) {
            name = getPetName(names_1.CAT_NAMES, "cat" /* cat */, count);
        }
        return new Cat(el, collision, size, left, bottom, petRoot, floor, name, 3 /* normal */);
    }
    else if (petType === "dog") {
        if (name === undefined) {
            name = getPetName(names_1.DOG_NAMES, "dog" /* dog */, count);
        }
        return new Dog(el, collision, size, left, bottom, petRoot, floor, name, 3 /* normal */);
    }
    else if (petType === "snake") {
        if (name === undefined) {
            name = getPetName(names_1.SNAKE_NAMES, "snake" /* snake */, count);
        }
        return new Snake(el, collision, size, left, bottom, petRoot, floor, name, 1 /* verySlow */);
    }
    else if (petType === "clippy") {
        if (name === undefined) {
            name = getPetName(names_1.CLIPPY_NAMES, "clippy" /* clippy */, count);
        }
        return new Clippy(el, collision, size, left, bottom, petRoot, floor, name, 2 /* slow */);
    }
    else if (petType === "crab") {
        if (name === undefined) {
            name = getPetName(names_1.CRAB_NAMES, "crab" /* crab */, count);
        }
        return new Crab(el, collision, size, left, bottom, petRoot, floor, name, 2 /* slow */);
    }
    else if (petType === "rubber-duck") {
        if (name === undefined) {
            name = getPetName(names_1.DUCK_NAMES, "rubber-duck" /* rubberduck */, count);
        }
        return new RubberDuck(el, collision, size, left, bottom, petRoot, floor, name, 4 /* fast */);
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
        this.spriteLabel = "walk";
        this.horizontalDirection = HorizontalDirection.right;
        this.speedMultiplier = 1;
        this.leftBoundary = Math.floor(window.innerWidth * 0.95);
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionLeft(this.pet.left() + this.pet.speed() * this.speedMultiplier);
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
        this.spriteLabel = "walk";
        this.horizontalDirection = HorizontalDirection.left;
        this.speedMultiplier = 1;
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionLeft(this.pet.left() - this.pet.speed() * this.speedMultiplier);
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
        this.speedMultiplier = 1.6;
    }
}
exports.RunRightState = RunRightState;
class RunLeftState extends WalkLeftState {
    constructor() {
        super(...arguments);
        this.label = "run-left" /* runLeft */;
        this.spriteLabel = "walk_fast";
        this.speedMultiplier = 1.6;
    }
}
exports.RunLeftState = RunLeftState;
class ChaseState {
    constructor(pet, ballState, canvas) {
        this.label = "chase" /* chase */;
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
            this.pet.positionLeft(this.pet.left() - this.pet.speed());
        }
        else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left() + this.pet.speed());
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
            this.pet.positionLeft(this.pet.left() - this.pet.speed());
        }
        else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left() + this.pet.speed());
        }
        return FrameResult.stateContinue;
    }
}
exports.ChaseFriendState = ChaseFriendState;
class ClimbWallLeftState {
    constructor(pet) {
        this.label = "climb-wall-left" /* climbWallLeft */;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvY29tbW9uL25hbWVzLnRzIiwid2VicGFjazovL3BldEFwcC8uL3NyYy9wYW5lbC9wZXRzLnRzIiwid2VicGFjazovL3BldEFwcC8uL3NyYy9wYW5lbC9zdGF0ZXMudHMiLCJ3ZWJwYWNrOi8vcGV0QXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BldEFwcC8uL3NyYy9wYW5lbC9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYSxpQkFBUyxHQUF3QixJQUFJLEdBQUcsQ0FBaUI7SUFDbEUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO0lBQ2YsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO0lBQ2YsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FB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cUJBQ3BDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDUixLQUFLLFdBQVc7Z0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlILFNBQVMsRUFBRSxDQUFDO2dCQUNaLE1BQU07WUFDUixLQUFLLFdBQVc7Z0JBQ2QsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDekIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25JLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7Z0JBQ1osTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDO0FBbkhELGtDQW1IQztBQUFBLENBQUM7QUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO0lBQ2hDLFVBQVUsRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUEVUX05BTUVTOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xuICAgIFsxLCAnQmVsbGEnXSxcbiAgICBbMiwgJ0NoYXJsaWUnXSxcbiAgICBbMywgJ01heCddLFxuICAgIFs0LCAnTW9sbHknXSxcbiAgICBbNSwgJ0NvY28nXSxcbiAgICBbNiwgJ0J1ZGR5J10sXG4gICAgWzcsICdSdWJ5J10sXG4gICAgWzgsICdPc2NhciddLFxuICAgIFs5LCAnTHVjeSddLFxuICAgIFsxMCwgJ0JhaWxleSddLFxuICAgIFsxMSwgJ01pbG8nXSxcbiAgICBbMTIsICdEYWlzeSddLFxuICAgIFsxMywgJ0FyY2hpZSddLFxuICAgIFsxNCwgJ09sbGllJ10sXG4gICAgWzE1LCAnUm9zaWUnXSxcbiAgICBbMTYsICdMb2xhJ10sXG4gICAgWzE3LCAnRnJhbmtpZSddLFxuICAgIFsxOCwgJ1RvYnknXSxcbiAgICBbMTksICdSb3h5J10sXG4gICAgWzIwLCAnUG9wcHknXSxcbiAgICBbMjEsICdMdW5hJ10sXG4gICAgWzIyLCAnSmFjayddLFxuICAgIFsyMywgJ01pbGxpZSddLFxuICAgIFsyNCwgJ1RlZGR5J10sXG4gICAgWzI1LCAnSGFycnknXSxcbiAgICBbMjYsICdDb29wZXInXSxcbiAgICBbMjcsICdCZWFyJ10sXG4gICAgWzI4LCAnUm9ja3knXSxcbiAgICBbMjksICdBbGZpZSddLFxuICAgIFszMCwgJ0h1Z28nXSxcbiAgICBbMzEsICdCb25uaWUnXSxcbiAgICBbMzIsICdQZXBwZXInXSxcbiAgICBbMzMsICdMaWx5J10sXG4gICAgWzM0LCAnVGlsbHknXSxcbiAgICBbMzUsICdMZW8nXSxcbiAgICBbMzYsICdNYWdnaWUnXSxcbiAgICBbMzcsICdHZW9yZ2UnXSxcbiAgICBbMzgsICdNaWEnXSxcbiAgICBbMzksICdNYXJsZXknXSxcbiAgICBbNDAsICdIYXJsZXknXSxcbiAgICBbNDEsICdDaGxvZSddLFxuICAgIFs0MiwgJ0x1bHUnXSxcbiAgICBbNDMsICdNaXNzeSddLFxuICAgIFs0NCwgJ0phc3BlciddLFxuICAgIFs0NSwgJ0JpbGx5J10sXG4gICAgWzQ2LCAnTmFsYSddLFxuICAgIFs0NywgJ01vbnR5J10sXG4gICAgWzQ4LCAnWmlnZ3knXSxcbiAgICBbNDksICdXaW5zdG9uJ10sXG4gICAgWzUwLCAnWmV1cyddLFxuICAgIFs1MSwgJ1pvZSddLFxuICAgIFs1MiwgJ1N0ZWxsYSddLFxuICAgIFs1MywgJ1Nhc2hhJ10sXG4gICAgWzU0LCAnUnVzdHknXSxcbiAgICBbNTUsICdHdXMnXSxcbiAgICBbNTYsICdCYXh0ZXInXSxcbiAgICBbNTcsICdEZXh0ZXInXSxcbiAgICBbNTgsICdEaWVzZWwnXSxcbiAgICBbNTksICdXaWxsb3cnXSxcbiAgICBbNjAsICdCYXJuZXknXSxcbiAgICBbNjEsICdCcnVubyddLFxuICAgIFs2MiwgJ1Blbm55J10sXG4gICAgWzYzLCAnSG9uZXknXSxcbiAgICBbNjQsICdNaWxseSddLFxuICAgIFs2NSwgJ011cnBoeSddLFxuICAgIFs2NiwgJ1NpbWJhJ10sXG4gICAgWzY3LCAnSG9sbHknXSxcbiAgICBbNjgsICdCZW5qaSddLFxuICAgIFs2OSwgJ0hlbnJ5J10sXG4gICAgWzcwLCAnTGlsbHknXSxcbiAgICBbNzEsICdQaXBwYSddLFxuICAgIFs3MiwgJ1NoYWRvdyddLFxuICAgIFs3MywgJ1NhbSddLFxuICAgIFs3NCwgJ0J1c3RlciddLFxuICAgIFs3NSwgJ0x1Y2t5J10sXG4gICAgWzc2LCAnRWxsaWUnXSxcbiAgICBbNzcsICdEdWtlJ10sXG4gICAgWzc4LCAnSmVzc2llJ10sXG4gICAgWzc5LCAnQ29va2llJ10sXG4gICAgWzgwLCAnSGFydmV5J10sXG4gICAgWzgxLCAnQnJ1Y2UnXSxcbiAgICBbODIsICdKYXgnXSxcbiAgICBbODMsICdSZXgnXSxcbiAgICBbODQsICdMb3VpZSddLFxuICAgIFs4NSwgJ0JlbnRsZXknXSxcbiAgICBbODYsICdKZXQnXSxcbiAgICBbODcsICdCYW5qbyddLFxuICAgIFs4OCwgJ0JlYXUnXSxcbiAgICBbODksICdFbGxhJ10sXG4gICAgWzkwLCAnUmFscGgnXSxcbiAgICBbOTEsICdMb2tpJ10sXG4gICAgWzkyLCAnTGV4aSddLFxuICAgIFs5MywgJ0NoZXN0ZXInXSxcbiAgICBbOTQsICdTb3BoaWUnXSxcbiAgICBbOTUsICdDaGlsbGknXSxcbiAgICBbOTYsICdCaWxsaWUnXSxcbiAgICBbOTcsICdMb3VpcyddLFxuICAgIFs5OCwgJ1Njb3V0J10sXG4gICAgWzk5LCAnQ2hhcmxpZSddLFxuICAgIFsxMDAsICdDbGVvJ10sXG4gICAgWzEwMSwgJ1B1cmZlY3QnXSxcbiAgICBbMTAyLCAnU3BvdCddLFxuICAgIFsxMDMsICdIYXJyeSddLFxuXSk7XG5cbmV4cG9ydCBjb25zdCBDQVRfTkFNRVMgPSBQRVRfTkFNRVM7XG5cbmV4cG9ydCBjb25zdCBET0dfTkFNRVMgPSBQRVRfTkFNRVM7XG5cbmV4cG9ydCBjb25zdCBDUkFCX05BTUVTIDogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcbiAgICBbMSwgJ0ZlcnJpcyddLFxuICAgIFsyLCAnUGluY2h5J10sXG4gICAgWzMsICdHcmFiYnknXSxcbiAgICBbNCwgJ0JpZyBSZWQnXSxcbiAgICBbNSwgJ0NyYWJieSddLFxuICAgIFs2LCAnQnVkZHknXSxcbiAgICBbNywgJ1J1YnkgUmVkJ10sXG4gICAgWzgsICdPc2NhciddLFxuICAgIFs5LCAnTHVjeSddLFxuICAgIFsxMCwgJ0JhaWxleSddXG5dKTtcblxuZXhwb3J0IGNvbnN0IENMSVBQWV9OQU1FUzogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcbiAgICBbMSwgJ0NsaXBweSddLFxuICAgIFsyLCAnS2FybCBLbGFtbWVyJ10sXG4gICAgWzMsICdDbGlwcHkgSnIuJ10sXG4gICAgWzQsICdNb2xseSddLFxuICAgIFs1LCAnQ29jbyddLFxuICAgIFs2LCAnQnVkZHknXSxcbiAgICBbNywgJ1J1YnknXSxcbiAgICBbOCwgJ09zY2FyJ10sXG4gICAgWzksICdMdWN5J10sXG4gICAgWzEwLCAnQmFpbGV5J10sXG5dKTtcblxuZXhwb3J0IGNvbnN0IFRPVE9ST19OQU1FUzogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcbiAgICBbMSwgJ1RvdG9ybyddLFxuICAgIFsyLCAn44OI44OI44OtJ10sXG4gICAgWzMsICdNYXgnXSxcbiAgICBbNCwgJ01vbGx5J10sXG4gICAgWzUsICdDb2NvJ10sXG4gICAgWzYsICdCdWRkeSddLFxuICAgIFs3LCAnUnVieSddLFxuICAgIFs4LCAnT3NjYXInXSxcbiAgICBbOSwgJ0x1Y3knXSxcbiAgICBbMTAsICdCYWlsZXknXSxcbl0pO1xuXG5leHBvcnQgY29uc3QgU05BS0VfTkFNRVM6IE1hcDxudW1iZXIsIHN0cmluZz4gPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPihbXG4gICAgWzEsICdTbmVha3knXSxcbiAgICBbMiwgJ01yIFNsaXBwZXJ5J10sXG4gICAgWzMsICdNYXgnXSxcbiAgICBbNCwgJ01vbGx5J10sXG4gICAgWzUsICdDb2NvJ10sXG4gICAgWzYsICdCdWRkeSddLFxuICAgIFs3LCAnUnVieSddLFxuICAgIFs4LCAnT3NjYXInXSxcbiAgICBbOSwgJ0x1Y3knXSxcbiAgICBbMTAsICdCYWlsZXknXSxcbl0pO1xuXG5leHBvcnQgY29uc3QgRFVDS19OQU1FUzogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcbiAgICBbMSwgJ1F1YWNreSddLFxuICAgIFsyLCAnRmxvYXR5J10sXG4gICAgWzMsICdEdWNrJ10sXG4gICAgWzQsICdNb2xseSddLFxuICAgIFs1LCAnU3Vuc2hpbmUnXSxcbiAgICBbNiwgJ0J1ZGR5J10sXG4gICAgWzcsICdDaGlycHknXSxcbiAgICBbOCwgJ09zY2FyJ10sXG4gICAgWzksICdMdWN5J10sXG4gICAgWzEwLCAnQmFpbGV5J10sXG5dKTtcbiIsImltcG9ydCB7IFBldENvbG9yLCBQZXRTaXplLCBQZXRTcGVlZCwgUGV0VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdHlwZXNcIjtcbmltcG9ydCB7IElTZXF1ZW5jZVRyZWUgfSBmcm9tIFwiLi9zZXF1ZW5jZXNcIjtcbmltcG9ydCB7IElTdGF0ZSwgU3RhdGVzLCByZXNvbHZlU3RhdGUsIEhvcml6b250YWxEaXJlY3Rpb24sIENoYXNlU3RhdGUsIEJhbGxTdGF0ZSwgRnJhbWVSZXN1bHQsIFBldEluc3RhbmNlU3RhdGUsIGlzU3RhdGVBYm92ZUdyb3VuZCB9IGZyb20gXCIuL3N0YXRlc1wiO1xuaW1wb3J0IHsgQ0FUX05BTUVTLCBET0dfTkFNRVMsIENSQUJfTkFNRVMsIFNOQUtFX05BTUVTLCBDTElQUFlfTkFNRVMsIFRPVE9ST19OQU1FUywgRFVDS19OQU1FUyB9IGZyb20gXCIuLi9jb21tb24vbmFtZXNcIjtcblxuZXhwb3J0IGNsYXNzIEludmFsaWRTdGF0ZUV4Y2VwdGlvbiB7XG5cbn1cblxuZXhwb3J0IGNsYXNzIFBldEVsZW1lbnQge1xuICAgIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIGNvbGxpc2lvbjogSFRNTERpdkVsZW1lbnQ7XG4gICAgcGV0OiBJUGV0VHlwZTtcbiAgICBjb2xvcjogUGV0Q29sb3I7XG4gICAgdHlwZTogUGV0VHlwZTtcbiAgXG4gICAgY29uc3RydWN0b3IoZWw6IEhUTUxJbWFnZUVsZW1lbnQsIGNvbGxpc2lvbjogSFRNTERpdkVsZW1lbnQsIHBldDogSVBldFR5cGUsIGNvbG9yOiBQZXRDb2xvciwgdHlwZTogUGV0VHlwZSl7XG4gICAgICB0aGlzLmVsID0gZWw7XG4gICAgICB0aGlzLmNvbGxpc2lvbiA9IGNvbGxpc2lvbjtcbiAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG4gIH1cblxuZXhwb3J0IGludGVyZmFjZSBJUGV0Q29sbGVjdGlvbiB7XG4gICAgcGV0cygpOiBBcnJheTxQZXRFbGVtZW50PjtcbiAgICBwdXNoKHBldDogUGV0RWxlbWVudCk6IHZvaWQ7XG4gICAgcmVzZXQoKTogdm9pZDtcbiAgICBzZWVrTmV3RnJpZW5kcygpOiBzdHJpbmdbXTtcbiAgICBsb2NhdGUobmFtZTogc3RyaW5nKTogUGV0RWxlbWVudCB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBldENvbGxlY3Rpb24gaW1wbGVtZW50cyBJUGV0Q29sbGVjdGlvbiB7XG4gICAgX3BldHM6IEFycmF5PFBldEVsZW1lbnQ+O1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5fcGV0cyA9IG5ldyBBcnJheSgwKTtcbiAgICB9XG5cbiAgICBwZXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGV0cztcbiAgICB9XG5cbiAgICBwdXNoKHBldDogUGV0RWxlbWVudCl7XG4gICAgICAgIHRoaXMuX3BldHMucHVzaChwZXQpO1xuICAgIH1cblxuICAgIHJlc2V0KCl7XG4gICAgICAgIHRoaXMuX3BldHMgPSBbXTtcbiAgICB9XG5cbiAgICBsb2NhdGUobmFtZTogc3RyaW5nKTogUGV0RWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZXRzLmZpbmQoKGNvbGxlY3Rpb24sIHZhbHVlLCBvYmopID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uLnBldC5uYW1lKCkgPT09IG5hbWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlZWtOZXdGcmllbmRzKCkgOiBzdHJpbmdbXSB7IFxuICAgICAgICBpZiAodGhpcy5fcGV0cy5sZW5ndGggPD0gMSlcbiAgICAgICAgICAgIHtyZXR1cm4gW107fSAvLyBZb3UgY2FuJ3QgYmUgZnJpZW5kcyB3aXRoIHlvdXJzZWxmLlxuICAgICAgICB2YXIgbWVzc2FnZXMgPSBuZXcgQXJyYXk8c3RyaW5nPigwKTtcbiAgICAgICAgdGhpcy5fcGV0cy5mb3JFYWNoKHBldEluQ29sbGVjdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAocGV0SW5Db2xsZWN0aW9uLnBldC5oYXNGcmllbmQoKSlcbiAgICAgICAgICAgICAgICB7cmV0dXJuO30gLy8gSSBhbHJlYWR5IGhhdmUgYSBmcmllbmQhXG4gICAgICAgICAgICB0aGlzLl9wZXRzLmZvckVhY2gocG90ZW50aWFsRnJpZW5kID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocG90ZW50aWFsRnJpZW5kLnBldC5oYXNGcmllbmQoKSlcbiAgICAgICAgICAgICAgICAgICAge3JldHVybjt9IC8vIEFscmVhZHkgaGFzIGEgZnJpZW5kLiBzb3JyeS5cbiAgICAgICAgICAgICAgICBpZiAoIXBvdGVudGlhbEZyaWVuZC5wZXQuY2FuQ2hhc2UoKSlcbiAgICAgICAgICAgICAgICAgICAge3JldHVybjt9IC8vIFBldCBpcyBidXN5IGRvaW5nIHNvbWV0aGluZyBlbHNlLlxuICAgICAgICAgICAgICAgIGlmIChwb3RlbnRpYWxGcmllbmQucGV0LmxlZnQoKSA+IHBldEluQ29sbGVjdGlvbi5wZXQubGVmdCgpICYmXG4gICAgICAgICAgICAgICAgICAgIHBvdGVudGlhbEZyaWVuZC5wZXQubGVmdCgpIDwgcGV0SW5Db2xsZWN0aW9uLnBldC5sZWZ0KCkgKyBwZXRJbkNvbGxlY3Rpb24ucGV0LndpZHRoKCkpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGEgcG9zc2libGUgbmV3IGZyaWVuZC4uXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwZXRJbkNvbGxlY3Rpb24ucGV0Lm5hbWUoKSwgXCIgd2FudHMgdG8gYmUgZnJpZW5kcyB3aXRoIFwiLCBwb3RlbnRpYWxGcmllbmQucGV0Lm5hbWUoKSwgXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBldEluQ29sbGVjdGlvbi5wZXQubWFrZUZyaWVuZHNXaXRoKHBvdGVudGlhbEZyaWVuZC5wZXQpKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goYCR7cGV0SW5Db2xsZWN0aW9uLnBldC5uYW1lKCl9ICgke3BldEluQ29sbGVjdGlvbi5wZXQuZW1vamkoKX0pOiBJJ20gbm93IGZyaWVuZHMg4p2k77iPIHdpdGggJHtwb3RlbnRpYWxGcmllbmQucGV0Lm5hbWUoKX0gKCR7cG90ZW50aWFsRnJpZW5kLnBldC5lbW9qaSgpfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQZXRUeXBlIHtcbiAgICBuZXh0RnJhbWUoKTogdm9pZFxuXG4gICAgLy8gU3BlY2lhbCBtZXRob2RzIGZvciBhY3Rpb25zXG4gICAgY2FuU3dpcGUoKTogYm9vbGVhblxuICAgIGNhbkNoYXNlKCk6IGJvb2xlYW5cbiAgICBzd2lwZSgpOiB2b2lkXG4gICAgY2hhc2UoYmFsbFN0YXRlOiBCYWxsU3RhdGUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkXG4gICAgc3BlZWQoKTogbnVtYmVyXG5cbiAgICAvLyBTdGF0ZSBBUElcbiAgICBnZXRTdGF0ZSgpOiBQZXRJbnN0YW5jZVN0YXRlXG4gICAgcmVjb3ZlclN0YXRlKHN0YXRlOiBQZXRJbnN0YW5jZVN0YXRlKTogdm9pZFxuICAgIHJlY292ZXJGcmllbmQoZnJpZW5kOiBJUGV0VHlwZSk6IHZvaWRcblxuICAgIC8vIFBvc2l0aW9uaW5nXG4gICAgYm90dG9tKCk6IG51bWJlcjtcbiAgICBsZWZ0KCk6IG51bWJlcjtcbiAgICBwb3NpdGlvbkJvdHRvbShib3R0b206IG51bWJlcik6IHZvaWQ7XG4gICAgcG9zaXRpb25MZWZ0KGxlZnQ6IG51bWJlcik6IHZvaWQ7XG4gICAgd2lkdGgoKTogbnVtYmVyO1xuICAgIGZsb29yKCk6IG51bWJlcjtcblxuICAgIC8vIEZyaWVuZHMgQVBJXG4gICAgbmFtZSgpOiBzdHJpbmc7XG4gICAgZW1vamkoKTogc3RyaW5nO1xuICAgIGhhc0ZyaWVuZCgpOiBib29sZWFuO1xuICAgIGZyaWVuZCgpOiBJUGV0VHlwZTtcbiAgICBtYWtlRnJpZW5kc1dpdGgoZnJpZW5kOiBJUGV0VHlwZSk6IGJvb2xlYW47XG4gICAgaXNQbGF5aW5nKCk6IGJvb2xlYW47XG59IFxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTcHJpdGVXaWR0aChzaXplOiBQZXRTaXplKTogbnVtYmVye1xuICAgIGlmIChzaXplID09PSBQZXRTaXplLm5hbm8pe1xuICAgICAgcmV0dXJuIDMwO1xuICAgIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5tZWRpdW0pe1xuICAgICAgcmV0dXJuIDU1O1xuICAgIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5sYXJnZSl7XG4gICAgICByZXR1cm4gMTEwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMzA7IC8vIFNocnVnXG4gICAgfVxuICB9XG5cbmFic3RyYWN0IGNsYXNzIEJhc2VQZXRUeXBlIGltcGxlbWVudHMgSVBldFR5cGUge1xuICAgIGxhYmVsOiBzdHJpbmcgPSBcImJhc2VcIjtcbiAgICBzZXF1ZW5jZTogSVNlcXVlbmNlVHJlZSA9IHsgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsIHNlcXVlbmNlU3RhdGVzOiBbXX07XG4gICAgY3VycmVudFN0YXRlOiBJU3RhdGU7XG4gICAgY3VycmVudFN0YXRlRW51bTogU3RhdGVzO1xuICAgIGhvbGRTdGF0ZTogSVN0YXRlIHwgdW5kZWZpbmVkO1xuICAgIGhvbGRTdGF0ZUVudW06IFN0YXRlcyB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHByaXZhdGUgY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIF9sZWZ0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYm90dG9tOiBudW1iZXI7XG4gICAgcGV0Um9vdDogc3RyaW5nO1xuICAgIF9mbG9vcjogbnVtYmVyO1xuICAgIF9mcmllbmQ6IElQZXRUeXBlIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgICBwcml2YXRlIF9zcGVlZDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgY29sbGlzaW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQsIHNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHBldFJvb3Q6IHN0cmluZywgZmxvb3I6IG51bWJlciwgbmFtZTogc3RyaW5nLCBzcGVlZDogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5lbCA9IHNwcml0ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gY29sbGlzaW9uRWxlbWVudDtcbiAgICAgICAgdGhpcy5wZXRSb290ID0gcGV0Um9vdDtcbiAgICAgICAgdGhpcy5fZmxvb3IgPSBmbG9vcjtcbiAgICAgICAgdGhpcy5fbGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgdGhpcy5pbml0U3ByaXRlKHNpemUsIGxlZnQsIGJvdHRvbSk7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHRoaXMuc2VxdWVuY2Uuc3RhcnRpbmdTdGF0ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBpbml0U3ByaXRlKHBldFNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGA7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUuYm90dG9tID0gYCR7Ym90dG9tfXB4YDtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLm1heFdpZHRoID0gYCR7Y2FsY3VsYXRlU3ByaXRlV2lkdGgocGV0U2l6ZSl9cHhgO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLm1heEhlaWdodCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS5ib3R0b20gPSBgJHtib3R0b219cHhgO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS53aWR0aCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuaGVpZ2h0ID0gYCR7Y2FsY3VsYXRlU3ByaXRlV2lkdGgocGV0U2l6ZSl9cHhgO1xuICAgICAgfVxuXG4gICAgbGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcbiAgICB9XG5cbiAgICBib3R0b20oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdHRvbTtcbiAgICB9XG5cbiAgICBwb3NpdGlvbkJvdHRvbShib3R0b206IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLl9ib3R0b219cHhgO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuX2JvdHRvbX1weGA7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uLnN0eWxlLmxlZnQgPSBgJHt0aGlzLl9sZWZ0fXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuYm90dG9tID0gYCR7dGhpcy5fYm90dG9tfXB4YDtcbiAgICB9O1xuXG4gICAgcG9zaXRpb25MZWZ0KGxlZnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9sZWZ0ID0gbGVmdDtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5fbGVmdH1weGA7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3RoaXMuX2xlZnR9cHhgO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5fbGVmdH1weGA7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuX2JvdHRvbX1weGA7XG4gICAgfVxuXG4gICAgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwud2lkdGg7XG4gICAgfVxuXG4gICAgZmxvb3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zsb29yO1xuICAgIH1cblxuICAgIGdldFN0YXRlKCk6IFBldEluc3RhbmNlU3RhdGUgeyBcbiAgICAgICAgcmV0dXJuIHtjdXJyZW50U3RhdGVFbnVtOiB0aGlzLmN1cnJlbnRTdGF0ZUVudW19O1xuICAgIH1cblxuICAgIHNwZWVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICByZWNvdmVyRnJpZW5kKGZyaWVuZDogSVBldFR5cGUpe1xuICAgICAgICAvLyBSZWNvdmVyIGZyaWVuZHMuLlxuICAgICAgICB0aGlzLl9mcmllbmQgPSBmcmllbmQ7XG4gICAgfVxuXG4gICAgcmVjb3ZlclN0YXRlKHN0YXRlOiBQZXRJbnN0YW5jZVN0YXRlKXtcbiAgICAgICAgLy8gVE9ETyA6IFJlc29sdmUgYSBidWcgd2hlcmUgaWYgaXQgd2FzIHN3aXBpbmcgYmVmb3JlLCBpdCB3b3VsZCBmYWlsXG4gICAgICAgIC8vIGJlY2F1c2UgaG9sZFN0YXRlIGlzIG5vIGxvbmdlciB2YWxpZC5cbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gc3RhdGUuY3VycmVudFN0YXRlRW51bSE7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSwgdGhpcyk7XG5cbiAgICAgICAgaWYgKCFpc1N0YXRlQWJvdmVHcm91bmQodGhpcy5jdXJyZW50U3RhdGVFbnVtKSl7XG4gICAgICAgICAgICAvLyBSZXNldCB0aGUgYm90dG9tIG9mIHRoZSBzcHJpdGUgdG8gdGhlIGZsb29yIGFzIHRoZSB0aGVtZVxuICAgICAgICAgICAgLy8gaGFzIGxpa2VseSBjaGFuZ2VkLlxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkJvdHRvbSh0aGlzLmZsb29yKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuU3dpcGUoKXtcbiAgICAgICAgcmV0dXJuICFpc1N0YXRlQWJvdmVHcm91bmQodGhpcy5jdXJyZW50U3RhdGVFbnVtKTtcbiAgICB9XG5cbiAgICBjYW5DaGFzZSgpe1xuICAgICAgICByZXR1cm4gIWlzU3RhdGVBYm92ZUdyb3VuZCh0aGlzLmN1cnJlbnRTdGF0ZUVudW0pICYmIHRoaXMuY3VycmVudFN0YXRlRW51bSAhPT0gU3RhdGVzLmNoYXNlO1xuICAgIH1cblxuICAgIHN3aXBlKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuc3dpcGUpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuaG9sZFN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XG4gICAgICAgIHRoaXMuaG9sZFN0YXRlRW51bSA9IHRoaXMuY3VycmVudFN0YXRlRW51bTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gU3RhdGVzLnN3aXBlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZUVudW0sIHRoaXMpO1xuICAgIH1cbiAgICBcbiAgICBjaGFzZShiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBTdGF0ZXMuY2hhc2U7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gbmV3IENoYXNlU3RhdGUodGhpcywgYmFsbFN0YXRlLCBjYW52YXMpO1xuICAgIH1cblxuICAgIGZhY2VMZWZ0KCkge1xuICAgICAgICB0aGlzLmVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwic2NhbGVYKC0xKVwiO1xuICAgIH1cblxuICAgIGZhY2VSaWdodCgpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcInNjYWxlWCgxKVwiO1xuICAgIH1cblxuICAgIHNldEFuaW1hdGlvbihmYWNlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgbmV3RmFjZTogc3RyaW5nID0gYCR7dGhpcy5wZXRSb290fV8ke2ZhY2V9XzhmcHMuZ2lmYDtcbiAgICAgICAgaWYgKHRoaXMuZWwuc3JjID09PSBuZXdGYWNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbC5zcmMgPSBuZXdGYWNlO1xuICAgIH1cblxuICAgIGNob29zZU5leHRTdGF0ZShmcm9tU3RhdGU6IFN0YXRlcyk6IFN0YXRlcyB7XG4gICAgICAgIC8vIFdvcmsgb3V0IG5leHQgc3RhdGVcbiAgICAgICAgdmFyIHBvc3NpYmxlTmV4dFN0YXRlczogU3RhdGVzW10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwIDsgaSA8IHRoaXMuc2VxdWVuY2Uuc2VxdWVuY2VTdGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcXVlbmNlLnNlcXVlbmNlU3RhdGVzW2ldLnN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXMgPSB0aGlzLnNlcXVlbmNlLnNlcXVlbmNlU3RhdGVzW2ldLnBvc3NpYmxlTmV4dFN0YXRlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBvc3NpYmxlTmV4dFN0YXRlcyl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFN0YXRlRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmFuZG9tbHkgY2hvb3NlIHRoZSBuZXh0IHN0YXRlXG4gICAgICAgIGNvbnN0IGlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlTmV4dFN0YXRlcy5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gcG9zc2libGVOZXh0U3RhdGVzW2lkeF07XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLmZhY2VMZWZ0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50U3RhdGUuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodCkge1xuICAgICAgICAgICAgdGhpcy5mYWNlUmlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbih0aGlzLmN1cnJlbnRTdGF0ZS5zcHJpdGVMYWJlbCk7XG5cbiAgICAgICAgLy8gV2hhdCdzIG15IGJ1ZGR5IGRvaW5nP1xuICAgICAgICBpZiAodGhpcy5oYXNGcmllbmQoKSAmJiB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gIT09IFN0YXRlcy5jaGFzZUZyaWVuZCl7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmllbmQoKS5pc1BsYXlpbmcoKSAmJiAhaXNTdGF0ZUFib3ZlR3JvdW5kKHRoaXMuY3VycmVudFN0YXRlRW51bSkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUoU3RhdGVzLmNoYXNlRnJpZW5kLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBTdGF0ZXMuY2hhc2VGcmllbmQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZyYW1lUmVzdWx0ID0gdGhpcy5jdXJyZW50U3RhdGUubmV4dEZyYW1lKCk7XG4gICAgICAgIGlmIChmcmFtZVJlc3VsdCA9PT0gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gSWYgcmVjb3ZlcmluZyBmcm9tIHN3aXBlLi5cbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRTdGF0ZSAmJiB0aGlzLmhvbGRTdGF0ZUVudW0pe1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5ob2xkU3RhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gdGhpcy5ob2xkU3RhdGVFbnVtO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9sZFN0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9sZFN0YXRlRW51bSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSB0aGlzLmNob29zZU5leHRTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZUVudW0pO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUobmV4dFN0YXRlLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IG5leHRTdGF0ZTtcbiAgICAgICAgfSBlbHNlIGlmIChmcmFtZVJlc3VsdCA9PT0gRnJhbWVSZXN1bHQuc3RhdGVDYW5jZWwpe1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmNoYXNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTdGF0ZSA9IHRoaXMuY2hvb3NlTmV4dFN0YXRlKFN0YXRlcy5pZGxlV2l0aEJhbGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKG5leHRTdGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gbmV4dFN0YXRlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPT09IFN0YXRlcy5jaGFzZUZyaWVuZCkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSB0aGlzLmNob29zZU5leHRTdGF0ZShTdGF0ZXMuaWRsZVdpdGhCYWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZShuZXh0U3RhdGUsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IG5leHRTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0ZyaWVuZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mcmllbmQgIT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmcmllbmQoKSA6IElQZXRUeXBlIHsgXG4gICAgICAgIHJldHVybiB0aGlzLl9mcmllbmQhO1xuICAgIH1cblxuICAgIG5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuXG4gICAgbWFrZUZyaWVuZHNXaXRoKGZyaWVuZDogSVBldFR5cGUpOiBib29sZWFuIHtcbiAgICAgICAgdGhpcy5fZnJpZW5kID0gZnJpZW5kO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUoKSwgXCI6IEknbSBub3cgZnJpZW5kcyDinaTvuI8gd2l0aCBcIiwgZnJpZW5kLm5hbWUoKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlzUGxheWluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLnJ1blJpZ2h0IHx8IHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLnJ1bkxlZnQgO1xuICAgIH1cblxuICAgIGVtb2ppKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gXCLwn5C2XCI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG90b3JvIGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJ0b3Rvcm9cIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5saWVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMubGllLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnQsIFN0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNsaW1iV2FsbExlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGxIYW5nTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxsSGFuZ0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmp1bXBEb3duTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5qdW1wRG93bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmxhbmRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMubGFuZCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLmxpZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbiAgICBlbW9qaSgpOiBzdHJpbmcgeyBcbiAgICAgICAgcmV0dXJuIFwi8J+QvlwiO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBDYXQgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XG4gICAgbGFiZWwgPSBcImNhdFwiO1xuICAgIHNlcXVlbmNlID0ge1xuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5jbGltYldhbGxMZWZ0LCBTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnQsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jbGltYldhbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxsSGFuZ0xlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2FsbEhhbmdMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5qdW1wRG93bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuanVtcERvd25MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5sYW5kXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmxhbmQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbiAgICBlbW9qaSgpOiBzdHJpbmcgeyBcbiAgICAgICAgcmV0dXJuIFwi8J+QsVwiO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERvZyBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwiZG9nXCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHQsIFN0YXRlcy5saWVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMubGllLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMubGllLCBTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmxpZSwgU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xuICAgIGVtb2ppKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gXCLwn5C2XCI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU25ha2UgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XG4gICAgbGFiZWwgPSBcInNuYWtlXCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbiAgICBlbW9qaSgpOiBzdHJpbmcgeyBcbiAgICAgICAgcmV0dXJuIFwi8J+QjVwiO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENsaXBweSBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwiY2xpcHB5XCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xuICAgIGVtb2ppKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gXCLwn5OOXCI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUnViYmVyRHVjayBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwicnViYmVyLWR1Y2tcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG4gICAgZW1vamkoKTogc3RyaW5nIHsgXG4gICAgICAgIHJldHVybiBcIvCfkKVcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDcmFiIGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJjcmFiXCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xuICAgIGVtb2ppKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gXCLwn6aAXCI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW52YWxpZFBldEV4Y2VwdGlvbiB7XG59XG5cbmZ1bmN0aW9uIGdldFBldE5hbWUoY29sbGVjdGlvbjogTWFwPG51bWJlciwgc3RyaW5nPiwgbGFiZWw6IHN0cmluZywgY291bnQ6IG51bWJlcikgOiBzdHJpbmcge1xuICAgIGlmIChjb2xsZWN0aW9uLmhhcyhjb3VudCkpe1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5nZXQoY291bnQpITtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbGFiZWwgKyBjb3VudDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQZXQocGV0VHlwZTogc3RyaW5nLCBlbDogSFRNTEltYWdlRWxlbWVudCwgY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudCwgc2l6ZTogUGV0U2l6ZSwgbGVmdDogbnVtYmVyLCBib3R0b206IG51bWJlciwgcGV0Um9vdDogc3RyaW5nLCBmbG9vcjogbnVtYmVyLCBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsIGNvdW50OiBudW1iZXIpIDogSVBldFR5cGUge1xuICAgIGlmIChwZXRUeXBlID09PSBcInRvdG9yb1wiKXtcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtuYW1lID0gZ2V0UGV0TmFtZShUT1RPUk9fTkFNRVMsIFBldFR5cGUudG90b3JvLCBjb3VudCk7fVxuICAgICAgICByZXR1cm4gbmV3IFRvdG9ybyhlbCwgY29sbGlzaW9uLCBzaXplLCBsZWZ0LCBib3R0b20sIHBldFJvb3QsIGZsb29yLCBuYW1lLCBQZXRTcGVlZC5ub3JtYWwpO1xuICAgIH1cbiAgICBpZiAocGV0VHlwZSA9PT0gXCJjYXRcIil7XG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7bmFtZSA9IGdldFBldE5hbWUoQ0FUX05BTUVTLCBQZXRUeXBlLmNhdCwgY291bnQpO31cbiAgICAgICAgcmV0dXJuIG5ldyBDYXQoZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vciwgbmFtZSwgUGV0U3BlZWQubm9ybWFsKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJkb2dcIikge1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge25hbWUgPSBnZXRQZXROYW1lKERPR19OQU1FUywgUGV0VHlwZS5kb2csIGNvdW50KTt9XG4gICAgICAgIHJldHVybiBuZXcgRG9nKGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IsIG5hbWUsIFBldFNwZWVkLm5vcm1hbCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwic25ha2VcIikge1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge25hbWUgPSBnZXRQZXROYW1lKFNOQUtFX05BTUVTLCBQZXRUeXBlLnNuYWtlLCBjb3VudCk7fVxuICAgICAgICByZXR1cm4gbmV3IFNuYWtlKGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IsIG5hbWUsIFBldFNwZWVkLnZlcnlTbG93KTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJjbGlwcHlcIikge1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge25hbWUgPSBnZXRQZXROYW1lKENMSVBQWV9OQU1FUywgUGV0VHlwZS5jbGlwcHksIGNvdW50KTt9XG4gICAgICAgIHJldHVybiBuZXcgQ2xpcHB5KGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IsIG5hbWUsIFBldFNwZWVkLnNsb3cpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcImNyYWJcIikge1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge25hbWUgPSBnZXRQZXROYW1lKENSQUJfTkFNRVMsIFBldFR5cGUuY3JhYiwgY291bnQpO31cbiAgICAgICAgcmV0dXJuIG5ldyBDcmFiKGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IsIG5hbWUsIFBldFNwZWVkLnNsb3cpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcInJ1YmJlci1kdWNrXCIpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtuYW1lID0gZ2V0UGV0TmFtZShEVUNLX05BTUVTLCBQZXRUeXBlLnJ1YmJlcmR1Y2ssIGNvdW50KTt9XG4gICAgICAgIHJldHVybiBuZXcgUnViYmVyRHVjayhlbCwgY29sbGlzaW9uLCBzaXplLCBsZWZ0LCBib3R0b20sIHBldFJvb3QsIGZsb29yLCBuYW1lLCBQZXRTcGVlZC5mYXN0KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEludmFsaWRQZXRFeGNlcHRpb24oKTtcbn1cblxuIiwiaW1wb3J0IHsgUGV0Q29sb3IsIFBldFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGVzXCI7XG5pbXBvcnQgeyBJUGV0VHlwZSB9IGZyb20gXCIuL3BldHNcIjtcblxuZXhwb3J0IGNsYXNzIFBldEluc3RhbmNlU3RhdGUge1xuICAgIGN1cnJlbnRTdGF0ZUVudW06IFN0YXRlcyB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBldEVsZW1lbnRTdGF0ZSB7XG4gICAgcGV0U3RhdGU6IFBldEluc3RhbmNlU3RhdGUgfCB1bmRlZmluZWQ7XG4gICAgcGV0VHlwZTogUGV0VHlwZSB8IHVuZGVmaW5lZDtcbiAgICBwZXRDb2xvcjogUGV0Q29sb3IgfCB1bmRlZmluZWQ7XG4gICAgZWxMZWZ0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgZWxCb3R0b206IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwZXROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcGV0RnJpZW5kOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQZXRQYW5lbFN0YXRlIHtcbiAgICBwZXRTdGF0ZXM6IEFycmF5PFBldEVsZW1lbnRTdGF0ZT4gfCB1bmRlZmluZWQ7XG4gICAgcGV0Q291bnRlcjogbnVtYmVyIHwgdW5kZWZpbmVkO1xufVxuXG5cbmV4cG9ydCBlbnVtIEhvcml6b250YWxEaXJlY3Rpb24ge1xuICAgIGxlZnQsXG4gICAgcmlnaHQsXG4gICAgbmF0dXJhbCAvLyBObyBjaGFuZ2UgdG8gY3VycmVudCBkaXJlY3Rpb25cbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gU3RhdGVzIHtcbiAgICBzaXRJZGxlID0gXCJzaXQtaWRsZVwiLFxuICAgIHdhbGtSaWdodCA9IFwid2Fsay1yaWdodFwiLFxuICAgIHdhbGtMZWZ0ID0gXCJ3YWxrLWxlZnRcIixcbiAgICBydW5SaWdodCA9IFwicnVuLXJpZ2h0XCIsXG4gICAgcnVuTGVmdCA9IFwicnVuLWxlZnRcIixcbiAgICBsaWUgPSBcImxpZVwiLFxuICAgIHdhbGxIYW5nTGVmdCA9IFwid2FsbC1oYW5nLWxlZnRcIixcbiAgICBjbGltYldhbGxMZWZ0ID0gXCJjbGltYi13YWxsLWxlZnRcIixcbiAgICBqdW1wRG93bkxlZnQgPSBcImp1bXAtZG93bi1sZWZ0XCIsXG4gICAgbGFuZCA9IFwibGFuZFwiLFxuICAgIHN3aXBlID0gXCJzd2lwZVwiLFxuICAgIGlkbGVXaXRoQmFsbCA9IFwiaWRsZS13aXRoLWJhbGxcIixcbiAgICBjaGFzZSA9IFwiY2hhc2VcIixcbiAgICBjaGFzZUZyaWVuZCA9IFwiY2hhc2UtZnJpZW5kXCJcbn1cblxuZXhwb3J0IGVudW0gRnJhbWVSZXN1bHQgeyBcbiAgICBzdGF0ZUNvbnRpbnVlLFxuICAgIHN0YXRlQ29tcGxldGUsXG4gICAgLy8gU3BlY2lhbCBzdGF0ZXNcbiAgICBzdGF0ZUNhbmNlbFxufVxuXG5leHBvcnQgY2xhc3MgQmFsbFN0YXRlIHtcbiAgICBjeDogbnVtYmVyO1xuICAgIGN5OiBudW1iZXI7XG4gICAgdng6IG51bWJlcjtcbiAgICB2eTogbnVtYmVyO1xuICAgIHBhdXNlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIHZ4OiBudW1iZXIsIHZ5OiBudW1iZXIpe1xuICAgICAgICB0aGlzLmN4ID0gY3g7XG4gICAgICAgIHRoaXMuY3kgPSBjeTtcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xuICAgICAgICB0aGlzLnZ5ID0gdnk7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdGF0ZUFib3ZlR3JvdW5kKHN0YXRlOiBTdGF0ZXMpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHN0YXRlID09PSBTdGF0ZXMuY2xpbWJXYWxsTGVmdCB8fFxuICAgICAgICAgICAgc3RhdGUgPT09IFN0YXRlcy5qdW1wRG93bkxlZnQgfHwgXG4gICAgICAgICAgICBzdGF0ZSA9PT0gU3RhdGVzLmxhbmQgfHxcbiAgICAgICAgICAgIHN0YXRlID09PSBTdGF0ZXMud2FsbEhhbmdMZWZ0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVTdGF0ZShzdGF0ZTogc3RyaW5nLCBwZXQ6IElQZXRUeXBlKTogSVN0YXRlIHtcbiAgICBzd2l0Y2goc3RhdGUpe1xuICAgICAgICBjYXNlIFN0YXRlcy5zaXRJZGxlOiByZXR1cm4gbmV3IFNpdElkbGVTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy53YWxrUmlnaHQ6IHJldHVybiBuZXcgV2Fsa1JpZ2h0U3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa0xlZnQ6IHJldHVybiBuZXcgV2Fsa0xlZnRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5ydW5SaWdodDogcmV0dXJuIG5ldyBSdW5SaWdodFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLnJ1bkxlZnQ6IHJldHVybiBuZXcgUnVuTGVmdFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmxpZTogcmV0dXJuIG5ldyBMaWVTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy53YWxsSGFuZ0xlZnQ6IHJldHVybiBuZXcgV2FsbEhhbmdMZWZ0U3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMuY2xpbWJXYWxsTGVmdDogcmV0dXJuIG5ldyBDbGltYldhbGxMZWZ0U3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMuanVtcERvd25MZWZ0OiByZXR1cm4gbmV3IEp1bXBEb3duTGVmdFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmxhbmQ6IHJldHVybiBuZXcgTGFuZFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLnN3aXBlOiByZXR1cm4gbmV3IFN3aXBlU3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMuaWRsZVdpdGhCYWxsOiByZXR1cm4gbmV3IElkbGVXaXRoQmFsbFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmNoYXNlRnJpZW5kOiByZXR1cm4gbmV3IENoYXNlRnJpZW5kU3RhdGUocGV0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTaXRJZGxlU3RhdGUocGV0KTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xuICAgIGxhYmVsOiBzdHJpbmdcbiAgICBzcHJpdGVMYWJlbDogc3RyaW5nXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbjogSG9yaXpvbnRhbERpcmVjdGlvblxuICAgIHBldDogSVBldFR5cGU7XG4gICAgbmV4dEZyYW1lKCk6IEZyYW1lUmVzdWx0XG59XG5cbmNsYXNzIEFic3RyYWN0U3RhdGljU3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLnNpdElkbGU7XG4gICAgaWRsZUNvdW50ZXI6IG51bWJlcjtcbiAgICBzcHJpdGVMYWJlbCA9IFwiaWRsZVwiO1xuICAgIGhvbGRUaW1lID0gNTA7XG4gICAgcGV0OiBJUGV0VHlwZTtcbiAgICBcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSkge1xuICAgICAgICB0aGlzLmlkbGVDb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5wZXQgPSBwZXQ7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIHRoaXMuaWRsZUNvdW50ZXIrKztcbiAgICAgICAgaWYgKHRoaXMuaWRsZUNvdW50ZXIgPiB0aGlzLmhvbGRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTaXRJZGxlU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5zaXRJZGxlO1xuICAgIHNwcml0ZUxhYmVsID0gXCJpZGxlXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgaG9sZFRpbWUgPSA1MDtcbn1cblxuZXhwb3J0IGNsYXNzIExpZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMubGllO1xuICAgIHNwcml0ZUxhYmVsID0gXCJsaWVcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcbiAgICBob2xkVGltZSA9IDUwO1xufVxuXG5leHBvcnQgY2xhc3MgV2FsbEhhbmdMZWZ0U3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy53YWxsSGFuZ0xlZnQ7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGxncmFiXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBob2xkVGltZSA9IDUwO1xufVxuXG5leHBvcnQgY2xhc3MgTGFuZFN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMubGFuZDtcbiAgICBzcHJpdGVMYWJlbCA9IFwibGFuZFwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgaG9sZFRpbWUgPSAxMDtcbn1cblxuZXhwb3J0IGNsYXNzIFN3aXBlU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5zd2lwZTtcbiAgICBzcHJpdGVMYWJlbCA9IFwic3dpcGVcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5uYXR1cmFsO1xuICAgIGhvbGRUaW1lID0gMzA7XG59XG5cbmV4cG9ydCBjbGFzcyBJZGxlV2l0aEJhbGxTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmlkbGVXaXRoQmFsbDtcbiAgICBzcHJpdGVMYWJlbCA9IFwid2l0aF9iYWxsXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBob2xkVGltZSA9IDMwO1xufVxuXG5leHBvcnQgY2xhc3MgV2Fsa1JpZ2h0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLndhbGtSaWdodDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgbGVmdEJvdW5kYXJ5OiBudW1iZXI7XG4gICAgc3BlZWRNdWx0aXBsaWVyID0gMTtcblxuICAgIGNvbnN0cnVjdG9yKHBldDogSVBldFR5cGUpIHtcbiAgICAgICAgdGhpcy5sZWZ0Qm91bmRhcnkgPSBNYXRoLmZsb29yKHdpbmRvdy5pbm5lcldpZHRoICogMC45NSk7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkxlZnQodGhpcy5wZXQubGVmdCgpICsgdGhpcy5wZXQuc3BlZWQoKSAqIHRoaXMuc3BlZWRNdWx0aXBsaWVyKTtcbiAgICAgICAgaWYgKHRoaXMucGV0LmxlZnQoKSA+PSB0aGlzLmxlZnRCb3VuZGFyeSAtIHRoaXMucGV0LndpZHRoKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdhbGtMZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLndhbGtMZWZ0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuICAgIHNwZWVkTXVsdGlwbGllciA9IDE7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkxlZnQodGhpcy5wZXQubGVmdCgpIC0gdGhpcy5wZXQuc3BlZWQoKSAqIHRoaXMuc3BlZWRNdWx0aXBsaWVyKTtcbiAgICAgICAgaWYgKHRoaXMucGV0LmxlZnQoKSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSdW5SaWdodFN0YXRlIGV4dGVuZHMgV2Fsa1JpZ2h0U3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLnJ1blJpZ2h0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcbiAgICBzcGVlZE11bHRpcGxpZXIgPSAxLjY7XG59XG5cbmV4cG9ydCBjbGFzcyBSdW5MZWZ0U3RhdGUgZXh0ZW5kcyBXYWxrTGVmdFN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5ydW5MZWZ0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcbiAgICBzcGVlZE11bHRpcGxpZXIgPSAxLjY7XG59XG5cbmV4cG9ydCBjbGFzcyBDaGFzZVN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5jaGFzZTtcbiAgICBzcHJpdGVMYWJlbCA9IFwicnVuXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBiYWxsU3RhdGU6IEJhbGxTdGF0ZTtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHBldDogSVBldFR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlLCBiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudClcbiAgICB7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgICAgICB0aGlzLmJhbGxTdGF0ZSA9IGJhbGxTdGF0ZTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIGlmICh0aGlzLmJhbGxTdGF0ZS5wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNhbmNlbDsgLy8gQmFsbCBpcyBhbHJlYWR5IGNhdWdodFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBldC5sZWZ0KCkgPiB0aGlzLmJhbGxTdGF0ZS5jeCkge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgICAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSAtIHRoaXMucGV0LnNwZWVkKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcbiAgICAgICAgICAgIHRoaXMucGV0LnBvc2l0aW9uTGVmdCh0aGlzLnBldC5sZWZ0KCkgKyB0aGlzLnBldC5zcGVlZCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLmJhbGxTdGF0ZS5jeSA8ICh0aGlzLnBldC53aWR0aCgpICsgdGhpcy5wZXQuZmxvb3IoKSkgJiZcbiAgICAgICAgICAgIHRoaXMuYmFsbFN0YXRlLmN4IDwgdGhpcy5wZXQubGVmdCgpICYmXG4gICAgICAgICAgICB0aGlzLnBldC5sZWZ0KCkgPCB0aGlzLmJhbGxTdGF0ZS5jeCArIDE1KSB7XG4gICAgICAgICAgICAvLyBoaWRlIGJhbGxcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuYmFsbFN0YXRlLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGFzZUZyaWVuZFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5jaGFzZUZyaWVuZDtcbiAgICBzcHJpdGVMYWJlbCA9IFwicnVuXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSkge1xuICAgICAgICB0aGlzLnBldCA9IHBldDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgaWYgKCF0aGlzLnBldC5mcmllbmQoKS5pc1BsYXlpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ2FuY2VsOyAvLyBGcmllbmQgaXMgbm8gbG9uZ2VyIHBsYXlpbmcuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGV0LmxlZnQoKSA+IHRoaXMucGV0LmZyaWVuZCgpLmxlZnQoKSkge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgICAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSAtIHRoaXMucGV0LnNwZWVkKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcbiAgICAgICAgICAgIHRoaXMucGV0LnBvc2l0aW9uTGVmdCh0aGlzLnBldC5sZWZ0KCkgKyB0aGlzLnBldC5zcGVlZCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENsaW1iV2FsbExlZnRTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuY2xpbWJXYWxsTGVmdDtcbiAgICBzcHJpdGVMYWJlbCA9IFwid2FsbGNsaW1iXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSkge1xuICAgICAgICB0aGlzLnBldCA9IHBldDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgdGhpcy5wZXQucG9zaXRpb25Cb3R0b20odGhpcy5wZXQuYm90dG9tKCkgKyAxKTtcbiAgICAgICAgaWYgKHRoaXMucGV0LmJvdHRvbSgpID49IDEwMCkge1xuICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEp1bXBEb3duTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5qdW1wRG93bkxlZnQ7XG4gICAgc3ByaXRlTGFiZWwgPSBcImZhbGxfZnJvbV9ncmFiXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgcGV0OiBJUGV0VHlwZTtcblxuICAgIGNvbnN0cnVjdG9yKHBldDogSVBldFR5cGUpIHtcbiAgICAgICAgdGhpcy5wZXQgPSBwZXQ7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIHRoaXMucGV0LnBvc2l0aW9uQm90dG9tKHRoaXMucGV0LmJvdHRvbSgpIC0gNSk7XG4gICAgICAgIGlmICh0aGlzLnBldC5ib3R0b20oKSA8PSB0aGlzLnBldC5mbG9vcigpKSB7XG4gICAgICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkJvdHRvbSh0aGlzLnBldC5mbG9vcigpKTtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9ICAgXG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBUaGlzIHNjcmlwdCB3aWxsIGJlIHJ1biB3aXRoaW4gdGhlIHdlYnZpZXcgaXRzZWxmXG5pbXBvcnQgeyBQZXRTaXplLCBQZXRDb2xvciwgUGV0VHlwZSwgVGhlbWUsIENvbG9yVGhlbWVLaW5kLCBXZWJ2aWV3TWVzc2FnZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVQZXQsIElQZXRUeXBlLCBJbnZhbGlkUGV0RXhjZXB0aW9uLCBQZXRDb2xsZWN0aW9uLCBQZXRFbGVtZW50LCBJUGV0Q29sbGVjdGlvbiB9IGZyb20gJy4vcGV0cyc7XG5pbXBvcnQgeyBCYWxsU3RhdGUsIENoYXNlRnJpZW5kU3RhdGUsIFBldEVsZW1lbnRTdGF0ZSwgUGV0SW5zdGFuY2VTdGF0ZSwgUGV0UGFuZWxTdGF0ZSwgU3RhdGVzIH0gZnJvbSAnLi9zdGF0ZXMnO1xuXG4vKiBUaGlzIGlzIGhvdyB0aGUgVlMgQ29kZSBBUEkgY2FuIGJlIGludm9rZWQgZnJvbSB0aGUgcGFuZWwgKi9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFZzY29kZVN0YXRlQXBpIHsgXG4gICAgZ2V0U3RhdGUoKSA6IFBldFBhbmVsU3RhdGU7IC8vIEFQSSBpcyBhY3R1YWxseSBBbnksIGJ1dCB3ZSB3YW50IGl0IHRvIGJlIHR5cGVkLlxuICAgIHNldFN0YXRlKHN0YXRlOiBQZXRQYW5lbFN0YXRlKTogdm9pZDtcbiAgICBwb3N0TWVzc2FnZShtZXNzYWdlOiBXZWJ2aWV3TWVzc2FnZSk6IHZvaWQ7XG4gIH1cbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgYWNxdWlyZVZzQ29kZUFwaSgpOiBWc2NvZGVTdGF0ZUFwaTtcbiAgfVxufVxuXG5jb25zdCB2c2NvZGUgPSB3aW5kb3cuYWNxdWlyZVZzQ29kZUFwaSgpO1xuXG52YXIgYWxsUGV0czogSVBldENvbGxlY3Rpb24gPSBuZXcgUGV0Q29sbGVjdGlvbigpO1xudmFyIHBldENvdW50ZXI6IG51bWJlcjtcblxuZnVuY3Rpb24gY2FsY3VsYXRlQmFsbFJhZGl1cyhzaXplOiBQZXRTaXplKTogbnVtYmVye1xuICBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5uYW5vKXtcbiAgICByZXR1cm4gMjtcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLm1lZGl1bSl7XG4gICAgcmV0dXJuIDQ7XG4gIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5sYXJnZSl7XG4gICAgcmV0dXJuIDg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDE7IC8vIFNocnVnXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlRmxvb3Ioc2l6ZTogUGV0U2l6ZSwgdGhlbWU6IFRoZW1lKTogbnVtYmVyIHtcbiAgc3dpdGNoICh0aGVtZSl7XG4gICAgY2FzZSBUaGVtZS5mb3Jlc3Q6XG4gICAgICBzd2l0Y2ggKHNpemUpe1xuICAgICAgICBjYXNlIFBldFNpemUubWVkaXVtOlxuICAgICAgICAgIHJldHVybiA0MDtcbiAgICAgICAgY2FzZSBQZXRTaXplLmxhcmdlOlxuICAgICAgICAgIHJldHVybiA2NTtcbiAgICAgICAgY2FzZSBQZXRTaXplLm5hbm86XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIDIzO1xuICAgICAgfVxuICAgIGNhc2UgVGhlbWUuY2FzdGxlOlxuICAgICAgc3dpdGNoIChzaXplKXtcbiAgICAgICAgY2FzZSBQZXRTaXplLm1lZGl1bTpcbiAgICAgICAgICByZXR1cm4gODA7XG4gICAgICAgIGNhc2UgUGV0U2l6ZS5sYXJnZTpcbiAgICAgICAgICByZXR1cm4gMTIwO1xuICAgICAgICBjYXNlIFBldFNpemUubmFubzpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gNDU7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vdXNlT3ZlcihlOiBNb3VzZUV2ZW50KXtcbiAgdmFyIGVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICBhbGxQZXRzLnBldHMoKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGlmIChlbGVtZW50LmNvbGxpc2lvbiA9PT0gZWwpe1xuICAgICAgaWYgKCFlbGVtZW50LnBldC5jYW5Td2lwZSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnQucGV0LnN3aXBlKCk7XG4gICAgfVxuICB9KTtcbiAgXG59XG5cbmZ1bmN0aW9uIHN0YXJ0QW5pbWF0aW9ucyhjb2xsaXNpb246IEhUTUxEaXZFbGVtZW50LCBwZXQ6IElQZXRUeXBlKSB7XG4gIGNvbGxpc2lvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhhbmRsZU1vdXNlT3Zlcik7XG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICB2YXIgdXBkYXRlcyA9IGFsbFBldHMuc2Vla05ld0ZyaWVuZHMoKTtcbiAgICB1cGRhdGVzLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICB2c2NvZGUucG9zdE1lc3NhZ2Uoe1xuICAgICAgICB0ZXh0OiBtZXNzYWdlLFxuICAgICAgICBjb21tYW5kOiAnaW5mbydcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHBldC5uZXh0RnJhbWUoKTtcbiAgICBzYXZlU3RhdGUoKTtcbiAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gYWRkUGV0VG9QYW5lbChwZXRUeXBlOiBQZXRUeXBlLCBiYXNlUGV0VXJpOiBzdHJpbmcsIHBldENvbG9yOiBQZXRDb2xvciwgcGV0U2l6ZTogUGV0U2l6ZSwgbGVmdDogbnVtYmVyLCBib3R0b206IG51bWJlciwgZmxvb3I6IG51bWJlciwgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogUGV0RWxlbWVudCB7XG4gIHZhciBwZXRTcHJpdGVFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgcGV0U3ByaXRlRWxlbWVudC5jbGFzc05hbWUgPSBcInBldFwiO1xuICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXRzQ29udGFpbmVyXCIpIGFzIEhUTUxEaXZFbGVtZW50KS5hcHBlbmRDaGlsZChwZXRTcHJpdGVFbGVtZW50KTtcblxuICB2YXIgY29sbGlzaW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb2xsaXNpb25FbGVtZW50LmNsYXNzTmFtZSA9IFwiY29sbGlzaW9uXCI7XG4gIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBldHNDb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQpLmFwcGVuZENoaWxkKGNvbGxpc2lvbkVsZW1lbnQpO1xuXG4gIGNvbnN0IHJvb3QgPSBiYXNlUGV0VXJpICsgJy8nICsgcGV0VHlwZSArICcvJyArIHBldENvbG9yO1xuICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIG5ldyBwZXQgOiBcIiwgcGV0VHlwZSwgcm9vdCk7XG4gIHZhciBuZXdQZXQgPSBjcmVhdGVQZXQocGV0VHlwZSwgcGV0U3ByaXRlRWxlbWVudCwgY29sbGlzaW9uRWxlbWVudCwgcGV0U2l6ZSwgbGVmdCwgYm90dG9tLCByb290LCBmbG9vciwgbmFtZSwgcGV0Q291bnRlcik7XG4gIHBldENvdW50ZXIgKysgO1xuICBzdGFydEFuaW1hdGlvbnMoY29sbGlzaW9uRWxlbWVudCwgbmV3UGV0KTtcbiAgcmV0dXJuIG5ldyBQZXRFbGVtZW50KHBldFNwcml0ZUVsZW1lbnQsIGNvbGxpc2lvbkVsZW1lbnQsIG5ld1BldCwgcGV0Q29sb3IsIHBldFR5cGUpO1xufVxuXG5mdW5jdGlvbiBzYXZlU3RhdGUoKXtcbiAgdmFyIHN0YXRlID0gbmV3IFBldFBhbmVsU3RhdGUoKTtcbiAgc3RhdGUucGV0U3RhdGVzID0gbmV3IEFycmF5KCk7XG5cbiAgYWxsUGV0cy5wZXRzKCkuZm9yRWFjaChwZXRJdGVtID0+IHtcbiAgICBzdGF0ZS5wZXRTdGF0ZXMhLnB1c2goe1xuICAgICAgcGV0TmFtZTogcGV0SXRlbS5wZXQubmFtZSgpLFxuICAgICAgcGV0Q29sb3I6IHBldEl0ZW0uY29sb3IsXG4gICAgICBwZXRUeXBlOiBwZXRJdGVtLnR5cGUsXG4gICAgICBwZXRTdGF0ZTogcGV0SXRlbS5wZXQuZ2V0U3RhdGUoKSxcbiAgICAgIHBldEZyaWVuZDogcGV0SXRlbS5wZXQuZnJpZW5kKCkgPyBwZXRJdGVtLnBldC5mcmllbmQoKS5uYW1lKCkgOiB1bmRlZmluZWQsXG4gICAgICBlbExlZnQ6IHBldEl0ZW0uZWwuc3R5bGUubGVmdCxcbiAgICAgIGVsQm90dG9tOiBwZXRJdGVtLmVsLnN0eWxlLmJvdHRvbVxuICAgIH0pO1xuICB9KTtcbiAgc3RhdGUucGV0Q291bnRlciA9IHBldENvdW50ZXI7XG4gIHZzY29kZS5zZXRTdGF0ZShzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHJlY292ZXJTdGF0ZShiYXNlUGV0VXJpOiBzdHJpbmcsIHBldFNpemU6IFBldFNpemUsIGZsb29yOiBudW1iZXIpe1xuICB2YXIgc3RhdGUgPSB2c2NvZGUuZ2V0U3RhdGUoKTtcbiAgXG4gIGlmIChzdGF0ZS5wZXRDb3VudGVyID09PSB1bmRlZmluZWQgfHwgaXNOYU4oc3RhdGUucGV0Q291bnRlcikpe1xuICAgIHBldENvdW50ZXIgPSAxO1xuICB9IGVsc2Uge1xuICAgIHBldENvdW50ZXIgPSBzdGF0ZS5wZXRDb3VudGVyITtcbiAgfVxuXG4gIHZhciByZWNvdmVyeU1hcDogTWFwPElQZXRUeXBlLCBQZXRFbGVtZW50U3RhdGU+ID0gbmV3IE1hcCgpO1xuICBzdGF0ZS5wZXRTdGF0ZXMhLmZvckVhY2gocCA9PiB7XG4gICAgLy8gRml4ZXMgYSBidWcgcmVsYXRlZCB0byBkdWNrIGFuaW1hdGlvbnNcbiAgICBpZiAocC5wZXRUeXBlIGFzIHN0cmluZyA9PT0gXCJydWJiZXIgZHVja1wiKSB7KHAucGV0VHlwZSBhcyBzdHJpbmcpID0gXCJydWJiZXItZHVja1wiO31cblxuICAgIHRyeSB7XG4gICAgICB2YXIgbmV3UGV0ID0gYWRkUGV0VG9QYW5lbChcbiAgICAgICAgcC5wZXRUeXBlISwgXG4gICAgICAgIGJhc2VQZXRVcmksIFxuICAgICAgICBwLnBldENvbG9yISwgXG4gICAgICAgIHBldFNpemUsIFxuICAgICAgICBwYXJzZUludChwLmVsTGVmdCEpLCBcbiAgICAgICAgcGFyc2VJbnQocC5lbEJvdHRvbSEpLCBcbiAgICAgICAgZmxvb3IsXG4gICAgICAgIHAucGV0TmFtZSk7XG4gICAgICBhbGxQZXRzLnB1c2gobmV3UGV0KTtcbiAgICAgIHJlY292ZXJ5TWFwLnNldChuZXdQZXQucGV0LCBwKTtcbiAgICB9IGNhdGNoIChJbnZhbGlkUGV0RXhjZXB0aW9uKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiU3RhdGUgaGFkIGludmFsaWQgcGV0IChcIiArIHAucGV0VHlwZSArIFwiKSwgZGlzY2FyZGluZy5cIik7XG4gICAgfVxuICB9KTtcbiAgcmVjb3ZlcnlNYXAuZm9yRWFjaCggKHN0YXRlLCBwZXQpID0+IHtcbiAgICAvLyBSZWNvdmVyIHByZXZpb3VzIHN0YXRlLlxuICAgIHBldC5yZWNvdmVyU3RhdGUoc3RhdGUucGV0U3RhdGUhKTtcblxuICAgIC8vIFJlc29sdmUgZnJpZW5kIHJlbGF0aW9uc2hpcHNcbiAgICB2YXIgZnJpZW5kID0gdW5kZWZpbmVkO1xuICAgIGlmIChzdGF0ZS5wZXRGcmllbmQpe1xuICAgICAgZnJpZW5kID0gYWxsUGV0cy5sb2NhdGUoc3RhdGUucGV0RnJpZW5kKTtcbiAgICAgIGlmIChmcmllbmQpe1xuICAgICAgICBwZXQucmVjb3ZlckZyaWVuZChmcmllbmQucGV0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByYW5kb21TdGFydFBvc2l0aW9uKCkgOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lcldpZHRoICogMC43KSk7XG59XG5cbmxldCBjYW52YXMgOiBIVE1MQ2FudmFzRWxlbWVudCwgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XG4gIGNhbnZhcyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBldENhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudCk7XG4gIGN0eCA9IChjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XG4gIGN0eC5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgY3R4LmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG59XG5cbi8vIEl0IGNhbm5vdCBhY2Nlc3MgdGhlIG1haW4gVlMgQ29kZSBBUElzIGRpcmVjdGx5LlxuZXhwb3J0IGZ1bmN0aW9uIHBldFBhbmVsQXBwKGJhc2VQZXRVcmk6IHN0cmluZywgdGhlbWU6IFRoZW1lLCB0aGVtZUtpbmQ6IENvbG9yVGhlbWVLaW5kLCBwZXRDb2xvcjogUGV0Q29sb3IsIHBldFNpemU6IFBldFNpemUsIHBldFR5cGU6IFBldFR5cGUpIHtcbiAgY29uc3QgYmFsbFJhZGl1czogbnVtYmVyID0gY2FsY3VsYXRlQmFsbFJhZGl1cyhwZXRTaXplKTtcbiAgdmFyIGZsb29yID0gMDtcbiAgLy8gQXBwbHkgVGhlbWUgYmFja2dyb3VuZHNcbiAgaWYgKHRoZW1lICE9PSBUaGVtZS5ub25lKXtcbiAgICB2YXIgX3RoZW1lS2luZCA9IFwiXCI7XG4gICAgc3dpdGNoICh0aGVtZUtpbmQpIHtcbiAgICAgIGNhc2UgQ29sb3JUaGVtZUtpbmQuRGFyazpcbiAgICAgICAgX3RoZW1lS2luZCA9IFwiZGFya1wiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29sb3JUaGVtZUtpbmQuTGlnaHQ6XG4gICAgICAgIF90aGVtZUtpbmQgPSBcImxpZ2h0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb2xvclRoZW1lS2luZC5IaWdoQ29udHJhc3Q6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBfdGhlbWVLaW5kID0gXCJsaWdodFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cblxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtiYXNlUGV0VXJpfS9iYWNrZ3JvdW5kcy8ke3RoZW1lfS9iYWNrZ3JvdW5kLSR7X3RoZW1lS2luZH0tJHtwZXRTaXplfS5wbmcnKWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JlZ3JvdW5kXCIpIS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCcke2Jhc2VQZXRVcml9L2JhY2tncm91bmRzLyR7dGhlbWV9L2ZvcmVncm91bmQtJHtfdGhlbWVLaW5kfS0ke3BldFNpemV9LnBuZycpYDtcbiAgICBcbiAgICBmbG9vciA9IGNhbGN1bGF0ZUZsb29yKHBldFNpemUsIHRoZW1lKTsgLy8gVGhlbWVzIGhhdmUgcGV0cyBhdCBhIHNwZWNpZmllZCBoZWlnaHQgZnJvbSB0aGUgZ3JvdW5kXG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIlwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWdyb3VuZFwiKSEuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJcIjtcbiAgfVxuXG4gIC8vLyBCb3VuY2luZyBiYWxsIGNvbXBvbmVudHMsIGNyZWRpdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjk5ODIzNDNcbiAgY29uc3QgZ3Jhdml0eTogbnVtYmVyID0gMC4yLCBkYW1waW5nOiBudW1iZXIgPSAwLjksIHRyYWN0aW9uOiBudW1iZXIgPSAwLjg7XG4gIHZhciBiYWxsU3RhdGU6IEJhbGxTdGF0ZTtcblxuICBmdW5jdGlvbiByZXNldEJhbGwoKSB7XG4gICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgYmFsbFN0YXRlID0gbmV3IEJhbGxTdGF0ZSgxMDAsIDEwMCwgMiwgNSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aHJvd0JhbGwoKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGlmICghYmFsbFN0YXRlLnBhdXNlZCkge3JlcXVlc3RBbmltYXRpb25GcmFtZSh0aHJvd0JhbGwpO31cblxuICAgIGlmIChiYWxsU3RhdGUuY3ggKyBiYWxsUmFkaXVzID49IGNhbnZhcy53aWR0aCkge1xuICAgICAgYmFsbFN0YXRlLnZ4ID0gLWJhbGxTdGF0ZS52eCAqIGRhbXBpbmc7XG4gICAgICBiYWxsU3RhdGUuY3ggPSBjYW52YXMud2lkdGggLSBiYWxsUmFkaXVzO1xuICAgIH0gZWxzZSBpZiAoYmFsbFN0YXRlLmN4IC0gYmFsbFJhZGl1cyA8PSAwKSB7XG4gICAgICBiYWxsU3RhdGUudnggPSAtYmFsbFN0YXRlLnZ4ICogZGFtcGluZztcbiAgICAgIGJhbGxTdGF0ZS5jeCA9IGJhbGxSYWRpdXM7XG4gICAgfVxuICAgIGlmIChiYWxsU3RhdGUuY3kgKyBiYWxsUmFkaXVzICsgZmxvb3IgPj0gKGNhbnZhcy5oZWlnaHQpKSB7XG4gICAgICBiYWxsU3RhdGUudnkgPSAtYmFsbFN0YXRlLnZ5ICogZGFtcGluZztcbiAgICAgIGJhbGxTdGF0ZS5jeSA9IGNhbnZhcy5oZWlnaHQgLSBiYWxsUmFkaXVzIC0gZmxvb3I7XG4gICAgICAvLyB0cmFjdGlvbiBoZXJlXG4gICAgICBiYWxsU3RhdGUudnggKj0gdHJhY3Rpb247XG4gICAgfSBlbHNlIGlmIChiYWxsU3RhdGUuY3kgLSBiYWxsUmFkaXVzIDw9IDApIHtcbiAgICAgIGJhbGxTdGF0ZS52eSA9IC1iYWxsU3RhdGUudnkgKiBkYW1waW5nO1xuICAgICAgYmFsbFN0YXRlLmN5ID0gYmFsbFJhZGl1cztcbiAgICB9XG5cbiAgICBiYWxsU3RhdGUudnkgKz0gZ3Jhdml0eTtcblxuICAgIGJhbGxTdGF0ZS5jeCArPSBiYWxsU3RhdGUudng7XG4gICAgYmFsbFN0YXRlLmN5ICs9IGJhbGxTdGF0ZS52eTtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGJhbGxTdGF0ZS5jeCwgYmFsbFN0YXRlLmN5LCBiYWxsUmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMyZWQ4NTFcIjtcbiAgICBjdHguZmlsbCgpO1xuICB9XG5cbiAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIHBldCBzZXNzaW9uJywgcGV0Q29sb3IsIGJhc2VQZXRVcmksIHBldFR5cGUpO1xuICAvLyBOZXcgc2Vzc2lvblxuICB2YXIgc3RhdGUgPSB2c2NvZGUuZ2V0U3RhdGUoKTtcbiAgaWYgKCFzdGF0ZSkge1xuICAgIGNvbnNvbGUubG9nKCdObyBzdGF0ZSwgc3RhcnRpbmcgYSBuZXcgc2Vzc2lvbi4nKTtcbiAgICBwZXRDb3VudGVyID0gMTtcbiAgICBhbGxQZXRzLnB1c2goYWRkUGV0VG9QYW5lbChwZXRUeXBlLCBiYXNlUGV0VXJpLCBwZXRDb2xvciwgcGV0U2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCBmbG9vciwgZmxvb3IsIHVuZGVmaW5lZCkpO1xuICAgIHNhdmVTdGF0ZSgpO1xuICB9IGVsc2UgeyBcbiAgICBjb25zb2xlLmxvZygnUmVjb3ZlcmluZyBzdGF0ZSAtICcsIHN0YXRlKTtcbiAgICByZWNvdmVyU3RhdGUoYmFzZVBldFVyaSwgcGV0U2l6ZSwgZmxvb3IpO1xuICB9XG5cbiAgaW5pdENhbnZhcygpO1xuXG4gIC8vIEhhbmRsZSBtZXNzYWdlcyBzZW50IGZyb20gdGhlIGV4dGVuc2lvbiB0byB0aGUgd2Vidmlld1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGV2ZW50LmRhdGE7IC8vIFRoZSBqc29uIGRhdGEgdGhhdCB0aGUgZXh0ZW5zaW9uIHNlbnRcbiAgICBzd2l0Y2ggKG1lc3NhZ2UuY29tbWFuZCkge1xuICAgICAgY2FzZSBcInRocm93LWJhbGxcIjpcbiAgICAgICAgcmVzZXRCYWxsKCk7XG4gICAgICAgIHRocm93QmFsbCgpO1xuICAgICAgICBhbGxQZXRzLnBldHMoKS5mb3JFYWNoKHBldEVsID0+IHtcbiAgICAgICAgICBpZiAocGV0RWwucGV0LmNhbkNoYXNlKCkpe1xuICAgICAgICAgICAgcGV0RWwucGV0LmNoYXNlKGJhbGxTdGF0ZSwgY2FudmFzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzcGF3bi1wZXRcIjpcbiAgICAgICAgYWxsUGV0cy5wdXNoKGFkZFBldFRvUGFuZWwobWVzc2FnZS50eXBlLCBiYXNlUGV0VXJpLCBtZXNzYWdlLmNvbG9yLCBwZXRTaXplLCByYW5kb21TdGFydFBvc2l0aW9uKCksIGZsb29yLCBmbG9vciwgdW5kZWZpbmVkKSk7XG4gICAgICAgIHNhdmVTdGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyZXNldC1wZXRcIjpcbiAgICAgICAgYWxsUGV0cy5wZXRzKCkuZm9yRWFjaChwZXQgPT4ge1xuICAgICAgICAgIHBldC5lbC5yZW1vdmUoKTtcbiAgICAgICAgICBwZXQuY29sbGlzaW9uLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgYWxsUGV0cy5yZXNldCgpO1xuICAgICAgICBhbGxQZXRzLnB1c2goYWRkUGV0VG9QYW5lbChtZXNzYWdlLnR5cGUsIGJhc2VQZXRVcmksIG1lc3NhZ2UuY29sb3IsIG1lc3NhZ2Uuc2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCBmbG9vciwgZmxvb3IsIHVuZGVmaW5lZCkpO1xuICAgICAgICBwZXRDb3VudGVyID0gMTtcbiAgICAgICAgc2F2ZVN0YXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG5cbn07XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICBpbml0Q2FudmFzKCk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=