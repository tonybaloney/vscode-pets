import { Effect } from './effect';

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

    move(): void {
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
        _foregroundCanvas: HTMLCanvasElement,
        backgroundCanvas: HTMLCanvasElement,
    ): void {
        this.canvas = backgroundCanvas;
        const context = this.canvas.getContext('2d');
        if (!context) {
            console.warn('2D context not available for bubble canvas');
            return;
        }

        this.ctx = context;
        this.bubbles = [];

        const width = this.canvas.width;
        const height = this.canvas.height;

        for (let i = 0; i < this.pDensity; i++) {
            this.bubbles.push(new Bubble(width, height));
        }

        console.log('Bubbles initialized 🫧');
    }

    enable(): void {
        if (!this.ctx || !this.canvas) {
            return;
        }
        this.enabled = true;
        this.loop();
        console.log('Bubbles enabled');
    }

    disable(): void {
        if (!this.ctx || !this.canvas) {
            return;
        }

        this.enabled = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log('Bubbles disabled');
    }

    handleResize(): void {
        if (!this.canvas) {
            return;
        }

        this.bubbles = [];
        const width = this.canvas.width;
        const height = this.canvas.height;

        for (let i = 0; i < this.pDensity; i++) {
            this.bubbles.push(new Bubble(width, height));
        }
    }

    private draw(): void {
        if (!this.canvas || !this.ctx) {
            return;
        }

        const ctx = this.ctx;

        this.bubbles.forEach((bubble) => {
            bubble.move();
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
            ctx.fill();
        });

        this.bubbles = this.bubbles.filter((b) => !b.isOffScreen());

        const width = this.canvas.width;
        const height = this.canvas.height;

        while (this.bubbles.length < this.pDensity) {
            this.bubbles.push(new Bubble(width, height));
        }
    }

    private loop(): void {
        if (!this.enabled || !this.canvas || !this.ctx) {
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        window.requestAnimationFrame(() => this.loop());
    }
}
