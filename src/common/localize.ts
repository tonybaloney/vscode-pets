import * as nls from 'vscode-nls';
import * as vscode from 'vscode';

const localizeNls = nls.config()();

// eslint-disable-next-line no-unused-vars
export function activate(context: vscode.ExtensionContext) {
    // Does nothing, used by activated extension.
}

export function localize(key: string, params: any): any {
    return localizeNls(`vscodePets.${key}`, params);
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
