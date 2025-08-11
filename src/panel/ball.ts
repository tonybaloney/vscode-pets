import { PetSize } from '../common/types';
import { PetElement } from './pets';
import { BallState } from './states';

/// Bouncing ball components, credit https://stackoverflow.com/a/29982343
const gravity: number = 0.6,
    damping: number = 0.9,
    traction: number = 0.8,
    interval: number = 1000 / 24; // msec for single frame (~24 FPS)
let then: number = 0; // last draw timestamp

// Multi-ball state
const balls: BallState[] = [];
const MAX_BALLS = 10;
const GROUND_TIMEOUT_MS = 5000; // clarified requirement A
let animationActive = false;

let canvas: HTMLCanvasElement | null;
let ballRadius: number;
let floor: number;

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

function spawnBall(cx: number, cy: number, vx: number, vy: number): BallState | undefined {
    if (!canvas) {
        return;
    }
    if (balls.length >= MAX_BALLS) {
        // Ignore new (clarification B)
        return;
    }
    canvas.style.display = 'block';
    const ball = new BallState(cx, cy, vx, vy);
    balls.push(ball);
    // Expose globally for modules avoiding circular dependency
    (window as any).petBalls = balls;
    return ball;
}

function spawnRandomBall(): BallState | undefined {
    if (!canvas) {
        return;
    }
    const cx = Math.random() * canvas.width;
    const cy = canvas.height * (0.25 + Math.random() * 0.15); // 25-40% height
    let vx = 0;
    while (Math.abs(vx) < 1) {
        vx = (Math.random() * 10) - 5; // -5..5 excluding small
    }
    const vy = -(8 + Math.random() * 4); // -8 to -12 upward
    return spawnBall(cx, cy, vx, vy);
}

export function dynamicThrowOn(pets: PetElement[]) {
    let startMouseX = 0;
    let startMouseY = 0;
    let endMouseX = 0;
    let endMouseY = 0;
    console.log('Enabling dynamic throw (multi-ball)');
    window.onmousedown = (e) => {
        if (!canvas) {
            return;
        }
        endMouseX = e.clientX;
        endMouseY = e.clientY;
        startMouseX = e.clientX;
        startMouseY = e.clientY;
        const preview = spawnBall(e.clientX, e.clientY, 0, 0);
        if (preview) {
            preview.paused = true; // stationary preview until release
            drawBalls();
        }
        window.onmousemove = (ev) => {
            ev.preventDefault();
            // Update preview by pausing/removing last preview and spawning new one at cursor
            if (preview) {
                preview.paused = true;
                preview.cx = ev.clientX;
                preview.cy = ev.clientY;
                drawBalls();
            }
            startMouseX = endMouseX;
            startMouseY = endMouseY;
            endMouseX = ev.clientX;
            endMouseY = ev.clientY;
        };
        window.onmouseup = (ev) => {
            ev.preventDefault();
            window.onmouseup = null;
            window.onmousemove = null;
            if (preview) {
                // Activate preview ball with velocity
                preview.vx = endMouseX - startMouseX;
                preview.vy = endMouseY - startMouseY;
                preview.paused = false;
            }
            pets.forEach((petEl) => {
                if (petEl.pet.canChase && canvas) {
                    petEl.pet.retargetIfNeeded?.(balls, canvas);
                }
            });
            startAnimationLoop();
        };
    };
}

export function dynamicThrowOff() {
    console.log('Disabling dynamic throw');
    window.onmousedown = null;
    // Do not clear balls; just stop spawn interaction
}

function physicsStep(ball: BallState) {
    if (!canvas) {
        return;
    }
    if (ball.paused) {
        return;
    }

    if (ball.cx + ballRadius >= canvas.width) {
        ball.vx = -ball.vx * damping;
        ball.cx = canvas.width - ballRadius;
    } else if (ball.cx - ballRadius <= 0) {
        ball.vx = -ball.vx * damping;
        ball.cx = ballRadius;
    }
    if (ball.cy + ballRadius + floor >= canvas.height) {
        if (Math.abs(ball.vy) < 1.2) {
            // Consider grounded when vertical speed low near floor
            if (!ball.groundedSince) {
                ball.groundedSince = Date.now();
            }
        } else {
            ball.groundedSince = undefined;
        }
        ball.vy = -ball.vy * damping;
        ball.cy = canvas.height - ballRadius - floor;
        ball.vx *= traction;
    } else if (ball.cy - ballRadius <= 0) {
        ball.vy = -ball.vy * damping;
        ball.cy = ballRadius;
    } else {
        ball.groundedSince = undefined;
    }

    ball.vy += gravity;
    ball.cx += ball.vx;
    ball.cy += ball.vy;
}

function cleanupBalls() {
    // Remove balls that have been grounded for too long
    const now = Date.now();
    for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];
        if (b.caughtBy) {
            // Already caught & transitioned; remove from list
            balls.splice(i, 1);
            continue;
        }
        if (b.groundedSince && now - b.groundedSince > GROUND_TIMEOUT_MS) {
            balls.splice(i, 1);
        }
    }
    if (!balls.length && canvas) {
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
        animationActive = false; // stop loop
    }
}

function animationLoop() {
    if (!animationActive) {
        return;
    }
    if (!canvas) {
        return;
    }
    requestAnimationFrame(animationLoop);
    const now = Date.now();
    const elapsed = now - then;
    if (elapsed <= interval) {
        return; // throttle
    }
    then = now - (elapsed % interval);

    balls.forEach(physicsStep);
    drawBalls();
    cleanupBalls();
}

function startAnimationLoop() {
    if (animationActive) {
        return;
    }
    animationActive = true;
    then = 0;
    requestAnimationFrame(animationLoop);
}

function drawBalls() {
    if (!canvas) {
        return;
    }
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.cx, ball.cy, ballRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = ball.caughtBy ? 'rgba(46,216,81,0.3)' : '#2ed851';
        ctx.fill();
    });
}

export function throwAndChase(pets: PetElement[]) {
    const ball = spawnRandomBall();
    if (!ball || !canvas) {
        return;
    }
    // Retarget each pet to nearest ball at spawn time
    pets.forEach((petEl) => {
        if (petEl.pet.canChase && canvas) {
            petEl.pet.retargetIfNeeded?.(balls, canvas);
        }
    });
    startAnimationLoop();
}

// Called by ChaseState to mark a ball as caught
