import { ColorThemeKind, PetSize } from '../../common/types';

export interface Effect {
    name: string;
    description: string;
    init(
        foregroundCanvas: HTMLCanvasElement,
        backgroundCanvas: HTMLCanvasElement,
        scale: PetSize,
        floor: number,
        themeKind: ColorThemeKind,
    ): void;
    enable(): void;
    disable(): void;
}
