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
    nextFrame() {
        if (this.currentState.horizontalDirection === states_1.HorizontalDirection.left) {
            this.faceLeft();
        }
        else if (this.currentState.horizontalDirection === states_1.HorizontalDirection.right) {
            this.faceRight();
        }
        this.setAnimation(this.currentState.spriteLabel);
        if (this.currentState.nextFrame()) {
            // If recovering from swipe..
            if (this.holdState && this.holdStateEnum) {
                this.currentState = this.holdState;
                this.currentStateEnum = this.holdStateEnum;
                this.holdState = undefined;
                this.holdStateEnum = undefined;
                console.log("Recovering to state", this.currentStateEnum);
                return;
            }
            // Work out next state
            var possibleNextStates = undefined;
            for (var i = 0; i < this.sequence.sequenceStates.length; i++) {
                if (this.sequence.sequenceStates[i].state === this.currentStateEnum) {
                    possibleNextStates = this.sequence.sequenceStates[i].possibleNextStates;
                }
            }
            if (!possibleNextStates) {
                throw new InvalidStateException();
            }
            // randomly choose the next state
            const idx = Math.floor(Math.random() * possibleNextStates.length);
            this.currentState = states_1.resolveState(possibleNextStates[idx], this.el);
            this.currentStateEnum = possibleNextStates[idx];
            console.log("Transitioning to state", this.currentStateEnum);
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
exports.JumpDownLeftState = exports.ClimbWallLeftState = exports.ChaseState = exports.RunLeftState = exports.RunRightState = exports.WalkLeftState = exports.WalkRightState = exports.IdleWithBallState = exports.SwipeState = exports.LandState = exports.WallHangLeftState = exports.LieState = exports.SitIdleState = exports.resolveState = exports.BallState = exports.HorizontalDirection = void 0;
var HorizontalDirection;
(function (HorizontalDirection) {
    HorizontalDirection[HorizontalDirection["left"] = 0] = "left";
    HorizontalDirection[HorizontalDirection["right"] = 1] = "right";
    HorizontalDirection[HorizontalDirection["natural"] = 2] = "natural"; // No change to current direction
})(HorizontalDirection = exports.HorizontalDirection || (exports.HorizontalDirection = {}));
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
            return true;
        }
        return false;
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
        this.leftBoundary = window.innerWidth;
    }
    nextFrame() {
        this.petLeft += this.skipSpeed;
        this.el.style.left = `${this.petLeft}px`;
        if (this.petLeft >= this.leftBoundary - this.el.width) {
            return true;
        }
        return false;
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
            return true;
        }
        return false;
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
            return true;
        }
        return false;
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
            return true;
        }
        return false;
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
            return true;
        }
        return false;
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
// It cannot access the main VS Code APIs directly.
function petPanelApp(basePetUri, petColor, petSize, petType) {
    var petSpriteElement = document.getElementById("petSprite");
    var pet = pets_1.createPet(petType, petSpriteElement, basePetUri + '/' + petColor);
    const ballRadius = calculateBallRadius(petSize);
    /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
    var canvas, ctx;
    const gravity = 0.2, damping = 0.9, traction = 0.8;
    var ballState;
    function initSprite() {
        petSpriteElement.style.left = '0px';
        petSpriteElement.style.bottom = '0px';
        petSpriteElement.style.width = "auto";
        petSpriteElement.style.height = "auto";
        petSpriteElement.style.maxWidth = `${calculateSpriteWidth(petSize)}px`;
        petSpriteElement.style.maxHeight = `${calculateSpriteWidth(petSize)}px`;
    }
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
    function handleMouseOver(e) {
        if (!pet.canSwipe()) {
            return;
        }
        pet.swipe();
    }
    function startAnimations() {
        petSpriteElement.addEventListener("mouseover", handleMouseOver);
        setInterval(() => {
            pet.nextFrame();
        }, 100);
    }
    console.log('Starting pet session', petColor, basePetUri, petType);
    initSprite();
    startAnimations();
    initBallPhysics();
    // Handle messages sent from the extension to the webview
    window.addEventListener("message", (event) => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case "throw-ball":
                resetBall();
                throwBall();
                pet.chase(ballState, canvas);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvcGV0cy50cyIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvc3RhdGVzLnRzIiwid2VicGFjazovL3BldEFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wZXRBcHAvLi9zcmMvcGFuZWwvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsOEVBQW9HO0FBRXBHLE1BQWEscUJBQXFCO0NBRWpDO0FBRkQsc0RBRUM7QUFTRCxNQUFlLFdBQVc7SUFVdEIsWUFBWSxhQUErQixFQUFFLE9BQWU7UUFUNUQsVUFBSyxHQUFXLE1BQU0sQ0FBQztRQUN2QixhQUFRLEdBQWtCLEVBQUUsYUFBYSwwQkFBZ0IsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFTM0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFFBQVE7UUFDSiw0Q0FBNEM7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0Isd0JBQWlCLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQzNDLElBQUksQ0FBQyxnQkFBZ0Isc0JBQWUsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFZLENBQUMsSUFBSSxD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Qix5REFBeUQ7SUFDekQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzNDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyx3Q0FBd0M7UUFDcEUsUUFBUSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLEtBQUssWUFBWTtnQkFDZixTQUFTLEVBQUUsQ0FBQztnQkFDWixTQUFTLEVBQUUsQ0FBQztnQkFDWixHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDN0IsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBNUZELGtDQTRGQztBQUFBLENBQUMiLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2VxdWVuY2VUcmVlIH0gZnJvbSBcIi4vc2VxdWVuY2VzXCI7XHJcbmltcG9ydCB7IElTdGF0ZSwgU3RhdGVzLCByZXNvbHZlU3RhdGUsIEhvcml6b250YWxEaXJlY3Rpb24sIENoYXNlU3RhdGUsIEJhbGxTdGF0ZSB9IGZyb20gXCIuL3N0YXRlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEludmFsaWRTdGF0ZUV4Y2VwdGlvbiB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQZXRUeXBlIHtcclxuICAgIGNhblN3aXBlKCk6IGJvb2xlYW5cclxuICAgIHN3aXBlKCk6IHZvaWRcclxuICAgIGNoYXNlKGJhbGxTdGF0ZTogQmFsbFN0YXRlLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZFxyXG4gICAgbmV4dEZyYW1lKCk6IHZvaWRcclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZVBldFR5cGUgaW1wbGVtZW50cyBJUGV0VHlwZSB7XHJcbiAgICBsYWJlbDogc3RyaW5nID0gXCJiYXNlXCI7XHJcbiAgICBzZXF1ZW5jZTogSVNlcXVlbmNlVHJlZSA9IHsgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsIHNlcXVlbmNlU3RhdGVzOiBbXX07XHJcbiAgICBjdXJyZW50U3RhdGU6IElTdGF0ZTtcclxuICAgIGN1cnJlbnRTdGF0ZUVudW06IFN0YXRlcztcclxuICAgIGhvbGRTdGF0ZTogSVN0YXRlIHwgdW5kZWZpbmVkO1xyXG4gICAgaG9sZFN0YXRlRW51bTogU3RhdGVzIHwgdW5kZWZpbmVkO1xyXG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBwZXRSb290OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgcGV0Um9vdDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmVsID0gc3ByaXRlRWxlbWVudDtcclxuICAgICAgICB0aGlzLnBldFJvb3QgPSBwZXRSb290O1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHRoaXMuc2VxdWVuY2Uuc3RhcnRpbmdTdGF0ZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHJlc29sdmVTdGF0ZSh0aGlzLmN1cnJlbnRTdGF0ZUVudW0sIHNwcml0ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhblN3aXBlKCl7XHJcbiAgICAgICAgLy8gU29tZSBwZXRzIG92ZXJyaWRlIHRoaXMgd2l0aCBjdXN0b20gcnVsZXNcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzd2lwZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuc3dpcGUpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5ob2xkU3RhdGUgPSB0aGlzLmN1cnJlbnRTdGF0ZTtcclxuICAgICAgICB0aGlzLmhvbGRTdGF0ZUVudW0gPSB0aGlzLmN1cnJlbnRTdGF0ZUVudW07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gU3RhdGVzLnN3aXBlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gcmVzb2x2ZVN0YXRlKHRoaXMuY3VycmVudFN0YXRlRW51bSwgdGhpcy5lbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNoYXNlKGJhbGxTdGF0ZTogQmFsbFN0YXRlLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID0gU3RhdGVzLmNoYXNlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gbmV3IENoYXNlU3RhdGUodGhpcy5lbCwgYmFsbFN0YXRlLCBjYW52YXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZhY2VMZWZ0KCkge1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZVgoLTEpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZmFjZVJpZ2h0KCkge1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZVgoMSlcIjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0QW5pbWF0aW9uKGZhY2U6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IG5ld0ZhY2U6IHN0cmluZyA9IGAke3RoaXMucGV0Um9vdH1fJHtmYWNlfV84ZnBzLmdpZmA7XHJcbiAgICAgICAgaWYgKHRoaXMuZWwuc3JjID09PSBuZXdGYWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbC5zcmMgPSBuZXdGYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5sZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjZUxlZnQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFN0YXRlLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5mYWNlUmlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24odGhpcy5jdXJyZW50U3RhdGUuc3ByaXRlTGFiZWwpO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0ZS5uZXh0RnJhbWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIElmIHJlY292ZXJpbmcgZnJvbSBzd2lwZS4uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvbGRTdGF0ZSAmJiB0aGlzLmhvbGRTdGF0ZUVudW0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmhvbGRTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9IHRoaXMuaG9sZFN0YXRlRW51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9sZFN0YXRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob2xkU3RhdGVFbnVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWNvdmVyaW5nIHRvIHN0YXRlXCIgLCB0aGlzLmN1cnJlbnRTdGF0ZUVudW0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBXb3JrIG91dCBuZXh0IHN0YXRlXHJcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZU5leHRTdGF0ZXM6IFN0YXRlc1tdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCB0aGlzLnNlcXVlbmNlLnNlcXVlbmNlU3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlc1tpXS5zdGF0ZSA9PT0gdGhpcy5jdXJyZW50U3RhdGVFbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzID0gdGhpcy5zZXF1ZW5jZS5zZXF1ZW5jZVN0YXRlc1tpXS5wb3NzaWJsZU5leHRTdGF0ZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFwb3NzaWJsZU5leHRTdGF0ZXMpe1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTdGF0ZUV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHJhbmRvbWx5IGNob29zZSB0aGUgbmV4dCBzdGF0ZVxyXG4gICAgICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZU5leHRTdGF0ZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSByZXNvbHZlU3RhdGUocG9zc2libGVOZXh0U3RhdGVzW2lkeF0sIHRoaXMuZWwpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPSBwb3NzaWJsZU5leHRTdGF0ZXNbaWR4XTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUcmFuc2l0aW9uaW5nIHRvIHN0YXRlXCIgLCB0aGlzLmN1cnJlbnRTdGF0ZUVudW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXQgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwiY2F0XCI7XHJcbiAgICBzZXF1ZW5jZSA9IHtcclxuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLmNsaW1iV2FsbExlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMuY2xpbWJXYWxsTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jbGltYldhbGxMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGxIYW5nTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxsSGFuZ0xlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuanVtcERvd25MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmp1bXBEb3duTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5sYW5kXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmxhbmQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZSwgU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBjYW5Td2lwZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMuY2xpbWJXYWxsTGVmdCB8fFxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZUVudW0gPT09IFN0YXRlcy5qdW1wRG93bkxlZnQgfHwgXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRW51bSA9PT0gU3RhdGVzLmxhbmQgfHxcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVFbnVtID09PSBTdGF0ZXMud2FsbEhhbmdMZWZ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb2cgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwiZG9nXCI7XHJcbiAgICBzZXF1ZW5jZSA9IHtcclxuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHQsIFN0YXRlcy5saWVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMubGllLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGUsIFN0YXRlcy5saWVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlLCBTdGF0ZXMubGllXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNuYWtlIGV4dGVuZHMgQmFzZVBldFR5cGUge1xyXG4gICAgbGFiZWwgPSBcInNuYWtlXCI7XHJcbiAgICBzZXF1ZW5jZSA9IHtcclxuICAgICAgICBzdGFydGluZ1N0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICBzZXF1ZW5jZVN0YXRlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa1JpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5SaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMud2Fsa0xlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5ydW5MZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuY2hhc2UsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuaWRsZVdpdGhCYWxsXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmlkbGVXaXRoQmFsbCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpcHB5IGV4dGVuZHMgQmFzZVBldFR5cGUge1xyXG4gICAgbGFiZWwgPSBcImNsaXBweVwiO1xyXG4gICAgc2VxdWVuY2UgPSB7XHJcbiAgICAgICAgc3RhcnRpbmdTdGF0ZTogU3RhdGVzLnNpdElkbGUsXHJcbiAgICAgICAgc2VxdWVuY2VTdGF0ZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtSaWdodCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrTGVmdCwgU3RhdGVzLnJ1bkxlZnRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLndhbGtMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLnNpdElkbGVdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMucnVuTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLmNoYXNlLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLmlkbGVXaXRoQmFsbF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5pZGxlV2l0aEJhbGwsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa1JpZ2h0LCBTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0LCBTdGF0ZXMucnVuUmlnaHRdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJ1YmJlckR1Y2sgZXh0ZW5kcyBCYXNlUGV0VHlwZSB7XHJcbiAgICBsYWJlbCA9IFwicnViYmVyIGR1Y2tcIjtcclxuICAgIHNlcXVlbmNlID0ge1xyXG4gICAgICAgIHN0YXJ0aW5nU3RhdGU6IFN0YXRlcy5zaXRJZGxlLFxyXG4gICAgICAgIHNlcXVlbmNlU3RhdGVzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuc2l0SWRsZSxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy53YWxrUmlnaHQsIFN0YXRlcy5ydW5SaWdodF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrUmlnaHQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMud2Fsa0xlZnQsIFN0YXRlcy5ydW5MZWZ0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1blJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy53YWxrTGVmdCxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5zaXRJZGxlXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogU3RhdGVzLnJ1bkxlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU5leHRTdGF0ZXM6IFtTdGF0ZXMuc2l0SWRsZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGU6IFN0YXRlcy5jaGFzZSxcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTmV4dFN0YXRlczogW1N0YXRlcy5pZGxlV2l0aEJhbGxdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlOiBTdGF0ZXMuaWRsZVdpdGhCYWxsLFxyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOZXh0U3RhdGVzOiBbU3RhdGVzLndhbGtSaWdodCwgU3RhdGVzLndhbGtMZWZ0LCBTdGF0ZXMucnVuTGVmdCwgU3RhdGVzLnJ1blJpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbnZhbGlkUGV0RXhjZXB0aW9uIHtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBldChwZXRUeXBlOiBzdHJpbmcsIGVsOiBIVE1MSW1hZ2VFbGVtZW50LCBwZXRSb290OiBzdHJpbmcpIDogSVBldFR5cGUge1xyXG4gICAgaWYgKHBldFR5cGUgPT09IFwiY2F0XCIpe1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2F0KGVsLCBwZXRSb290KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwiZG9nXCIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERvZyhlbCwgcGV0Um9vdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcInNuYWtlXCIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNuYWtlKGVsLCBwZXRSb290KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHBldFR5cGUgPT09IFwiY2xpcHB5XCIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENsaXBweShlbCwgcGV0Um9vdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwZXRUeXBlID09PSBcInJ1YmJlciBkdWNrXCIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJ1YmJlckR1Y2soZWwsIHBldFJvb3QpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEludmFsaWRQZXRFeGNlcHRpb24oKTtcclxufVxyXG5cclxuIiwiZXhwb3J0IGVudW0gSG9yaXpvbnRhbERpcmVjdGlvbiB7XHJcbiAgICBsZWZ0LFxyXG4gICAgcmlnaHQsXHJcbiAgICBuYXR1cmFsIC8vIE5vIGNoYW5nZSB0byBjdXJyZW50IGRpcmVjdGlvblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZW51bSBTdGF0ZXMge1xyXG4gICAgc2l0SWRsZSA9IFwic2l0LWlkbGVcIixcclxuICAgIHdhbGtSaWdodCA9IFwid2Fsay1yaWdodFwiLFxyXG4gICAgd2Fsa0xlZnQgPSBcIndhbGstbGVmdFwiLFxyXG4gICAgcnVuUmlnaHQgPSBcInJ1bi1yaWdodFwiLFxyXG4gICAgcnVuTGVmdCA9IFwicnVuLWxlZnRcIixcclxuICAgIGxpZSA9IFwibGllXCIsXHJcbiAgICB3YWxsSGFuZ0xlZnQgPSBcIndhbGwtaGFuZy1sZWZ0XCIsXHJcbiAgICBjbGltYldhbGxMZWZ0ID0gXCJjbGltYi13YWxsLWxlZnRcIixcclxuICAgIGp1bXBEb3duTGVmdCA9IFwianVtcC1kb3duLWxlZnRcIixcclxuICAgIGxhbmQgPSBcImxhbmRcIixcclxuICAgIHN3aXBlID0gXCJzd2lwZVwiLFxyXG4gICAgaWRsZVdpdGhCYWxsID0gXCJpZGxlLXdpdGgtYmFsbFwiLFxyXG4gICAgY2hhc2UgPSBcImNoYXNlXCJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhbGxTdGF0ZSB7XHJcbiAgICBjeDogbnVtYmVyO1xyXG4gICAgY3k6IG51bWJlcjtcclxuICAgIHZ4OiBudW1iZXI7XHJcbiAgICB2eTogbnVtYmVyO1xyXG4gICAgcGF1c2VkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIHZ4OiBudW1iZXIsIHZ5OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3ggPSBjeDtcclxuICAgICAgICB0aGlzLmN5ID0gY3k7XHJcbiAgICAgICAgdGhpcy52eCA9IHZ4O1xyXG4gICAgICAgIHRoaXMudnkgPSB2eTtcclxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVN0YXRlKHN0YXRlOiBzdHJpbmcsIGVsOiBIVE1MSW1hZ2VFbGVtZW50KTogSVN0YXRlIHtcclxuICAgIHN3aXRjaChzdGF0ZSl7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuc2l0SWRsZTogcmV0dXJuIG5ldyBTaXRJZGxlU3RhdGUoZWwpO1xyXG4gICAgICAgIGNhc2UgU3RhdGVzLndhbGtSaWdodDogcmV0dXJuIG5ldyBXYWxrUmlnaHRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMud2Fsa0xlZnQ6IHJldHVybiBuZXcgV2Fsa0xlZnRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMucnVuUmlnaHQ6IHJldHVybiBuZXcgUnVuUmlnaHRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMucnVuTGVmdDogcmV0dXJuIG5ldyBSdW5MZWZ0U3RhdGUoZWwpO1xyXG4gICAgICAgIGNhc2UgU3RhdGVzLmxpZTogcmV0dXJuIG5ldyBMaWVTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMud2FsbEhhbmdMZWZ0OiByZXR1cm4gbmV3IFdhbGxIYW5nTGVmdFN0YXRlKGVsKTtcclxuICAgICAgICBjYXNlIFN0YXRlcy5jbGltYldhbGxMZWZ0OiByZXR1cm4gbmV3IENsaW1iV2FsbExlZnRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuanVtcERvd25MZWZ0OiByZXR1cm4gbmV3IEp1bXBEb3duTGVmdFN0YXRlKGVsKTtcclxuICAgICAgICBjYXNlIFN0YXRlcy5sYW5kOiByZXR1cm4gbmV3IExhbmRTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuc3dpcGU6IHJldHVybiBuZXcgU3dpcGVTdGF0ZShlbCk7XHJcbiAgICAgICAgY2FzZSBTdGF0ZXMuaWRsZVdpdGhCYWxsOiByZXR1cm4gbmV3IElkbGVXaXRoQmFsbFN0YXRlKGVsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgU2l0SWRsZVN0YXRlKGVsKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xyXG4gICAgbGFiZWw6IHN0cmluZ1xyXG4gICAgc3ByaXRlTGFiZWw6IHN0cmluZ1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbjogSG9yaXpvbnRhbERpcmVjdGlvblxyXG4gICAgbmV4dEZyYW1lKCk6IGJvb2xlYW5cclxufVxyXG5cclxuY2xhc3MgQWJzdHJhY3RTdGF0aWNTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5zaXRJZGxlO1xyXG4gICAgaWRsZUNvdW50ZXI6IG51bWJlcjtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJpZGxlXCI7XHJcbiAgICBob2xkVGltZSA9IDUwO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwZXRFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5pZGxlQ291bnRlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dEZyYW1lKCkgOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLmlkbGVDb3VudGVyKys7XHJcbiAgICAgICAgaWYgKHRoaXMuaWRsZUNvdW50ZXIgPiB0aGlzLmhvbGRUaW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaXRJZGxlU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLnNpdElkbGU7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwiaWRsZVwiO1xyXG4gICAgaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ucmlnaHQ7XHJcbiAgICBob2xkVGltZSA9IDUwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGllU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLmxpZTtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJsaWVcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xyXG4gICAgaG9sZFRpbWUgPSA1MDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdhbGxIYW5nTGVmdFN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy53YWxsSGFuZ0xlZnQ7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwid2FsbGdyYWJcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XHJcbiAgICBob2xkVGltZSA9IDUwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGFuZFN0YXRlIGV4dGVuZHMgQWJzdHJhY3RTdGF0aWNTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5sYW5kO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcImxhbmRcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XHJcbiAgICBob2xkVGltZSA9IDEwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3dpcGVTdGF0ZSBleHRlbmRzIEFic3RyYWN0U3RhdGljU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMuc3dpcGU7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwic3dpcGVcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLm5hdHVyYWw7XHJcbiAgICBob2xkVGltZSA9IDEwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSWRsZVdpdGhCYWxsU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdFN0YXRpY1N0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLmlkbGVXaXRoQmFsbDtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJ3aXRoX2JhbGxcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XHJcbiAgICBob2xkVGltZSA9IDMwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2Fsa1JpZ2h0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMud2Fsa1JpZ2h0O1xyXG4gICAgcGV0TGVmdDogbnVtYmVyO1xyXG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBza2lwU3BlZWQgPSAzO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xyXG4gICAgbGVmdEJvdW5kYXJ5OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGV0RWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMucGV0TGVmdCA9IHBhcnNlSW50KHBldEVsZW1lbnQuc3R5bGUubGVmdCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IHBldEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5sZWZ0Qm91bmRhcnkgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0RnJhbWUoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMucGV0TGVmdCArPSB0aGlzLnNraXBTcGVlZDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnBldExlZnR9cHhgO1xyXG4gICAgICAgIGlmICh0aGlzLnBldExlZnQgPj0gdGhpcy5sZWZ0Qm91bmRhcnkgLSB0aGlzLmVsLndpZHRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxrTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLndhbGtMZWZ0O1xyXG4gICAgcGV0TGVmdDogbnVtYmVyO1xyXG4gICAgZWw6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBza2lwU3BlZWQgPSAzO1xyXG4gICAgc3ByaXRlTGFiZWwgPSBcIndhbGtcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGV0RWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMucGV0TGVmdCA9IHBhcnNlSW50KHBldEVsZW1lbnQuc3R5bGUubGVmdCk7XHJcbiAgICAgICAgdGhpcy5lbCA9IHBldEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dEZyYW1lKCkgOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLnBldExlZnQgLT0gdGhpcy5za2lwU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5wZXRMZWZ0fXB4YDtcclxuICAgICAgICBpZiAodGhpcy5wZXRMZWZ0IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJ1blJpZ2h0U3RhdGUgZXh0ZW5kcyBXYWxrUmlnaHRTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5ydW5SaWdodDtcclxuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxrX2Zhc3RcIjtcclxuICAgIHNraXBTcGVlZCA9IDU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSdW5MZWZ0U3RhdGUgZXh0ZW5kcyBXYWxrTGVmdFN0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLnJ1bkxlZnQ7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwid2Fsa19mYXN0XCI7XHJcbiAgICBza2lwU3BlZWQgPSA1O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhc2VTdGF0ZSBpbXBsZW1lbnRzIElTdGF0ZSB7XHJcbiAgICBsYWJlbCA9IFN0YXRlcy5jaGFzZTtcclxuICAgIHBldExlZnQ6IG51bWJlcjtcclxuICAgIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgc2tpcFNwZWVkID0gMztcclxuICAgIHNwcml0ZUxhYmVsID0gXCJydW5cIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XHJcbiAgICBiYWxsU3RhdGU6IEJhbGxTdGF0ZTtcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGV0RWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgYmFsbFN0YXRlOiBCYWxsU3RhdGUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLnBldExlZnQgPSBwYXJzZUludChwZXRFbGVtZW50LnN0eWxlLmxlZnQpO1xyXG4gICAgICAgIHRoaXMuZWwgPSBwZXRFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuYmFsbFN0YXRlID0gYmFsbFN0YXRlO1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIDogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMucGV0TGVmdCA+IHRoaXMuYmFsbFN0YXRlLmN4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxEaXJlY3Rpb24ubGVmdDtcclxuICAgICAgICAgICAgdGhpcy5wZXRMZWZ0IC09IDM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID0gSG9yaXpvbnRhbERpcmVjdGlvbi5yaWdodDtcclxuICAgICAgICAgICAgdGhpcy5wZXRMZWZ0ICs9IDM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHt0aGlzLnBldExlZnR9cHhgO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLmJhbGxTdGF0ZS5jeSA8IHRoaXMuZWwud2lkdGggJiYgdGhpcy5iYWxsU3RhdGUuY3ggPCB0aGlzLnBldExlZnQgJiYgdGhpcy5wZXRMZWZ0IDwgdGhpcy5iYWxsU3RhdGUuY3ggKyAxNSkge1xyXG4gICAgICAgICAgICAvLyBoaWRlIGJhbGxcclxuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmJhbGxTdGF0ZS5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpbWJXYWxsTGVmdFN0YXRlIGltcGxlbWVudHMgSVN0YXRlIHtcclxuICAgIGxhYmVsID0gU3RhdGVzLmNsaW1iV2FsbExlZnQ7XHJcbiAgICBwZXRCb3R0b206IG51bWJlcjtcclxuICAgIGVsOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgc2tpcFNwZWVkID0gMztcclxuICAgIHNwcml0ZUxhYmVsID0gXCJ3YWxsY2xpbWJcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLmxlZnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGV0RWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMucGV0Qm90dG9tID0gcGFyc2VJbnQocGV0RWxlbWVudC5zdHlsZS5ib3R0b20pO1xyXG4gICAgICAgIHRoaXMuZWwgPSBwZXRFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIDogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5wZXRCb3R0b20gKz0gMTtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAke3RoaXMucGV0Qm90dG9tfXB4YDtcclxuICAgICAgICBpZiAodGhpcy5wZXRCb3R0b20gPj0gMTAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSnVtcERvd25MZWZ0U3RhdGUgaW1wbGVtZW50cyBJU3RhdGUge1xyXG4gICAgbGFiZWwgPSBTdGF0ZXMuanVtcERvd25MZWZ0O1xyXG4gICAgcGV0Qm90dG9tOiBudW1iZXI7XHJcbiAgICBlbDogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHNraXBTcGVlZCA9IDM7XHJcbiAgICBzcHJpdGVMYWJlbCA9IFwiZmFsbF9mcm9tX2dyYWJcIjtcclxuICAgIGhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsRGlyZWN0aW9uLnJpZ2h0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBldEVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLnBldEJvdHRvbSA9IHBhcnNlSW50KHBldEVsZW1lbnQuc3R5bGUuYm90dG9tKTtcclxuICAgICAgICB0aGlzLmVsID0gcGV0RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0RnJhbWUoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMucGV0Qm90dG9tIC09IDU7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLnBldEJvdHRvbX1weGA7XHJcbiAgICAgICAgaWYgKHRoaXMucGV0Qm90dG9tIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wZXRCb3R0b20gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9ICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBUaGlzIHNjcmlwdCB3aWxsIGJlIHJ1biB3aXRoaW4gdGhlIHdlYnZpZXcgaXRzZWxmXHJcbmltcG9ydCB7IFBldFNpemUsIFBldENvbG9yLCBQZXRUeXBlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcclxuaW1wb3J0IHtjcmVhdGVQZXR9IGZyb20gJy4vcGV0cyc7XHJcbmltcG9ydCB7IEJhbGxTdGF0ZSB9IGZyb20gJy4vc3RhdGVzJztcclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZUJhbGxSYWRpdXMoc2l6ZTogUGV0U2l6ZSk6IG51bWJlcntcclxuICBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5uYW5vKXtcclxuICAgIHJldHVybiAyO1xyXG4gIH0gZWxzZSBpZiAoc2l6ZSA9PT0gUGV0U2l6ZS5tZWRpdW0pe1xyXG4gICAgcmV0dXJuIDQ7XHJcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLmxhcmdlKXtcclxuICAgIHJldHVybiA4O1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gMTsgLy8gU2hydWdcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVNwcml0ZVdpZHRoKHNpemU6IFBldFNpemUpOiBudW1iZXJ7XHJcbiAgaWYgKHNpemUgPT09IFBldFNpemUubmFubyl7XHJcbiAgICByZXR1cm4gMzA7XHJcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLm1lZGl1bSl7XHJcbiAgICByZXR1cm4gNTU7XHJcbiAgfSBlbHNlIGlmIChzaXplID09PSBQZXRTaXplLmxhcmdlKXtcclxuICAgIHJldHVybiAxMTA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAzMDsgLy8gU2hydWdcclxuICB9XHJcbn1cclxuXHJcbi8vIEl0IGNhbm5vdCBhY2Nlc3MgdGhlIG1haW4gVlMgQ29kZSBBUElzIGRpcmVjdGx5LlxyXG5leHBvcnQgZnVuY3Rpb24gcGV0UGFuZWxBcHAoYmFzZVBldFVyaTogc3RyaW5nLCBwZXRDb2xvcjogUGV0Q29sb3IsIHBldFNpemU6IFBldFNpemUsIHBldFR5cGU6IFBldFR5cGUpIHtcclxuICB2YXIgcGV0U3ByaXRlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBldFNwcml0ZVwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50KTtcclxuICB2YXIgcGV0ID0gY3JlYXRlUGV0KHBldFR5cGUsIHBldFNwcml0ZUVsZW1lbnQsIGJhc2VQZXRVcmkgKyAnLycgKyBwZXRDb2xvcik7XHJcbiAgY29uc3QgYmFsbFJhZGl1czogbnVtYmVyID0gY2FsY3VsYXRlQmFsbFJhZGl1cyhwZXRTaXplKTtcclxuXHJcbiAgLy8vIEJvdW5jaW5nIGJhbGwgY29tcG9uZW50cywgY3JlZGl0IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yOTk4MjM0M1xyXG4gIHZhciBjYW52YXMgOiBIVE1MQ2FudmFzRWxlbWVudCwgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgY29uc3QgZ3Jhdml0eTogbnVtYmVyID0gMC4yLCBkYW1waW5nOiBudW1iZXIgPSAwLjksIHRyYWN0aW9uOiBudW1iZXIgPSAwLjg7XHJcbiAgdmFyIGJhbGxTdGF0ZTogQmFsbFN0YXRlO1xyXG5cclxuICBmdW5jdGlvbiBpbml0U3ByaXRlKCkge1xyXG4gICAgcGV0U3ByaXRlRWxlbWVudC5zdHlsZS5sZWZ0ID0gJzBweCc7XHJcbiAgICBwZXRTcHJpdGVFbGVtZW50LnN0eWxlLmJvdHRvbSA9ICcwcHgnO1xyXG4gICAgcGV0U3ByaXRlRWxlbWVudC5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xyXG4gICAgcGV0U3ByaXRlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIHBldFNwcml0ZUVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBgJHtjYWxjdWxhdGVTcHJpdGVXaWR0aChwZXRTaXplKX1weGA7XHJcbiAgICBwZXRTcHJpdGVFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke2NhbGN1bGF0ZVNwcml0ZVdpZHRoKHBldFNpemUpfXB4YDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRCYWxsUGh5c2ljcygpIHtcclxuICAgIGNhbnZhcyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBldENhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudCk7XHJcbiAgICBjdHggPSAoY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xyXG4gICAgY3R4LmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgY3R4LmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldEJhbGwoKSB7XHJcbiAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIGJhbGxTdGF0ZSA9IG5ldyBCYWxsU3RhdGUoMTAwLCAxMDAsIDIsIDUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdGhyb3dCYWxsKCkge1xyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgaWYgKCFiYWxsU3RhdGUucGF1c2VkKSB7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRocm93QmFsbCk7fVxyXG5cclxuICAgIGlmIChiYWxsU3RhdGUuY3ggKyBiYWxsUmFkaXVzID49IGNhbnZhcy53aWR0aCkge1xyXG4gICAgICBiYWxsU3RhdGUudnggPSAtYmFsbFN0YXRlLnZ4ICogZGFtcGluZztcclxuICAgICAgYmFsbFN0YXRlLmN4ID0gY2FudmFzLndpZHRoIC0gYmFsbFJhZGl1cztcclxuICAgIH0gZWxzZSBpZiAoYmFsbFN0YXRlLmN4IC0gYmFsbFJhZGl1cyA8PSAwKSB7XHJcbiAgICAgIGJhbGxTdGF0ZS52eCA9IC1iYWxsU3RhdGUudnggKiBkYW1waW5nO1xyXG4gICAgICBiYWxsU3RhdGUuY3ggPSBiYWxsUmFkaXVzO1xyXG4gICAgfVxyXG4gICAgaWYgKGJhbGxTdGF0ZS5jeSArIGJhbGxSYWRpdXMgPj0gY2FudmFzLmhlaWdodCkge1xyXG4gICAgICBiYWxsU3RhdGUudnkgPSAtYmFsbFN0YXRlLnZ5ICogZGFtcGluZztcclxuICAgICAgYmFsbFN0YXRlLmN5ID0gY2FudmFzLmhlaWdodCAtIGJhbGxSYWRpdXM7XHJcbiAgICAgIC8vIHRyYWN0aW9uIGhlcmVcclxuICAgICAgYmFsbFN0YXRlLnZ4ICo9IHRyYWN0aW9uO1xyXG4gICAgfSBlbHNlIGlmIChiYWxsU3RhdGUuY3kgLSBiYWxsUmFkaXVzIDw9IDApIHtcclxuICAgICAgYmFsbFN0YXRlLnZ5ID0gLWJhbGxTdGF0ZS52eSAqIGRhbXBpbmc7XHJcbiAgICAgIGJhbGxTdGF0ZS5jeSA9IGJhbGxSYWRpdXM7XHJcbiAgICB9XHJcblxyXG4gICAgYmFsbFN0YXRlLnZ5ICs9IGdyYXZpdHk7XHJcblxyXG4gICAgYmFsbFN0YXRlLmN4ICs9IGJhbGxTdGF0ZS52eDtcclxuICAgIGJhbGxTdGF0ZS5jeSArPSBiYWxsU3RhdGUudnk7XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYyhiYWxsU3RhdGUuY3gsIGJhbGxTdGF0ZS5jeSwgYmFsbFJhZGl1cywgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMyZWQ4NTFcIjtcclxuICAgIGN0eC5maWxsKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU92ZXIoZTogYW55KSB7XHJcbiAgICBpZiAoIXBldC5jYW5Td2lwZSgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHBldC5zd2lwZSgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3RhcnRBbmltYXRpb25zKCkge1xyXG4gICAgcGV0U3ByaXRlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGhhbmRsZU1vdXNlT3Zlcik7XHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHBldC5uZXh0RnJhbWUoKTtcclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKCdTdGFydGluZyBwZXQgc2Vzc2lvbicsIHBldENvbG9yLCBiYXNlUGV0VXJpLCBwZXRUeXBlKTtcclxuICBpbml0U3ByaXRlKCk7XHJcbiAgc3RhcnRBbmltYXRpb25zKCk7XHJcbiAgaW5pdEJhbGxQaHlzaWNzKCk7XHJcblxyXG4gIC8vIEhhbmRsZSBtZXNzYWdlcyBzZW50IGZyb20gdGhlIGV4dGVuc2lvbiB0byB0aGUgd2Vidmlld1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhOyAvLyBUaGUganNvbiBkYXRhIHRoYXQgdGhlIGV4dGVuc2lvbiBzZW50XHJcbiAgICBzd2l0Y2ggKG1lc3NhZ2UuY29tbWFuZCkge1xyXG4gICAgICBjYXNlIFwidGhyb3ctYmFsbFwiOlxyXG4gICAgICAgIHJlc2V0QmFsbCgpO1xyXG4gICAgICAgIHRocm93QmFsbCgpO1xyXG4gICAgICAgIHBldC5jaGFzZShiYWxsU3RhdGUsIGNhbnZhcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=