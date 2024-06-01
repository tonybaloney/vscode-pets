import { PetColor, PetSize, PetSpeed } from '../common/types';
import { IPetType } from './states';
import { ISequenceTree } from './sequences';
import {
    States,
    IState,
    resolveState,
    PetInstanceState,
    isStateAboveGround,
    HorizontalDirection,
    FrameResult,
} from './states';

import { getRandomCommentWhenLevelUp, getRandomCommentWhenLowHealth, 
    getRandomCommentWhenCompilationError, getRandomCommentWhenCompilationSuccess } from '../common/comments';

export class InvalidStateError extends Error {
    fromState: States;
    petType: string;

    constructor(fromState: States, petType: string) {
        super(`Invalid state ${fromState} for pet type ${petType}`);
        this.fromState = fromState;
        this.petType = petType;
    }
}

const LOW_LEVEL_CUT_OFF = 3;
const MID_LEVEL_CUT_OFF = 7;
const LOW_HEALTH_CUT_OFF = 10;

export abstract class BasePetType implements IPetType {
    label: string = 'base';
    static count: number = 0;
    sequence: ISequenceTree = {
        startingState: States.sitIdleL,
        sequenceStates: [],
    };
    static possibleColors: PetColor[];
    currentState: IState;
    currentStateEnum: States;
    holdState: IState | undefined;
    holdStateEnum: States | undefined;
    private el: HTMLImageElement;
    private collision: HTMLDivElement;
    private speech: HTMLDivElement;
    private _left: number;
    private _bottom: number;
    petRoot: string;
    _floor: number;
    _friend: IPetType | undefined;
    private _name: string;
    private _speed: number;
    private _size: PetSize;
    experience: number;
    level: number;
    nextTarget: number;
    health: number;

    constructor(
        spriteElement: HTMLImageElement,
        collisionElement: HTMLDivElement,
        speechElement: HTMLDivElement,
        size: PetSize,
        left: number,
        bottom: number,
        petRoot: string,
        floor: number,
        name: string,
        speed: number,
    ) {
        this.el = spriteElement;
        this.collision = collisionElement;
        this.speech = speechElement;
        this.petRoot = petRoot;
        this._floor = floor;
        this._left = left;
        this._bottom = bottom;
        this.initSprite(size, left, bottom);
        this.currentStateEnum = this.sequence.startingState;
        this.currentState = resolveState(this.currentStateEnum, this);

        this._name = name;
        this._size = size;
        this._speed = this.randomizeSpeed(speed);

        this.experience = 0;
        this.nextTarget = 100;
        this.level = 1;
        this.health = 100;

        // Increment the static count of the Pet class that the constructor belongs to
        (this.constructor as any).count += 1;
    }

    initSprite(petSize: PetSize, left: number, bottom: number) {
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
        this.speech.style.bottom = `${
            bottom + this.calculateSpriteWidth(petSize)
        }px`;
        this.hideSpeechBubble();
    }

    get left(): number {
        return this._left;
    }

    get bottom(): number {
        return this._bottom;
    }

    private repositionAccompanyingElements() {
        this.collision.style.left = `${this._left}px`;
        this.collision.style.bottom = `${this._bottom}px`;
        this.speech.style.left = `${this._left}px`;
        this.speech.style.bottom = `${
            this._bottom + this.calculateSpriteWidth(this._size)
        }px`;
    }

    calculateSpriteWidth(size: PetSize): number {
        if (size === PetSize.nano) {
            return 30;
        } else if (size === PetSize.small) {
            return 40;
        } else if (size === PetSize.medium) {
            return 55;
        } else if (size === PetSize.large) {
            return 110;
        } else {
            return 30; // Shrug
        }
    }

    positionBottom(bottom: number): void {
        this._bottom = bottom;
        this.el.style.bottom = `${this._bottom}px`;
        this.repositionAccompanyingElements();
    }

    positionLeft(left: number): void {
        this._left = left;
        this.el.style.left = `${this._left}px`;
        this.repositionAccompanyingElements();
    }

    get width(): number {
        return this.el.width;
    }

    get floor(): number {
        return this._floor;
    }

