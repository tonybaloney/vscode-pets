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
class BasePetType {
    constructor(spriteElement, petRoot) {
        this.label = "base";
        this.sequence = { startingState: "sit-idle" /* sitIdle */, sequenceStates: [] };
        this.el = spriteElement;
        this.petRoot = petRoot;
        this.currentStateEnum = this.sequence.startingState;
        this.currentState = states_1.resolveState(this.currentStateEnum, spriteElement);
    }
    getState() {
        return { currentStateEnum: this.currentStateEnum };
    }
    recoverState(state) {
        this.currentStateEnum = state.currentStateEnum;
        this.currentState = states_1.resolveState(this.currentStateEnum, this.el);
    }
    canSwipe() {
        // Some pets override this with custom rules
        return true;
    }
    swipe() {
        if (this.currentStateEnum === "swipe" /* swipe */) {
            return;
        }
        this.holdState = this.currentState;
        this.holdStateEnum = this.currentStateEnum;
        this.currentStateEnum = "swipe" /* swipe */;
        this.currentState = states_1.resolveState(this.currentStateEnum, this.el);
    }
    chase(ballState, canvas) {
        this.currentStateEnum = "chase" /* chase */;
        this.currentState = new states_1.ChaseState(this.el, ballState, canvas);
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
            this.currentState = states_1.resolveState(nextState, this.el);
            this.currentStateEnum = nextState;
        }
        else if (frameResult === states_1.FrameResult.stateCancel) {
            if (this.currentStateEnum === "chase" /* chase */) { // Currently the only one anyway
                var nextState = this.chooseNextState("idle-with-ball" /* idleWithBall */);
                this.currentState = states_1.resolveState(nextState, this.el);
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
    canSwipe() {
        if (this.currentStateEnum === "climb-wall-left" /* climbWallLeft */ ||
            this.currentStateEnum === "jump-down-left" /* jumpDownLeft */ ||
            this.currentStateEnum === "land" /* land */ ||
            this.currentStateEnum === "wall-hang-left" /* wallHangLeft */) {
            return false;
        }
        return true;
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
function createPet(petType, el, petRoot) {
    if (petType === "cat") {
        return new Cat(el, petRoot);
    }
    else if (petType === "dog") {
        return new Dog(el, petRoot);
    }
    else if (petType === "snake") {
        return new Snake(el, petRoot);
    }
    else if (petType === "clippy") {
        return new Clippy(el, petRoot);
    }
    else if (petType === "rubber duck") {
        return new RubberDuck(el, petRoot);
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
exports.JumpDownLeftState = exports.ClimbWallLeftState = exports.ChaseState = exports.RunLeftState = exports.RunRightState = exports.WalkLeftState = exports.WalkRightState = exports.IdleWithBallState = exports.SwipeState = exports.LandState = exports.WallHangLeftState = exports.LieState = exports.SitIdleState = exports.resolveState = exports.BallState = exports.FrameResult = exports.HorizontalDirection = exports.PetPanelState = exports.PetElementState = exports.PetInstanceState = void 0;
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
function resolveState(state, el) {
    switch (state) {
        case "sit-idle" /* sitIdle */: return new SitIdleState(el);
        case "walk-right" /* walkRight */: return new WalkRightState(el);
        case "walk-left" /* walkLeft */: return new WalkLeftState(el);
        case "run-right" /* runRight */: return new RunRightState(el);
        case "run-left" /* runLeft */: return new RunLeftState(el);
        case "lie" /* lie */: return new LieState(el);
        case "wall-hang-left" /* wallHangLeft */: return new WallHangLeftState(el);
        case "climb-wall-left" /* climbWallLeft */: return new ClimbWallLeftState(el);
        case "jump-down-left" /* jumpDownLeft */: return new JumpDownLeftState(el);
        case "land" /* land */: return new LandState(el);
        case "swipe" /* swipe */: return new SwipeState(el);
        case "idle-with-ball" /* idleWithBall */: return new IdleWithBallState(el);
    }
    return new SitIdleState(el);
}
exports.resolveState = resolveState;
class AbstractStaticState {
    constructor(petElement) {
        this.label = "sit-idle" /* sitIdle */;
        this.spriteLabel = "idle";
        this.holdTime = 50;
        this.horizontalDirection = HorizontalDirection.left;
        this.idleCounter = 0;
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
    constructor(petElement) {
        this.label = "walk-right" /* walkRight */;
        this.skipSpeed = 3;
        this.spriteLabel = "walk";
        this.horizontalDirection = HorizontalDirection.right;
        this.petLeft = parseInt(petElement.style.left);
        this.el = petElement;
        this.leftBoundary = Math.floor(window.innerWidth * 0.95);
    }
    nextFrame() {
        this.petLeft += this.skipSpeed;
        this.el.style.left = `${this.petLeft}px`;
        if (this.petLeft >= this.leftBoundary - this.el.width) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.WalkRightState = WalkRightState;
class WalkLeftState {
    constructor(petElement) {
        this.label = "walk-left" /* walkLeft */;
        this.skipSpeed = 3;
        this.spriteLabel = "walk";
        this.horizontalDirection = HorizontalDirection.left;
        this.petLeft = parseInt(petElement.style.left);
        this.el = petElement;
    }
    nextFrame() {
        this.petLeft -= this.skipSpeed;
        this.el.style.left = `${this.petLeft}px`;
        if (this.petLeft <= 0) {
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
    constructor(petElement, ballState, canvas) {
        this.label = "chase" /* chase */;
        this.skipSpeed = 3;
        this.spriteLabel = "run";
        this.horizontalDirection = HorizontalDirection.left;
        this.petLeft = parseInt(petElement.style.left);
        this.el = petElement;
        this.ballState = ballState;
        this.canvas = canvas;
    }
    nextFrame() {
        if (this.ballState.paused) {
            return FrameResult.stateCancel; // Ball is already caught
        }
        if (this.petLeft > this.ballState.cx) {
            this.horizontalDirection = HorizontalDirection.left;
            this.petLeft -= 3;
        }
        else {
            this.horizontalDirection = HorizontalDirection.right;
            this.petLeft += 3;
        }
        this.el.style.left = `${this.petLeft}px`;
        if (this.canvas.height - this.ballState.cy < this.el.width && this.ballState.cx < this.petLeft && this.petLeft < this.ballState.cx + 15) {
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
    constructor(petElement) {
        this.label = "climb-wall-left" /* climbWallLeft */;
        this.skipSpeed = 3;
        this.spriteLabel = "wallclimb";
        this.horizontalDirection = HorizontalDirection.left;
        this.petBottom = parseInt(petElement.style.bottom);
        this.el = petElement;
    }
    nextFrame() {
        this.petBottom += 1;
        this.el.style.bottom = `${this.petBottom}px`;
        if (this.petBottom >= 100) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.ClimbWallLeftState = ClimbWallLeftState;
class JumpDownLeftState {
    constructor(petElement) {
        this.label = "jump-down-left" /* jumpDownLeft */;
        this.skipSpeed = 3;
        this.spriteLabel = "fall_from_grab";
        this.horizontalDirection = HorizontalDirection.right;
        this.petBottom = parseInt(petElement.style.bottom);
        this.el = petElement;
    }
    nextFrame() {
        this.petBottom -= 5;
        this.el.style.bottom = `${this.petBottom}px`;
        if (this.petBottom <= 0) {
            this.petBottom = 0;
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
    constructor(el, pet, color, type) {
        this.el = el;
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
function initSprite(el, petSize, left, bottom) {
    el.style.left = left;
    el.style.bottom = bottom;
    el.style.width = "auto";
    el.style.height = "auto";
    el.style.maxWidth = `${calculateSpriteWidth(petSize)}px`;
    el.style.maxHeight = `${calculateSpriteWidth(petSize)}px`;
}
function handleMouseOver(e) {
    var el = e.currentTarget;
    allPets.forEach(element => {
        if (element.el === el) {
            if (!element.pet.canSwipe()) {
                return;
            }
            element.pet.swipe();
        }
    });
}
function startAnimations(el, pet) {
    el.addEventListener("mouseover", handleMouseOver);
    setInterval(() => {
        pet.nextFrame();
        saveState();
    }, 100);
}
function addPetToPanel(petType, basePetUri, petColor, petSize, left, bottom) {
    var petSpriteElement = document.createElement("img");
    petSpriteElement.className = "pet";
    document.getElementById("petsContainer").appendChild(petSpriteElement);
    const root = basePetUri + '/' + petType + '/' + petColor;
    console.log("Creating new pet : ", petType, root);
    var newPet = pets_1.createPet(petType, petSpriteElement, root);
    initSprite(petSpriteElement, petSize, left, bottom);
    startAnimations(petSpriteElement, newPet);
    return new PetElement(petSpriteElement, newPet, petColor, petType);
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
function recoverState(basePetUri, petSize) {
    var state = vscode.getState();
    state.petStates.forEach(p => {
        var newPet = addPetToPanel(p.petType, basePetUri, p.petColor, petSize, p.elLeft, p.elBottom);
        newPet.pet.recoverState(p.petState);
        allPets.push(newPet);
    });
}
function randomStartPosition() {
    const x = Math.floor(Math.random() * (window.innerWidth * 0.7));
    return `${x}px`;
}
// It cannot access the main VS Code APIs directly.
function petPanelApp(basePetUri, petColor, petSize, petType) {
    const ballRadius = calculateBallRadius(petSize);
    /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
    var canvas, ctx;
    const gravity = 0.2, damping = 0.9, traction = 0.8;
    var ballState;
    function initBallPhysics() {
        canvas = document.getElementById("petCanvas");
        ctx = canvas.getContext("2d");
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
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
        if (ballState.cy + ballRadius >= canvas.height) {
            ballState.vy = -ballState.vy * damping;
            ballState.cy = canvas.height - ballRadius;
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
        allPets.push(addPetToPanel(petType, basePetUri, petColor, petSize, randomStartPosition(), '0px'));
        saveState();
    }
    else {
        console.log('Recovering state - ', state);
        recoverState(basePetUri, petSize);
    }
    initBallPhysics();
    // Handle messages sent from the extension to the webview
    window.addEventListener("message", (event) => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case "throw-ball":
                resetBall();
                throwBall();
                allPets.forEach(petEl => {
                    petEl.pet.chase(ballState, canvas);
                });
                break;
            case "spawn-pet":
                allPets.push(addPetToPanel(message.type, basePetUri, message.color, petSize, randomStartPosition(), '0px'));
                saveState();
                break;
            case "reset-pet":
                allPets.forEach(pet => pet.el.remove());
                allPets = [];
                allPets.push(addPetToPanel(message.type, basePetUri, message.color, message.size, randomStartPosition(), '0px'));
                saveState();
                break;
        }
    });
}
exports.petPanelApp = petPanelApp;
;

})();

self.petApp = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvcGV0cy50cyIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvc3RhdGVzLnRzIiwid2VicGFjazovL3BldEFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsOEVBQW1JO0FBRW5JLE1BQWEscUJBQXFCO0NBRWpDO0FBRkQsc0RBRUM7QUFXRCxNQUFlLFdBQVc7SUFVdEIsWUFBWSxhQUErQixFQUFFLE9BQWU7UUFUNUQsVUFBSyxHQUFXLE1BQU0sQ0FBQztRQUN2QixhQUFRLEdBQWtCLEVBQUUsYUFBYSwwQkFBZ0IsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFTM0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUF1QjtRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFpQixDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxRQUFRO1FBQ0osNENBQTRDO1FBQzVDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLHdCQUFpQixFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLHNCQUFlLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFvQixFQUFFLE1BQXlCO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0Isc0JBQWUsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksbUJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUM7SUFDakQsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDO0lBQ2hELENBQUM7SUFFRCxZQUFZLENBQUMsSUFBWTtRQUNyQixNQUFNLE9BQU8sR0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxXQUFXLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7WUFDekIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO0lBQzFCLENBQUM7SUFFRCxlQUFlLENBQUMsU0FBaUI7UUFDN0Isc0JBQXNCO1FBQ3RCLElBQUksa0JBQWtCLEdBQXlCLFNBQVMsQ0FBQztRQUN6RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDckQsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUM7YUFDM0U7U0FDSjtRQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBQztZQUNwQixNQUFNLElBQUkscUJBQXFCLEVBQUUsQ0FBQztTQUNyQztRQUNELGlDQUFpQztRQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxPQUFPLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixLQUFLLDRCQUFtQixDQUFDLElBQUksRUFBRTtZQUNwRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7YUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEtBQUssNEJBQW1CLENBQUMsS0FBSyxFQUFFO1lBQzVFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hELElBQUksV0FBVyxLQUFLLG9CQUFXLENBQUMsYUFBYSxFQUM3QztZQUNJLDZCQUE2QjtZQUM3QixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBQztnQkFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUMvQixPQUFPO2FBQ1Y7WUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7U0FDckM7YUFBTSxJQUFJLFdBQVcsS0FBSyxvQkFBVyxDQUFDLFdBQVcsRUFBQztZQUMvQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0Isd0JBQWlCLEVBQUUsRUFBRSxnQ0FBZ0M7Z0JBQzFFLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLHFDQUFxQixDQUFDO2dCQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBR0QsTUFBYSxHQUFJLFNBQVEsV0FBVztJQUFwQzs7UUFDSSxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsYUFBUSxHQUFHO1lBQ1AsYUFBYSwwQkFBZ0I7WUFDN0IsY0FBYyxFQUFFO2dCQUNaO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSwwREFBbUM7aUJBQzFEO2dCQUNEO29CQUNJLEtBQUssOEJBQWtCO29CQUN2QixrQkFBa0IsRUFBRSxzREFBaUM7aUJBQ3hEO2dCQUNEO29CQUNJLEtBQUssNEJBQWlCO29CQUN0QixrQkFBa0IsRUFBRSxzREFBaUM7aUJBQ3hEO2dCQUNEO29CQUNJLEtBQUssNEJBQWlCO29CQUN0QixrQkFBa0IsRUFBRSxpRUFBc0M7aUJBQzdEO2dCQUNEO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSxpRUFBc0M7aUJBQzdEO2dCQUNEO29CQUNJLEtBQUssdUNBQXNCO29CQUMzQixrQkFBa0IsRUFBRSxxQ0FBcUI7aUJBQzVDO2dCQUNEO29CQUNJLEtBQUsscUNBQXFCO29CQUMxQixrQkFBa0IsRUFBRSxxQ0FBcUI7aUJBQzVDO2dCQUNEO29CQUNJLEtBQUsscUNBQXFCO29CQUMxQixrQkFBa0IsRUFBRSxtQkFBYTtpQkFDcEM7Z0JBQ0Q7b0JBQ0ksS0FBSyxtQkFBYTtvQkFDbEIsa0JBQWtCLEVBQUUsb0ZBQW1EO2lCQUMxRTtnQkFDRDtvQkFDSSxLQUFLLHFCQUFjO29CQUNuQixrQkFBa0IsRUFBRSxxQ0FBcUI7aUJBQzVDO2dCQUNEO29CQUNJLEtBQUsscUNBQXFCO29CQUMxQixrQkFBa0IsRUFBRSxnSEFBb0U7aUJBQzNGO2FBQ0o7U0FDSixDQUFDO0lBV04sQ0FBQztJQVRHLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsMENBQXlCO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0Isd0NBQXdCO1lBQzdDLElBQUksQ0FBQyxnQkFBZ0Isc0JBQWdCO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0Isd0NBQXdCLEVBQUU7WUFDL0MsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUE3REQsa0JBNkRDO0FBRUQsTUFBYSxHQUFJLFNBQVEsV0FBVztJQUFwQzs7UUFDSSxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsYUFBUSxHQUFHO1lBQ1AsYUFBYSwwQkFBZ0I7WUFDN0IsY0FBYyxFQUFFO2dCQUNaO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSwyRUFBK0M7aUJBQ3RFO2dCQUNEO29CQUNJLEtBQUssaUJBQVk7b0JBQ2pCLGtCQUFrQixFQUFFLDBEQUFtQztpQkFDMUQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw4QkFBa0I7b0JBQ3ZCLGtCQUFrQixFQUFFLHNEQUFpQztpQkFDeEQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw0QkFBaUI7b0JBQ3RCLGtCQUFrQixFQUFFLHNEQUFpQztpQkFDeEQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw0QkFBaUI7b0JBQ3RCLGtCQUFrQixFQUFFLDJDQUE0QjtpQkFDbkQ7Z0JBQ0Q7b0JBQ0ksS0FBSywwQkFBZ0I7b0JBQ3JCLGtCQUFrQixFQUFFLDJDQUE0QjtpQkFDbkQ7Z0JBQ0Q7b0JBQ0ksS0FBSyxxQkFBYztvQkFDbkIsa0JBQWtCLEVBQUUscUNBQXFCO2lCQUM1QztnQkFDRDtvQkFDSSxLQUFLLHFDQUFxQjtvQkFDMUIsa0JBQWtCLEVBQUUsZ0hBQW9FO2lCQUMzRjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FBQTtBQXZDRCxrQkF1Q0M7QUFFRCxNQUFhLEtBQU0sU0FBUSxXQUFXO0lBQXRDOztRQUNJLFVBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIsYUFBUSxHQUFHO1lBQ1AsYUFBYSwwQkFBZ0I7WUFDN0IsY0FBYyxFQUFFO2dCQUNaO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSwwREFBbUM7aUJBQzFEO2dCQUNEO29CQUNJLEtBQUssOEJBQWtCO29CQUN2QixrQkFBa0IsRUFBRSxzREFBaUM7aUJBQ3hEO2dCQUNEO29CQUNJLEtBQUssNEJBQWlCO29CQUN0QixrQkFBa0IsRUFBRSxzREFBaUM7aUJBQ3hEO2dCQUNEO29CQUNJLEtBQUssNEJBQWlCO29CQUN0QixrQkFBa0IsRUFBRSwwQkFBZ0I7aUJBQ3ZDO2dCQUNEO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSwwQkFBZ0I7aUJBQ3ZDO2dCQUNEO29CQUNJLEtBQUsscUJBQWM7b0JBQ25CLGtCQUFrQixFQUFFLHFDQUFxQjtpQkFDNUM7Z0JBQ0Q7b0JBQ0ksS0FBSyxxQ0FBcUI7b0JBQzFCLGtCQUFrQixFQUFFLGdIQUFvRTtpQkFDM0Y7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQUE7QUFuQ0Qsc0JBbUNDO0FBRUQsTUFBYSxNQUFPLFNBQVEsV0FBVztJQUF2Qzs7UUFDSSxVQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ2pCLGFBQVEsR0FBRztZQUNQLGFBQWEsMEJBQWdCO1lBQzdCLGNBQWMsRUFBRTtnQkFDWjtvQkFDSSxLQUFLLDBCQUFnQjtvQkFDckIsa0JBQWtCLEVBQUUsMERBQW1DO2lCQUMxRDtnQkFDRDtvQkFDSSxLQUFLLDhCQUFrQjtvQkFDdkIsa0JBQWtCLEVBQUUsc0RBQWlDO2lCQUN4RDtnQkFDRDtvQkFDSSxLQUFLLDRCQUFpQjtvQkFDdEIsa0JBQWtCLEVBQUUsc0RBQWlDO2lCQUN4RDtnQkFDRDtvQkFDSSxLQUFLLDRCQUFpQjtvQkFDdEIsa0JBQWtCLEVBQUUsMEJBQWdCO2lCQUN2QztnQkFDRDtvQkFDSSxLQUFLLDBCQUFnQjtvQkFDckIsa0JBQWtCLEVBQUUsMEJBQWdCO2lCQUN2QztnQkFDRDtvQkFDSSxLQUFLLHFCQUFjO29CQUNuQixrQkFBa0IsRUFBRSxxQ0FBcUI7aUJBQzVDO2dCQUNEO29CQUNJLEtBQUsscUNBQXFCO29CQUMxQixrQkFBa0IsRUFBRSxnSEFBb0U7aUJBQzNGO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUFBO0FBbkNELHdCQW1DQztBQUVELE1BQWEsVUFBVyxTQUFRLFdBQVc7SUFBM0M7O1FBQ0ksVUFBSyxHQUFHLGFBQWEsQ0FBQztRQUN0QixhQUFRLEdBQUc7WUFDUCxhQUFhLDBCQUFnQjtZQUM3QixjQUFjLEVBQUU7Z0JBQ1o7b0JBQ0ksS0FBSywwQkFBZ0I7b0JBQ3JCLGtCQUFrQixFQUFFLDBEQUFtQztpQkFDMUQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw4QkFBa0I7b0JBQ3ZCLGtCQUFrQixFQUFFLHNEQUFpQztpQkFDeEQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw0QkFBaUI7b0JBQ3RCLGtCQUFrQixFQUFFLHNEQUFpQztpQkFDeEQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw0QkFBaUI7b0JBQ3RCLGtCQUFrQixFQUFFLDBCQUFnQjtpQkFDdkM7Z0JBQ0Q7b0JBQ0ksS0FBSywwQkFBZ0I7b0JBQ3JCLGtCQUFrQixFQUFFLDBCQUFnQjtpQkFDdkM7Z0JBQ0Q7b0JBQ0ksS0FBSyxxQkFBYztvQkFDbkIsa0JBQWtCLEVBQUUscUNBQXFCO2lCQUM1QztnQkFDRDtvQkFDSSxLQUFLLHFDQUFxQjtvQkFDMUIsa0JBQWtCLEVBQUUsZ0hBQW9FO2lCQUMzRjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FBQTtBQW5DRCxnQ0FtQ0M7QUFFRCxNQUFhLG1CQUFtQjtDQUMvQjtBQURELGtEQUNDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLE9BQWUsRUFBRSxFQUFvQixFQUFFLE9BQWU7SUFDNUUsSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFDO1FBQ2xCLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9CO1NBQ0ksSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9CO1NBQ0ksSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ2pDO1NBQ0ksSUFBSSxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzNCLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDO1NBQ0ksSUFBSSxPQUFPLEtBQUssYUFBYSxFQUFFO1FBQ2hDLE9BQU8sSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsTUFBTSxJQUFJLG1CQUFtQixFQUFFLENBQUM7QUFDcEMsQ0FBQztBQWpCRCw4QkFpQkM7Ozs7Ozs7Ozs7Ozs7O0FDdFdELE1BQWEsZ0JBQWdCO0NBRTVCO0FBRkQsNENBRUM7QUFFRCxNQUFhLGVBQWU7Q0FNM0I7QUFORCwwQ0FNQztBQUVELE1BQWEsYUFBYTtDQUV6QjtBQUZELHNDQUVDO0FBR0QsSUFBWSxtQkFJWDtBQUpELFdBQVksbUJBQW1CO0lBQzNCLDZEQUFJO0lBQ0osK0RBQUs7SUFDTCxtRUFBTyxFQUFDLGlDQUFpQztBQUM3QyxDQUFDLEVBSlcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFJOUI7QUFrQkQsSUFBWSxXQUtYO0FBTEQsV0FBWSxXQUFXO0lBQ25CLCtEQUFhO0lBQ2IsK0RBQWE7SUFDYixpQkFBaUI7SUFDakIsMkRBQVc7QUFDZixDQUFDLEVBTFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFLdEI7QUFFRCxNQUFhLFNBQVM7SUFPbEIsWUFBWSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVO1FBQ3RELElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBZEQsOEJBY0M7QUFFRCxTQUFnQixZQUFZLENBQUMsS0FBYSxFQUFFLEVBQW9CO0lBQzVELFFBQU8sS0FBSyxFQUFDO1FBQ1QsNkJBQW1CLENBQUMsQ0FBQyxPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELGlDQUFxQixDQUFDLENBQUMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRCwrQkFBb0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsK0JBQW9CLENBQUMsQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELDZCQUFtQixDQUFDLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRCxvQkFBZSxDQUFDLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6Qyx3Q0FBd0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCwwQ0FBeUIsQ0FBQyxDQUFDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RCx3Q0FBd0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCxzQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0Msd0JBQWlCLENBQUMsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLHdDQUF3QixDQUFDLENBQUMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzlEO0lBQ0QsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBaEJELG9DQWdCQztBQVNELE1BQU0sbUJBQW1CO0lBT3JCLFlBQVksVUFBNEI7UUFOeEMsVUFBSyw0QkFBa0I7UUFFdkIsZ0JBQVcsR0FBRyxNQUFNLENBQUM7UUFDckIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUczQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUM7U0FDcEM7UUFDRCxPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBRUQsTUFBYSxZQUFhLFNBQVEsbUJBQW1CO0lBQXJEOztRQUNJLFVBQUssNEJBQWtCO1FBQ3ZCLGdCQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQUNoRCxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUxELG9DQUtDO0FBRUQsTUFBYSxRQUFTLFNBQVEsbUJBQW1CO0lBQWpEOztRQUNJLFVBQUssbUJBQWM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsd0JBQW1CLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO1FBQ2hELGFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUFBO0FBTEQsNEJBS0M7QUFFRCxNQUFhLGlCQUFrQixTQUFRLG1CQUFtQjtJQUExRDs7UUFDSSxVQUFLLHVDQUF1QjtRQUM1QixnQkFBVyxHQUFHLFVBQVUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDL0MsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQUE7QUFMRCw4Q0FLQztBQUVELE1BQWEsU0FBVSxTQUFRLG1CQUFtQjtJQUFsRDs7UUFDSSxVQUFLLHFCQUFlO1FBQ3BCLGdCQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUMvQyxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUxELDhCQUtDO0FBRUQsTUFBYSxVQUFXLFNBQVEsbUJBQW1CO0lBQW5EOztRQUNJLFVBQUssdUJBQWdCO1FBQ3JCLGdCQUFXLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztRQUNsRCxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUxELGdDQUtDO0FBRUQsTUFBYSxpQkFBa0IsU0FBUSxtQkFBbUI7SUFBMUQ7O1FBQ0ksVUFBSyx1Q0FBdUI7UUFDNUIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFDMUIsd0JBQW1CLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBQy9DLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUFBO0FBTEQsOENBS0M7QUFFRCxNQUFhLGNBQWM7SUFTdkIsWUFBWSxVQUE0QjtRQVJ4QyxVQUFLLGdDQUFvQjtRQUd6QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZ0JBQVcsR0FBRyxNQUFNLENBQUM7UUFDckIsd0JBQW1CLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO1FBSTVDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO1lBQ25ELE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQztTQUNwQztRQUNELE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUF2QkQsd0NBdUJDO0FBRUQsTUFBYSxhQUFhO0lBUXRCLFlBQVksVUFBNEI7UUFQeEMsVUFBSyw4QkFBbUI7UUFHeEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGdCQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUczQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQztRQUN6QyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFO1lBQ25CLE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQztTQUNwQztRQUNELE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUFyQkQsc0NBcUJDO0FBRUQsTUFBYSxhQUFjLFNBQVEsY0FBYztJQUFqRDs7UUFDSSxVQUFLLDhCQUFtQjtRQUN4QixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixjQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUpELHNDQUlDO0FBRUQsTUFBYSxZQUFhLFNBQVEsYUFBYTtJQUEvQzs7UUFDSSxVQUFLLDRCQUFrQjtRQUN2QixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixjQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUpELG9DQUlDO0FBRUQsTUFBYSxVQUFVO0lBVW5CLFlBQVksVUFBNEIsRUFBRSxTQUFvQixFQUFFLE1BQXlCO1FBVHpGLFVBQUssdUJBQWdCO1FBR3JCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQix3QkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFLM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMseUJBQXlCO1NBQzVEO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7WUFDcEQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7U0FDckI7YUFBTTtZQUNILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7WUFDckQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3JJLFlBQVk7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUM3QixPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUM7U0FDcEM7UUFDRCxPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBdENELGdDQXNDQztBQUVELE1BQWEsa0JBQWtCO0lBUTNCLFlBQVksVUFBNEI7UUFQeEMsVUFBSyx5Q0FBd0I7UUFHN0IsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzFCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUczQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQUU7WUFDekIsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQXJCRCxnREFxQkM7QUFFRCxNQUFhLGlCQUFpQjtJQVExQixZQUFZLFVBQTRCO1FBUHhDLFVBQUssdUNBQXVCO1FBRzVCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxnQkFBVyxHQUFHLGdCQUFnQixDQUFDO1FBQy9CLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQUc1QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQXRCRCw4Q0FzQkM7Ozs7Ozs7VUN4U0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3BCQSx3RUFBMkM7QUFDM0MsOEVBQW9EO0FBYXBELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBRXpDLE1BQU0sVUFBVTtJQU1kLFlBQVksRUFBb0IsRUFBRSxHQUFhLEVBQUUsS0FBZSxFQUFFLElBQWE7UUFDN0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7Q0FDRjtBQUVELElBQUksT0FBTyxHQUFzQixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU5QyxTQUFTLG1CQUFtQixDQUFDLElBQWE7SUFDeEMsSUFBSSxJQUFJLHNCQUFpQixFQUFDO1FBQ3hCLE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7U0FBTSxJQUFJLElBQUksMEJBQW1CLEVBQUM7UUFDakMsT0FBTyxDQUFDLENBQUM7S0FDVjtTQUFNLElBQUksSUFBSSx3QkFBa0IsRUFBQztRQUNoQyxPQUFPLENBQUMsQ0FBQztLQUNWO1NBQU07UUFDTCxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVE7S0FDbkI7QUFDSCxDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxJQUFhO0lBQ3pDLElBQUksSUFBSSxzQkFBaUIsRUFBQztRQUN4QixPQUFPLEVBQUUsQ0FBQztLQUNYO1NBQU0sSUFBSSxJQUFJLDBCQUFtQixFQUFDO1FBQ2pDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTSxJQUFJLElBQUksd0JBQWtCLEVBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7S0FDWjtTQUFNO1FBQ0wsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRO0tBQ3BCO0FBQ0gsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEVBQW9CLEVBQUUsT0FBZ0IsRUFBRSxJQUFZLEVBQUUsTUFBYztJQUN0RixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUN4QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ3pELEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUM1RCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsQ0FBYTtJQUNwQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBaUMsQ0FBQztJQUM3QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzNCLE9BQU87YUFDUjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxFQUFvQixFQUFFLEdBQWE7SUFDMUQsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNsRCxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ2YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLFNBQVMsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLE9BQWdCLEVBQUUsVUFBa0IsRUFBRSxRQUFrQixFQUFFLE9BQWdCLEVBQUUsSUFBWSxFQUFFLE1BQWM7SUFDN0gsSUFBSSxnQkFBZ0IsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RSxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFvQixDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNGLE1BQU0sSUFBSSxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7SUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsSUFBSSxNQUFNLEdBQUcsZ0JBQVMsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsVUFBVSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEQsZUFBZSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLE9BQU8sSUFBSSxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQsU0FBUyxTQUFTO0lBQ2hCLElBQUksS0FBSyxHQUFHLElBQUksc0JBQWEsRUFBRSxDQUFDO0lBQ2hDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUU5QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLEtBQUssQ0FBQyxTQUFVLENBQUMsSUFBSSxDQUFDO1lBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsS0FBSztZQUN2QixPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDckIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQzdCLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQ2xDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsVUFBa0IsRUFBRSxPQUFnQjtJQUN4RCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsS0FBSyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDM0IsSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxRQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVMsQ0FBQyxDQUFDO1FBQ2pHLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFTLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsbUJBQW1CO0lBQzFCLE1BQU0sQ0FBQyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUNsQixDQUFDO0FBRUQsbURBQW1EO0FBQ25ELFNBQWdCLFdBQVcsQ0FBQyxVQUFrQixFQUFFLFFBQWtCLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQjtJQUNwRyxNQUFNLFVBQVUsR0FBVyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV4RCx5RUFBeUU7SUFDekUsSUFBSSxNQUEwQixFQUFFLEdBQTZCLENBQUM7SUFDOUQsTUFBTSxPQUFPLEdBQVcsR0FBRyxFQUFFLE9BQU8sR0FBVyxHQUFHLEVBQUUsUUFBUSxHQUFXLEdBQUcsQ0FBQztJQUMzRSxJQUFJLFNBQW9CLENBQUM7SUFFekIsU0FBUyxlQUFlO1FBQ3RCLE1BQU0sR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBdUIsQ0FBQztRQUNyRSxHQUFHLEdBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQThCLENBQUM7UUFDNUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNyQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxTQUFTLFNBQVM7UUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQy9CLFNBQVMsR0FBRyxJQUFJLGtCQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFNBQVMsU0FBUztRQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUFDO1FBRTFELElBQUksU0FBUyxDQUFDLEVBQUUsR0FBRyxVQUFVLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUM3QyxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDdkMsU0FBUyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUMxQzthQUFNLElBQUksU0FBUyxDQUFDLEVBQUUsR0FBRyxVQUFVLElBQUksQ0FBQyxFQUFFO1lBQ3pDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUN2QyxTQUFTLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQztTQUMzQjtRQUNELElBQUksU0FBUyxDQUFDLEVBQUUsR0FBRyxVQUFVLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUM5QyxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDdkMsU0FBUyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztZQUMxQyxnQkFBZ0I7WUFDaEIsU0FBUyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUM7U0FDMUI7YUFBTSxJQUFJLFNBQVMsQ0FBQyxFQUFFLEdBQUcsVUFBVSxJQUFJLENBQUMsRUFBRTtZQUN6QyxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDdkMsU0FBUyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7U0FDM0I7UUFFRCxTQUFTLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQztRQUV4QixTQUFTLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsU0FBUyxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO1FBRTdCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkUsY0FBYztJQUNkLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEcsU0FBUyxFQUFFLENBQUM7S0FDYjtTQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ25DO0lBRUQsZUFBZSxFQUFFLENBQUM7SUFFbEIseURBQXlEO0lBQ3pELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMzQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsd0NBQXdDO1FBQ3BFLFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN2QixLQUFLLFlBQVk7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLENBQUM7Z0JBQ1osT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1IsS0FBSyxXQUFXO2dCQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUcsU0FBUyxFQUFFLENBQUM7Z0JBQ1osTUFBTTtZQUNSLEtBQUssV0FBVztnQkFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pILFNBQVMsRUFBRSxDQUFDO2dCQUNaLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXpGRCxrQ0F5RkM7QUFBQSxDQUFDIiwiZmlsZSI6Im1haW4tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNlcXVlbmNlVHJlZSB9IGZyb20gXCIuL3NlcXVlbmNlc1wiO1xuaW1wb3J0IHsgSVN0YXRlLCBTdGF0ZXMsIHJlc29sdmVTdGF0ZSwgSG9yaXpvbnRhbERpcmVjdGlvbiwgQ2hhc2VTdGF0ZSwgQmFsbFN0YXRlLCBGcmFtZVJlc3VsdCwgUGV0SW5zdGFuY2VTdGF0ZSB9IGZyb20gXCIuL3N0YXRlc1wiO1xuXG5leHBvcnQgY2xhc3MgSW52YWxpZFN0YXRlRXhjZXB0aW9uIHtcblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQZXRUeXBlIHtcbiAgICBjYW5Td2lwZSgpOiBib29sZWFuXG4gICAgc3dpcGUoKTogdm9pZFxuICAgIGNoYXNlKGJhbGxTdGF0ZTogQmFsbFN0YXRlLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZFxuICAgIG5leHRGcmFtZSgpOiB2b2lkXG4gICAgZ2V0U3RhdGUoKTogUGV0SW5zdGFuY2VTdGF0ZVxuICAgIHJlY292ZXJTdGF0ZShzdGF0ZTogUGV0SW5zdGFuY2VTdGF0ZSk6IHZvaWRcbn0gXG5cbmFic3RyYWN0IGNsYXNzIEJhc2VQZXRUeXBlIGltcGxlbWVudHMgSVBldFR5cGUge1xuICAgIGxhYmVsOiBzdHJpbmcgPSBcImJhc2VcIjtcbiAgICBzZXF1ZW5jZTogSVNlcXVlbmNlVHJlZSA9IHsgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsIHNlcXVlbmNlU3RhdGVzOiBbXX07XG4gICAgY3VycmVudFN0YXRlOiBJU3RhdGU7XG4gICAgY3VycmVudFN0YXRlRW51bTogU3RhdGVzO1xuICAgIGhvbGRTdGF0ZTogSVN0YXRlIHwgdW5kZWZpbmVkO1xuICAgIGhvbGRTdGF0ZUVudW06IFN0YXRlcyB8IHVuZGVmaW5lZDtcbiAgICBlbDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBwZXRSb290OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihzcHJpdGVFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LCBwZXRSb290OiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmVsID0gc3ByaXRlRWxlbWVudDtcbiAgICAgICAgdGhpcy5wZXRSb290ID0gcGV0Um9vdDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gdGhpcy5zZXF1ZW5jZS5zdGFydGluZ1N0YXRlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZUVudW0sIHNwcml0ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGdldFN0YXRlKCk6IFBldEluc3RhbmNlU3RhdGUgeyBcbiAgICAgICAgcmV0dXJuIHtjdXJyZW50U3RhdGVFbnVtOiB0aGlzLmN1cnJlbnRTdGF0ZUVudW19O1xuICAgIH1cblxuICAgIHJlY292ZXJTdGF0ZShzdGF0ZTogUGV0SW5zdGFuY2VTdGF0ZSl7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHN0YXRlLmN1cnJlbnRTdGF0ZUVudW0hO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZUVudW0sIHRoaXMuZWwpO1xuICAgIH1cblxuICAgIGNhblN3aXBlKCl7XG4gICAgICAgIC8vIFNvbWUgcGV0cyBvdmVycmlkZSB0aGlzIHdpdGggY3VzdG9tIHJ1bGVzXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN3aXBlKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuc3dpcGUpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuaG9sZFN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XG4gICAgICAgIHRoaXMuaG9sZFN0YXRlRW51bSA9IHRoaXMuY3VycmVudFN0YXRlRW51bTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gU3RhdGVzLnN3aXBlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZUVudW0sIHRoaXMuZWwpO1xuICAgIH1cbiAgICBcbiAgICBjaGFzZShiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBTdGF0ZXMuY2hhc2U7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gbmV3IENoYXNlU3RhdGUodGhpcy5lbCwgYmFsbFN0YXRlLCBjYW52YXMpO1xuICAgIH1cblxuICAgIGZhY2VMZWZ0KCkge1xuICAgICAgICB0aGlzLmVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwic2NhbGVYKC0xKVwiO1xuICAgIH1cblxuICAgIGZhY2VSaWdodCgpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcInNjYWxlWCgxKVwiO1xuICAgIH1cblxuICAgIHNldEFuaW1hdGlvbihmYWNlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgbmV3RmFjZTogc3RyaW5nID0gYCR7dGhpcy5wZXRSb290fV8ke2ZhY2V9XzhmcHMuZ2lmYDtcbiAgICAgICAgaWYgKHRoaXMuZWwuc3JjID09PSBuZXdGYWNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbC5zcmMgPSBuZXdGYWNlO1xuICAgIH1cblxuICAgIGNob29zZU5leHRTdGF0ZShmcm9tU3RhdGU6IFN0YXRlcyk6IFN0YXRlcyB7XG4gICAgICAgIC8vIFdvcmsgb3V0IG5leHQgc3RhdGVcbiAgICAgICAgdmFyIHBvc3NpYmxlTmV4dFN0YXRlczogU3RhdGVzW10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwIDsgaSA8IHRoaXMuc2VxdWVuY2Uuc2VxdWVuY2VTdGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcXVlbmNlLnNlcXVlbmNlU3RhdGVzW2ldLnN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXMgPSB0aGlzLnNlcXVlbmNlLnNlcXVlbmNlU3RhdGVzW2ldLnBvc3NpYmxlTmV4dFN0YXRlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBvc3NpYmxlTmV4dFN0YXRlcyl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFN0YXRlRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmFuZG9tbHkgY2hvb3NlIHRoZSBuZXh0IHN0YXRlXG4gICAgICAgIGNvbnN0IGlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlTmV4dFN0YXRlcy5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gcG9zc2libGVOZXh0U3RhdGVzW2lkeF07XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLmZhY2VMZWZ0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50U3RhdGUuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodCkge1xuICAgICAgICAgICAgdGhpcy5mYWNlUmlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbih0aGlzLmN1cnJlbnRTdGF0ZS5zcHJpdGVMYWJlbCk7XG4gICAgICAgIHZhciBmcmFtZVJlc3VsdCA9IHRoaXMuY3VycmVudFN0YXRlLm5leHRGcmFtZSgpO1xuICAgICAgICBpZiAoZnJhbWVSZXN1bHQgPT09IEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIElmIHJlY292ZXJpbmcgZnJvbSBzd2lwZS4uXG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkU3RhdGUgJiYgdGhpcy5ob2xkU3RhdGVFbnVtKXtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuaG9sZFN0YXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHRoaXMuaG9sZFN0YXRlRW51bTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRTdGF0ZUVudW0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5jaG9vc2VOZXh0U3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKG5leHRTdGF0ZSwgdGhpcy5lbCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBuZXh0U3RhdGU7XG4gICAgICAgIH0gZWxzZSBpZiAoZnJhbWVSZXN1bHQgPT09IEZyYW1lUmVzdWx0LnN0YXRlQ2FuY2VsKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPT09IFN0YXRlcy5jaGFzZSkgeyAvLyBDdXJyZW50bHkgdGhlIG9ubHkgb25lIGFueXdheVxuICAgICAgICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSB0aGlzLmNob29zZU5leHRTdGF0ZShTdGF0ZXMuaWRsZVdpdGhCYWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZShuZXh0U3RhdGUsIHRoaXMuZWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IG5leHRTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQ2F0IGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJjYXRcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMuY2xpbWJXYWxsTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMuY2xpbWJXYWxsTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jbGltYldhbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxsSGFuZ0xlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2FsbEhhbmdMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5qdW1wRG93bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuanVtcERvd25MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5sYW5kXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmxhbmQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNhblN3aXBlKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuY2xpbWJXYWxsTGVmdCB8fFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuanVtcERvd25MZWZ0IHx8IFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMubGFuZCB8fFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMud2FsbEhhbmdMZWZ0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRG9nIGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJkb2dcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodCwgU3RhdGVzLmxpZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5saWUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5saWVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmxpZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFNuYWtlIGV4dGVuZHMgQmFzZVBldFR5cGUge1xuICAgIGxhYmVsID0gXCJzbmFrZVwiO1xuICAgIHNlcXVlbmNlID0ge1xuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIENsaXBweSBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwiY2xpcHB5XCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgUnViYmVyRHVjayBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwicnViYmVyIGR1Y2tcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkUGV0RXhjZXB0aW9uIHtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBldChwZXRUeXBlOiBzdHJpbmcsIGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBwZXRSb290OiBzdHJpbmcpIDogSVBldFR5cGUge1xuICAgIGlmIChwZXRUeXBlID09PSBcImNhdFwiKXtcbiAgICAgICAgcmV0dXJuIG5ldyBDYXQoZWwsIHBldFJvb3QpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcImRvZ1wiKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9nKGVsLCBwZXRSb290KTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJzbmFrZVwiKSB7XG4gICAgICAgIHJldHVybiBuZXcgU25ha2UoZWwsIHBldFJvb3QpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcImNsaXBweVwiKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpcHB5KGVsLCBwZXRSb290KTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJydWJiZXIgZHVja1wiKSB7XG4gICAgICAgIHJldHVybiBuZXcgUnViYmVyRHVjayhlbCwgcGV0Um9vdCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBJbnZhbGlkUGV0RXhjZXB0aW9uKCk7XG59XG5cbiIsImltcG9ydCB7IFBldENvbG9yLCBQZXRUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgUGV0SW5zdGFuY2VTdGF0ZSB7XG4gICAgY3VycmVudFN0YXRlRW51bTogU3RhdGVzIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY2xhc3MgUGV0RWxlbWVudFN0YXRlIHtcbiAgICBwZXRTdGF0ZTogUGV0SW5zdGFuY2VTdGF0ZSB8IHVuZGVmaW5lZDtcbiAgICBwZXRUeXBlOiBQZXRUeXBlIHwgdW5kZWZpbmVkO1xuICAgIHBldENvbG9yOiBQZXRDb2xvciB8IHVuZGVmaW5lZDtcbiAgICBlbExlZnQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBlbEJvdHRvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY2xhc3MgUGV0UGFuZWxTdGF0ZSB7XG4gICAgcGV0U3RhdGVzOiBBcnJheTxQZXRFbGVtZW50U3RhdGU+IHwgdW5kZWZpbmVkO1xufVxuXG5cbmV4cG9ydCBlbnVtIEhvcml6b250YWxEaXJlY3Rpb24ge1xuICAgIGxlZnQsXG4gICAgcmlnaHQsXG4gICAgbmF0dXJhbCAvLyBObyBjaGFuZ2UgdG8gY3VycmVudCBkaXJlY3Rpb25cbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gU3RhdGVzIHtcbiAgICBzaXRJZGxlID0gXCJzaXQtaWRsZVwiLFxuICAgIHdhbGtSaWdodCA9IFwid2Fsay1yaWdodFwiLFxuICAgIHdhbGtMZWZ0ID0gXCJ3YWxrLWxlZnRcIixcbiAgICBydW5SaWdodCA9IFwicnVuLXJpZ2h0XCIsXG4gICAgcnVuTGVmdCA9IFwicnVuLWxlZnRcIixcbiAgICBsaWUgPSBcImxpZVwiLFxuICAgIHdhbGxIYW5nTGVmdCA9IFwid2FsbC1oYW5nLWxlZnRcIixcbiAgICBjbGltYldhbGxMZWZ0ID0gXCJjbGltYi13YWxsLWxlZnRcIixcbiAgICBqdW1wRG93bkxlZnQgPSBcImp1bXAtZG93bi1sZWZ0XCIsXG4gICAgbGFuZCA9IFwibGFuZFwiLFxuICAgIHN3aXBlID0gXCJzd2lwZVwiLFxuICAgIGlkbGVXaXRoQmFsbCA9IFwiaWRsZS13aXRoLWJhbGxcIixcbiAgICBjaGFzZSA9IFwiY2hhc2VcIlxufVxuXG5leHBvcnQgZW51bSBGcmFtZVJlc3VsdCB7IFxuICAgIHN0YXRlQ29udGludWUsXG4gICAgc3RhdGVDb21wbGV0ZSxcbiAgICAvLyBTcGVjaWFsIHN0YXRlc1xuICAgIHN0YXRlQ2FuY2VsXG59XG5cbmV4cG9ydCBjbGFzcyBCYWxsU3RhdGUge1xuICAgIGN4OiBudW1iZXI7XG4gICAgY3k6IG51bWJlcjtcbiAgICB2eDogbnVtYmVyO1xuICAgIHZ5OiBudW1iZXI7XG4gICAgcGF1c2VkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoY3g6IG51bWJlciwgY3k6IG51bWJlciwgdng6IG51bWJlciwgdnk6IG51bWJlcil7XG4gICAgICAgIHRoaXMuY3ggPSBjeDtcbiAgICAgICAgdGhpcy5jeSA9IGN5O1xuICAgICAgICB0aGlzLnZ4ID0gdng7XG4gICAgICAgIHRoaXMudnkgPSB2eTtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlU3RhdGUoc3RhdGU6IHN0cmluZywgZWw6IEhUTUxJbWFnZUVsZW1lbnQpOiBJU3RhdGUge1xuICAgIHN3aXRjaChzdGF0ZSl7XG4gICAgICAgIGNhc2UgU3RhdGVzLnNpdElkbGU6IHJldHVybiBuZXcgU2l0SWRsZVN0YXRlKGVsKTtcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa1JpZ2h0OiByZXR1cm4gbmV3IFdhbGtSaWdodFN0YXRlKGVsKTtcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa0xlZnQ6IHJldHVybiBuZXcgV2Fsa0xlZnRTdGF0ZShlbCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLnJ1blJpZ2h0OiByZXR1cm4gbmV3IFJ1blJpZ2h0U3RhdGUoZWwpO1xuICAgICAgICBjYXNlIFN0YXRlcy5ydW5MZWZ0OiByZXR1cm4gbmV3IFJ1bkxlZnRTdGF0ZShlbCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmxpZTogcmV0dXJuIG5ldyBMaWVTdGF0ZShlbCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLndhbGxIYW5nTGVmdDogcmV0dXJuIG5ldyBXYWxsSGFuZ0xlZnRTdGF0ZShlbCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmNsaW1iV2FsbExlZnQ6IHJldHVybiBuZXcgQ2xpbWJXYWxsTGVmdFN0YXRlKGVsKTtcbiAgICAgICAgY2FzZSBTdGF0ZXMuanVtcERvd25MZWZ0OiByZXR1cm4gbmV3IEp1bXBEb3duTGVmdFN0YXRlKGVsKTtcbiAgICAgICAgY2FzZSBTdGF0ZXMubGFuZDogcmV0dXJuIG5ldyBMYW5kU3RhdGUoZWwpO1xuICAgICAgICBjYXNlIFN0YXRlcy5zd2lwZTogcmV0dXJuIG5ldyBTd2lwZVN0YXRlKGVsKTtcbiAgICAgICAgY2FzZSBTdGF0ZXMuaWRsZVdpdGhCYWxsOiByZXR1cm4gbmV3IElkbGVXaXRoQmFsbFN0YXRlKGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTaXRJZGxlU3RhdGUoZWwpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0ZSB7XG4gICAgbGFiZWw6IHN0cmluZ1xuICAgIHNwcml0ZUxhYmVsOiBzdHJpbmdcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uOiBIb3Jpem9udGFsRGlyZWN0aW9uXG4gICAgbmV4dEZyYW1lKCk6IEZyYW1lUmVzdWx0XG59XG5cbmNsYXNzIEFic3RyYWN0U3RhdGljU3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLnNpdElkbGU7XG4gICAgaWRsZUNvdW50ZXI6IG51bWJlcjtcbiAgICBzcHJpdGVMYWJlbCA9IFwiaWRsZVwiO1xuICAgIGhvbGRUaW1lID0gNTA7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcblxuICAgIGNvbnN0cnVjdG9yKHBldEVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5pZGxlQ291bnRlciA9IDA7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIHRoaXMuaWRsZUNvdW50ZXIrKztcbiAgICAgICAgaWYgKHRoaXMuaWRsZUNvdW50ZXIgPiB0aGlzLmhvbGRUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTaXRJZGxlU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5zaXRJZGxlO1xuICAgIHNwcml0ZUxhYmVsID0gXCJpZGxlXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgaG9sZFRpbWUgPSA1MDtcbn1cblxuZXhwb3J0IGNsYXNzIExpZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMubGllO1xuICAgIHNwcml0ZUxhYmVsID0gXCJsaWVcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcbiAgICBob2xkVGltZSA9IDUwO1xufVxuXG5leHBvcnQgY2xhc3MgV2FsbEhhbmdMZWZ0U3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy53YWxsSGFuZ0xlZnQ7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGxncmFiXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBob2xkVGltZSA9IDUwO1xufVxuXG5leHBvcnQgY2xhc3MgTGFuZFN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMubGFuZDtcbiAgICBzcHJpdGVMYWJlbCA9IFwibGFuZFwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgaG9sZFRpbWUgPSAxMDtcbn1cblxuZXhwb3J0IGNsYXNzIFN3aXBlU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5zd2lwZTtcbiAgICBzcHJpdGVMYWJlbCA9IFwic3dpcGVcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5uYXR1cmFsO1xuICAgIGhvbGRUaW1lID0gMTA7XG59XG5cbmV4cG9ydCBjbGFzcyBJZGxlV2l0aEJhbGxTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmlkbGVXaXRoQmFsbDtcbiAgICBzcHJpdGVMYWJlbCA9IFwid2l0aF9iYWxsXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBob2xkVGltZSA9IDMwO1xufVxuXG5leHBvcnQgY2xhc3MgV2Fsa1JpZ2h0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLndhbGtSaWdodDtcbiAgICBwZXRMZWZ0OiBudW1iZXI7XG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwid2Fsa1wiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xuICAgIGxlZnRCb3VuZGFyeTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocGV0RWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICB0aGlzLnBldExlZnQgPSBwYXJzZUludChwZXRFbGVtZW50LnN0eWxlLmxlZnQpO1xuICAgICAgICB0aGlzLmVsID0gcGV0RWxlbWVudDtcbiAgICAgICAgdGhpcy5sZWZ0Qm91bmRhcnkgPSBNYXRoLmZsb29yKHdpbmRvdy5pbm5lcldpZHRoICogMC45NSk7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIHRoaXMucGV0TGVmdCArPSB0aGlzLnNraXBTcGVlZDtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5wZXRMZWZ0fXB4YDtcbiAgICAgICAgaWYgKHRoaXMucGV0TGVmdCA+PSB0aGlzLmxlZnRCb3VuZGFyeSAtIHRoaXMuZWwud2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdhbGtMZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLndhbGtMZWZ0O1xuICAgIHBldExlZnQ6IG51bWJlcjtcbiAgICBlbDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBza2lwU3BlZWQgPSAzO1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcblxuICAgIGNvbnN0cnVjdG9yKHBldEVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wZXRMZWZ0ID0gcGFyc2VJbnQocGV0RWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgICAgICAgdGhpcy5lbCA9IHBldEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XG4gICAgICAgIHRoaXMucGV0TGVmdCAtPSB0aGlzLnNraXBTcGVlZDtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5wZXRMZWZ0fXB4YDtcbiAgICAgICAgaWYgKHRoaXMucGV0TGVmdCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSdW5SaWdodFN0YXRlIGV4dGVuZHMgV2Fsa1JpZ2h0U3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLnJ1blJpZ2h0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcbiAgICBza2lwU3BlZWQgPSA1O1xufVxuXG5leHBvcnQgY2xhc3MgUnVuTGVmdFN0YXRlIGV4dGVuZHMgV2Fsa0xlZnRTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMucnVuTGVmdDtcbiAgICBzcHJpdGVMYWJlbCA9IFwid2Fsa19mYXN0XCI7XG4gICAgc2tpcFNwZWVkID0gNTtcbn1cblxuZXhwb3J0IGNsYXNzIENoYXNlU3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmNoYXNlO1xuICAgIHBldExlZnQ6IG51bWJlcjtcbiAgICBlbDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBza2lwU3BlZWQgPSAzO1xuICAgIHNwcml0ZUxhYmVsID0gXCJydW5cIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgIGJhbGxTdGF0ZTogQmFsbFN0YXRlO1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXRFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LCBiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICB0aGlzLnBldExlZnQgPSBwYXJzZUludChwZXRFbGVtZW50LnN0eWxlLmxlZnQpO1xuICAgICAgICB0aGlzLmVsID0gcGV0RWxlbWVudDtcbiAgICAgICAgdGhpcy5iYWxsU3RhdGUgPSBiYWxsU3RhdGU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICBpZiAodGhpcy5iYWxsU3RhdGUucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDYW5jZWw7IC8vIEJhbGwgaXMgYWxyZWFkeSBjYXVnaHRcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wZXRMZWZ0ID4gdGhpcy5iYWxsU3RhdGUuY3gpIHtcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICAgICAgICAgIHRoaXMucGV0TGVmdCAtPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcbiAgICAgICAgICAgIHRoaXMucGV0TGVmdCArPSAzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5wZXRMZWZ0fXB4YDtcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuYmFsbFN0YXRlLmN5IDwgdGhpcy5lbC53aWR0aCAmJiB0aGlzLmJhbGxTdGF0ZS5jeCA8IHRoaXMucGV0TGVmdCAmJiB0aGlzLnBldExlZnQgPCB0aGlzLmJhbGxTdGF0ZS5jeCArIDE1KSB7XG4gICAgICAgICAgICAvLyBoaWRlIGJhbGxcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuYmFsbFN0YXRlLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDbGltYldhbGxMZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmNsaW1iV2FsbExlZnQ7XG4gICAgcGV0Qm90dG9tOiBudW1iZXI7XG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwid2FsbGNsaW1iXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcblxuICAgIGNvbnN0cnVjdG9yKHBldEVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wZXRCb3R0b20gPSBwYXJzZUludChwZXRFbGVtZW50LnN0eWxlLmJvdHRvbSk7XG4gICAgICAgIHRoaXMuZWwgPSBwZXRFbGVtZW50O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldEJvdHRvbSArPSAxO1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMucGV0Qm90dG9tfXB4YDtcbiAgICAgICAgaWYgKHRoaXMucGV0Qm90dG9tID49IDEwMCkge1xuICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEp1bXBEb3duTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5qdW1wRG93bkxlZnQ7XG4gICAgcGV0Qm90dG9tOiBudW1iZXI7XG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwiZmFsbF9mcm9tX2dyYWJcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcblxuICAgIGNvbnN0cnVjdG9yKHBldEVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wZXRCb3R0b20gPSBwYXJzZUludChwZXRFbGVtZW50LnN0eWxlLmJvdHRvbSk7XG4gICAgICAgIHRoaXMuZWwgPSBwZXRFbGVtZW50O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldEJvdHRvbSAtPSA1O1xuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMucGV0Qm90dG9tfXB4YDtcbiAgICAgICAgaWYgKHRoaXMucGV0Qm90dG9tIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucGV0Qm90dG9tID0gMDtcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xuICAgICAgICB9ICAgXG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBUaGlzIHNjcmlwdCB3aWxsIGJlIHJ1biB3aXRoaW4gdGhlIHdlYnZpZXcgaXRzZWxmXG5pbXBvcnQgeyBQZXRTaXplLCBQZXRDb2xvciwgUGV0VHlwZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVBldCwgSVBldFR5cGV9IGZyb20gJy4vcGV0cyc7XG5pbXBvcnQgeyBCYWxsU3RhdGUsIFBldFBhbmVsU3RhdGUgfSBmcm9tICcuL3N0YXRlcyc7XG5cbi8qIFRoaXMgaXMgaG93IHRoZSBWUyBDb2RlIEFQSSBjYW4gYmUgaW52b2tlZCBmcm9tIHRoZSBwYW5lbCAqL1xuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgVnNjb2RlU3RhdGVBcGkgeyBcbiAgICBnZXRTdGF0ZSgpIDogUGV0UGFuZWxTdGF0ZTsgLy8gQVBJIGlzIGFjdHVhbGx5IEFueSwgYnV0IHdlIHdhbnQgaXQgdG8gYmUgdHlwZWQuXG4gICAgc2V0U3RhdGUoc3RhdGU6IFBldFBhbmVsU3RhdGUpOiB2b2lkO1xuICB9XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIGFjcXVpcmVWc0NvZGVBcGkoKTogVnNjb2RlU3RhdGVBcGk7XG4gIH1cbn1cblxuY29uc3QgdnNjb2RlID0gd2luZG93LmFjcXVpcmVWc0NvZGVBcGkoKTtcblxuY2xhc3MgUGV0RWxlbWVudCB7XG4gIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xuICBwZXQ6IElQZXRUeXBlO1xuICBjb2xvcjogUGV0Q29sb3I7XG4gIHR5cGU6IFBldFR5cGU7XG5cbiAgY29uc3RydWN0b3IoZWw6IEhUTUxJbWFnZUVsZW1lbnQsIHBldDogSVBldFR5cGUsIGNvbG9yOiBQZXRDb2xvciwgdHlwZTogUGV0VHlwZSl7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMucGV0ID0gcGV0O1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG59XG5cbnZhciBhbGxQZXRzOiBBcnJheTxQZXRFbGVtZW50PiA9IG5ldyBBcnJheSgwKTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlQmFsbFJhZGl1cyhzaXplOiBQZXRTaXplKTogbnVtYmVye1xuICBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5uYW5vKXtcbiAgICByZXR1cm4gMjtcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLm1lZGl1bSl7XG4gICAgcmV0dXJuIDQ7XG4gIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5sYXJnZSl7XG4gICAgcmV0dXJuIDg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDE7IC8vIFNocnVnXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlU3ByaXRlV2lkdGgoc2l6ZTogUGV0U2l6ZSk6IG51bWJlcntcbiAgaWYgKHNpemUgPT09IFBldFNpemUubmFubyl7XG4gICAgcmV0dXJuIDMwO1xuICB9IGVsc2UgaWYgKHNpemUgPT09IFBldFNpemUubWVkaXVtKXtcbiAgICByZXR1cm4gNTU7XG4gIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5sYXJnZSl7XG4gICAgcmV0dXJuIDExMDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMzA7IC8vIFNocnVnXG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdFNwcml0ZShlbDogSFRNTEltYWdlRWxlbWVudCwgcGV0U2l6ZTogUGV0U2l6ZSwgbGVmdDogc3RyaW5nLCBib3R0b206IHN0cmluZykge1xuICBlbC5zdHlsZS5sZWZ0ID0gbGVmdDtcbiAgZWwuc3R5bGUuYm90dG9tID0gYm90dG9tO1xuICBlbC5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xuICBlbC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgZWwuc3R5bGUubWF4V2lkdGggPSBgJHtjYWxjdWxhdGVTcHJpdGVXaWR0aChwZXRTaXplKX1weGA7XG4gIGVsLnN0eWxlLm1heEhlaWdodCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTW91c2VPdmVyKGU6IE1vdXNlRXZlbnQpe1xuICB2YXIgZWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgYWxsUGV0cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGlmIChlbGVtZW50LmVsID09PSBlbCl7XG4gICAgICBpZiAoIWVsZW1lbnQucGV0LmNhblN3aXBlKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWxlbWVudC5wZXQuc3dpcGUoKTtcbiAgICB9XG4gIH0pO1xuICBcbn1cblxuZnVuY3Rpb24gc3RhcnRBbmltYXRpb25zKGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBwZXQ6IElQZXRUeXBlKSB7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VPdmVyKTtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHBldC5uZXh0RnJhbWUoKTtcbiAgICBzYXZlU3RhdGUoKTtcbiAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gYWRkUGV0VG9QYW5lbChwZXRUeXBlOiBQZXRUeXBlLCBiYXNlUGV0VXJpOiBzdHJpbmcsIHBldENvbG9yOiBQZXRDb2xvciwgcGV0U2l6ZTogUGV0U2l6ZSwgbGVmdDogc3RyaW5nLCBib3R0b206IHN0cmluZyk6IFBldEVsZW1lbnQge1xuICB2YXIgcGV0U3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIHBldFNwcml0ZUVsZW1lbnQuY2xhc3NOYW1lID0gXCJwZXRcIjtcbiAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGV0c0NvbnRhaW5lclwiKSBhcyBIVE1MRGl2RWxlbWVudCkuYXBwZW5kQ2hpbGQocGV0U3ByaXRlRWxlbWVudCk7XG4gIGNvbnN0IHJvb3QgPSBiYXNlUGV0VXJpICsgJy8nICsgcGV0VHlwZSArICcvJyArIHBldENvbG9yO1xuICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIG5ldyBwZXQgOiBcIiwgcGV0VHlwZSwgcm9vdCk7XG4gIHZhciBuZXdQZXQgPSBjcmVhdGVQZXQocGV0VHlwZSwgcGV0U3ByaXRlRWxlbWVudCwgcm9vdCk7XG4gIGluaXRTcHJpdGUocGV0U3ByaXRlRWxlbWVudCwgcGV0U2l6ZSwgbGVmdCwgYm90dG9tKTtcbiAgc3RhcnRBbmltYXRpb25zKHBldFNwcml0ZUVsZW1lbnQsIG5ld1BldCk7XG4gIHJldHVybiBuZXcgUGV0RWxlbWVudChwZXRTcHJpdGVFbGVtZW50LCBuZXdQZXQsIHBldENvbG9yLCBwZXRUeXBlKTtcbn1cblxuZnVuY3Rpb24gc2F2ZVN0YXRlKCl7XG4gIHZhciBzdGF0ZSA9IG5ldyBQZXRQYW5lbFN0YXRlKCk7XG4gIHN0YXRlLnBldFN0YXRlcyA9IG5ldyBBcnJheSgpO1xuXG4gIGFsbFBldHMuZm9yRWFjaChwZXRJdGVtID0+IHtcbiAgICBzdGF0ZS5wZXRTdGF0ZXMhLnB1c2goe1xuICAgICAgcGV0Q29sb3I6IHBldEl0ZW0uY29sb3IsXG4gICAgICBwZXRUeXBlOiBwZXRJdGVtLnR5cGUsXG4gICAgICBwZXRTdGF0ZTogcGV0SXRlbS5wZXQuZ2V0U3RhdGUoKSxcbiAgICAgIGVsTGVmdDogcGV0SXRlbS5lbC5zdHlsZS5sZWZ0LFxuICAgICAgZWxCb3R0b206IHBldEl0ZW0uZWwuc3R5bGUuYm90dG9tXG4gICAgfSk7XG4gIH0pO1xuICB2c2NvZGUuc2V0U3RhdGUoc3RhdGUpO1xufVxuXG5mdW5jdGlvbiByZWNvdmVyU3RhdGUoYmFzZVBldFVyaTogc3RyaW5nLCBwZXRTaXplOiBQZXRTaXplKXtcbiAgdmFyIHN0YXRlID0gdnNjb2RlLmdldFN0YXRlKCk7XG4gIHN0YXRlLnBldFN0YXRlcyEuZm9yRWFjaChwID0+IHtcbiAgICB2YXIgbmV3UGV0ID0gYWRkUGV0VG9QYW5lbChwLnBldFR5cGUhLCBiYXNlUGV0VXJpLCBwLnBldENvbG9yISwgcGV0U2l6ZSwgcC5lbExlZnQhLCBwLmVsQm90dG9tISk7XG4gICAgbmV3UGV0LnBldC5yZWNvdmVyU3RhdGUocC5wZXRTdGF0ZSEpO1xuICAgIGFsbFBldHMucHVzaChuZXdQZXQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmFuZG9tU3RhcnRQb3NpdGlvbigpIDogc3RyaW5nIHtcbiAgY29uc3QgeDogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lcldpZHRoICogMC43KSk7XG4gIHJldHVybiBgJHt4fXB4YDtcbn1cblxuLy8gSXQgY2Fubm90IGFjY2VzcyB0aGUgbWFpbiBWUyBDb2RlIEFQSXMgZGlyZWN0bHkuXG5leHBvcnQgZnVuY3Rpb24gcGV0UGFuZWxBcHAoYmFzZVBldFVyaTogc3RyaW5nLCBwZXRDb2xvcjogUGV0Q29sb3IsIHBldFNpemU6IFBldFNpemUsIHBldFR5cGU6IFBldFR5cGUpIHtcbiAgY29uc3QgYmFsbFJhZGl1czogbnVtYmVyID0gY2FsY3VsYXRlQmFsbFJhZGl1cyhwZXRTaXplKTtcblxuICAvLy8gQm91bmNpbmcgYmFsbCBjb21wb25lbnRzLCBjcmVkaXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI5OTgyMzQzXG4gIHZhciBjYW52YXMgOiBIVE1MQ2FudmFzRWxlbWVudCwgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIGNvbnN0IGdyYXZpdHk6IG51bWJlciA9IDAuMiwgZGFtcGluZzogbnVtYmVyID0gMC45LCB0cmFjdGlvbjogbnVtYmVyID0gMC44O1xuICB2YXIgYmFsbFN0YXRlOiBCYWxsU3RhdGU7XG5cbiAgZnVuY3Rpb24gaW5pdEJhbGxQaHlzaWNzKCkge1xuICAgIGNhbnZhcyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBldENhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudCk7XG4gICAgY3R4ID0gKGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTtcbiAgICBjdHguY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY3R4LmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldEJhbGwoKSB7XG4gICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgYmFsbFN0YXRlID0gbmV3IEJhbGxTdGF0ZSgxMDAsIDEwMCwgMiwgNSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aHJvd0JhbGwoKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGlmICghYmFsbFN0YXRlLnBhdXNlZCkge3JlcXVlc3RBbmltYXRpb25GcmFtZSh0aHJvd0JhbGwpO31cblxuICAgIGlmIChiYWxsU3RhdGUuY3ggKyBiYWxsUmFkaXVzID49IGNhbnZhcy53aWR0aCkge1xuICAgICAgYmFsbFN0YXRlLnZ4ID0gLWJhbGxTdGF0ZS52eCAqIGRhbXBpbmc7XG4gICAgICBiYWxsU3RhdGUuY3ggPSBjYW52YXMud2lkdGggLSBiYWxsUmFkaXVzO1xuICAgIH0gZWxzZSBpZiAoYmFsbFN0YXRlLmN4IC0gYmFsbFJhZGl1cyA8PSAwKSB7XG4gICAgICBiYWxsU3RhdGUudnggPSAtYmFsbFN0YXRlLnZ4ICogZGFtcGluZztcbiAgICAgIGJhbGxTdGF0ZS5jeCA9IGJhbGxSYWRpdXM7XG4gICAgfVxuICAgIGlmIChiYWxsU3RhdGUuY3kgKyBiYWxsUmFkaXVzID49IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgIGJhbGxTdGF0ZS52eSA9IC1iYWxsU3RhdGUudnkgKiBkYW1waW5nO1xuICAgICAgYmFsbFN0YXRlLmN5ID0gY2FudmFzLmhlaWdodCAtIGJhbGxSYWRpdXM7XG4gICAgICAvLyB0cmFjdGlvbiBoZXJlXG4gICAgICBiYWxsU3RhdGUudnggKj0gdHJhY3Rpb247XG4gICAgfSBlbHNlIGlmIChiYWxsU3RhdGUuY3kgLSBiYWxsUmFkaXVzIDw9IDApIHtcbiAgICAgIGJhbGxTdGF0ZS52eSA9IC1iYWxsU3RhdGUudnkgKiBkYW1waW5nO1xuICAgICAgYmFsbFN0YXRlLmN5ID0gYmFsbFJhZGl1cztcbiAgICB9XG5cbiAgICBiYWxsU3RhdGUudnkgKz0gZ3Jhdml0eTtcblxuICAgIGJhbGxTdGF0ZS5jeCArPSBiYWxsU3RhdGUudng7XG4gICAgYmFsbFN0YXRlLmN5ICs9IGJhbGxTdGF0ZS52eTtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGJhbGxTdGF0ZS5jeCwgYmFsbFN0YXRlLmN5LCBiYWxsUmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMyZWQ4NTFcIjtcbiAgICBjdHguZmlsbCgpO1xuICB9XG5cbiAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIHBldCBzZXNzaW9uJywgcGV0Q29sb3IsIGJhc2VQZXRVcmksIHBldFR5cGUpO1xuICAvLyBOZXcgc2Vzc2lvblxuICB2YXIgc3RhdGUgPSB2c2NvZGUuZ2V0U3RhdGUoKTtcbiAgaWYgKCFzdGF0ZSkge1xuICAgIGNvbnNvbGUubG9nKCdObyBzdGF0ZSwgc3RhcnRpbmcgYSBuZXcgc2Vzc2lvbi4nKTtcbiAgICBhbGxQZXRzLnB1c2goYWRkUGV0VG9QYW5lbChwZXRUeXBlLCBiYXNlUGV0VXJpLCBwZXRDb2xvciwgcGV0U2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCAnMHB4JykpO1xuICAgIHNhdmVTdGF0ZSgpO1xuICB9IGVsc2UgeyBcbiAgICBjb25zb2xlLmxvZygnUmVjb3ZlcmluZyBzdGF0ZSAtICcsIHN0YXRlKTtcbiAgICByZWNvdmVyU3RhdGUoYmFzZVBldFVyaSwgcGV0U2l6ZSk7XG4gIH1cblxuICBpbml0QmFsbFBoeXNpY3MoKTtcblxuICAvLyBIYW5kbGUgbWVzc2FnZXMgc2VudCBmcm9tIHRoZSBleHRlbnNpb24gdG8gdGhlIHdlYnZpZXdcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhOyAvLyBUaGUganNvbiBkYXRhIHRoYXQgdGhlIGV4dGVuc2lvbiBzZW50XG4gICAgc3dpdGNoIChtZXNzYWdlLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgXCJ0aHJvdy1iYWxsXCI6XG4gICAgICAgIHJlc2V0QmFsbCgpO1xuICAgICAgICB0aHJvd0JhbGwoKTtcbiAgICAgICAgYWxsUGV0cy5mb3JFYWNoKHBldEVsID0+IHtcbiAgICAgICAgICBwZXRFbC5wZXQuY2hhc2UoYmFsbFN0YXRlLCBjYW52YXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic3Bhd24tcGV0XCI6XG4gICAgICAgIGFsbFBldHMucHVzaChhZGRQZXRUb1BhbmVsKG1lc3NhZ2UudHlwZSwgYmFzZVBldFVyaSwgbWVzc2FnZS5jb2xvciwgcGV0U2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCAnMHB4JykpO1xuICAgICAgICBzYXZlU3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmVzZXQtcGV0XCI6XG4gICAgICAgIGFsbFBldHMuZm9yRWFjaChwZXQgPT4gcGV0LmVsLnJlbW92ZSgpKTtcbiAgICAgICAgYWxsUGV0cyA9IFtdO1xuICAgICAgICBhbGxQZXRzLnB1c2goYWRkUGV0VG9QYW5lbChtZXNzYWdlLnR5cGUsIGJhc2VQZXRVcmksIG1lc3NhZ2UuY29sb3IsIG1lc3NhZ2Uuc2l6ZSwgcmFuZG9tU3RhcnRQb3NpdGlvbigpLCAnMHB4JykpO1xuICAgICAgICBzYXZlU3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9