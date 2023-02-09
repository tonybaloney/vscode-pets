/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/names.ts":
/*!*****************************!*\
  !*** ./src/common/names.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomName = void 0;
const cat_1 = __webpack_require__(/*! ../panel/pets/cat */ "./src/panel/pets/cat.ts");
const chicken_1 = __webpack_require__(/*! ../panel/pets/chicken */ "./src/panel/pets/chicken.ts");
const clippy_1 = __webpack_require__(/*! ../panel/pets/clippy */ "./src/panel/pets/clippy.ts");
const cockatiel_1 = __webpack_require__(/*! ../panel/pets/cockatiel */ "./src/panel/pets/cockatiel.ts");
const crab_1 = __webpack_require__(/*! ../panel/pets/crab */ "./src/panel/pets/crab.ts");
const dog_1 = __webpack_require__(/*! ../panel/pets/dog */ "./src/panel/pets/dog.ts");
const fox_1 = __webpack_require__(/*! ../panel/pets/fox */ "./src/panel/pets/fox.ts");
const mod_1 = __webpack_require__(/*! ../panel/pets/mod */ "./src/panel/pets/mod.ts");
const rocky_1 = __webpack_require__(/*! ../panel/pets/rocky */ "./src/panel/pets/rocky.ts");
const rubberduck_1 = __webpack_require__(/*! ../panel/pets/rubberduck */ "./src/panel/pets/rubberduck.ts");
const snake_1 = __webpack_require__(/*! ../panel/pets/snake */ "./src/panel/pets/snake.ts");
const totoro_1 = __webpack_require__(/*! ../panel/pets/totoro */ "./src/panel/pets/totoro.ts");
const zappy_1 = __webpack_require__(/*! ../panel/pets/zappy */ "./src/panel/pets/zappy.ts");
const rat_1 = __webpack_require__(/*! ../panel/pets/rat */ "./src/panel/pets/rat.ts");
function randomName(type) {
    const collection = {
        ["cat" /* PetType.cat */]: cat_1.CAT_NAMES,
        ["chicken" /* PetType.chicken */]: chicken_1.CHICKEN_NAMES,
        ["dog" /* PetType.dog */]: dog_1.DOG_NAMES,
        ["fox" /* PetType.fox */]: fox_1.FOX_NAMES,
        ["crab" /* PetType.crab */]: crab_1.CRAB_NAMES,
        ["clippy" /* PetType.clippy */]: clippy_1.CLIPPY_NAMES,
        ["mod" /* PetType.mod */]: mod_1.MOD_NAMES,
        ["totoro" /* PetType.totoro */]: totoro_1.TOTORO_NAMES,
        ["snake" /* PetType.snake */]: snake_1.SNAKE_NAMES,
        ["rubber-duck" /* PetType.rubberduck */]: rubberduck_1.DUCK_NAMES,
        ["zappy" /* PetType.zappy */]: zappy_1.ZAPPY_NAMES,
        ["rocky" /* PetType.rocky */]: rocky_1.ROCKY_NAMES,
        ["cockatiel" /* PetType.cockatiel */]: cockatiel_1.COCKATIEL_NAMES,
        ["rat" /* PetType.rat */]: rat_1.RAT_NAMES,
    }[type] ?? cat_1.CAT_NAMES;
    return (collection[Math.floor(Math.random() * collection.length)] ?? 'Unknown');
}
exports.randomName = randomName;


/***/ }),

/***/ "./src/panel/basepettype.ts":
/*!**********************************!*\
  !*** ./src/panel/basepettype.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasePetType = exports.InvalidStateException = void 0;
const states_1 = __webpack_require__(/*! ./states */ "./src/panel/states.ts");
class InvalidStateException {
}
exports.InvalidStateException = InvalidStateException;
class BasePetType {
    label = 'base';
    static count = 0;
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [],
    };
    static possibleColors;
    currentState;
    currentStateEnum;
    holdState;
    holdStateEnum;
    el;
    collision;
    speech;
    _left;
    _bottom;
    petRoot;
    _floor;
    _friend;
    _name;
    _speed;
    _size;
    constructor(spriteElement, collisionElement, speechElement, size, left, bottom, petRoot, floor, name, speed) {
        this.el = spriteElement;
        this.collision = collisionElement;
        this.speech = speechElement;
        this.petRoot = petRoot;
        this._floor = floor;
        this._left = left;
        this._bottom = bottom;
        this.initSprite(size, left, bottom);
        this.currentStateEnum = this.sequence.startingState;
        this.currentState = (0, states_1.resolveState)(this.currentStateEnum, this);
        this._name = name;
        this._size = size;
        this._speed = this.randomizeSpeed(speed);
        // Increment the static count of the Pet class that the constructor belongs to
        this.constructor.count += 1;
    }
    initSprite(petSize, left, bottom) {
        this.el.style.left = `${left}px`;
        this.el.style.bottom = `${bottom}px`;
        this.el.style.width = 'auto';
        this.el.style.height = 'auto';
        this.el.style.maxWidth = `${this.calculateSpriteWidth(petSize)}px`;
        this.el.style.maxHeight = `${this.calculateSpriteWidth(petSize)}px`;
        this.collision.style.left = `${left}px`;
        this.collision.style.bottom = `${bottom}px`;
        this.collision.style.width = `${this.calculateSpriteWidth(petSize)}px`;
        this.collision.style.height = `${this.calculateSpriteWidth(petSize)}px`;
        this.speech.style.left = `${left}px`;
        this.speech.style.bottom = `${bottom + this.calculateSpriteWidth(petSize)}px`;
        this.hideSpeechBubble();
    }
    get left() {
        return this._left;
    }
    get bottom() {
        return this._bottom;
    }
    repositionAccompanyingElements() {
        this.collision.style.left = `${this._left}px`;
        this.collision.style.bottom = `${this._bottom}px`;
        this.speech.style.left = `${this._left}px`;
        this.speech.style.bottom = `${this._bottom + this.calculateSpriteWidth(this._size)}px`;
    }
    calculateSpriteWidth(size) {
        if (size === "nano" /* PetSize.nano */) {
            return 30;
        }
        else if (size === "small" /* PetSize.small */) {
            return 40;
        }
        else if (size === "medium" /* PetSize.medium */) {
            return 55;
        }
        else if (size === "large" /* PetSize.large */) {
            return 110;
        }
        else {
            return 30; // Shrug
        }
    }
    positionBottom(bottom) {
        this._bottom = bottom;
        this.el.style.bottom = `${this._bottom}px`;
        this.repositionAccompanyingElements();
    }
    positionLeft(left) {
        this._left = left;
        this.el.style.left = `${this._left}px`;
        this.repositionAccompanyingElements();
    }
    get width() {
        return this.el.width;
    }
    get floor() {
        return this._floor;
    }
    get hello() {
        // return the sound of the name of the animal
        return ` says hello 👋!`;
    }
    getState() {
        return { currentStateEnum: this.currentStateEnum };
    }
    get speed() {
        return this._speed;
    }
    randomizeSpeed(speed) {
        const min = speed * 0.7;
        const max = speed * 1.3;
        const newSpeed = Math.random() * (max - min) + min;
        return newSpeed;
    }
    get isMoving() {
        return this._speed !== 0 /* PetSpeed.still */;
    }
    recoverFriend(friend) {
        // Recover friends..
        this._friend = friend;
    }
    recoverState(state) {
        // TODO : Resolve a bug where if it was swiping before, it would fail
        // because holdState is no longer valid.
        this.currentStateEnum = state.currentStateEnum ?? "sit-idle" /* States.sitIdle */;
        this.currentState = (0, states_1.resolveState)(this.currentStateEnum, this);
        if (!(0, states_1.isStateAboveGround)(this.currentStateEnum)) {
            // Reset the bottom of the sprite to the floor as the theme
            // has likely changed.
            this.positionBottom(this.floor);
        }
    }
    get canSwipe() {
        return !(0, states_1.isStateAboveGround)(this.currentStateEnum);
    }
    get canChase() {
        return !(0, states_1.isStateAboveGround)(this.currentStateEnum) && this.isMoving;
    }
    showSpeechBubble(message, duration = 3000) {
        this.speech.innerHTML = message;
        this.speech.style.display = 'block';
        setTimeout(() => {
            this.hideSpeechBubble();
        }, duration);
    }
    hideSpeechBubble() {
        this.speech.style.display = 'none';
    }
    swipe() {
        if (this.currentStateEnum === "swipe" /* States.swipe */) {
            return;
        }
        this.holdState = this.currentState;
        this.holdStateEnum = this.currentStateEnum;
        this.currentStateEnum = "swipe" /* States.swipe */;
        this.currentState = (0, states_1.resolveState)(this.currentStateEnum, this);
        this.showSpeechBubble('👋');
    }
    chase(ballState, canvas) {
        this.currentStateEnum = "chase" /* States.chase */;
        this.currentState = new states_1.ChaseState(this, ballState, canvas);
    }
    faceLeft() {
        this.el.style.transform = 'scaleX(-1)';
    }
    faceRight() {
        this.el.style.transform = 'scaleX(1)';
    }
    setAnimation(face) {
        if (this.el.src.endsWith(`_${face}_8fps.gif`)) {
            return;
        }
        this.el.src = `${this.petRoot}_${face}_8fps.gif`;
    }
    chooseNextState(fromState) {
        // Work out next state
        var possibleNextStates = undefined;
        for (var i = 0; i < this.sequence.sequenceStates.length; i++) {
            if (this.sequence.sequenceStates[i].state === fromState) {
                possibleNextStates =
                    this.sequence.sequenceStates[i].possibleNextStates;
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
        if (this.hasFriend &&
            this.currentStateEnum !== "chase-friend" /* States.chaseFriend */ &&
            this.isMoving) {
            if (this.friend?.isPlaying &&
                !(0, states_1.isStateAboveGround)(this.currentStateEnum)) {
                this.currentState = (0, states_1.resolveState)("chase-friend" /* States.chaseFriend */, this);
                this.currentStateEnum = "chase-friend" /* States.chaseFriend */;
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
            this.currentState = (0, states_1.resolveState)(nextState, this);
            this.currentStateEnum = nextState;
        }
        else if (frameResult === states_1.FrameResult.stateCancel) {
            if (this.currentStateEnum === "chase" /* States.chase */) {
                var nextState = this.chooseNextState("idle-with-ball" /* States.idleWithBall */);
                this.currentState = (0, states_1.resolveState)(nextState, this);
                this.currentStateEnum = nextState;
            }
            else if (this.currentStateEnum === "chase-friend" /* States.chaseFriend */) {
                var nextState = this.chooseNextState("idle-with-ball" /* States.idleWithBall */);
                this.currentState = (0, states_1.resolveState)(nextState, this);
                this.currentStateEnum = nextState;
            }
        }
    }
    get hasFriend() {
        return this._friend !== undefined;
    }
    get friend() {
        return this._friend;
    }
    get name() {
        return this._name;
    }
    makeFriendsWith(friend) {
        this._friend = friend;
        console.log(this.name, ": I'm now friends ❤️ with ", friend.name);
        return true;
    }
    get isPlaying() {
        return (this.isMoving &&
            (this.currentStateEnum === "run-right" /* States.runRight */ ||
                this.currentStateEnum === "run-left" /* States.runLeft */));
    }
    get emoji() {
        return '🐶';
    }
}
exports.BasePetType = BasePetType;


/***/ }),

