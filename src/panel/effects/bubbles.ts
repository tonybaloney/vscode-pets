import { ColorThemeKind, PetSize } from '../../common/types';
import { Effect } from './effect'

class Bubble {
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;

    constructor(width: number, height: number) {
        this.radius = Math.random() * 4 + 2;
        this.x = Math.random() * width;
        this.y = height + this.radius;
        this.speed = Math.random() * 0.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    move() {
        this.y -= this.speed;
    }

    isOffScreen(): boolean {
        return this.y + this.radius < 0;
    }
}

export class BubbleEffect implements Effect {
    name = 'Bubbles';
    description = 'Floating underwater bubbles';
    enabled = false;
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    bubbles: Bubble[] = [];
    pDensity = 40;

    init(
        _: HTMLCanvasElement,
        backgroundCanvas: HTMLCanvasElement,
        __: PetSize,
        ___: number,
        ____: ColorThemeKind
    ): void {
        this.canvas = backgroundCanvas;
        this.ctx = this.canvas.getContext('2d')!;
        this.bubbles = [];

        for (let i = 0; i < this.pDensity; i++) {
            this.bubbles.push(new Bubble(this.canvas.width, this.canvas.height));
        }

        console.log('Bubbles initialized 🫧');
    }

    enable(): void {
        if (!this.ctx || !this.canvas) return;
        this.enabled = true;
        this.loop();
        console.log('Bubbles enabled');
    }

    disable(): void {
        this.enabled = false;
        this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        console.log('Bubbles disabled');
    }

    handleResize(): void {
        this.bubbles = [];
        if (this.canvas) {
            for (let i = 0; i < this.pDensity; i++) {
                this.bubbles.push(new Bubble(this.canvas.width, this.canvas.height));
            }
        }
    }

    private draw(): void {
        if (!this.canvas) return;

        this.bubbles.forEach((bubble) => {
            if (!this.ctx) {
                return;
            }
            bubble.move();
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
            this.ctx.fill();
        });

        // Remove bubbles off screen, add new ones
        this.bubbles = this.bubbles.filter((b) => !b.isOffScreen());
        while (this.bubbles.length < this.pDensity) {
            this.bubbles.push(new Bubble(this.canvas.width, this.canvas.height));
        }
    }

    private loop(): void {
        if (!this.enabled) return;
        this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        this.draw();
        window.requestAnimationFrame(() => this.loop());
    }
}
