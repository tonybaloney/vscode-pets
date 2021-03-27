export enum HorizontalDirection {
    left,
    right,
    natural // No change to current direction
}

export const enum States {
    sitIdle = "sit-idle",
    walkRight = "walk-right",
    walkLeft = "walk-left",
    runRight = "run-right",
    runLeft = "run-left",
    lie = "lie",
    wallHangLeft = "wall-hang-left",
    climbWallLeft = "climb-wall-left",
    jumpDownLeft = "jump-down-left",
    land = "land",
    swipe = "swipe",
    idleWithBall = "idle-with-ball",
    chase = "chase"
}

export enum FrameResult { 
    stateContinue,
    stateComplete,
    // Special states
    stateCancel
}

export class BallState {
    cx: number;
    cy: number;
    vx: number;
    vy: number;
    paused: boolean;

    constructor(cx: number, cy: number, vx: number, vy: number){
        this.cx = cx;
        this.cy = cy;
        this.vx = vx;
        this.vy = vy;
        this.paused = false;
    }
}

export function resolveState(state: string, el: HTMLImageElement): IState {
    switch(state){
        case States.sitIdle: return new SitIdleState(el);
        case States.walkRight: return new WalkRightState(el);
        case States.walkLeft: return new WalkLeftState(el);
        case States.runRight: return new RunRightState(el);
        case States.runLeft: return new RunLeftState(el);
        case States.lie: return new LieState(el);
        case States.wallHangLeft: return new WallHangLeftState(el);
        case States.climbWallLeft: return new ClimbWallLeftState(el);
        case States.jumpDownLeft: return new JumpDownLeftState(el);
        case States.land: return new LandState(el);
        case States.swipe: return new SwipeState(el);
        case States.idleWithBall: return new IdleWithBallState(el);
    }
    return new SitIdleState(el);
}

export interface IState {
    label: string
    spriteLabel: string
    horizontalDirection: HorizontalDirection
    nextFrame(): FrameResult
}

class AbstractStaticState implements IState {
    label = States.sitIdle;
    idleCounter: number;
    spriteLabel = "idle";
    holdTime = 50;
    horizontalDirection = HorizontalDirection.left;

    constructor(petElement: HTMLImageElement) {
        this.idleCounter = 0;
    }

    nextFrame() : FrameResult {
        this.idleCounter++;
        if (this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class SitIdleState extends AbstractStaticState {
    label = States.sitIdle;
    spriteLabel = "idle";
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class LieState extends AbstractStaticState {
    label = States.lie;
    spriteLabel = "lie";
    horizontalDirection = HorizontalDirection.right;
    holdTime = 50;
}

export class WallHangLeftState extends AbstractStaticState {
    label = States.wallHangLeft;
    spriteLabel = "wallgrab";
    horizontalDirection = HorizontalDirection.left;
    holdTime = 50;
}

export class LandState extends AbstractStaticState {
    label = States.land;
    spriteLabel = "land";
    horizontalDirection = HorizontalDirection.left;
    holdTime = 10;
}

export class SwipeState extends AbstractStaticState {
    label = States.swipe;
    spriteLabel = "swipe";
    horizontalDirection = HorizontalDirection.natural;
    holdTime = 10;
}

export class IdleWithBallState extends AbstractStaticState {
    label = States.idleWithBall;
    spriteLabel = "with_ball";
    horizontalDirection = HorizontalDirection.left;
    holdTime = 30;
}

export class WalkRightState implements IState {
    label = States.walkRight;
    petLeft: number;
    el: HTMLImageElement;
    skipSpeed = 3;
    spriteLabel = "walk";
    horizontalDirection = HorizontalDirection.right;
    leftBoundary: number;

    constructor(petElement: HTMLImageElement) {
        this.petLeft = parseInt(petElement.style.left);
        this.el = petElement;
        this.leftBoundary = window.innerWidth;
    }

    nextFrame() : FrameResult {
        this.petLeft += this.skipSpeed;
        this.el.style.left = `${this.petLeft}px`;
        if (this.petLeft >= this.leftBoundary - this.el.width) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class WalkLeftState implements IState {
    label = States.walkLeft;
    petLeft: number;
    el: HTMLImageElement;
    skipSpeed = 3;
    spriteLabel = "walk";
    horizontalDirection = HorizontalDirection.left;

    constructor(petElement: HTMLImageElement) {
        this.petLeft = parseInt(petElement.style.left);
        this.el = petElement;
    }

    nextFrame() : FrameResult {
        this.petLeft -= this.skipSpeed;
        this.el.style.left = `${this.petLeft}px`;
        if (this.petLeft <= 0) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class RunRightState extends WalkRightState {
    label = States.runRight;
    spriteLabel = "walk_fast";
    skipSpeed = 5;
}

export class RunLeftState extends WalkLeftState {
    label = States.runLeft;
    spriteLabel = "walk_fast";
    skipSpeed = 5;
}

export class ChaseState implements IState {
    label = States.chase;
    petLeft: number;
    el: HTMLImageElement;
    skipSpeed = 3;
    spriteLabel = "run";
    horizontalDirection = HorizontalDirection.left;
    ballState: BallState;
    canvas: HTMLCanvasElement;

    constructor(petElement: HTMLImageElement, ballState: BallState, canvas: HTMLCanvasElement) {
        this.petLeft = parseInt(petElement.style.left);
        this.el = petElement;
        this.ballState = ballState;
        this.canvas = canvas;
    }

    nextFrame() : FrameResult {
        if (this.ballState.paused) {
            return FrameResult.stateCancel; // Ball is already caught
        }
        if (this.petLeft > this.ballState.cx) {
            this.horizontalDirection = HorizontalDirection.left;
            this.petLeft -= 3;
        } else {
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

export class ClimbWallLeftState implements IState {
    label = States.climbWallLeft;
    petBottom: number;
    el: HTMLImageElement;
    skipSpeed = 3;
    spriteLabel = "wallclimb";
    horizontalDirection = HorizontalDirection.left;

    constructor(petElement: HTMLImageElement) {
        this.petBottom = parseInt(petElement.style.bottom);
        this.el = petElement;
    }

    nextFrame() : FrameResult {
        this.petBottom += 1;
        this.el.style.bottom = `${this.petBottom}px`;
        if (this.petBottom >= 100) {
          return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}

export class JumpDownLeftState implements IState {
    label = States.jumpDownLeft;
    petBottom: number;
    el: HTMLImageElement;
    skipSpeed = 3;
    spriteLabel = "fall_from_grab";
    horizontalDirection = HorizontalDirection.right;

    constructor(petElement: HTMLImageElement) {
        this.petBottom = parseInt(petElement.style.bottom);
        this.el = petElement;
    }

    nextFrame() : FrameResult {
        this.petBottom -= 5;
        this.el.style.bottom = `${this.petBottom}px`;
        if (this.petBottom <= 0) {
            this.petBottom = 0;
            return FrameResult.stateComplete;
        }   
        return FrameResult.stateContinue;
    }
}
