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
    }
    ;
    positionLeft(left) {
        this._left = left;
        this.el.style.left = `${this._left}px`;
        this.el.style.left = `${this._left}px`;
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
        this.label = "rubber duck";
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
    else if (petType === "rubber duck") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvcGV0cy50cyIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvc3RhdGVzLnRzIiwid2VicGFjazovL3BldEFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUEsOEVBQXVKO0FBRXZKLE1BQWEscUJBQXFCO0NBRWpDO0FBRkQsc0RBRUM7QUFrQkQsU0FBUyxvQkFBb0IsQ0FBQyxJQUFhO0lBQ3ZDLElBQUksSUFBSSxzQkFBaUIsRUFBQztRQUN4QixPQUFPLEVBQUUsQ0FBQztLQUNYO1NBQU0sSUFBSSxJQUFJLDBCQUFtQixFQUFDO1FBQ2pDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTSxJQUFJLElBQUksd0JBQWtCLEVBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7S0FDWjtTQUFNO1FBQ0wsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRO0tBQ3BCO0FBQ0gsQ0FBQztBQUVILE1BQWUsV0FBVztJQWN0QixZQUFZLGFBQStCLEVBQUUsZ0JBQWdDLEVBQUUsSUFBYSxFQUFFLElBQVksRUFBRSxNQUFjLEVBQUUsT0FBZSxFQUFFLEtBQWE7UUFiMUosVUFBSyxHQUFXLE1BQU0sQ0FBQztRQUN2QixhQUFRLEdBQWtCLEVBQUUsYUFBYSwwQkFBZ0IsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFhM0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0s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YUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN4SCxTQUFTLEVBQUUsQ0FBQztnQkFDWixNQUFNO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUM7QUE5RkQsa0NBOEZDO0FBQUEsQ0FBQztBQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7SUFDaEMsVUFBVSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBldFNpemUgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGVzXCI7XG5pbXBvcnQgeyBJU2VxdWVuY2VUcmVlIH0gZnJvbSBcIi4vc2VxdWVuY2VzXCI7XG5pbXBvcnQgeyBJU3RhdGUsIFN0YXRlcywgcmVzb2x2ZVN0YXRlLCBIb3Jpem9udGFsRGlyZWN0aW9uLCBDaGFzZVN0YXRlLCBCYWxsU3RhdGUsIEZyYW1lUmVzdWx0LCBQZXRJbnN0YW5jZVN0YXRlLCBpc1N0YXRlQWJvdmVHcm91bmQgfSBmcm9tIFwiLi9zdGF0ZXNcIjtcblxuZXhwb3J0IGNsYXNzIEludmFsaWRTdGF0ZUV4Y2VwdGlvbiB7XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGV0VHlwZSB7XG4gICAgY2FuU3dpcGUoKTogYm9vbGVhblxuICAgIGNhbkNoYXNlKCk6IGJvb2xlYW5cbiAgICBzd2lwZSgpOiB2b2lkXG4gICAgY2hhc2UoYmFsbFN0YXRlOiBCYWxsU3RhdGUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkXG4gICAgbmV4dEZyYW1lKCk6IHZvaWRcbiAgICBnZXRTdGF0ZSgpOiBQZXRJbnN0YW5jZVN0YXRlXG4gICAgcmVjb3ZlclN0YXRlKHN0YXRlOiBQZXRJbnN0YW5jZVN0YXRlKTogdm9pZFxuICAgIGJvdHRvbSgpOiBudW1iZXI7XG4gICAgbGVmdCgpOiBudW1iZXI7XG4gICAgcG9zaXRpb25Cb3R0b20oYm90dG9tOiBudW1iZXIpOiB2b2lkO1xuICAgIHBvc2l0aW9uTGVmdChsZWZ0OiBudW1iZXIpOiB2b2lkO1xuICAgIHdpZHRoKCk6IG51bWJlcjtcbiAgICBmbG9vcigpOiBudW1iZXI7XG59IFxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTcHJpdGVXaWR0aChzaXplOiBQZXRTaXplKTogbnVtYmVye1xuICAgIGlmIChzaXplID09PSBQZXRTaXplLm5hbm8pe1xuICAgICAgcmV0dXJuIDMwO1xuICAgIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5tZWRpdW0pe1xuICAgICAgcmV0dXJuIDU1O1xuICAgIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5sYXJnZSl7XG4gICAgICByZXR1cm4gMTEwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMzA7IC8vIFNocnVnXG4gICAgfVxuICB9XG5cbmFic3RyYWN0IGNsYXNzIEJhc2VQZXRUeXBlIGltcGxlbWVudHMgSVBldFR5cGUge1xuICAgIGxhYmVsOiBzdHJpbmcgPSBcImJhc2VcIjtcbiAgICBzZXF1ZW5jZTogSVNlcXVlbmNlVHJlZSA9IHsgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsIHNlcXVlbmNlU3RhdGVzOiBbXX07XG4gICAgY3VycmVudFN0YXRlOiBJU3RhdGU7XG4gICAgY3VycmVudFN0YXRlRW51bTogU3RhdGVzO1xuICAgIGhvbGRTdGF0ZTogSVN0YXRlIHwgdW5kZWZpbmVkO1xuICAgIGhvbGRTdGF0ZUVudW06IFN0YXRlcyB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHByaXZhdGUgY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIF9sZWZ0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYm90dG9tOiBudW1iZXI7XG4gICAgcGV0Um9vdDogc3RyaW5nO1xuICAgIF9mbG9vcjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgY29sbGlzaW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQsIHNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHBldFJvb3Q6IHN0cmluZywgZmxvb3I6IG51bWJlcil7XG4gICAgICAgIHRoaXMuZWwgPSBzcHJpdGVFbGVtZW50O1xuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGNvbGxpc2lvbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMucGV0Um9vdCA9IHBldFJvb3Q7XG4gICAgICAgIHRoaXMuX2Zsb29yID0gZmxvb3I7XG4gICAgICAgIHRoaXMuX2xlZnQgPSBsZWZ0O1xuICAgICAgICB0aGlzLl9ib3R0b20gPSBib3R0b207XG4gICAgICAgIHRoaXMuaW5pdFNwcml0ZShzaXplLCBsZWZ0LCBib3R0b20pO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSB0aGlzLnNlcXVlbmNlLnN0YXJ0aW5nU3RhdGU7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSwgdGhpcyk7XG4gICAgfVxuXG4gICAgaW5pdFNwcml0ZShwZXRTaXplOiBQZXRTaXplLCBsZWZ0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke2xlZnR9cHhgO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke2JvdHRvbX1weGA7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5tYXhXaWR0aCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtjYWxjdWxhdGVTcHJpdGVXaWR0aChwZXRTaXplKX1weGA7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuYm90dG9tID0gYCR7Ym90dG9tfXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUud2lkdGggPSBgJHt0aGlzLmVsLm9mZnNldFdpZHRofXB4YDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb24uc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5lbC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgICAgfVxuXG4gICAgbGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcbiAgICB9XG5cbiAgICBib3R0b20oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdHRvbTtcbiAgICB9XG5cbiAgICBwb3NpdGlvbkJvdHRvbShib3R0b206IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLl9ib3R0b219cHhgO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuX2JvdHRvbX1weGA7XG4gICAgfTtcblxuICAgIHBvc2l0aW9uTGVmdChsZWZ0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3RoaXMuX2xlZnR9cHhgO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHt0aGlzLl9sZWZ0fXB4YDtcbiAgICB9XG5cbiAgICB3aWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC53aWR0aDtcbiAgICB9XG5cbiAgICBmbG9vcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmxvb3I7XG4gICAgfVxuXG4gICAgZ2V0U3RhdGUoKTogUGV0SW5zdGFuY2VTdGF0ZSB7IFxuICAgICAgICByZXR1cm4ge2N1cnJlbnRTdGF0ZUVudW06IHRoaXMuY3VycmVudFN0YXRlRW51bX07XG4gICAgfVxuXG4gICAgcmVjb3ZlclN0YXRlKHN0YXRlOiBQZXRJbnN0YW5jZVN0YXRlKXtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gc3RhdGUuY3VycmVudFN0YXRlRW51bSE7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSwgdGhpcyk7XG4gICAgICAgIGlmICghaXNTdGF0ZUFib3ZlR3JvdW5kKHRoaXMuY3VycmVudFN0YXRlRW51bSkpe1xuICAgICAgICAgICAgLy8gUmVzZXQgdGhlIGJvdHRvbSBvZiB0aGUgc3ByaXRlIHRvIHRoZSBmbG9vciBhcyB0aGUgdGhlbWVcbiAgICAgICAgICAgIC8vIGhhcyBsaWtlbHkgY2hhbmdlZC5cbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25Cb3R0b20odGhpcy5mbG9vcigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhblN3aXBlKCl7XG4gICAgICAgIHJldHVybiAhaXNTdGF0ZUFib3ZlR3JvdW5kKHRoaXMuY3VycmVudFN0YXRlRW51bSk7XG4gICAgfVxuXG4gICAgY2FuQ2hhc2UoKXtcbiAgICAgICAgcmV0dXJuICFpc1N0YXRlQWJvdmVHcm91bmQodGhpcy5jdXJyZW50U3RhdGVFbnVtKTtcbiAgICB9XG5cbiAgICBzd2lwZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLnN3aXBlKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLmhvbGRTdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlO1xuICAgICAgICB0aGlzLmhvbGRTdGF0ZUVudW0gPSB0aGlzLmN1cnJlbnRTdGF0ZUVudW07XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IFN0YXRlcy5zd2lwZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCB0aGlzKTtcbiAgICB9XG4gICAgXG4gICAgY2hhc2UoYmFsbFN0YXRlOiBCYWxsU3RhdGUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gU3RhdGVzLmNoYXNlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IG5ldyBDaGFzZVN0YXRlKHRoaXMsIGJhbGxTdGF0ZSwgY2FudmFzKTtcbiAgICB9XG5cbiAgICBmYWNlTGVmdCgpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcInNjYWxlWCgtMSlcIjtcbiAgICB9XG5cbiAgICBmYWNlUmlnaHQoKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZVgoMSlcIjtcbiAgICB9XG5cbiAgICBzZXRBbmltYXRpb24oZmFjZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IG5ld0ZhY2U6IHN0cmluZyA9IGAke3RoaXMucGV0Um9vdH1fJHtmYWNlfV84ZnBzLmdpZmA7XG4gICAgICAgIGlmICh0aGlzLmVsLnNyYyA9PT0gbmV3RmFjZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWwuc3JjID0gbmV3RmFjZTtcbiAgICB9XG5cbiAgICBjaG9vc2VOZXh0U3RhdGUoZnJvbVN0YXRlOiBTdGF0ZXMpOiBTdGF0ZXMge1xuICAgICAgICAvLyBXb3JrIG91dCBuZXh0IHN0YXRlXG4gICAgICAgIHZhciBwb3NzaWJsZU5leHRTdGF0ZXM6IFN0YXRlc1tdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCB0aGlzLnNlcXVlbmNlLnNlcXVlbmNlU3RhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlc1tpXS5zdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzID0gdGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlc1tpXS5wb3NzaWJsZU5leHRTdGF0ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwb3NzaWJsZU5leHRTdGF0ZXMpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTdGF0ZUV4Y2VwdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJhbmRvbWx5IGNob29zZSB0aGUgbmV4dCBzdGF0ZVxuICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZU5leHRTdGF0ZXMubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlTmV4dFN0YXRlc1tpZHhdO1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdCkge1xuICAgICAgICAgICAgdGhpcy5mYWNlTGVmdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFN0YXRlLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjZVJpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24odGhpcy5jdXJyZW50U3RhdGUuc3ByaXRlTGFiZWwpO1xuICAgICAgICB2YXIgZnJhbWVSZXN1bHQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5uZXh0RnJhbWUoKTtcbiAgICAgICAgaWYgKGZyYW1lUmVzdWx0ID09PSBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBJZiByZWNvdmVyaW5nIGZyb20gc3dpcGUuLlxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZFN0YXRlICYmIHRoaXMuaG9sZFN0YXRlRW51bSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmhvbGRTdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSB0aGlzLmhvbGRTdGF0ZUVudW07XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkU3RhdGVFbnVtID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5leHRTdGF0ZSA9IHRoaXMuY2hvb3NlTmV4dFN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZShuZXh0U3RhdGUsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gbmV4dFN0YXRlO1xuICAgICAgICB9IGVsc2UgaWYgKGZyYW1lUmVzdWx0ID09PSBGcmFtZVJlc3VsdC5zdGF0ZUNhbmNlbCl7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuY2hhc2UpIHsgLy8gQ3VycmVudGx5IHRoZSBvbmx5IG9uZSBhbnl3YXlcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5jaG9vc2VOZXh0U3RhdGUoU3RhdGVzLmlkbGVXaXRoQmFsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUobmV4dFN0YXRlLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBuZXh0U3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIENhdCBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwiY2F0XCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2xpbWJXYWxsTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2FsbEhhbmdMZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGxIYW5nTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuanVtcERvd25MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmp1bXBEb3duTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMubGFuZF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5sYW5kLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBEb2cgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XG4gICAgbGFiZWwgPSBcImRvZ1wiO1xuICAgIHNlcXVlbmNlID0ge1xuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0LCBTdGF0ZXMubGllXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmxpZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmxpZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMubGllXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgU25ha2UgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XG4gICAgbGFiZWwgPSBcInNuYWtlXCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgQ2xpcHB5IGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJjbGlwcHlcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBSdWJiZXJEdWNrIGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJydWJiZXIgZHVja1wiO1xuICAgIHNlcXVlbmNlID0ge1xuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIEludmFsaWRQZXRFeGNlcHRpb24ge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGV0KHBldFR5cGU6IHN0cmluZywgZWw6IEhUTUxJbWFnZUVsZW1lbnQsIGNvbGxpc2lvbjogSFRNTERpdkVsZW1lbnQsIHNpemU6IFBldFNpemUsIGxlZnQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHBldFJvb3Q6IHN0cmluZywgZmxvb3I6IG51bWJlcikgOiBJUGV0VHlwZSB7XG4gICAgaWYgKHBldFR5cGUgPT09IFwiY2F0XCIpe1xuICAgICAgICByZXR1cm4gbmV3IENhdChlbCwgY29sbGlzaW9uLCBzaXplLCBsZWZ0LCBib3R0b20sIHBldFJvb3QsIGZsb29yKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJkb2dcIikge1xuICAgICAgICByZXR1cm4gbmV3IERvZyhlbCwgY29sbGlzaW9uLCBzaXplLCBsZWZ0LCBib3R0b20sIHBldFJvb3QsIGZsb29yKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJzbmFrZVwiKSB7XG4gICAgICAgIHJldHVybiBuZXcgU25ha2UoZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwiY2xpcHB5XCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGlwcHkoZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwicnViYmVyIGR1Y2tcIikge1xuICAgICAgICByZXR1cm4gbmV3IFJ1YmJlckR1Y2soZWwsIGNvbGxpc2lvbiwgc2l6ZSwgbGVmdCwgYm90dG9tLCBwZXRSb290LCBmbG9vcik7XG4gICAgfVxuICAgIHRocm93IG5ldyBJbnZhbGlkUGV0RXhjZXB0aW9uKCk7XG59XG5cbiIsImltcG9ydCB7IFBldENvbG9yLCBQZXRUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBlc1wiO1xuaW1wb3J0IHsgSVBldFR5cGUgfSBmcm9tIFwiLi9wZXRzXCI7XG5cbmV4cG9ydCBjbGFzcyBQZXRJbnN0YW5jZVN0YXRlIHtcbiAgICBjdXJyZW50U3RhdGVFbnVtOiBTdGF0ZXMgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQZXRFbGVtZW50U3RhdGUge1xuICAgIHBldFN0YXRlOiBQZXRJbnN0YW5jZVN0YXRlIHwgdW5kZWZpbmVkO1xuICAgIHBldFR5cGU6IFBldFR5cGUgfCB1bmRlZmluZWQ7XG4gICAgcGV0Q29sb3I6IFBldENvbG9yIHwgdW5kZWZpbmVkO1xuICAgIGVsTGVmdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGVsQm90dG9tOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQZXRQYW5lbFN0YXRlIHtcbiAgICBwZXRTdGF0ZXM6IEFycmF5PFBldEVsZW1lbnRTdGF0ZT4gfCB1bmRlZmluZWQ7XG59XG5cblxuZXhwb3J0IGVudW0gSG9yaXpvbnRhbERpcmVjdGlvbiB7XG4gICAgbGVmdCxcbiAgICByaWdodCxcbiAgICBuYXR1cmFsIC8vIE5vIGNoYW5nZSB0byBjdXJyZW50IGRpcmVjdGlvblxufVxuXG5leHBvcnQgY29uc3QgZW51bSBTdGF0ZXMge1xuICAgIHNpdElkbGUgPSBcInNpdC1pZGxlXCIsXG4gICAgd2Fsa1JpZ2h0ID0gXCJ3YWxrLXJpZ2h0XCIsXG4gICAgd2Fsa0xlZnQgPSBcIndhbGstbGVmdFwiLFxuICAgIHJ1blJpZ2h0ID0gXCJydW4tcmlnaHRcIixcbiAgICBydW5MZWZ0ID0gXCJydW4tbGVmdFwiLFxuICAgIGxpZSA9IFwibGllXCIsXG4gICAgd2FsbEhhbmdMZWZ0ID0gXCJ3YWxsLWhhbmctbGVmdFwiLFxuICAgIGNsaW1iV2FsbExlZnQgPSBcImNsaW1iLXdhbGwtbGVmdFwiLFxuICAgIGp1bXBEb3duTGVmdCA9IFwianVtcC1kb3duLWxlZnRcIixcbiAgICBsYW5kID0gXCJsYW5kXCIsXG4gICAgc3dpcGUgPSBcInN3aXBlXCIsXG4gICAgaWRsZVdpdGhCYWxsID0gXCJpZGxlLXdpdGgtYmFsbFwiLFxuICAgIGNoYXNlID0gXCJjaGFzZVwiXG59XG5cbmV4cG9ydCBlbnVtIEZyYW1lUmVzdWx0IHsgXG4gICAgc3RhdGVDb250aW51ZSxcbiAgICBzdGF0ZUNvbXBsZXRlLFxuICAgIC8vIFNwZWNpYWwgc3RhdGVzXG4gICAgc3RhdGVDYW5jZWxcbn1cblxuZXhwb3J0IGNsYXNzIEJhbGxTdGF0ZSB7XG4gICAgY3g6IG51bWJlcjtcbiAgICBjeTogbnVtYmVyO1xuICAgIHZ4OiBudW1iZXI7XG4gICAgdnk6IG51bWJlcjtcbiAgICBwYXVzZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihjeDogbnVtYmVyLCBjeTogbnVtYmVyLCB2eDogbnVtYmVyLCB2eTogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5jeCA9IGN4O1xuICAgICAgICB0aGlzLmN5ID0gY3k7XG4gICAgICAgIHRoaXMudnggPSB2eDtcbiAgICAgICAgdGhpcy52eSA9IHZ5O1xuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RhdGVBYm92ZUdyb3VuZChzdGF0ZTogU3RhdGVzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChzdGF0ZSA9PT0gU3RhdGVzLmNsaW1iV2FsbExlZnQgfHxcbiAgICAgICAgICAgIHN0YXRlID09PSBTdGF0ZXMuanVtcERvd25MZWZ0IHx8IFxuICAgICAgICAgICAgc3RhdGUgPT09IFN0YXRlcy5sYW5kIHx8XG4gICAgICAgICAgICBzdGF0ZSA9PT0gU3RhdGVzLndhbGxIYW5nTGVmdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlU3RhdGUoc3RhdGU6IHN0cmluZywgcGV0OiBJUGV0VHlwZSk6IElTdGF0ZSB7XG4gICAgc3dpdGNoKHN0YXRlKXtcbiAgICAgICAgY2FzZSBTdGF0ZXMuc2l0SWRsZTogcmV0dXJuIG5ldyBTaXRJZGxlU3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa1JpZ2h0OiByZXR1cm4gbmV3IFdhbGtSaWdodFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLndhbGtMZWZ0OiByZXR1cm4gbmV3IFdhbGtMZWZ0U3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMucnVuUmlnaHQ6IHJldHVybiBuZXcgUnVuUmlnaHRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5ydW5MZWZ0OiByZXR1cm4gbmV3IFJ1bkxlZnRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5saWU6IHJldHVybiBuZXcgTGllU3RhdGUocGV0KTtcbiAgICAgICAgY2FzZSBTdGF0ZXMud2FsbEhhbmdMZWZ0OiByZXR1cm4gbmV3IFdhbGxIYW5nTGVmdFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmNsaW1iV2FsbExlZnQ6IHJldHVybiBuZXcgQ2xpbWJXYWxsTGVmdFN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmp1bXBEb3duTGVmdDogcmV0dXJuIG5ldyBKdW1wRG93bkxlZnRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5sYW5kOiByZXR1cm4gbmV3IExhbmRTdGF0ZShwZXQpO1xuICAgICAgICBjYXNlIFN0YXRlcy5zd2lwZTogcmV0dXJuIG5ldyBTd2lwZVN0YXRlKHBldCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmlkbGVXaXRoQmFsbDogcmV0dXJuIG5ldyBJZGxlV2l0aEJhbGxTdGF0ZShwZXQpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFNpdElkbGVTdGF0ZShwZXQpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0ZSB7XG4gICAgbGFiZWw6IHN0cmluZ1xuICAgIHNwcml0ZUxhYmVsOiBzdHJpbmdcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uOiBIb3Jpem9udGFsRGlyZWN0aW9uXG4gICAgcGV0OiBJUGV0VHlwZTtcbiAgICBuZXh0RnJhbWUoKTogRnJhbWVSZXN1bHRcbn1cblxuY2xhc3MgQWJzdHJhY3RTdGF0aWNTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuc2l0SWRsZTtcbiAgICBpZGxlQ291bnRlcjogbnVtYmVyO1xuICAgIHNwcml0ZUxhYmVsID0gXCJpZGxlXCI7XG4gICAgaG9sZFRpbWUgPSA1MDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuICAgIFxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXQ6IElQZXRUeXBlKSB7XG4gICAgICAgIHRoaXMuaWRsZUNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLnBldCA9IHBldDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgdGhpcy5pZGxlQ291bnRlcisrO1xuICAgICAgICBpZiAodGhpcy5pZGxlQ291bnRlciA+IHRoaXMuaG9sZFRpbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNpdElkbGVTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLnNpdElkbGU7XG4gICAgc3ByaXRlTGFiZWwgPSBcImlkbGVcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcbiAgICBob2xkVGltZSA9IDUwO1xufVxuXG5leHBvcnQgY2xhc3MgTGllU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5saWU7XG4gICAgc3ByaXRlTGFiZWwgPSBcImxpZVwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xuICAgIGhvbGRUaW1lID0gNTA7XG59XG5cbmV4cG9ydCBjbGFzcyBXYWxsSGFuZ0xlZnRTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLndhbGxIYW5nTGVmdDtcbiAgICBzcHJpdGVMYWJlbCA9IFwid2FsbGdyYWJcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgIGhvbGRUaW1lID0gNTA7XG59XG5cbmV4cG9ydCBjbGFzcyBMYW5kU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5sYW5kO1xuICAgIHNwcml0ZUxhYmVsID0gXCJsYW5kXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBob2xkVGltZSA9IDEwO1xufVxuXG5leHBvcnQgY2xhc3MgU3dpcGVTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLnN3aXBlO1xuICAgIHNwcml0ZUxhYmVsID0gXCJzd2lwZVwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLm5hdHVyYWw7XG4gICAgaG9sZFRpbWUgPSAxMDtcbn1cblxuZXhwb3J0IGNsYXNzIElkbGVXaXRoQmFsbFN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuaWRsZVdpdGhCYWxsO1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3aXRoX2JhbGxcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgIGhvbGRUaW1lID0gMzA7XG59XG5cbmV4cG9ydCBjbGFzcyBXYWxrUmlnaHRTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMud2Fsa1JpZ2h0O1xuICAgIHBldDogSVBldFR5cGU7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwid2Fsa1wiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xuICAgIGxlZnRCb3VuZGFyeTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSkge1xuICAgICAgICB0aGlzLmxlZnRCb3VuZGFyeSA9IE1hdGguZmxvb3Iod2luZG93LmlubmVyV2lkdGggKiAwLjk1KTtcbiAgICAgICAgdGhpcy5wZXQgPSBwZXQ7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIHRoaXMucGV0LnBvc2l0aW9uTGVmdCh0aGlzLnBldC5sZWZ0KCkgKyB0aGlzLnNraXBTcGVlZCk7XG4gICAgICAgIGlmICh0aGlzLnBldC5sZWZ0KCkgPj0gdGhpcy5sZWZ0Qm91bmRhcnkgLSB0aGlzLnBldC53aWR0aCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXYWxrTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy53YWxrTGVmdDtcbiAgICBza2lwU3BlZWQgPSAzO1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSkge1xuICAgICAgICB0aGlzLnBldCA9IHBldDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSAtIHRoaXMuc2tpcFNwZWVkKTtcbiAgICAgICAgaWYgKHRoaXMucGV0LmxlZnQoKSA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSdW5SaWdodFN0YXRlIGV4dGVuZHMgV2Fsa1JpZ2h0U3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLnJ1blJpZ2h0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcbiAgICBza2lwU3BlZWQgPSA1O1xufVxuXG5leHBvcnQgY2xhc3MgUnVuTGVmdFN0YXRlIGV4dGVuZHMgV2Fsa0xlZnRTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMucnVuTGVmdDtcbiAgICBzcHJpdGVMYWJlbCA9IFwid2Fsa19mYXN0XCI7XG4gICAgc2tpcFNwZWVkID0gNTtcbn1cblxuZXhwb3J0IGNsYXNzIENoYXNlU3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmNoYXNlO1xuICAgIHNraXBTcGVlZCA9IDM7XG4gICAgc3ByaXRlTGFiZWwgPSBcInJ1blwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgYmFsbFN0YXRlOiBCYWxsU3RhdGU7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwZXQ6IElQZXRUeXBlO1xuXG4gICAgY29uc3RydWN0b3IocGV0OiBJUGV0VHlwZSwgYmFsbFN0YXRlOiBCYWxsU3RhdGUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpXG4gICAge1xuICAgICAgICB0aGlzLnBldCA9IHBldDtcbiAgICAgICAgdGhpcy5iYWxsU3RhdGUgPSBiYWxsU3RhdGU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICBpZiAodGhpcy5iYWxsU3RhdGUucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDYW5jZWw7IC8vIEJhbGwgaXMgYWxyZWFkeSBjYXVnaHRcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wZXQubGVmdCgpID4gdGhpcy5iYWxsU3RhdGUuY3gpIHtcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICAgICAgICAgIHRoaXMucGV0LnBvc2l0aW9uTGVmdCh0aGlzLnBldC5sZWZ0KCkgLSB0aGlzLnNraXBTcGVlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xuICAgICAgICAgICAgdGhpcy5wZXQucG9zaXRpb25MZWZ0KHRoaXMucGV0LmxlZnQoKSArIHRoaXMuc2tpcFNwZWVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLmJhbGxTdGF0ZS5jeSA8IHRoaXMucGV0LndpZHRoKCkgJiYgdGhpcy5iYWxsU3RhdGUuY3ggPCB0aGlzLnBldC5sZWZ0KCkgJiYgdGhpcy5wZXQubGVmdCgpIDwgdGhpcy5iYWxsU3RhdGUuY3ggKyAxNSkge1xuICAgICAgICAgICAgLy8gaGlkZSBiYWxsXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB0aGlzLmJhbGxTdGF0ZS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xpbWJXYWxsTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5jbGltYldhbGxMZWZ0O1xuICAgIHNraXBTcGVlZCA9IDM7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGxjbGltYlwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgcGV0OiBJUGV0VHlwZTtcblxuICAgIGNvbnN0cnVjdG9yKHBldDogSVBldFR5cGUpIHtcbiAgICAgICAgdGhpcy5wZXQgPSBwZXQ7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIHRoaXMucGV0LnBvc2l0aW9uQm90dG9tKHRoaXMucGV0LmJvdHRvbSgpICsgMSk7XG4gICAgICAgIGlmICh0aGlzLnBldC5ib3R0b20oKSA+PSAxMDApIHtcbiAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBKdW1wRG93bkxlZnRTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuanVtcERvd25MZWZ0O1xuICAgIHNraXBTcGVlZCA9IDM7XG4gICAgc3ByaXRlTGFiZWwgPSBcImZhbGxfZnJvbV9ncmFiXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgcGV0OiBJUGV0VHlwZTtcblxuICAgIGNvbnN0cnVjdG9yKHBldDogSVBldFR5cGUpIHtcbiAgICAgICAgdGhpcy5wZXQgPSBwZXQ7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIHRoaXMucGV0LnBvc2l0aW9uQm90dG9tKHRoaXMucGV0LmJvdHRvbSgpIC0gNSk7XG4gICAgICAgIGlmICh0aGlzLnBldC5ib3R0b20oKSA8PSB0aGlzLnBldC5mbG9vcigpKSB7XG4gICAgICAgICAgICB0aGlzLnBldC5wb3NpdGlvbkJvdHRvbSh0aGlzLnBldC5mbG9vcigpKTtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9ICAgXG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBUaGlzIHNjcmlwdCB3aWxsIGJlIHJ1biB3aXRoaW4gdGhlIHdlYnZpZXcgaXRzZWxmXG5pbXBvcnQgeyBQZXRTaXplLCBQZXRDb2xvciwgUGV0VHlwZSwgVGhlbWUgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVQZXQsIElQZXRUeXBlfSBmcm9tICcuL3BldHMnO1xuaW1wb3J0IHsgQmFsbFN0YXRlLCBQZXRQYW5lbFN0YXRlIH0gZnJvbSAnLi9zdGF0ZXMnO1xuXG4vKiBUaGlzIGlzIGhvdyB0aGUgVlMgQ29kZSBBUEkgY2FuIGJlIGludm9rZWQgZnJvbSB0aGUgcGFuZWwgKi9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFZzY29kZVN0YXRlQXBpIHsgXG4gICAgZ2V0U3RhdGUoKSA6IFBldFBhbmVsU3RhdGU7IC8vIEFQSSBpcyBhY3R1YWxseSBBbnksIGJ1dCB3ZSB3YW50IGl0IHRvIGJlIHR5cGVkLlxuICAgIHNldFN0YXRlKHN0YXRlOiBQZXRQYW5lbFN0YXRlKTogdm9pZDtcbiAgfVxuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBhY3F1aXJlVnNDb2RlQXBpKCk6IFZzY29kZVN0YXRlQXBpO1xuICB9XG59XG5cbmNvbnN0IHZzY29kZSA9IHdpbmRvdy5hY3F1aXJlVnNDb2RlQXBpKCk7XG5cbmNsYXNzIFBldEVsZW1lbnQge1xuICBlbDogSFRNTEltYWdlRWxlbWVudDtcbiAgY29sbGlzaW9uOiBIVE1MRGl2RWxlbWVudDtcbiAgcGV0OiBJUGV0VHlwZTtcbiAgY29sb3I6IFBldENvbG9yO1xuICB0eXBlOiBQZXRUeXBlO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBjb2xsaXNpb246IEhUTUxEaXZFbGVtZW50LCBwZXQ6IElQZXRUeXBlLCBjb2xvcjogUGV0Q29sb3IsIHR5cGU6IFBldFR5cGUpe1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmNvbGxpc2lvbiA9IGNvbGxpc2lvbjtcbiAgICB0aGlzLnBldCA9IHBldDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxufVxuXG52YXIgYWxsUGV0czogQXJyYXk8UGV0RWxlbWVudD4gPSBuZXcgQXJyYXkoMCk7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUJhbGxSYWRpdXMoc2l6ZTogUGV0U2l6ZSk6IG51bWJlcntcbiAgaWYgKHNpemUgPT09IFBldFNpemUubmFubyl7XG4gICAgcmV0dXJuIDI7XG4gIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5tZWRpdW0pe1xuICAgIHJldHVybiA0O1xuICB9IGVsc2UgaWYgKHNpemUgPT09IFBldFNpemUubGFyZ2Upe1xuICAgIHJldHVybiA4O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAxOyAvLyBTaHJ1Z1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vdXNlT3ZlcihlOiBNb3VzZUV2ZW50KXtcbiAgdmFyIGVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICBhbGxQZXRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgaWYgKGVsZW1lbnQuY29sbGlzaW9uID09PSBlbCl7XG4gICAgICBpZiAoIWVsZW1lbnQucGV0LmNhblN3aXBlKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWxlbWVudC5wZXQuc3dpcGUoKTtcbiAgICB9XG4gIH0pO1xuICBcbn1cblxuZnVuY3Rpb24gc3RhcnRBbmltYXRpb25zKGNvbGxpc2lvbjogSFRNTERpdkVsZW1lbnQsIHBldDogSVBldFR5cGUpIHtcbiAgY29sbGlzaW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VPdmVyKTtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHBldC5uZXh0RnJhbWUoKTtcbiAgICBzYXZlU3RhdGUoKTtcbiAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gYWRkUGV0VG9QYW5lbChwZXRUeXBlOiBQZXRUeXBlLCBiYXNlUGV0VXJpOiBzdHJpbmcsIHBldENvbG9yOiBQZXRDb2xvciwgcGV0U2l6ZTogUGV0U2l6ZSwgbGVmdDogbnVtYmVyLCBib3R0b206IG51bWJlciwgZmxvb3I6IG51bWJlcik6IFBldEVsZW1lbnQge1xuICB2YXIgcGV0U3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIHBldFNwcml0ZUVsZW1lbnQuY2xhc3NOYW1lID0gXCJwZXRcIjtcblxuICB2YXIgY29sbGlzaW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb2xsaXNpb25FbGVtZW50LmNsYXNzTmFtZSA9IFwiY29sbGlzaW9uXCI7XG5cbiAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGV0c0NvbnRhaW5lclwiKSBhcyBIVE1MRGl2RWxlbWVudCkuYXBwZW5kQ2hpbGQocGV0U3ByaXRlRWxlbWVudCk7XG4gIGNvbnN0IHJvb3QgPSBiYXNlUGV0VXJpICsgJy8nICsgcGV0VHlwZSArICcvJyArIHBldENvbG9yO1xuICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIG5ldyBwZXQgOiBcIiwgcGV0VHlwZSwgcm9vdCk7XG4gIHZhciBuZXdQZXQgPSBjcmVhdGVQZXQocGV0VHlwZSwgcGV0U3ByaXRlRWxlbWVudCwgY29sbGlzaW9uRWxlbWVudCwgcGV0U2l6ZSwgbGVmdCwgYm90dG9tLCByb290LCBmbG9vcik7XG4gIHN0YXJ0QW5pbWF0aW9ucyhjb2xsaXNpb25FbGVtZW50LCBuZXdQZXQpO1xuICByZXR1cm4gbmV3IFBldEVsZW1lbnQocGV0U3ByaXRlRWxlbWVudCwgY29sbGlzaW9uRWxlbWVudCwgbmV3UGV0LCBwZXRDb2xvciwgcGV0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIHNhdmVTdGF0ZSgpe1xuICB2YXIgc3RhdGUgPSBuZXcgUGV0UGFuZWxTdGF0ZSgpO1xuICBzdGF0ZS5wZXRTdGF0ZXMgPSBuZXcgQXJyYXkoKTtcblxuICBhbGxQZXRzLmZvckVhY2gocGV0SXRlbSA9PiB7XG4gICAgc3RhdGUucGV0U3RhdGVzIS5wdXNoKHtcbiAgICAgIHBldENvbG9yOiBwZXRJdGVtLmNvbG9yLFxuICAgICAgcGV0VHlwZTogcGV0SXRlbS50eXBlLFxuICAgICAgcGV0U3RhdGU6IHBldEl0ZW0ucGV0LmdldFN0YXRlKCksXG4gICAgICBlbExlZnQ6IHBldEl0ZW0uZWwuc3R5bGUubGVmdCxcbiAgICAgIGVsQm90dG9tOiBwZXRJdGVtLmVsLnN0eWxlLmJvdHRvbVxuICAgIH0pO1xuICB9KTtcbiAgdnNjb2RlLnNldFN0YXRlKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gcmVjb3ZlclN0YXRlKGJhc2VQZXRVcmk6IHN0cmluZywgcGV0U2l6ZTogUGV0U2l6ZSwgZmxvb3I6IG51bWJlcil7XG4gIHZhciBzdGF0ZSA9IHZzY29kZS5nZXRTdGF0ZSgpO1xuICBzdGF0ZS5wZXRTdGF0ZXMhLmZvckVhY2gocCA9PiB7XG4gICAgdmFyIG5ld1BldCA9IGFkZFBldFRvUGFuZWwocC5wZXRUeXBlISwgYmFzZVBldFVyaSwgcC5wZXRDb2xvciEsIHBldFNpemUsIHBhcnNlSW50KHAuZWxMZWZ0ISksIHBhcnNlSW50KHAuZWxCb3R0b20hKSwgZmxvb3IpO1xuICAgIG5ld1BldC5wZXQucmVjb3ZlclN0YXRlKHAucGV0U3RhdGUhKTtcbiAgICBhbGxQZXRzLnB1c2gobmV3UGV0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJhbmRvbVN0YXJ0UG9zaXRpb24oKSA6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVyV2lkdGggKiAwLjcpKTtcbn1cblxubGV0IGNhbnZhcyA6IEhUTUxDYW52YXNFbGVtZW50LCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuZnVuY3Rpb24gaW5pdENhbnZhcygpIHtcbiAgY2FudmFzID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGV0Q2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50KTtcbiAgY3R4ID0gKGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTtcbiAgY3R4LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICBjdHguY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbn1cblxuLy8gSXQgY2Fubm90IGFjY2VzcyB0aGUgbWFpbiBWUyBDb2RlIEFQSXMgZGlyZWN0bHkuXG5leHBvcnQgZnVuY3Rpb24gcGV0UGFuZWxBcHAoYmFzZVBldFVyaTogc3RyaW5nLCB0aGVtZTogVGhlbWUsIHBldENvbG9yOiBQZXRDb2xvciwgcGV0U2l6ZTogUGV0U2l6ZSwgcGV0VHlwZTogUGV0VHlwZSkge1xuICBjb25zdCBiYWxsUmFkaXVzOiBudW1iZXIgPSBjYWxjdWxhdGVCYWxsUmFkaXVzKHBldFNpemUpO1xuICB2YXIgZmxvb3IgPSAwO1xuICAvLyBBcHBseSBUaGVtZSBiYWNrZ3JvdW5kc1xuICBpZiAodGhlbWUgIT09IFRoZW1lLm5vbmUpe1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtiYXNlUGV0VXJpfS9iYWNrZ3JvdW5kcy8ke3RoZW1lfS9iYWNrZ3JvdW5kLnBuZycpYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcmVncm91bmRcIikhLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7YmFzZVBldFVyaX0vYmFja2dyb3VuZHMvJHt0aGVtZX0vZm9yZWdyb3VuZC5wbmcnKWA7XG4gICAgZmxvb3IgPSAzMDsgLy8gVGhlbWVzIGhhdmUgcGV0cyBhdCBhIHNwZWNpZmllZCBoZWlnaHQgKDMwcHgpXG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIlwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWdyb3VuZFwiKSEuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJcIjtcbiAgfVxuXG4gIC8vLyBCb3VuY2luZyBiYWxsIGNvbXBvbmVudHMsIGNyZWRpdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjk5ODIzNDNcbiAgY29uc3QgZ3Jhdml0eTogbnVtYmVyID0gMC4yLCBkYW1waW5nOiBudW1iZXIgPSAwLjksIHRyYWN0aW9uOiBudW1iZXIgPSAwLjg7XG4gIHZhciBiYWxsU3RhdGU6IEJhbGxTdGF0ZTtcblxuICBmdW5jdGlvbiByZXNldEJhbGwoKSB7XG4gICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgYmFsbFN0YXRlID0gbmV3IEJhbGxTdGF0ZSgxMDAsIDEwMCwgMiwgNSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aHJvd0JhbGwoKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGlmICghYmFsbFN0YXRlLnBhdXNlZCkge3JlcXVlc3RBbmltYXRpb25GcmFtZSh0aHJvd0JhbGwpO31cblxuICAgIGlmIChiYWxsU3RhdGUuY3ggKyBiYWxsUmFkaXVzID49IGNhbnZhcy53aWR0aCkge1xuICAgICAgYmFsbFN0YXRlLnZ4ID0gLWJhbGxTdGF0ZS52eCAqIGRhbXBpbmc7XG4gICAgICBiYWxsU3RhdGUuY3ggPSBjYW52YXMud2lkdGggLSBiYWxsUmFkaXVzO1xuICAgIH0gZWxzZSBpZiAoYmFsbFN0YXRlLmN4IC0gYmFsbFJhZGl1cyA8PSAwKSB7XG4gICAgICBiYWxsU3RhdGUudnggPSAtYmFsbFN0YXRlLnZ4ICogZGFtcGluZztcbiAgICAgIGJhbGxTdGF0ZS5jeCA9IGJhbGxSYWRpdXM7XG4gICAgfVxuICAgIGlmIChiYWxsU3RhdGUuY3kgKyBiYWxsUmFkaXVzID49IChjYW52YXMuaGVpZ2h0KSkge1xuICAgICAgYmFsbFN0YXRlLnZ5ID0gLWJhbGxTdGF0ZS52eSAqIGRhbXBpbmc7XG4gICAgICBiYWxsU3RhdGUuY3kgPSBjYW52YXMuaGVpZ2h0IC0gYmFsbFJhZGl1cztcbiAgICAgIC8vIHRyYWN0aW9uIGhlcmVcbiAgICAgIGJhbGxTdGF0ZS52eCAqPSB0cmFjdGlvbjtcbiAgICB9IGVsc2UgaWYgKGJhbGxTdGF0ZS5jeSAtIGJhbGxSYWRpdXMgPD0gZmxvb3IpIHtcbiAgICAgIGJhbGxTdGF0ZS52eSA9IC1iYWxsU3RhdGUudnkgKiBkYW1waW5nO1xuICAgICAgYmFsbFN0YXRlLmN5ID0gYmFsbFJhZGl1cztcbiAgICB9XG5cbiAgICBiYWxsU3RhdGUudnkgKz0gZ3Jhdml0eTtcblxuICAgIGJhbGxTdGF0ZS5jeCArPSBiYWxsU3RhdGUudng7XG4gICAgYmFsbFN0YXRlLmN5ICs9IGJhbGxTdGF0ZS52eTtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGJhbGxTdGF0ZS5jeCwgYmFsbFN0YXRlLmN5LCBiYWxsUmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMyZWQ4NTFcIjtcbiAgICBjdHguZmlsbCgpO1xuICB9XG5cbiAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIHBldCBzZXNzaW9uJywgcGV0Q29sb3IsIGJhc2VQZXRVcmksIHBldFR5cGUpO1xuICAvLyBOZXcgc2Vzc2lvblxuICB2YXIgc3RhdGUgPSB2c2NvZGUuZ2V0U3RhdGUoKTtcbiAgaWYgKCFzdGF0ZSkge1xuICAgIGNvbnNvbGUubG9nKCdObyBzdGF0ZSwgc3RhcnRpbmcgYSBuZXcgc2Vzc2lvbi4nKTtcbiAgICBhbGxQZXRzLnB1c2goYWRkUGV0VG9QYW5lbChwZXRUeXBlLCBiYXNlUGV0VXJpLCBwZXRDb2xvciwgcGV0U2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCBmbG9vciwgZmxvb3IpKTtcbiAgICBzYXZlU3RhdGUoKTtcbiAgfSBlbHNlIHsgXG4gICAgY29uc29sZS5sb2coJ1JlY292ZXJpbmcgc3RhdGUgLSAnLCBzdGF0ZSk7XG4gICAgcmVjb3ZlclN0YXRlKGJhc2VQZXRVcmksIHBldFNpemUsIGZsb29yKTtcbiAgfVxuXG4gIGluaXRDYW52YXMoKTtcblxuICAvLyBIYW5kbGUgbWVzc2FnZXMgc2VudCBmcm9tIHRoZSBleHRlbnNpb24gdG8gdGhlIHdlYnZpZXdcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhOyAvLyBUaGUganNvbiBkYXRhIHRoYXQgdGhlIGV4dGVuc2lvbiBzZW50XG4gICAgc3dpdGNoIChtZXNzYWdlLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgXCJ0aHJvdy1iYWxsXCI6XG4gICAgICAgIHJlc2V0QmFsbCgpO1xuICAgICAgICB0aHJvd0JhbGwoKTtcbiAgICAgICAgYWxsUGV0cy5mb3JFYWNoKHBldEVsID0+IHtcbiAgICAgICAgICBpZiAocGV0RWwucGV0LmNhbkNoYXNlKCkpe1xuICAgICAgICAgICAgcGV0RWwucGV0LmNoYXNlKGJhbGxTdGF0ZSwgY2FudmFzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzcGF3bi1wZXRcIjpcbiAgICAgICAgYWxsUGV0cy5wdXNoKGFkZFBldFRvUGFuZWwobWVzc2FnZS50eXBlLCBiYXNlUGV0VXJpLCBtZXNzYWdlLmNvbG9yLCBwZXRTaXplLCByYW5kb21TdGFydFBvc2l0aW9uKCksIGZsb29yLCBmbG9vcikpO1xuICAgICAgICBzYXZlU3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmVzZXQtcGV0XCI6XG4gICAgICAgIGFsbFBldHMuZm9yRWFjaChwZXQgPT4gcGV0LmVsLnJlbW92ZSgpKTtcbiAgICAgICAgYWxsUGV0cyA9IFtdO1xuICAgICAgICBhbGxQZXRzLnB1c2goYWRkUGV0VG9QYW5lbChtZXNzYWdlLnR5cGUsIGJhc2VQZXRVcmksIG1lc3NhZ2UuY29sb3IsIG1lc3NhZ2Uuc2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCBmbG9vciwgZmxvb3IpKTtcbiAgICAgICAgc2F2ZVN0YXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG5cbn07XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICBpbml0Q2FudmFzKCk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=