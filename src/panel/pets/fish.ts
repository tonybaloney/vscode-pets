import { PetColor, PetSize } from '../../common/types';
import { BasePetType } from '../basepettype';
import { States } from '../states';

export class Fish extends BasePetType {
    label = 'fish';
    static possibleColors = [PetColor.orange, PetColor.green];
    private swimStartTime = performance.now();
    override initSprite(petSize: PetSize, left: number, bottom: number) {
        super.initSprite(petSize, left, bottom);
        this.el.style.transform = 'scaleX(1)';
    }

    sequence = {
        startingState: States.sitIdle,
        sequenceStates: [
            {
                state: States.sitIdle,
                possibleNextStates: [States.walkRight, States.runRight],
            },
            {
                state: States.walkRight,
                possibleNextStates: [States.walkLeft, States.runLeft],
            },
            {
                state: States.runRight,
                possibleNextStates: [States.walkLeft, States.runLeft],
            },
            {
                state: States.walkLeft,
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.runLeft,
                possibleNextStates: [States.sitIdle],
            },
            {
                state: States.chase,
                possibleNextStates: [States.idleWithBall],
            },
            {
                state: States.idleWithBall,
                possibleNextStates: [
                    States.walkRight,
                    States.walkLeft,
                    States.runLeft,
                    States.runRight,
                ],
            },
        ],
    };
    get emoji(): string {
        return '🐠';
    }
    get hello(): string {
        return 'blub blub';
    }
    override nextFrame(): void {
        super.nextFrame();

        const t = (performance.now() - this.swimStartTime) / 1000;
        const amplitude = 20;
        const frequency = 0.5;
        const midY = window.innerHeight / 2;

        const swimY = midY + Math.sin(2 * Math.PI * frequency * t) * amplitude;

        this.positionBottom(swimY);
    }
    override faceLeft(): void {
        this.el.style.transform = 'scaleX(1)';
    }

    override faceRight(): void {
        this.el.style.transform = 'scaleX(-1)';
    }
}

export const FISH_NAMES: ReadonlyArray<string> = [
    'Nemo',
    'NemoBro',
    'GreenBeast',
    'Tippi',
];
