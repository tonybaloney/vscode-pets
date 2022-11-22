import { IPetPanel } from './panel';
import { PetSpecification } from './specification';
import * as vscode from 'vscode';
import {
    PetColor,
    PetSize,
    PetType,
    Theme,
    WebviewMessage,
} from '../common/types';
import * as path from 'path';
import { normalizeColor } from '../common/pets';
import { getWebviewOptions } from './configuration';

function getNonce() {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export class PetWebviewContainer implements IPetPanel {
    protected _extensionUri: vscode.Uri;
    protected _disposables: vscode.Disposable[] = [];
    protected _petMediaPath: string;
    protected _petColor: PetColor;
    protected _petType: PetType;
    protected _petSize: PetSize;
    protected _theme: Theme;
    protected _themeKind: vscode.ColorThemeKind;
    protected _throwBallWithMouse: boolean;

    constructor(
        extensionUri: vscode.Uri,
        extensionPath: string,
        color: PetColor,
        type: PetType,
        size: PetSize,
        theme: Theme,
        themeKind: vscode.ColorThemeKind,
        throwBallWithMouse: boolean,
    ) {
        this._extensionUri = extensionUri;
        this._petMediaPath = path.join(extensionPath, 'media');
        this._petColor = color;
        this._petType = type;
        this._petSize = size;
        this._theme = theme;
        this._themeKind = themeKind;
        this._throwBallWithMouse = throwBallWithMouse;
    }

    public petColor(): PetColor {
        return normalizeColor(this._petColor, this._petType);
    }

    public petType(): PetType {
        return this._petType;
    }

    public petSize(): PetSize {
        return this._petSize;
    }

    public theme(): Theme {
        return this._theme;
    }

    public themeKind(): vscode.ColorThemeKind {
        return this._themeKind;
    }

    public throwBallWithMouse(): boolean {
        return this._throwBallWithMouse;
    }

    public updatePetColor(newColor: PetColor) {
        this._petColor = newColor;
    }

    public updatePetType(newType: PetType) {
        this._petType = newType;
    }

    public updatePetSize(newSize: PetSize) {
        this._petSize = newSize;
    }

    public updateTheme(newTheme: Theme, themeKind: vscode.ColorThemeKind) {
        this._theme = newTheme;
        this._themeKind = themeKind;
    }

    public setThrowWithMouse(newThrowWithMouse: boolean): void {
        this._throwBallWithMouse = newThrowWithMouse;
        this.getWebview().postMessage({
            command: 'throw-with-mouse',
            enabled: newThrowWithMouse,
        });
    }

    public throwBall() {
        this.getWebview().postMessage({
            command: 'throw-ball',
        });
    }

    public resetPets(): void {
        this.getWebview().postMessage({
            command: 'reset-pet',
        });
    }

    public spawnPet(spec: PetSpecification) {
        this.getWebview().postMessage({
            command: 'spawn-pet',
            type: spec.type,
            color: spec.color,
            name: spec.name,
        });
        this.getWebview().postMessage({ command: 'set-size', size: spec.size });
    }

    public listPets() {
        this.getWebview().postMessage({ command: 'list-pets' });
    }

    public rollCall(): void {
        this.getWebview().postMessage({ command: 'roll-call' });
    }

    public deletePet(petName: string) {
        this.getWebview().postMessage({ command: 'delete-pet', name: petName });
    }

    protected getWebview(): vscode.Webview {
        throw new Error('Not implemented');
    }

    protected _update() {
        const webview = this.getWebview();
        webview.html = this._getHtmlForWebview(webview);
    }

    public update() {}

    protected _getHtmlForWebview(webview: vscode.Webview) {
        // Local path to main script run in the webview
        const scriptPathOnDisk = vscode.Uri.joinPath(
            this._extensionUri,
            'media',
            'main-bundle.js',
        );

        // And the uri we use to load this script in the webview
        const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

        // Local path to css styles
        const styleResetPath = vscode.Uri.joinPath(
            this._extensionUri,
            'media',
            'reset.css',
        );
        const stylesPathMainPath = vscode.Uri.joinPath(
            this._extensionUri,
            'media',
            'pets.css',
        );
        const silkScreenFontPath = webview.asWebviewUri(
            vscode.Uri.joinPath(
                this._extensionUri,
                'media',
                'Silkscreen-Regular.ttf',
            ),
        );

        // Uri to load styles into webview
        const stylesResetUri = webview.asWebviewUri(styleResetPath);
        const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

        // Get path to resource on disk
        const basePetUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(this._petMediaPath)),
        );

        // Use a nonce to only allow specific scripts to be run
        const nonce = getNonce();

        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${
                    webview.cspSource
                } 'nonce-${nonce}'; img-src ${
            webview.cspSource
        } https:; script-src 'nonce-${nonce}';
                font-src ${webview.cspSource};">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${stylesResetUri}" rel="stylesheet" nonce="${nonce}">
				<link href="${stylesMainUri}" rel="stylesheet" nonce="${nonce}">
                <style nonce="${nonce}">
                @font-face {
                    font-family: 'silkscreen';
                    src: url('${silkScreenFontPath}') format('truetype');
                }
                </style>
				<title>VS Code Pets</title>
			</head>
			<body>
				<canvas id="petCanvas"></canvas>
				<div id="petsContainer"></div>
				<div id="foreground"></div>	
				<script nonce="${nonce}" src="${scriptUri}"></script>
				<script nonce="${nonce}">petApp.petPanelApp("${basePetUri}", "${this.theme()}", ${this.themeKind()}, "${this.petColor()}", "${this.petSize()}", "${this.petType()}", ${this.throwBallWithMouse()});</script>
			</body>
			</html>`;
    }
}

function handleWebviewMessage(message: WebviewMessage) {
    switch (message.command) {
        case 'alert':
            vscode.window.showErrorMessage(message.text);
            return;
        case 'info':
            vscode.window.showInformationMessage(message.text);
            return;
    }
}

export class PetWebviewViewProvider extends PetWebviewContainer {
    public static readonly viewType = 'petsView';

    private _webviewView?: vscode.WebviewView;

    resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
        this._webviewView = webviewView;

        webviewView.webview.options = getWebviewOptions(this._extensionUri);
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(
            handleWebviewMessage,
            null,
            this._disposables,
        );
    }

    update() {
        this._update();
    }

    getWebview(): vscode.Webview {
        if (this._webviewView === undefined) {
            throw new Error(
                vscode.l10n.t(
                    'Panel not active, make sure the pets view is visible before running this command.',
                ),
            );
        } else {
            return this._webviewView.webview;
        }
    }
}
