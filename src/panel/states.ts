import { PetColor, PetType } from '../common/types';

export interface IPetType {
    nextFrame(): void;

    // Special methods for actions
    canSwipe: boolean;
    canChase: boolean;
    swipe(): void;
    speed: number;
    isMoving: boolean;
    hello: string;

    // State API
    getState(): PetInstanceState;
    recoverState(state: PetInstanceState): void;
    recoverFriend(friend: IPetType): void;

    // Positioning
    bottom: number;
    left: number;
    positionBottom(bottom: number): void;
    positionLeft(left: number): void;
    width: number;
    floor: number;

    // Friends API
    name: string;
    emoji: string;
    hasFriend: boolean;
    friend: IPetType | undefined;
    makeFriendsWith(friend: IPetType): boolean;
    isPlaying: boolean;

    experience: number;
    health: number;
    nextTarget: number;
    level: number;

    getHealth(): number;
    getExperience(): number;
    getNextTarget(): number;
    getLevel(): number;
    
    setHealth(value: number): void;
    setExperience(value: number, showMessage: boolean): void;
    setLevel(value: number): void;

    onCompilationError(): void;
    onCompilationSuccess(): void;


    showSpeechBubble(message: string, duration: number): void;
}

export class PetInstanceState {
    currentStateEnum: States | undefined;
}

export class PetElementState {
    petState: PetInstanceState | undefined;
    petType: PetType | undefined;
    petColor: PetColor | undefined;
    elLeft: string | undefined;
    elBottom: string | undefined;
    petName: string | undefined;
    petFriend: string | undefined;
    petExperience: number;
    petHealth: number;
    petNextTarget: number;
    petLevel: number;

    constructor() {
        this.petExperience = 0;
        this.petHealth = 100;
        this.petNextTarget = 100;
        this.petLevel = 1;
    }
}

export class PetPanelState {
    petStates: Array<PetElementState> | undefined;
    petCounter: number | undefined;
}

export enum HorizontalDirection {
    left,
    right,
    natural, // No change to current direction
}

export const enum States {
    sitIdleLL = 'sit-idle-low-health-low-level',
    sitIdleLM = 'sit-idle-low-health-mid-level',
    sitIdleLH = 'sit-idle-low-health-high-level',
    sitIdleL = 'sit-idle-low-level',
    sitIdleM = 'sit-idle-mid-level',
    sitIdleH = 'sit-idle-high-level',
    
    walkRightL = 'walk-right-low-level',
    walkRightM = 'walk-right-mid-level',
    walkRightH = 'walk-right-high-level',
    
    walkLeftL = 'walk-left-low-level',
    walkLeftM = 'walk-left-mid-level',
    walkLeftH = 'walk-left-high-level',
    
    runRightL = 'run-right-low-level',
    runRightM = 'run-right-mid-level',
    runRightH = 'run-right-high-level',
    
    runLeftL = 'run-left-low-level',
    runLeftM = 'run-left-mid-level',
    runLeftH = 'run-left-high-level',
    
    lieLL = 'lie-low-health-low-level',
    lieLM = 'lie-low-health-mid-level',
    lieLH = 'lie-low-health-high-level',
    lieL = 'lie-low-level',
    lieM = 'lie-mid-level',
    lieH = 'lie-high-level',
    
    swipeL = 'swipe-low-level',
    swipeM = 'swipe-mid-level',
    swipeH = 'swipe-high-level',
    
}

export enum FrameResult {
    stateContinue,
    stateComplete,
    // Special states
    stateCancel,
}

export class BallState {
    cx: number;
    cy: number;
    vx: number;
    vy: number;
    paused: boolean;

    constructor(cx: number, cy: number, vx: number, vy: number) {
        this.cx = cx;
        this.cy = cy;
        this.vx = vx;
        this.vy = vy;
        this.paused = false;
    }
}

// dummy
export function isStateAboveGround(state: States): boolean {
    return (
        state === null
    );
}

