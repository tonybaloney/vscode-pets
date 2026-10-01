import * as vscode from 'vscode';
import { PetColor, PetType } from './types';

export function petColorLabel(type: PetType, color: PetColor): string {
    if (type === PetType.finley) {
        if (color === PetColor.blue) {
            return vscode.l10n.t('Smooth');
        }
        if (color === PetColor.bluePixel) {
            return vscode.l10n.t('Pixel Art');
        }
    }
    return vscode.l10n.t(String(color));
}

export class TranslatedQuickPickItem<T> implements vscode.QuickPickItem {
    label: string;
    value: T;

    constructor(label: string, value: T) {
        this.label = label;
        this.value = value;
    }
}

export function stringListAsQuickPickItemList<T>(
    collection: Array<T>,
): TranslatedQuickPickItem<T>[] {
    return collection.map<TranslatedQuickPickItem<T>>((el) => {
        return { label: vscode.l10n.t(String(el)), value: el };
    });
}
