/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/panel/pets.ts":
/*!***************************!*\
  !*** ./src/panel/pets.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPet = exports.InvalidPetException = exports.RubberDuck = exports.Clippy = exports.Snake = exports.Dog = exports.Cat = exports.InvalidStateException = void 0;
const states_1 = __webpack_require__(/*! ./states */ "./src/panel/states.ts");
class InvalidStateException {
}
exports.InvalidStateException = InvalidStateException;
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
    constructor(spriteElement, collisionElement, size, left, bottom, petRoot, floor) {
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
        this.collision.style.width = `${this.el.offsetWidth}px`;
        this.collision.style.height = `${this.el.offsetHeight}px`;
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
    recoverState(state) {
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
        return !states_1.isStateAboveGround(this.currentStateEnum);
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
            if (this.currentStateEnum === "chase" /* chase */) { // Currently the only one anyway
                var nextState = this.chooseNextState("idle-with-ball" /* idleWithBall */);
                this.currentState = states_1.resolveState(nextState, this);
                this.currentStateEnum = nextState;
            }
        }
    }
}
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
                    possibleNextStates: ["sit-idle" /* sitIdle */, "climb-wall-left" /* climbWallLeft */]
                },
                {
                    state: "run-left" /* runLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "climb-wall-left" /* climbWallLeft */]
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
                    possibleNextStates: ["sit-idle" /* sitIdle */, "lie" /* lie */]
                },
                {
                    state: "run-left" /* runLeft */,
                    possibleNextStates: ["sit-idle" /* sitIdle */, "lie" /* lie */]
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
}
exports.RubberDuck = RubberDuck;
class InvalidPetException {
}
exports.InvalidPetException = InvalidPetException;
function createPet(petType, el, collision, size, left, bottom, petRoot, floor) {
    if (petType === "cat") {
        return new Cat(el, collision, size, left, bottom, petRoot, floor);
    }
    else if (petType === "dog") {
        return new Dog(el, collision, size, left, bottom, petRoot, floor);
    }
    else if (petType === "snake") {
        return new Snake(el, collision, size, left, bottom, petRoot, floor);
    }
    else if (petType === "clippy") {
        return new Clippy(el, collision, size, left, bottom, petRoot, floor);
    }
    else if (petType === "rubber-duck" || petType === "rubber duck") {
        return new RubberDuck(el, collision, size, left, bottom, petRoot, floor);
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
exports.JumpDownLeftState = exports.ClimbWallLeftState = exports.ChaseState = exports.RunLeftState = exports.RunRightState = exports.WalkLeftState = exports.WalkRightState = exports.IdleWithBallState = exports.SwipeState = exports.LandState = exports.WallHangLeftState = exports.LieState = exports.SitIdleState = exports.resolveState = exports.isStateAboveGround = exports.BallState = exports.FrameResult = exports.HorizontalDirection = exports.PetPanelState = exports.PetElementState = exports.PetInstanceState = void 0;
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
        this.holdTime = 10;
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
        if (this.canvas.height - this.ballState.cy < this.pet.width() && this.ballState.cx < this.pet.left() && this.pet.left() < this.ballState.cx + 15) {
            // hide ball
            this.canvas.style.display = "none";
            this.ballState.paused = true;
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.ChaseState = ChaseState;
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
class PetElement {
    constructor(el, collision, pet, color, type) {
        this.el = el;
        this.collision = collision;
        this.pet = pet;
        this.color = color;
        this.type = type;
    }
}
var allPets = new Array(0);
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
function handleMouseOver(e) {
    var el = e.currentTarget;
    allPets.forEach(element => {
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
        pet.nextFrame();
        saveState();
    }, 100);
}
function addPetToPanel(petType, basePetUri, petColor, petSize, left, bottom, floor) {
    var petSpriteElement = document.createElement("img");
    petSpriteElement.className = "pet";
    var collisionElement = document.createElement("div");
    collisionElement.className = "collision";
    document.getElementById("petsContainer").appendChild(petSpriteElement);
    const root = basePetUri + '/' + petType + '/' + petColor;
    console.log("Creating new pet : ", petType, root);
    var newPet = pets_1.createPet(petType, petSpriteElement, collisionElement, petSize, left, bottom, root, floor);
    startAnimations(collisionElement, newPet);
    return new PetElement(petSpriteElement, collisionElement, newPet, petColor, petType);
}
function saveState() {
    var state = new states_1.PetPanelState();
    state.petStates = new Array();
    allPets.forEach(petItem => {
        state.petStates.push({
            petColor: petItem.color,
            petType: petItem.type,
            petState: petItem.pet.getState(),
            elLeft: petItem.el.style.left,
            elBottom: petItem.el.style.bottom
        });
    });
    vscode.setState(state);
}
function recoverState(basePetUri, petSize, floor) {
    var state = vscode.getState();
    state.petStates.forEach(p => {
        var newPet = addPetToPanel(p.petType, basePetUri, p.petColor, petSize, parseInt(p.elLeft), parseInt(p.elBottom), floor);
        newPet.pet.recoverState(p.petState);
        allPets.push(newPet);
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
function petPanelApp(basePetUri, theme, petColor, petSize, petType) {
    const ballRadius = calculateBallRadius(petSize);
    var floor = 0;
    // Apply Theme backgrounds
    if (theme !== "none" /* none */) {
        document.body.style.backgroundImage = `url('${basePetUri}/backgrounds/${theme}/background.png')`;
        document.getElementById("foreground").style.backgroundImage = `url('${basePetUri}/backgrounds/${theme}/foreground.png')`;
        floor = 30; // Themes have pets at a specified height (30px)
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
        if (ballState.cy + ballRadius >= (canvas.height)) {
            ballState.vy = -ballState.vy * damping;
            ballState.cy = canvas.height - ballRadius;
            // traction here
            ballState.vx *= traction;
        }
        else if (ballState.cy - ballRadius <= floor) {
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
        allPets.push(addPetToPanel(petType, basePetUri, petColor, petSize, randomStartPosition(), floor, floor));
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
                allPets.forEach(petEl => {
                    if (petEl.pet.canChase()) {
                        petEl.pet.chase(ballState, canvas);
                    }
                });
                break;
            case "spawn-pet":
                allPets.push(addPetToPanel(message.type, basePetUri, message.color, petSize, randomStartPosition(), floor, floor));
                saveState();
                break;
            case "reset-pet":
                allPets.forEach(pet => pet.el.remove());
                allPets = [];
                allPets.push(addPetToPanel(message.type, basePetUri, message.color, message.size, randomStartPosition(), floor, floor));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvcGV0cy50cyIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvc3RhdGVzLnRzIiwid2VicGFjazovL3BldEFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUEsOEVBQXVKO0FBRXZKLE1BQWEscUJBQXFCO0NBRWpDO0FBRkQsc0RBRUM7QUFrQkQsU0FBUyxvQkFBb0IsQ0FBQyxJQUFhO0lBQ3ZDLElBQUksSUFBSSxzQkFBaUIsRUFBQztRQUN4QixPQUFPLEVBQUUsQ0FBQztLQUNYO1NBQU0sSUFBSSxJQUFJLDBCQUFtQixFQUFDO1FBQ2pDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTSxJQUFJLElBQUksd0JBQWtCLEVBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7S0FDWjtTQUFNO1FBQ0wsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRO0tBQ3BCO0FBQ0gsQ0FBQztBQUVILE1BQWUsV0FBVztJQWN0QixZQUFZLGFBQStCLEVBQUUsZ0JBQWdDLEVBQUUsSUFBYSxFQUFFLElBQVksRUFBRSxNQUFjLEVBQUUsT0FBZSxFQUFFLEtBQWE7UUFiMUosVUFBSyxHQUFXLE1BQU0sQ0FBQztRQUN2QixhQUFRLEdBQWtCLEVBQUUsYUFBYSwwQkFBZ0IsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFhM0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0s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T0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkgsU0FBUyxFQUFFLENBQUM7Z0JBQ1osTUFBTTtZQUNSLEtBQUssV0FBVztnQkFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN4SCxTQUFTLEVBQUUsQ0FBQztnQkFDWixNQUFNO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUM7QUE5RkQsa0NBOEZDO0FBQUEsQ0FBQztBQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7SUFDaEMsVUFBVSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBldFNpemUgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGVzXCI7XG5pbXBvcnQgeyBJU2VxdWVuY2VUcmVlIH0gZnJvbSBcIi4vc2VxdWVuY2VzXCI7XG5pbXBvcnQgeyBJU3RhdGUsIFN0YXRlcywgcmVzb2x2ZVN0YXRlLCBIb3Jpem9udGFsRGlyZWN0aW9uLCBDaGFzZVN0YXRlLCBCYWxsU3RhdGUsIEZyYW1lUmVzdWx0LCBQZXRJbnN0YW5jZVN0YXRlLCBpc1N0YXRlQWJvdmVHcm91bmQgfSBmcm9tIFwiLi9zdGF0ZXNcIjtcblxuZXhwb3J0IGNsYXNzIEludmFsaWRTdGF0ZUV4Y2VwdGlvbiB7XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGV0VHlwZSB7XG4gICAgY2FuU3dpcGUoKTogYm9vbGVhblxuICAgIGNhbkNoYXNlKCk6IGJvb2xlYW5cbiAgICBzd2lwZSgpOiB2b2lkXG4gICAgY2hhc2UoYmFsbFN0YXRlOiBCYWxsU3RhdGUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkXG4gICAgbmV4dEZyYW1lKCk6IHZvaWRcbiAgICBnZXRTdGF0ZSgpOiBQZXRJbnN0YW5jZVN0YXRlXG4gICAgcmVjb3ZlclN0YXRlKHN0YXRlOiBQZXRJbnN0YW5jZVN0YXRlKTogdm9pZFxuICAgIGJvdHRvbSgpOiBudW1iZXI7XG4gICAgbGVmdCgpOiBudW1iZXI7XG4gICAgcG9zaXRpb25Cb3R0b20oYm90dG9tOiBudW1iZXIpOiB2b2lkO1xuICAgIHBvc2l0aW9uTGVmdChsZWZ0OiBudW1iZXIpOiB2b2lkO1xuICAgIHdpZHRoKCk6IG51bWJlcjtcbiAgICBmbG9vcigpOiBudW1iZXI7XG59IFxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTcHJpdGVXaWR0aChzaXplOiBQZXRTaXplKTogbnVtYmVye1xuICAgIGlmIChzaXplID09PSBQZXRTaXplLm5hbm8pe1xuICAgICAgcmV0dXJuIDMwO1xuICAgIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5tZWRpdW0pe1xuICAgICAgcmV0dXJuIDU1O1xuICAgIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5sYXJnZSl7XG4gICAgICByZXR1cm4gMTEwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMzA7IC8vIFNocnVnXG4gICAgfVxuICB9XG5cbmFic3RyYWN0IGNsYXNzIEJhc2VQZXRUeXBlIGltcGxlbWVudHMgSVBldFR5cGUge1xuICAgIGxhYmVsOiBzdHJpbmcgPSBcImJhc2VcIjtcbiAgICBzZXF1ZW5jZTogSVNlcXVlbmNlVHJlZSA9IHsgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsIHNlcXVlbmNlU3RhdGVzOiBbXX07XG4gICAgY3VycmVudFN0YXRlOiBJU3RhdGU7XG4gICAgY3VycmVudFN0YXRlRW51bTogU3RhdGVzO1xuICAgIGhvbGRTdGF0ZTogSVN0YXRlIHwgdW5kZWZpbmVkO1xuICAgIGhvbGRTdGF0ZUVudW06IFN0YXRlcyB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHByaXZhdGUgY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIF9sZWZ0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYm90dG9tOiBudW1iZXI7XG4gICAgcGV0Um9vdDogc3RyaW5nO1xuICAgIF9mbG9vcjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgY29sbGlzaW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQsIHNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHBldFJvb3Q6IHN0cmluZywgZmxvb3I6IG51bWJlcil7XG4gICAgICAgIHRoaXMuZWwgPSBzcHJpdGVFbGVtZW50O1xuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGNvbGxpc2lvbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMucGV0Um9vdCA9IHBldFJvb3Q7XG4gICAgICAgIHRoaXMuX2Zsb29yID0gZmxvb3I7XG4gICAgICAgIHRoaXMuX2xlZnQgPSBsZWZ0O1xuICAgICAgICB0aGlzLl9ib3R0b20gPSBib3R0b207XG4gICAgICAgIHRoaXMuaW5pdFNwcml0ZShzaXplLCBsZWZ0LCBib3R0b20pO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSB0aGlzLnNlcXVlbmNlLnN0YXJ0aW5nU3RhdGU7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSwgdGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdFNwcml0ZShwZXRTaXplOiBQZXRTaXplLCBsZWZ0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke2JvdHRvbX1weGA7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5tYXhXaWR0aCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtjYWxjdWxhdGVTcHJpdGVXaWR0aChwZXRTaXplKX1weGA7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuYm90dG9tID0gYCR7Ym90dG9tfXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUud2lkdGggPSBgJHt0aGlzLmVsLm9mZnNldFdpZHRofXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5lbC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgICAgfVxuXG4gICAgbGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcbiAgICB9XG5cbiAgICBib3R0b20oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdHRvbTtcbiAgICB9XG5cbiAgICBwb3NpdGlvbkJvdHRvbShib3R0b206IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLl9ib3R0b219cHhgO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuX2JvdHRvbX1weGA7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uLnN0eWxlLmxlZnQgPSBgJHt0aGlzLl9sZWZ0fXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuYm90dG9tID0gYCR7dGhpcy5fYm90dG9tfXB4YDtcbiAgICB9O1xuXG4gICAgcG9zaXRpb25MZWZ0KGxlZnQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9sZWZ0ID0gbGVmdDtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5fbGVmdH1weGA7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3RoaXMuX2xlZnR9cHhgO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbi5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5fbGVmdH1weGA7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuX2JvdHRvbX1weGA7XG4gICAgfVxuXG4gICAgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwud2lkdGg7XG4gICAgfVxuXG4gICAgZmxvb3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zsb29yO1xuICAgIH1cblxuICAgIGdldFN0YXRlKCk6IFBldEluc3RhbmNlU3RhdGUgeyBcbiAgICAgICAgcmV0dXJuIHtjdXJyZW50U3RhdGVFbnVtOiB0aGlzLmN1cnJlbnRTdGF0ZUVudW19O1xuICAgIH1cblxuICAgIHJlY292ZXJTdGF0ZShzdGF0ZTogUGV0SW5zdGFuY2VTdGF0ZSl7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHN0YXRlLmN1cnJlbnRTdGF0ZUVudW0hO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZUVudW0sIHRoaXMpO1xuICAgICAgICBpZiAoIWlzU3RhdGVBYm92ZUdyb3VuZCh0aGlzLmN1cnJlbnRTdGF0ZUVudW0pKXtcbiAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBib3R0b20gb2YgdGhlIHNwcml0ZSB0byB0aGUgZmxvb3IgYXMgdGhlIHRoZW1lXG4gICAgICAgICAgICAvLyBoYXMgbGlrZWx5IGNoYW5nZWQuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uQm90dG9tKHRoaXMuZmxvb3IoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Td2lwZSgpe1xuICAgICAgICByZXR1cm4gIWlzU3RhdGVBYm92ZUdyb3VuZCh0aGlzLmN1cnJlbnRTdGF0ZUVudW0pO1xuICAgIH1cblxuICAgIGNhbkNoYXNlKCl7XG4gICAgICAgIHJldHVybiAhaXNTdGF0ZUFib3ZlR3JvdW5kKHRoaXMuY3VycmVudFN0YXRlRW51bSk7XG4gICAgfVxuXG4gICAgc3dpcGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPT09IFN0YXRlcy5zd2lwZSkgeyByZXR1cm47IH1cbiAgICAgICAgdGhpcy5ob2xkU3RhdGUgPSB0aGlzLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgdGhpcy5ob2xkU3RhdGVFbnVtID0gdGhpcy5jdXJyZW50U3RhdGVFbnVtO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBTdGF0ZXMuc3dpcGU7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSwgdGhpcyk7XG4gICAgfVxuICAgIFxuICAgIGNoYXNlKGJhbGxTdGF0ZTogQmFsbFN0YXRlLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IFN0YXRlcy5jaGFzZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBuZXcgQ2hhc2VTdGF0ZSh0aGlzLCBiYWxsU3RhdGUsIGNhbnZhcyk7XG4gICAgfVxuXG4gICAgZmFjZUxlZnQoKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZVgoLTEpXCI7XG4gICAgfVxuXG4gICAgZmFjZVJpZ2h0KCkge1xuICAgICAgICB0aGlzLmVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwic2NhbGVYKDEpXCI7XG4gICAgfVxuXG4gICAgc2V0QW5pbWF0aW9uKGZhY2U6IHN0cmluZykge1xuICAgICAgICBjb25zdCBuZXdGYWNlOiBzdHJpbmcgPSBgJHt0aGlzLnBldFJvb3R9XyR7ZmFjZX1fOGZwcy5naWZgO1xuICAgICAgICBpZiAodGhpcy5lbC5zcmMgPT09IG5ld0ZhY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsLnNyYyA9IG5ld0ZhY2U7XG4gICAgfVxuXG4gICAgY2hvb3NlTmV4dFN0YXRlKGZyb21TdGF0ZTogU3RhdGVzKTogU3RhdGVzIHtcbiAgICAgICAgLy8gV29yayBvdXQgbmV4dCBzdGF0ZVxuICAgICAgICB2YXIgcG9zc2libGVOZXh0U3RhdGVzOiBTdGF0ZXNbXSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgdGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2Uuc2VxdWVuY2VTdGF0ZXNbaV0uc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlcyA9IHRoaXMuc2VxdWVuY2Uuc2VxdWVuY2VTdGF0ZXNbaV0ucG9zc2libGVOZXh0U3RhdGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcG9zc2libGVOZXh0U3RhdGVzKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkU3RhdGVFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByYW5kb21seSBjaG9vc2UgdGhlIG5leHQgc3RhdGVcbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGVOZXh0U3RhdGVzLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBwb3NzaWJsZU5leHRTdGF0ZXNbaWR4XTtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjZUxlZnQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmZhY2VSaWdodCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKHRoaXMuY3VycmVudFN0YXRlLnNwcml0ZUxhYmVsKTtcbiAgICAgICAgdmFyIGZyYW1lUmVzdWx0ID0gdGhpcy5jdXJyZW50U3RhdGUubmV4dEZyYW1lKCk7XG4gICAgICAgIGlmIChmcmFtZVJlc3VsdCA9PT0gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gSWYgcmVjb3ZlcmluZyBmcm9tIHN3aXBlLi5cbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRTdGF0ZSAmJiB0aGlzLmhvbGRTdGF0ZUVudW0pe1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5ob2xkU3RhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gdGhpcy5ob2xkU3RhdGVFbnVtO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9sZFN0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9sZFN0YXRlRW51bSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSB0aGlzLmNob29zZU5leHRTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZUVudW0pO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUobmV4dFN0YXRlLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IG5leHRTdGF0ZTtcbiAgICAgICAgfSBlbHNlIGlmIChmcmFtZVJlc3VsdCA9PT0gRnJhbWVSZXN1bHQuc3RhdGVDYW5jZWwpe1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmNoYXNlKSB7IC8vIEN1cnJlbnRseSB0aGUgb25seSBvbmUgYW55d2F5XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTdGF0ZSA9IHRoaXMuY2hvb3NlTmV4dFN0YXRlKFN0YXRlcy5pZGxlV2l0aEJhbGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKG5leHRTdGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gbmV4dFN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBDYXQgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XG4gICAgbGFiZWwgPSBcImNhdFwiO1xuICAgIHNlcXVlbmNlID0ge1xuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5jbGltYldhbGxMZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5jbGltYldhbGxMZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNsaW1iV2FsbExlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGxIYW5nTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxsSGFuZ0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmp1bXBEb3duTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5qdW1wRG93bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmxhbmRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMubGFuZCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgRG9nIGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJkb2dcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodCwgU3RhdGVzLmxpZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5saWUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5saWVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmxpZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFNuYWtlIGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJzbmFrZVwiO1xuICAgIHNlcXVlbmNlID0ge1xuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIENsaXBweSBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwiY2xpcHB5XCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgUnViYmVyRHVjayBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwicnViYmVyLWR1Y2tcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkUGV0RXhjZXB0aW9uIHtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBldChwZXRUeXBlOiBzdHJpbmcsIGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBjb2xsaXNpb246IEhUTUxEaXZFbGVtZW50LCBzaXplOiBQZXRTaXplLCBsZWZ0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBwZXRSb290OiBzdHJpbmcsIGZsb29yOiBudW1iZXIpIDogSVBldFR5cGUge1xuICAgIGlmIChwZXRUeXBlID09PSBcImNhdFwiKXtcbiAgICAgICAgcmV0dXJuIG5ldyBDYXQoZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwiZG9nXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb2coZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwic25ha2VcIikge1xuICAgICAgICByZXR1cm4gbmV3IFNuYWtlKGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcImNsaXBweVwiKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpcHB5KGVsLCBjb2xsaXNpb24sIHNpemUsIGxlZnQsIGJvdHRvbSwgcGV0Um9vdCwgZmxvb3IpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcInJ1YmJlci1kdWNrXCIgfHwgcGV0VHlwZSA9PT0gXCJydWJiZXIgZHVja1wiKSB7XG4gICAgICAgIHJldHVybiBuZXcgUnViYmVyRHVjayhlbCwgY29sbGlzaW9uLCBzaXplLCBsZWZ0LCBib3R0b20sIHBldFJvb3QsIGZsb29yKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEludmFsaWRQZXRFeGNlcHRpb24oKTtcbn1cblxuIiwiaW1wb3J0IHsgUGV0Q29sb3IsIFBldFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGVzXCI7XG5pbXBvcnQgeyBJUGV0VHlwZSB9IGZyb20gXCIuL3BldHNcIjtcblxuZXhwb3J0IGNsYXNzIFBldEluc3RhbmNlU3RhdGUge1xuICAgIGN1cnJlbnRTdGF0ZUVudW06IFN0YXRlcyB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBldEVsZW1lbnRTdGF0ZSB7XG4gICAgcGV0U3RhdGU6IFBldEluc3RhbmNlU3RhdGUgfCB1bmRlZmluZWQ7XG4gICAgcGV0VHlwZTogUGV0VHlwZSB8IHVuZGVmaW5lZDtcbiAgICBwZXRDb2xvcjogUGV0Q29sb3IgfCB1bmRlZmluZWQ7XG4gICAgZWxMZWZ0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgZWxCb3R0b206IHN0cmluZyB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBldFBhbmVsU3RhdGUge1xuICAgIHBldFN0YXRlczogQXJyYXk8UGV0RWxlbWVudFN0YXRlPiB8IHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZW51bSBIb3Jpem9udGFsRGlyZWN0aW9uIHtcbiAgICBsZWZ0LFxuICAgIHJpZ2h0LFxuICAgIG5hdHVyYWwgLy8gTm8gY2hhbmdlIHRvIGN1cnJlbnQgZGlyZWN0aW9uXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFN0YXRlcyB7XG4gICAgc2l0SWRsZSA9IFwic2l0LWlkbGVcIixcbiAgICB3YWxrUmlnaHQgPSBcIndhbGstcmlnaHRcIixcbiAgICB3YWxrTGVmdCA9IFwid2Fsay1sZWZ0XCIsXG4gICAgcnVuUmlnaHQgPSBcInJ1bi1yaWdodFwiLFxuICAgIHJ1bkxlZnQgPSBcInJ1bi1sZWZ0XCIsXG4gICAgbGllID0gXCJsaWVcIixcbiAgICB3YWxsSGFuZ0xlZnQgPSBcIndhbGwtaGFuZy1sZWZ0XCIsXG4gICAgY2xpbWJXYWxsTGVmdCA9IFwiY2xpbWItd2FsbC1sZWZ0XCIsXG4gICAganVtcERvd25MZWZ0ID0gXCJqdW1wLWRvd24tbGVmdFwiLFxuICAgIGxhbmQgPSBcImxhbmRcIixcbiAgICBzd2lwZSA9IFwic3dpcGVcIixcbiAgICBpZGxlV2l0aEJhbGwgPSBcImlkbGUtd2l0aC1iYWxsXCIsXG4gICAgY2hhc2UgPSBcImNoYXNlXCJcbn1cblxuZXhwb3J0IGVudW0gRnJhbWVSZXN1bHQgeyBcbiAgICBzdGF0ZUNvbnRpbnVlLFxuICAgIHN0YXRlQ29tcGxldGUsXG4gICAgLy8gU3BlY2lhbCBzdGF0ZXNcbiAgICBzdGF0ZUNhbmNlbFxufVxuXG5leHBvcnQgY2xhc3MgQmFsbFN0YXRlIHtcbiAgICBjeDogbnVtYmVyO1xuICAgIGN5OiBudW1iZXI7XG4gICAgdng6IG51bWJlcjtcbiAgICB2eTogbnVtYmVyO1xuICAgIHBhdXNlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIHZ4OiBudW1iZXIsIHZ5OiBudW1iZXIpe1xuICAgICAgICB0aGlzLmN4ID0gY3g7XG4gICAgICAgIHRoaXMuY3kgPSBjeTtcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xuICAgICAgICB0aGlzLnZ5ID0gdnk7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdGF0ZUFib3ZlR3JvdW5kKHN0YXRlOiBTdGF0ZXMpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHN0YXRlID09PSBTdGF0ZXMuY2xpbWJXYWxsTGVmdCB8fFxuICAgICAgICAgICAgc3RhdGUgPT09IFN0YXRlcy5qdW1wRG93bkxlZnQgfHwgXG4gICAgICAgICAgICBzdGF0ZSA9PT0gU3RhdGVzLmxhbmQgfHxcbiAgICAgICAgICAgIHN0YXRlID09PSBTdGF0ZXMud2FsbEhhbmdMZWZ0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVTdGF0ZShzdGF0ZTogc3RyaW5nLCBwZXQ6IElQZXRUeXBlKTogSVN0YXRlIHtcbiAgICBzd2l0Y2goc3RhdGUpe1xuICAgICAgICBjYXNlIFN0YXRlcy5zaXRJZGxlOiByZXR1cm4gbmV3IFNpdElkbGVTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy53YWxrUmlnaHQ6IHJldHVybiBuZXcgV2Fsa1JpZ2h0U3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa0xlZnQ6IHJldHVybiBuZXcgV2Fsa0xlZnRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5ydW5SaWdodDogcmV0dXJuIG5ldyBSdW5SaWdodFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLnJ1bkxlZnQ6IHJldHVybiBuZXcgUnVuTGVmdFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmxpZTogcmV0dXJuIG5ldyBMaWVTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy53YWxsSGFuZ0xlZnQ6IHJldHVybiBuZXcgV2FsbEhhbmdMZWZ0U3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMuY2xpbWJXYWxsTGVmdDogcmV0dXJuIG5ldyBDbGltYldhbGxMZWZ0U3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMuanVtcERvd25MZWZ0OiByZXR1cm4gbmV3IEp1bXBEb3duTGVmdFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmxhbmQ6IHJldHVybiBuZXcgTGFuZFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLnN3aXBlOiByZXR1cm4gbmV3IFN3aXBlU3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMuaWRsZVdpdGhCYWxsOiByZXR1cm4gbmV3IElkbGVXaXRoQmFsbFN0YXRlKHBldCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2l0SWRsZVN0YXRlKHBldCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIHtcbiAgICBsYWJlbDogc3RyaW5nXG4gICAgc3ByaXRlTGFiZWw6IHN0cmluZ1xuICAgIGhvcml6b250YWxEaXJlY3Rpb246IEhvcml6b250YWxEaXJlY3Rpb25cbiAgICBwZXQ6IElQZXRUeXBlO1xuICAgIG5leHRGcmFtZSgpOiBGcmFtZVJlc3VsdFxufVxuXG5jbGFzcyBBYnN0cmFjdFN0YXRpY1N0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5zaXRJZGxlO1xuICAgIGlkbGVDb3VudGVyOiBudW1iZXI7XG4gICAgc3ByaXRlTGFiZWwgPSBcImlkbGVcIjtcbiAgICBob2xkVGltZSA9IDUwO1xuICAgIHBldDogSVBldFR5cGU7XG4gICAgXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcblxuICAgIGNvbnN0cnVjdG9yKHBldDogSVBldFR5cGUpIHtcbiAgICAgICAgdGhpcy5pZGxlQ291bnRlciA9IDA7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLmlkbGVDb3VudGVyKys7XG4gICAgICAgIGlmICh0aGlzLmlkbGVDb3VudGVyID4gdGhpcy5ob2xkVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2l0SWRsZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuc2l0SWRsZTtcbiAgICBzcHJpdGVMYWJlbCA9IFwiaWRsZVwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xuICAgIGhvbGRUaW1lID0gNTA7XG59XG5cbmV4cG9ydCBjbGFzcyBMaWVTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmxpZTtcbiAgICBzcHJpdGVMYWJlbCA9IFwibGllXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgaG9sZFRpbWUgPSA1MDtcbn1cblxuZXhwb3J0IGNsYXNzIFdhbGxIYW5nTGVmdFN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMud2FsbEhhbmdMZWZ0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxsZ3JhYlwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgaG9sZFRpbWUgPSA1MDtcbn1cblxuZXhwb3J0IGNsYXNzIExhbmRTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmxhbmQ7XG4gICAgc3ByaXRlTGFiZWwgPSBcImxhbmRcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgIGhvbGRUaW1lID0gMTA7XG59XG5cbmV4cG9ydCBjbGFzcyBTd2lwZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuc3dpcGU7XG4gICAgc3ByaXRlTGFiZWwgPSBcInN3aXBlXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubmF0dXJhbDtcbiAgICBob2xkVGltZSA9IDEwO1xufVxuXG5leHBvcnQgY2xhc3MgSWRsZVdpdGhCYWxsU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5pZGxlV2l0aEJhbGw7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndpdGhfYmFsbFwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgaG9sZFRpbWUgPSAzMDtcbn1cblxuZXhwb3J0IGNsYXNzIFdhbGtSaWdodFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy53YWxrUmlnaHQ7XG4gICAgcGV0OiBJUGV0VHlwZTtcbiAgICBza2lwU3BlZWQgPSAzO1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgbGVmdEJvdW5kYXJ5OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XG4gICAgICAgIHRoaXMubGVmdEJvdW5kYXJ5ID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aCAqIDAuOTUpO1xuICAgICAgICB0aGlzLnBldCA9IHBldDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSArIHRoaXMuc2tpcFNwZWVkKTtcbiAgICAgICAgaWYgKHRoaXMucGV0LmxlZnQoKSA+PSB0aGlzLmxlZnRCb3VuZGFyeSAtIHRoaXMucGV0LndpZHRoKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdhbGtMZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLndhbGtMZWZ0O1xuICAgIHNraXBTcGVlZCA9IDM7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgIHBldDogSVBldFR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkxlZnQodGhpcy5wZXQubGVmdCgpIC0gdGhpcy5za2lwU3BlZWQpO1xuICAgICAgICBpZiAodGhpcy5wZXQubGVmdCgpIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJ1blJpZ2h0U3RhdGUgZXh0ZW5kcyBXYWxrUmlnaHRTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMucnVuUmlnaHQ7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtfZmFzdFwiO1xuICAgIHNraXBTcGVlZCA9IDU7XG59XG5cbmV4cG9ydCBjbGFzcyBSdW5MZWZ0U3RhdGUgZXh0ZW5kcyBXYWxrTGVmdFN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5ydW5MZWZ0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcbiAgICBza2lwU3BlZWQgPSA1O1xufVxuXG5leHBvcnQgY2xhc3MgQ2hhc2VTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuY2hhc2U7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwicnVuXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBiYWxsU3RhdGU6IEJhbGxTdGF0ZTtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHBldDogSVBldFR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlLCBiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudClcbiAgICB7XG4gICAgICAgIHRoaXMucGV0ID0gcGV0O1xuICAgICAgICB0aGlzLmJhbGxTdGF0ZSA9IGJhbGxTdGF0ZTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIGlmICh0aGlzLmJhbGxTdGF0ZS5wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNhbmNlbDsgLy8gQmFsbCBpcyBhbHJlYWR5IGNhdWdodFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBldC5sZWZ0KCkgPiB0aGlzLmJhbGxTdGF0ZS5jeCkge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgICAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSAtIHRoaXMuc2tpcFNwZWVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkxlZnQodGhpcy5wZXQubGVmdCgpICsgdGhpcy5za2lwU3BlZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuYmFsbFN0YXRlLmN5IDwgdGhpcy5wZXQud2lkdGgoKSAmJiB0aGlzLmJhbGxTdGF0ZS5jeCA8IHRoaXMucGV0LmxlZnQoKSAmJiB0aGlzLnBldC5sZWZ0KCkgPCB0aGlzLmJhbGxTdGF0ZS5jeCArIDE1KSB7XG4gICAgICAgICAgICAvLyBoaWRlIGJhbGxcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuYmFsbFN0YXRlLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDbGltYldhbGxMZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmNsaW1iV2FsbExlZnQ7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwid2FsbGNsaW1iXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSkge1xuICAgICAgICB0aGlzLnBldCA9IHBldDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgdGhpcy5wZXQucG9zaXRpb25Cb3R0b20odGhpcy5wZXQuYm90dG9tKCkgKyAxKTtcbiAgICAgICAgaWYgKHRoaXMucGV0LmJvdHRvbSgpID49IDEwMCkge1xuICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEp1bXBEb3duTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5qdW1wRG93bkxlZnQ7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwiZmFsbF9mcm9tX2dyYWJcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSkge1xuICAgICAgICB0aGlzLnBldCA9IHBldDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgdGhpcy5wZXQucG9zaXRpb25Cb3R0b20odGhpcy5wZXQuYm90dG9tKCkgLSA1KTtcbiAgICAgICAgaWYgKHRoaXMucGV0LmJvdHRvbSgpIDw9IHRoaXMucGV0LmZsb29yKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGV0LnBvc2l0aW9uQm90dG9tKHRoaXMucGV0LmZsb29yKCkpO1xuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XG4gICAgICAgIH0gICBcbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIFRoaXMgc2NyaXB0IHdpbGwgYmUgcnVuIHdpdGhpbiB0aGUgd2VidmlldyBpdHNlbGZcbmltcG9ydCB7IFBldFNpemUsIFBldENvbG9yLCBQZXRUeXBlLCBUaGVtZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVBldCwgSVBldFR5cGV9IGZyb20gJy4vcGV0cyc7XG5pbXBvcnQgeyBCYWxsU3RhdGUsIFBldFBhbmVsU3RhdGUgfSBmcm9tICcuL3N0YXRlcyc7XG5cbi8qIFRoaXMgaXMgaG93IHRoZSBWUyBDb2RlIEFQSSBjYW4gYmUgaW52b2tlZCBmcm9tIHRoZSBwYW5lbCAqL1xuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgVnNjb2RlU3RhdGVBcGkgeyBcbiAgICBnZXRTdGF0ZSgpIDogUGV0UGFuZWxTdGF0ZTsgLy8gQVBJIGlzIGFjdHVhbGx5IEFueSwgYnV0IHdlIHdhbnQgaXQgdG8gYmUgdHlwZWQuXG4gICAgc2V0U3RhdGUoc3RhdGU6IFBldFBhbmVsU3RhdGUpOiB2b2lkO1xuICB9XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIGFjcXVpcmVWc0NvZGVBcGkoKTogVnNjb2RlU3RhdGVBcGk7XG4gIH1cbn1cblxuY29uc3QgdnNjb2RlID0gd2luZG93LmFjcXVpcmVWc0NvZGVBcGkoKTtcblxuY2xhc3MgUGV0RWxlbWVudCB7XG4gIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xuICBjb2xsaXNpb246IEhUTUxEaXZFbGVtZW50O1xuICBwZXQ6IElQZXRUeXBlO1xuICBjb2xvcjogUGV0Q29sb3I7XG4gIHR5cGU6IFBldFR5cGU7XG5cbiAgY29uc3RydWN0b3IoZWw6IEhUTUxJbWFnZUVsZW1lbnQsIGNvbGxpc2lvbjogSFRNTERpdkVsZW1lbnQsIHBldDogSVBldFR5cGUsIGNvbG9yOiBQZXRDb2xvciwgdHlwZTogUGV0VHlwZSl7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuY29sbGlzaW9uID0gY29sbGlzaW9uO1xuICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG59XG5cbnZhciBhbGxQZXRzOiBBcnJheTxQZXRFbGVtZW50PiA9IG5ldyBBcnJheSgwKTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlQmFsbFJhZGl1cyhzaXplOiBQZXRTaXplKTogbnVtYmVye1xuICBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5uYW5vKXtcbiAgICByZXR1cm4gMjtcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLm1lZGl1bSl7XG4gICAgcmV0dXJuIDQ7XG4gIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5sYXJnZSl7XG4gICAgcmV0dXJuIDg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDE7IC8vIFNocnVnXG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTW91c2VPdmVyKGU6IE1vdXNlRXZlbnQpe1xuICB2YXIgZWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIGFsbFBldHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBpZiAoZWxlbWVudC5jb2xsaXNpb24gPT09IGVsKXtcbiAgICAgIGlmICghZWxlbWVudC5wZXQuY2FuU3dpcGUoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbGVtZW50LnBldC5zd2lwZSgpO1xuICAgIH1cbiAgfSk7XG4gIFxufVxuXG5mdW5jdGlvbiBzdGFydEFuaW1hdGlvbnMoY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudCwgcGV0OiBJUGV0VHlwZSkge1xuICBjb2xsaXNpb24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBoYW5kbGVNb3VzZU92ZXIpO1xuICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgcGV0Lm5leHRGcmFtZSgpO1xuICAgIHNhdmVTdGF0ZSgpO1xuICB9LCAxMDApO1xufVxuXG5mdW5jdGlvbiBhZGRQZXRUb1BhbmVsKHBldFR5cGU6IFBldFR5cGUsIGJhc2VQZXRVcmk6IHN0cmluZywgcGV0Q29sb3I6IFBldENvbG9yLCBwZXRTaXplOiBQZXRTaXplLCBsZWZ0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBmbG9vcjogbnVtYmVyKTogUGV0RWxlbWVudCB7XG4gIHZhciBwZXRTcHJpdGVFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgcGV0U3ByaXRlRWxlbWVudC5jbGFzc05hbWUgPSBcInBldFwiO1xuXG4gIHZhciBjb2xsaXNpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbGxpc2lvbkVsZW1lbnQuY2xhc3NOYW1lID0gXCJjb2xsaXNpb25cIjtcblxuICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXRzQ29udGFpbmVyXCIpIGFzIEhUTUxEaXZFbGVtZW50KS5hcHBlbmRDaGlsZChwZXRTcHJpdGVFbGVtZW50KTtcbiAgY29uc3Qgcm9vdCA9IGJhc2VQZXRVcmkgKyAnLycgKyBwZXRUeXBlICsgJy8nICsgcGV0Q29sb3I7XG4gIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgbmV3IHBldCA6IFwiLCBwZXRUeXBlLCByb290KTtcbiAgdmFyIG5ld1BldCA9IGNyZWF0ZVBldChwZXRUeXBlLCBwZXRTcHJpdGVFbGVtZW50LCBjb2xsaXNpb25FbGVtZW50LCBwZXRTaXplLCBsZWZ0LCBib3R0b20sIHJvb3QsIGZsb29yKTtcbiAgc3RhcnRBbmltYXRpb25zKGNvbGxpc2lvbkVsZW1lbnQsIG5ld1BldCk7XG4gIHJldHVybiBuZXcgUGV0RWxlbWVudChwZXRTcHJpdGVFbGVtZW50LCBjb2xsaXNpb25FbGVtZW50LCBuZXdQZXQsIHBldENvbG9yLCBwZXRUeXBlKTtcbn1cblxuZnVuY3Rpb24gc2F2ZVN0YXRlKCl7XG4gIHZhciBzdGF0ZSA9IG5ldyBQZXRQYW5lbFN0YXRlKCk7XG4gIHN0YXRlLnBldFN0YXRlcyA9IG5ldyBBcnJheSgpO1xuXG4gIGFsbFBldHMuZm9yRWFjaChwZXRJdGVtID0+IHtcbiAgICBzdGF0ZS5wZXRTdGF0ZXMhLnB1c2goe1xuICAgICAgcGV0Q29sb3I6IHBldEl0ZW0uY29sb3IsXG4gICAgICBwZXRUeXBlOiBwZXRJdGVtLnR5cGUsXG4gICAgICBwZXRTdGF0ZTogcGV0SXRlbS5wZXQuZ2V0U3RhdGUoKSxcbiAgICAgIGVsTGVmdDogcGV0SXRlbS5lbC5zdHlsZS5sZWZ0LFxuICAgICAgZWxCb3R0b206IHBldEl0ZW0uZWwuc3R5bGUuYm90dG9tXG4gICAgfSk7XG4gIH0pO1xuICB2c2NvZGUuc2V0U3RhdGUoc3RhdGUpO1xufVxuXG5mdW5jdGlvbiByZWNvdmVyU3RhdGUoYmFzZVBldFVyaTogc3RyaW5nLCBwZXRTaXplOiBQZXRTaXplLCBmbG9vcjogbnVtYmVyKXtcbiAgdmFyIHN0YXRlID0gdnNjb2RlLmdldFN0YXRlKCk7XG4gIHN0YXRlLnBldFN0YXRlcyEuZm9yRWFjaChwID0+IHtcbiAgICB2YXIgbmV3UGV0ID0gYWRkUGV0VG9QYW5lbChwLnBldFR5cGUhLCBiYXNlUGV0VXJpLCBwLnBldENvbG9yISwgcGV0U2l6ZSwgcGFyc2VJbnQocC5lbExlZnQhKSwgcGFyc2VJbnQocC5lbEJvdHRvbSEpLCBmbG9vcik7XG4gICAgbmV3UGV0LnBldC5yZWNvdmVyU3RhdGUocC5wZXRTdGF0ZSEpO1xuICAgIGFsbFBldHMucHVzaChuZXdQZXQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmFuZG9tU3RhcnRQb3NpdGlvbigpIDogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAqIDAuNykpO1xufVxuXG5sZXQgY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQsIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG5mdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuICBjYW52YXMgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXRDYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQpO1xuICBjdHggPSAoY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICBjdHguY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGN0eC5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xufVxuXG4vLyBJdCBjYW5ub3QgYWNjZXNzIHRoZSBtYWluIFZTIENvZGUgQVBJcyBkaXJlY3RseS5cbmV4cG9ydCBmdW5jdGlvbiBwZXRQYW5lbEFwcChiYXNlUGV0VXJpOiBzdHJpbmcsIHRoZW1lOiBUaGVtZSwgcGV0Q29sb3I6IFBldENvbG9yLCBwZXRTaXplOiBQZXRTaXplLCBwZXRUeXBlOiBQZXRUeXBlKSB7XG4gIGNvbnN0IGJhbGxSYWRpdXM6IG51bWJlciA9IGNhbGN1bGF0ZUJhbGxSYWRpdXMocGV0U2l6ZSk7XG4gIHZhciBmbG9vciA9IDA7XG4gIC8vIEFwcGx5IFRoZW1lIGJhY2tncm91bmRzXG4gIGlmICh0aGVtZSAhPT0gVGhlbWUubm9uZSl7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCcke2Jhc2VQZXRVcml9L2JhY2tncm91bmRzLyR7dGhlbWV9L2JhY2tncm91bmQucG5nJylgO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWdyb3VuZFwiKSEuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtiYXNlUGV0VXJpfS9iYWNrZ3JvdW5kcy8ke3RoZW1lfS9mb3JlZ3JvdW5kLnBuZycpYDtcbiAgICBmbG9vciA9IDMwOyAvLyBUaGVtZXMgaGF2ZSBwZXRzIGF0IGEgc3BlY2lmaWVkIGhlaWdodCAoMzBweClcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwiXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JlZ3JvdW5kXCIpIS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIlwiO1xuICB9XG5cbiAgLy8vIEJvdW5jaW5nIGJhbGwgY29tcG9uZW50cywgY3JlZGl0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yOTk4MjM0M1xuICBjb25zdCBncmF2aXR5OiBudW1iZXIgPSAwLjIsIGRhbXBpbmc6IG51bWJlciA9IDAuOSwgdHJhY3Rpb246IG51bWJlciA9IDAuODtcbiAgdmFyIGJhbGxTdGF0ZTogQmFsbFN0YXRlO1xuXG4gIGZ1bmN0aW9uIHJlc2V0QmFsbCgpIHtcbiAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBiYWxsU3RhdGUgPSBuZXcgQmFsbFN0YXRlKDEwMCwgMTAwLCAyLCA1KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRocm93QmFsbCgpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgaWYgKCFiYWxsU3RhdGUucGF1c2VkKSB7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRocm93QmFsbCk7fVxuXG4gICAgaWYgKGJhbGxTdGF0ZS5jeCArIGJhbGxSYWRpdXMgPj0gY2FudmFzLndpZHRoKSB7XG4gICAgICBiYWxsU3RhdGUudnggPSAtYmFsbFN0YXRlLnZ4ICogZGFtcGluZztcbiAgICAgIGJhbGxTdGF0ZS5jeCA9IGNhbnZhcy53aWR0aCAtIGJhbGxSYWRpdXM7XG4gICAgfSBlbHNlIGlmIChiYWxsU3RhdGUuY3ggLSBiYWxsUmFkaXVzIDw9IDApIHtcbiAgICAgIGJhbGxTdGF0ZS52eCA9IC1iYWxsU3RhdGUudnggKiBkYW1waW5nO1xuICAgICAgYmFsbFN0YXRlLmN4ID0gYmFsbFJhZGl1cztcbiAgICB9XG4gICAgaWYgKGJhbGxTdGF0ZS5jeSArIGJhbGxSYWRpdXMgPj0gKGNhbnZhcy5oZWlnaHQpKSB7XG4gICAgICBiYWxsU3RhdGUudnkgPSAtYmFsbFN0YXRlLnZ5ICogZGFtcGluZztcbiAgICAgIGJhbGxTdGF0ZS5jeSA9IGNhbnZhcy5oZWlnaHQgLSBiYWxsUmFkaXVzO1xuICAgICAgLy8gdHJhY3Rpb24gaGVyZVxuICAgICAgYmFsbFN0YXRlLnZ4ICo9IHRyYWN0aW9uO1xuICAgIH0gZWxzZSBpZiAoYmFsbFN0YXRlLmN5IC0gYmFsbFJhZGl1cyA8PSBmbG9vcikge1xuICAgICAgYmFsbFN0YXRlLnZ5ID0gLWJhbGxTdGF0ZS52eSAqIGRhbXBpbmc7XG4gICAgICBiYWxsU3RhdGUuY3kgPSBiYWxsUmFkaXVzO1xuICAgIH1cblxuICAgIGJhbGxTdGF0ZS52eSArPSBncmF2aXR5O1xuXG4gICAgYmFsbFN0YXRlLmN4ICs9IGJhbGxTdGF0ZS52eDtcbiAgICBiYWxsU3RhdGUuY3kgKz0gYmFsbFN0YXRlLnZ5O1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoYmFsbFN0YXRlLmN4LCBiYWxsU3RhdGUuY3ksIGJhbGxSYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzJlZDg1MVwiO1xuICAgIGN0eC5maWxsKCk7XG4gIH1cblxuICBjb25zb2xlLmxvZygnU3RhcnRpbmcgcGV0IHNlc3Npb24nLCBwZXRDb2xvciwgYmFzZVBldFVyaSwgcGV0VHlwZSk7XG4gIC8vIE5ldyBzZXNzaW9uXG4gIHZhciBzdGF0ZSA9IHZzY29kZS5nZXRTdGF0ZSgpO1xuICBpZiAoIXN0YXRlKSB7XG4gICAgY29uc29sZS5sb2coJ05vIHN0YXRlLCBzdGFydGluZyBhIG5ldyBzZXNzaW9uLicpO1xuICAgIGFsbFBldHMucHVzaChhZGRQZXRUb1BhbmVsKHBldFR5cGUsIGJhc2VQZXRVcmksIHBldENvbG9yLCBwZXRTaXplLCByYW5kb21TdGFydFBvc2l0aW9uKCksIGZsb29yLCBmbG9vcikpO1xuICAgIHNhdmVTdGF0ZSgpO1xuICB9IGVsc2UgeyBcbiAgICBjb25zb2xlLmxvZygnUmVjb3ZlcmluZyBzdGF0ZSAtICcsIHN0YXRlKTtcbiAgICByZWNvdmVyU3RhdGUoYmFzZVBldFVyaSwgcGV0U2l6ZSwgZmxvb3IpO1xuICB9XG5cbiAgaW5pdENhbnZhcygpO1xuXG4gIC8vIEhhbmRsZSBtZXNzYWdlcyBzZW50IGZyb20gdGhlIGV4dGVuc2lvbiB0byB0aGUgd2Vidmlld1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGV2ZW50LmRhdGE7IC8vIFRoZSBqc29uIGRhdGEgdGhhdCB0aGUgZXh0ZW5zaW9uIHNlbnRcbiAgICBzd2l0Y2ggKG1lc3NhZ2UuY29tbWFuZCkge1xuICAgICAgY2FzZSBcInRocm93LWJhbGxcIjpcbiAgICAgICAgcmVzZXRCYWxsKCk7XG4gICAgICAgIHRocm93QmFsbCgpO1xuICAgICAgICBhbGxQZXRzLmZvckVhY2gocGV0RWwgPT4ge1xuICAgICAgICAgIGlmIChwZXRFbC5wZXQuY2FuQ2hhc2UoKSl7XG4gICAgICAgICAgICBwZXRFbC5wZXQuY2hhc2UoYmFsbFN0YXRlLCBjYW52YXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNwYXduLXBldFwiOlxuICAgICAgICBhbGxQZXRzLnB1c2goYWRkUGV0VG9QYW5lbChtZXNzYWdlLnR5cGUsIGJhc2VQZXRVcmksIG1lc3NhZ2UuY29sb3IsIHBldFNpemUsIHJhbmRvbVN0YXJ0UG9zaXRpb24oKSwgZmxvb3IsIGZsb29yKSk7XG4gICAgICAgIHNhdmVTdGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyZXNldC1wZXRcIjpcbiAgICAgICAgYWxsUGV0cy5mb3JFYWNoKHBldCA9PiBwZXQuZWwucmVtb3ZlKCkpO1xuICAgICAgICBhbGxQZXRzID0gW107XG4gICAgICAgIGFsbFBldHMucHVzaChhZGRQZXRUb1BhbmVsKG1lc3NhZ2UudHlwZSwgYmFzZVBldFVyaSwgbWVzc2FnZS5jb2xvciwgbWVzc2FnZS5zaXplLCByYW5kb21TdGFydFBvc2l0aW9uKCksIGZsb29yLCBmbG9vcikpO1xuICAgICAgICBzYXZlU3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcblxufTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gIGluaXRDYW52YXMoKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==