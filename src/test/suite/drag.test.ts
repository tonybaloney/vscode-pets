import * as assert from 'assert';
import { createDragController } from '../../panel/drag';
import { PetCollection, PetElement } from '../../panel/pets';
import { PetColor, PetType } from '../../common/types';
import { IPetType } from '../../panel/states';

interface StubPet {
    canSwipe: boolean;
    fallSpeed: number;
    floor: number;
    bottom: number;
    left: number;
    positionBottom(value: number): void;
    positionLeft(value: number): void;
}

function createStubPet(): StubPet {
    return {
        canSwipe: true,
        fallSpeed: 120,
        floor: 25,
        bottom: 25,
        left: 0,
        positionBottom(value: number) {
            this.bottom = value;
        },
        positionLeft(value: number) {
            this.left = value;
        },
    };
}

suite('Drag Controller', () => {
    let collision: HTMLDivElement;
    let sprite: HTMLImageElement;
    let speech: HTMLDivElement;
    let petElement: PetElement;
    let petCollection: PetCollection;
    let stubPet: StubPet;
    let saveCalls: number;
    let controller: ReturnType<typeof createDragController>;
    let frameQueue: Array<{ id: number; cb: FrameRequestCallback }>;

    function flushAnimationFrames() {
        while (frameQueue.length > 0) {
            const item = frameQueue.shift();
            if (item) {
                item.cb(16);
            }
        }
    }

    setup(() => {
        // jsdom defaults are minimal; explicitly size the viewport.
        Object.defineProperty(window, 'innerWidth', {
            value: 800,
            configurable: true,
        });
        Object.defineProperty(window, 'innerHeight', {
            value: 600,
            configurable: true,
        });

        frameQueue = [];
        let nextId = 1;
        Object.defineProperty(window, 'requestAnimationFrame', {
            configurable: true,
            value: (cb: FrameRequestCallback) => {
                const id = nextId++;
                frameQueue.push({ id, cb });
                return id;
            },
        });
        Object.defineProperty(window, 'cancelAnimationFrame', {
            configurable: true,
            value: (id: number) => {
                const index = frameQueue.findIndex((item) => item.id === id);
                if (index >= 0) {
                    frameQueue.splice(index, 1);
                }
            },
        });

        sprite = document.createElement('img') as HTMLImageElement;
        speech = document.createElement('div') as HTMLDivElement;
        collision = document.createElement('div') as HTMLDivElement;
        collision.getBoundingClientRect = () => ({
            x: 340,
            y: 440,
            left: 340,
            top: 440,
            right: 400,
            bottom: 500,
            width: 60,
            height: 60,
            toJSON: () => ({}),
        });

        stubPet = createStubPet();
        petElement = new PetElement(
            sprite,
            collision,
            speech,
            stubPet as unknown as IPetType,
            PetColor.brown,
            PetType.cat,
        );

        petCollection = new PetCollection();
        petCollection.push(petElement);

        saveCalls = 0;
        controller = createDragController(petCollection, () => {
            saveCalls++;
        });
    });

    teardown(() => {
        window.dispatchEvent(
            new window.MouseEvent('mouseup', { clientX: 0, clientY: 0 }),
        );
        flushAnimationFrames();
        frameQueue = [];
    });

    test('updates pet position during drag', () => {
        const downEvent = new window.MouseEvent('mousedown', {
            clientX: 420,
            clientY: 480,
        });
        Object.defineProperty(downEvent, 'currentTarget', {
            configurable: true,
            value: collision,
        });

        controller.handleMouseDown(downEvent);

        const moveEvent = new window.MouseEvent('mousemove', {
            clientX: 520,
            clientY: 300,
        });
        window.dispatchEvent(moveEvent);

        assert.strictEqual(stubPet.left, 440);
        assert.strictEqual(stubPet.bottom, 280);
    });

    test('falls to the floor and saves state on drop', () => {
        const downEvent = new window.MouseEvent('mousedown', {
            clientX: 420,
            clientY: 480,
        });
        Object.defineProperty(downEvent, 'currentTarget', {
            configurable: true,
            value: collision,
        });
        controller.handleMouseDown(downEvent);

        const moveEvent = new window.MouseEvent('mousemove', {
            clientX: 540,
            clientY: 120,
        });
        window.dispatchEvent(moveEvent);

        assert.ok(stubPet.bottom > stubPet.floor);

        const upEvent = new window.MouseEvent('mouseup', {
            clientX: 540,
            clientY: 120,
        });
        window.dispatchEvent(upEvent);

        flushAnimationFrames();

        assert.strictEqual(stubPet.bottom, stubPet.floor);
        assert.strictEqual(saveCalls, 1);
    });
});
