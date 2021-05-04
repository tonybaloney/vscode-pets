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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvY29tbW9uL25hbWVzLnRzIiwid2VicGFjazovL3BldEFwcC8uL3NyYy9wYW5lbC9wZXRzLnRzIiwid2VicGFjazovL3BldEFwcC8uL3NyYy9wYW5lbC9zdGF0ZXMudHMiLCJ3ZWJwYWNrOi8vcGV0QXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BldEFwcC8uL3NyYy9wYW5lbC9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYSxpQkFBUyxHQUF3QixJQUFJLEdBQUcsQ0FBaUI7SUFDbEUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQ1osQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO0lBQ2YsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO0lBQ2YsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO0lBQ1gsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ1osQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0lBQ2QsQ0FB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cUJBQ3BDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDUixLQUFLLFdBQVc7Z0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlILFNBQVMsRUFBRSxDQUFDO2dCQUNaLE1BQU07WUFDUixLQUFLLFdBQVc7Z0JBQ2QsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDekIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25JLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7Z0JBQ1osTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDO0FBbkhELGtDQW1IQztBQUFBLENBQUM7QUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO0lBQ2hDLFVBQVUsRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUEVUX05BTUVTOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xyXG4gICAgWzEsICdCZWxsYSddLFxyXG4gICAgWzIsICdDaGFybGllJ10sXHJcbiAgICBbMywgJ01heCddLFxyXG4gICAgWzQsICdNb2xseSddLFxyXG4gICAgWzUsICdDb2NvJ10sXHJcbiAgICBbNiwgJ0J1ZGR5J10sXHJcbiAgICBbNywgJ1J1YnknXSxcclxuICAgIFs4LCAnT3NjYXInXSxcclxuICAgIFs5LCAnTHVjeSddLFxyXG4gICAgWzEwLCAnQmFpbGV5J10sXHJcbiAgICBbMTEsICdNaWxvJ10sXHJcbiAgICBbMTIsICdEYWlzeSddLFxyXG4gICAgWzEzLCAnQXJjaGllJ10sXHJcbiAgICBbMTQsICdPbGxpZSddLFxyXG4gICAgWzE1LCAnUm9zaWUnXSxcclxuICAgIFsxNiwgJ0xvbGEnXSxcclxuICAgIFsxNywgJ0ZyYW5raWUnXSxcclxuICAgIFsxOCwgJ1RvYnknXSxcclxuICAgIFsxOSwgJ1JveHknXSxcclxuICAgIFsyMCwgJ1BvcHB5J10sXHJcbiAgICBbMjEsICdMdW5hJ10sXHJcbiAgICBbMjIsICdKYWNrJ10sXHJcbiAgICBbMjMsICdNaWxsaWUnXSxcclxuICAgIFsyNCwgJ1RlZGR5J10sXHJcbiAgICBbMjUsICdIYXJyeSddLFxyXG4gICAgWzI2LCAnQ29vcGVyJ10sXHJcbiAgICBbMjcsICdCZWFyJ10sXHJcbiAgICBbMjgsICdSb2NreSddLFxyXG4gICAgWzI5LCAnQWxmaWUnXSxcclxuICAgIFszMCwgJ0h1Z28nXSxcclxuICAgIFszMSwgJ0Jvbm5pZSddLFxyXG4gICAgWzMyLCAnUGVwcGVyJ10sXHJcbiAgICBbMzMsICdMaWx5J10sXHJcbiAgICBbMzQsICdUaWxseSddLFxyXG4gICAgWzM1LCAnTGVvJ10sXHJcbiAgICBbMzYsICdNYWdnaWUnXSxcclxuICAgIFszNywgJ0dlb3JnZSddLFxyXG4gICAgWzM4LCAnTWlhJ10sXHJcbiAgICBbMzksICdNYXJsZXknXSxcclxuICAgIFs0MCwgJ0hhcmxleSddLFxyXG4gICAgWzQxLCAnQ2hsb2UnXSxcclxuICAgIFs0MiwgJ0x1bHUnXSxcclxuICAgIFs0MywgJ01pc3N5J10sXHJcbiAgICBbNDQsICdKYXNwZXInXSxcclxuICAgIFs0NSwgJ0JpbGx5J10sXHJcbiAgICBbNDYsICdOYWxhJ10sXHJcbiAgICBbNDcsICdNb250eSddLFxyXG4gICAgWzQ4LCAnWmlnZ3knXSxcclxuICAgIFs0OSwgJ1dpbnN0b24nXSxcclxuICAgIFs1MCwgJ1pldXMnXSxcclxuICAgIFs1MSwgJ1pvZSddLFxyXG4gICAgWzUyLCAnU3RlbGxhJ10sXHJcbiAgICBbNTMsICdTYXNoYSddLFxyXG4gICAgWzU0LCAnUnVzdHknXSxcclxuICAgIFs1NSwgJ0d1cyddLFxyXG4gICAgWzU2LCAnQmF4dGVyJ10sXHJcbiAgICBbNTcsICdEZXh0ZXInXSxcclxuICAgIFs1OCwgJ0RpZXNlbCddLFxyXG4gICAgWzU5LCAnV2lsbG93J10sXHJcbiAgICBbNjAsICdCYXJuZXknXSxcclxuICAgIFs2MSwgJ0JydW5vJ10sXHJcbiAgICBbNjIsICdQZW5ueSddLFxyXG4gICAgWzYzLCAnSG9uZXknXSxcclxuICAgIFs2NCwgJ01pbGx5J10sXHJcbiAgICBbNjUsICdNdXJwaHknXSxcclxuICAgIFs2NiwgJ1NpbWJhJ10sXHJcbiAgICBbNjcsICdIb2xseSddLFxyXG4gICAgWzY4LCAnQmVuamknXSxcclxuICAgIFs2OSwgJ0hlbnJ5J10sXHJcbiAgICBbNzAsICdMaWxseSddLFxyXG4gICAgWzcxLCAnUGlwcGEnXSxcclxuICAgIFs3MiwgJ1NoYWRvdyddLFxyXG4gICAgWzczLCAnU2FtJ10sXHJcbiAgICBbNzQsICdCdXN0ZXInXSxcclxuICAgIFs3NSwgJ0x1Y2t5J10sXHJcbiAgICBbNzYsICdFbGxpZSddLFxyXG4gICAgWzc3LCAnRHVrZSddLFxyXG4gICAgWzc4LCAnSmVzc2llJ10sXHJcbiAgICBbNzksICdDb29raWUnXSxcclxuICAgIFs4MCwgJ0hhcnZleSddLFxyXG4gICAgWzgxLCAnQnJ1Y2UnXSxcclxuICAgIFs4MiwgJ0pheCddLFxyXG4gICAgWzgzLCAnUmV4J10sXHJcbiAgICBbODQsICdMb3VpZSddLFxyXG4gICAgWzg1LCAnQmVudGxleSddLFxyXG4gICAgWzg2LCAnSmV0J10sXHJcbiAgICBbODcsICdCYW5qbyddLFxyXG4gICAgWzg4LCAnQmVhdSddLFxyXG4gICAgWzg5LCAnRWxsYSddLFxyXG4gICAgWzkwLCAnUmFscGgnXSxcclxuICAgIFs5MSwgJ0xva2knXSxcclxuICAgIFs5MiwgJ0xleGknXSxcclxuICAgIFs5MywgJ0NoZXN0ZXInXSxcclxuICAgIFs5NCwgJ1NvcGhpZSddLFxyXG4gICAgWzk1LCAnQ2hpbGxpJ10sXHJcbiAgICBbOTYsICdCaWxsaWUnXSxcclxuICAgIFs5NywgJ0xvdWlzJ10sXHJcbiAgICBbOTgsICdTY291dCddLFxyXG4gICAgWzk5LCAnQ2hhcmxpZSddLFxyXG4gICAgWzEwMCwgJ0NsZW8nXSxcclxuICAgIFsxMDEsICdQdXJmZWN0J10sXHJcbiAgICBbMTAyLCAnU3BvdCddLFxyXG4gICAgWzEwMywgJ0hhcnJ5J10sXHJcbl0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IENBVF9OQU1FUyA9IFBFVF9OQU1FUztcclxuXHJcbmV4cG9ydCBjb25zdCBET0dfTkFNRVMgPSBQRVRfTkFNRVM7XHJcblxyXG5leHBvcnQgY29uc3QgQ1JBQl9OQU1FUyA6IE1hcDxudW1iZXIsIHN0cmluZz4gPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPihbXHJcbiAgICBbMSwgJ0ZlcnJpcyddLFxyXG4gICAgWzIsICdQaW5jaHknXSxcclxuICAgIFszLCAnR3JhYmJ5J10sXHJcbiAgICBbNCwgJ0JpZyBSZWQnXSxcclxuICAgIFs1LCAnQ3JhYmJ5J10sXHJcbiAgICBbNiwgJ0J1ZGR5J10sXHJcbiAgICBbNywgJ1J1YnkgUmVkJ10sXHJcbiAgICBbOCwgJ09zY2FyJ10sXHJcbiAgICBbOSwgJ0x1Y3knXSxcclxuICAgIFsxMCwgJ0JhaWxleSddXHJcbl0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IENMSVBQWV9OQU1FUzogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcclxuICAgIFsxLCAnQ2xpcHB5J10sXHJcbiAgICBbMiwgJ0thcmwgS2xhbW1lciddLFxyXG4gICAgWzMsICdDbGlwcHkgSnIuJ10sXHJcbiAgICBbNCwgJ01vbGx5J10sXHJcbiAgICBbNSwgJ0NvY28nXSxcclxuICAgIFs2LCAnQnVkZHknXSxcclxuICAgIFs3LCAnUnVieSddLFxyXG4gICAgWzgsICdPc2NhciddLFxyXG4gICAgWzksICdMdWN5J10sXHJcbiAgICBbMTAsICdCYWlsZXknXSxcclxuXSk7XHJcblxyXG5leHBvcnQgY29uc3QgVE9UT1JPX05BTUVTOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xyXG4gICAgWzEsICdUb3Rvcm8nXSxcclxuICAgIFsyLCAn44OI44OI44OtJ10sXHJcbiAgICBbMywgJ01heCddLFxyXG4gICAgWzQsICdNb2xseSddLFxyXG4gICAgWzUsICdDb2NvJ10sXHJcbiAgICBbNiwgJ0J1ZGR5J10sXHJcbiAgICBbNywgJ1J1YnknXSxcclxuICAgIFs4LCAnT3NjYXInXSxcclxuICAgIFs5LCAnTHVjeSddLFxyXG4gICAgWzEwLCAnQmFpbGV5J10sXHJcbl0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNOQUtFX05BTUVTOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xyXG4gICAgWzEsICdTbmVha3knXSxcclxuICAgIFsyLCAnTXIgU2xpcHBlcnknXSxcclxuICAgIFszLCAnTWF4J10sXHJcbiAgICBbNCwgJ01vbGx5J10sXHJcbiAgICBbNSwgJ0NvY28nXSxcclxuICAgIFs2LCAnQnVkZHknXSxcclxuICAgIFs3LCAnUnVieSddLFxyXG4gICAgWzgsICdPc2NhciddLFxyXG4gICAgWzksICdMdWN5J10sXHJcbiAgICBbMTAsICdCYWlsZXknXSxcclxuXSk7XHJcblxyXG5leHBvcnQgY29uc3QgRFVDS19OQU1FUzogTWFwPG51bWJlciwgc3RyaW5nPiA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KFtcclxuICAgIFsxLCAnUXVhY2t5J10sXHJcbiAgICBbMiwgJ0Zsb2F0eSddLFxyXG4gICAgWzMsICdEdWNrJ10sXHJcbiAgICBbNCwgJ01vbGx5J10sXHJcbiAgICBbNSwgJ1N1bnNoaW5lJ10sXHJcbiAgICBbNiwgJ0J1ZGR5J10sXHJcbiAgICBbNywgJ0NoaXJweSddLFxyXG4gICAgWzgsICdPc2NhciddLFxyXG4gICAgWzksICdMdWN5J10sXHJcbiAgICBbMTAsICdCYWlsZXknXSxcclxuXSk7XHJcbiIsImltcG9ydCB7IFBldENvbG9yLCBQZXRTaXplLCBQZXRTcGVlZCwgUGV0VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdHlwZXNcIjtcclxuaW1wb3J0IHsgSVNlcXVlbmNlVHJlZSB9IGZyb20gXCIuL3NlcXVlbmNlc1wiO1xyXG5pbXBvcnQgeyBJU3RhdGUsIFN0YXRlcywgcmVzb2x2ZVN0YXRlLCBIb3Jpem9udGFsRGlyZWN0aW9uLCBDaGFzZVN0YXRlLCBCYWxsU3RhdGUsIEZyYW1lUmVzdWx0LCBQZXRJbnN0YW5jZVN0YXRlLCBpc1N0YXRlQWJvdmVHcm91bmQgfSBmcm9tIFwiLi9zdGF0ZXNcIjtcclxuaW1wb3J0IHsgQ0FUX05BTUVTLCBET0dfTkFNRVMsIENSQUJfTkFNRVMsIFNOQUtFX05BTUVTLCBDTElQUFlfTkFNRVMsIFRPVE9ST19OQU1FUywgRFVDS19OQU1FUyB9IGZyb20gXCIuLi9jb21tb24vbmFtZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnZhbGlkU3RhdGVFeGNlcHRpb24ge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBldEVsZW1lbnQge1xyXG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBjb2xsaXNpb246IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcGV0OiBJUGV0VHlwZTtcclxuICAgIGNvbG9yOiBQZXRDb2xvcjtcclxuICAgIHR5cGU6IFBldFR5cGU7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihlbDogSFRNTEltYWdlRWxlbWVudCwgY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudCwgcGV0OiBJUGV0VHlwZSwgY29sb3I6IFBldENvbG9yLCB0eXBlOiBQZXRUeXBlKXtcclxuICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgICB0aGlzLmNvbGxpc2lvbiA9IGNvbGxpc2lvbjtcclxuICAgICAgdGhpcy5wZXQgPSBwZXQ7XHJcbiAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxuICB9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQZXRDb2xsZWN0aW9uIHtcclxuICAgIHBldHMoKTogQXJyYXk8UGV0RWxlbWVudD47XHJcbiAgICBwdXNoKHBldDogUGV0RWxlbWVudCk6IHZvaWQ7XHJcbiAgICByZXNldCgpOiB2b2lkO1xyXG4gICAgc2Vla05ld0ZyaWVuZHMoKTogc3RyaW5nW107XHJcbiAgICBsb2NhdGUobmFtZTogc3RyaW5nKTogUGV0RWxlbWVudCB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBldENvbGxlY3Rpb24gaW1wbGVtZW50cyBJUGV0Q29sbGVjdGlvbiB7XHJcbiAgICBfcGV0czogQXJyYXk8UGV0RWxlbWVudD47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9wZXRzID0gbmV3IEFycmF5KDApO1xyXG4gICAgfVxyXG5cclxuICAgIHBldHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BldHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaChwZXQ6IFBldEVsZW1lbnQpe1xyXG4gICAgICAgIHRoaXMuX3BldHMucHVzaChwZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5fcGV0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGxvY2F0ZShuYW1lOiBzdHJpbmcpOiBQZXRFbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGV0cy5maW5kKChjb2xsZWN0aW9uLCB2YWx1ZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uLnBldC5uYW1lKCkgPT09IG5hbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2Vla05ld0ZyaWVuZHMoKSA6IHN0cmluZ1tdIHsgXHJcbiAgICAgICAgaWYgKHRoaXMuX3BldHMubGVuZ3RoIDw9IDEpXHJcbiAgICAgICAgICAgIHtyZXR1cm4gW107fSAvLyBZb3UgY2FuJ3QgYmUgZnJpZW5kcyB3aXRoIHlvdXJzZWxmLlxyXG4gICAgICAgIHZhciBtZXNzYWdlcyA9IG5ldyBBcnJheTxzdHJpbmc+KDApO1xyXG4gICAgICAgIHRoaXMuX3BldHMuZm9yRWFjaChwZXRJbkNvbGxlY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAocGV0SW5Db2xsZWN0aW9uLnBldC5oYXNGcmllbmQoKSlcclxuICAgICAgICAgICAgICAgIHtyZXR1cm47fSAvLyBJIGFscmVhZHkgaGF2ZSBhIGZyaWVuZCFcclxuICAgICAgICAgICAgdGhpcy5fcGV0cy5mb3JFYWNoKHBvdGVudGlhbEZyaWVuZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG90ZW50aWFsRnJpZW5kLnBldC5oYXNGcmllbmQoKSlcclxuICAgICAgICAgICAgICAgICAgICB7cmV0dXJuO30gLy8gQWxyZWFkeSBoYXMgYSBmcmllbmQuIHNvcnJ5LlxyXG4gICAgICAgICAgICAgICAgaWYgKCFwb3RlbnRpYWxGcmllbmQucGV0LmNhbkNoYXNlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAge3JldHVybjt9IC8vIFBldCBpcyBidXN5IGRvaW5nIHNvbWV0aGluZyBlbHNlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHBvdGVudGlhbEZyaWVuZC5wZXQubGVmdCgpID4gcGV0SW5Db2xsZWN0aW9uLnBldC5sZWZ0KCkgJiZcclxuICAgICAgICAgICAgICAgICAgICBwb3RlbnRpYWxGcmllbmQucGV0LmxlZnQoKSA8IHBldEluQ29sbGVjdGlvbi5wZXQubGVmdCgpICsgcGV0SW5Db2xsZWN0aW9uLnBldC53aWR0aCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBwb3NzaWJsZSBuZXcgZnJpZW5kLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGV0SW5Db2xsZWN0aW9uLnBldC5uYW1lKCksIFwiIHdhbnRzIHRvIGJlIGZyaWVuZHMgd2l0aCBcIiwgcG90ZW50aWFsRnJpZW5kLnBldC5uYW1lKCksIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBldEluQ29sbGVjdGlvbi5wZXQubWFrZUZyaWVuZHNXaXRoKHBvdGVudGlhbEZyaWVuZC5wZXQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGAke3BldEluQ29sbGVjdGlvbi5wZXQubmFtZSgpfSAoJHtwZXRJbkNvbGxlY3Rpb24ucGV0LmVtb2ppKCl9KTogSSdtIG5vdyBmcmllbmRzIOKdpO+4jyB3aXRoICR7cG90ZW50aWFsRnJpZW5kLnBldC5uYW1lKCl9ICgke3BvdGVudGlhbEZyaWVuZC5wZXQuZW1vamkoKX0pYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGV0VHlwZSB7XHJcbiAgICBuZXh0RnJhbWUoKTogdm9pZFxyXG5cclxuICAgIC8vIFNwZWNpYWwgbWV0aG9kcyBmb3IgYWN0aW9uc1xyXG4gICAgY2FuU3dpcGUoKTogYm9vbGVhblxyXG4gICAgY2FuQ2hhc2UoKTogYm9vbGVhblxyXG4gICAgc3dpcGUoKTogdm9pZFxyXG4gICAgY2hhc2UoYmFsbFN0YXRlOiBCYWxsU3RhdGUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkXHJcbiAgICBzcGVlZCgpOiBudW1iZXJcclxuXHJcbiAgICAvLyBTdGF0ZSBBUElcclxuICAgIGdldFN0YXRlKCk6IFBldEluc3RhbmNlU3RhdGVcclxuICAgIHJlY292ZXJTdGF0ZShzdGF0ZTogUGV0SW5zdGFuY2VTdGF0ZSk6IHZvaWRcclxuICAgIHJlY292ZXJGcmllbmQoZnJpZW5kOiBJUGV0VHlwZSk6IHZvaWRcclxuXHJcbiAgICAvLyBQb3NpdGlvbmluZ1xyXG4gICAgYm90dG9tKCk6IG51bWJlcjtcclxuICAgIGxlZnQoKTogbnVtYmVyO1xyXG4gICAgcG9zaXRpb25Cb3R0b20oYm90dG9tOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgcG9zaXRpb25MZWZ0KGxlZnQ6IG51bWJlcik6IHZvaWQ7XHJcbiAgICB3aWR0aCgpOiBudW1iZXI7XHJcbiAgICBmbG9vcigpOiBudW1iZXI7XHJcblxyXG4gICAgLy8gRnJpZW5kcyBBUElcclxuICAgIG5hbWUoKTogc3RyaW5nO1xyXG4gICAgZW1vamkoKTogc3RyaW5nO1xyXG4gICAgaGFzRnJpZW5kKCk6IGJvb2xlYW47XHJcbiAgICBmcmllbmQoKTogSVBldFR5cGU7XHJcbiAgICBtYWtlRnJpZW5kc1dpdGgoZnJpZW5kOiBJUGV0VHlwZSk6IGJvb2xlYW47XHJcbiAgICBpc1BsYXlpbmcoKTogYm9vbGVhbjtcclxufSBcclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVNwcml0ZVdpZHRoKHNpemU6IFBldFNpemUpOiBudW1iZXJ7XHJcbiAgICBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5uYW5vKXtcclxuICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLm1lZGl1bSl7XHJcbiAgICAgIHJldHVybiA1NTtcclxuICAgIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5sYXJnZSl7XHJcbiAgICAgIHJldHVybiAxMTA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gMzA7IC8vIFNocnVnXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZVBldFR5cGUgaW1wbGVtZW50cyBJUGV0VHlwZSB7XHJcbiAgICBsYWJlbDogc3RyaW5nID0gXCJiYXNlXCI7XHJcbiAgICBzZXF1ZW5jZTogSVNlcXVlbmNlVHJlZSA9IHsgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsIHNlcXVlbmNlU3RhdGVzOiBbXX07XHJcbiAgICBjdXJyZW50U3RhdGU6IElTdGF0ZTtcclxuICAgIGN1cnJlbnRTdGF0ZUVudW06IFN0YXRlcztcclxuICAgIGhvbGRTdGF0ZTogSVN0YXRlIHwgdW5kZWZpbmVkO1xyXG4gICAgaG9sZFN0YXRlRW51bTogU3RhdGVzIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBlbDogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHByaXZhdGUgY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgX2xlZnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2JvdHRvbTogbnVtYmVyO1xyXG4gICAgcGV0Um9vdDogc3RyaW5nO1xyXG4gICAgX2Zsb29yOiBudW1iZXI7XHJcbiAgICBfZnJpZW5kOiBJUGV0VHlwZSB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NwZWVkOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgY29sbGlzaW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQsIHNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHBldFJvb3Q6IHN0cmluZywgZmxvb3I6IG51bWJlciwgbmFtZTogc3RyaW5nLCBzcGVlZDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmVsID0gc3ByaXRlRWxlbWVudDtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGNvbGxpc2lvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5wZXRSb290ID0gcGV0Um9vdDtcclxuICAgICAgICB0aGlzLl9mbG9vciA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMuX2xlZnQgPSBsZWZ0O1xyXG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcclxuICAgICAgICB0aGlzLmluaXRTcHJpdGUoc2l6ZSwgbGVmdCwgYm90dG9tKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSB0aGlzLnNlcXVlbmNlLnN0YXJ0aW5nU3RhdGU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0U3ByaXRlKHBldFNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke2JvdHRvbX1weGA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5tYXhXaWR0aCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLm1heEhlaWdodCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1weGA7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuYm90dG9tID0gYCR7Ym90dG9tfXB4YDtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS53aWR0aCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS5oZWlnaHQgPSBgJHtjYWxjdWxhdGVTcHJpdGVXaWR0aChwZXRTaXplKX1weGA7XHJcbiAgICAgIH1cclxuXHJcbiAgICBsZWZ0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgYm90dG9tKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdHRvbTtcclxuICAgIH1cclxuXHJcbiAgICBwb3NpdGlvbkJvdHRvbShib3R0b206IG51bWJlcik6IHZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9ib3R0b20gPSBib3R0b207XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLl9ib3R0b219cHhgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUuYm90dG9tID0gYCR7dGhpcy5fYm90dG9tfXB4YDtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5fbGVmdH1weGA7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuYm90dG9tID0gYCR7dGhpcy5fYm90dG9tfXB4YDtcclxuICAgIH07XHJcblxyXG4gICAgcG9zaXRpb25MZWZ0KGxlZnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xlZnQgPSBsZWZ0O1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3RoaXMuX2xlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3RoaXMuX2xlZnR9cHhgO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uLnN0eWxlLmxlZnQgPSBgJHt0aGlzLl9sZWZ0fXB4YDtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLl9ib3R0b219cHhgO1xyXG4gICAgfVxyXG5cclxuICAgIHdpZHRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZmxvb3IoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmxvb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RhdGUoKTogUGV0SW5zdGFuY2VTdGF0ZSB7IFxyXG4gICAgICAgIHJldHVybiB7Y3VycmVudFN0YXRlRW51bTogdGhpcy5jdXJyZW50U3RhdGVFbnVtfTtcclxuICAgIH1cclxuXHJcbiAgICBzcGVlZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcclxuICAgIH1cclxuXHJcbiAgICByZWNvdmVyRnJpZW5kKGZyaWVuZDogSVBldFR5cGUpe1xyXG4gICAgICAgIC8vIFJlY292ZXIgZnJpZW5kcy4uXHJcbiAgICAgICAgdGhpcy5fZnJpZW5kID0gZnJpZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHJlY292ZXJTdGF0ZShzdGF0ZTogUGV0SW5zdGFuY2VTdGF0ZSl7XHJcbiAgICAgICAgLy8gVE9ETyA6IFJlc29sdmUgYSBidWcgd2hlcmUgaWYgaXQgd2FzIHN3aXBpbmcgYmVmb3JlLCBpdCB3b3VsZCBmYWlsXHJcbiAgICAgICAgLy8gYmVjYXVzZSBob2xkU3RhdGUgaXMgbm8gbG9uZ2VyIHZhbGlkLlxyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHN0YXRlLmN1cnJlbnRTdGF0ZUVudW0hO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGlmICghaXNTdGF0ZUFib3ZlR3JvdW5kKHRoaXMuY3VycmVudFN0YXRlRW51bSkpe1xyXG4gICAgICAgICAgICAvLyBSZXNldCB0aGUgYm90dG9tIG9mIHRoZSBzcHJpdGUgdG8gdGhlIGZsb29yIGFzIHRoZSB0aGVtZVxyXG4gICAgICAgICAgICAvLyBoYXMgbGlrZWx5IGNoYW5nZWQuXHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25Cb3R0b20odGhpcy5mbG9vcigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FuU3dpcGUoKXtcclxuICAgICAgICByZXR1cm4gIWlzU3RhdGVBYm92ZUdyb3VuZCh0aGlzLmN1cnJlbnRTdGF0ZUVudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkNoYXNlKCl7XHJcbiAgICAgICAgcmV0dXJuICFpc1N0YXRlQWJvdmVHcm91bmQodGhpcy5jdXJyZW50U3RhdGVFbnVtKSAmJiB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gIT09IFN0YXRlcy5jaGFzZTtcclxuICAgIH1cclxuXHJcbiAgICBzd2lwZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuc3dpcGUpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5ob2xkU3RhdGUgPSB0aGlzLmN1cnJlbnRTdGF0ZTtcclxuICAgICAgICB0aGlzLmhvbGRTdGF0ZUVudW0gPSB0aGlzLmN1cnJlbnRTdGF0ZUVudW07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gU3RhdGVzLnN3aXBlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNoYXNlKGJhbGxTdGF0ZTogQmFsbFN0YXRlLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gU3RhdGVzLmNoYXNlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gbmV3IENoYXNlU3RhdGUodGhpcywgYmFsbFN0YXRlLCBjYW52YXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZhY2VMZWZ0KCkge1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZVgoLTEpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZmFjZVJpZ2h0KCkge1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZVgoMSlcIjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBbmltYXRpb24oZmFjZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgbmV3RmFjZTogc3RyaW5nID0gYCR7dGhpcy5wZXRSb290fV8ke2ZhY2V9XzhmcHMuZ2lmYDtcclxuICAgICAgICBpZiAodGhpcy5lbC5zcmMgPT09IG5ld0ZhY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsLnNyYyA9IG5ld0ZhY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2hvb3NlTmV4dFN0YXRlKGZyb21TdGF0ZTogU3RhdGVzKTogU3RhdGVzIHtcclxuICAgICAgICAvLyBXb3JrIG91dCBuZXh0IHN0YXRlXHJcbiAgICAgICAgdmFyIHBvc3NpYmxlTmV4dFN0YXRlczogU3RhdGVzW10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgdGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlc1tpXS5zdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXMgPSB0aGlzLnNlcXVlbmNlLnNlcXVlbmNlU3RhdGVzW2ldLnBvc3NpYmxlTmV4dFN0YXRlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXBvc3NpYmxlTmV4dFN0YXRlcyl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkU3RhdGVFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmFuZG9tbHkgY2hvb3NlIHRoZSBuZXh0IHN0YXRlXHJcbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGVOZXh0U3RhdGVzLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlTmV4dFN0YXRlc1tpZHhdO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjZUxlZnQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFN0YXRlLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5mYWNlUmlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24odGhpcy5jdXJyZW50U3RhdGUuc3ByaXRlTGFiZWwpO1xyXG5cclxuICAgICAgICAvLyBXaGF0J3MgbXkgYnVkZHkgZG9pbmc/XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRnJpZW5kKCkgJiYgdGhpcy5jdXJyZW50U3RhdGVFbnVtICE9PSBTdGF0ZXMuY2hhc2VGcmllbmQpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmllbmQoKS5pc1BsYXlpbmcoKSAmJiAhaXNTdGF0ZUFib3ZlR3JvdW5kKHRoaXMuY3VycmVudFN0YXRlRW51bSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKFN0YXRlcy5jaGFzZUZyaWVuZCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBTdGF0ZXMuY2hhc2VGcmllbmQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBmcmFtZVJlc3VsdCA9IHRoaXMuY3VycmVudFN0YXRlLm5leHRGcmFtZSgpO1xyXG4gICAgICAgIGlmIChmcmFtZVJlc3VsdCA9PT0gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIElmIHJlY292ZXJpbmcgZnJvbSBzd2lwZS4uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRTdGF0ZSAmJiB0aGlzLmhvbGRTdGF0ZUVudW0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmhvbGRTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHRoaXMuaG9sZFN0YXRlRW51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZFN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkU3RhdGVFbnVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5jaG9vc2VOZXh0U3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUobmV4dFN0YXRlLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gbmV4dFN0YXRlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZnJhbWVSZXN1bHQgPT09IEZyYW1lUmVzdWx0LnN0YXRlQ2FuY2VsKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmNoYXNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5jaG9vc2VOZXh0U3RhdGUoU3RhdGVzLmlkbGVXaXRoQmFsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZShuZXh0U3RhdGUsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gbmV4dFN0YXRlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmNoYXNlRnJpZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5jaG9vc2VOZXh0U3RhdGUoU3RhdGVzLmlkbGVXaXRoQmFsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZShuZXh0U3RhdGUsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gbmV4dFN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhc0ZyaWVuZCgpIDogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyaWVuZCAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGZyaWVuZCgpIDogSVBldFR5cGUgeyBcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnJpZW5kITtcclxuICAgIH1cclxuXHJcbiAgICBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZUZyaWVuZHNXaXRoKGZyaWVuZDogSVBldFR5cGUpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLl9mcmllbmQgPSBmcmllbmQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lKCksIFwiOiBJJ20gbm93IGZyaWVuZHMg4p2k77iPIHdpdGggXCIsIGZyaWVuZC5uYW1lKCkpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzUGxheWluZygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMucnVuUmlnaHQgfHwgdGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMucnVuTGVmdCA7XHJcbiAgICB9XHJcblxyXG4gICAgZW1vamkoKTogc3RyaW5nIHsgXHJcbiAgICAgICAgcmV0dXJuIFwi8J+QtlwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG90b3JvIGV4dGVuZHMgQmFzZVBldFR5cGUge1xyXG4gICAgbGFiZWwgPSBcInRvdG9yb1wiO1xyXG4gICAgc2VxdWVuY2UgPSB7XHJcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLmxpZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5saWUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMuc2l0SWRsZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMuY2xpbWJXYWxsTGVmdCwgU3RhdGVzLnNpdElkbGVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2xpbWJXYWxsTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxsSGFuZ0xlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2FsbEhhbmdMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmp1bXBEb3duTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5qdW1wRG93bkxlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMubGFuZF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5sYW5kLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5saWVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG4gICAgZW1vamkoKTogc3RyaW5nIHsgXHJcbiAgICAgICAgcmV0dXJuIFwi8J+QvlwiO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBDYXQgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwiY2F0XCI7XHJcbiAgICBzZXF1ZW5jZSA9IHtcclxuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnQsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5jbGltYldhbGxMZWZ0LCBTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2xpbWJXYWxsTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxsSGFuZ0xlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2FsbEhhbmdMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmp1bXBEb3duTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5qdW1wRG93bkxlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMubGFuZF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5sYW5kLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH07XHJcbiAgICBlbW9qaSgpOiBzdHJpbmcgeyBcclxuICAgICAgICByZXR1cm4gXCLwn5CxXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb2cgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwiZG9nXCI7XHJcbiAgICBzZXF1ZW5jZSA9IHtcclxuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHQsIFN0YXRlcy5saWVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMubGllLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5saWUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5saWUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH07XHJcbiAgICBlbW9qaSgpOiBzdHJpbmcgeyBcclxuICAgICAgICByZXR1cm4gXCLwn5C2XCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTbmFrZSBleHRlbmRzIEJhc2VQZXRUeXBlIHtcclxuICAgIGxhYmVsID0gXCJzbmFrZVwiO1xyXG4gICAgc2VxdWVuY2UgPSB7XHJcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH07XHJcbiAgICBlbW9qaSgpOiBzdHJpbmcgeyBcclxuICAgICAgICByZXR1cm4gXCLwn5CNXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGlwcHkgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwiY2xpcHB5XCI7XHJcbiAgICBzZXF1ZW5jZSA9IHtcclxuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG4gICAgZW1vamkoKTogc3RyaW5nIHsgXHJcbiAgICAgICAgcmV0dXJuIFwi8J+TjlwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUnViYmVyRHVjayBleHRlbmRzIEJhc2VQZXRUeXBlIHtcclxuICAgIGxhYmVsID0gXCJydWJiZXItZHVja1wiO1xyXG4gICAgc2VxdWVuY2UgPSB7XHJcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuICAgIGVtb2ppKCk6IHN0cmluZyB7IFxyXG4gICAgICAgIHJldHVybiBcIvCfkKVcIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENyYWIgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwiY3JhYlwiO1xyXG4gICAgc2VxdWVuY2UgPSB7XHJcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuICAgIGVtb2ppKCk6IHN0cmluZyB7IFxyXG4gICAgICAgIHJldHVybiBcIvCfpoBcIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEludmFsaWRQZXRFeGNlcHRpb24ge1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQZXROYW1lKGNvbGxlY3Rpb246IE1hcDxudW1iZXIsIHN0cmluZz4sIGxhYmVsOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpIDogc3RyaW5nIHtcclxuICAgIGlmIChjb2xsZWN0aW9uLmhhcyhjb3VudCkpe1xyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmdldChjb3VudCkhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbGFiZWwgKyBjb3VudDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBldChwZXRUeXBlOiBzdHJpbmcsIGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBjb2xsaXNpb246IEhUTUxEaXZFbGVtZW50LCBzaXplOiBQZXRTaXplLCBsZWZ0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBwZXRSb290OiBzdHJpbmcsIGZsb29yOiBudW1iZXIsIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCwgY291bnQ6IG51bWJlcikgOiBJUGV0VHlwZSB7XHJcbiAgICBpZiAocGV0VHlwZSA9PT0gXCJ0b3Rvcm9cIil7XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAge25hbWUgPSBnZXRQZXROYW1lKFRPVE9ST19OQU1FUywgUGV0VHlwZS50b3Rvcm8sIGNvdW50KTt9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUb3Rvcm8oZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vciwgbmFtZSwgUGV0U3BlZWQubm9ybWFsKTtcclxuICAgIH1cclxuICAgIGlmIChwZXRUeXBlID09PSBcImNhdFwiKXtcclxuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7bmFtZSA9IGdldFBldE5hbWUoQ0FUX05BTUVTLCBQZXRUeXBlLmNhdCwgY291bnQpO31cclxuICAgICAgICByZXR1cm4gbmV3IENhdChlbCwgY29sbGlzaW9uLCBzaXplLCBsZWZ0LCBib3R0b20sIHBldFJvb3QsIGZsb29yLCBuYW1lLCBQZXRTcGVlZC5ub3JtYWwpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJkb2dcIikge1xyXG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtuYW1lID0gZ2V0UGV0TmFtZShET0dfTkFNRVMsIFBldFR5cGUuZG9nLCBjb3VudCk7fVxyXG4gICAgICAgIHJldHVybiBuZXcgRG9nKGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IsIG5hbWUsIFBldFNwZWVkLm5vcm1hbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcInNuYWtlXCIpIHtcclxuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7bmFtZSA9IGdldFBldE5hbWUoU05BS0VfTkFNRVMsIFBldFR5cGUuc25ha2UsIGNvdW50KTt9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTbmFrZShlbCwgY29sbGlzaW9uLCBzaXplLCBsZWZ0LCBib3R0b20sIHBldFJvb3QsIGZsb29yLCBuYW1lLCBQZXRTcGVlZC52ZXJ5U2xvdyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcImNsaXBweVwiKSB7XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAge25hbWUgPSBnZXRQZXROYW1lKENMSVBQWV9OQU1FUywgUGV0VHlwZS5jbGlwcHksIGNvdW50KTt9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDbGlwcHkoZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vciwgbmFtZSwgUGV0U3BlZWQuc2xvdyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcImNyYWJcIikge1xyXG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtuYW1lID0gZ2V0UGV0TmFtZShDUkFCX05BTUVTLCBQZXRUeXBlLmNyYWIsIGNvdW50KTt9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDcmFiKGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IsIG5hbWUsIFBldFNwZWVkLnNsb3cpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJydWJiZXItZHVja1wiKSB7XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAge25hbWUgPSBnZXRQZXROYW1lKERVQ0tfTkFNRVMsIFBldFR5cGUucnViYmVyZHVjaywgY291bnQpO31cclxuICAgICAgICByZXR1cm4gbmV3IFJ1YmJlckR1Y2soZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vciwgbmFtZSwgUGV0U3BlZWQuZmFzdCk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgSW52YWxpZFBldEV4Y2VwdGlvbigpO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBQZXRDb2xvciwgUGV0VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdHlwZXNcIjtcclxuaW1wb3J0IHsgSVBldFR5cGUgfSBmcm9tIFwiLi9wZXRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGV0SW5zdGFuY2VTdGF0ZSB7XHJcbiAgICBjdXJyZW50U3RhdGVFbnVtOiBTdGF0ZXMgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQZXRFbGVtZW50U3RhdGUge1xyXG4gICAgcGV0U3RhdGU6IFBldEluc3RhbmNlU3RhdGUgfCB1bmRlZmluZWQ7XHJcbiAgICBwZXRUeXBlOiBQZXRUeXBlIHwgdW5kZWZpbmVkO1xyXG4gICAgcGV0Q29sb3I6IFBldENvbG9yIHwgdW5kZWZpbmVkO1xyXG4gICAgZWxMZWZ0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBlbEJvdHRvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgcGV0TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgcGV0RnJpZW5kOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQZXRQYW5lbFN0YXRlIHtcclxuICAgIHBldFN0YXRlczogQXJyYXk8UGV0RWxlbWVudFN0YXRlPiB8IHVuZGVmaW5lZDtcclxuICAgIHBldENvdW50ZXI6IG51bWJlciB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBlbnVtIEhvcml6b250YWxEaXJlY3Rpb24ge1xyXG4gICAgbGVmdCxcclxuICAgIHJpZ2h0LFxyXG4gICAgbmF0dXJhbCAvLyBObyBjaGFuZ2UgdG8gY3VycmVudCBkaXJlY3Rpb25cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGVudW0gU3RhdGVzIHtcclxuICAgIHNpdElkbGUgPSBcInNpdC1pZGxlXCIsXHJcbiAgICB3YWxrUmlnaHQgPSBcIndhbGstcmlnaHRcIixcclxuICAgIHdhbGtMZWZ0ID0gXCJ3YWxrLWxlZnRcIixcclxuICAgIHJ1blJpZ2h0ID0gXCJydW4tcmlnaHRcIixcclxuICAgIHJ1bkxlZnQgPSBcInJ1bi1sZWZ0XCIsXHJcbiAgICBsaWUgPSBcImxpZVwiLFxyXG4gICAgd2FsbEhhbmdMZWZ0ID0gXCJ3YWxsLWhhbmctbGVmdFwiLFxyXG4gICAgY2xpbWJXYWxsTGVmdCA9IFwiY2xpbWItd2FsbC1sZWZ0XCIsXHJcbiAgICBqdW1wRG93bkxlZnQgPSBcImp1bXAtZG93bi1sZWZ0XCIsXHJcbiAgICBsYW5kID0gXCJsYW5kXCIsXHJcbiAgICBzd2lwZSA9IFwic3dpcGVcIixcclxuICAgIGlkbGVXaXRoQmFsbCA9IFwiaWRsZS13aXRoLWJhbGxcIixcclxuICAgIGNoYXNlID0gXCJjaGFzZVwiLFxyXG4gICAgY2hhc2VGcmllbmQgPSBcImNoYXNlLWZyaWVuZFwiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZyYW1lUmVzdWx0IHsgXHJcbiAgICBzdGF0ZUNvbnRpbnVlLFxyXG4gICAgc3RhdGVDb21wbGV0ZSxcclxuICAgIC8vIFNwZWNpYWwgc3RhdGVzXHJcbiAgICBzdGF0ZUNhbmNlbFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFsbFN0YXRlIHtcclxuICAgIGN4OiBudW1iZXI7XHJcbiAgICBjeTogbnVtYmVyO1xyXG4gICAgdng6IG51bWJlcjtcclxuICAgIHZ5OiBudW1iZXI7XHJcbiAgICBwYXVzZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoY3g6IG51bWJlciwgY3k6IG51bWJlciwgdng6IG51bWJlciwgdnk6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jeCA9IGN4O1xyXG4gICAgICAgIHRoaXMuY3kgPSBjeTtcclxuICAgICAgICB0aGlzLnZ4ID0gdng7XHJcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xyXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N0YXRlQWJvdmVHcm91bmQoc3RhdGU6IFN0YXRlcyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChzdGF0ZSA9PT0gU3RhdGVzLmNsaW1iV2FsbExlZnQgfHxcclxuICAgICAgICAgICAgc3RhdGUgPT09IFN0YXRlcy5qdW1wRG93bkxlZnQgfHwgXHJcbiAgICAgICAgICAgIHN0YXRlID09PSBTdGF0ZXMubGFuZCB8fFxyXG4gICAgICAgICAgICBzdGF0ZSA9PT0gU3RhdGVzLndhbGxIYW5nTGVmdCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlU3RhdGUoc3RhdGU6IHN0cmluZywgcGV0OiBJUGV0VHlwZSk6IElTdGF0ZSB7XHJcbiAgICBzd2l0Y2goc3RhdGUpe1xyXG4gICAgICAgIGNhc2UgU3RhdGVzLnNpdElkbGU6IHJldHVybiBuZXcgU2l0SWRsZVN0YXRlKHBldCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa1JpZ2h0OiByZXR1cm4gbmV3IFdhbGtSaWdodFN0YXRlKHBldCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa0xlZnQ6IHJldHVybiBuZXcgV2Fsa0xlZnRTdGF0ZShwZXQpO1xyXG4gICAgICAgIGNhc2UgU3RhdGVzLnJ1blJpZ2h0OiByZXR1cm4gbmV3IFJ1blJpZ2h0U3RhdGUocGV0KTtcclxuICAgICAgICBjYXNlIFN0YXRlcy5ydW5MZWZ0OiByZXR1cm4gbmV3IFJ1bkxlZnRTdGF0ZShwZXQpO1xyXG4gICAgICAgIGNhc2UgU3RhdGVzLmxpZTogcmV0dXJuIG5ldyBMaWVTdGF0ZShwZXQpO1xyXG4gICAgICAgIGNhc2UgU3RhdGVzLndhbGxIYW5nTGVmdDogcmV0dXJuIG5ldyBXYWxsSGFuZ0xlZnRTdGF0ZShwZXQpO1xyXG4gICAgICAgIGNhc2UgU3RhdGVzLmNsaW1iV2FsbExlZnQ6IHJldHVybiBuZXcgQ2xpbWJXYWxsTGVmdFN0YXRlKHBldCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuanVtcERvd25MZWZ0OiByZXR1cm4gbmV3IEp1bXBEb3duTGVmdFN0YXRlKHBldCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMubGFuZDogcmV0dXJuIG5ldyBMYW5kU3RhdGUocGV0KTtcclxuICAgICAgICBjYXNlIFN0YXRlcy5zd2lwZTogcmV0dXJuIG5ldyBTd2lwZVN0YXRlKHBldCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuaWRsZVdpdGhCYWxsOiByZXR1cm4gbmV3IElkbGVXaXRoQmFsbFN0YXRlKHBldCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuY2hhc2VGcmllbmQ6IHJldHVybiBuZXcgQ2hhc2VGcmllbmRTdGF0ZShwZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBTaXRJZGxlU3RhdGUocGV0KTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xyXG4gICAgbGFiZWw6IHN0cmluZ1xyXG4gICAgc3ByaXRlTGFiZWw6IHN0cmluZ1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbjogSG9yaXpvbnRhbERpcmVjdGlvblxyXG4gICAgcGV0OiBJUGV0VHlwZTtcclxuICAgIG5leHRGcmFtZSgpOiBGcmFtZVJlc3VsdFxyXG59XHJcblxyXG5jbGFzcyBBYnN0cmFjdFN0YXRpY1N0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLnNpdElkbGU7XHJcbiAgICBpZGxlQ291bnRlcjogbnVtYmVyO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcImlkbGVcIjtcclxuICAgIGhvbGRUaW1lID0gNTA7XHJcbiAgICBwZXQ6IElQZXRUeXBlO1xyXG4gICAgXHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBldDogSVBldFR5cGUpIHtcclxuICAgICAgICB0aGlzLmlkbGVDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLnBldCA9IHBldDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcclxuICAgICAgICB0aGlzLmlkbGVDb3VudGVyKys7XHJcbiAgICAgICAgaWYgKHRoaXMuaWRsZUNvdW50ZXIgPiB0aGlzLmhvbGRUaW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpdElkbGVTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMuc2l0SWRsZTtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJpZGxlXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcclxuICAgIGhvbGRUaW1lID0gNTA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaWVTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMubGllO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcImxpZVwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XHJcbiAgICBob2xkVGltZSA9IDUwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2FsbEhhbmdMZWZ0U3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLndhbGxIYW5nTGVmdDtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxsZ3JhYlwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuICAgIGhvbGRUaW1lID0gNTA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMYW5kU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLmxhbmQ7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwibGFuZFwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuICAgIGhvbGRUaW1lID0gMTA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTd2lwZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5zd2lwZTtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJzd2lwZVwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubmF0dXJhbDtcclxuICAgIGhvbGRUaW1lID0gMzA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJZGxlV2l0aEJhbGxTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMuaWRsZVdpdGhCYWxsO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcIndpdGhfYmFsbFwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuICAgIGhvbGRUaW1lID0gMzA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxrUmlnaHRTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy53YWxrUmlnaHQ7XHJcbiAgICBwZXQ6IElQZXRUeXBlO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xyXG4gICAgbGVmdEJvdW5kYXJ5OiBudW1iZXI7XHJcbiAgICBzcGVlZE11bHRpcGxpZXIgPSAxO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBldDogSVBldFR5cGUpIHtcclxuICAgICAgICB0aGlzLmxlZnRCb3VuZGFyeSA9IE1hdGguZmxvb3Iod2luZG93LmlubmVyV2lkdGggKiAwLjk1KTtcclxuICAgICAgICB0aGlzLnBldCA9IHBldDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcclxuICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkxlZnQodGhpcy5wZXQubGVmdCgpICsgdGhpcy5wZXQuc3BlZWQoKSAqIHRoaXMuc3BlZWRNdWx0aXBsaWVyKTtcclxuICAgICAgICBpZiAodGhpcy5wZXQubGVmdCgpID49IHRoaXMubGVmdEJvdW5kYXJ5IC0gdGhpcy5wZXQud2lkdGgoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxrTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLndhbGtMZWZ0O1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XHJcbiAgICBwZXQ6IElQZXRUeXBlO1xyXG4gICAgc3BlZWRNdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5wZXQgPSBwZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XHJcbiAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSAtIHRoaXMucGV0LnNwZWVkKCkgKiB0aGlzLnNwZWVkTXVsdGlwbGllcik7XHJcbiAgICAgICAgaWYgKHRoaXMucGV0LmxlZnQoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJ1blJpZ2h0U3RhdGUgZXh0ZW5kcyBXYWxrUmlnaHRTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5ydW5SaWdodDtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcclxuICAgIHNwZWVkTXVsdGlwbGllciA9IDEuNjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJ1bkxlZnRTdGF0ZSBleHRlbmRzIFdhbGtMZWZ0U3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMucnVuTGVmdDtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcclxuICAgIHNwZWVkTXVsdGlwbGllciA9IDEuNjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYXNlU3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMuY2hhc2U7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwicnVuXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xyXG4gICAgYmFsbFN0YXRlOiBCYWxsU3RhdGU7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgcGV0OiBJUGV0VHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlLCBiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBldCA9IHBldDtcclxuICAgICAgICB0aGlzLmJhbGxTdGF0ZSA9IGJhbGxTdGF0ZTtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIH1cclxuXHJcbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcclxuICAgICAgICBpZiAodGhpcy5iYWxsU3RhdGUucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNhbmNlbDsgLy8gQmFsbCBpcyBhbHJlYWR5IGNhdWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wZXQubGVmdCgpID4gdGhpcy5iYWxsU3RhdGUuY3gpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xyXG4gICAgICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkxlZnQodGhpcy5wZXQubGVmdCgpIC0gdGhpcy5wZXQuc3BlZWQoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcclxuICAgICAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSArIHRoaXMucGV0LnNwZWVkKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuYmFsbFN0YXRlLmN5IDwgKHRoaXMucGV0LndpZHRoKCkgKyB0aGlzLnBldC5mbG9vcigpKSAmJlxyXG4gICAgICAgICAgICB0aGlzLmJhbGxTdGF0ZS5jeCA8IHRoaXMucGV0LmxlZnQoKSAmJlxyXG4gICAgICAgICAgICB0aGlzLnBldC5sZWZ0KCkgPCB0aGlzLmJhbGxTdGF0ZS5jeCArIDE1KSB7XHJcbiAgICAgICAgICAgIC8vIGhpZGUgYmFsbFxyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsbFN0YXRlLnBhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYXNlRnJpZW5kU3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMuY2hhc2VGcmllbmQ7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwicnVuXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xyXG4gICAgcGV0OiBJUGV0VHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5wZXQgPSBwZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBldC5mcmllbmQoKS5pc1BsYXlpbmcoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDYW5jZWw7IC8vIEZyaWVuZCBpcyBubyBsb25nZXIgcGxheWluZy5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGV0LmxlZnQoKSA+IHRoaXMucGV0LmZyaWVuZCgpLmxlZnQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XHJcbiAgICAgICAgICAgIHRoaXMucGV0LnBvc2l0aW9uTGVmdCh0aGlzLnBldC5sZWZ0KCkgLSB0aGlzLnBldC5zcGVlZCgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkxlZnQodGhpcy5wZXQubGVmdCgpICsgdGhpcy5wZXQuc3BlZWQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENsaW1iV2FsbExlZnRTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5jbGltYldhbGxMZWZ0O1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGxjbGltYlwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuICAgIHBldDogSVBldFR5cGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSkge1xyXG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xyXG4gICAgICAgIHRoaXMucGV0LnBvc2l0aW9uQm90dG9tKHRoaXMucGV0LmJvdHRvbSgpICsgMSk7XHJcbiAgICAgICAgaWYgKHRoaXMucGV0LmJvdHRvbSgpID49IDEwMCkge1xyXG4gICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSnVtcERvd25MZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMuanVtcERvd25MZWZ0O1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcImZhbGxfZnJvbV9ncmFiXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcclxuICAgIHBldDogSVBldFR5cGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSkge1xyXG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xyXG4gICAgICAgIHRoaXMucGV0LnBvc2l0aW9uQm90dG9tKHRoaXMucGV0LmJvdHRvbSgpIC0gNSk7XHJcbiAgICAgICAgaWYgKHRoaXMucGV0LmJvdHRvbSgpIDw9IHRoaXMucGV0LmZsb29yKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wZXQucG9zaXRpb25Cb3R0b20odGhpcy5wZXQuZmxvb3IoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xyXG4gICAgICAgIH0gICBcclxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gVGhpcyBzY3JpcHQgd2lsbCBiZSBydW4gd2l0aGluIHRoZSB3ZWJ2aWV3IGl0c2VsZlxyXG5pbXBvcnQgeyBQZXRTaXplLCBQZXRDb2xvciwgUGV0VHlwZSwgVGhlbWUsIENvbG9yVGhlbWVLaW5kLCBXZWJ2aWV3TWVzc2FnZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XHJcbmltcG9ydCB7IGNyZWF0ZVBldCwgSVBldFR5cGUsIEludmFsaWRQZXRFeGNlcHRpb24sIFBldENvbGxlY3Rpb24sIFBldEVsZW1lbnQsIElQZXRDb2xsZWN0aW9uIH0gZnJvbSAnLi9wZXRzJztcclxuaW1wb3J0IHsgQmFsbFN0YXRlLCBDaGFzZUZyaWVuZFN0YXRlLCBQZXRFbGVtZW50U3RhdGUsIFBldEluc3RhbmNlU3RhdGUsIFBldFBhbmVsU3RhdGUsIFN0YXRlcyB9IGZyb20gJy4vc3RhdGVzJztcclxuXHJcbi8qIFRoaXMgaXMgaG93IHRoZSBWUyBDb2RlIEFQSSBjYW4gYmUgaW52b2tlZCBmcm9tIHRoZSBwYW5lbCAqL1xyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgaW50ZXJmYWNlIFZzY29kZVN0YXRlQXBpIHsgXHJcbiAgICBnZXRTdGF0ZSgpIDogUGV0UGFuZWxTdGF0ZTsgLy8gQVBJIGlzIGFjdHVhbGx5IEFueSwgYnV0IHdlIHdhbnQgaXQgdG8gYmUgdHlwZWQuXHJcbiAgICBzZXRTdGF0ZShzdGF0ZTogUGV0UGFuZWxTdGF0ZSk6IHZvaWQ7XHJcbiAgICBwb3N0TWVzc2FnZShtZXNzYWdlOiBXZWJ2aWV3TWVzc2FnZSk6IHZvaWQ7XHJcbiAgfVxyXG4gIGludGVyZmFjZSBXaW5kb3cge1xyXG4gICAgYWNxdWlyZVZzQ29kZUFwaSgpOiBWc2NvZGVTdGF0ZUFwaTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHZzY29kZSA9IHdpbmRvdy5hY3F1aXJlVnNDb2RlQXBpKCk7XHJcblxyXG52YXIgYWxsUGV0czogSVBldENvbGxlY3Rpb24gPSBuZXcgUGV0Q29sbGVjdGlvbigpO1xyXG52YXIgcGV0Q291bnRlcjogbnVtYmVyO1xyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlQmFsbFJhZGl1cyhzaXplOiBQZXRTaXplKTogbnVtYmVye1xyXG4gIGlmIChzaXplID09PSBQZXRTaXplLm5hbm8pe1xyXG4gICAgcmV0dXJuIDI7XHJcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLm1lZGl1bSl7XHJcbiAgICByZXR1cm4gNDtcclxuICB9IGVsc2UgaWYgKHNpemUgPT09IFBldFNpemUubGFyZ2Upe1xyXG4gICAgcmV0dXJuIDg7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAxOyAvLyBTaHJ1Z1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlRmxvb3Ioc2l6ZTogUGV0U2l6ZSwgdGhlbWU6IFRoZW1lKTogbnVtYmVyIHtcclxuICBzd2l0Y2ggKHRoZW1lKXtcclxuICAgIGNhc2UgVGhlbWUuZm9yZXN0OlxyXG4gICAgICBzd2l0Y2ggKHNpemUpe1xyXG4gICAgICAgIGNhc2UgUGV0U2l6ZS5tZWRpdW06XHJcbiAgICAgICAgICByZXR1cm4gNDA7XHJcbiAgICAgICAgY2FzZSBQZXRTaXplLmxhcmdlOlxyXG4gICAgICAgICAgcmV0dXJuIDY1O1xyXG4gICAgICAgIGNhc2UgUGV0U2l6ZS5uYW5vOlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm4gMjM7XHJcbiAgICAgIH1cclxuICAgIGNhc2UgVGhlbWUuY2FzdGxlOlxyXG4gICAgICBzd2l0Y2ggKHNpemUpe1xyXG4gICAgICAgIGNhc2UgUGV0U2l6ZS5tZWRpdW06XHJcbiAgICAgICAgICByZXR1cm4gODA7XHJcbiAgICAgICAgY2FzZSBQZXRTaXplLmxhcmdlOlxyXG4gICAgICAgICAgcmV0dXJuIDEyMDtcclxuICAgICAgICBjYXNlIFBldFNpemUubmFubzpcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuIDQ1O1xyXG4gICAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVNb3VzZU92ZXIoZTogTW91c2VFdmVudCl7XHJcbiAgdmFyIGVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gIGFsbFBldHMucGV0cygpLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICBpZiAoZWxlbWVudC5jb2xsaXNpb24gPT09IGVsKXtcclxuICAgICAgaWYgKCFlbGVtZW50LnBldC5jYW5Td2lwZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGVsZW1lbnQucGV0LnN3aXBlKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0QW5pbWF0aW9ucyhjb2xsaXNpb246IEhUTUxEaXZFbGVtZW50LCBwZXQ6IElQZXRUeXBlKSB7XHJcbiAgY29sbGlzaW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VPdmVyKTtcclxuICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICB2YXIgdXBkYXRlcyA9IGFsbFBldHMuc2Vla05ld0ZyaWVuZHMoKTtcclxuICAgIHVwZGF0ZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcclxuICAgICAgdnNjb2RlLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICB0ZXh0OiBtZXNzYWdlLFxyXG4gICAgICAgIGNvbW1hbmQ6ICdpbmZvJ1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcGV0Lm5leHRGcmFtZSgpO1xyXG4gICAgc2F2ZVN0YXRlKCk7XHJcbiAgfSwgMTAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUGV0VG9QYW5lbChwZXRUeXBlOiBQZXRUeXBlLCBiYXNlUGV0VXJpOiBzdHJpbmcsIHBldENvbG9yOiBQZXRDb2xvciwgcGV0U2l6ZTogUGV0U2l6ZSwgbGVmdDogbnVtYmVyLCBib3R0b206IG51bWJlciwgZmxvb3I6IG51bWJlciwgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogUGV0RWxlbWVudCB7XHJcbiAgdmFyIHBldFNwcml0ZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gIHBldFNwcml0ZUVsZW1lbnQuY2xhc3NOYW1lID0gXCJwZXRcIjtcclxuICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXRzQ29udGFpbmVyXCIpIGFzIEhUTUxEaXZFbGVtZW50KS5hcHBlbmRDaGlsZChwZXRTcHJpdGVFbGVtZW50KTtcclxuXHJcbiAgdmFyIGNvbGxpc2lvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb2xsaXNpb25FbGVtZW50LmNsYXNzTmFtZSA9IFwiY29sbGlzaW9uXCI7XHJcbiAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGV0c0NvbnRhaW5lclwiKSBhcyBIVE1MRGl2RWxlbWVudCkuYXBwZW5kQ2hpbGQoY29sbGlzaW9uRWxlbWVudCk7XHJcblxyXG4gIGNvbnN0IHJvb3QgPSBiYXNlUGV0VXJpICsgJy8nICsgcGV0VHlwZSArICcvJyArIHBldENvbG9yO1xyXG4gIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgbmV3IHBldCA6IFwiLCBwZXRUeXBlLCByb290KTtcclxuICB2YXIgbmV3UGV0ID0gY3JlYXRlUGV0KHBldFR5cGUsIHBldFNwcml0ZUVsZW1lbnQsIGNvbGxpc2lvbkVsZW1lbnQsIHBldFNpemUsIGxlZnQsIGJvdHRvbSwgcm9vdCwgZmxvb3IsIG5hbWUsIHBldENvdW50ZXIpO1xyXG4gIHBldENvdW50ZXIgKysgO1xyXG4gIHN0YXJ0QW5pbWF0aW9ucyhjb2xsaXNpb25FbGVtZW50LCBuZXdQZXQpO1xyXG4gIHJldHVybiBuZXcgUGV0RWxlbWVudChwZXRTcHJpdGVFbGVtZW50LCBjb2xsaXNpb25FbGVtZW50LCBuZXdQZXQsIHBldENvbG9yLCBwZXRUeXBlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZVN0YXRlKCl7XHJcbiAgdmFyIHN0YXRlID0gbmV3IFBldFBhbmVsU3RhdGUoKTtcclxuICBzdGF0ZS5wZXRTdGF0ZXMgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgYWxsUGV0cy5wZXRzKCkuZm9yRWFjaChwZXRJdGVtID0+IHtcclxuICAgIHN0YXRlLnBldFN0YXRlcyEucHVzaCh7XHJcbiAgICAgIHBldE5hbWU6IHBldEl0ZW0ucGV0Lm5hbWUoKSxcclxuICAgICAgcGV0Q29sb3I6IHBldEl0ZW0uY29sb3IsXHJcbiAgICAgIHBldFR5cGU6IHBldEl0ZW0udHlwZSxcclxuICAgICAgcGV0U3RhdGU6IHBldEl0ZW0ucGV0LmdldFN0YXRlKCksXHJcbiAgICAgIHBldEZyaWVuZDogcGV0SXRlbS5wZXQuZnJpZW5kKCkgPyBwZXRJdGVtLnBldC5mcmllbmQoKS5uYW1lKCkgOiB1bmRlZmluZWQsXHJcbiAgICAgIGVsTGVmdDogcGV0SXRlbS5lbC5zdHlsZS5sZWZ0LFxyXG4gICAgICBlbEJvdHRvbTogcGV0SXRlbS5lbC5zdHlsZS5ib3R0b21cclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIHN0YXRlLnBldENvdW50ZXIgPSBwZXRDb3VudGVyO1xyXG4gIHZzY29kZS5zZXRTdGF0ZShzdGF0ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlY292ZXJTdGF0ZShiYXNlUGV0VXJpOiBzdHJpbmcsIHBldFNpemU6IFBldFNpemUsIGZsb29yOiBudW1iZXIpe1xyXG4gIHZhciBzdGF0ZSA9IHZzY29kZS5nZXRTdGF0ZSgpO1xyXG4gIFxyXG4gIGlmIChzdGF0ZS5wZXRDb3VudGVyID09PSB1bmRlZmluZWQgfHwgaXNOYU4oc3RhdGUucGV0Q291bnRlcikpe1xyXG4gICAgcGV0Q291bnRlciA9IDE7XHJcbiAgfSBlbHNlIHtcclxuICAgIHBldENvdW50ZXIgPSBzdGF0ZS5wZXRDb3VudGVyITtcclxuICB9XHJcblxyXG4gIHZhciByZWNvdmVyeU1hcDogTWFwPElQZXRUeXBlLCBQZXRFbGVtZW50U3RhdGU+ID0gbmV3IE1hcCgpO1xyXG4gIHN0YXRlLnBldFN0YXRlcyEuZm9yRWFjaChwID0+IHtcclxuICAgIC8vIEZpeGVzIGEgYnVnIHJlbGF0ZWQgdG8gZHVjayBhbmltYXRpb25zXHJcbiAgICBpZiAocC5wZXRUeXBlIGFzIHN0cmluZyA9PT0gXCJydWJiZXIgZHVja1wiKSB7KHAucGV0VHlwZSBhcyBzdHJpbmcpID0gXCJydWJiZXItZHVja1wiO31cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgbmV3UGV0ID0gYWRkUGV0VG9QYW5lbChcclxuICAgICAgICBwLnBldFR5cGUhLCBcclxuICAgICAgICBiYXNlUGV0VXJpLCBcclxuICAgICAgICBwLnBldENvbG9yISwgXHJcbiAgICAgICAgcGV0U2l6ZSwgXHJcbiAgICAgICAgcGFyc2VJbnQocC5lbExlZnQhKSwgXHJcbiAgICAgICAgcGFyc2VJbnQocC5lbEJvdHRvbSEpLCBcclxuICAgICAgICBmbG9vcixcclxuICAgICAgICBwLnBldE5hbWUpO1xyXG4gICAgICBhbGxQZXRzLnB1c2gobmV3UGV0KTtcclxuICAgICAgcmVjb3ZlcnlNYXAuc2V0KG5ld1BldC5wZXQsIHApO1xyXG4gICAgfSBjYXRjaCAoSW52YWxpZFBldEV4Y2VwdGlvbil7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU3RhdGUgaGFkIGludmFsaWQgcGV0IChcIiArIHAucGV0VHlwZSArIFwiKSwgZGlzY2FyZGluZy5cIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmVjb3ZlcnlNYXAuZm9yRWFjaCggKHN0YXRlLCBwZXQpID0+IHtcclxuICAgIC8vIFJlY292ZXIgcHJldmlvdXMgc3RhdGUuXHJcbiAgICBwZXQucmVjb3ZlclN0YXRlKHN0YXRlLnBldFN0YXRlISk7XHJcblxyXG4gICAgLy8gUmVzb2x2ZSBmcmllbmQgcmVsYXRpb25zaGlwc1xyXG4gICAgdmFyIGZyaWVuZCA9IHVuZGVmaW5lZDtcclxuICAgIGlmIChzdGF0ZS5wZXRGcmllbmQpe1xyXG4gICAgICBmcmllbmQgPSBhbGxQZXRzLmxvY2F0ZShzdGF0ZS5wZXRGcmllbmQpO1xyXG4gICAgICBpZiAoZnJpZW5kKXtcclxuICAgICAgICBwZXQucmVjb3ZlckZyaWVuZChmcmllbmQucGV0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByYW5kb21TdGFydFBvc2l0aW9uKCkgOiBudW1iZXIge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVyV2lkdGggKiAwLjcpKTtcclxufVxyXG5cclxubGV0IGNhbnZhcyA6IEhUTUxDYW52YXNFbGVtZW50LCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XHJcbiAgY2FudmFzID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGV0Q2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50KTtcclxuICBjdHggPSAoY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xyXG4gIGN0eC5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICBjdHguY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxufVxyXG5cclxuLy8gSXQgY2Fubm90IGFjY2VzcyB0aGUgbWFpbiBWUyBDb2RlIEFQSXMgZGlyZWN0bHkuXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXRQYW5lbEFwcChiYXNlUGV0VXJpOiBzdHJpbmcsIHRoZW1lOiBUaGVtZSwgdGhlbWVLaW5kOiBDb2xvclRoZW1lS2luZCwgcGV0Q29sb3I6IFBldENvbG9yLCBwZXRTaXplOiBQZXRTaXplLCBwZXRUeXBlOiBQZXRUeXBlKSB7XHJcbiAgY29uc3QgYmFsbFJhZGl1czogbnVtYmVyID0gY2FsY3VsYXRlQmFsbFJhZGl1cyhwZXRTaXplKTtcclxuICB2YXIgZmxvb3IgPSAwO1xyXG4gIC8vIEFwcGx5IFRoZW1lIGJhY2tncm91bmRzXHJcbiAgaWYgKHRoZW1lICE9PSBUaGVtZS5ub25lKXtcclxuICAgIHZhciBfdGhlbWVLaW5kID0gXCJcIjtcclxuICAgIHN3aXRjaCAodGhlbWVLaW5kKSB7XHJcbiAgICAgIGNhc2UgQ29sb3JUaGVtZUtpbmQuRGFyazpcclxuICAgICAgICBfdGhlbWVLaW5kID0gXCJkYXJrXCI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ29sb3JUaGVtZUtpbmQuTGlnaHQ6XHJcbiAgICAgICAgX3RoZW1lS2luZCA9IFwibGlnaHRcIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDb2xvclRoZW1lS2luZC5IaWdoQ29udHJhc3Q6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgX3RoZW1lS2luZCA9IFwibGlnaHRcIjtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCcke2Jhc2VQZXRVcml9L2JhY2tncm91bmRzLyR7dGhlbWV9L2JhY2tncm91bmQtJHtfdGhlbWVLaW5kfS0ke3BldFNpemV9LnBuZycpYDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWdyb3VuZFwiKSEuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtiYXNlUGV0VXJpfS9iYWNrZ3JvdW5kcy8ke3RoZW1lfS9mb3JlZ3JvdW5kLSR7X3RoZW1lS2luZH0tJHtwZXRTaXplfS5wbmcnKWA7XHJcbiAgICBcclxuICAgIGZsb29yID0gY2FsY3VsYXRlRmxvb3IocGV0U2l6ZSwgdGhlbWUpOyAvLyBUaGVtZXMgaGF2ZSBwZXRzIGF0IGEgc3BlY2lmaWVkIGhlaWdodCBmcm9tIHRoZSBncm91bmRcclxuICB9IGVsc2Uge1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIlwiO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JlZ3JvdW5kXCIpIS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgLy8vIEJvdW5jaW5nIGJhbGwgY29tcG9uZW50cywgY3JlZGl0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yOTk4MjM0M1xyXG4gIGNvbnN0IGdyYXZpdHk6IG51bWJlciA9IDAuMiwgZGFtcGluZzogbnVtYmVyID0gMC45LCB0cmFjdGlvbjogbnVtYmVyID0gMC44O1xyXG4gIHZhciBiYWxsU3RhdGU6IEJhbGxTdGF0ZTtcclxuXHJcbiAgZnVuY3Rpb24gcmVzZXRCYWxsKCkge1xyXG4gICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICBiYWxsU3RhdGUgPSBuZXcgQmFsbFN0YXRlKDEwMCwgMTAwLCAyLCA1KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRocm93QmFsbCgpIHtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIGlmICghYmFsbFN0YXRlLnBhdXNlZCkge3JlcXVlc3RBbmltYXRpb25GcmFtZSh0aHJvd0JhbGwpO31cclxuXHJcbiAgICBpZiAoYmFsbFN0YXRlLmN4ICsgYmFsbFJhZGl1cyA+PSBjYW52YXMud2lkdGgpIHtcclxuICAgICAgYmFsbFN0YXRlLnZ4ID0gLWJhbGxTdGF0ZS52eCAqIGRhbXBpbmc7XHJcbiAgICAgIGJhbGxTdGF0ZS5jeCA9IGNhbnZhcy53aWR0aCAtIGJhbGxSYWRpdXM7XHJcbiAgICB9IGVsc2UgaWYgKGJhbGxTdGF0ZS5jeCAtIGJhbGxSYWRpdXMgPD0gMCkge1xyXG4gICAgICBiYWxsU3RhdGUudnggPSAtYmFsbFN0YXRlLnZ4ICogZGFtcGluZztcclxuICAgICAgYmFsbFN0YXRlLmN4ID0gYmFsbFJhZGl1cztcclxuICAgIH1cclxuICAgIGlmIChiYWxsU3RhdGUuY3kgKyBiYWxsUmFkaXVzICsgZmxvb3IgPj0gKGNhbnZhcy5oZWlnaHQpKSB7XHJcbiAgICAgIGJhbGxTdGF0ZS52eSA9IC1iYWxsU3RhdGUudnkgKiBkYW1waW5nO1xyXG4gICAgICBiYWxsU3RhdGUuY3kgPSBjYW52YXMuaGVpZ2h0IC0gYmFsbFJhZGl1cyAtIGZsb29yO1xyXG4gICAgICAvLyB0cmFjdGlvbiBoZXJlXHJcbiAgICAgIGJhbGxTdGF0ZS52eCAqPSB0cmFjdGlvbjtcclxuICAgIH0gZWxzZSBpZiAoYmFsbFN0YXRlLmN5IC0gYmFsbFJhZGl1cyA8PSAwKSB7XHJcbiAgICAgIGJhbGxTdGF0ZS52eSA9IC1iYWxsU3RhdGUudnkgKiBkYW1waW5nO1xyXG4gICAgICBiYWxsU3RhdGUuY3kgPSBiYWxsUmFkaXVzO1xyXG4gICAgfVxyXG5cclxuICAgIGJhbGxTdGF0ZS52eSArPSBncmF2aXR5O1xyXG5cclxuICAgIGJhbGxTdGF0ZS5jeCArPSBiYWxsU3RhdGUudng7XHJcbiAgICBiYWxsU3RhdGUuY3kgKz0gYmFsbFN0YXRlLnZ5O1xyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoYmFsbFN0YXRlLmN4LCBiYWxsU3RhdGUuY3ksIGJhbGxSYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMmVkODUxXCI7XHJcbiAgICBjdHguZmlsbCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIHBldCBzZXNzaW9uJywgcGV0Q29sb3IsIGJhc2VQZXRVcmksIHBldFR5cGUpO1xyXG4gIC8vIE5ldyBzZXNzaW9uXHJcbiAgdmFyIHN0YXRlID0gdnNjb2RlLmdldFN0YXRlKCk7XHJcbiAgaWYgKCFzdGF0ZSkge1xyXG4gICAgY29uc29sZS5sb2coJ05vIHN0YXRlLCBzdGFydGluZyBhIG5ldyBzZXNzaW9uLicpO1xyXG4gICAgcGV0Q291bnRlciA9IDE7XHJcbiAgICBhbGxQZXRzLnB1c2goYWRkUGV0VG9QYW5lbChwZXRUeXBlLCBiYXNlUGV0VXJpLCBwZXRDb2xvciwgcGV0U2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCBmbG9vciwgZmxvb3IsIHVuZGVmaW5lZCkpO1xyXG4gICAgc2F2ZVN0YXRlKCk7XHJcbiAgfSBlbHNlIHsgXHJcbiAgICBjb25zb2xlLmxvZygnUmVjb3ZlcmluZyBzdGF0ZSAtICcsIHN0YXRlKTtcclxuICAgIHJlY292ZXJTdGF0ZShiYXNlUGV0VXJpLCBwZXRTaXplLCBmbG9vcik7XHJcbiAgfVxyXG5cclxuICBpbml0Q2FudmFzKCk7XHJcblxyXG4gIC8vIEhhbmRsZSBtZXNzYWdlcyBzZW50IGZyb20gdGhlIGV4dGVuc2lvbiB0byB0aGUgd2Vidmlld1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhOyAvLyBUaGUganNvbiBkYXRhIHRoYXQgdGhlIGV4dGVuc2lvbiBzZW50XHJcbiAgICBzd2l0Y2ggKG1lc3NhZ2UuY29tbWFuZCkge1xyXG4gICAgICBjYXNlIFwidGhyb3ctYmFsbFwiOlxyXG4gICAgICAgIHJlc2V0QmFsbCgpO1xyXG4gICAgICAgIHRocm93QmFsbCgpO1xyXG4gICAgICAgIGFsbFBldHMucGV0cygpLmZvckVhY2gocGV0RWwgPT4ge1xyXG4gICAgICAgICAgaWYgKHBldEVsLnBldC5jYW5DaGFzZSgpKXtcclxuICAgICAgICAgICAgcGV0RWwucGV0LmNoYXNlKGJhbGxTdGF0ZSwgY2FudmFzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNwYXduLXBldFwiOlxyXG4gICAgICAgIGFsbFBldHMucHVzaChhZGRQZXRUb1BhbmVsKG1lc3NhZ2UudHlwZSwgYmFzZVBldFVyaSwgbWVzc2FnZS5jb2xvciwgcGV0U2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCBmbG9vciwgZmxvb3IsIHVuZGVmaW5lZCkpO1xyXG4gICAgICAgIHNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwicmVzZXQtcGV0XCI6XHJcbiAgICAgICAgYWxsUGV0cy5wZXRzKCkuZm9yRWFjaChwZXQgPT4ge1xyXG4gICAgICAgICAgcGV0LmVsLnJlbW92ZSgpO1xyXG4gICAgICAgICAgcGV0LmNvbGxpc2lvbi5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGxQZXRzLnJlc2V0KCk7XHJcbiAgICAgICAgYWxsUGV0cy5wdXNoKGFkZFBldFRvUGFuZWwobWVzc2FnZS50eXBlLCBiYXNlUGV0VXJpLCBtZXNzYWdlLmNvbG9yLCBtZXNzYWdlLnNpemUsIHJhbmRvbVN0YXJ0UG9zaXRpb24oKSwgZmxvb3IsIGZsb29yLCB1bmRlZmluZWQpKTtcclxuICAgICAgICBwZXRDb3VudGVyID0gMTtcclxuICAgICAgICBzYXZlU3RhdGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbn07XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgaW5pdENhbnZhcygpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==