import * as vscode from 'vscode';
import {
    PetSize,
    PetColor,
    PetType,
    ExtPosition,
    WebviewMessage,
    ALL_PETS,
} from '../common/types';
import { randomName } from '../common/names';
import * as localize from '../common/localize';
import { availableColors, normalizeColor } from '../common/pets';
import * as defaults from './defaults';
import {
    getConfigurationPosition,
    getConfiguredSize,
    getConfiguredTheme,
    getConfiguredThemeKind,
    getThrowWithMouseConfiguration,
    getWebviewOptions,
} from './configuration';
import { PetSpecification } from './specification';
import { IPetPanel, PetPanel } from './panel';
import { PetWebviewViewProvider } from './webview';

class PetQuickPickItem implements vscode.QuickPickItem {
    constructor(
        public readonly name_: string,
        public readonly type: string,
        public readonly color: string,
    ) {
        this.name = name_;
        this.label = name_;
        this.description = `${color} ${type}`;
    }

    name: string;
    label: string;
    kind?: vscode.QuickPickItemKind | undefined;
    description?: string | undefined;
    detail?: string | undefined;
    picked?: boolean | undefined;
    alwaysShow?: boolean | undefined;
    buttons?: readonly vscode.QuickInputButton[] | undefined;
}

let webviewViewProvider: PetWebviewViewProvider;

function updatePanelThrowWithMouse(): void {
    const panel = getPetPanel();
    if (panel !== undefined) {
        panel.setThrowWithMouse(getThrowWithMouseConfiguration());
    }
}

function updateExtensionPositionContext() {
    vscode.commands.executeCommand(
        'setContext',
        'vscode-pets.position',
        getConfigurationPosition(),
    );
}

export function storeCollectionAsMemento(
    context: vscode.ExtensionContext,
    collection: PetSpecification[],
) {
    var contextTypes = new Array(collection.length);
    var contextColors = new Array(collection.length);
    var contextNames = new Array(collection.length);
    for (let index = 0; index < collection.length; index++) {
        contextTypes[index] = collection[index].type;
        contextColors[index] = collection[index].color;
        contextNames[index] = collection[index].name;
    }
    context.globalState.update(defaults.EXTRA_PETS_KEY_TYPES, contextTypes);
    context.globalState.update(defaults.EXTRA_PETS_KEY_COLORS, contextColors);
    context.globalState.update(defaults.EXTRA_PETS_KEY_NAMES, contextNames);
    context.globalState.setKeysForSync([
        defaults.EXTRA_PETS_KEY_TYPES,
        defaults.EXTRA_PETS_KEY_COLORS,
        defaults.EXTRA_PETS_KEY_NAMES,
    ]);
}

let petPlaygroundStatusBar: vscode.StatusBarItem;
let spawnPetStatusBar: vscode.StatusBarItem;

interface IPetInfo {
    type: PetType;
    name: string;
    color: PetColor;
}

async function handleRemovePetMessage(
    this: vscode.ExtensionContext,
    message: WebviewMessage,
) {
    var petList: IPetInfo[] = Array();
    switch (message.command) {
        case 'list-pets':
            message.text.split('\n').forEach((pet) => {
                var parts = pet.split(',');
                petList.push({
                    type: parts[0] as PetType,
                    name: parts[1],
                    color: parts[2] as PetColor,
                });
            });
            break;
        default:
            return;
    }
    if (!petList) {
        return;
    }
    await vscode.window
        .showQuickPick<PetQuickPickItem>(
            petList.map((val) => {
                return new PetQuickPickItem(val.name, val.type, val.color);
            }),
            {
                placeHolder: vscode.l10n.t('Select the pet to remove.'),
            },
        )
        .then((pet: PetQuickPickItem | undefined) => {
            if (pet) {
                const panel = getPetPanel();
                if (panel !== undefined) {
                    panel.deletePet(pet.name);
                    const collection = petList
                        .filter((item) => {
                            return item.name !== pet.name;
                        })
                        .map<PetSpecification>((item) => {
                            return new PetSpecification(
                                item.color,
                                item.type,
                                PetSize.medium,
                                item.name,
                            );
                        });
                    storeCollectionAsMemento(this, collection);
                }
            }
        });
}

