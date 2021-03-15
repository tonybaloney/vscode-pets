import * as path from 'path';
import * as vscode from 'vscode';

enum PetColor {
	brown = "brown", 
	black = "black", 
	green = "green",
	metallic = "metallic"
};

enum PetType {
	dog = "dog",
	cat = "cat",
	snake = "snake",
	clippy = "clippy",
};

enum PetSize {
	nano = "nano",
	medium = "medium",
	large = "large"
};

const DEFAULT_PET_SCALE = PetSize.nano;
const DEFAULT_COLOR = PetColor.brown;
const DEFAULT_PET_TYPE:PetType = PetType.cat;

class PetSpecification {
	color: PetColor;
	type: PetType;
	size: PetSize;

	constructor() {
		this.color = vscode.workspace.getConfiguration("vscode-pets").get<PetColor>("petColor", DEFAULT_COLOR);
		if (!Object.values(PetColor).includes(this.color))
			{this.color = DEFAULT_COLOR;}

		this.type = vscode.workspace.getConfiguration("vscode-pets").get<PetType>("petType", DEFAULT_PET_TYPE);
		if (!Object.values(PetType).includes(this.type))
			{this.type = DEFAULT_PET_TYPE;}
			
		this.size = vscode.workspace.getConfiguration("vscode-pets").get<PetSize>("petSize", DEFAULT_PET_SCALE);
		if (!Object.values(PetSize).includes(this.size))
			{this.size = DEFAULT_PET_SCALE;}
	};
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-pets.start', () => {
			const spec = new PetSpecification();
			PetPanel.createOrShow(context.extensionUri, context.extensionPath, spec.color, spec.type, spec.size);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-pets.throw-ball', () => {
			if (PetPanel.currentPanel) {
				PetPanel.currentPanel.throwBall();
			}
		})
	);

	// Listening to configuration changes
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('vscode-pets.petColor') || e.affectsConfiguration('vscode-pets.petType') || e.affectsConfiguration('vscode-pets.petSize')) {
			const spec = new PetSpecification();
			PetPanel.createOrShow(context.extensionUri, context.extensionPath, spec.color, spec.type, spec.size);
		}
	}));

	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(PetPanel.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				// Reset the webview options so we use latest uri for `localResourceRoots`.
				webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
				const spec = new PetSpecification();
				PetPanel.revive(webviewPanel, context.extensionUri, context.extensionPath, spec.color, spec.type, spec.size);
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
	private _petColor: PetColor;
	private _petType: PetType;
	private _petSize: PetSize;
	private _extensionPath: string;

	public static createOrShow(extensionUri: vscode.Uri, extensionPath: string, petColor: PetColor, petType:PetType, petSize:PetSize) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;
		// If we already have a panel, show it.
		if (PetPanel.currentPanel) {
			if (petColor === PetPanel.currentPanel.petColor() 
				&& petType === PetPanel.currentPanel.petType()
				&& petSize === PetPanel.currentPanel.petSize()) {
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
			'Pet Panel',
			vscode.ViewColumn.Two,
			getWebviewOptions(extensionUri),
		);

		PetPanel.currentPanel = new PetPanel(panel, extensionUri, extensionPath, petColor, petType, petSize);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, extensionPath: string, petColor: PetColor, petType: PetType, petSize: PetSize) {
		PetPanel.currentPanel = new PetPanel(panel, extensionUri, extensionPath, petColor, petType, petSize);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, extensionPath: string, color: PetColor, type: PetType, size: PetSize) {
		this._panel = panel;
		this._extensionUri = extensionUri;
		this._extensionPath = extensionPath;
		this._petMediaPath = path.join(extensionPath, 'media', type);
		this._petColor = color;
		this._petType = type;
		this._petSize = size;
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

	public petColor(): PetColor {
		if (this._petType === PetType.snake)
			{return PetColor.green;}
		if (this._petType === PetType.clippy)
			{return PetColor.metallic;}
		return this._petColor;
	}

	public petType(): PetType { 
		return this._petType;
	}

	public petSize(): PetSize {
		return this._petSize;
	}

	public updatePetColor(newColor: PetColor){
		this._petColor = newColor;
	}

	public updatePetType(newType: PetType){
		this._petMediaPath = path.join(this._extensionPath, 'media', newType);
		this._petType = newType;
	}

	public updatePetSize(newSize: PetSize){
		this._petSize = newSize;
	}

	public throwBall() {
		this._panel.webview.postMessage({ command: 'throw-ball' });
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

		// Get the color selector
		const getColorSelector = () => {
			// Don't add selector if the type is clippy or snake
			if (![PetType.clippy, PetType.snake].includes(this.petType())) {
				let options = ["black", "brown"].map((color) =>
					`<option ${color === this.petColor() ? "selected" : ""} value="${color}">${color}</option>`
				);
				return `<select id="color-select">
							${options.join("\n")}
						</select>`;
			}
			return "";
		};
		
		// Get pet type selector
		const getPetTypeSelector = () => {
			let options = Object.keys(PetType).map((type) => {
				return `<option ${type === this.petType() ? "selected" : ""} value="${type}">${type}</option>`
			}
			);
			return `<select id="pet-type-select">
						${options.join("\n")}
					</select>`;
		};

		// Get pet size selector
		const getPetSizeSelector = () => {
			let options = Object.keys(PetSize).map((size) => {
				return `<option ${size === this.petSize() ? "selected" : ""} value="${size}">${size}</option>`
			}
			);
			return `<select id="pet-size-select">
						${options.join("\n")}
					</select>`;
		};

		webview.onDidReceiveMessage((e) => {
			switch (e.type) {
				case "selected color": {
					if (e.selected in PetColor) {
						let color = e.selected as PetColor;
						this.updatePetColor(color);
						webview.html = this._getHtmlForWebview(webview);
					};
					break;
				}
				case "selected pet": {
					if (e.selected in PetType) {
						let petType = e.selected as PetType;
						this.updatePetType(petType);
						webview.html = this._getHtmlForWebview(webview);
					};
					break;
				}
				case "selected size": {
					if (e.selected in PetSize) {
						let size = e.selected as PetSize;
						this.updatePetSize(size);
						webview.html = this._getHtmlForWebview(webview);
					};
				}
			}
		});

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource
			}; img-src ${webview.cspSource
			} https:; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${stylesResetUri}" rel="stylesheet">
				<link href="${stylesMainUri}" rel="stylesheet">
				<title>VS Code Pets</title>
			</head>
			<body>
				<script nonce="${nonce}">var basePetUri = "${basePetUri}"; var petColor = "${this.petColor()}"; var petType = "${this.petType()}"; var scaleSize = "${this.petSize()}";</script>
				<canvas id="petCanvas"></canvas><img class="pet" src="" />
				${getColorSelector()}
				${getPetTypeSelector()}
				${getPetSizeSelector()}
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