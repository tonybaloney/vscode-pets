import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Butterfly extends BasePetType {
    label= 'butterfly';
    static possibleColors = [
        PetColor.redbrown,
        PetColor.pinkblue,
    ];
    sequence = {
        startingState: States.flyLeft,
        sequenceStates: [
            {
                state: States.flyLeft,
                possibleNextStates: [States.flyUp,States.flyRight],
            },
            {
                state: States.flyUp, 
                possibleNextStates: [States.flyRight, States.flyDown],
            },
            {
                state: States.flyRight,
                possibleNextStates: [States.flyDown, States.flyLeft],
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall],
            },
        ],
    };

    get emoji(): string {
        return '🦋';
    }


    // nextFrame(): void {
    //     if (this.currentState.horizontalDirection === HorizontalDirection.left) {
    //         this.faceLeft();
    //         this.positionLeft(this.left - this.flySpeed);
    //     } else if (this.currentState.horizontalDirection === HorizontalDirection.right) {
    //         this.faceRight();
    //         this.positionLeft(this.left + this.flySpeed);
    //     }

    //     this.setAnimation(this.currentState.spriteLabel);

    //     // Hover motion
    //     this._time += 1;
    //     const hoverOffset =
    //         Math.sin(this._time * this.hoverFrequency) * this.hoverAmplitude;

    //     this.positionBottom(this.bottom + hoverOffset + this.verticalDrift);

    //     const frameResult = this.currentState.nextFrame();

    //     if (frameResult === FrameResult.stateComplete) {
    //         const nextState = this.chooseNextState(this.currentStateEnum);
    //         this.currentState = resolveState(nextState, this);
    //         this.currentStateEnum = nextState;
    //     }
    // }
   
    get hello(): string {
        return ` Hi, I'm Butterfly, would you like some assistance today? 👋!`;
    }
}

export const BUTTERFLY_NAMES: ReadonlyArray<string> = [
    'Butterfly', //CORRECT NAME
    'Maxx', //DRIVEN FROM MY DOG'S NAME
    'Wingwoman', //WHY NOT
    'Flutterfly', //BUTTEFLYS FLUTTER AND FLY, SQUEEZE THE WORDS
    'Catrina', //BUTTERFLY NAME FROM CHILDHOOD CARTOON
    'Carrie Bradshaw', //JUST FOR THE HECK OF IT 
    'Chidi', //SOUNDS OF A FLYING BUTTERFLY- HINDI WORD
    'Bailey', //CUTE PUPPY NAME
    'Butterfree',  
];
