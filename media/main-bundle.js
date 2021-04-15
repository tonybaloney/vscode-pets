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
    else if (petType === "rubber-duck") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvcGV0cy50cyIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvc3RhdGVzLnRzIiwid2VicGFjazovL3BldEFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsOEVBQW1JO0FBRW5JLE1BQWEscUJBQXFCO0NBRWpDO0FBRkQsc0RBRUM7QUFXRCxNQUFlLFdBQVc7SUFVdEIsWUFBWSxhQUErQixFQUFFLE9BQWU7UUFUNUQsVUFBSyxHQUFXLE1BQU0sQ0FBQztRQUN2QixhQUFRLEdBQWtCLEVBQUUsYUFBYSwwQkFBZ0IsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFTM0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUF1QjtRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFpQixDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxRQUFRO1FBQ0osNENBQTRDO1FBQzVDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLHdCQUFpQixFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLHNCQUFlLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFvQixFQUFFLE1BQXlCO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0Isc0JBQWUsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksbUJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUM7SUFDakQsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDO0lBQ2hELENBQUM7SUFFRCxZQUFZLENBQUMsSUFBWTtRQUNyQixNQUFNLE9BQU8sR0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxXQUFXLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7WUFDekIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO0lBQzFCLENBQUM7SUFFRCxlQUFlLENBQUMsU0FBaUI7UUFDN0Isc0JBQXNCO1FBQ3RCLElBQUksa0JBQWtCLEdBQXlCLFNBQVMsQ0FBQztRQUN6RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDckQsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUM7YUFDM0U7U0FDSjtRQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBQztZQUNwQixNQUFNLElBQUkscUJBQXFCLEVBQUUsQ0FBQztTQUNyQztRQUNELGlDQUFpQztRQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxPQUFPLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixLQUFLLDRCQUFtQixDQUFDLElBQUksRUFBRTtZQUNwRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7YUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEtBQUssNEJBQW1CLENBQUMsS0FBSyxFQUFFO1lBQzVFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hELElBQUksV0FBVyxLQUFLLG9CQUFXLENBQUMsYUFBYSxFQUM3QztZQUNJLDZCQUE2QjtZQUM3QixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBQztnQkFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUMvQixPQUFPO2FBQ1Y7WUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7U0FDckM7YUFBTSxJQUFJLFdBQVcsS0FBSyxvQkFBVyxDQUFDLFdBQVcsRUFBQztZQUMvQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0Isd0JBQWlCLEVBQUUsRUFBRSxnQ0FBZ0M7Z0JBQzFFLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLHFDQUFxQixDQUFDO2dCQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBR0QsTUFBYSxHQUFJLFNBQVEsV0FBVztJQUFwQzs7UUFDSSxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsYUFBUSxHQUFHO1lBQ1AsYUFBYSwwQkFBZ0I7WUFDN0IsY0FBYyxFQUFFO2dCQUNaO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSwwREFBbUM7aUJBQzFEO2dCQUNEO29CQUNJLEtBQUssOEJBQWtCO29CQUN2QixrQkFBa0IsRUFBRSxzREFBaUM7aUJBQ3hEO2dCQUNEO29CQUNJLEtBQUssNEJBQWlCO29CQUN0QixrQkFBa0IsRUFBRSxzREFBaUM7aUJBQ3hEO2dCQUNEO29CQUNJLEtBQUssNEJBQWlCO29CQUN0QixrQkFBa0IsRUFBRSxpRUFBc0M7aUJBQzdEO2dCQUNEO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSxpRUFBc0M7aUJBQzdEO2dCQUNEO29CQUNJLEtBQUssdUNBQXNCO29CQUMzQixrQkFBa0IsRUFBRSxxQ0FBcUI7aUJBQzVDO2dCQUNEO29CQUNJLEtBQUsscUNBQXFCO29CQUMxQixrQkFBa0IsRUFBRSxxQ0FBcUI7aUJBQzVDO2dCQUNEO29CQUNJLEtBQUsscUNBQXFCO29CQUMxQixrQkFBa0IsRUFBRSxtQkFBYTtpQkFDcEM7Z0JBQ0Q7b0JBQ0ksS0FBSyxtQkFBYTtvQkFDbEIsa0JBQWtCLEVBQUUsb0ZBQW1EO2lCQUMxRTtnQkFDRDtvQkFDSSxLQUFLLHFCQUFjO29CQUNuQixrQkFBa0IsRUFBRSxxQ0FBcUI7aUJBQzVDO2dCQUNEO29CQUNJLEtBQUsscUNBQXFCO29CQUMxQixrQkFBa0IsRUFBRSxnSEFBb0U7aUJBQzNGO2FBQ0o7U0FDSixDQUFDO0lBV04sQ0FBQztJQVRHLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsMENBQXlCO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0Isd0NBQXdCO1lBQzdDLElBQUksQ0FBQyxnQkFBZ0Isc0JBQWdCO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0Isd0NBQXdCLEVBQUU7WUFDL0MsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUE3REQsa0JBNkRDO0FBRUQsTUFBYSxHQUFJLFNBQVEsV0FBVztJQUFwQzs7UUFDSSxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsYUFBUSxHQUFHO1lBQ1AsYUFBYSwwQkFBZ0I7WUFDN0IsY0FBYyxFQUFFO2dCQUNaO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSwyRUFBK0M7aUJBQ3RFO2dCQUNEO29CQUNJLEtBQUssaUJBQVk7b0JBQ2pCLGtCQUFrQixFQUFFLDBEQUFtQztpQkFDMUQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw4QkFBa0I7b0JBQ3ZCLGtCQUFrQixFQUFFLHNEQUFpQztpQkFDeEQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw0QkFBaUI7b0JBQ3RCLGtCQUFrQixFQUFFLHNEQUFpQztpQkFDeEQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw0QkFBaUI7b0JBQ3RCLGtCQUFrQixFQUFFLDJDQUE0QjtpQkFDbkQ7Z0JBQ0Q7b0JBQ0ksS0FBSywwQkFBZ0I7b0JBQ3JCLGtCQUFrQixFQUFFLDJDQUE0QjtpQkFDbkQ7Z0JBQ0Q7b0JBQ0ksS0FBSyxxQkFBYztvQkFDbkIsa0JBQWtCLEVBQUUscUNBQXFCO2lCQUM1QztnQkFDRDtvQkFDSSxLQUFLLHFDQUFxQjtvQkFDMUIsa0JBQWtCLEVBQUUsZ0hBQW9FO2lCQUMzRjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FBQTtBQXZDRCxrQkF1Q0M7QUFFRCxNQUFhLEtBQU0sU0FBUSxXQUFXO0lBQXRDOztRQUNJLFVBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIsYUFBUSxHQUFHO1lBQ1AsYUFBYSwwQkFBZ0I7WUFDN0IsY0FBYyxFQUFFO2dCQUNaO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSwwREFBbUM7aUJBQzFEO2dCQUNEO29CQUNJLEtBQUssOEJBQWtCO29CQUN2QixrQkFBa0IsRUFBRSxzREFBaUM7aUJBQ3hEO2dCQUNEO29CQUNJLEtBQUssNEJBQWlCO29CQUN0QixrQkFBa0IsRUFBRSxzREFBaUM7aUJBQ3hEO2dCQUNEO29CQUNJLEtBQUssNEJBQWlCO29CQUN0QixrQkFBa0IsRUFBRSwwQkFBZ0I7aUJBQ3ZDO2dCQUNEO29CQUNJLEtBQUssMEJBQWdCO29CQUNyQixrQkFBa0IsRUFBRSwwQkFBZ0I7aUJBQ3ZDO2dCQUNEO29CQUNJLEtBQUsscUJBQWM7b0JBQ25CLGtCQUFrQixFQUFFLHFDQUFxQjtpQkFDNUM7Z0JBQ0Q7b0JBQ0ksS0FBSyxxQ0FBcUI7b0JBQzFCLGtCQUFrQixFQUFFLGdIQUFvRTtpQkFDM0Y7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQUE7QUFuQ0Qsc0JBbUNDO0FBRUQsTUFBYSxNQUFPLFNBQVEsV0FBVztJQUF2Qzs7UUFDSSxVQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ2pCLGFBQVEsR0FBRztZQUNQLGFBQWEsMEJBQWdCO1lBQzdCLGNBQWMsRUFBRTtnQkFDWjtvQkFDSSxLQUFLLDBCQUFnQjtvQkFDckIsa0JBQWtCLEVBQUUsMERBQW1DO2lCQUMxRDtnQkFDRDtvQkFDSSxLQUFLLDhCQUFrQjtvQkFDdkIsa0JBQWtCLEVBQUUsc0RBQWlDO2lCQUN4RDtnQkFDRDtvQkFDSSxLQUFLLDRCQUFpQjtvQkFDdEIsa0JBQWtCLEVBQUUsc0RBQWlDO2lCQUN4RDtnQkFDRDtvQkFDSSxLQUFLLDRCQUFpQjtvQkFDdEIsa0JBQWtCLEVBQUUsMEJBQWdCO2lCQUN2QztnQkFDRDtvQkFDSSxLQUFLLDBCQUFnQjtvQkFDckIsa0JBQWtCLEVBQUUsMEJBQWdCO2lCQUN2QztnQkFDRDtvQkFDSSxLQUFLLHFCQUFjO29CQUNuQixrQkFBa0IsRUFBRSxxQ0FBcUI7aUJBQzVDO2dCQUNEO29CQUNJLEtBQUsscUNBQXFCO29CQUMxQixrQkFBa0IsRUFBRSxnSEFBb0U7aUJBQzNGO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUFBO0FBbkNELHdCQW1DQztBQUVELE1BQWEsVUFBVyxTQUFRLFdBQVc7SUFBM0M7O1FBQ0ksVUFBSyxHQUFHLGFBQWEsQ0FBQztRQUN0QixhQUFRLEdBQUc7WUFDUCxhQUFhLDBCQUFnQjtZQUM3QixjQUFjLEVBQUU7Z0JBQ1o7b0JBQ0ksS0FBSywwQkFBZ0I7b0JBQ3JCLGtCQUFrQixFQUFFLDBEQUFtQztpQkFDMUQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw4QkFBa0I7b0JBQ3ZCLGtCQUFrQixFQUFFLHNEQUFpQztpQkFDeEQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw0QkFBaUI7b0JBQ3RCLGtCQUFrQixFQUFFLHNEQUFpQztpQkFDeEQ7Z0JBQ0Q7b0JBQ0ksS0FBSyw0QkFBaUI7b0JBQ3RCLGtCQUFrQixFQUFFLDBCQUFnQjtpQkFDdkM7Z0JBQ0Q7b0JBQ0ksS0FBSywwQkFBZ0I7b0JBQ3JCLGtCQUFrQixFQUFFLDBCQUFnQjtpQkFDdkM7Z0JBQ0Q7b0JBQ0ksS0FBSyxxQkFBYztvQkFDbkIsa0JBQWtCLEVBQUUscUNBQXFCO2lCQUM1QztnQkFDRDtvQkFDSSxLQUFLLHFDQUFxQjtvQkFDMUIsa0JBQWtCLEVBQUUsZ0hBQW9FO2lCQUMzRjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FBQTtBQW5DRCxnQ0FtQ0M7QUFFRCxNQUFhLG1CQUFtQjtDQUMvQjtBQURELGtEQUNDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLE9BQWUsRUFBRSxFQUFvQixFQUFFLE9BQWU7SUFDNUUsSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFDO1FBQ2xCLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9CO1NBQ0ksSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9CO1NBQ0ksSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ2pDO1NBQ0ksSUFBSSxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzNCLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDO1NBQ0ksSUFBSSxPQUFPLEtBQUssYUFBYSxFQUFFO1FBQ2hDLE9BQU8sSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsTUFBTSxJQUFJLG1CQUFtQixFQUFFLENBQUM7QUFDcEMsQ0FBQztBQWpCRCw4QkFpQkM7Ozs7Ozs7Ozs7Ozs7O0FDdFdELE1BQWEsZ0JBQWdCO0NBRTVCO0FBRkQsNENBRUM7QUFFRCxNQUFhLGVBQWU7Q0FNM0I7QUFORCwwQ0FNQztBQUVELE1BQWEsYUFBYTtDQUV6QjtBQUZELHNDQUVDO0FBR0QsSUFBWSxtQkFJWDtBQUpELFdBQVksbUJBQW1CO0lBQzNCLDZEQUFJO0lBQ0osK0RBQUs7SUFDTCxtRUFBTyxFQUFDLGlDQUFpQztBQUM3QyxDQUFDLEVBSlcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFJOUI7QUFrQkQsSUFBWSxXQUtYO0FBTEQsV0FBWSxXQUFXO0lBQ25CLCtEQUFhO0lBQ2IsK0RBQWE7SUFDYixpQkFBaUI7SUFDakIsMkRBQVc7QUFDZixDQUFDLEVBTFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFLdEI7QUFFRCxNQUFhLFNBQVM7SUFPbEIsWUFBWSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVO1FBQ3RELElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBZEQsOEJBY0M7QUFFRCxTQUFnQixZQUFZLENBQUMsS0FBYSxFQUFFLEVBQW9CO0lBQzVELFFBQU8sS0FBSyxFQUFDO1FBQ1QsNkJBQW1CLENBQUMsQ0FBQyxPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELGlDQUFxQixDQUFDLENBQUMsT0FBTyxJQUFJLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRCwrQkFBb0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsK0JBQW9CLENBQUMsQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELDZCQUFtQixDQUFDLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRCxvQkFBZSxDQUFDLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6Qyx3Q0FBd0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCwwQ0FBeUIsQ0FBQyxDQUFDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RCx3Q0FBd0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCxzQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0Msd0JBQWlCLENBQUMsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLHdDQUF3QixDQUFDLENBQUMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzlEO0lBQ0QsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBaEJELG9DQWdCQztBQVNELE1BQU0sbUJBQW1CO0lBT3JCLFlBQVksVUFBNEI7UUFOeEMsVUFBSyw0QkFBa0I7UUFFdkIsZ0JBQVcsR0FBRyxNQUFNLENBQUM7UUFDckIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUczQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUM7U0FDcEM7UUFDRCxPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBRUQsTUFBYSxZQUFhLFNBQVEsbUJBQW1CO0lBQXJEOztRQUNJLFVBQUssNEJBQWtCO1FBQ3ZCLGdCQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQUNoRCxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUxELG9DQUtDO0FBRUQsTUFBYSxRQUFTLFNBQVEsbUJBQW1CO0lBQWpEOztRQUNJLFVBQUssbUJBQWM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsd0JBQW1CLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO1FBQ2hELGFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUFBO0FBTEQsNEJBS0M7QUFFRCxNQUFhLGlCQUFrQixTQUFRLG1CQUFtQjtJQUExRDs7UUFDSSxVQUFLLHVDQUF1QjtRQUM1QixnQkFBVyxHQUFHLFVBQVUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDL0MsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQUE7QUFMRCw4Q0FLQztBQUVELE1BQWEsU0FBVSxTQUFRLG1CQUFtQjtJQUFsRDs7UUFDSSxVQUFLLHFCQUFlO1FBQ3BCLGdCQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUMvQyxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUxELDhCQUtDO0FBRUQsTUFBYSxVQUFXLFNBQVEsbUJBQW1CO0lBQW5EOztRQUNJLFVBQUssdUJBQWdCO1FBQ3JCLGdCQUFXLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztRQUNsRCxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUxELGdDQUtDO0FBRUQsTUFBYSxpQkFBa0IsU0FBUSxtQkFBbUI7SUFBMUQ7O1FBQ0ksVUFBSyx1Q0FBdUI7UUFDNUIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFDMUIsd0JBQW1CLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBQy9DLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUFBO0FBTEQsOENBS0M7QUFFRCxNQUFhLGNBQWM7SUFTdkIsWUFBWSxVQUE0QjtRQVJ4QyxVQUFLLGdDQUFvQjtRQUd6QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZ0JBQVcsR0FBRyxNQUFNLENBQUM7UUFDckIsd0JBQW1CLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO1FBSTVDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO1lBQ25ELE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQztTQUNwQztRQUNELE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUF2QkQsd0NBdUJDO0FBRUQsTUFBYSxhQUFhO0lBUXRCLFlBQVksVUFBNEI7UUFQeEMsVUFBSyw4QkFBbUI7UUFHeEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGdCQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUczQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQztRQUN6QyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFO1lBQ25CLE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQztTQUNwQztRQUNELE9BQU8sV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUFyQkQsc0NBcUJDO0FBRUQsTUFBYSxhQUFjLFNBQVEsY0FBYztJQUFqRDs7UUFDSSxVQUFLLDhCQUFtQjtRQUN4QixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixjQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUpELHNDQUlDO0FBRUQsTUFBYSxZQUFhLFNBQVEsYUFBYTtJQUEvQzs7UUFDSSxVQUFLLDRCQUFrQjtRQUN2QixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixjQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUpELG9DQUlDO0FBRUQsTUFBYSxVQUFVO0lBVW5CLFlBQVksVUFBNEIsRUFBRSxTQUFvQixFQUFFLE1BQXlCO1FBVHpGLFVBQUssdUJBQWdCO1FBR3JCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQix3QkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFLM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMseUJBQXlCO1NBQzVEO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7WUFDcEQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7U0FDckI7YUFBTTtZQUNILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7WUFDckQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3JJLFlBQVk7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUM3QixPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUM7U0FDcEM7UUFDRCxPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBdENELGdDQXNDQztBQUVELE1BQWEsa0JBQWtCO0lBUTNCLFlBQVksVUFBNEI7UUFQeEMsVUFBSyx5Q0FBd0I7UUFHN0IsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzFCLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUczQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQUU7WUFDekIsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQXJCRCxnREFxQkM7QUFFRCxNQUFhLGlCQUFpQjtJQVExQixZQUFZLFVBQTRCO1FBUHhDLFVBQUssdUNBQXVCO1FBRzVCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxnQkFBVyxHQUFHLGdCQUFnQixDQUFDO1FBQy9CLHdCQUFtQixHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQUc1QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQXRCRCw4Q0FzQkM7Ozs7Ozs7VUN4U0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7OztBQ3BCQSx3RUFBMkM7QUFDM0MsOEVBQW9EO0FBYXBELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBRXpDLE1BQU0sVUFBVTtJQU1kLFlBQVksRUFBb0IsRUFBRSxHQUFhLEVBQUUsS0FBZSxFQUFFLElBQWE7UUFDN0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7Q0FDRjtBQUVELElBQUksT0FBTyxHQUFzQixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU5QyxTQUFTLG1CQUFtQixDQUFDLElBQWE7SUFDeEMsSUFBSSxJQUFJLHNCQUFpQixFQUFDO1FBQ3hCLE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7U0FBTSxJQUFJLElBQUksMEJBQW1CLEVBQUM7UUFDakMsT0FBTyxDQUFDLENBQUM7S0FDVjtTQUFNLElBQUksSUFBSSx3QkFBa0IsRUFBQztRQUNoQyxPQUFPLENBQUMsQ0FBQztLQUNWO1NBQU07UUFDTCxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVE7S0FDbkI7QUFDSCxDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxJQUFhO0lBQ3pDLElBQUksSUFBSSxzQkFBaUIsRUFBQztRQUN4QixPQUFPLEVBQUUsQ0FBQztLQUNYO1NBQU0sSUFBSSxJQUFJLDBCQUFtQixFQUFDO1FBQ2pDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTSxJQUFJLElBQUksd0JBQWtCLEVBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7S0FDWjtTQUFNO1FBQ0wsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRO0tBQ3BCO0FBQ0gsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEVBQW9CLEVBQUUsT0FBZ0IsRUFBRSxJQUFZLEVBQUUsTUFBYztJQUN0RixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUN4QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ3pELEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUM1RCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsQ0FBYTtJQUNwQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsYUFBaUMsQ0FBQztJQUM3QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzNCLE9BQU87YUFDUjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxFQUFvQixFQUFFLEdBQWE7SUFDMUQsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNsRCxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ2YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLFNBQVMsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLE9BQWdCLEVBQUUsVUFBa0IsRUFBRSxRQUFrQixFQUFFLE9BQWdCLEVBQUUsSUFBWSxFQUFFLE1BQWM7SUFDN0gsSUFBSSxnQkFBZ0IsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RSxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFvQixDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNGLE1BQU0sSUFBSSxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7SUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsSUFBSSxNQUFNLEdBQUcsZ0JBQVMsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsVUFBVSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEQsZUFBZSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLE9BQU8sSUFBSSxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQsU0FBUyxTQUFTO0lBQ2hCLElBQUksS0FBSyxHQUFHLElBQUksc0JBQWEsRUFBRSxDQUFDO0lBQ2hDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUU5QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLEtBQUssQ0FBQyxTQUFVLENBQUMsSUFBSSxDQUFDO1lBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsS0FBSztZQUN2QixPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDckIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQzdCLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQ2xDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsVUFBa0IsRUFBRSxPQUFnQjtJQUN4RCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsS0FBSyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDM0IsSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxRQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVMsQ0FBQyxDQUFDO1FBQ2pHLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFTLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsbUJBQW1CO0lBQzFCLE1BQU0sQ0FBQyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUNsQixDQUFDO0FBRUQsSUFBSSxNQUEwQixFQUFFLEdBQTZCLENBQUM7QUFFOUQsU0FBUyxlQUFlO0lBQ3RCLE1BQU0sR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBdUIsQ0FBQztJQUNyRSxHQUFHLEdBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQThCLENBQUM7SUFDNUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNyQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3pDLENBQUM7QUFFRCxtREFBbUQ7QUFDbkQsU0FBZ0IsV0FBVyxDQUFDLFVBQWtCLEVBQUUsUUFBa0IsRUFBRSxPQUFnQixFQUFFLE9BQWdCO0lBQ3BHLE1BQU0sVUFBVSxHQUFXLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXhELHlFQUF5RTtJQUN6RSxNQUFNLE9BQU8sR0FBVyxHQUFHLEVBQUUsT0FBTyxHQUFXLEdBQUcsRUFBRSxRQUFRLEdBQVcsR0FBRyxDQUFDO0lBQzNFLElBQUksU0FBb0IsQ0FBQztJQUV6QixTQUFTLFNBQVM7UUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQy9CLFNBQVMsR0FBRyxJQUFJLGtCQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFNBQVMsU0FBUztRQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUFDO1FBRTFELElBQUksU0FBUyxDQUFDLEVBQUUsR0FBRyxVQUFVLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUM3QyxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDdkMsU0FBUyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUMxQzthQUFNLElBQUksU0FBUyxDQUFDLEVBQUUsR0FBRyxVQUFVLElBQUksQ0FBQyxFQUFFO1lBQ3pDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUN2QyxTQUFTLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQztTQUMzQjtRQUNELElBQUksU0FBUyxDQUFDLEVBQUUsR0FBRyxVQUFVLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUM5QyxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDdkMsU0FBUyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztZQUMxQyxnQkFBZ0I7WUFDaEIsU0FBUyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUM7U0FDMUI7YUFBTSxJQUFJLFNBQVMsQ0FBQyxFQUFFLEdBQUcsVUFBVSxJQUFJLENBQUMsRUFBRTtZQUN6QyxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDdkMsU0FBUyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7U0FDM0I7UUFFRCxTQUFTLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQztRQUV4QixTQUFTLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsU0FBUyxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO1FBRTdCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkUsY0FBYztJQUNkLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEcsU0FBUyxFQUFFLENBQUM7S0FDYjtTQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ25DO0lBRUQsZUFBZSxFQUFFLENBQUM7SUFFbEIseURBQXlEO0lBQ3pELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMzQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsd0NBQXdDO1FBQ3BFLFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN2QixLQUFLLFlBQVk7Z0JBQ2YsU0FBUyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLENBQUM7Z0JBQ1osT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1IsS0FBSyxXQUFXO2dCQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUcsU0FBUyxFQUFFLENBQUM7Z0JBQ1osTUFBTTtZQUNSLEtBQUssV0FBVztnQkFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pILFNBQVMsRUFBRSxDQUFDO2dCQUNaLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpGRCxrQ0FpRkM7QUFBQSxDQUFDO0FBRUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtJQUNoQyxlQUFlLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTZXF1ZW5jZVRyZWUgfSBmcm9tIFwiLi9zZXF1ZW5jZXNcIjtcclxuaW1wb3J0IHsgSVN0YXRlLCBTdGF0ZXMsIHJlc29sdmVTdGF0ZSwgSG9yaXpvbnRhbERpcmVjdGlvbiwgQ2hhc2VTdGF0ZSwgQmFsbFN0YXRlLCBGcmFtZVJlc3VsdCwgUGV0SW5zdGFuY2VTdGF0ZSB9IGZyb20gXCIuL3N0YXRlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEludmFsaWRTdGF0ZUV4Y2VwdGlvbiB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQZXRUeXBlIHtcclxuICAgIGNhblN3aXBlKCk6IGJvb2xlYW5cclxuICAgIHN3aXBlKCk6IHZvaWRcclxuICAgIGNoYXNlKGJhbGxTdGF0ZTogQmFsbFN0YXRlLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZFxyXG4gICAgbmV4dEZyYW1lKCk6IHZvaWRcclxuICAgIGdldFN0YXRlKCk6IFBldEluc3RhbmNlU3RhdGVcclxuICAgIHJlY292ZXJTdGF0ZShzdGF0ZTogUGV0SW5zdGFuY2VTdGF0ZSk6IHZvaWRcclxufSBcclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2VQZXRUeXBlIGltcGxlbWVudHMgSVBldFR5cGUge1xyXG4gICAgbGFiZWw6IHN0cmluZyA9IFwiYmFzZVwiO1xyXG4gICAgc2VxdWVuY2U6IElTZXF1ZW5jZVRyZWUgPSB7IHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLCBzZXF1ZW5jZVN0YXRlczogW119O1xyXG4gICAgY3VycmVudFN0YXRlOiBJU3RhdGU7XHJcbiAgICBjdXJyZW50U3RhdGVFbnVtOiBTdGF0ZXM7XHJcbiAgICBob2xkU3RhdGU6IElTdGF0ZSB8IHVuZGVmaW5lZDtcclxuICAgIGhvbGRTdGF0ZUVudW06IFN0YXRlcyB8IHVuZGVmaW5lZDtcclxuICAgIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgcGV0Um9vdDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNwcml0ZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQsIHBldFJvb3Q6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5lbCA9IHNwcml0ZUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5wZXRSb290ID0gcGV0Um9vdDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSB0aGlzLnNlcXVlbmNlLnN0YXJ0aW5nU3RhdGU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCBzcHJpdGVFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdGF0ZSgpOiBQZXRJbnN0YW5jZVN0YXRlIHsgXHJcbiAgICAgICAgcmV0dXJuIHtjdXJyZW50U3RhdGVFbnVtOiB0aGlzLmN1cnJlbnRTdGF0ZUVudW19O1xyXG4gICAgfVxyXG5cclxuICAgIHJlY292ZXJTdGF0ZShzdGF0ZTogUGV0SW5zdGFuY2VTdGF0ZSl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gc3RhdGUuY3VycmVudFN0YXRlRW51bSE7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUodGhpcy5jdXJyZW50U3RhdGVFbnVtLCB0aGlzLmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBjYW5Td2lwZSgpe1xyXG4gICAgICAgIC8vIFNvbWUgcGV0cyBvdmVycmlkZSB0aGlzIHdpdGggY3VzdG9tIHJ1bGVzXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpcGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLnN3aXBlKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuaG9sZFN0YXRlID0gdGhpcy5jdXJyZW50U3RhdGU7XHJcbiAgICAgICAgdGhpcy5ob2xkU3RhdGVFbnVtID0gdGhpcy5jdXJyZW50U3RhdGVFbnVtO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IFN0YXRlcy5zd2lwZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZUVudW0sIHRoaXMuZWwpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjaGFzZShiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IFN0YXRlcy5jaGFzZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IG5ldyBDaGFzZVN0YXRlKHRoaXMuZWwsIGJhbGxTdGF0ZSwgY2FudmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBmYWNlTGVmdCgpIHtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwic2NhbGVYKC0xKVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZhY2VSaWdodCgpIHtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwic2NhbGVYKDEpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QW5pbWF0aW9uKGZhY2U6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IG5ld0ZhY2U6IHN0cmluZyA9IGAke3RoaXMucGV0Um9vdH1fJHtmYWNlfV84ZnBzLmdpZmA7XHJcbiAgICAgICAgaWYgKHRoaXMuZWwuc3JjID09PSBuZXdGYWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbC5zcmMgPSBuZXdGYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNob29zZU5leHRTdGF0ZShmcm9tU3RhdGU6IFN0YXRlcyk6IFN0YXRlcyB7XHJcbiAgICAgICAgLy8gV29yayBvdXQgbmV4dCBzdGF0ZVxyXG4gICAgICAgIHZhciBwb3NzaWJsZU5leHRTdGF0ZXM6IFN0YXRlc1tdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwIDsgaSA8IHRoaXMuc2VxdWVuY2Uuc2VxdWVuY2VTdGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2Uuc2VxdWVuY2VTdGF0ZXNbaV0uc3RhdGUgPT09IGZyb21TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzID0gdGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlc1tpXS5wb3NzaWJsZU5leHRTdGF0ZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwb3NzaWJsZU5leHRTdGF0ZXMpe1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFN0YXRlRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJhbmRvbWx5IGNob29zZSB0aGUgbmV4dCBzdGF0ZVxyXG4gICAgICAgIGNvbnN0IGlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlTmV4dFN0YXRlcy5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiBwb3NzaWJsZU5leHRTdGF0ZXNbaWR4XTtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0RnJhbWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdCkge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2VMZWZ0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjZVJpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKHRoaXMuY3VycmVudFN0YXRlLnNwcml0ZUxhYmVsKTtcclxuICAgICAgICB2YXIgZnJhbWVSZXN1bHQgPSB0aGlzLmN1cnJlbnRTdGF0ZS5uZXh0RnJhbWUoKTtcclxuICAgICAgICBpZiAoZnJhbWVSZXN1bHQgPT09IEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJZiByZWNvdmVyaW5nIGZyb20gc3dpcGUuLlxyXG4gICAgICAgICAgICBpZiAodGhpcy5ob2xkU3RhdGUgJiYgdGhpcy5ob2xkU3RhdGVFbnVtKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5ob2xkU3RhdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSB0aGlzLmhvbGRTdGF0ZUVudW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRTdGF0ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZFN0YXRlRW51bSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG5leHRTdGF0ZSA9IHRoaXMuY2hvb3NlTmV4dFN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKG5leHRTdGF0ZSwgdGhpcy5lbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IG5leHRTdGF0ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZyYW1lUmVzdWx0ID09PSBGcmFtZVJlc3VsdC5zdGF0ZUNhbmNlbCl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPT09IFN0YXRlcy5jaGFzZSkgeyAvLyBDdXJyZW50bHkgdGhlIG9ubHkgb25lIGFueXdheVxyXG4gICAgICAgICAgICAgICAgdmFyIG5leHRTdGF0ZSA9IHRoaXMuY2hvb3NlTmV4dFN0YXRlKFN0YXRlcy5pZGxlV2l0aEJhbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUobmV4dFN0YXRlLCB0aGlzLmVsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IG5leHRTdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXQgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwiY2F0XCI7XHJcbiAgICBzZXF1ZW5jZSA9IHtcclxuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMuY2xpbWJXYWxsTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jbGltYldhbGxMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGxIYW5nTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxsSGFuZ0xlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuanVtcERvd25MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmp1bXBEb3duTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5sYW5kXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmxhbmQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBjYW5Td2lwZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuY2xpbWJXYWxsTGVmdCB8fFxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPT09IFN0YXRlcy5qdW1wRG93bkxlZnQgfHwgXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmxhbmQgfHxcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMud2FsbEhhbmdMZWZ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb2cgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwiZG9nXCI7XHJcbiAgICBzZXF1ZW5jZSA9IHtcclxuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHQsIFN0YXRlcy5saWVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMubGllLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5saWVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMubGllXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNuYWtlIGV4dGVuZHMgQmFzZVBldFR5cGUge1xyXG4gICAgbGFiZWwgPSBcInNuYWtlXCI7XHJcbiAgICBzZXF1ZW5jZSA9IHtcclxuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpcHB5IGV4dGVuZHMgQmFzZVBldFR5cGUge1xyXG4gICAgbGFiZWwgPSBcImNsaXBweVwiO1xyXG4gICAgc2VxdWVuY2UgPSB7XHJcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJ1YmJlckR1Y2sgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwicnViYmVyLWR1Y2tcIjtcclxuICAgIHNlcXVlbmNlID0ge1xyXG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxyXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbnZhbGlkUGV0RXhjZXB0aW9uIHtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBldChwZXRUeXBlOiBzdHJpbmcsIGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBwZXRSb290OiBzdHJpbmcpIDogSVBldFR5cGUge1xyXG4gICAgaWYgKHBldFR5cGUgPT09IFwiY2F0XCIpe1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2F0KGVsLCBwZXRSb290KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwiZG9nXCIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERvZyhlbCwgcGV0Um9vdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcInNuYWtlXCIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNuYWtlKGVsLCBwZXRSb290KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwiY2xpcHB5XCIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENsaXBweShlbCwgcGV0Um9vdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcInJ1YmJlci1kdWNrXCIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJ1YmJlckR1Y2soZWwsIHBldFJvb3QpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEludmFsaWRQZXRFeGNlcHRpb24oKTtcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUGV0Q29sb3IsIFBldFR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGV0SW5zdGFuY2VTdGF0ZSB7XHJcbiAgICBjdXJyZW50U3RhdGVFbnVtOiBTdGF0ZXMgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQZXRFbGVtZW50U3RhdGUge1xyXG4gICAgcGV0U3RhdGU6IFBldEluc3RhbmNlU3RhdGUgfCB1bmRlZmluZWQ7XHJcbiAgICBwZXRUeXBlOiBQZXRUeXBlIHwgdW5kZWZpbmVkO1xyXG4gICAgcGV0Q29sb3I6IFBldENvbG9yIHwgdW5kZWZpbmVkO1xyXG4gICAgZWxMZWZ0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBlbEJvdHRvbTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGV0UGFuZWxTdGF0ZSB7XHJcbiAgICBwZXRTdGF0ZXM6IEFycmF5PFBldEVsZW1lbnRTdGF0ZT4gfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZW51bSBIb3Jpem9udGFsRGlyZWN0aW9uIHtcclxuICAgIGxlZnQsXHJcbiAgICByaWdodCxcclxuICAgIG5hdHVyYWwgLy8gTm8gY2hhbmdlIHRvIGN1cnJlbnQgZGlyZWN0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBlbnVtIFN0YXRlcyB7XHJcbiAgICBzaXRJZGxlID0gXCJzaXQtaWRsZVwiLFxyXG4gICAgd2Fsa1JpZ2h0ID0gXCJ3YWxrLXJpZ2h0XCIsXHJcbiAgICB3YWxrTGVmdCA9IFwid2Fsay1sZWZ0XCIsXHJcbiAgICBydW5SaWdodCA9IFwicnVuLXJpZ2h0XCIsXHJcbiAgICBydW5MZWZ0ID0gXCJydW4tbGVmdFwiLFxyXG4gICAgbGllID0gXCJsaWVcIixcclxuICAgIHdhbGxIYW5nTGVmdCA9IFwid2FsbC1oYW5nLWxlZnRcIixcclxuICAgIGNsaW1iV2FsbExlZnQgPSBcImNsaW1iLXdhbGwtbGVmdFwiLFxyXG4gICAganVtcERvd25MZWZ0ID0gXCJqdW1wLWRvd24tbGVmdFwiLFxyXG4gICAgbGFuZCA9IFwibGFuZFwiLFxyXG4gICAgc3dpcGUgPSBcInN3aXBlXCIsXHJcbiAgICBpZGxlV2l0aEJhbGwgPSBcImlkbGUtd2l0aC1iYWxsXCIsXHJcbiAgICBjaGFzZSA9IFwiY2hhc2VcIlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBGcmFtZVJlc3VsdCB7IFxyXG4gICAgc3RhdGVDb250aW51ZSxcclxuICAgIHN0YXRlQ29tcGxldGUsXHJcbiAgICAvLyBTcGVjaWFsIHN0YXRlc1xyXG4gICAgc3RhdGVDYW5jZWxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhbGxTdGF0ZSB7XHJcbiAgICBjeDogbnVtYmVyO1xyXG4gICAgY3k6IG51bWJlcjtcclxuICAgIHZ4OiBudW1iZXI7XHJcbiAgICB2eTogbnVtYmVyO1xyXG4gICAgcGF1c2VkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIHZ4OiBudW1iZXIsIHZ5OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3ggPSBjeDtcclxuICAgICAgICB0aGlzLmN5ID0gY3k7XHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVN0YXRlKHN0YXRlOiBzdHJpbmcsIGVsOiBIVE1MSW1hZ2VFbGVtZW50KTogSVN0YXRlIHtcclxuICAgIHN3aXRjaChzdGF0ZSl7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuc2l0SWRsZTogcmV0dXJuIG5ldyBTaXRJZGxlU3RhdGUoZWwpO1xyXG4gICAgICAgIGNhc2UgU3RhdGVzLndhbGtSaWdodDogcmV0dXJuIG5ldyBXYWxrUmlnaHRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa0xlZnQ6IHJldHVybiBuZXcgV2Fsa0xlZnRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMucnVuUmlnaHQ6IHJldHVybiBuZXcgUnVuUmlnaHRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMucnVuTGVmdDogcmV0dXJuIG5ldyBSdW5MZWZ0U3RhdGUoZWwpO1xyXG4gICAgICAgIGNhc2UgU3RhdGVzLmxpZTogcmV0dXJuIG5ldyBMaWVTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMud2FsbEhhbmdMZWZ0OiByZXR1cm4gbmV3IFdhbGxIYW5nTGVmdFN0YXRlKGVsKTtcclxuICAgICAgICBjYXNlIFN0YXRlcy5jbGltYldhbGxMZWZ0OiByZXR1cm4gbmV3IENsaW1iV2FsbExlZnRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuanVtcERvd25MZWZ0OiByZXR1cm4gbmV3IEp1bXBEb3duTGVmdFN0YXRlKGVsKTtcclxuICAgICAgICBjYXNlIFN0YXRlcy5sYW5kOiByZXR1cm4gbmV3IExhbmRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuc3dpcGU6IHJldHVybiBuZXcgU3dpcGVTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuaWRsZVdpdGhCYWxsOiByZXR1cm4gbmV3IElkbGVXaXRoQmFsbFN0YXRlKGVsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgU2l0SWRsZVN0YXRlKGVsKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xyXG4gICAgbGFiZWw6IHN0cmluZ1xyXG4gICAgc3ByaXRlTGFiZWw6IHN0cmluZ1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbjogSG9yaXpvbnRhbERpcmVjdGlvblxyXG4gICAgbmV4dEZyYW1lKCk6IEZyYW1lUmVzdWx0XHJcbn1cclxuXHJcbmNsYXNzIEFic3RyYWN0U3RhdGljU3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMuc2l0SWRsZTtcclxuICAgIGlkbGVDb3VudGVyOiBudW1iZXI7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwiaWRsZVwiO1xyXG4gICAgaG9sZFRpbWUgPSA1MDtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGV0RWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuaWRsZUNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xyXG4gICAgICAgIHRoaXMuaWRsZUNvdW50ZXIrKztcclxuICAgICAgICBpZiAodGhpcy5pZGxlQ291bnRlciA+IHRoaXMuaG9sZFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2l0SWRsZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5zaXRJZGxlO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcImlkbGVcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xyXG4gICAgaG9sZFRpbWUgPSA1MDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpZVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5saWU7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwibGllXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcclxuICAgIGhvbGRUaW1lID0gNTA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxsSGFuZ0xlZnRTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMud2FsbEhhbmdMZWZ0O1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGxncmFiXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xyXG4gICAgaG9sZFRpbWUgPSA1MDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExhbmRTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMubGFuZDtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJsYW5kXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xyXG4gICAgaG9sZFRpbWUgPSAxMDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN3aXBlU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLnN3aXBlO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcInN3aXBlXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5uYXR1cmFsO1xyXG4gICAgaG9sZFRpbWUgPSAxMDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElkbGVXaXRoQmFsbFN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5pZGxlV2l0aEJhbGw7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwid2l0aF9iYWxsXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0O1xyXG4gICAgaG9sZFRpbWUgPSAzMDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdhbGtSaWdodFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLndhbGtSaWdodDtcclxuICAgIHBldExlZnQ6IG51bWJlcjtcclxuICAgIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgc2tpcFNwZWVkID0gMztcclxuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrXCI7XHJcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcclxuICAgIGxlZnRCb3VuZGFyeTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBldEVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLnBldExlZnQgPSBwYXJzZUludChwZXRFbGVtZW50LnN0eWxlLmxlZnQpO1xyXG4gICAgICAgIHRoaXMuZWwgPSBwZXRFbGVtZW50O1xyXG4gICAgICAgIHRoaXMubGVmdEJvdW5kYXJ5ID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aCAqIDAuOTUpO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xyXG4gICAgICAgIHRoaXMucGV0TGVmdCArPSB0aGlzLnNraXBTcGVlZDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnBldExlZnR9cHhgO1xyXG4gICAgICAgIGlmICh0aGlzLnBldExlZnQgPj0gdGhpcy5sZWZ0Qm91bmRhcnkgLSB0aGlzLmVsLndpZHRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb250aW51ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdhbGtMZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMud2Fsa0xlZnQ7XHJcbiAgICBwZXRMZWZ0OiBudW1iZXI7XHJcbiAgICBlbDogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHNraXBTcGVlZCA9IDM7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwid2Fsa1wiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwZXRFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5wZXRMZWZ0ID0gcGFyc2VJbnQocGV0RWxlbWVudC5zdHlsZS5sZWZ0KTtcclxuICAgICAgICB0aGlzLmVsID0gcGV0RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0RnJhbWUoKSA6IEZyYW1lUmVzdWx0IHtcclxuICAgICAgICB0aGlzLnBldExlZnQgLT0gdGhpcy5za2lwU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5wZXRMZWZ0fXB4YDtcclxuICAgICAgICBpZiAodGhpcy5wZXRMZWZ0IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGcmFtZVJlc3VsdC5zdGF0ZUNvbnRpbnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUnVuUmlnaHRTdGF0ZSBleHRlbmRzIFdhbGtSaWdodFN0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLnJ1blJpZ2h0O1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtfZmFzdFwiO1xyXG4gICAgc2tpcFNwZWVkID0gNTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJ1bkxlZnRTdGF0ZSBleHRlbmRzIFdhbGtMZWZ0U3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMucnVuTGVmdDtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcclxuICAgIHNraXBTcGVlZCA9IDU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFzZVN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLmNoYXNlO1xyXG4gICAgcGV0TGVmdDogbnVtYmVyO1xyXG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBza2lwU3BlZWQgPSAzO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcInJ1blwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuICAgIGJhbGxTdGF0ZTogQmFsbFN0YXRlO1xyXG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwZXRFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LCBiYWxsU3RhdGU6IEJhbGxTdGF0ZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMucGV0TGVmdCA9IHBhcnNlSW50KHBldEVsZW1lbnQuc3R5bGUubGVmdCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IHBldEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5iYWxsU3RhdGUgPSBiYWxsU3RhdGU7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmFsbFN0YXRlLnBhdXNlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDYW5jZWw7IC8vIEJhbGwgaXMgYWxyZWFkeSBjYXVnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGV0TGVmdCA+IHRoaXMuYmFsbFN0YXRlLmN4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuICAgICAgICAgICAgdGhpcy5wZXRMZWZ0IC09IDM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcclxuICAgICAgICAgICAgdGhpcy5wZXRMZWZ0ICs9IDM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnBldExlZnR9cHhgO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLmJhbGxTdGF0ZS5jeSA8IHRoaXMuZWwud2lkdGggJiYgdGhpcy5iYWxsU3RhdGUuY3ggPCB0aGlzLnBldExlZnQgJiYgdGhpcy5wZXRMZWZ0IDwgdGhpcy5iYWxsU3RhdGUuY3ggKyAxNSkge1xyXG4gICAgICAgICAgICAvLyBoaWRlIGJhbGxcclxuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmJhbGxTdGF0ZS5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGltYldhbGxMZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMuY2xpbWJXYWxsTGVmdDtcclxuICAgIHBldEJvdHRvbTogbnVtYmVyO1xyXG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBza2lwU3BlZWQgPSAzO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGxjbGltYlwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwZXRFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5wZXRCb3R0b20gPSBwYXJzZUludChwZXRFbGVtZW50LnN0eWxlLmJvdHRvbSk7XHJcbiAgICAgICAgdGhpcy5lbCA9IHBldEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dEZyYW1lKCkgOiBGcmFtZVJlc3VsdCB7XHJcbiAgICAgICAgdGhpcy5wZXRCb3R0b20gKz0gMTtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMucGV0Qm90dG9tfXB4YDtcclxuICAgICAgICBpZiAodGhpcy5wZXRCb3R0b20gPj0gMTAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBKdW1wRG93bkxlZnRTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5qdW1wRG93bkxlZnQ7XHJcbiAgICBwZXRCb3R0b206IG51bWJlcjtcclxuICAgIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgc2tpcFNwZWVkID0gMztcclxuICAgIHNwcml0ZUxhYmVsID0gXCJmYWxsX2Zyb21fZ3JhYlwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGV0RWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMucGV0Qm90dG9tID0gcGFyc2VJbnQocGV0RWxlbWVudC5zdHlsZS5ib3R0b20pO1xyXG4gICAgICAgIHRoaXMuZWwgPSBwZXRFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIDogRnJhbWVSZXN1bHQge1xyXG4gICAgICAgIHRoaXMucGV0Qm90dG9tIC09IDU7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLnBldEJvdHRvbX1weGA7XHJcbiAgICAgICAgaWYgKHRoaXMucGV0Qm90dG9tIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wZXRCb3R0b20gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gRnJhbWVSZXN1bHQuc3RhdGVDb21wbGV0ZTtcclxuICAgICAgICB9ICAgXHJcbiAgICAgICAgcmV0dXJuIEZyYW1lUmVzdWx0LnN0YXRlQ29udGludWU7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIFRoaXMgc2NyaXB0IHdpbGwgYmUgcnVuIHdpdGhpbiB0aGUgd2VidmlldyBpdHNlbGZcclxuaW1wb3J0IHsgUGV0U2l6ZSwgUGV0Q29sb3IsIFBldFR5cGUgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xyXG5pbXBvcnQge2NyZWF0ZVBldCwgSVBldFR5cGV9IGZyb20gJy4vcGV0cyc7XHJcbmltcG9ydCB7IEJhbGxTdGF0ZSwgUGV0UGFuZWxTdGF0ZSB9IGZyb20gJy4vc3RhdGVzJztcclxuXHJcbi8qIFRoaXMgaXMgaG93IHRoZSBWUyBDb2RlIEFQSSBjYW4gYmUgaW52b2tlZCBmcm9tIHRoZSBwYW5lbCAqL1xyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgaW50ZXJmYWNlIFZzY29kZVN0YXRlQXBpIHsgXHJcbiAgICBnZXRTdGF0ZSgpIDogUGV0UGFuZWxTdGF0ZTsgLy8gQVBJIGlzIGFjdHVhbGx5IEFueSwgYnV0IHdlIHdhbnQgaXQgdG8gYmUgdHlwZWQuXHJcbiAgICBzZXRTdGF0ZShzdGF0ZTogUGV0UGFuZWxTdGF0ZSk6IHZvaWQ7XHJcbiAgfVxyXG4gIGludGVyZmFjZSBXaW5kb3cge1xyXG4gICAgYWNxdWlyZVZzQ29kZUFwaSgpOiBWc2NvZGVTdGF0ZUFwaTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHZzY29kZSA9IHdpbmRvdy5hY3F1aXJlVnNDb2RlQXBpKCk7XHJcblxyXG5jbGFzcyBQZXRFbGVtZW50IHtcclxuICBlbDogSFRNTEltYWdlRWxlbWVudDtcclxuICBwZXQ6IElQZXRUeXBlO1xyXG4gIGNvbG9yOiBQZXRDb2xvcjtcclxuICB0eXBlOiBQZXRUeXBlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbDogSFRNTEltYWdlRWxlbWVudCwgcGV0OiBJUGV0VHlwZSwgY29sb3I6IFBldENvbG9yLCB0eXBlOiBQZXRUeXBlKXtcclxuICAgIHRoaXMuZWwgPSBlbDtcclxuICAgIHRoaXMucGV0ID0gcGV0O1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBhbGxQZXRzOiBBcnJheTxQZXRFbGVtZW50PiA9IG5ldyBBcnJheSgwKTtcclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZUJhbGxSYWRpdXMoc2l6ZTogUGV0U2l6ZSk6IG51bWJlcntcclxuICBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5uYW5vKXtcclxuICAgIHJldHVybiAyO1xyXG4gIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5tZWRpdW0pe1xyXG4gICAgcmV0dXJuIDQ7XHJcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLmxhcmdlKXtcclxuICAgIHJldHVybiA4O1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gMTsgLy8gU2hydWdcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVNwcml0ZVdpZHRoKHNpemU6IFBldFNpemUpOiBudW1iZXJ7XHJcbiAgaWYgKHNpemUgPT09IFBldFNpemUubmFubyl7XHJcbiAgICByZXR1cm4gMzA7XHJcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLm1lZGl1bSl7XHJcbiAgICByZXR1cm4gNTU7XHJcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLmxhcmdlKXtcclxuICAgIHJldHVybiAxMTA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAzMDsgLy8gU2hydWdcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRTcHJpdGUoZWw6IEhUTUxJbWFnZUVsZW1lbnQsIHBldFNpemU6IFBldFNpemUsIGxlZnQ6IHN0cmluZywgYm90dG9tOiBzdHJpbmcpIHtcclxuICBlbC5zdHlsZS5sZWZ0ID0gbGVmdDtcclxuICBlbC5zdHlsZS5ib3R0b20gPSBib3R0b207XHJcbiAgZWwuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcclxuICBlbC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcclxuICBlbC5zdHlsZS5tYXhXaWR0aCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcclxuICBlbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtjYWxjdWxhdGVTcHJpdGVXaWR0aChwZXRTaXplKX1weGA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU1vdXNlT3ZlcihlOiBNb3VzZUV2ZW50KXtcclxuICB2YXIgZWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICBhbGxQZXRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICBpZiAoZWxlbWVudC5lbCA9PT0gZWwpe1xyXG4gICAgICBpZiAoIWVsZW1lbnQucGV0LmNhblN3aXBlKCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZWxlbWVudC5wZXQuc3dpcGUoKTtcclxuICAgIH1cclxuICB9KTtcclxuICBcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRBbmltYXRpb25zKGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBwZXQ6IElQZXRUeXBlKSB7XHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBoYW5kbGVNb3VzZU92ZXIpO1xyXG4gIHNldEludGVydmFsKCgpID0+IHtcclxuICAgIHBldC5uZXh0RnJhbWUoKTtcclxuICAgIHNhdmVTdGF0ZSgpO1xyXG4gIH0sIDEwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFBldFRvUGFuZWwocGV0VHlwZTogUGV0VHlwZSwgYmFzZVBldFVyaTogc3RyaW5nLCBwZXRDb2xvcjogUGV0Q29sb3IsIHBldFNpemU6IFBldFNpemUsIGxlZnQ6IHN0cmluZywgYm90dG9tOiBzdHJpbmcpOiBQZXRFbGVtZW50IHtcclxuICB2YXIgcGV0U3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgcGV0U3ByaXRlRWxlbWVudC5jbGFzc05hbWUgPSBcInBldFwiO1xyXG4gIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBldHNDb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQpLmFwcGVuZENoaWxkKHBldFNwcml0ZUVsZW1lbnQpO1xyXG4gIGNvbnN0IHJvb3QgPSBiYXNlUGV0VXJpICsgJy8nICsgcGV0VHlwZSArICcvJyArIHBldENvbG9yO1xyXG4gIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgbmV3IHBldCA6IFwiLCBwZXRUeXBlLCByb290KTtcclxuICB2YXIgbmV3UGV0ID0gY3JlYXRlUGV0KHBldFR5cGUsIHBldFNwcml0ZUVsZW1lbnQsIHJvb3QpO1xyXG4gIGluaXRTcHJpdGUocGV0U3ByaXRlRWxlbWVudCwgcGV0U2l6ZSwgbGVmdCwgYm90dG9tKTtcclxuICBzdGFydEFuaW1hdGlvbnMocGV0U3ByaXRlRWxlbWVudCwgbmV3UGV0KTtcclxuICByZXR1cm4gbmV3IFBldEVsZW1lbnQocGV0U3ByaXRlRWxlbWVudCwgbmV3UGV0LCBwZXRDb2xvciwgcGV0VHlwZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVTdGF0ZSgpe1xyXG4gIHZhciBzdGF0ZSA9IG5ldyBQZXRQYW5lbFN0YXRlKCk7XHJcbiAgc3RhdGUucGV0U3RhdGVzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gIGFsbFBldHMuZm9yRWFjaChwZXRJdGVtID0+IHtcclxuICAgIHN0YXRlLnBldFN0YXRlcyEucHVzaCh7XHJcbiAgICAgIHBldENvbG9yOiBwZXRJdGVtLmNvbG9yLFxyXG4gICAgICBwZXRUeXBlOiBwZXRJdGVtLnR5cGUsXHJcbiAgICAgIHBldFN0YXRlOiBwZXRJdGVtLnBldC5nZXRTdGF0ZSgpLFxyXG4gICAgICBlbExlZnQ6IHBldEl0ZW0uZWwuc3R5bGUubGVmdCxcclxuICAgICAgZWxCb3R0b206IHBldEl0ZW0uZWwuc3R5bGUuYm90dG9tXHJcbiAgICB9KTtcclxuICB9KTtcclxuICB2c2NvZGUuc2V0U3RhdGUoc3RhdGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWNvdmVyU3RhdGUoYmFzZVBldFVyaTogc3RyaW5nLCBwZXRTaXplOiBQZXRTaXplKXtcclxuICB2YXIgc3RhdGUgPSB2c2NvZGUuZ2V0U3RhdGUoKTtcclxuICBzdGF0ZS5wZXRTdGF0ZXMhLmZvckVhY2gocCA9PiB7XHJcbiAgICB2YXIgbmV3UGV0ID0gYWRkUGV0VG9QYW5lbChwLnBldFR5cGUhLCBiYXNlUGV0VXJpLCBwLnBldENvbG9yISwgcGV0U2l6ZSwgcC5lbExlZnQhLCBwLmVsQm90dG9tISk7XHJcbiAgICBuZXdQZXQucGV0LnJlY292ZXJTdGF0ZShwLnBldFN0YXRlISk7XHJcbiAgICBhbGxQZXRzLnB1c2gobmV3UGV0KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZG9tU3RhcnRQb3NpdGlvbigpIDogc3RyaW5nIHtcclxuICBjb25zdCB4OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVyV2lkdGggKiAwLjcpKTtcclxuICByZXR1cm4gYCR7eH1weGA7XHJcbn1cclxuXHJcbmxldCBjYW52YXMgOiBIVE1MQ2FudmFzRWxlbWVudCwgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG5mdW5jdGlvbiBpbml0QmFsbFBoeXNpY3MoKSB7XHJcbiAgY2FudmFzID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGV0Q2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50KTtcclxuICBjdHggPSAoY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xyXG4gIGN0eC5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICBjdHguY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxufVxyXG5cclxuLy8gSXQgY2Fubm90IGFjY2VzcyB0aGUgbWFpbiBWUyBDb2RlIEFQSXMgZGlyZWN0bHkuXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXRQYW5lbEFwcChiYXNlUGV0VXJpOiBzdHJpbmcsIHBldENvbG9yOiBQZXRDb2xvciwgcGV0U2l6ZTogUGV0U2l6ZSwgcGV0VHlwZTogUGV0VHlwZSkge1xyXG4gIGNvbnN0IGJhbGxSYWRpdXM6IG51bWJlciA9IGNhbGN1bGF0ZUJhbGxSYWRpdXMocGV0U2l6ZSk7XHJcblxyXG4gIC8vLyBCb3VuY2luZyBiYWxsIGNvbXBvbmVudHMsIGNyZWRpdCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjk5ODIzNDNcclxuICBjb25zdCBncmF2aXR5OiBudW1iZXIgPSAwLjIsIGRhbXBpbmc6IG51bWJlciA9IDAuOSwgdHJhY3Rpb246IG51bWJlciA9IDAuODtcclxuICB2YXIgYmFsbFN0YXRlOiBCYWxsU3RhdGU7XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0QmFsbCgpIHtcclxuICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgYmFsbFN0YXRlID0gbmV3IEJhbGxTdGF0ZSgxMDAsIDEwMCwgMiwgNSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0aHJvd0JhbGwoKSB7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBpZiAoIWJhbGxTdGF0ZS5wYXVzZWQpIHtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhyb3dCYWxsKTt9XHJcblxyXG4gICAgaWYgKGJhbGxTdGF0ZS5jeCArIGJhbGxSYWRpdXMgPj0gY2FudmFzLndpZHRoKSB7XHJcbiAgICAgIGJhbGxTdGF0ZS52eCA9IC1iYWxsU3RhdGUudnggKiBkYW1waW5nO1xyXG4gICAgICBiYWxsU3RhdGUuY3ggPSBjYW52YXMud2lkdGggLSBiYWxsUmFkaXVzO1xyXG4gICAgfSBlbHNlIGlmIChiYWxsU3RhdGUuY3ggLSBiYWxsUmFkaXVzIDw9IDApIHtcclxuICAgICAgYmFsbFN0YXRlLnZ4ID0gLWJhbGxTdGF0ZS52eCAqIGRhbXBpbmc7XHJcbiAgICAgIGJhbGxTdGF0ZS5jeCA9IGJhbGxSYWRpdXM7XHJcbiAgICB9XHJcbiAgICBpZiAoYmFsbFN0YXRlLmN5ICsgYmFsbFJhZGl1cyA+PSBjYW52YXMuaGVpZ2h0KSB7XHJcbiAgICAgIGJhbGxTdGF0ZS52eSA9IC1iYWxsU3RhdGUudnkgKiBkYW1waW5nO1xyXG4gICAgICBiYWxsU3RhdGUuY3kgPSBjYW52YXMuaGVpZ2h0IC0gYmFsbFJhZGl1cztcclxuICAgICAgLy8gdHJhY3Rpb24gaGVyZVxyXG4gICAgICBiYWxsU3RhdGUudnggKj0gdHJhY3Rpb247XHJcbiAgICB9IGVsc2UgaWYgKGJhbGxTdGF0ZS5jeSAtIGJhbGxSYWRpdXMgPD0gMCkge1xyXG4gICAgICBiYWxsU3RhdGUudnkgPSAtYmFsbFN0YXRlLnZ5ICogZGFtcGluZztcclxuICAgICAgYmFsbFN0YXRlLmN5ID0gYmFsbFJhZGl1cztcclxuICAgIH1cclxuXHJcbiAgICBiYWxsU3RhdGUudnkgKz0gZ3Jhdml0eTtcclxuXHJcbiAgICBiYWxsU3RhdGUuY3ggKz0gYmFsbFN0YXRlLnZ4O1xyXG4gICAgYmFsbFN0YXRlLmN5ICs9IGJhbGxTdGF0ZS52eTtcclxuXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKGJhbGxTdGF0ZS5jeCwgYmFsbFN0YXRlLmN5LCBiYWxsUmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzJlZDg1MVwiO1xyXG4gICAgY3R4LmZpbGwoKTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKCdTdGFydGluZyBwZXQgc2Vzc2lvbicsIHBldENvbG9yLCBiYXNlUGV0VXJpLCBwZXRUeXBlKTtcclxuICAvLyBOZXcgc2Vzc2lvblxyXG4gIHZhciBzdGF0ZSA9IHZzY29kZS5nZXRTdGF0ZSgpO1xyXG4gIGlmICghc3RhdGUpIHtcclxuICAgIGNvbnNvbGUubG9nKCdObyBzdGF0ZSwgc3RhcnRpbmcgYSBuZXcgc2Vzc2lvbi4nKTtcclxuICAgIGFsbFBldHMucHVzaChhZGRQZXRUb1BhbmVsKHBldFR5cGUsIGJhc2VQZXRVcmksIHBldENvbG9yLCBwZXRTaXplLCByYW5kb21TdGFydFBvc2l0aW9uKCksICcwcHgnKSk7XHJcbiAgICBzYXZlU3RhdGUoKTtcclxuICB9IGVsc2UgeyBcclxuICAgIGNvbnNvbGUubG9nKCdSZWNvdmVyaW5nIHN0YXRlIC0gJywgc3RhdGUpO1xyXG4gICAgcmVjb3ZlclN0YXRlKGJhc2VQZXRVcmksIHBldFNpemUpO1xyXG4gIH1cclxuXHJcbiAgaW5pdEJhbGxQaHlzaWNzKCk7XHJcblxyXG4gIC8vIEhhbmRsZSBtZXNzYWdlcyBzZW50IGZyb20gdGhlIGV4dGVuc2lvbiB0byB0aGUgd2Vidmlld1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhOyAvLyBUaGUganNvbiBkYXRhIHRoYXQgdGhlIGV4dGVuc2lvbiBzZW50XHJcbiAgICBzd2l0Y2ggKG1lc3NhZ2UuY29tbWFuZCkge1xyXG4gICAgICBjYXNlIFwidGhyb3ctYmFsbFwiOlxyXG4gICAgICAgIHJlc2V0QmFsbCgpO1xyXG4gICAgICAgIHRocm93QmFsbCgpO1xyXG4gICAgICAgIGFsbFBldHMuZm9yRWFjaChwZXRFbCA9PiB7XHJcbiAgICAgICAgICBwZXRFbC5wZXQuY2hhc2UoYmFsbFN0YXRlLCBjYW52YXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic3Bhd24tcGV0XCI6XHJcbiAgICAgICAgYWxsUGV0cy5wdXNoKGFkZFBldFRvUGFuZWwobWVzc2FnZS50eXBlLCBiYXNlUGV0VXJpLCBtZXNzYWdlLmNvbG9yLCBwZXRTaXplLCByYW5kb21TdGFydFBvc2l0aW9uKCksICcwcHgnKSk7XHJcbiAgICAgICAgc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJyZXNldC1wZXRcIjpcclxuICAgICAgICBhbGxQZXRzLmZvckVhY2gocGV0ID0+IHBldC5lbC5yZW1vdmUoKSk7XHJcbiAgICAgICAgYWxsUGV0cyA9IFtdO1xyXG4gICAgICAgIGFsbFBldHMucHVzaChhZGRQZXRUb1BhbmVsKG1lc3NhZ2UudHlwZSwgYmFzZVBldFVyaSwgbWVzc2FnZS5jb2xvciwgbWVzc2FnZS5zaXplLCByYW5kb21TdGFydFBvc2l0aW9uKCksICcwcHgnKSk7XHJcbiAgICAgICAgc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gIGluaXRCYWxsUGh5c2ljcygpO1xyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9