/***/ "./src/panel/main.ts":
/*!***************************!*\
  !*** ./src/panel/main.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.petPanelApp = exports.saveState = exports.allPets = void 0;
// This script will be run within the webview itself
const names_1 = __webpack_require__(/*! ../common/names */ "./src/common/names.ts");
const pets_1 = __webpack_require__(/*! ./pets */ "./src/panel/pets.ts");
const states_1 = __webpack_require__(/*! ./states */ "./src/panel/states.ts");
exports.allPets = new pets_1.PetCollection();
var petCounter;
function calculateBallRadius(size) {
    if (size === "nano" /* PetSize.nano */) {
        return 2;
    }
    else if (size === "small" /* PetSize.small */) {
        return 3;
    }
    else if (size === "medium" /* PetSize.medium */) {
        return 4;
    }
    else if (size === "large" /* PetSize.large */) {
        return 8;
    }
    else {
        return 1; // Shrug
    }
}
function calculateFloor(size, theme) {
    switch (theme) {
        case "forest" /* Theme.forest */:
            switch (size) {
                case "small" /* PetSize.small */:
                    return 30;
                case "medium" /* PetSize.medium */:
                    return 40;
                case "large" /* PetSize.large */:
                    return 65;
                case "nano" /* PetSize.nano */:
                default:
                    return 23;
            }
        case "castle" /* Theme.castle */:
            switch (size) {
                case "small" /* PetSize.small */:
                    return 60;
                case "medium" /* PetSize.medium */:
                    return 80;
                case "large" /* PetSize.large */:
                    return 120;
                case "nano" /* PetSize.nano */:
                default:
                    return 45;
            }
        case "beach" /* Theme.beach */:
            switch (size) {
                case "small" /* PetSize.small */:
                    return 60;
                case "medium" /* PetSize.medium */:
                    return 80;
                case "large" /* PetSize.large */:
                    return 120;
                case "nano" /* PetSize.nano */:
                default:
                    return 45;
            }
    }
    return 0;
}
function handleMouseOver(e) {
    var el = e.currentTarget;
    exports.allPets.pets.forEach((element) => {
        if (element.collision === el) {
            if (!element.pet.canSwipe) {
                return;
            }
            element.pet.swipe();
        }
    });
}
function startAnimations(collision, pet, stateApi) {
    if (!stateApi) {
        stateApi = acquireVsCodeApi();
    }
    collision.addEventListener('mouseover', handleMouseOver);
    setInterval(() => {
        var updates = exports.allPets.seekNewFriends();
        updates.forEach((message) => {
            stateApi?.postMessage({
                text: message,
                command: 'info',
            });
        });
        pet.nextFrame();
        saveState(stateApi);
    }, 100);
}
function addPetToPanel(petType, basePetUri, petColor, petSize, left, bottom, floor, name, stateApi) {
    var petSpriteElement = document.createElement('img');
    petSpriteElement.className = 'pet';
    document.getElementById('petsContainer').appendChild(petSpriteElement);
    var collisionElement = document.createElement('div');
    collisionElement.className = 'collision';
    document.getElementById('petsContainer').appendChild(collisionElement);
    var speechBubbleElement = document.createElement('div');
    speechBubbleElement.className = `bubble bubble-${petSize}`;
    speechBubbleElement.innerText = 'Hello!';
    document.getElementById('petsContainer').appendChild(speechBubbleElement);
    const root = basePetUri + '/' + petType + '/' + petColor;
    console.log('Creating new pet : ', petType, root, petColor, petSize, name);
    try {
        if (!(0, pets_1.availableColors)(petType).includes(petColor)) {
            throw new pets_1.InvalidPetException('Invalid color for pet type');
        }
        var newPet = (0, pets_1.createPet)(petType, petSpriteElement, collisionElement, speechBubbleElement, petSize, left, bottom, root, floor, name);
        petCounter++;
        startAnimations(collisionElement, newPet, stateApi);
    }
    catch (e) {
        // Remove elements
        petSpriteElement.remove();
        collisionElement.remove();
        speechBubbleElement.remove();
        throw e;
    }
    return new pets_1.PetElement(petSpriteElement, collisionElement, speechBubbleElement, newPet, petColor, petType);
}
function saveState(stateApi) {
    if (!stateApi) {
        stateApi = acquireVsCodeApi();
    }
    var state = new states_1.PetPanelState();
    state.petStates = new Array();
    exports.allPets.pets.forEach((petItem) => {
        state.petStates?.push({
            petName: petItem.pet.name,
            petColor: petItem.color,
            petType: petItem.type,
            petState: petItem.pet.getState(),
            petFriend: petItem.pet.friend?.name ?? undefined,
            elLeft: petItem.el.style.left,
            elBottom: petItem.el.style.bottom,
        });
    });
    state.petCounter = petCounter;
    stateApi?.setState(state);
}
exports.saveState = saveState;
function recoverState(basePetUri, petSize, floor, stateApi) {
    if (!stateApi) {
        stateApi = acquireVsCodeApi();
    }
    var state = stateApi?.getState();
    if (!state) {
        petCounter = 1;
    }
    else {
        if (state.petCounter === undefined || isNaN(state.petCounter)) {
            petCounter = 1;
        }
        else {
            petCounter = state.petCounter ?? 1;
        }
    }
    var recoveryMap = new Map();
    state?.petStates?.forEach((p) => {
        // Fixes a bug related to duck animations
        if (p.petType === 'rubber duck') {
            p.petType = 'rubber-duck';
        }
        try {
            var newPet = addPetToPanel(p.petType ?? "cat" /* PetType.cat */, basePetUri, p.petColor ?? "brown" /* PetColor.brown */, petSize, parseInt(p.elLeft ?? '0'), parseInt(p.elBottom ?? '0'), floor, p.petName ?? (0, names_1.randomName)(p.petType ?? "cat" /* PetType.cat */), stateApi);
            exports.allPets.push(newPet);
            recoveryMap.set(newPet.pet, p);
        }
        catch (InvalidPetException) {
            console.log('State had invalid pet (' + p.petType + '), discarding.');
        }
    });
    recoveryMap.forEach((state, pet) => {
        // Recover previous state.
        if (state.petState !== undefined) {
            pet.recoverState(state.petState);
        }
        // Resolve friend relationships
        var friend = undefined;
        if (state.petFriend) {
            friend = exports.allPets.locate(state.petFriend);
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
    canvas = document.getElementById('petCanvas');
    if (!canvas) {
        console.log('Canvas not ready');
        return;
    }
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.log('Canvas context not ready');
        return;
    }
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
// It cannot access the main VS Code APIs directly.
function petPanelApp(basePetUri, theme, themeKind, petColor, petSize, petType, throwBallWithMouse, stateApi) {
    const ballRadius = calculateBallRadius(petSize);
    var floor = 0;
    if (!stateApi) {
        stateApi = acquireVsCodeApi();
    }
    // Apply Theme backgrounds
    const foregroundEl = document.getElementById('foreground');
    if (theme !== "none" /* Theme.none */) {
        var _themeKind = '';
        switch (themeKind) {
            case 2 /* ColorThemeKind.dark */:
                _themeKind = 'dark';
                break;
            case 1 /* ColorThemeKind.light */:
                _themeKind = 'light';
                break;
            case 3 /* ColorThemeKind.highContrast */:
            default:
                _themeKind = 'light';
                break;
        }
        document.body.style.backgroundImage = `url('${basePetUri}/backgrounds/${theme}/background-${_themeKind}-${petSize}.png')`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        foregroundEl.style.backgroundImage = `url('${basePetUri}/backgrounds/${theme}/foreground-${_themeKind}-${petSize}.png')`;
        floor = calculateFloor(petSize, theme); // Themes have pets at a specified height from the ground
    }
    else {
        document.body.style.backgroundImage = '';
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        foregroundEl.style.backgroundImage = '';
    }
    /// Bouncing ball components, credit https://stackoverflow.com/a/29982343
    const gravity = 0.6, damping = 0.9, traction = 0.8, interval = 1000 / 24; // msec for single frame
    let then = 0; // last draw
    var ballState;
    function resetBall() {
        if (ballState) {
            ballState.paused = true;
        }
        if (canvas) {
            canvas.style.display = 'block';
        }
        ballState = new states_1.BallState(100, 100, 4, 5);
    }
    function dynamicThrowOn() {
        let startMouseX;
        let startMouseY;
        let endMouseX;
        let endMouseY;
        console.log('Enabling dynamic throw');
        window.onmousedown = (e) => {
            if (ballState) {
                ballState.paused = true;
            }
            if (canvas) {
                canvas.style.display = 'block';
            }
            endMouseX = e.clientX;
            endMouseY = e.clientY;
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            ballState = new states_1.BallState(e.clientX, e.clientY, 0, 0);
            exports.allPets.pets.forEach((petEl) => {
                if (petEl.pet.canChase) {
                    petEl.pet.chase(ballState, canvas);
                }
            });
            ballState.paused = true;
            drawBall();
            window.onmousemove = (ev) => {
                ev.preventDefault();
                if (ballState) {
                    ballState.paused = true;
                }
                startMouseX = endMouseX;
                startMouseY = endMouseY;
                endMouseX = ev.clientX;
                endMouseY = ev.clientY;
                ballState = new states_1.BallState(ev.clientX, ev.clientY, 0, 0);
                drawBall();
            };
            window.onmouseup = (ev) => {
                ev.preventDefault();
                window.onmouseup = null;
                window.onmousemove = null;
                ballState = new states_1.BallState(endMouseX, endMouseY, endMouseX - startMouseX, endMouseY - startMouseY);
                exports.allPets.pets.forEach((petEl) => {
                    if (petEl.pet.canChase) {
                        petEl.pet.chase(ballState, canvas);
                    }
                });
                throwBall();
            };
        };
    }
    function dynamicThrowOff() {
        console.log('Disabling dynamic throw');
        window.onmousedown = null;
        if (ballState) {
            ballState.paused = true;
        }
        if (canvas) {
            canvas.style.display = 'none';
        }
    }
    function throwBall() {
        if (!ballState.paused) {
            requestAnimationFrame(throwBall);
        }
        // throttling the frame rate
        const now = Date.now();
        const elapsed = now - then;
        if (elapsed <= interval) {
            return;
        }
        then = now - (elapsed % interval);
        if (ballState.cx + ballRadius >= canvas.width) {
            ballState.vx = -ballState.vx * damping;
            ballState.cx = canvas.width - ballRadius;
        }
        else if (ballState.cx - ballRadius <= 0) {
            ballState.vx = -ballState.vx * damping;
            ballState.cx = ballRadius;
        }
        if (ballState.cy + ballRadius + floor >= canvas.height) {
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
        drawBall();
    }
    function drawBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(ballState.cx, ballState.cy, ballRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#2ed851';
        ctx.fill();
    }
    console.log('Starting pet session', petColor, basePetUri, petType, throwBallWithMouse);
    // New session
    var state = stateApi?.getState();
    if (!state) {
        console.log('No state, starting a new session.');
        petCounter = 1;
        exports.allPets.push(addPetToPanel(petType, basePetUri, petColor, petSize, randomStartPosition(), floor, floor, (0, names_1.randomName)(petType), stateApi));
        saveState(stateApi);
    }
    else {
        console.log('Recovering state - ', state);
        recoverState(basePetUri, petSize, floor, stateApi);
    }
    initCanvas();
    if (throwBallWithMouse) {
        dynamicThrowOn();
    }
    else {
        dynamicThrowOff();
    }
    // Handle messages sent from the extension to the webview
    window.addEventListener('message', (event) => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case 'throw-with-mouse':
                if (message.enabled) {
                    dynamicThrowOn();
                }
                else {
                    dynamicThrowOff();
                }
                break;
            case 'throw-ball':
                resetBall();
                throwBall();
                exports.allPets.pets.forEach((petEl) => {
                    if (petEl.pet.canChase) {
                        petEl.pet.chase(ballState, canvas);
                    }
                });
                break;
            case 'spawn-pet':
                exports.allPets.push(addPetToPanel(message.type, basePetUri, message.color, petSize, randomStartPosition(), floor, floor, message.name ?? (0, names_1.randomName)(message.type), stateApi));
                saveState(stateApi);
                break;
            case 'list-pets':
                var pets = exports.allPets.pets;
                stateApi?.postMessage({
                    command: 'list-pets',
                    text: pets
                        .map((pet) => `${pet.type},${pet.pet.name},${pet.color}`)
                        .join('\n'),
                });
                break;
            case 'roll-call':
                var pets = exports.allPets.pets;
                // go through every single
                // pet and then print out their name
                pets.forEach((pet) => {
                    stateApi?.postMessage({
                        command: 'info',
                        text: `${pet.pet.emoji} ${pet.pet.name} (${pet.color} ${pet.type}): ${pet.pet.hello}`,
                    });
                });
            case 'delete-pet':
                var pet = exports.allPets.locate(message.name);
                if (pet) {
                    exports.allPets.remove(message.name);
                    saveState(stateApi);
                    stateApi?.postMessage({
                        command: 'info',
                        text: '👋 Removed pet ' + message.name,
                    });
                }
                else {
                    stateApi?.postMessage({
                        command: 'error',
                        text: `Could not find pet ${message.name}`,
                    });
                }
                break;
            case 'reset-pet':
                exports.allPets.reset();
                petCounter = 0;
                saveState(stateApi);
                break;
            case 'pause-pet':
                petCounter = 1;
                saveState(stateApi);
                break;
        }
    });
}
exports.petPanelApp = petPanelApp;
window.addEventListener('resize', function () {
    initCanvas();
});


/***/ }),