export function resolveState(state: string, pet: IPetType): IState {
    switch (state) {
        case States.sitIdleLL:
            return new SitIdleStateLL(pet);
        case States.sitIdleLM:
            return new SitIdleStateLM(pet);
        case States.sitIdleLH:
            return new SitIdleStateLH(pet);
        case States.sitIdleL:
            return new SitIdleStateL(pet);
        case States.sitIdleM:
            return new SitIdleStateM(pet);
        case States.sitIdleH:
            return new SitIdleStateH(pet);

        case States.walkRightL:
            return new WalkRightStateL(pet);
        case States.walkRightM:
            return new WalkRightStateM(pet);
        case States.walkRightH:
            return new WalkRightStateH(pet);

        case States.walkLeftL:
            return new WalkLeftStateL(pet);
        case States.walkLeftM:
            return new WalkLeftStateM(pet);
        case States.walkLeftH:
            return new WalkLeftStateH(pet);

        case States.runRightL:
            return new RunRightStateL(pet);
        case States.runRightM:
            return new RunRightStateM(pet);
        case States.runRightH:
            return new RunRightStateH(pet);

        case States.runLeftL:
            return new RunLeftStateL(pet);
        case States.runLeftM:
            return new RunLeftStateM(pet);
        case States.runLeftH:
            return new RunLeftStateH(pet);

        case States.lieLL:
            return new LieStateLL(pet);
        case States.lieLM:
            return new LieStateLM(pet);
        case States.lieLH:
            return new LieStateLH(pet);
        case States.lieL:
            return new LieStateL(pet);
        case States.lieM:
            return new LieStateM(pet);
        case States.lieH:
            return new LieStateH(pet);

        case States.swipeL:
            return new SwipeStateL(pet);
        case States.swipeM:
            return new SwipeStateM(pet);
        case States.swipeH:
            return new SwipeStateH(pet);

    }
    return new SitIdleStateL(pet);
}

export interface IState {
    label: string;
    spriteLabel: string;
    horizontalDirection: HorizontalDirection;
    pet: IPetType;
    nextFrame(): FrameResult;
}

class AbstractStaticState implements IState {
    label = States.sitIdleL;
    idleCounter: number;
    spriteLabel = 'idle';
    holdTime = 50;
    pet: IPetType;

    horizontalDirection = HorizontalDirection.left;

    constructor(pet: IPetType) {
        this.idleCounter = 0;
        this.pet = pet;
    }

