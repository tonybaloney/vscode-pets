import { PetColor, PetType } from '../common/types';

export interface IPetType {
    nextFrame(): void;

    // Special methods for actions
    canSwipe: boolean;
    canChase: boolean;
    swipe(): void;
    chase(ballState: BallState, canvas: HTMLCanvasElement): void;
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

    showSpeechBubble(message: string, duration: number): void;
}

export class PetInstanceState {
    currentStateEnum: States | undefined;
}

export class PetElementState {
    petState: PetInstanceState | undefined;
    petType: PetType | undefined | any;
    petColor: PetColor | undefined | any;
    elLeft: string | undefined;
    elBottom: string | undefined;
    petName: string | undefined;
    petFriend: string | undefined;
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
    sitIdle = 'sit-idle',
    walkRight = 'walk-right',
    walkLeft = 'walk-left',
    runRight = 'run-right',
    runLeft = 'run-left',
    lie = 'lie',
    wallHangLeft = 'wall-hang-left',
    climbWallLeft = 'climb-wall-left',
    jumpDownLeft = 'jump-down-left',
    land = 'land',
    swipe = 'swipe',
    idleWithBall = 'idle-with-ball',
    chase = 'chase',
    chaseFriend = 'chase-friend',
    standRight = 'stand-right',
    standLeft = 'stand-left',
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

export function isStateAboveGround(state: States): boolean {
    return (
        state === States.climbWallLeft ||
        state === States.jumpDownLeft ||
        state === States.land ||
        state === States.wallHangLeft
    );
}

export function resolveState(state: string, pet: IPetType): IState {
    switch (state) {
        case States.sitIdle:
            return new SitIdleState(pet);
        case States.walkRight:
            return new WalkRightState(pet);
        case States.walkLeft:
            return new WalkLeftState(pet);
        case States.runRight:
            return new RunRightState(pet);
        case States.runLeft:
            return new RunLeftState(pet);
        case States.lie:
            return new LieState(pet);
        case States.wallHangLeft:
            return new WallHangLeftState(pet);
        case States.climbWallLeft:
            return new ClimbWallLeftState(pet);
        case States.jumpDownLeft:
            return new JumpDownLeftState(pet);
        case States.land:
            return new LandState(pet);
        case States.swipe:
            return new SwipeState(pet);
        case States.idleWithBall:
            return new IdleWithBallState(pet);
        case States.chaseFriend:
            return new ChaseFriendState(pet);
        case States.standRight:
            return new StandRightState(pet);
        case States.standLeft:
            return new StandLeftState(pet);
    }
    return new SitIdleState(pet);
}

export interface IState {
    label: string;
    spriteLabel: string;
    horizontalDirection: HorizontalDirection;
    pet: IPetType;
    nextFrame(): FrameResult;
}

class AbstractStaticState implements IState {
    label = States.sitIdle;
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

export class SitIdleState extends AbstractStaticState {
    label = States.sitIdle;
    spriteLabel = 'idle';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class LieState extends AbstractStaticState {
    label = States.lie;
    spriteLabel = 'lie';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class WallHangLeftState extends AbstractStaticState {
    label = States.wallHangLeft;
    spriteLabel = 'wallgrab';
    horizontalDirection = HorizontalDirection.left;
    holdTime = 50;
}

export class LandState extends AbstractStaticState {
    label = States.land;
    spriteLabel = 'land';
    horizontalDirection = HorizontalDirection.left;
    holdTime = 10;
}

export class SwipeState extends AbstractStaticState {
    label = States.swipe;
    spriteLabel = 'swipe';
    horizontalDirection = HorizontalDirection.natural;
    holdTime = 15;
}

export class IdleWithBallState extends AbstractStaticState {
    label = States.idleWithBall;
    spriteLabel = 'with_ball';
    horizontalDirection = HorizontalDirection.left;
    holdTime = 30;
}

export class WalkRightState implements IState {
    label = States.walkRight;
    pet: IPetType;
    spriteLabel = 'walk';
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

export class WalkLeftState implements IState {
    label = States.walkLeft;
    spriteLabel = 'walk';
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

export class RunRightState extends WalkRightState {
    label = States.runRight;
    spriteLabel = 'walk_fast';
    speedMultiplier = 1.6;
    holdTime = 130;
}

export class RunLeftState extends WalkLeftState {
    label = States.runLeft;
    spriteLabel = 'walk_fast';
    speedMultiplier = 1.6;
    holdTime = 130;
}

export class ChaseState implements IState {
    label = States.chase;
    spriteLabel = 'run';
    horizontalDirection = HorizontalDirection.left;
    ballState: BallState;
    canvas: HTMLCanvasElement;
    pet: IPetType;

    constructor(
        pet: IPetType,
        ballState: BallState,
        canvas: HTMLCanvasElement,
    ) {
        this.pet = pet;
        this.ballState = ballState;
        this.canvas = canvas;
    }

    nextFrame(): FrameResult {
        if (this.ballState.paused) {
            return FrameResult.stateCancel; // Ball is already caught
        }
        if (this.pet.left > this.ballState.cx) {
            this.horizontalDirection = HorizontalDirection.left;
            this.pet.positionLeft(this.pet.left - this.pet.speed);
        } else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left + this.pet.speed);
        }

        if (
            this.canvas.height - this.ballState.cy <
                this.pet.width + this.pet.floor &&
            this.ballState.cx < this.pet.left &&
            this.pet.left < this.ballState.cx + 15
        ) {
            // hide ball
            this.canvas.style.display = 'none';
            this.ballState.paused = true;
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class ChaseFriendState implements IState {
    label = States.chaseFriend;
    spriteLabel = 'run';
    horizontalDirection = HorizontalDirection.left;
    pet: IPetType;

    constructor(pet: IPetType) {
        this.pet = pet;
    }

    nextFrame(): FrameResult {
        if (!this.pet.hasFriend || !this.pet.friend?.isPlaying) {
            return FrameResult.stateCancel; // Friend is no longer playing.
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (this.pet.left > this.pet.friend!.left) {
            this.horizontalDirection = HorizontalDirection.left;
            this.pet.positionLeft(this.pet.left - this.pet.speed);
        } else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left + this.pet.speed);
        }

        return FrameResult.stateContinue;
    }
}

export class ClimbWallLeftState implements IState {
    label = States.climbWallLeft;
    spriteLabel = 'wallclimb';
    horizontalDirection = HorizontalDirection.left;
    pet: IPetType;

    constructor(pet: IPetType) {
        this.pet = pet;
    }

    nextFrame(): FrameResult {
        this.pet.positionBottom(this.pet.bottom + 1);
        if (this.pet.bottom >= 100) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class JumpDownLeftState implements IState {
    label = States.jumpDownLeft;
    spriteLabel = 'fall_from_grab';
    horizontalDirection = HorizontalDirection.right;
    pet: IPetType;

    constructor(pet: IPetType) {
        this.pet = pet;
    }

    nextFrame(): FrameResult {
        this.pet.positionBottom(this.pet.bottom - 5);
        if (this.pet.bottom <= this.pet.floor) {
            this.pet.positionBottom(this.pet.floor);
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class StandRightState extends AbstractStaticState {
    label = States.standRight;
    spriteLabel = 'stand';
    horizontalDirection = HorizontalDirection.right;
    holdTime = 60;
}

export class StandLeftState extends AbstractStaticState {
    label = States.standRight;
    spriteLabel = 'stand';
    horizontalDirection = HorizontalDirection.left;
    holdTime = 60;
}