/***/ "./src/panel/pets.ts":
/*!***************************!*\
  !*** ./src/panel/pets.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.normalizeColor = exports.availableColors = exports.createPet = exports.InvalidPetException = exports.PetCollection = exports.PetElement = void 0;
const cat_1 = __webpack_require__(/*! ./pets/cat */ "./src/panel/pets/cat.ts");
const chicken_1 = __webpack_require__(/*! ./pets/chicken */ "./src/panel/pets/chicken.ts");
const clippy_1 = __webpack_require__(/*! ./pets/clippy */ "./src/panel/pets/clippy.ts");
const cockatiel_1 = __webpack_require__(/*! ./pets/cockatiel */ "./src/panel/pets/cockatiel.ts");
const crab_1 = __webpack_require__(/*! ./pets/crab */ "./src/panel/pets/crab.ts");
const dog_1 = __webpack_require__(/*! ./pets/dog */ "./src/panel/pets/dog.ts");
const fox_1 = __webpack_require__(/*! ./pets/fox */ "./src/panel/pets/fox.ts");
const mod_1 = __webpack_require__(/*! ./pets/mod */ "./src/panel/pets/mod.ts");
const rocky_1 = __webpack_require__(/*! ./pets/rocky */ "./src/panel/pets/rocky.ts");
const rubberduck_1 = __webpack_require__(/*! ./pets/rubberduck */ "./src/panel/pets/rubberduck.ts");
const snake_1 = __webpack_require__(/*! ./pets/snake */ "./src/panel/pets/snake.ts");
const totoro_1 = __webpack_require__(/*! ./pets/totoro */ "./src/panel/pets/totoro.ts");
const zappy_1 = __webpack_require__(/*! ./pets/zappy */ "./src/panel/pets/zappy.ts");
const rat_1 = __webpack_require__(/*! ./pets/rat */ "./src/panel/pets/rat.ts");
class PetElement {
    el;
    collision;
    speech;
    pet;
    color;
    type;
    remove() {
        this.el.remove();
        this.collision.remove();
        this.speech.remove();
        this.color = "null" /* PetColor.null */;
        this.type = "null" /* PetType.null */;
    }
    constructor(el, collision, speech, pet, color, type) {
        this.el = el;
        this.collision = collision;
        this.speech = speech;
        this.pet = pet;
        this.color = color;
        this.type = type;
    }
}
exports.PetElement = PetElement;
class PetCollection {
    _pets;
    constructor() {
        this._pets = new Array(0);
    }
    get pets() {
        return this._pets;
    }
    push(pet) {
        this._pets.push(pet);
    }
    reset() {
        this._pets.forEach((pet) => {
            pet.remove();
        });
        this._pets = [];
    }
    locate(name) {
        return this._pets.find((collection) => {
            return collection.pet.name === name;
        });
    }
    remove(name) {
        this._pets.forEach((pet) => {
            if (pet.pet.name === name) {
                pet.remove();
            }
        });
        this._pets = this._pets.filter((pet) => {
            return pet.pet.name !== name;
        });
    }
    seekNewFriends() {
        if (this._pets.length <= 1) {
            return [];
        } // You can't be friends with yourself.
        var messages = new Array(0);
        this._pets.forEach((petInCollection) => {
            if (petInCollection.pet.hasFriend) {
                return;
            } // I already have a friend!
            this._pets.forEach((potentialFriend) => {
                if (potentialFriend.pet.hasFriend) {
                    return;
                } // Already has a friend. sorry.
                if (!potentialFriend.pet.canChase) {
                    return;
                } // Pet is busy doing something else.
                if (potentialFriend.pet.left > petInCollection.pet.left &&
                    potentialFriend.pet.left <
                        petInCollection.pet.left + petInCollection.pet.width) {
                    // We found a possible new friend..
                    console.log(petInCollection.pet.name, ' wants to be friends with ', potentialFriend.pet.name, '.');
                    if (petInCollection.pet.makeFriendsWith(potentialFriend.pet)) {
                        potentialFriend.pet.showSpeechBubble('❤️', 2000);
                        petInCollection.pet.showSpeechBubble('❤️', 2000);
                    }
                }
            });
        });
        return messages;
    }
}
exports.PetCollection = PetCollection;
class InvalidPetException {
    message;
    constructor(message) {
        this.message = message;
    }
}
exports.InvalidPetException = InvalidPetException;
function createPet(petType, el, collision, speech, size, left, bottom, petRoot, floor, name) {
    if (name === undefined || name === null || name === '') {
        throw new InvalidPetException('name is undefined');
    }
    const standardPetArguments = [el, collision, speech, size, left, bottom, petRoot, floor, name];
    switch (petType) {
        case "cat" /* PetType.cat */:
            return new cat_1.Cat(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "chicken" /* PetType.chicken */:
            return new chicken_1.Chicken(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "dog" /* PetType.dog */:
            return new dog_1.Dog(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "fox" /* PetType.fox */:
            return new fox_1.Fox(...standardPetArguments, 4 /* PetSpeed.fast */);
        case "crab" /* PetType.crab */:
            return new crab_1.Crab(...standardPetArguments, 2 /* PetSpeed.slow */);
        case "clippy" /* PetType.clippy */:
            return new clippy_1.Clippy(...standardPetArguments, 2 /* PetSpeed.slow */);
        case "mod" /* PetType.mod */:
            return new mod_1.Mod(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "totoro" /* PetType.totoro */:
            return new totoro_1.Totoro(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "snake" /* PetType.snake */:
            return new snake_1.Snake(...standardPetArguments, 1 /* PetSpeed.verySlow */);
        case "rubber-duck" /* PetType.rubberduck */:
            return new rubberduck_1.RubberDuck(...standardPetArguments, 4 /* PetSpeed.fast */);
        case "zappy" /* PetType.zappy */:
            return new zappy_1.Zappy(...standardPetArguments, 5 /* PetSpeed.veryFast */);
        case "rocky" /* PetType.rocky */:
            return new rocky_1.Rocky(...standardPetArguments, 0 /* PetSpeed.still */);
        case "cockatiel" /* PetType.cockatiel */:
            return new cockatiel_1.Cockatiel(...standardPetArguments, 3 /* PetSpeed.normal */);
        case "rat" /* PetType.rat */:
            return new rat_1.Rat(...standardPetArguments, 3 /* PetSpeed.normal */);
        default:
            throw new InvalidPetException("Pet type doesn't exist");
    }
}
exports.createPet = createPet;
function availableColors(petType) {
    switch (petType) {
        case "cat" /* PetType.cat */:
            return cat_1.Cat.possibleColors;
        case "chicken" /* PetType.chicken */:
            return chicken_1.Chicken.possibleColors;
        case "dog" /* PetType.dog */:
            return dog_1.Dog.possibleColors;
        case "fox" /* PetType.fox */:
            return fox_1.Fox.possibleColors;
        case "crab" /* PetType.crab */:
            return crab_1.Crab.possibleColors;
        case "clippy" /* PetType.clippy */:
            return clippy_1.Clippy.possibleColors;
        case "mod" /* PetType.mod */:
            return mod_1.Mod.possibleColors;
        case "totoro" /* PetType.totoro */:
            return totoro_1.Totoro.possibleColors;
        case "snake" /* PetType.snake */:
            return snake_1.Snake.possibleColors;
        case "rubber-duck" /* PetType.rubberduck */:
            return rubberduck_1.RubberDuck.possibleColors;
        case "zappy" /* PetType.zappy */:
            return zappy_1.Zappy.possibleColors;
        case "rocky" /* PetType.rocky */:
            return rocky_1.Rocky.possibleColors;
        case "cockatiel" /* PetType.cockatiel */:
            return cockatiel_1.Cockatiel.possibleColors;
        case "rat" /* PetType.rat */:
            return rat_1.Rat.possibleColors;
        default:
            throw new InvalidPetException("Pet type doesn't exist");
    }
}
exports.availableColors = availableColors;
/**
 * Some pets can only have certain colors, this makes sure they haven't been misconfigured.
 * @param petColor
 * @param petType
 * @returns normalized color
 */
function normalizeColor(petColor, petType) {
    const colors = availableColors(petType);
    if (colors.includes(petColor)) {
        return petColor;
    }
    else {
        return colors[0];
    }
}
exports.normalizeColor = normalizeColor;


/***/ }),

/***/ "./src/panel/pets/cat.ts":
/*!*******************************!*\
  !*** ./src/panel/pets/cat.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CAT_NAMES = exports.Cat = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Cat extends basepettype_1.BasePetType {
    label = 'cat';
    static possibleColors = [
        "black" /* PetColor.black */,
        "brown" /* PetColor.brown */,
        "white" /* PetColor.white */,
        "gray" /* PetColor.gray */,
        "lightbrown" /* PetColor.lightbrown */,
    ];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "climb-wall-left" /* States.climbWallLeft */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "climb-wall-left" /* States.climbWallLeft */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "climb-wall-left" /* States.climbWallLeft */,
                possibleNextStates: ["wall-hang-left" /* States.wallHangLeft */],
            },
            {
                state: "wall-hang-left" /* States.wallHangLeft */,
                possibleNextStates: ["jump-down-left" /* States.jumpDownLeft */],
            },
            {
                state: "jump-down-left" /* States.jumpDownLeft */,
                possibleNextStates: ["land" /* States.land */],
            },
            {
                state: "land" /* States.land */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '🐱';
    }
    get hello() {
        return `brrr... Meow!`;
    }
}
exports.Cat = Cat;
exports.CAT_NAMES = [
    'Bella',
    'Charlie',
    'Molly',
    'Coco',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
    'Milo',
    'Daisy',
    'Archie',
    'Ollie',
    'Rosie',
    'Lola',
    'Frankie',
    'Roxy',
    'Poppy',
    'Luna',
    'Jack',
    'Millie',
    'Teddy',
    'Cooper',
    'Bear',
    'Rocky',
    'Alfie',
    'Hugo',
    'Bonnie',
    'Pepper',
    'Lily',
    'Tilly',
    'Leo',
    'Maggie',
    'George',
    'Mia',
    'Marley',
    'Harley',
    'Chloe',
    'Lulu',
    'Missy',
    'Jasper',
    'Billy',
    'Nala',
    'Monty',
    'Ziggy',
    'Winston',
    'Zeus',
    'Zoe',
    'Stella',
    'Sasha',
    'Rusty',
    'Gus',
    'Baxter',
    'Dexter',
    'Willow',
    'Barney',
    'Bruno',
    'Penny',
    'Honey',
    'Milly',
    'Murphy',
    'Simba',
    'Holly',
    'Benji',
    'Henry',
    'Lilly',
    'Pippa',
    'Shadow',
    'Sam',
    'Lucky',
    'Ellie',
    'Duke',
    'Jessie',
    'Cookie',
    'Harvey',
    'Bruce',
    'Jax',
    'Rex',
    'Louie',
    'Jet',
    'Banjo',
    'Beau',
    'Ella',
    'Ralph',
    'Loki',
    'Lexi',
    'Chester',
    'Sophie',
    'Chilli',
    'Billie',
    'Louis',
    'Scout',
    'Cleo',
    'Purfect',
    'Spot',
    'Bolt',
    'Julia',
    'Ginger',
    'Daisy',
    'Amelia',
    'Oliver',
    'Ghost',
    'Midnight',
    'Pumpkin',
    'Shadow',
    'Binx',
    'Riley',
    'Lenny',
    'Mango',
    'Alex',
    'Boo',
    'Botas',
    'Romeo',
    'Bob',
    'Clyde',
    'Simon',
    'Mimmo',
    'Carlotta',
    'Felix',
    'Duchess',
];


