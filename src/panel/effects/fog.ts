/*
 * Fog effect
 */

import { ColorThemeKind, PetSize } from '../../common/types';
import { Effect } from './effect';

enum Direction {
    left,
    right,
}

class Fog {
    x: number;
    y: number;
    width: number;
    height: number;
    direction: Direction;
    velocity: number;
    canvas: HTMLCanvasElement;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        direction: Direction,
        velocity: number,
        canvas: HTMLCanvasElement,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.velocity = velocity;
        this.canvas = canvas;
    }

    animation() {
        switch (this.direction) {
            case Direction.left:
                this.x -= this.velocity;
                if (this.x + this.width < 0) {
                    this.x = this.canvas.clientWidth + this.width;
                }
                break;
            case Direction.right:
                this.x += this.velocity;
                if (this.x + this.width > this.canvas.width) {
                    this.x = -this.width;
                }
                break;
        }
        this.draw();
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            const gradient = ctx.createRadialGradient(
                this.width / 2,
                this.height / 2,
                0,
                this.width / 2,
                this.height / 2,
                this.width / 2,
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

export class FogEffect implements Effect {
    name: string = 'fog';
    description: string = 'Fog effect';

    clouds: Fog[] = [];
    running: boolean = false;
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;

    /* eslint-disable no-unused-vars */
    init(
        canvas: HTMLCanvasElement,
        scale: PetSize,
        floor: number,
        themeKind: ColorThemeKind,
    ): void {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* eslint-enable no-unused-vars */
        this.clouds = [
            new Fog(200, 200, 200, 200, Direction.left, 0.5, canvas),
            new Fog(600, 120, 100, 150, Direction.left, 0.6, canvas),
            new Fog(70, 140, 230, 210, Direction.left, 0.7, canvas),
            new Fog(600, 20, 40, 30, Direction.left, 0.4, canvas),
            new Fog(300, 200, 200, 200, Direction.left, 0.5, canvas),
            new Fog(400, 120, 70, 90, Direction.left, 0.6, canvas),
            new Fog(10, 140, 230, 210, Direction.left, 0.7, canvas),
            new Fog(0, 20, 100, 100, Direction.left, 0.4, canvas),
        ];
    }

    loop() {
        if (!this.running || !this.ctx || !this.canvas) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.clouds?.forEach((ele) => {
            ele.animation();
        });
        requestAnimationFrame(() => this.loop());
    }

    enable(): void {
        this.running = true;

        requestAnimationFrame(() => this.loop());
    }

    disable(): void {
        this.running = false;
    }
}