    nextFrame(): FrameResult {
        this.idleCounter++;
        if (this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

// sit idle
export class SitIdleStateLL extends AbstractStaticState {
    label = States.sitIdleLL;
    spriteLabel = 'idle_low_health_low_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class SitIdleStateLM extends AbstractStaticState {
    label = States.sitIdleLM;
    spriteLabel = 'idle_low_health_mid_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class SitIdleStateLH extends AbstractStaticState {
    label = States.sitIdleLH;
    spriteLabel = 'idle_low_health_high_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class SitIdleStateL extends AbstractStaticState {
    label = States.sitIdleL;
    spriteLabel = 'idle_low_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class SitIdleStateM extends AbstractStaticState {
    label = States.sitIdleM;
    spriteLabel = 'idle_mid_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class SitIdleStateH extends AbstractStaticState {
    label = States.sitIdleH;
    spriteLabel = 'idle_high_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}


// lie
export class LieStateLL extends AbstractStaticState {
    label = States.lieLL;
    spriteLabel = 'lie_low_health_low_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class LieStateLM extends AbstractStaticState {
    label = States.lieLM;
    spriteLabel = 'lie_low_health_mid_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class LieStateLH extends AbstractStaticState {
    label = States.lieLH;
    spriteLabel = 'lie_low_health_high_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class LieStateL extends AbstractStaticState {
    label = States.lieL;
    spriteLabel = 'lie_low_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class LieStateM extends AbstractStaticState {
    label = States.lieM;
    spriteLabel = 'lie_mid_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class LieStateH extends AbstractStaticState {
    label = States.lieH;
    spriteLabel = 'lie_high_level';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class SwipeStateL extends AbstractStaticState {
    label = States.swipeL;
    spriteLabel = 'swipe_low_level';
    horizontalDirection = HorizontalDirection.natural;
    holdTime = 15;
}

// swipe
export class SwipeStateM extends AbstractStaticState {
    label = States.swipeM;
    spriteLabel = 'swipe_mid_level';
    horizontalDirection = HorizontalDirection.natural;
    holdTime = 15;
}

export class SwipeStateH extends AbstractStaticState {
    label = States.swipeH;
    spriteLabel = 'swipe_high_level';
    horizontalDirection = HorizontalDirection.natural;
    holdTime = 15;
}

// walk right
export class WalkRightStateL implements IState {
    label = States.walkRightL;
    pet: IPetType;
    spriteLabel = 'walk_low_level';
    horizontalDirection = HorizontalDirection.right;
    leftBoundary: number;
    speedMultiplier = 1;
    idleCounter: number;
    holdTime = 60;

    constructor(pet: IPetType) {
        this.leftBoundary = Math.floor(window.innerWidth * 0.95);
        this.pet = pet;
        this.idleCounter = 0;
    }

    nextFrame(): FrameResult {
        this.idleCounter++;
        this.pet.positionLeft(
            this.pet.left + this.pet.speed * this.speedMultiplier,
        );
        if (
            this.pet.isMoving &&
            this.pet.left >= this.leftBoundary - this.pet.width
        ) {
            return FrameResult.stateComplete;
        } else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class WalkRightStateM implements IState {
    label = States.walkRightM;
    pet: IPetType;
    spriteLabel = 'walk_mid_level';
    horizontalDirection = HorizontalDirection.right;
    leftBoundary: number;
    speedMultiplier = 1;
    idleCounter: number;
    holdTime = 60;

    constructor(pet: IPetType) {
        this.leftBoundary = Math.floor(window.innerWidth * 0.95);
        this.pet = pet;
        this.idleCounter = 0;
    }

    nextFrame(): FrameResult {
        this.idleCounter++;
        this.pet.positionLeft(
            this.pet.left + this.pet.speed * this.speedMultiplier,
        );
        if (
            this.pet.isMoving &&
            this.pet.left >= this.leftBoundary - this.pet.width
        ) {
            return FrameResult.stateComplete;
        } else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class WalkRightStateH implements IState {
    label = States.walkRightH;
    pet: IPetType;
    spriteLabel = 'walk_high_level';
    horizontalDirection = HorizontalDirection.right;
    leftBoundary: number;
    speedMultiplier = 1;
    idleCounter: number;
    holdTime = 60;

    constructor(pet: IPetType) {
        this.leftBoundary = Math.floor(window.innerWidth * 0.95);
        this.pet = pet;
        this.idleCounter = 0;
    }

    nextFrame(): FrameResult {
        this.idleCounter++;
        this.pet.positionLeft(
            this.pet.left + this.pet.speed * this.speedMultiplier,
        );
        if (
            this.pet.isMoving &&
            this.pet.left >= this.leftBoundary - this.pet.width
        ) {
            return FrameResult.stateComplete;
        } else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

// walk left
export class WalkLeftStateL implements IState {
    label = States.walkLeftL;
    spriteLabel = 'walk_low_level';
    horizontalDirection = HorizontalDirection.left;
    pet: IPetType;
    speedMultiplier = 1;
    idleCounter: number;
    holdTime = 60;

    constructor(pet: IPetType) {
        this.pet = pet;
        this.idleCounter = 0;
    }

    nextFrame(): FrameResult {
        this.pet.positionLeft(
            this.pet.left - this.pet.speed * this.speedMultiplier,
        );
        if (this.pet.isMoving && this.pet.left <= 0) {
            return FrameResult.stateComplete;
        } else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class WalkLeftStateM implements IState {
    label = States.walkLeftM;
    spriteLabel = 'walk_mid_level';
    horizontalDirection = HorizontalDirection.left;
    pet: IPetType;
    speedMultiplier = 1;
    idleCounter: number;
    holdTime = 60;

    constructor(pet: IPetType) {
        this.pet = pet;
        this.idleCounter = 0;
    }

    nextFrame(): FrameResult {
        this.pet.positionLeft(
            this.pet.left - this.pet.speed * this.speedMultiplier,
        );
        if (this.pet.isMoving && this.pet.left <= 0) {
            return FrameResult.stateComplete;
        } else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class WalkLeftStateH implements IState {
    label = States.walkLeftH;
    spriteLabel = 'walk_high_level';
    horizontalDirection = HorizontalDirection.left;
    pet: IPetType;
    speedMultiplier = 1;
    idleCounter: number;
    holdTime = 60;

    constructor(pet: IPetType) {
        this.pet = pet;
        this.idleCounter = 0;
    }

    nextFrame(): FrameResult {
        this.pet.positionLeft(
            this.pet.left - this.pet.speed * this.speedMultiplier,
        );
        if (this.pet.isMoving && this.pet.left <= 0) {
            return FrameResult.stateComplete;
        } else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

// run
export class RunRightStateL extends WalkRightStateL {
    label = States.runRightL;
    spriteLabel = 'run_low_level';
    speedMultiplier = 1.6;
    holdTime = 130;
}

export class RunRightStateM extends WalkRightStateM {
    label = States.runRightM;
    spriteLabel = 'run_mid_level';
    speedMultiplier = 1.6;
    holdTime = 130;
}

export class RunRightStateH extends WalkRightStateH {
    label = States.runRightH;
    spriteLabel = 'run_high_level';
    speedMultiplier = 1.6;
    holdTime = 130;
}

export class RunLeftStateL extends WalkLeftStateL {
    label = States.runLeftL;
    spriteLabel = 'run_low_level';
    speedMultiplier = 1.6;
    holdTime = 130;
}

export class RunLeftStateM extends WalkLeftStateM {
    label = States.runLeftM;
    spriteLabel = 'run_mid_level';
    speedMultiplier = 1.6;
    holdTime = 130;
}

export class RunLeftStateH extends WalkLeftStateH {
    label = States.runLeftH;
    spriteLabel = 'run_high_level';
    speedMultiplier = 1.6;
    holdTime = 130;
}