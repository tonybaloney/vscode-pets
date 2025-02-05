import { PetSize, ColorThemeKind } from '../../common/types';
import { Effect } from './effect';

class Star {
    x: number;
    y: number;
    size: number;
    brightness: number;  // 0-1

    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.brightness = 1;
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

    init(foregroundCanvas: HTMLCanvasElement, backgroundCanvas: HTMLCanvasElement, scale: PetSize, floor: number, themeKind: ColorThemeKind): void {
        if (themeKind === ColorThemeKind.light || themeKind === ColorThemeKind.highContrastLight) {
            // You can't see stars in the daytime
            this.enabled = false;
            return;
        }

        this.enabled = true;
        this.canvas = backgroundCanvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        
        switch (scale) {
            case PetSize.nano:
                this.pSize = [0.1, 0.5];
                this.pDensity = 50;
                break;
            case PetSize.small:
                this.pSize = [0.5, 1.5];
                this.pDensity = 25;
                break;
            case PetSize.medium:
                this.pSize = [1, 2];
                this.pDensity = 10;
                break;
            case PetSize.large:
                this.pSize = [1.5, 3];
                this.pDensity = 500;
                break;
        }

        // Generate stars
        for (let i = 0; i < this.pDensity; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * (this.pSize[1] - this.pSize[0]) + this.pSize[0];
            this.stars.push(new Star(x, y, size));
        }
        console.log('Stars initialized 🌟');
    }

    enable(): void {
        // Draw the stars
        if (this.ctx === null || !this.canvas) {
            console.log('Canvas context not initialized');
            return;
        }
        this.enabled = true;
        this.queue();
        console.log('Stars enabled');
    }

    private draw(): void {
        this.stars.forEach(star => {
            if (!this.ctx) {
                return;
            }

            // Brightness effects the alpha of the star
            this.ctx.globalAlpha = star.brightness;
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(
                star.x,
                star.y,
                star.size,
                star.size,
            );
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
    
    private update(): void {
        // Update the brightness of the stars

    }

    private loop(): void {
        if (this.enabled) {
            this.clear();
            this.update();
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
        }, 100);
    }
}