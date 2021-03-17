import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "node:constants";
import { inherits } from "node:util";

export enum HorizontalDirection {
    left,
    right
}

export enum VerticalDirection { 
    up,
    down
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

export interface IState {
    label: string
    spriteLabel: string
    horizontalDirection: HorizontalDirection
    verticalDirection: VerticalDirection
    init(petElement: HTMLImageElement): any
    nextFrame(): boolean
}

class AbstractStaticState implements IState {
    label = States.sitIdle;
    idleCounter: number;
    spriteLabel = "idle";
    holdTime = 50;
    horizontalDirection = HorizontalDirection.left;
    verticalDirection = VerticalDirection.up;

    init() {
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
    verticalDirection = VerticalDirection.up;
    holdTime = 50;
}

export class LieState extends AbstractStaticState {
    label = States.lie;
    idleCounter: number;
    spriteLabel = "lie";
    horizontalDirection = HorizontalDirection.left;
    verticalDirection = VerticalDirection.up;
    holdTime = 50;
}

export class WallHangLeftState extends AbstractStaticState {
    label = States.wallHangLeft;
    idleCounter: number;
    spriteLabel = "wallgrab";
    horizontalDirection = HorizontalDirection.left;
    verticalDirection = VerticalDirection.up;
    holdTime = 50;
}

export class LandState extends AbstractStaticState {
    label = States.land;
    idleCounter: number;
    spriteLabel = "land";
    horizontalDirection = HorizontalDirection.left;
    verticalDirection = VerticalDirection.up;
    holdTime = 10;
}

export class SwipeState extends AbstractStaticState {
    label = States.swipe;
    idleCounter: number;
    spriteLabel = "swipe";
    horizontalDirection = HorizontalDirection.left;
    verticalDirection = VerticalDirection.up;
    holdTime = 10;
}

export class IdleWithBallState extends AbstractStaticState {
    label = States.idleWithBall;
    idleCounter: number;
    spriteLabel = "with_ball";
    horizontalDirection = HorizontalDirection.left;
    verticalDirection = VerticalDirection.up;
    holdTime = 30;
}

export class WalkRightState implements IState {
    label = States.walkRight;
    petLeft: number;
    el: HTMLImageElement;
    skipSpeed = 3;
    spriteLabel = "walk";
    horizontalDirection = HorizontalDirection.right;
    verticalDirection = VerticalDirection.up;

    init(petElement: HTMLImageElement) {
        this.petLeft = 0;
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
    verticalDirection = VerticalDirection.up;

    init(petElement: HTMLImageElement) {
        this.petLeft = 0;
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

  function climbUpLeft() {
    faceLeft();
    setAnimation("/" + petAffix + "_wallclimb_8fps.gif");
    petBottom += 1;
    petSpriteElement.style.bottom = `${petBottom}px`;
    if (petBottom >= 100) {
      return true;
    }
  }

  function climbDownLeft() {
    faceRight();
    setAnimation("/" + petAffix + "_fall_from_grab_8fps.gif");
    petBottom -= 5;
    petSpriteElement.style.bottom = `${petBottom}px`;
    if (petBottom <= 0) {
      petBottom = 0;
      return true;
    }
  }