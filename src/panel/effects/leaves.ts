/*
 * Falling leaves effect
 */
import { ColorThemeKind, PetSize } from '../../common/types';
import { Effect } from './effect';

const colors = ['#D7A50F', '#704910', '#A22D16', '#BB8144'];

class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function floorRandom(min: number, max: number) {
    return (min || 0) + Math.random() * ((max || 1) - (min || 0));
}

function microtime(): number {
    return new Date().getTime() * 0.001;
}

class Leaf {
    origin: Vector2;
    position: Vector2;
    velocity: Vector2;
    amplitude: number;
    dx: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    settled: boolean;
    settleTime: number;
    settleDuration: number;

    constructor(
        origin: Vector2,
        velocity: Vector2,
        amplitude: number,
        rotationSpeed: number,
    ) {
        this.origin = origin;
        this.position = new Vector2(origin.x, origin.y);
        this.velocity = velocity || new Vector2(0, 0);
        this.amplitude = amplitude;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotationSpeed = rotationSpeed;

        // randomize start values a bit
        this.dx = Math.random() * 100;
        this.rotation = Math.random() * Math.PI * 2; // Random initial rotation

        this.settled = false;
        this.settleTime = 0;
        this.settleDuration = floorRandom(2, 5);
    }

    update(timeDelta: number) {
        if (this.settled) {
            return;
        }

        this.position.y += this.velocity.y * timeDelta;

        // oscillate the x value between -amplitude and +amplitude
        this.dx += this.velocity.x * timeDelta;
        this.position.x = this.origin.x + this.amplitude * Math.sin(this.dx);

        // update rotation for flutter effect
        this.rotation += this.rotationSpeed * timeDelta;
    }
}

export class LeafEffect implements Effect {
    name: string = 'Leaves';
    description: string = 'Falling leaves effect';

    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    particles: Array<Leaf> = [];
    running: boolean = false;

    startTime: number = 0;
    frameTime: number = 0;
    maxTimeDelta: number = 0.1;
    treeLine: number = 600; // y position of the tree line. Exactly half the height of the graphic
    scale: number = 1; // scale of the leaf graphic. Adjusted for pet size

    pAmount: number = 25; // Leafiness
    pSwing: number[] = [0.1, 1]; // min and max oscillation speed for x movement
    pSpeed: number[] = [10, 50]; // min and max y speed
    pAmplitude: number[] = [5, 100]; // min and max distance for x movement
    pRotationSpeed: number[] = [0.5, 3]; // min and max rotation speed for flutter effect

    floor: number = 0;

    enable(): void {
        this.running = true;
        this.startTime = this.frameTime = microtime();
        this.loop();
    }

    disable(): void {
        this.running = false;
    }

    init(
        foregroundCanvas: HTMLCanvasElement,
        backgroundCanvas: HTMLCanvasElement,
        scale: PetSize,
        floor: number,
        // eslint-disable-next-line no-unused-vars
        themeKind: ColorThemeKind,
    ): void {
        // use the container width and height
        this.canvas = foregroundCanvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.floor = floor;
        switch (scale) {
            case PetSize.nano:
                this.pAmount = 100;
                this.treeLine = 187 / 2;
                this.scale = 1 / 20;
                this.pSpeed = [2, 10];
                break;
            case PetSize.small:
                this.pAmount = 50;
                this.treeLine = 250 / 2;
                this.scale = 1 / 15;
                this.pSpeed = [5, 20];
                break;
            case PetSize.medium:
                this.pAmount = 20;
                this.treeLine = 375 / 2;
                this.scale = 1 / 10;
                this.pSpeed = [10, 30];
                break;
            case PetSize.large:
                this.pAmount = 15;
                this.treeLine = 500 / 2;
                this.scale = 1 / 10;
                this.pSpeed = [20, 50];
                break;
        }
        this.initParticles();
    }

    loop() {
        if (this.running) {
            this.clear();
            this.update();
            this.draw();
            this.queue();
        } else {
            console.log('Leaf effect stopped');
        }
    }

