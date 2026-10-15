import * as vscode from 'vscode';

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
