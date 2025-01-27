/*
 * Falling snow effect
 * Based on https://codepen.io/carlosrodas/pen/LYzbaMm
 */
import { ColorThemeKind, PetSize } from '../../common/types';
import { Effect } from './effect';

class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function floorRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Particle {
    origin: Vector2;
    position: Vector2;
    velocity: Vector2;
    size: number;
    amplitude: number;
    dx: number;

    constructor(
        origin: Vector2,
        velocity: Vector2,
        size: number,
        amplitude: number,
    ) {
        this.origin = origin;
        this.position = new Vector2(origin.x, origin.y);
        this.velocity = velocity || new Vector2(0, 0);
        this.size = size;
        this.amplitude = amplitude;

        // randomize start values a bit
        this.dx = Math.random() * 100;
    }

    update(timeDelta: number) {
        this.position.y += this.velocity.y * timeDelta;

        // oscillate the x value between -amplitude and +amplitude
        this.dx += this.velocity.x * timeDelta;
        this.position.x = this.origin.x + this.amplitude * Math.sin(this.dx);
    }
}

export class SnowEffect implements Effect {
    name: string = 'Snow';
    description: string = 'Falling snow effect';

    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    particles: Array<Particle> = [];
    running: boolean = false;

    startTime: number = 0;
    frameTime: number = 0;

    pAmount: number = 5000; // Snowiness
    pSize: number[] = [0.5, 1.5]; // min and max size
    pSwing: number[] = [0.1, 1]; // min and max oscilation speed for x movement
    pSpeed: number[] = [40, 100]; // min and max y speed
    pAmplitude: number[] = [25, 50]; // min and max distance for x movement

    enable(): void {
        this.running = true;
        this.startTime = this.frameTime = Date.now();
        this.loop();
    }

    disable(): void {
        this.running = false;
    }

    init(
        canvas: HTMLCanvasElement,
        scale: PetSize,
        floor: number,
        themeKind: ColorThemeKind,
    ): void {
        // use the container width and height
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.initParticles();
    }

    loop() {
        if (this.running) {
            this.clear();
            this.update();
            this.draw();
            this.queue();
        }
    }

    private initParticles() {
        if (!this.canvas) {
            return;
        }
        // clear the particles array
        this.particles.length = 0;

        for (var i = 0; i < this.pAmount; i++) {
            var origin = new Vector2(
                floorRandom(0, this.canvas.width),
                floorRandom(-this.canvas.height, 0),
            );
            var velocity = new Vector2(
                floorRandom(this.pSwing[0], this.pSwing[1]),
                floorRandom(this.pSpeed[0], this.pSpeed[1]),
            );
            var size = floorRandom(this.pSize[0], this.pSize[1]);
            var amplitude = floorRandom(this.pAmplitude[0], this.pAmplitude[1]);

            this.particles.push(
                new Particle(origin, velocity, size, amplitude),
            );
        }
    }

    private update() {
        if (!this.canvas) {
            return;
        }
        // calculate the time since the last frame
        var timeNow = Date.now();
        var timeDelta = timeNow - this.frameTime;

        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            particle.update(timeDelta);

            if (particle.position.y - particle.size > this.canvas.height) {
                // reset the particle to the top and a random x position
                particle.position.y = -particle.size;
                particle.position.x = particle.origin.x =
                    Math.random() * this.canvas.width;
                particle.dx = Math.random() * 100;
            }
        }

        // save this time for the next frame
        this.frameTime = timeNow;
    }

    private draw() {
        if (!this.ctx) {
            return;
        }
        this.ctx.fillStyle = 'rgb(255,255,255)';

        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            this.ctx.fillRect(
                particle.position.x,
                particle.position.y,
                particle.size,
                particle.size,
            );
        }
    }

    private clear() {
        if (!this.ctx || !this.canvas) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private queue() {
        window.requestAnimationFrame(this.loop);
    }
}