    get hello(): string {
        // return the sound of the name of the animal
        return ` says hello 👋!`;
    }

    getState(): PetInstanceState {
        return { currentStateEnum: this.currentStateEnum };
    }

    get speed(): number {
        return this._speed;
    }

    randomizeSpeed(speed: number): number {
        const min = speed * 0.7;
        const max = speed * 1.3;
        const newSpeed = Math.random() * (max - min) + min;
        return newSpeed;
    }

    get isMoving(): boolean {
        return this._speed !== PetSpeed.still;
    }

    recoverFriend(friend: IPetType) {
        // Recover friends..
        this._friend = friend;
    }

    recoverState(state: PetInstanceState) {
        // TODO : Resolve a bug where if it was swiping before, it would fail
        // because holdState is no longer valid.
        this.currentStateEnum = state.currentStateEnum ?? States.sitIdleL;
        this.currentState = resolveState(this.currentStateEnum, this);

        if (!isStateAboveGround(this.currentStateEnum)) {
            // Reset the bottom of the sprite to the floor as the theme
            // has likely changed.
            this.positionBottom(this.floor);
        }
    }

    get canSwipe() {
        return !isStateAboveGround(this.currentStateEnum);
    }

    get canChase() {
        return !isStateAboveGround(this.currentStateEnum) && this.isMoving;
    }

    showSpeechBubble(message: string, duration: number = 3000) {
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
        if (this.health <= LOW_HEALTH_CUT_OFF) {
            return;
        }
        if (this.level <= LOW_HEALTH_CUT_OFF) {
            if (this.currentStateEnum === States.swipeL) {
                return;
            }
            this.holdState = this.currentState;
            this.holdStateEnum = this.currentStateEnum;
            this.currentStateEnum = States.swipeL;
            this.currentState = resolveState(this.currentStateEnum, this);
            this.showSpeechBubble('👋');
        } else if (this.level <= MID_LEVEL_CUT_OFF) {
            if (this.currentStateEnum === States.swipeM) {
                return;
            }
            this.holdState = this.currentState;
            this.holdStateEnum = this.currentStateEnum;
            this.currentStateEnum = States.swipeM;
            this.currentState = resolveState(this.currentStateEnum, this);
            this.showSpeechBubble('👋');
        } else {
            if (this.currentStateEnum === States.swipeH) {
                return;
            }
            this.holdState = this.currentState;
            this.holdStateEnum = this.currentStateEnum;
            this.currentStateEnum = States.swipeH;
            this.currentState = resolveState(this.currentStateEnum, this);
            this.showSpeechBubble('👋');
        }
    }

    faceLeft() {
        this.el.style.transform = 'scaleX(-1)';
    }

    faceRight() {
        this.el.style.transform = 'scaleX(1)';
    }

    setAnimation(face: string) {
        if (this.el.src.endsWith(`_${face}_8fps.gif`)) {
            return;
        }
        this.el.src = `${this.petRoot}_${face}_8fps.gif`;
    }

    chooseNextState(fromState: States): States {
        // Work out next state
        var possibleNextStates: States[] | undefined = undefined;
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
        if (
            this.currentState.horizontalDirection === HorizontalDirection.left
        ) {
            this.faceLeft();
        } else if (
            this.currentState.horizontalDirection === HorizontalDirection.right
        ) {
            this.faceRight();
        }
        this.setAnimation(this.currentState.spriteLabel);

        var frameResult = this.currentState.nextFrame();
        if (frameResult === FrameResult.stateComplete) {
            // If recovering from swipe..
            if (this.holdState && this.holdStateEnum) {
                this.currentState = this.holdState;
                this.currentStateEnum = this.holdStateEnum;
                this.holdState = undefined;
                this.holdStateEnum = undefined;
                return;
            }

            var nextState = this.chooseNextState(this.currentStateEnum);
            this.currentState = resolveState(nextState, this);
            this.currentStateEnum = nextState;
        }
    }

    get hasFriend(): boolean {
        return this._friend !== undefined;
    }

    get friend(): IPetType | undefined {
        return this._friend;
    }

    get name(): string {
        return this._name;
    }

