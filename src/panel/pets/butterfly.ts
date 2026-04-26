import { PetColor } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Butterfly extends BasePetType {

    label = 'butterfly';
    static possibleColors = [PetColor.pinkblue,PetColor.redbrown];
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
                possibleNextStates: [States.flyDown, States.idleWithBall],
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [States.flyLeft]
            }
        ],
    };

    get emoji(): string {
        return '🦋';
    }

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
