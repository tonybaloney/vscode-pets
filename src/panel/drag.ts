import { IPetCollection, PetElement } from './pets';

/**
 * Captures the elements and cursor offsets associated with an active drag gesture.
 */
interface DragContext {
    element: PetElement;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
}

const FALL_COMPLETE_THRESHOLD = 0.5;

/**
 * Handles pointer interaction events for the pet drag lifecycle.
 */
export interface DragController {
    /**
     * Starts a drag interaction when the user presses the mouse on a collision element.
     */
    handleMouseDown(event: MouseEvent): void;
}

/**
 * Builds a drag controller that updates pet positions and animates the fall back to the floor.
 * @param pets Collection of pets currently rendered in the panel.
 * @param saveState Callback that persists the current panel state once positions settle.
 * @returns Drag controller bound to the provided collection/state callback.
 */
export function createDragController(
    pets: IPetCollection,
    saveState: () => void,
): DragController {
    const activeFallAnimations: WeakMap<PetElement, number> = new WeakMap();
    let activeDrag: DragContext | undefined;

    /**
     * Cancels any pending animation frames tied to the supplied pet element.
     */
    const stopActiveFall = (element: PetElement) => {
        const animationId = activeFallAnimations.get(element);
        if (animationId !== undefined) {
            cancelAnimationFrame(animationId);
            activeFallAnimations.delete(element);
        }
    };

    /**
     * Animates the pet toward its floor position after it has been released mid-air.
     */
    const scheduleFallToFloor = (element: PetElement, onComplete?: () => void) => {
        stopActiveFall(element);

        const step = () => {
            const currentBottom = element.pet.bottom;
            const floor = element.pet.floor;

            if (currentBottom <= floor + FALL_COMPLETE_THRESHOLD) {
                element.pet.positionBottom(floor);
                activeFallAnimations.delete(element);
                if (onComplete) {
                    onComplete();
                }
                return;
            }

            const fallDistance = Math.max(1, element.pet.fallSpeed);
            element.pet.positionBottom(
                Math.max(floor, currentBottom - fallDistance),
            );

            const id = window.requestAnimationFrame(step);
            activeFallAnimations.set(element, id);
        };

        const id = window.requestAnimationFrame(step);
        activeFallAnimations.set(element, id);
    };

    /**
     * Applies the latest pointer coordinates to the pet sprite while dragging.
     */
    const updateDraggedPetPosition = (e: MouseEvent) => {
        if (!activeDrag) {
            return;
        }

        const { element, offsetX, offsetY, width, height } = activeDrag;
        stopActiveFall(element);
        const maxLeft = Math.max(0, window.innerWidth - width);
        const maxTop = Math.max(0, window.innerHeight - height);

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft > maxLeft) {
            newLeft = maxLeft;
        }

        if (newTop < 0) {
            newTop = 0;
        } else if (newTop > maxTop) {
            newTop = maxTop;
        }

        const newBottom = Math.max(
            element.pet.floor,
            window.innerHeight - (newTop + height),
        );

        element.pet.positionLeft(newLeft);
        element.pet.positionBottom(newBottom);
    };

    /**
     * Completes the drag session and decides whether a fall animation is needed.
     */
    const handleMouseUp = (e: MouseEvent) => {
        const dragContext = activeDrag;
        if (dragContext) {
            updateDraggedPetPosition(e);
        }
        document.body.style.cursor = '';
        window.removeEventListener('mousemove', updateDraggedPetPosition);
        activeDrag = undefined;
        console.log('Drop pet', e);

        if (!dragContext) {
            return;
        }

        const { element } = dragContext;

        if (element.pet.bottom > element.pet.floor + FALL_COMPLETE_THRESHOLD) {
            scheduleFallToFloor(element, () => saveState());
        } else {
            element.pet.positionBottom(element.pet.floor);
            saveState();
        }
    };

    /**
     * Initialises drag tracking for a collision element once the mouse is pressed.
     */
    const handleMouseDrag = (e: MouseEvent) => {
        const el = e.currentTarget as HTMLDivElement;
        let dragTarget: PetElement | undefined;

        pets.pets.forEach((element) => {
            if (element.collision === el && element.pet.canSwipe) {
                dragTarget = element;
            }
        });

        if (!dragTarget) {
            return;
        }

        stopActiveFall(dragTarget);

        const collisionRect = dragTarget.collision.getBoundingClientRect();

        activeDrag = {
            element: dragTarget,
            offsetX: e.clientX - collisionRect.left,
            offsetY: e.clientY - collisionRect.top,
            width: collisionRect.width,
            height: collisionRect.height,
        };

        document.body.style.cursor = 'grabbing';
        window.addEventListener('mousemove', updateDraggedPetPosition);
        window.addEventListener('mouseup', handleMouseUp, { once: true });

        e.preventDefault();
        updateDraggedPetPosition(e);
    };

    return {
        handleMouseDown: handleMouseDrag,
    };
}