/***/ }),

/***/ "./src/panel/pets/chicken.ts":
/*!***********************************!*\
  !*** ./src/panel/pets/chicken.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHICKEN_NAMES = exports.Chicken = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Chicken extends basepettype_1.BasePetType {
    label = 'chicken';
    static possibleColors = ["white" /* PetColor.white */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                    "swipe" /* States.swipe */,
                ],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "swipe" /* States.swipe */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                    "swipe" /* States.swipe */,
                ],
            },
        ],
    };
    get emoji() {
        return '🐔';
    }
    get hello() {
        return ` Puk Puk Pukaaak - just let me lay my egg. 🥚`;
    }
}
exports.Chicken = Chicken;
exports.CHICKEN_NAMES = [
    'Hen Solo',
    'Cluck Vader',
    'Obi Wan Henobi',
    'Albert Eggstein',
    'Abrahen Lincoln',
    'Cluck Norris',
    'Sir Clucks-A-Lot',
    'Frank-hen-stein',
    'Richard',
    'Dixi',
    'Nugget',
    'Bella',
    'Cotton',
    'Pip',
    'Lucky',
    'Polly',
    'Mirabel',
    'Elsa',
    'Bon-Bon',
    'Ruby',
    'Rosie',
    'Teriyaki',
    'Penguin',
    'Sybil',
];


