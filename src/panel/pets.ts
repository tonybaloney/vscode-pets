import { ISequenceTree } from "./sequences";
import { IState, States, resolveState, HorizontalDirection, ChaseState, BallState, FrameResult, PetInstanceState } from "./states";

export class InvalidStateException {

}

export interface IPetType {
    canSwipe(): boolean
    swipe(): void
    chase(ballState: BallState, canvas: HTMLCanvasElement): void
    nextFrame(): void
    getState(): PetInstanceState
    recoverState(state: PetInstanceState): void
} 

abstract class BasePetType implements IPetType {
    label: string = "base";
    sequence: ISequenceTree = { startingState: States.sitIdle, sequenceStates: []};
    currentState: IState;
    currentStateEnum: States;
    holdState: IState | undefined;
    holdStateEnum: States | undefined;
    el: HTMLImageElement;
    petRoot: string;

    constructor(spriteElement: HTMLImageElement, petRoot: string){
        this.el = spriteElement;
        this.petRoot = petRoot;
        this.currentStateEnum = this.sequence.startingState;
        this.currentState = resolveState(this.currentStateEnum, spriteElement);
    }

    getState(): PetInstanceState { 
        return {currentStateEnum: this.currentStateEnum};
    }

    recoverState(state: PetInstanceState){
        this.currentStateEnum = state.currentStateEnum!;
        this.currentState = resolveState(this.currentStateEnum, this.el);
    }

    canSwipe(){
        // Some pets override this with custom rules
        return true;
    }

    swipe() {
        if (this.currentStateEnum === States.swipe) { return; }
        this.holdState = this.currentState;
        this.holdStateEnum = this.currentStateEnum;
        this.currentStateEnum = States.swipe;
        this.currentState = resolveState(this.currentStateEnum, this.el);
    }
    
    chase(ballState: BallState, canvas: HTMLCanvasElement) {
        this.currentStateEnum = States.chase;
        this.currentState = new ChaseState(this.el, ballState, canvas);
    }

    faceLeft() {
        this.el.style.webkitTransform = "scaleX(-1)";
    }

    faceRight() {
        this.el.style.webkitTransform = "scaleX(1)";
    }

    setAnimation(face: string) {
        const newFace: string = `${this.petRoot}_${face}_8fps.gif`;
        if (this.el.src === newFace) {
            return;
        }
        this.el.src = newFace;
    }

    chooseNextState(fromState: States): States {
        // Work out next state
        var possibleNextStates: States[] | undefined = undefined;
        for (var i = 0 ; i < this.sequence.sequenceStates.length; i++) {
            if (this.sequence.sequenceStates[i].state === fromState) {
                possibleNextStates = this.sequence.sequenceStates[i].possibleNextStates;
            }
        }
        if (!possibleNextStates){
            throw new InvalidStateException();
        }
        // randomly choose the next state
        const idx = Math.floor(Math.random() * possibleNextStates.length);
        return possibleNextStates[idx];
    }

    nextFrame() {
        if (this.currentState.horizontalDirection === HorizontalDirection.left) {
            this.faceLeft();
        } else if (this.currentState.horizontalDirection === HorizontalDirection.right) {
            this.faceRight();
        }
        this.setAnimation(this.currentState.spriteLabel);
        var frameResult = this.currentState.nextFrame();
        if (frameResult === FrameResult.stateComplete)
        {
            // If recovering from swipe..
            if (this.holdState && this.holdStateEnum){
                this.currentState = this.holdState;
                this.currentStateEnum = this.holdStateEnum;
                this.holdState = undefined;
                this.holdStateEnum = undefined;
                return;
            }

            var nextState = this.chooseNextState(this.currentStateEnum);
            this.currentState = resolveState(nextState, this.el);
            this.currentStateEnum = nextState;
        } else if (frameResult === FrameResult.stateCancel){
            if (this.currentStateEnum === States.chase) { // Currently the only one anyway
                var nextState = this.chooseNextState(States.idleWithBall);
                this.currentState = resolveState(nextState, this.el);
                this.currentStateEnum = nextState;
            }
        }
    }
}


export class Cat extends BasePetType {
    label = "cat";
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.runRight]
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.sitIdle, States.climbWallLeft]
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.sitIdle, States.climbWallLeft]
            },
            {
                state: States.climbWallLeft,
                possibleNextStates: [States.wallHangLeft]
            },
            {
                state: States.wallHangLeft,
                possibleNextStates: [States.jumpDownLeft]
            },
            {
                state: States.jumpDownLeft,
                possibleNextStates: [States.land]
            },
            {
                state: States.land,
                possibleNextStates: [States.sitIdle, States.walkRight, States.runRight]
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall]
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [States.walkRight, States.walkLeft, States.runLeft, States.runRight]
            },
        ]
    };

    canSwipe() {
        if (this.currentStateEnum === States.climbWallLeft ||
            this.currentStateEnum === States.jumpDownLeft || 
            this.currentStateEnum === States.land ||
            this.currentStateEnum === States.wallHangLeft) {
            return false;
        }
        return true;
    }
}

export class Dog extends BasePetType {
    label = "dog";
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.runRight, States.lie]
            },
            {
                state: States.lie,
                possibleNextStates: [States.walkRight, States.runRight]
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.sitIdle, States.lie]
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.sitIdle, States.lie]
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall]
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [States.walkRight, States.walkLeft, States.runLeft, States.runRight]
            },
        ]
    };
}

export class Snake extends BasePetType {
    label = "snake";
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.runRight]
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.sitIdle]
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.sitIdle]
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall]
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [States.walkRight, States.walkLeft, States.runLeft, States.runRight]
            },
        ]
    };
}

export class Clippy extends BasePetType {
    label = "clippy";
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.runRight]
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.sitIdle]
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.sitIdle]
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall]
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [States.walkRight, States.walkLeft, States.runLeft, States.runRight]
            },
        ]
    };
}

export class RubberDuck extends BasePetType {
    label = "rubber duck";
    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.runRight]
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft]
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.sitIdle]
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.sitIdle]
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall]
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [States.walkRight, States.walkLeft, States.runLeft, States.runRight]
            },
        ]
    };
}

export class InvalidPetException {
}

export function createPet(petType: string, el: HTMLImageElement, petRoot: string) : IPetType {
    if (petType === "cat"){
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

