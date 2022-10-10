import * as vscode from 'vscode';

export const { init, localize } = require("vscode-nls-i18n");

export function activate(context: vscode.ExtensionContext) {
  init(context.extensionPath);
}