/***/ }),

/***/ "./src/panel/pets/clippy.ts":
/*!**********************************!*\
  !*** ./src/panel/pets/clippy.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CLIPPY_NAMES = exports.Clippy = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Clippy extends basepettype_1.BasePetType {
    label = 'clippy';
    static possibleColors = [
        "black" /* PetColor.black */,
        "brown" /* PetColor.brown */,
        "green" /* PetColor.green */,
        "yellow" /* PetColor.yellow */,
    ];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '📎';
    }
    get hello() {
        return ` Hi, I'm Clippy, would you like some assistance today? 👋!`;
    }
}
exports.Clippy = Clippy;
exports.CLIPPY_NAMES = [
    'Clippy',
    'Karl Klammer',
    'Clippy Jr.',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
];


/***/ }),

/***/ "./src/panel/pets/cockatiel.ts":
/*!*************************************!*\
  !*** ./src/panel/pets/cockatiel.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COCKATIEL_NAMES = exports.Cockatiel = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Cockatiel extends basepettype_1.BasePetType {
    label = 'cockatiel';
    static possibleColors = ["gray" /* PetColor.gray */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '🦜';
    }
    get hello() {
        // TODO: #191 Add a custom message for cockatiel
        return ` Hello, I'm a good bird 👋!`;
    }
}
exports.Cockatiel = Cockatiel;
exports.COCKATIEL_NAMES = [
    'Cocktail',
    'Pipsqueak',
    'Sir Chirps a Lot',
    'Nibbles',
    'Lord of the Wings',
    'Girl Nest Door',
    'Wingman',
    'Meryl Cheep',
    'Jack Sparrow',
    'Godfeather',
    'Mickey',
    'Baquack Obama',
    'Dame Judi Finch',
    'Kanye Nest',
    'Speck',
    'Cheecky',
    'Arthur',
    'Paco',
    'Bobo',
    'Walt',
    'Happy',
    'Junior',
    'Coco',
    'Yoyo',
    'Milo',
    'Skipper',
    'Scarlet',
    'Diva',
    'Ursula',
    'Donna',
    'Lola',
    'Kiko',
    'Luna',
];


/***/ }),

/***/ "./src/panel/pets/crab.ts":
/*!********************************!*\
  !*** ./src/panel/pets/crab.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CRAB_NAMES = exports.Crab = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Crab extends basepettype_1.BasePetType {
    label = 'crab';
    static possibleColors = ["red" /* PetColor.red */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '🦀';
    }
    get hello() {
        return ` Hi, I'm Crabsolutely Clawsome Crab 👋!`;
    }
}
exports.Crab = Crab;
exports.CRAB_NAMES = [
    'Ferris',
    'Pinchy',
    'Grabby',
    'Big Red',
    'Crabby',
    'Buddy',
    'Ruby Red',
    'Oscar',
    'Lucy',
    'Bailey',
    'Crabito',
    'Percy',
    'Rocky',
    'Mr. Krabs',
    'Shelly',
    'Santa Claws',
    'Clawdia',
    'Scuttle',
    'Snappy',
    'Hermit',
    'Horseshoe',
    'Snapper',
    'Coconut',
    'Sebastian',
    'Abby',
    'Bubbles',
    'Bait',
    'Big Mac',
    'Biggie',
    'Claws',
    'Copper',
    'Crabette',
    'Crabina',
    'Crabmister',
    'Crusty',
    'Crabcake',
    'Digger',
    'Nipper',
    'Pincer',
    'Poopsie',
    'Recluse',
    'Salty',
    'Squirt',
    'Groucho',
    'Grumpy',
    'Lenny Krabitz',
    'Leonardo DaPinchy',
    'Peeves',
    'Penny Pincher',
    'Prickl',
];


/***/ }),

