import { ISequenceNode, ISequenceTree } from "./sequences";
import { IState, States, resolveState, HorizontalDirection } from "./states";

export class InvalidStateException {

}

export interface IPetType {
    canSwipe(): boolean
    swipe(): void
    chase(): void
    nextFrame(): void
}

abstract class BasePetType implements IPetType {
    label: string = "base";
    sequence: ISequenceTree = { startingState: States.sitIdle, sequenceStates: []};
    currentState: IState;
    currentStateEnum: States;
    el: HTMLImageElement;
    petRoot: string;

    constructor(spriteElement: HTMLImageElement, petRoot: string){
        this.el = spriteElement;
        this.petRoot = petRoot;
        this.currentStateEnum = this.sequence.startingState;
        this.currentState = resolveState(this.currentStateEnum, spriteElement);
    }

    canSwipe(){
        return true;
    }

    swipe() {
        // TODO Implement
    }
    
    chase() {
         // TODO
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

    nextFrame() {
        if (this.currentState.horizontalDirection === HorizontalDirection.left) {
            this.faceLeft();
        } else if (this.currentState.horizontalDirection === HorizontalDirection.right) {
            this.faceRight();
        }
        this.setAnimation(this.currentState.spriteLabel);
        if (this.currentState.nextFrame())
        {
            // Work out next state
            var possibleNextStates: States[] | undefined = undefined;
            for (var i = 0 ; i < this.sequence.sequenceStates.length; i++) {
                if (this.sequence.sequenceStates[i].state === this.currentStateEnum) {
                    possibleNextStates = this.sequence.sequenceStates[i].possibleNextStates;
                }
            }
            if (!possibleNextStates){
                throw new InvalidStateException();
            }
            // randomly choose the next state
            const idx = Math.floor(Math.random() * possibleNextStates.length);
            this.currentState = resolveState(possibleNextStates[idx], this.el);
            this.currentStateEnum = possibleNextStates[idx];
            console.log("Transitioning to state" , this.currentStateEnum);
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
        ]
    };
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
            }
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
                possibleNextStates: [States.walkLeft, States.runLeft, States.lie]
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft, States.lie]
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.sitIdle]
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.sitIdle]
            }
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
                possibleNextStates: [States.walkLeft, States.runLeft, States.lie]
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft, States.lie]
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.sitIdle]
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.sitIdle]
            }
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
    throw new InvalidPetException();
}

