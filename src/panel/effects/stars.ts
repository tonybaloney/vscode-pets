import { PetSize, ColorThemeKind } from '../../common/types';
import { Effect } from './effect';

class Star {
    x: number;
    y: number;
    size: number;
    brightness: number;
    twinkleDirection: number;
    sizeMin: number;
    sizeMax: number;

    constructor(
        x: number,
        y: number,
        size: number,
        sizeMin: number,
        sizeMax: number,
    ) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.brightness = 1;
        this.twinkleDirection = 1;
        this.sizeMin = sizeMin;
        this.sizeMax = sizeMax;
    }

    twinkle() {
        // Change size and brightness
        this.size += 0.1 * this.twinkleDirection;
        this.brightness += 0.1 * this.twinkleDirection;

        // Clamp brightness to the range [0, 1]
        if (this.brightness > 1) {
            this.brightness = 1;
        }
        if (this.brightness < 0) {
            this.brightness = 0;
        }

        // Reverse direction if limits are reached
        if (this.size > this.sizeMax || this.size < this.sizeMin) {
            this.twinkleDirection *= -1;
        }
    }
}

export class StarEffect implements Effect {
    name: string = 'Stars';
    description: string = 'Twinkling stars effect';

    enabled: boolean = false;
    canvas?: HTMLCanvasElement;
    scale?: PetSize;
    stars: Star[] = [];
    ctx?: CanvasRenderingContext2D;
    pSize: [number, number] = [0, 0];
    pDensity: number = 0;
    themeKind: ColorThemeKind = ColorThemeKind.dark;

    init(
        foregroundCanvas: HTMLCanvasElement,
        backgroundCanvas: HTMLCanvasElement,
        scale: PetSize,
        floor: number,
        themeKind: ColorThemeKind,
    ): void {
        this.themeKind = themeKind;
        this.canvas = backgroundCanvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.scale = scale;
        switch (this.scale) {
            case PetSize.nano:
                this.pSize = [0.5, 1.5];
                this.pDensity = 100;
                break;
            case PetSize.small:
                this.pSize = [0.5, 1.5];
                this.pDensity = 75;
                break;
            case PetSize.medium:
                this.pSize = [1, 2];
                this.pDensity = 50;
                break;
            case PetSize.large:
                this.pSize = [1.5, 3];
                this.pDensity = 35;
                break;
        }

        this.pDensity = Math.floor(
            (this.pDensity * this.canvas.width * this.canvas.height) / 100_000,
        );

        // Generate stars
        for (let i = 0; i < this.pDensity; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size =
                Math.random() * (this.pSize[1] - this.pSize[0]) + this.pSize[0];
            this.stars.push(new Star(x, y, size, this.pSize[0], this.pSize[1]));
        }
        console.log('Stars initialized 🌟');

        // Add event listener for canvas resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    private handleResize(): void {
        if (this.canvas && this.ctx && this.scale) {
            this.stars = [];
            this.init(this.canvas, this.canvas, this.scale, 0, this.themeKind);
        }
    }

    enable(): void {
        if (
            this.themeKind === ColorThemeKind.light ||
            this.themeKind === ColorThemeKind.highContrastLight
        ) {
            // You can't see stars in the daytime
            this.enabled = false;
            return;
        }

        // Draw the stars
        if (this.ctx === null || !this.canvas) {
            console.log('Canvas context not initialized');
            return;
        }
        this.enabled = true;
        this.loop();
        console.log('Stars enabled');
    }

    private draw(): void {
        this.stars.forEach((star) => {
            if (!this.ctx) {
                return;
            }

            star.twinkle();
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        });
    }

    disable(): void {
        if (!this.ctx || !this.canvas) {
            console.log('Canvas context not initialized');
            return;
        }
        this.enabled = false;
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log('Stars disabled');
    }

    private loop(): void {
        if (this.enabled) {
            this.clear();
            this.draw();
            this.queue();
        } else {
            console.log('Stars effect stopped');
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
        setTimeout(() => {
            window.requestAnimationFrame(() => this.loop());
        }, 1000);
    }
}