function getPetPanel(): IPetPanel | undefined {
    if (
        getConfigurationPosition() === ExtPosition.explorer &&
        webviewViewProvider
    ) {
        return webviewViewProvider;
    } else if (PetPanel.currentPanel) {
        return PetPanel.currentPanel;
    } else {
        return undefined;
    }
}

function getWebview(): vscode.Webview | undefined {
    if (
        getConfigurationPosition() === ExtPosition.explorer &&
        webviewViewProvider
    ) {
        return webviewViewProvider.getWebview();
    } else if (PetPanel.currentPanel) {
        return PetPanel.currentPanel.getWebview();
    }
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-pets.start', () => {
            if (
                getConfigurationPosition() === ExtPosition.explorer &&
                webviewViewProvider
            ) {
                vscode.commands.executeCommand('petsView.focus');
            } else {
                const spec = PetSpecification.fromConfiguration();
                PetPanel.createOrShow(
                    context.extensionUri,
                    context.extensionPath,
                    spec.color,
                    spec.type,
                    spec.size,
                    getConfiguredTheme(),
                    getConfiguredThemeKind(),
                    getThrowWithMouseConfiguration(),
                );

                if (PetPanel.currentPanel) {
                    var collection = PetSpecification.collectionFromMemento(
                        context,
                        getConfiguredSize(),
                    );
                    collection.forEach((item) => {
                        PetPanel.currentPanel?.spawnPet(item);
                    });
                    // Store the collection in the memento, incase any of the null values (e.g. name) have been set
                    storeCollectionAsMemento(context, collection);
                }
            }
        }),
    );

    // status bar item
    petPlaygroundStatusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100,
    );
    petPlaygroundStatusBar.command = 'vscode-pets.start';
    context.subscriptions.push(petPlaygroundStatusBar);

    spawnPetStatusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100,
    );
    spawnPetStatusBar.command = 'vscode-pets.spawn-pet';
    context.subscriptions.push(spawnPetStatusBar);

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
    );
    context.subscriptions.push(
        vscode.window.onDidChangeTextEditorSelection(updateStatusBar),
    );
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(
            updateExtensionPositionContext,
        ),
    );
    updateStatusBar();

    const spec = PetSpecification.fromConfiguration();
    webviewViewProvider = new PetWebviewViewProvider(
        context.extensionUri,
        context.extensionPath,
        spec.color,
        spec.type,
        spec.size,
        getConfiguredTheme(),
        getConfiguredThemeKind(),
        getThrowWithMouseConfiguration(),
    );
    updateExtensionPositionContext();

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            PetWebviewViewProvider.viewType,
            webviewViewProvider,
        ),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-pets.throw-ball', () => {
            const panel = getPetPanel();
            if (panel !== undefined) {
                panel.throwBall();
            }
        }),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-pets.delete-pet', async () => {
            const panel = getPetPanel();
            if (panel !== undefined) {
                panel.listPets();
                getWebview()?.onDidReceiveMessage(
                    handleRemovePetMessage,
                    context,
                );
            } else {
                createPetPlayground(context);
            }
        }),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-pets.roll-call', async () => {
            const panel = getPetPanel();
            if (panel !== undefined) {
                panel.rollCall();
            } else {
                createPetPlayground(context);
            }
        }),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vscode-pets.export-pet-list',
            async () => {
                const pets = PetSpecification.collectionFromMemento(
                    context,
                    getConfiguredSize(),
                );
                const petJson = JSON.stringify(pets, null, 2);
                const fileName = `pets-${Date.now()}.json`;
                if (!vscode.workspace.workspaceFolders) {
                    vscode.window.showErrorMessage(
                        vscode.l10n.t(
                            'You must have a folder or workspace open to export pets.',
                        ),
                    );
                    return;
                }
                const filePath = vscode.Uri.joinPath(
                    vscode.workspace.workspaceFolders[0].uri,
                    fileName,
                );
                const newUri = vscode.Uri.file(fileName).with({
                    scheme: 'untitled',
                    path: filePath.fsPath,
                });
                vscode.workspace.openTextDocument(newUri).then((doc) => {
                    vscode.window.showTextDocument(doc).then((editor) => {
                        editor.edit((edit) => {
                            edit.insert(new vscode.Position(0, 0), petJson);
                        });
                    });
                });
            },
        ),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vscode-pets.import-pet-list',
            async () => {
                const options: vscode.OpenDialogOptions = {
                    canSelectMany: false,
                    openLabel: 'Open pets.json',
                    filters: {
                        'JSON files': ['json'],
                    },
                };
                const fileUri = await vscode.window.showOpenDialog(options);

                if (fileUri && fileUri[0]) {
                    console.log('Selected file: ' + fileUri[0].fsPath);
                    try {
                        const fileContents = await vscode.workspace.fs.readFile(
                            fileUri[0],
                        );
                        const petsToLoad = JSON.parse(
                            String.fromCharCode.apply(
                                null,
                                Array.from(fileContents),
                            ),
                        );

                        // load the pets into the collection
                        var collection = PetSpecification.collectionFromMemento(
                            context,
                            getConfiguredSize(),
                        );
                        // fetch just the pet types
                        const panel = getPetPanel();
                        for (let i = 0; i < petsToLoad.length; i++) {
                            const pet = petsToLoad[i];
                            const petSpec = new PetSpecification(
                                normalizeColor(pet.color, pet.type),
                                pet.type,
                                pet.size,
                                pet.name,
                            );
                            collection.push(petSpec);
                            if (panel !== undefined) {
                                panel.spawnPet(petSpec);
                            }
                        }
                        storeCollectionAsMemento(context, collection);
                    } catch (e: any) {
                        vscode.window.showErrorMessage(
                            vscode.l10n.t(
                                'Failed to import pets: {0}',
                                e?.message,
                            ),
                        );
                    }
                }
            },
        ),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-pets.spawn-pet', async () => {
            const panel = getPetPanel();
            if (panel) {
                const selectedPetType = await vscode.window.showQuickPick(
                    localize.stringListAsQuickPickItemList<PetType>(ALL_PETS),
                    {
                        placeHolder: vscode.l10n.t('Select a pet'),
                    },
                );
                if (selectedPetType === undefined) {
                    return;
                }
                var petColor: PetColor = defaults.DEFAULT_COLOR;
                const possibleColors = availableColors(selectedPetType.value);

                if (possibleColors.length > 1) {
                    var selectedColor = await vscode.window.showQuickPick(
                        localize.stringListAsQuickPickItemList<PetColor>(
                            possibleColors,
                        ),
                        {
                            placeHolder: vscode.l10n.t('Select a color'),
                        },
                    );
                    if (selectedColor === undefined) {
                        return;
                    }
                    petColor = selectedColor.value;
                } else {
                    petColor = possibleColors[0];
                }

                if (petColor === undefined) {
                    return;
                }

                const name = await vscode.window.showInputBox({
                    placeHolder: vscode.l10n.t('Leave blank for a random name'),
                    prompt: vscode.l10n.t('Name your pet'),
                    value: randomName(selectedPetType.value),
                });
                const spec = new PetSpecification(
                    petColor,
                    selectedPetType.value,
                    getConfiguredSize(),
                    name,
                );
                if (!spec.type || !spec.color || !spec.size) {
                    return vscode.window.showWarningMessage(
                        vscode.l10n.t('Cancelled Spawning Pet'),
                    );
                } else if (spec) {
                    panel.spawnPet(spec);
                }
                var collection = PetSpecification.collectionFromMemento(
                    context,
                    getConfiguredSize(),
                );
                collection.push(spec);
                storeCollectionAsMemento(context, collection);
            } else {
                createPetPlayground(context);
                vscode.window.showInformationMessage(
                    vscode.l10n.t(
                        "A Pet Playground has been created. You can now use the 'Spawn Additional Pet' Command to add more pets.",
                    ),
                );
            }
        }),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-pets.remove-all-pets', () => {
            const panel = getPetPanel();
            if (panel !== undefined) {
                panel.resetPets();
                storeCollectionAsMemento(context, []);
            } else {
                createPetPlayground(context);
                vscode.window.showInformationMessage(
                    vscode.l10n.t(
                        "A Pet Playground has been created. You can now use the 'Remove All Pets' Command to remove all pets.",
                    ),
                );
            }
        }),
    );

    // Listening to configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(
            (e: vscode.ConfigurationChangeEvent): void => {
                if (
                    e.affectsConfiguration('vscode-pets.petColor') ||
                    e.affectsConfiguration('vscode-pets.petType') ||
                    e.affectsConfiguration('vscode-pets.petSize') ||
                    e.affectsConfiguration('vscode-pets.theme') ||
                    e.affectsConfiguration('workbench.colorTheme')
                ) {
                    const spec = PetSpecification.fromConfiguration();
                    const panel = getPetPanel();
                    if (panel) {
                        panel.updatePetColor(spec.color);
                        panel.updatePetSize(spec.size);
                        panel.updatePetType(spec.type);
                        panel.updateTheme(
                            getConfiguredTheme(),
                            getConfiguredThemeKind(),
                        );
                        panel.update();
                    }
                }

                if (e.affectsConfiguration('vscode-pets.position')) {
                    updateExtensionPositionContext();
                }

                if (e.affectsConfiguration('vscode-pets.throwBallWithMouse')) {
                    updatePanelThrowWithMouse();
                }
            },
        ),
    );

    if (vscode.window.registerWebviewPanelSerializer) {
        // Make sure we register a serializer in activation event
        vscode.window.registerWebviewPanelSerializer(PetPanel.viewType, {
            async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
                // Reset the webview options so we use latest uri for `localResourceRoots`.
                webviewPanel.webview.options = getWebviewOptions(
                    context.extensionUri,
                );
                const spec = PetSpecification.fromConfiguration();
                PetPanel.revive(
                    webviewPanel,
                    context.extensionUri,
                    context.extensionPath,
                    spec.color,
                    spec.type,
                    spec.size,
                    getConfiguredTheme(),
                    getConfiguredThemeKind(),
                    getThrowWithMouseConfiguration(),
                );
            },
        });
    }
}

function updateStatusBar(): void {
    spawnPetStatusBar.text = `$(squirrel)`;
    spawnPetStatusBar.tooltip = vscode.l10n.t('Spawn Pet');
    spawnPetStatusBar.show();
}

export function petPlaygroundDeactivate() {
    petPlaygroundStatusBar.dispose();
}

export function spawnPetDeactivate() {
    spawnPetStatusBar.dispose();
}

function createPetPlayground(context: vscode.ExtensionContext) {
    const spec = PetSpecification.fromConfiguration();
    PetPanel.createOrShow(
        context.extensionUri,
        context.extensionPath,
        spec.color,
        spec.type,
        spec.size,
        getConfiguredTheme(),
        getConfiguredThemeKind(),
        getThrowWithMouseConfiguration(),
    );
    if (PetPanel.currentPanel) {
        var collection = PetSpecification.collectionFromMemento(
            context,
            getConfiguredSize(),
        );
        collection.forEach((item) => {
            PetPanel.currentPanel?.spawnPet(item);
        });
        storeCollectionAsMemento(context, collection);
    } else {
        var collection = PetSpecification.collectionFromMemento(
            context,
            getConfiguredSize(),
        );
        collection.push(spec);
        storeCollectionAsMemento(context, collection);
    }
}
