import { PetSize } from '../common/types';
import { PetElement } from './pets';
import { BallState } from './states';

/// Bouncing ball components, credit https://stackoverflow.com/a/29982343
const gravity: number = 0.6,
    damping: number = 0.9,
    traction: number = 0.8,
    interval: number = 1000 / 24; // msec for single frame
let then: number = 0; // last draw
var ballState: BallState;

var canvas: HTMLCanvasElement | null;
var ballRadius: number;
var floor: number;

function calculateBallRadius(size: PetSize): number {
    if (size === PetSize.nano) {
        return 2;
    } else if (size === PetSize.small) {
        return 3;
    } else if (size === PetSize.medium) {
        return 4;
    } else if (size === PetSize.large) {
        return 8;
    } else {
        return 1; // Shrug
    }
}

export function setupBallThrowing(
    canvasName: string,
    petSize: PetSize,
    floor_: number,
): void {
    canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    ballRadius = calculateBallRadius(petSize);
    floor = floor_;
}

function resetBall(): void {
    if (ballState) {
        ballState.paused = true;
    }
    if (canvas) {
        canvas.style.display = 'block';
    }
    ballState = new BallState(100, 100, 4, 5);
}

export function dynamicThrowOn(pets: PetElement[]) {
    let startMouseX: number;
    let startMouseY: number;
    let endMouseX: number;
    let endMouseY: number;
    console.log('Enabling dynamic throw');
    window.onmousedown = (e) => {
        if (ballState) {
            ballState.paused = true;
        }
        if (canvas) {
            canvas.style.display = 'block';
        }
        endMouseX = e.clientX;
        endMouseY = e.clientY;
        startMouseX = e.clientX;
        startMouseY = e.clientY;
        ballState = new BallState(e.clientX, e.clientY, 0, 0);

        pets.forEach((petEl) => {
            if (petEl.pet.canChase && canvas) {
                petEl.pet.chase(ballState, canvas);
            }
        });
        ballState.paused = true;

        drawBall();

        window.onmousemove = (ev) => {
            ev.preventDefault();
            if (ballState) {
                ballState.paused = true;
            }
            startMouseX = endMouseX;
            startMouseY = endMouseY;
            endMouseX = ev.clientX;
            endMouseY = ev.clientY;
            ballState = new BallState(ev.clientX, ev.clientY, 0, 0);
            drawBall();
        };
        window.onmouseup = (ev) => {
            ev.preventDefault();
            window.onmouseup = null;
            window.onmousemove = null;

            ballState = new BallState(
                endMouseX,
                endMouseY,
                endMouseX - startMouseX,
                endMouseY - startMouseY,
            );
            pets.forEach((petEl) => {
                if (petEl.pet.canChase && canvas) {
                    petEl.pet.chase(ballState, canvas);
                }
            });
            throwBall();
        };
    };
}

export function dynamicThrowOff() {
    console.log('Disabling dynamic throw');
    window.onmousedown = null;
    if (ballState) {
        ballState.paused = true;
    }
    if (canvas) {
        canvas.style.display = 'none';
    }
}

export function throwBall() {
    if (!canvas) {
        return;
    }

    if (!ballState.paused) {
        requestAnimationFrame(throwBall);
    }

    // throttling the frame rate
    const now = Date.now();
    const elapsed = now - then;
    if (elapsed <= interval) {
        return;
    }
    then = now - (elapsed % interval);

    if (ballState.cx + ballRadius >= canvas.width) {
        ballState.vx = -ballState.vx * damping;
        ballState.cx = canvas.width - ballRadius;
    } else if (ballState.cx - ballRadius <= 0) {
        ballState.vx = -ballState.vx * damping;
        ballState.cx = ballRadius;
    }
    if (ballState.cy + ballRadius + floor >= canvas.height) {
        ballState.vy = -ballState.vy * damping;
        ballState.cy = canvas.height - ballRadius - floor;
        // traction here
        ballState.vx *= traction;
    } else if (ballState.cy - ballRadius <= 0) {
        ballState.vy = -ballState.vy * damping;
        ballState.cy = ballRadius;
    }

    ballState.vy += gravity;

    ballState.cx += ballState.vx;
    ballState.cy += ballState.vy;
    drawBall();
}

function drawBall() {
    if (!canvas) {
        return;
    }
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(ballState.cx, ballState.cy, ballRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#2ed851';
    ctx.fill();
}

export function throwAndChase(pets: PetElement[]) {
    resetBall();
    throwBall();
    pets.forEach((petEl) => {
        if (petEl.pet.canChase && canvas) {
            petEl.pet.chase(ballState, canvas);
        }
    });
}
