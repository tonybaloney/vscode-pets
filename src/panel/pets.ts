import { ISequenceTree } from "./sequences";
import { IState, States, resolveState } from "./states";

export interface IPetType {
    label: string
    sequence: ISequenceTree
    getCurrentState(): IState
}

abstract class BasePetType implements IPetType {
    currentState: IState;
    constructor(){
        this.currentState = resolveState(this.sequence.startingState);
    }

    getCurrentState(): IState{
        return this.currentState;
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
                possibleNextStates: [States.walkLeft, States.runLeft, States.lie]
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft, States.lie]
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
                possibleNextStates: [States.sitIdle]
            }
        ]
    };
}

export class Dog implements IPetType {
    label = "dog";
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
                possibleNextStates: [States.sitIdle]
            }
        ]
    };
}

export class Snake implements IPetType {
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
                possibleNextStates: [States.sitIdle]
            }
        ]
    };
}

export class Clippy implements IPetType {
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
                possibleNextStates: [States.sitIdle]
            }
        ]
    };
}

export function resolvePet(petType: string) : IPetType | undefined {
    if (petType === "cat"){
        return new Cat();
    }
    else if (petType === "dog") {
        return new Dog();
    }
    else if (petType === "snake") {
        return new Snake();
    }
    else if (petType === "clippy") {
        return new Clippy();
    }
}