    private initParticles() {
        if (!this.canvas) {
            console.log('Canvas not initialized');
            return;
        }
        // clear the particles array
        this.particles.length = 0;

        for (var i = 0; i < this.pAmount; i++) {
            var origin = new Vector2(
                floorRandom(0, this.canvas.width),
                floorRandom(
                    this.canvas.height - this.treeLine,
                    this.canvas.height - this.floor,
                ),
            );
            var velocity = new Vector2(
                floorRandom(this.pSwing[0], this.pSwing[1]),
                floorRandom(this.pSpeed[0], this.pSpeed[1]),
            );
            var amplitude = floorRandom(this.pAmplitude[0], this.pAmplitude[1]);
            var rotationSpeed = floorRandom(
                this.pRotationSpeed[0],
                this.pRotationSpeed[1],
            );

            this.particles.push(
                new Leaf(origin, velocity, amplitude, rotationSpeed),
            );
        }
    }

    private update() {
        if (!this.canvas) {
            console.log('Canvas not initialized');
            return;
        }
        // calculate the time since the last frame
        // this can be large when window is minimized so also impose a limit
        var timeNow = microtime();
        var timeDelta = Math.min(timeNow - this.frameTime, this.maxTimeDelta);

        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            particle.update(timeDelta);

            var leafCenterY = particle.position.y + 119.5 * this.scale;

            if (leafCenterY >= this.canvas.height - this.floor) {
                if (!particle.settled) {
                    particle.settled = true;
                    particle.settleTime = timeNow;
                    particle.position.y =
                        this.canvas.height - this.floor - 119.5 * this.scale;
                } else {
                    if (
                        timeNow - particle.settleTime >=
                        particle.settleDuration
                    ) {
                        particle.position.y = particle.origin.y =
                            this.canvas.height - this.treeLine;
                        particle.position.x = particle.origin.x =
                            Math.random() * this.canvas.width;
                        particle.dx = Math.random() * 100;
                        particle.rotation = Math.random() * Math.PI * 2;
                        particle.settled = false;
                        particle.settleDuration = floorRandom(2, 5);
                    }
                }
            }
        }

        // save this time for the next frame
        this.frameTime = timeNow;
    }

    private draw() {
        if (!this.ctx) {
            console.log('Canvas context not initialized');
            return;
        }

        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            var x = particle.position.x;
            var y = particle.position.y;

            // Save the current transformation matrix
            this.ctx.save();

            // Move to the center of the leaf for rotation
            var centerX = x + (100 * this.scale) / 2;
            var centerY = y + (85 * this.scale + 169 * this.scale) / 2;
            this.ctx.translate(centerX, centerY);

            // Apply rotation for flutter effect
            this.ctx.rotate(particle.rotation);

            // Move back to original position (relative to rotation center)
            this.ctx.translate(-centerX, -centerY);

            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.moveTo(100 * this.scale + x, 85 * this.scale + y);
            this.ctx.lineTo(0 + x, 107 * this.scale + y);
            this.ctx.lineTo(73 * this.scale + x, 112 * this.scale + y);
            this.ctx.lineTo(32 * this.scale + x, 138 * this.scale + y);
            this.ctx.lineTo(92 * this.scale + x, 123 * this.scale + y);
            this.ctx.lineTo(100 * this.scale + x, 169 * this.scale + y);
            this.ctx.lineTo(123 * this.scale + x, 123 * this.scale + y);
            this.ctx.lineTo(168 * this.scale + x, 133 * this.scale + y);
            this.ctx.lineTo(133 * this.scale + x, 112 * this.scale + y);
            this.ctx.lineTo(184 * this.scale + x, 110 * this.scale + y);
            this.ctx.lineTo(100 * this.scale + x, 85 * this.scale + y);
            this.ctx.lineTo(100 * this.scale + x, 70 * this.scale + y);
            this.ctx.fill();

            // Restore the transformation matrix
            this.ctx.restore();
        }
    }

    private clear() {
        if (!this.ctx || !this.canvas) {
            console.log('Canvas or context not initialized');
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private queue() {
        window.requestAnimationFrame(() => this.loop());
    }

    handleResize(): void {
        return;
    }
}
