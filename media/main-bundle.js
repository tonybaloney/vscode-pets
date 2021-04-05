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
let canvas, ctx;
function initBallPhysics() {
    canvas = document.getElementById("petCanvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
// It cannot access the main VS Code APIs directly.
function petPanelApp(basePetUri, petColor, petSize, petType) {
    const ballRadius = calculateBallRadius(petSize);
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
window.addEventListener('resize', function () {
    initBallPhysics();
});

})();

self.petApp = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvcGV0cy50cyIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvc3RhdGVzLnRzIiwid2VicGFjazovL3BldEFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsOEVBQW1JO0FBRW5JLE1BQWEscUJBQXFCO0NBRWpDO0FBRkQsc0RBRUM7QUFXRCxNQUFlLFdBQVc7SUFVdEIsWUFBWSxhQUErQixFQUFFLE9BQWU7UUFUNUQsVUFBSyxHQUFXLE1BQU0sQ0FBQztRQUN2QixhQUFRLEdBQWtCLEVBQUUsYUFBYSwwQkFBZ0IsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFTM0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUF1QjtRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFpQixDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxRQUFRO1FBQ0osNENBQTRDO1FBQzVDLE9BQU8sSUFBSSxDQUFDO0lBQ2hC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Z0JBQ1osU0FBUyxFQUFFLENBQUM7Z0JBQ1osT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1IsS0FBSyxXQUFXO2dCQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUcsU0FBUyxFQUFFLENBQUM7Z0JBQ1osTUFBTTtZQUNSLEtBQUssV0FBVztnQkFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pILFNBQVMsRUFBRSxDQUFDO2dCQUNaLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpGRCxrQ0FpRkM7QUFBQSxDQUFDO0FBRUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtJQUNoQyxlQUFlLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXF1ZW5jZVRyZWUgfSBmcm9tIFwiLi9zZXF1ZW5jZXNcIjtcbmltcG9ydCB7IElTdGF0ZSwgU3RhdGVzLCByZXNvbHZlU3RhdGUsIEhvcml6b250YWxEaXJlY3Rpb24sIENoYXNlU3RhdGUsIEJhbGxTdGF0ZSwgRnJhbWVSZXN1bHQsIFBldEluc3RhbmNlU3RhdGUgfSBmcm9tIFwiLi9zdGF0ZXNcIjtcblxuZXhwb3J0IGNsYXNzIEludmFsaWRTdGF0ZUV4Y2VwdGlvbiB7XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGV0VHlwZSB7XG4gICAgY2FuU3dpcGUoKTogYm9vbGVhblxuICAgIHN3aXBlKCk6IHZvaWRcbiAgICBjaGFzZShiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWRcbiAgICBuZXh0RnJhbWUoKTogdm9pZFxuICAgIGdldFN0YXRlKCk6IFBldEluc3RhbmNlU3RhdGVcbiAgICByZWNvdmVyU3RhdGUoc3RhdGU6IFBldEluc3RhbmNlU3RhdGUpOiB2b2lkXG59IFxuXG5hYnN0cmFjdCBjbGFzcyBCYXNlUGV0VHlwZSBpbXBsZW1lbnRzIElQZXRUeXBlIHtcbiAgICBsYWJlbDogc3RyaW5nID0gXCJiYXNlXCI7XG4gICAgc2VxdWVuY2U6IElTZXF1ZW5jZVRyZWUgPSB7IHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLCBzZXF1ZW5jZVN0YXRlczogW119O1xuICAgIGN1cnJlbnRTdGF0ZTogSVN0YXRlO1xuICAgIGN1cnJlbnRTdGF0ZUVudW06IFN0YXRlcztcbiAgICBob2xkU3RhdGU6IElTdGF0ZSB8IHVuZGVmaW5lZDtcbiAgICBob2xkU3RhdGVFbnVtOiBTdGF0ZXMgfCB1bmRlZmluZWQ7XG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgcGV0Um9vdDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgcGV0Um9vdDogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5lbCA9IHNwcml0ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMucGV0Um9vdCA9IHBldFJvb3Q7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHRoaXMuc2VxdWVuY2Uuc3RhcnRpbmdTdGF0ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCBzcHJpdGVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBnZXRTdGF0ZSgpOiBQZXRJbnN0YW5jZVN0YXRlIHsgXG4gICAgICAgIHJldHVybiB7Y3VycmVudFN0YXRlRW51bTogdGhpcy5jdXJyZW50U3RhdGVFbnVtfTtcbiAgICB9XG5cbiAgICByZWNvdmVyU3RhdGUoc3RhdGU6IFBldEluc3RhbmNlU3RhdGUpe1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBzdGF0ZS5jdXJyZW50U3RhdGVFbnVtITtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCB0aGlzLmVsKTtcbiAgICB9XG5cbiAgICBjYW5Td2lwZSgpe1xuICAgICAgICAvLyBTb21lIHBldHMgb3ZlcnJpZGUgdGhpcyB3aXRoIGN1c3RvbSBydWxlc1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzd2lwZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLnN3aXBlKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLmhvbGRTdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlO1xuICAgICAgICB0aGlzLmhvbGRTdGF0ZUVudW0gPSB0aGlzLmN1cnJlbnRTdGF0ZUVudW07XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IFN0YXRlcy5zd2lwZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCB0aGlzLmVsKTtcbiAgICB9XG4gICAgXG4gICAgY2hhc2UoYmFsbFN0YXRlOiBCYWxsU3RhdGUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gU3RhdGVzLmNoYXNlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IG5ldyBDaGFzZVN0YXRlKHRoaXMuZWwsIGJhbGxTdGF0ZSwgY2FudmFzKTtcbiAgICB9XG5cbiAgICBmYWNlTGVmdCgpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcInNjYWxlWCgtMSlcIjtcbiAgICB9XG5cbiAgICBmYWNlUmlnaHQoKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZVgoMSlcIjtcbiAgICB9XG5cbiAgICBzZXRBbmltYXRpb24oZmFjZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IG5ld0ZhY2U6IHN0cmluZyA9IGAke3RoaXMucGV0Um9vdH1fJHtmYWNlfV84ZnBzLmdpZmA7XG4gICAgICAgIGlmICh0aGlzLmVsLnNyYyA9PT0gbmV3RmFjZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWwuc3JjID0gbmV3RmFjZTtcbiAgICB9XG5cbiAgICBjaG9vc2VOZXh0U3RhdGUoZnJvbVN0YXRlOiBTdGF0ZXMpOiBTdGF0ZXMge1xuICAgICAgICAvLyBXb3JrIG91dCBuZXh0IHN0YXRlXG4gICAgICAgIHZhciBwb3NzaWJsZU5leHRTdGF0ZXM6IFN0YXRlc1tdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCB0aGlzLnNlcXVlbmNlLnNlcXVlbmNlU3RhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlc1tpXS5zdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzID0gdGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlc1tpXS5wb3NzaWJsZU5leHRTdGF0ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwb3NzaWJsZU5leHRTdGF0ZXMpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTdGF0ZUV4Y2VwdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJhbmRvbWx5IGNob29zZSB0aGUgbmV4dCBzdGF0ZVxuICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZU5leHRTdGF0ZXMubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlTmV4dFN0YXRlc1tpZHhdO1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdCkge1xuICAgICAgICAgICAgdGhpcy5mYWNlTGVmdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFN0YXRlLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjZVJpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24odGhpcy5jdXJyZW50U3RhdGUuc3ByaXRlTGFiZWwpO1xuICAgICAgICB2YXIgZnJhbWVSZXN1bHQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5uZXh0RnJhbWUoKTtcbiAgICAgICAgaWYgKGZyYW1lUmVzdWx0ID09PSBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBJZiByZWNvdmVyaW5nIGZyb20gc3dpcGUuLlxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZFN0YXRlICYmIHRoaXMuaG9sZFN0YXRlRW51bSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmhvbGRTdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSB0aGlzLmhvbGRTdGF0ZUVudW07XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkU3RhdGVFbnVtID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5leHRTdGF0ZSA9IHRoaXMuY2hvb3NlTmV4dFN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZShuZXh0U3RhdGUsIHRoaXMuZWwpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gbmV4dFN0YXRlO1xuICAgICAgICB9IGVsc2UgaWYgKGZyYW1lUmVzdWx0ID09PSBGcmFtZVJlc3VsdC5zdGF0ZUNhbmNlbCl7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuY2hhc2UpIHsgLy8gQ3VycmVudGx5IHRoZSBvbmx5IG9uZSBhbnl3YXlcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5jaG9vc2VOZXh0U3RhdGUoU3RhdGVzLmlkbGVXaXRoQmFsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUobmV4dFN0YXRlLCB0aGlzLmVsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBuZXh0U3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIENhdCBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwiY2F0XCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2xpbWJXYWxsTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2FsbEhhbmdMZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGxIYW5nTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuanVtcERvd25MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmp1bXBEb3duTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMubGFuZF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5sYW5kLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBjYW5Td2lwZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmNsaW1iV2FsbExlZnQgfHxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmp1bXBEb3duTGVmdCB8fCBcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmxhbmQgfHxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLndhbGxIYW5nTGVmdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERvZyBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwiZG9nXCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHQsIFN0YXRlcy5saWVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMubGllLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMubGllXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5saWVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBTbmFrZSBleHRlbmRzIEJhc2VQZXRUeXBlIHtcbiAgICBsYWJlbCA9IFwic25ha2VcIjtcbiAgICBzZXF1ZW5jZSA9IHtcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBDbGlwcHkgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XG4gICAgbGFiZWwgPSBcImNsaXBweVwiO1xuICAgIHNlcXVlbmNlID0ge1xuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFJ1YmJlckR1Y2sgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XG4gICAgbGFiZWwgPSBcInJ1YmJlciBkdWNrXCI7XG4gICAgc2VxdWVuY2UgPSB7XG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgSW52YWxpZFBldEV4Y2VwdGlvbiB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQZXQocGV0VHlwZTogc3RyaW5nLCBlbDogSFRNTEltYWdlRWxlbWVudCwgcGV0Um9vdDogc3RyaW5nKSA6IElQZXRUeXBlIHtcbiAgICBpZiAocGV0VHlwZSA9PT0gXCJjYXRcIil7XG4gICAgICAgIHJldHVybiBuZXcgQ2F0KGVsLCBwZXRSb290KTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJkb2dcIikge1xuICAgICAgICByZXR1cm4gbmV3IERvZyhlbCwgcGV0Um9vdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwic25ha2VcIikge1xuICAgICAgICByZXR1cm4gbmV3IFNuYWtlKGVsLCBwZXRSb290KTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGV0VHlwZSA9PT0gXCJjbGlwcHlcIikge1xuICAgICAgICByZXR1cm4gbmV3IENsaXBweShlbCwgcGV0Um9vdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwicnViYmVyIGR1Y2tcIikge1xuICAgICAgICByZXR1cm4gbmV3IFJ1YmJlckR1Y2soZWwsIHBldFJvb3QpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgSW52YWxpZFBldEV4Y2VwdGlvbigpO1xufVxuXG4iLCJpbXBvcnQgeyBQZXRDb2xvciwgUGV0VHlwZSB9IGZyb20gXCIuLi9jb21tb24vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFBldEluc3RhbmNlU3RhdGUge1xuICAgIGN1cnJlbnRTdGF0ZUVudW06IFN0YXRlcyB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBldEVsZW1lbnRTdGF0ZSB7XG4gICAgcGV0U3RhdGU6IFBldEluc3RhbmNlU3RhdGUgfCB1bmRlZmluZWQ7XG4gICAgcGV0VHlwZTogUGV0VHlwZSB8IHVuZGVmaW5lZDtcbiAgICBwZXRDb2xvcjogUGV0Q29sb3IgfCB1bmRlZmluZWQ7XG4gICAgZWxMZWZ0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgZWxCb3R0b206IHN0cmluZyB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBldFBhbmVsU3RhdGUge1xuICAgIHBldFN0YXRlczogQXJyYXk8UGV0RWxlbWVudFN0YXRlPiB8IHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgZW51bSBIb3Jpem9udGFsRGlyZWN0aW9uIHtcbiAgICBsZWZ0LFxuICAgIHJpZ2h0LFxuICAgIG5hdHVyYWwgLy8gTm8gY2hhbmdlIHRvIGN1cnJlbnQgZGlyZWN0aW9uXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFN0YXRlcyB7XG4gICAgc2l0SWRsZSA9IFwic2l0LWlkbGVcIixcbiAgICB3YWxrUmlnaHQgPSBcIndhbGstcmlnaHRcIixcbiAgICB3YWxrTGVmdCA9IFwid2Fsay1sZWZ0XCIsXG4gICAgcnVuUmlnaHQgPSBcInJ1bi1yaWdodFwiLFxuICAgIHJ1bkxlZnQgPSBcInJ1bi1sZWZ0XCIsXG4gICAgbGllID0gXCJsaWVcIixcbiAgICB3YWxsSGFuZ0xlZnQgPSBcIndhbGwtaGFuZy1sZWZ0XCIsXG4gICAgY2xpbWJXYWxsTGVmdCA9IFwiY2xpbWItd2FsbC1sZWZ0XCIsXG4gICAganVtcERvd25MZWZ0ID0gXCJqdW1wLWRvd24tbGVmdFwiLFxuICAgIGxhbmQgPSBcImxhbmRcIixcbiAgICBzd2lwZSA9IFwic3dpcGVcIixcbiAgICBpZGxlV2l0aEJhbGwgPSBcImlkbGUtd2l0aC1iYWxsXCIsXG4gICAgY2hhc2UgPSBcImNoYXNlXCJcbn1cblxuZXhwb3J0IGVudW0gRnJhbWVSZXN1bHQgeyBcbiAgICBzdGF0ZUNvbnRpbnVlLFxuICAgIHN0YXRlQ29tcGxldGUsXG4gICAgLy8gU3BlY2lhbCBzdGF0ZXNcbiAgICBzdGF0ZUNhbmNlbFxufVxuXG5leHBvcnQgY2xhc3MgQmFsbFN0YXRlIHtcbiAgICBjeDogbnVtYmVyO1xuICAgIGN5OiBudW1iZXI7XG4gICAgdng6IG51bWJlcjtcbiAgICB2eTogbnVtYmVyO1xuICAgIHBhdXNlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIHZ4OiBudW1iZXIsIHZ5OiBudW1iZXIpe1xuICAgICAgICB0aGlzLmN4ID0gY3g7XG4gICAgICAgIHRoaXMuY3kgPSBjeTtcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xuICAgICAgICB0aGlzLnZ5ID0gdnk7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVN0YXRlKHN0YXRlOiBzdHJpbmcsIGVsOiBIVE1MSW1hZ2VFbGVtZW50KTogSVN0YXRlIHtcbiAgICBzd2l0Y2goc3RhdGUpe1xuICAgICAgICBjYXNlIFN0YXRlcy5zaXRJZGxlOiByZXR1cm4gbmV3IFNpdElkbGVTdGF0ZShlbCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLndhbGtSaWdodDogcmV0dXJuIG5ldyBXYWxrUmlnaHRTdGF0ZShlbCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLndhbGtMZWZ0OiByZXR1cm4gbmV3IFdhbGtMZWZ0U3RhdGUoZWwpO1xuICAgICAgICBjYXNlIFN0YXRlcy5ydW5SaWdodDogcmV0dXJuIG5ldyBSdW5SaWdodFN0YXRlKGVsKTtcbiAgICAgICAgY2FzZSBTdGF0ZXMucnVuTGVmdDogcmV0dXJuIG5ldyBSdW5MZWZ0U3RhdGUoZWwpO1xuICAgICAgICBjYXNlIFN0YXRlcy5saWU6IHJldHVybiBuZXcgTGllU3RhdGUoZWwpO1xuICAgICAgICBjYXNlIFN0YXRlcy53YWxsSGFuZ0xlZnQ6IHJldHVybiBuZXcgV2FsbEhhbmdMZWZ0U3RhdGUoZWwpO1xuICAgICAgICBjYXNlIFN0YXRlcy5jbGltYldhbGxMZWZ0OiByZXR1cm4gbmV3IENsaW1iV2FsbExlZnRTdGF0ZShlbCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmp1bXBEb3duTGVmdDogcmV0dXJuIG5ldyBKdW1wRG93bkxlZnRTdGF0ZShlbCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmxhbmQ6IHJldHVybiBuZXcgTGFuZFN0YXRlKGVsKTtcbiAgICAgICAgY2FzZSBTdGF0ZXMuc3dpcGU6IHJldHVybiBuZXcgU3dpcGVTdGF0ZShlbCk7XG4gICAgICAgIGNhc2UgU3RhdGVzLmlkbGVXaXRoQmFsbDogcmV0dXJuIG5ldyBJZGxlV2l0aEJhbGxTdGF0ZShlbCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2l0SWRsZVN0YXRlKGVsKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xuICAgIGxhYmVsOiBzdHJpbmdcbiAgICBzcHJpdGVMYWJlbDogc3RyaW5nXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbjogSG9yaXpvbnRhbERpcmVjdGlvblxuICAgIG5leHRGcmFtZSgpOiBGcmFtZVJlc3VsdFxufVxuXG5jbGFzcyBBYnN0cmFjdFN0YXRpY1N0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5zaXRJZGxlO1xuICAgIGlkbGVDb3VudGVyOiBudW1iZXI7XG4gICAgc3ByaXRlTGFiZWwgPSBcImlkbGVcIjtcbiAgICBob2xkVGltZSA9IDUwO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXRFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuaWRsZUNvdW50ZXIgPSAwO1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLmlkbGVDb3VudGVyKys7XG4gICAgICAgIGlmICh0aGlzLmlkbGVDb3VudGVyID4gdGhpcy5ob2xkVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2l0SWRsZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuc2l0SWRsZTtcbiAgICBzcHJpdGVMYWJlbCA9IFwiaWRsZVwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xuICAgIGhvbGRUaW1lID0gNTA7XG59XG5cbmV4cG9ydCBjbGFzcyBMaWVTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmxpZTtcbiAgICBzcHJpdGVMYWJlbCA9IFwibGllXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgaG9sZFRpbWUgPSA1MDtcbn1cblxuZXhwb3J0IGNsYXNzIFdhbGxIYW5nTGVmdFN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMud2FsbEhhbmdMZWZ0O1xuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxsZ3JhYlwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgaG9sZFRpbWUgPSA1MDtcbn1cblxuZXhwb3J0IGNsYXNzIExhbmRTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLmxhbmQ7XG4gICAgc3ByaXRlTGFiZWwgPSBcImxhbmRcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xuICAgIGhvbGRUaW1lID0gMTA7XG59XG5cbmV4cG9ydCBjbGFzcyBTd2lwZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuc3dpcGU7XG4gICAgc3ByaXRlTGFiZWwgPSBcInN3aXBlXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubmF0dXJhbDtcbiAgICBob2xkVGltZSA9IDEwO1xufVxuXG5leHBvcnQgY2xhc3MgSWRsZVdpdGhCYWxsU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5pZGxlV2l0aEJhbGw7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndpdGhfYmFsbFwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgaG9sZFRpbWUgPSAzMDtcbn1cblxuZXhwb3J0IGNsYXNzIFdhbGtSaWdodFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy53YWxrUmlnaHQ7XG4gICAgcGV0TGVmdDogbnVtYmVyO1xuICAgIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHNraXBTcGVlZCA9IDM7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtcIjtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcbiAgICBsZWZ0Qm91bmRhcnk6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHBldEVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wZXRMZWZ0ID0gcGFyc2VJbnQocGV0RWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgICAgICAgdGhpcy5lbCA9IHBldEVsZW1lbnQ7XG4gICAgICAgIHRoaXMubGVmdEJvdW5kYXJ5ID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aCAqIDAuOTUpO1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldExlZnQgKz0gdGhpcy5za2lwU3BlZWQ7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3RoaXMucGV0TGVmdH1weGA7XG4gICAgICAgIGlmICh0aGlzLnBldExlZnQgPj0gdGhpcy5sZWZ0Qm91bmRhcnkgLSB0aGlzLmVsLndpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXYWxrTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy53YWxrTGVmdDtcbiAgICBwZXRMZWZ0OiBudW1iZXI7XG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwid2Fsa1wiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXRFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgIHRoaXMucGV0TGVmdCA9IHBhcnNlSW50KHBldEVsZW1lbnQuc3R5bGUubGVmdCk7XG4gICAgICAgIHRoaXMuZWwgPSBwZXRFbGVtZW50O1xuICAgIH1cblxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xuICAgICAgICB0aGlzLnBldExlZnQgLT0gdGhpcy5za2lwU3BlZWQ7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3RoaXMucGV0TGVmdH1weGA7XG4gICAgICAgIGlmICh0aGlzLnBldExlZnQgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUnVuUmlnaHRTdGF0ZSBleHRlbmRzIFdhbGtSaWdodFN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5ydW5SaWdodDtcbiAgICBzcHJpdGVMYWJlbCA9IFwid2Fsa19mYXN0XCI7XG4gICAgc2tpcFNwZWVkID0gNTtcbn1cblxuZXhwb3J0IGNsYXNzIFJ1bkxlZnRTdGF0ZSBleHRlbmRzIFdhbGtMZWZ0U3RhdGUge1xuICAgIGxhYmVsID0gU3RhdGVzLnJ1bkxlZnQ7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtfZmFzdFwiO1xuICAgIHNraXBTcGVlZCA9IDU7XG59XG5cbmV4cG9ydCBjbGFzcyBDaGFzZVN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5jaGFzZTtcbiAgICBwZXRMZWZ0OiBudW1iZXI7XG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc2tpcFNwZWVkID0gMztcbiAgICBzcHJpdGVMYWJlbCA9IFwicnVuXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcbiAgICBiYWxsU3RhdGU6IEJhbGxTdGF0ZTtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IocGV0RWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgYmFsbFN0YXRlOiBCYWxsU3RhdGUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wZXRMZWZ0ID0gcGFyc2VJbnQocGV0RWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgICAgICAgdGhpcy5lbCA9IHBldEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuYmFsbFN0YXRlID0gYmFsbFN0YXRlO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgaWYgKHRoaXMuYmFsbFN0YXRlLnBhdXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ2FuY2VsOyAvLyBCYWxsIGlzIGFscmVhZHkgY2F1Z2h0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGV0TGVmdCA+IHRoaXMuYmFsbFN0YXRlLmN4KSB7XG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG4gICAgICAgICAgICB0aGlzLnBldExlZnQgLT0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG4gICAgICAgICAgICB0aGlzLnBldExlZnQgKz0gMztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3RoaXMucGV0TGVmdH1weGA7XG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLmJhbGxTdGF0ZS5jeSA8IHRoaXMuZWwud2lkdGggJiYgdGhpcy5iYWxsU3RhdGUuY3ggPCB0aGlzLnBldExlZnQgJiYgdGhpcy5wZXRMZWZ0IDwgdGhpcy5iYWxsU3RhdGUuY3ggKyAxNSkge1xuICAgICAgICAgICAgLy8gaGlkZSBiYWxsXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB0aGlzLmJhbGxTdGF0ZS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xpbWJXYWxsTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcbiAgICBsYWJlbCA9IFN0YXRlcy5jbGltYldhbGxMZWZ0O1xuICAgIHBldEJvdHRvbTogbnVtYmVyO1xuICAgIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHNraXBTcGVlZCA9IDM7XG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGxjbGltYlwiO1xuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXRFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgIHRoaXMucGV0Qm90dG9tID0gcGFyc2VJbnQocGV0RWxlbWVudC5zdHlsZS5ib3R0b20pO1xuICAgICAgICB0aGlzLmVsID0gcGV0RWxlbWVudDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgdGhpcy5wZXRCb3R0b20gKz0gMTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLnBldEJvdHRvbX1weGA7XG4gICAgICAgIGlmICh0aGlzLnBldEJvdHRvbSA+PSAxMDApIHtcbiAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBKdW1wRG93bkxlZnRTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XG4gICAgbGFiZWwgPSBTdGF0ZXMuanVtcERvd25MZWZ0O1xuICAgIHBldEJvdHRvbTogbnVtYmVyO1xuICAgIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHNraXBTcGVlZCA9IDM7XG4gICAgc3ByaXRlTGFiZWwgPSBcImZhbGxfZnJvbV9ncmFiXCI7XG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwZXRFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgIHRoaXMucGV0Qm90dG9tID0gcGFyc2VJbnQocGV0RWxlbWVudC5zdHlsZS5ib3R0b20pO1xuICAgICAgICB0aGlzLmVsID0gcGV0RWxlbWVudDtcbiAgICB9XG5cbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcbiAgICAgICAgdGhpcy5wZXRCb3R0b20gLT0gNTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLnBldEJvdHRvbX1weGA7XG4gICAgICAgIGlmICh0aGlzLnBldEJvdHRvbSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBldEJvdHRvbSA9IDA7XG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcbiAgICAgICAgfSAgIFxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gVGhpcyBzY3JpcHQgd2lsbCBiZSBydW4gd2l0aGluIHRoZSB3ZWJ2aWV3IGl0c2VsZlxuaW1wb3J0IHsgUGV0U2l6ZSwgUGV0Q29sb3IsIFBldFR5cGUgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVQZXQsIElQZXRUeXBlfSBmcm9tICcuL3BldHMnO1xuaW1wb3J0IHsgQmFsbFN0YXRlLCBQZXRQYW5lbFN0YXRlIH0gZnJvbSAnLi9zdGF0ZXMnO1xuXG4vKiBUaGlzIGlzIGhvdyB0aGUgVlMgQ29kZSBBUEkgY2FuIGJlIGludm9rZWQgZnJvbSB0aGUgcGFuZWwgKi9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFZzY29kZVN0YXRlQXBpIHsgXG4gICAgZ2V0U3RhdGUoKSA6IFBldFBhbmVsU3RhdGU7IC8vIEFQSSBpcyBhY3R1YWxseSBBbnksIGJ1dCB3ZSB3YW50IGl0IHRvIGJlIHR5cGVkLlxuICAgIHNldFN0YXRlKHN0YXRlOiBQZXRQYW5lbFN0YXRlKTogdm9pZDtcbiAgfVxuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBhY3F1aXJlVnNDb2RlQXBpKCk6IFZzY29kZVN0YXRlQXBpO1xuICB9XG59XG5cbmNvbnN0IHZzY29kZSA9IHdpbmRvdy5hY3F1aXJlVnNDb2RlQXBpKCk7XG5cbmNsYXNzIFBldEVsZW1lbnQge1xuICBlbDogSFRNTEltYWdlRWxlbWVudDtcbiAgcGV0OiBJUGV0VHlwZTtcbiAgY29sb3I6IFBldENvbG9yO1xuICB0eXBlOiBQZXRUeXBlO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBwZXQ6IElQZXRUeXBlLCBjb2xvcjogUGV0Q29sb3IsIHR5cGU6IFBldFR5cGUpe1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnBldCA9IHBldDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxufVxuXG52YXIgYWxsUGV0czogQXJyYXk8UGV0RWxlbWVudD4gPSBuZXcgQXJyYXkoMCk7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUJhbGxSYWRpdXMoc2l6ZTogUGV0U2l6ZSk6IG51bWJlcntcbiAgaWYgKHNpemUgPT09IFBldFNpemUubmFubyl7XG4gICAgcmV0dXJuIDI7XG4gIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5tZWRpdW0pe1xuICAgIHJldHVybiA0O1xuICB9IGVsc2UgaWYgKHNpemUgPT09IFBldFNpemUubGFyZ2Upe1xuICAgIHJldHVybiA4O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAxOyAvLyBTaHJ1Z1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNwcml0ZVdpZHRoKHNpemU6IFBldFNpemUpOiBudW1iZXJ7XG4gIGlmIChzaXplID09PSBQZXRTaXplLm5hbm8pe1xuICAgIHJldHVybiAzMDtcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLm1lZGl1bSl7XG4gICAgcmV0dXJuIDU1O1xuICB9IGVsc2UgaWYgKHNpemUgPT09IFBldFNpemUubGFyZ2Upe1xuICAgIHJldHVybiAxMTA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDMwOyAvLyBTaHJ1Z1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRTcHJpdGUoZWw6IEhUTUxJbWFnZUVsZW1lbnQsIHBldFNpemU6IFBldFNpemUsIGxlZnQ6IHN0cmluZywgYm90dG9tOiBzdHJpbmcpIHtcbiAgZWwuc3R5bGUubGVmdCA9IGxlZnQ7XG4gIGVsLnN0eWxlLmJvdHRvbSA9IGJvdHRvbTtcbiAgZWwuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcbiAgZWwuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XG4gIGVsLnN0eWxlLm1heFdpZHRoID0gYCR7Y2FsY3VsYXRlU3ByaXRlV2lkdGgocGV0U2l6ZSl9cHhgO1xuICBlbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtjYWxjdWxhdGVTcHJpdGVXaWR0aChwZXRTaXplKX1weGA7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vdXNlT3ZlcihlOiBNb3VzZUV2ZW50KXtcbiAgdmFyIGVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGFsbFBldHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBpZiAoZWxlbWVudC5lbCA9PT0gZWwpe1xuICAgICAgaWYgKCFlbGVtZW50LnBldC5jYW5Td2lwZSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnQucGV0LnN3aXBlKCk7XG4gICAgfVxuICB9KTtcbiAgXG59XG5cbmZ1bmN0aW9uIHN0YXJ0QW5pbWF0aW9ucyhlbDogSFRNTEltYWdlRWxlbWVudCwgcGV0OiBJUGV0VHlwZSkge1xuICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhhbmRsZU1vdXNlT3Zlcik7XG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICBwZXQubmV4dEZyYW1lKCk7XG4gICAgc2F2ZVN0YXRlKCk7XG4gIH0sIDEwMCk7XG59XG5cbmZ1bmN0aW9uIGFkZFBldFRvUGFuZWwocGV0VHlwZTogUGV0VHlwZSwgYmFzZVBldFVyaTogc3RyaW5nLCBwZXRDb2xvcjogUGV0Q29sb3IsIHBldFNpemU6IFBldFNpemUsIGxlZnQ6IHN0cmluZywgYm90dG9tOiBzdHJpbmcpOiBQZXRFbGVtZW50IHtcbiAgdmFyIHBldFNwcml0ZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBwZXRTcHJpdGVFbGVtZW50LmNsYXNzTmFtZSA9IFwicGV0XCI7XG4gIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBldHNDb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQpLmFwcGVuZENoaWxkKHBldFNwcml0ZUVsZW1lbnQpO1xuICBjb25zdCByb290ID0gYmFzZVBldFVyaSArICcvJyArIHBldFR5cGUgKyAnLycgKyBwZXRDb2xvcjtcbiAgY29uc29sZS5sb2coXCJDcmVhdGluZyBuZXcgcGV0IDogXCIsIHBldFR5cGUsIHJvb3QpO1xuICB2YXIgbmV3UGV0ID0gY3JlYXRlUGV0KHBldFR5cGUsIHBldFNwcml0ZUVsZW1lbnQsIHJvb3QpO1xuICBpbml0U3ByaXRlKHBldFNwcml0ZUVsZW1lbnQsIHBldFNpemUsIGxlZnQsIGJvdHRvbSk7XG4gIHN0YXJ0QW5pbWF0aW9ucyhwZXRTcHJpdGVFbGVtZW50LCBuZXdQZXQpO1xuICByZXR1cm4gbmV3IFBldEVsZW1lbnQocGV0U3ByaXRlRWxlbWVudCwgbmV3UGV0LCBwZXRDb2xvciwgcGV0VHlwZSk7XG59XG5cbmZ1bmN0aW9uIHNhdmVTdGF0ZSgpe1xuICB2YXIgc3RhdGUgPSBuZXcgUGV0UGFuZWxTdGF0ZSgpO1xuICBzdGF0ZS5wZXRTdGF0ZXMgPSBuZXcgQXJyYXkoKTtcblxuICBhbGxQZXRzLmZvckVhY2gocGV0SXRlbSA9PiB7XG4gICAgc3RhdGUucGV0U3RhdGVzIS5wdXNoKHtcbiAgICAgIHBldENvbG9yOiBwZXRJdGVtLmNvbG9yLFxuICAgICAgcGV0VHlwZTogcGV0SXRlbS50eXBlLFxuICAgICAgcGV0U3RhdGU6IHBldEl0ZW0ucGV0LmdldFN0YXRlKCksXG4gICAgICBlbExlZnQ6IHBldEl0ZW0uZWwuc3R5bGUubGVmdCxcbiAgICAgIGVsQm90dG9tOiBwZXRJdGVtLmVsLnN0eWxlLmJvdHRvbVxuICAgIH0pO1xuICB9KTtcbiAgdnNjb2RlLnNldFN0YXRlKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gcmVjb3ZlclN0YXRlKGJhc2VQZXRVcmk6IHN0cmluZywgcGV0U2l6ZTogUGV0U2l6ZSl7XG4gIHZhciBzdGF0ZSA9IHZzY29kZS5nZXRTdGF0ZSgpO1xuICBzdGF0ZS5wZXRTdGF0ZXMhLmZvckVhY2gocCA9PiB7XG4gICAgdmFyIG5ld1BldCA9IGFkZFBldFRvUGFuZWwocC5wZXRUeXBlISwgYmFzZVBldFVyaSwgcC5wZXRDb2xvciEsIHBldFNpemUsIHAuZWxMZWZ0ISwgcC5lbEJvdHRvbSEpO1xuICAgIG5ld1BldC5wZXQucmVjb3ZlclN0YXRlKHAucGV0U3RhdGUhKTtcbiAgICBhbGxQZXRzLnB1c2gobmV3UGV0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJhbmRvbVN0YXJ0UG9zaXRpb24oKSA6IHN0cmluZyB7XG4gIGNvbnN0IHg6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAqIDAuNykpO1xuICByZXR1cm4gYCR7eH1weGA7XG59XG5cbmxldCBjYW52YXMgOiBIVE1MQ2FudmFzRWxlbWVudCwgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbmZ1bmN0aW9uIGluaXRCYWxsUGh5c2ljcygpIHtcbiAgY2FudmFzID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGV0Q2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50KTtcbiAgY3R4ID0gKGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTtcbiAgY3R4LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICBjdHguY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbn1cblxuLy8gSXQgY2Fubm90IGFjY2VzcyB0aGUgbWFpbiBWUyBDb2RlIEFQSXMgZGlyZWN0bHkuXG5leHBvcnQgZnVuY3Rpb24gcGV0UGFuZWxBcHAoYmFzZVBldFVyaTogc3RyaW5nLCBwZXRDb2xvcjogUGV0Q29sb3IsIHBldFNpemU6IFBldFNpemUsIHBldFR5cGU6IFBldFR5cGUpIHtcbiAgY29uc3QgYmFsbFJhZGl1czogbnVtYmVyID0gY2FsY3VsYXRlQmFsbFJhZGl1cyhwZXRTaXplKTtcblxuICAvLy8gQm91bmNpbmcgYmFsbCBjb21wb25lbnRzLCBjcmVkaXQgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI5OTgyMzQzXG4gIGNvbnN0IGdyYXZpdHk6IG51bWJlciA9IDAuMiwgZGFtcGluZzogbnVtYmVyID0gMC45LCB0cmFjdGlvbjogbnVtYmVyID0gMC44O1xuICB2YXIgYmFsbFN0YXRlOiBCYWxsU3RhdGU7XG5cbiAgZnVuY3Rpb24gcmVzZXRCYWxsKCkge1xuICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGJhbGxTdGF0ZSA9IG5ldyBCYWxsU3RhdGUoMTAwLCAxMDAsIDIsIDUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGhyb3dCYWxsKCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBpZiAoIWJhbGxTdGF0ZS5wYXVzZWQpIHtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhyb3dCYWxsKTt9XG5cbiAgICBpZiAoYmFsbFN0YXRlLmN4ICsgYmFsbFJhZGl1cyA+PSBjYW52YXMud2lkdGgpIHtcbiAgICAgIGJhbGxTdGF0ZS52eCA9IC1iYWxsU3RhdGUudnggKiBkYW1waW5nO1xuICAgICAgYmFsbFN0YXRlLmN4ID0gY2FudmFzLndpZHRoIC0gYmFsbFJhZGl1cztcbiAgICB9IGVsc2UgaWYgKGJhbGxTdGF0ZS5jeCAtIGJhbGxSYWRpdXMgPD0gMCkge1xuICAgICAgYmFsbFN0YXRlLnZ4ID0gLWJhbGxTdGF0ZS52eCAqIGRhbXBpbmc7XG4gICAgICBiYWxsU3RhdGUuY3ggPSBiYWxsUmFkaXVzO1xuICAgIH1cbiAgICBpZiAoYmFsbFN0YXRlLmN5ICsgYmFsbFJhZGl1cyA+PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICBiYWxsU3RhdGUudnkgPSAtYmFsbFN0YXRlLnZ5ICogZGFtcGluZztcbiAgICAgIGJhbGxTdGF0ZS5jeSA9IGNhbnZhcy5oZWlnaHQgLSBiYWxsUmFkaXVzO1xuICAgICAgLy8gdHJhY3Rpb24gaGVyZVxuICAgICAgYmFsbFN0YXRlLnZ4ICo9IHRyYWN0aW9uO1xuICAgIH0gZWxzZSBpZiAoYmFsbFN0YXRlLmN5IC0gYmFsbFJhZGl1cyA8PSAwKSB7XG4gICAgICBiYWxsU3RhdGUudnkgPSAtYmFsbFN0YXRlLnZ5ICogZGFtcGluZztcbiAgICAgIGJhbGxTdGF0ZS5jeSA9IGJhbGxSYWRpdXM7XG4gICAgfVxuXG4gICAgYmFsbFN0YXRlLnZ5ICs9IGdyYXZpdHk7XG5cbiAgICBiYWxsU3RhdGUuY3ggKz0gYmFsbFN0YXRlLnZ4O1xuICAgIGJhbGxTdGF0ZS5jeSArPSBiYWxsU3RhdGUudnk7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhiYWxsU3RhdGUuY3gsIGJhbGxTdGF0ZS5jeSwgYmFsbFJhZGl1cywgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMmVkODUxXCI7XG4gICAgY3R4LmZpbGwoKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCdTdGFydGluZyBwZXQgc2Vzc2lvbicsIHBldENvbG9yLCBiYXNlUGV0VXJpLCBwZXRUeXBlKTtcbiAgLy8gTmV3IHNlc3Npb25cbiAgdmFyIHN0YXRlID0gdnNjb2RlLmdldFN0YXRlKCk7XG4gIGlmICghc3RhdGUpIHtcbiAgICBjb25zb2xlLmxvZygnTm8gc3RhdGUsIHN0YXJ0aW5nIGEgbmV3IHNlc3Npb24uJyk7XG4gICAgYWxsUGV0cy5wdXNoKGFkZFBldFRvUGFuZWwocGV0VHlwZSwgYmFzZVBldFVyaSwgcGV0Q29sb3IsIHBldFNpemUsIHJhbmRvbVN0YXJ0UG9zaXRpb24oKSwgJzBweCcpKTtcbiAgICBzYXZlU3RhdGUoKTtcbiAgfSBlbHNlIHsgXG4gICAgY29uc29sZS5sb2coJ1JlY292ZXJpbmcgc3RhdGUgLSAnLCBzdGF0ZSk7XG4gICAgcmVjb3ZlclN0YXRlKGJhc2VQZXRVcmksIHBldFNpemUpO1xuICB9XG5cbiAgaW5pdEJhbGxQaHlzaWNzKCk7XG5cbiAgLy8gSGFuZGxlIG1lc3NhZ2VzIHNlbnQgZnJvbSB0aGUgZXh0ZW5zaW9uIHRvIHRoZSB3ZWJ2aWV3XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gZXZlbnQuZGF0YTsgLy8gVGhlIGpzb24gZGF0YSB0aGF0IHRoZSBleHRlbnNpb24gc2VudFxuICAgIHN3aXRjaCAobWVzc2FnZS5jb21tYW5kKSB7XG4gICAgICBjYXNlIFwidGhyb3ctYmFsbFwiOlxuICAgICAgICByZXNldEJhbGwoKTtcbiAgICAgICAgdGhyb3dCYWxsKCk7XG4gICAgICAgIGFsbFBldHMuZm9yRWFjaChwZXRFbCA9PiB7XG4gICAgICAgICAgcGV0RWwucGV0LmNoYXNlKGJhbGxTdGF0ZSwgY2FudmFzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNwYXduLXBldFwiOlxuICAgICAgICBhbGxQZXRzLnB1c2goYWRkUGV0VG9QYW5lbChtZXNzYWdlLnR5cGUsIGJhc2VQZXRVcmksIG1lc3NhZ2UuY29sb3IsIHBldFNpemUsIHJhbmRvbVN0YXJ0UG9zaXRpb24oKSwgJzBweCcpKTtcbiAgICAgICAgc2F2ZVN0YXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJlc2V0LXBldFwiOlxuICAgICAgICBhbGxQZXRzLmZvckVhY2gocGV0ID0+IHBldC5lbC5yZW1vdmUoKSk7XG4gICAgICAgIGFsbFBldHMgPSBbXTtcbiAgICAgICAgYWxsUGV0cy5wdXNoKGFkZFBldFRvUGFuZWwobWVzc2FnZS50eXBlLCBiYXNlUGV0VXJpLCBtZXNzYWdlLmNvbG9yLCBtZXNzYWdlLnNpemUsIHJhbmRvbVN0YXJ0UG9zaXRpb24oKSwgJzBweCcpKTtcbiAgICAgICAgc2F2ZVN0YXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICBpbml0QmFsbFBoeXNpY3MoKTtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=