/***/ "./src/panel/pets/dog.ts":
/*!*******************************!*\
  !*** ./src/panel/pets/dog.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOG_NAMES = exports.Dog = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Dog extends basepettype_1.BasePetType {
    label = 'dog';
    static possibleColors = [
        "black" /* PetColor.black */,
        "brown" /* PetColor.brown */,
        "white" /* PetColor.white */,
        "red" /* PetColor.red */,
    ];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                    "lie" /* States.lie */,
                ],
            },
            {
                state: "lie" /* States.lie */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "lie" /* States.lie */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "lie" /* States.lie */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '🐶';
    }
    get hello() {
        return ` Every dog has its day - and today is woof day! Today I just want to bark. Take me on a walk`;
    }
}
exports.Dog = Dog;
exports.DOG_NAMES = [
    'Bella',
    'Charlie',
    'Max',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
    'Milo',
    'Daisy',
    'Archie',
    'Ollie',
    'Rosie',
    'Lola',
    'Frankie',
    'Toby',
    'Roxy',
    'Poppy',
    'Luna',
    'Jack',
    'Millie',
    'Teddy',
    'Harry',
    'Cooper',
    'Bear',
    'Rocky',
    'Alfie',
    'Hugo',
    'Bonnie',
    'Pepper',
    'Lily',
    'Leo',
    'Maggie',
    'George',
    'Mia',
    'Marley',
    'Harley',
    'Chloe',
    'Lulu',
    'Jasper',
    'Billy',
    'Nala',
    'Monty',
    'Ziggy',
    'Winston',
    'Zeus',
    'Zoe',
    'Stella',
    'Sasha',
    'Rusty',
    'Gus',
    'Baxter',
    'Dexter',
    'Diesel',
    'Willow',
    'Barney',
    'Bruno',
    'Penny',
    'Honey',
    'Milly',
    'Murphy',
    'Holly',
    'Benji',
    'Henry',
    'Lilly',
    'Pippa',
    'Shadow',
    'Sam',
    'Buster',
    'Lucky',
    'Ellie',
    'Duke',
    'Jessie',
    'Cookie',
    'Harvey',
    'Bruce',
    'Jax',
    'Rex',
    'Louie',
    'Bentley',
    'Jet',
    'Banjo',
    'Beau',
    'Ella',
    'Ralph',
    'Loki',
    'Lexi',
    'Chester',
    'Sophie',
    'Billie',
    'Louis',
    'Charlie',
    'Cleo',
    'Spot',
    'Harry',
    'Bolt',
    'Ein',
    'Maddy',
    'Ghost',
    'Midnight',
    'Pumpkin',
    'Shadow',
    'Sparky',
    'Linus',
    'Cody',
    'Slinky',
    'Toto',
    'Balto',
    'Golfo',
    'Pongo',
    'Beethoven',
    'Hachiko',
    'Scooby',
    'Clifford',
    'Astro',
    'Goofy',
    'Chip',
    'Einstein',
    'Fang',
    'Truman',
    'Uggie',
    'Bingo',
    'Blue',
    'Cometa',
    'Krypto',
    'Huesos',
    'Odie',
    'Snoopy',
    'Aisha',
    'Moly',
    'Chiquita',
    'Chavela',
    'Tramp',
    'Lady',
    'Puddles',
];


/***/ }),

/***/ "./src/panel/pets/fox.ts":
/*!*******************************!*\
  !*** ./src/panel/pets/fox.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FOX_NAMES = exports.Fox = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Fox extends basepettype_1.BasePetType {
    label = 'fox';
    static possibleColors = ["red" /* PetColor.red */, "white" /* PetColor.white */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: [
                    "lie" /* States.lie */,
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-right" /* States.runRight */,
                    "run-left" /* States.runLeft */,
                ],
            },
            {
                state: "lie" /* States.lie */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-right" /* States.runRight */,
                    "run-left" /* States.runLeft */,
                ],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                ],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: [
                    "lie" /* States.lie */,
                    "sit-idle" /* States.sitIdle */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                ],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: [
                    "lie" /* States.lie */,
                    "sit-idle" /* States.sitIdle */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "lie" /* States.lie */,
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-right" /* States.runRight */,
                    "run-left" /* States.runLeft */,
                ],
            },
        ],
    };
    get emoji() {
        return '🦊';
    }
    get hello() {
        return `fox says hello`;
    }
}
exports.Fox = Fox;
exports.FOX_NAMES = [
    'Arizona',
    'Frankie',
    'Rosy',
    'Cinnamon',
    'Ginger',
    'Todd',
    'Rocky',
    'Felix',
    'Sandy',
    'Archie',
    'Flynn',
    'Foxy',
    'Elmo',
    'Ember',
    'Hunter',
    'Otto',
    'Sonic',
    'Amber',
    'Maroon',
    'Spark',
    'Sparky',
    'Sly',
    'Scout',
    'Penny',
    'Ash',
    'Rose',
    'Apollo',
    'Chili',
    'Blaze',
    'Radish',
    'Scarlett',
    'Juliet',
    'Goldie',
    'Rooney',
    'Paprika',
    'Alpine',
    'Rusty',
    'Maple',
    'Vixen',
    'David',
    'Apricot',
    'Claire',
    'Wilma',
    'Copper',
    'Pepper',
    'Crimson',
    'Ariel',
    'Arvi',
    'George',
    'Eva',
    'Fuzzy',
    'Russell',
    'Rufus',
    'Mystic',
    'Leopold',
    'Scully',
    'Ferris',
    'Robin',
    'Zorro',
    'Scarlet',
    'Comet',
    'Rowan',
    'Jake',
    'Hope',
    'Molly',
    'Mars',
    'Apple',
    'Geneva',
    'Redford',
    'Chestnut',
    'Evelyn',
    'Red',
    'Aurora',
    'Agniya',
    'Fitz',
    'Crispin',
    'Sunny',
    'Autumn',
    'Bridget',
    'Ruby',
    'Iris',
    'Pumpkin',
    'Rose',
    'Rosie',
    'Vesta',
    'Adolf',
    'Lava',
    'Conan',
    'Flame',
    'Oswald',
    'Tails',
    'Chester',
    'Jasper',
    'Finch',
    'Scarlet',
    'Chewy',
    'Finnick',
    'Biscuit',
    'Prince Harry',
    'Loki',
    'Pip',
    'Pippin',
];


/***/ }),

/***/ "./src/panel/pets/mod.ts":
/*!*******************************!*\
  !*** ./src/panel/pets/mod.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MOD_NAMES = exports.Mod = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Mod extends basepettype_1.BasePetType {
    label = 'mod';
    static possibleColors = ["purple" /* PetColor.purple */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '🤖';
    }
    get hello() {
        return ` Hi, I'm Mod the dotnet bot, what are you building today?`;
    }
}
exports.Mod = Mod;
exports.MOD_NAMES = [
    'Mod',
    'Moddy',
    'Dotnetbot',
    'Bot',
    'Purple Pal',
    'Ro Bot',
];


/***/ }),

/***/ "./src/panel/pets/rat.ts":
/*!*******************************!*\
  !*** ./src/panel/pets/rat.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RAT_NAMES = exports.Rat = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Rat extends basepettype_1.BasePetType {
    label = 'rat';
    static possibleColors = ["gray" /* PetColor.gray */, "white" /* PetColor.white */, "brown" /* PetColor.brown */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '🐀';
    }
    get hello() {
        return `Rat noises...`;
    }
}
exports.Rat = Rat;
exports.RAT_NAMES = [
    'Molly',
    'Coco',
    'Ruby',
    'Lucy',
    'Milo',
    'Daisy',
    'Archie',
    'Ollie',
    'Rosie',
    'Lola',
    'Frankie',
    'Roxy',
    'Poppy',
    'Luna',
    'Millie',
    'Rocky',
    'Alfie',
    'Hugo',
    'Pepper',
    'Lily',
    'Tilly',
    'Leo',
    'Maggie',
    'Mia',
    'Chloe',
    'Lulu',
    'Missy',
    'Jasper',
    'Billy',
    'Nala',
    'Ziggy',
    'Zoe',
    'Penny',
    'Milly',
    'Holly',
    'Henry',
    'Lilly',
    'Pippa',
    'Shadow',
    'Lucky',
    'Duke',
    'Jessie',
    'Cookie',
    'Bruce',
    'Jax',
    'Rex',
    'Louie',
    'Jet',
    'Banjo',
    'Beau',
    'Ella',
    'Ralph',
    'Loki',
    'Lexi',
    'Chilli',
    'Billie',
    'Louis',
    'Scout',
    'Cleo',
    'Spot',
    'Bolt',
    'Ginger',
    'Daisy',
    'Amelia',
    'Oliver',
    'Ghost',
    'Midnight',
    'Pumpkin',
    'Shadow',
    'Binx',
    'Riley',
    'Lenny',
    'Mango',
    'Boo',
    'Botas',
    'Romeo',
    'Simon',
    'Mimmo',
    'Carlotta',
    'Felix',
    'Duchess',
    'Walter',
    'Jesse',
    'Hank',
    'Gus',
    'Mike',
    'Saul',
    'Hector',
    'Tuco',
    'Jupiter',
    'Venus',
    'Apollo',
    'Alexandrite',
    'Amazonite',
    'Flint',
    'Jett',
    'Kyanite',
    'Mica',
    'Micah',
];


/***/ }),

