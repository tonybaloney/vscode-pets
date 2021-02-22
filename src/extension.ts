import * as path from 'path';
import * as vscode from 'vscode';

const DEFAULT_COLOR:string  = "brown";
const DEFAULT_PET_TYPE:string = "cat";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-pets.start', () => {
			const color:string = vscode.workspace.getConfiguration("vscode-pets").get("petColor", DEFAULT_COLOR);
			const petType:string = vscode.workspace.getConfiguration("vscode-pets").get("petType", DEFAULT_PET_TYPE);
			PetPanel.createOrShow(context.extensionUri, context.extensionPath, color, petType);
		})
	);

	// Listening to configuration changes
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('vscode-pets.petColor') || e.affectsConfiguration('vscode-pets.petType')) {
			const color = vscode.workspace.getConfiguration("vscode-pets").get("petColor", DEFAULT_COLOR);
			const petType:string = vscode.workspace.getConfiguration("vscode-pets").get("petType", DEFAULT_PET_TYPE);
			PetPanel.createOrShow(context.extensionUri, context.extensionPath, color, petType);
		}
	}));

	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(PetPanel.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				// Reset the webview options so we use latest uri for `localResourceRoots`.
				webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
				const color = vscode.workspace.getConfiguration("vscode-pets").get("petColor", DEFAULT_COLOR);
				const petType:string = vscode.workspace.getConfiguration("vscode-pets").get("petType", DEFAULT_PET_TYPE);
				PetPanel.revive(webviewPanel, context.extensionUri, context.extensionPath, color, petType);
			}
		});
	}
}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}

/**
 * Manages pet coding webview panels
 */
class PetPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: PetPanel | undefined;

	public static readonly viewType = 'petCoding';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];
	private _petMediaPath: string;
	private _petColor: string;
	private _petType: string;
	private _extensionPath: string;

	public static createOrShow(extensionUri: vscode.Uri, extensionPath: string, petColor: string, petType:string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (PetPanel.currentPanel) {
			if (petColor === PetPanel.currentPanel.petColor() && petType === PetPanel.currentPanel.petType()) {
				PetPanel.currentPanel._panel.reveal(column);
				return;
			} else {
				PetPanel.currentPanel.updatePetColor(petColor);
				PetPanel.currentPanel.updatePetType(petType);
				PetPanel.currentPanel.update();
			}
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			PetPanel.viewType,
			'Pet Panel',
			vscode.ViewColumn.Two,
			getWebviewOptions(extensionUri),
		);

		PetPanel.currentPanel = new PetPanel(panel, extensionUri, extensionPath, petColor, petType);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, extensionPath: string, petColor: string, petType: string) {
		PetPanel.currentPanel = new PetPanel(panel, extensionUri, extensionPath, petColor, petType);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, extensionPath: string, color: string, type: string) {
		this._panel = panel;
		this._extensionUri = extensionUri;
		this._extensionPath = extensionPath;
		this._petMediaPath = path.join(extensionPath, 'media', type);
		this._petColor = color;
		this._petType = type;
		// Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			e => {
				this.update();
			},
			null,
			this._disposables
		);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public petColor(): string { 
		return this._petColor;
	}

	public petType(): string { 
		return this._petType;
	}

	public updatePetColor(newColor: string){
		this._petColor = newColor;
	}

	public updatePetType(newType: string){
		this._petMediaPath = path.join(this._extensionPath, 'media', newType);
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
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

	public update(){
		if (this._panel.visible) {
			this._update();
		}
	}

	private _update() {
		const webview = this._panel.webview;
		this._panel.webview.html = this._getHtmlForWebview(webview);
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		// Local path to main script run in the webview
		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js');

		// And the uri we use to load this script in the webview
		const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

		// Local path to css styles
		const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'pets.css');

		// Uri to load styles into webview
		const stylesResetUri = webview.asWebviewUri(styleResetPath);
		const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

		// Get path to resource on disk
		const basePetUri = webview.asWebviewUri(vscode.Uri.file(path.join(this._petMediaPath)));

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
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${stylesResetUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">
				<title>VS Code Pets</title>
			</head>
			<body>
				<script nonce="${nonce}">var basePetUri = "${basePetUri}"; var petColor = "${this.petColor()}"; var petType = "${this.petType()}";</script>
				<img class="pet" src="" />
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}