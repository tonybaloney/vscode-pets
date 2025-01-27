/*
 * Fog effect
 * Based on https://codepen.io/gilson-santos-the-typescripter/pen/yLQdeNx
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
    me: HTMLDivElement;
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
        // Create a div with class "fogCloud"
        this.me = document.createElement('div');
        this.me.className = 'fogCloud';
        this.direction = direction;
        this.velocity = velocity;
        this.canvas = canvas;
    }

    create() {
        this.me.style.width = this.width + 'px';
        this.me.style.height = this.height + 'px';
        this.canvas.appendChild(this.me);
    }

    animation() {
        this.me.style.left = this.x + 'px';
        this.me.style.top = this.y + 'px';
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
                    this.me.style.left = -this.width + 'px';
                }
                break;
        }
    }
}

export class FogEffect implements Effect {
    name: string = 'fog';
    description: string = 'Fog effect';

    clouds: Fog[] = [];
    running: boolean = false;

    /* eslint-disable no-unused-vars */
    init(
        canvas: HTMLCanvasElement,
        scale: PetSize,
        floor: number,
        themeKind: ColorThemeKind,
    ): void {
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
        if (!this.running) {
            return;
        }
        this.clouds?.forEach((ele) => {
            ele.animation();
        });
        requestAnimationFrame(() => this.loop());
    }

    enable(): void {
        this.running = true;

        this.clouds?.forEach((ele) => {
            ele.create();
            ele.animation();
        });
        requestAnimationFrame(() => this.loop());
    }

    disable(): void {
        this.running = false;
        this.clouds?.forEach((ele) => {
            ele.me.remove();
        });
    }
}
