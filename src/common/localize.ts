import * as vscode from 'vscode';

import * as i18n from 'vscode-nls-i18n';

export function activate(context: vscode.ExtensionContext) {
    i18n.init(context.extensionPath);
}

export function localize(key: string, params: any): any {
    return i18n.localize(`vscodePets.${key}`, params);
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
        return { label: localize(String(el), el), value: el };
    });
}
