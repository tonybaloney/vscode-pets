"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePetType = exports.InvalidStateError = void 0;
const states_1 = require("./states");
class InvalidStateError extends Error {
    fromState;
    petType;
    constructor(fromState, petType) {
        super(`Invalid state ${fromState} for pet type ${petType}`);
        this.fromState = fromState;
        this.petType = petType;
    }
}
exports.InvalidStateError = InvalidStateError;
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
            throw new InvalidStateError(fromState, this.label);
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
//# sourceMappingURL=basepettype.js.map