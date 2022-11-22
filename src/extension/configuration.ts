import {
    PetSize,
    ExtPosition,
    Theme,
    ALL_SCALES,
    ALL_THEMES,
} from '../common/types';
import * as defaults from './defaults';
import * as vscode from 'vscode';

export function getConfiguredSize(): PetSize {
    var size = vscode.workspace
        .getConfiguration('vscode-pets')
        .get<PetSize>('petSize', defaults.DEFAULT_PET_SCALE);
    if (ALL_SCALES.lastIndexOf(size) === -1) {
        size = defaults.DEFAULT_PET_SCALE;
    }
    return size;
}

export function getConfiguredTheme(): Theme {
    var theme = vscode.workspace
        .getConfiguration('vscode-pets')
        .get<Theme>('theme', defaults.DEFAULT_THEME);
    if (ALL_THEMES.lastIndexOf(theme) === -1) {
        theme = defaults.DEFAULT_THEME;
    }
    return theme;
}

export function getConfiguredThemeKind(): vscode.ColorThemeKind {
    return vscode.window.activeColorTheme.kind;
}

export function getConfigurationPosition() {
    return vscode.workspace
        .getConfiguration('vscode-pets')
        .get<ExtPosition>('position', defaults.DEFAULT_POSITION);
}

export function getThrowWithMouseConfiguration(): boolean {
    return vscode.workspace
        .getConfiguration('vscode-pets')
        .get<boolean>('throwBallWithMouse', true);
}

export function getWebviewOptions(
    extensionUri: vscode.Uri,
): vscode.WebviewOptions & vscode.WebviewPanelOptions {
    return {
        // Enable javascript in the webview
        enableScripts: true,
        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
    };
}
