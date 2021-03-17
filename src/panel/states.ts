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
    idleWithBall = "idle-with-ball"
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
    }
    return new SitIdleState(el);
}

export interface IState {
    label: string
    spriteLabel: string
    horizontalDirection: HorizontalDirection
    nextFrame(): boolean
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

    nextFrame() : boolean {
        this.idleCounter++;
        if (this.idleCounter > 50 + Math.floor(Math.random() * 100)) {
            return true;
        }
        return false;
    }
}

export class SitIdleState extends AbstractStaticState {
    label = States.sitIdle;
    spriteLabel = "idle";
    horizontalDirection = HorizontalDirection.left;
    holdTime = 50;
}

export class LieState extends AbstractStaticState {
    label = States.lie;
    spriteLabel = "lie";
    horizontalDirection = HorizontalDirection.left;
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
    horizontalDirection = HorizontalDirection.left;
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

    constructor(petElement: HTMLImageElement) {
        this.petLeft = parseInt(petElement.style.left);
        this.el = petElement;
    }

    nextFrame() : boolean {
        this.petLeft += this.skipSpeed;
        this.el.style.left = `${this.petLeft}px`;
        if (this.petLeft >= window.innerWidth - this.el.width) {
            return true;
        }
        return false;
    }
}

export class WalkLeftState implements IState {
    label = States.walkLeft;
    petLeft: number;
    el: HTMLImageElement;
    skipSpeed = 3;
    spriteLabel = "walk";
    horizontalDirection = HorizontalDirection.right;

    constructor(petElement: HTMLImageElement) {
        this.petLeft = parseInt(petElement.style.left);
        this.el = petElement;
    }

    nextFrame() : boolean {
        this.petLeft -= this.skipSpeed;
        this.el.style.left = `${this.petLeft}px`;
        if (this.petLeft <= 0) {
            return true;
        }
        return false;
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

// export class ChaseState implements IState {

// }

//   function chase() {
//     setAnimation("/" + petAffix + "_run_8fps.gif");
//     if (petLeft > cx) {
//       faceLeft();
//       petLeft -= 3;
//     } else {
//       faceRight();
//       petLeft += 3;
//     }

//     petSpriteElement.style.left = `${petLeft}px`;
//     if (canvas.height - cy < spriteWidth && cx < petLeft && petLeft < cx + 15) {
//       // hide ball
//       canvas.style.display = "none";
//       paused = true;
//       return true;
//     }
//   }

export class ClimbWallLeftState implements IState {
    label = States.climbWallLeft;
    petBottom: number;
    el: HTMLImageElement;
    skipSpeed = 3;
    spriteLabel = "wallclimb";
    horizontalDirection = HorizontalDirection.right;

    constructor(petElement: HTMLImageElement) {
        this.petBottom = parseInt(petElement.style.bottom);
        this.el = petElement;
    }

    nextFrame() : boolean {
        this.petBottom += 1;
        this.el.style.bottom = `${this.petBottom}px`;
        if (this.petBottom >= 100) {
          return true;
        }
        return false;
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

    nextFrame() : boolean {
        this.petBottom -= 5;
        this.el.style.bottom = `${this.petBottom}px`;
        if (this.petBottom <= 0) {
            this.petBottom = 0;
            return true;
        }   
        return false;
    }
}
