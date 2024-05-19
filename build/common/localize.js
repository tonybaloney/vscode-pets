"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringListAsQuickPickItemList = exports.TranslatedQuickPickItem = void 0;
const vscode = require("vscode");
class TranslatedQuickPickItem {
    label;
    value;
    constructor(label, value) {
        this.label = label;
        this.value = value;
    }
}
exports.TranslatedQuickPickItem = TranslatedQuickPickItem;
function stringListAsQuickPickItemList(collection) {
    return collection.map((el) => {
        return { label: vscode.l10n.t(String(el)), value: el };
    });
}
exports.stringListAsQuickPickItemList = stringListAsQuickPickItemList;
//# sourceMappingURL=localize.js.map