/***/ "./src/panel/pets/rocky.ts":
/*!*********************************!*\
  !*** ./src/panel/pets/rocky.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ROCKY_NAMES = exports.Rocky = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Rocky extends basepettype_1.BasePetType {
    label = 'rocky';
    static possibleColors = ["gray" /* PetColor.gray */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */, "run-right" /* States.runRight */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */, "walk-right" /* States.walkRight */],
            },
        ],
    };
    get emoji() {
        return '💎';
    }
    get canChase() {
        return false;
    }
    get hello() {
        return ` 👋 I'm rock! I always Rock`;
    }
}
exports.Rocky = Rocky;
exports.ROCKY_NAMES = [
    'Rocky',
    'The Rock',
    'Quartzy',
    'Rocky I',
    'Rocky II',
    'Rocky III',
    'Pebbles Sr.',
    'Big Granite',
    'Boulder',
    'Rockefeller',
    'Pebble',
    'Rocksanne',
    'Rockstar',
    'Onix',
    'Rock and Roll',
    'Dolomite',
    'Granite',
    'Miss Marble',
    'Rock On',
    'Amberstone',
    'Rock With Me',
    'Rock On It',
    'Rock Out',
];


/***/ }),

/***/ "./src/panel/pets/rubberduck.ts":
/*!**************************************!*\
  !*** ./src/panel/pets/rubberduck.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DUCK_NAMES = exports.RubberDuck = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class RubberDuck extends basepettype_1.BasePetType {
    label = 'rubber-duck';
    static possibleColors = ["yellow" /* PetColor.yellow */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '🐥';
    }
    get hello() {
        return ` Hi, I love to quack around 👋!`;
    }
}
exports.RubberDuck = RubberDuck;
exports.DUCK_NAMES = [
    'Quacky',
    'Floaty',
    'Duck',
    'Molly',
    'Sunshine',
    'Buddy',
    'Chirpy',
    'Oscar',
    'Lucy',
    'Bailey',
    'Beaky',
    'Jemima',
    'Peaches',
    'Quackers',
    'Jelly Beans',
    'Donald',
    'Chady',
    'Waddles',
    'Bill',
    'Bubbles',
    'James Pond',
    'Moby Duck',
    'Quack Sparrow',
    'Peanut',
    'Psyduck',
    'Mr Quack',
    'Louie',
    'Golduck',
    'Daisy',
    'Pickles',
    'Ducky Duck',
    'Mrs Fluffs',
    'Squeek',
    'Ace',
    'Rubberduck',
    'Mrs Beak',
    'April',
    'Tutu',
    'Billy the duck',
    'Ducky',
    'Neco',
    'Dodo',
    'Colonel',
    'Franklin',
    'Emmett',
    'Bubba',
    'Dillard',
    'Duncan',
    'Pogo',
    'Uno',
    'Peanut',
    'Nero',
    'Mowgli',
    'Eggspresso',
    'Webster',
    'Quacker Jack',
    'Plucker',
    'Meeko',
];


/***/ }),

/***/ "./src/panel/pets/snake.ts":
/*!*********************************!*\
  !*** ./src/panel/pets/snake.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SNAKE_NAMES = exports.Snake = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Snake extends basepettype_1.BasePetType {
    label = 'snake';
    static possibleColors = ["green" /* PetColor.green */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "walk-right" /* States.walkRight */,
                    "run-right" /* States.runRight */,
                ],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '🐍';
    }
    get hello() {
        return `Sss... Oh. Oh my gosh! I'm a snake!`;
    }
}
exports.Snake = Snake;
exports.SNAKE_NAMES = [
    'Sneaky',
    'Mr Slippery',
    'Hissy Elliott',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Bailey',
    'Max',
    'Seb',
    'Kaa',
    'Mr Hiss',
    'Miss Hiss',
    'Snaku',
    'Kaa',
    'Madame Snake',
    'Sir Hiss',
    'Loki',
    'Steelix',
    'Gyarados',
    'Seviper',
    'Ekanes',
    'Arbok',
    'Snivy',
    'Servine',
    'Serperior',
    'Mojo',
    'Moss',
    'Nigel',
    'Tootsie',
    'Sammy',
    'Ziggy',
    'Asmodeus',
    'Attila',
    'Basil',
    'Diablo',
    'Eden',
    'Eve',
    'Heaven',
    'Hydra',
    'Indiana',
    'Jafaar',
    'Kaa',
    'Medusa',
    'Naga',
    'Severus',
    'Slytherin',
    'Snape',
    'Raven',
    'Slider',
    'Slinky',
    'Stripes',
];


/***/ }),

/***/ "./src/panel/pets/totoro.ts":
/*!**********************************!*\
  !*** ./src/panel/pets/totoro.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TOTORO_NAMES = exports.Totoro = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Totoro extends basepettype_1.BasePetType {
    label = 'totoro';
    static possibleColors = ["gray" /* PetColor.gray */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "lie" /* States.lie */],
            },
            {
                state: "lie" /* States.lie */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "walk-left" /* States.walkLeft */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "sit-idle" /* States.sitIdle */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "climb-wall-left" /* States.climbWallLeft */,
                    "sit-idle" /* States.sitIdle */,
                ],
            },
            {
                state: "climb-wall-left" /* States.climbWallLeft */,
                possibleNextStates: ["wall-hang-left" /* States.wallHangLeft */],
            },
            {
                state: "wall-hang-left" /* States.wallHangLeft */,
                possibleNextStates: ["jump-down-left" /* States.jumpDownLeft */],
            },
            {
                state: "jump-down-left" /* States.jumpDownLeft */,
                possibleNextStates: ["land" /* States.land */],
            },
            {
                state: "land" /* States.land */,
                possibleNextStates: [
                    "sit-idle" /* States.sitIdle */,
                    "walk-right" /* States.walkRight */,
                    "lie" /* States.lie */,
                ],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "walk-left" /* States.walkLeft */],
            },
        ],
    };
    get emoji() {
        return '🐾';
    }
    get hello() {
        return `Try Laughing. Then Whatever Scares You Will Go Away. 🎭`;
    }
}
exports.Totoro = Totoro;
exports.TOTORO_NAMES = [
    'Totoro',
    'トトロ',
    'Max',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
    'Big fella',
];


/***/ }),

/***/ "./src/panel/pets/zappy.ts":
/*!*********************************!*\
  !*** ./src/panel/pets/zappy.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZAPPY_NAMES = exports.Zappy = void 0;
const basepettype_1 = __webpack_require__(/*! ../basepettype */ "./src/panel/basepettype.ts");
class Zappy extends basepettype_1.BasePetType {
    label = 'zappy';
    static possibleColors = ["yellow" /* PetColor.yellow */];
    sequence = {
        startingState: "sit-idle" /* States.sitIdle */,
        sequenceStates: [
            {
                state: "sit-idle" /* States.sitIdle */,
                possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
            },
            {
                state: "walk-right" /* States.walkRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "run-right" /* States.runRight */,
                possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
            },
            {
                state: "walk-left" /* States.walkLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "run-left" /* States.runLeft */,
                possibleNextStates: ["sit-idle" /* States.sitIdle */],
            },
            {
                state: "chase" /* States.chase */,
                possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
            },
            {
                state: "idle-with-ball" /* States.idleWithBall */,
                possibleNextStates: [
                    "walk-right" /* States.walkRight */,
                    "walk-left" /* States.walkLeft */,
                    "run-left" /* States.runLeft */,
                    "run-right" /* States.runRight */,
                ],
            },
        ],
    };
    get emoji() {
        return '⚡';
    }
    get hello() {
        // TODO: #193 Add a custom message for zappy
        return ` Hello this is Zappy! Do I look familiar?? I am the mascot for Azure Functions😉`;
    }
}
exports.Zappy = Zappy;
exports.ZAPPY_NAMES = [
    'Zappy',
    'Zippy',
    'Zappy Jr.',
    'Zoppy',
    'Zuppy',
    'Zeppy',
    'Big Z',
    'Little z',
    'The Flash',
    'Thor',
    'Electric Bolt',
    'Azula',
    'Lightning Bolt',
    'Power',
    'Sonic',
    'Speedy',
    'Rush',
];


/***/ }),

