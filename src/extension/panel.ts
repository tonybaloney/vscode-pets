import { PetSpecification } from './specification';
import * as vscode from 'vscode';
import {
    PetColor,
    PetSize,
    PetType,
    Theme,
    WebviewMessage,
} from '../common/types';
import { PetWebviewContainer } from './webview';
import { getWebviewOptions } from './configuration';

export interface IPetPanel {
    throwBall(): void;
    resetPets(): void;
    spawnPet(spec: PetSpecification): void;
    deletePet(petName: string): void;
    listPets(): void;
    rollCall(): void;
    themeKind(): vscode.ColorThemeKind;
    throwBallWithMouse(): boolean;
    updatePetColor(newColor: PetColor): void;
    updatePetType(newType: PetType): void;
    updatePetSize(newSize: PetSize): void;
    updateTheme(newTheme: Theme, themeKind: vscode.ColorThemeKind): void;
    update(): void;
    setThrowWithMouse(newThrowWithMouse: boolean): void;
}

function handlePanelMessage(message: WebviewMessage) {
    switch (message.command) {
        case 'alert':
            vscode.window.showErrorMessage(message.text);
            return;
        case 'info':
            vscode.window.showInformationMessage(message.text);
            return;
    }
}

/**
 * Manages pet coding webview panels
 */
export class PetPanel extends PetWebviewContainer implements IPetPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: PetPanel | undefined;

    public static readonly viewType = 'petCoding';

    private readonly _panel: vscode.WebviewPanel;

    public static createOrShow(
        extensionUri: vscode.Uri,
        extensionPath: string,
        petColor: PetColor,
        petType: PetType,
        petSize: PetSize,
        theme: Theme,
        themeKind: vscode.ColorThemeKind,
        throwBallWithMouse: boolean,
    ) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // If we already have a panel, show it.
        if (PetPanel.currentPanel) {
            if (
                petColor === PetPanel.currentPanel.petColor() &&
                petType === PetPanel.currentPanel.petType() &&
                petSize === PetPanel.currentPanel.petSize()
            ) {
                PetPanel.currentPanel._panel.reveal(column);
                return;
            } else {
                PetPanel.currentPanel.updatePetColor(petColor);
                PetPanel.currentPanel.updatePetType(petType);
                PetPanel.currentPanel.updatePetSize(petSize);
                PetPanel.currentPanel.update();
            }
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            PetPanel.viewType,
            vscode.l10n.t('Pet Panel'),
            vscode.ViewColumn.Two,
            getWebviewOptions(extensionUri),
        );

        PetPanel.currentPanel = new PetPanel(
            panel,
            extensionUri,
            extensionPath,
            petColor,
            petType,
            petSize,
            theme,
            themeKind,
            throwBallWithMouse,
        );
    }

    public resetPets() {
        this.getWebview().postMessage({ command: 'reset-pet' });
    }

    public listPets() {
        this.getWebview().postMessage({ command: 'list-pets' });
    }

    public rollCall(): void {
        this.getWebview().postMessage({ command: 'roll-call' });
    }

    public deletePet(petName: string): void {
        this.getWebview().postMessage({ command: 'delete-pet', name: petName });
    }

    public static revive(
        panel: vscode.WebviewPanel,
        extensionUri: vscode.Uri,
        extensionPath: string,
        petColor: PetColor,
        petType: PetType,
        petSize: PetSize,
        theme: Theme,
        themeKind: vscode.ColorThemeKind,
        throwBallWithMouse: boolean,
    ) {
        PetPanel.currentPanel = new PetPanel(
            panel,
            extensionUri,
            extensionPath,
            petColor,
            petType,
            petSize,
            theme,
            themeKind,
            throwBallWithMouse,
        );
    }

    private constructor(
        panel: vscode.WebviewPanel,
        extensionUri: vscode.Uri,
        extensionPath: string,
        color: PetColor,
        type: PetType,
        size: PetSize,
        theme: Theme,
        themeKind: vscode.ColorThemeKind,
        throwBallWithMouse: boolean,
    ) {
        super(
            extensionUri,
            extensionPath,
            color,
            type,
            size,
            theme,
            themeKind,
            throwBallWithMouse,
        );

        this._panel = panel;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Update the content based on view changes
        this._panel.onDidChangeViewState(
            () => {
                this.update();
            },
            null,
            this._disposables,
        );

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            handlePanelMessage,
            null,
            this._disposables,
        );
    }

    public dispose() {
        PetPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    public update() {
        if (this._panel.visible) {
            this._update();
        }
    }

    getWebview(): vscode.Webview {
        return this._panel.webview;
    }
}