    makeFriendsWith(friend: IPetType): boolean {
        this._friend = friend;
        console.log(this.name, ": I'm now friends ❤️ with ", friend.name);
        return true;
    }

    get isPlaying(): boolean {
        return (
            this.isMoving &&
            (this.currentStateEnum === States.runRightL ||
                this.currentStateEnum === States.runLeftL || this.currentStateEnum === States.runRightM ||
                this.currentStateEnum === States.runLeftM || this.currentStateEnum === States.runRightH ||
                this.currentStateEnum === States.runLeftH));
    }

    get emoji(): string {
        return '🐶';
    }

    getHealth() {
        return this.health;
    }

    getExperience() {
        return this.experience;
    }

    getLevel() {
        return this.level;
    }

    getNextTarget() {
        return this.nextTarget;
    }

    setHealth(value: number) {
        const prev = this.health;
        this.health = value;
        if (this.health < 0) {
            this.health = 0;
        } else if (this.health > 100) {
            this.health = 100;
        }
        if (prev > LOW_HEALTH_CUT_OFF && this.health <= LOW_HEALTH_CUT_OFF) {
            if (this.level <= LOW_LEVEL_CUT_OFF) {
                this.currentStateEnum = States.sitIdleLL;
                this.currentState = resolveState(this.currentStateEnum, this);
            } else if (this.level <= MID_LEVEL_CUT_OFF) {
                this.currentStateEnum = States.sitIdleLM;
                this.currentState = resolveState(this.currentStateEnum, this);
            } else {
                this.currentStateEnum = States.sitIdleLH;
                this.currentState = resolveState(this.currentStateEnum, this);
            }
        } else if (prev <= LOW_HEALTH_CUT_OFF && this.health > LOW_HEALTH_CUT_OFF) {
            if (this.level <= LOW_LEVEL_CUT_OFF) {
                this.currentStateEnum = States.sitIdleL;
                this.currentState = resolveState(this.currentStateEnum, this);
            } else if (this.level <= MID_LEVEL_CUT_OFF) {
                this.currentStateEnum = States.sitIdleM;
                this.currentState = resolveState(this.currentStateEnum, this);
            } else {
                this.currentStateEnum = States.sitIdleH;
                this.currentState = resolveState(this.currentStateEnum, this);
            }
        }
    }

    setExperience(value: number, showMessage: boolean) {
        const prev = this.experience;
        this.experience = value;
        if (this.experience >= this.nextTarget) {
            if (this.health >= LOW_HEALTH_CUT_OFF) {
                this.setLevel(this.level + 1);
                if (showMessage) {
                    getRandomCommentWhenLevelUp(this.level).then(msg => {
                        this.showSpeechBubble(msg, 2000);
                    }).catch(err => {
                        console.log("Failed to show sppech bubble. ", err);
                    });
                }
            } else {
                this.experience = this.nextTarget;
                if (prev < this.nextTarget) {
                    if (showMessage) {
                        getRandomCommentWhenLowHealth().then(msg => {
                            this.showSpeechBubble(msg, 2000);
                        }).catch(err => {
                            console.log("Failed to show sppech bubble. ", err);
                        });
                    }
                }
            }
        }
    }

    setLevel(value: number) {
        this.level = value;
        this.nextTarget += 100 * this.level;
        if (this.level > LOW_LEVEL_CUT_OFF) {
            this.currentStateEnum = States.sitIdleM;
            this.currentState = resolveState(this.currentStateEnum, this);
        } else if (this.level > MID_LEVEL_CUT_OFF) {
            this.currentStateEnum = States.sitIdleH;
            this.currentState = resolveState(this.currentStateEnum, this);
        }
    }

    onCompilationError() {
        getRandomCommentWhenCompilationError().then(msg => {
            this.showSpeechBubble(msg, 5000);
        }).catch(err => {
            console.log("Failed to show sppech bubble. ", err);
        });
    }

    onCompilationSuccess() {
        getRandomCommentWhenCompilationSuccess().then(msg => {
            this.showSpeechBubble(msg, 5000);
        }).catch(err => {
            console.log("Failed to show sppech bubble. ", err);
        });
    }
}