/***/ "./src/panel/states.ts":
/*!*****************************!*\
  !*** ./src/panel/states.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JumpDownLeftState = exports.ClimbWallLeftState = exports.ChaseFriendState = exports.ChaseState = exports.RunLeftState = exports.RunRightState = exports.WalkLeftState = exports.WalkRightState = exports.IdleWithBallState = exports.SwipeState = exports.LandState = exports.WallHangLeftState = exports.LieState = exports.SitIdleState = exports.resolveState = exports.isStateAboveGround = exports.BallState = exports.FrameResult = exports.HorizontalDirection = exports.PetPanelState = exports.PetElementState = exports.PetInstanceState = void 0;
class PetInstanceState {
    currentStateEnum;
}
exports.PetInstanceState = PetInstanceState;
class PetElementState {
    petState;
    petType;
    petColor;
    elLeft;
    elBottom;
    petName;
    petFriend;
}
exports.PetElementState = PetElementState;
class PetPanelState {
    petStates;
    petCounter;
}
exports.PetPanelState = PetPanelState;
var HorizontalDirection;
(function (HorizontalDirection) {
    HorizontalDirection[HorizontalDirection["left"] = 0] = "left";
    HorizontalDirection[HorizontalDirection["right"] = 1] = "right";
    HorizontalDirection[HorizontalDirection["natural"] = 2] = "natural";
})(HorizontalDirection = exports.HorizontalDirection || (exports.HorizontalDirection = {}));
var FrameResult;
(function (FrameResult) {
    FrameResult[FrameResult["stateContinue"] = 0] = "stateContinue";
    FrameResult[FrameResult["stateComplete"] = 1] = "stateComplete";
    // Special states
    FrameResult[FrameResult["stateCancel"] = 2] = "stateCancel";
})(FrameResult = exports.FrameResult || (exports.FrameResult = {}));
class BallState {
    cx;
    cy;
    vx;
    vy;
    paused;
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
    return (state === "climb-wall-left" /* States.climbWallLeft */ ||
        state === "jump-down-left" /* States.jumpDownLeft */ ||
        state === "land" /* States.land */ ||
        state === "wall-hang-left" /* States.wallHangLeft */);
}
exports.isStateAboveGround = isStateAboveGround;
function resolveState(state, pet) {
    switch (state) {
        case "sit-idle" /* States.sitIdle */:
            return new SitIdleState(pet);
        case "walk-right" /* States.walkRight */:
            return new WalkRightState(pet);
        case "walk-left" /* States.walkLeft */:
            return new WalkLeftState(pet);
        case "run-right" /* States.runRight */:
            return new RunRightState(pet);
        case "run-left" /* States.runLeft */:
            return new RunLeftState(pet);
        case "lie" /* States.lie */:
            return new LieState(pet);
        case "wall-hang-left" /* States.wallHangLeft */:
            return new WallHangLeftState(pet);
        case "climb-wall-left" /* States.climbWallLeft */:
            return new ClimbWallLeftState(pet);
        case "jump-down-left" /* States.jumpDownLeft */:
            return new JumpDownLeftState(pet);
        case "land" /* States.land */:
            return new LandState(pet);
        case "swipe" /* States.swipe */:
            return new SwipeState(pet);
        case "idle-with-ball" /* States.idleWithBall */:
            return new IdleWithBallState(pet);
        case "chase-friend" /* States.chaseFriend */:
            return new ChaseFriendState(pet);
    }
    return new SitIdleState(pet);
}
exports.resolveState = resolveState;
class AbstractStaticState {
    label = "sit-idle" /* States.sitIdle */;
    idleCounter;
    spriteLabel = 'idle';
    holdTime = 50;
    pet;
    horizontalDirection = HorizontalDirection.left;
    constructor(pet) {
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
    label = "sit-idle" /* States.sitIdle */;
    spriteLabel = 'idle';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}
exports.SitIdleState = SitIdleState;
class LieState extends AbstractStaticState {
    label = "lie" /* States.lie */;
    spriteLabel = 'lie';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}
exports.LieState = LieState;
class WallHangLeftState extends AbstractStaticState {
    label = "wall-hang-left" /* States.wallHangLeft */;
    spriteLabel = 'wallgrab';
    horizontalDirection = HorizontalDirection.left;
    holdTime = 50;
}
exports.WallHangLeftState = WallHangLeftState;
class LandState extends AbstractStaticState {
    label = "land" /* States.land */;
    spriteLabel = 'land';
    horizontalDirection = HorizontalDirection.left;
    holdTime = 10;
}
exports.LandState = LandState;
class SwipeState extends AbstractStaticState {
    label = "swipe" /* States.swipe */;
    spriteLabel = 'swipe';
    horizontalDirection = HorizontalDirection.natural;
    holdTime = 15;
}
exports.SwipeState = SwipeState;
class IdleWithBallState extends AbstractStaticState {
    label = "idle-with-ball" /* States.idleWithBall */;
    spriteLabel = 'with_ball';
    horizontalDirection = HorizontalDirection.left;
    holdTime = 30;
}
exports.IdleWithBallState = IdleWithBallState;
class WalkRightState {
    label = "walk-right" /* States.walkRight */;
    pet;
    spriteLabel = 'walk';
    horizontalDirection = HorizontalDirection.right;
    leftBoundary;
    speedMultiplier = 1;
    idleCounter;
    holdTime = 60;
    constructor(pet) {
        this.leftBoundary = Math.floor(window.innerWidth * 0.95);
        this.pet = pet;
        this.idleCounter = 0;
    }
    nextFrame() {
        this.idleCounter++;
        this.pet.positionLeft(this.pet.left + this.pet.speed * this.speedMultiplier);
        if (this.pet.isMoving &&
            this.pet.left >= this.leftBoundary - this.pet.width) {
            return FrameResult.stateComplete;
        }
        else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.WalkRightState = WalkRightState;
class WalkLeftState {
    label = "walk-left" /* States.walkLeft */;
    spriteLabel = 'walk';
    horizontalDirection = HorizontalDirection.left;
    pet;
    speedMultiplier = 1;
    idleCounter;
    holdTime = 60;
    constructor(pet) {
        this.pet = pet;
        this.idleCounter = 0;
    }
    nextFrame() {
        this.pet.positionLeft(this.pet.left - this.pet.speed * this.speedMultiplier);
        if (this.pet.isMoving && this.pet.left <= 0) {
            return FrameResult.stateComplete;
        }
        else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.WalkLeftState = WalkLeftState;
class RunRightState extends WalkRightState {
    label = "run-right" /* States.runRight */;
    spriteLabel = 'walk_fast';
    speedMultiplier = 1.6;
    holdTime = 130;
}
exports.RunRightState = RunRightState;
class RunLeftState extends WalkLeftState {
    label = "run-left" /* States.runLeft */;
    spriteLabel = 'walk_fast';
    speedMultiplier = 1.6;
    holdTime = 130;
}
exports.RunLeftState = RunLeftState;
class ChaseState {
    label = "chase" /* States.chase */;
    spriteLabel = 'run';
    horizontalDirection = HorizontalDirection.left;
    ballState;
    canvas;
    pet;
    constructor(pet, ballState, canvas) {
        this.pet = pet;
        this.ballState = ballState;
        this.canvas = canvas;
    }
    nextFrame() {
        if (this.ballState.paused) {
            return FrameResult.stateCancel; // Ball is already caught
        }
        if (this.pet.left > this.ballState.cx) {
            this.horizontalDirection = HorizontalDirection.left;
            this.pet.positionLeft(this.pet.left - this.pet.speed);
        }
        else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left + this.pet.speed);
        }
        if (this.canvas.height - this.ballState.cy <
            this.pet.width + this.pet.floor &&
            this.ballState.cx < this.pet.left &&
            this.pet.left < this.ballState.cx + 15) {
            // hide ball
            this.canvas.style.display = 'none';
            this.ballState.paused = true;
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.ChaseState = ChaseState;
class ChaseFriendState {
    label = "chase-friend" /* States.chaseFriend */;
    spriteLabel = 'run';
    horizontalDirection = HorizontalDirection.left;
    pet;
    constructor(pet) {
        this.pet = pet;
    }
    nextFrame() {
        if (!this.pet.hasFriend || !this.pet.friend?.isPlaying) {
            return FrameResult.stateCancel; // Friend is no longer playing.
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (this.pet.left > this.pet.friend.left) {
            this.horizontalDirection = HorizontalDirection.left;
            this.pet.positionLeft(this.pet.left - this.pet.speed);
        }
        else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left + this.pet.speed);
        }
        return FrameResult.stateContinue;
    }
}
exports.ChaseFriendState = ChaseFriendState;
class ClimbWallLeftState {
    label = "climb-wall-left" /* States.climbWallLeft */;
    spriteLabel = 'wallclimb';
    horizontalDirection = HorizontalDirection.left;
    pet;
    constructor(pet) {
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionBottom(this.pet.bottom + 1);
        if (this.pet.bottom >= 100) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.ClimbWallLeftState = ClimbWallLeftState;
class JumpDownLeftState {
    label = "jump-down-left" /* States.jumpDownLeft */;
    spriteLabel = 'fall_from_grab';
    horizontalDirection = HorizontalDirection.right;
    pet;
    constructor(pet) {
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionBottom(this.pet.bottom - 5);
        if (this.pet.bottom <= this.pet.floor) {
            this.pet.positionBottom(this.pet.floor);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/panel/main.ts");
/******/ 	self.petApp = __webpack_exports__;
/******/ 	
/******/ })()
;