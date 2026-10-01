import * as assert from 'assert';
import { readFileSync } from 'fs';
import * as path from 'path';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import {
    PetSize,
    PetType,
    PetColor,
    Theme,
    ColorThemeKind,
    WebviewMessage,
    ALL_PETS,
    ALL_THEMES,
    ALL_COLORS,
    ALL_SCALES,
    PetSpeed,
} from '../../common/types';
import {
    BallState,
    PetElementState,
    PetPanelState,
    States,
} from '../../panel/states';
import * as pets from '../../panel/pets';
import { randomName } from '../../common/names';
import { PetSpecification } from '../../extension/extension';
import { Finley } from '../../panel/pets/finley';

function mockPanelWindow() {
    const html = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>VS Code Pets</title>
			</head>
			<body>
                <div id="petCanvasContainer">
                    <canvas id="ballCanvas"></canvas>
                    <canvas id="foregroundEffectCanvas"></canvas>
                    <canvas id="backgroundEffectCanvas"></canvas>
                </div>
				<div id="petsContainer"></div>
				<div id="foreground"></div>
                <div id="background"></div>
			</body>
			</html>`;

    var jsdom = require('jsdom');
    var document = new jsdom.JSDOM(html);
    var window = document.window;

    global.document = window.document;
    global.window = window;
    window.console = global.console;
}

class MockState implements VscodeStateApi {
    counter: number = 1;
    states: Array<PetElementState> | undefined = undefined;
    sentMessages: Array<WebviewMessage> = [];

    getState(): PetPanelState | undefined {
        if (!this.states) {
            return undefined;
        }
        return {
            petCounter: this.counter,
            petStates: this.states,
        };
    }

    // eslint-disable-next-line no-unused-vars
    setState(state: PetPanelState): void {
        this.counter = state.petCounter ?? this.counter;
        this.states = state.petStates ?? this.states;
    }

    // eslint-disable-next-line no-unused-vars
    postMessage(message: WebviewMessage): void {
        this.sentMessages.push(message);
    }

    getMessages(): Array<WebviewMessage> {
        return this.sentMessages;
    }

    reset() {
        this.counter = 1;
        this.states = undefined;
    }
}

mockPanelWindow();

import * as panel from '../../panel/main';
import { Cat } from '../../panel/pets/cat';

suite('Pets Test Suite', () => {
    void vscode.window.showInformationMessage('Start all tests.');

    test('Test pet collection', () => {
        var collection = new pets.PetCollection();
        const petImageEl = global.document.createElement(
            'image',
        ) as HTMLImageElement;
        const petDivEl = global.document.createElement('div') as HTMLDivElement;
        const petSpeechEl = global.document.createElement(
            'div',
        ) as HTMLDivElement;
        const testPet = pets.createPet(
            'cat',
            petImageEl,
            petDivEl,
            petSpeechEl,
            PetSize.medium,
            0,
            0,
            'testPet',
            0,
            'Jerry',
        );
        assert.ok(testPet instanceof Cat);
        assert.equal(testPet.emoji, '🐱');
        assert.equal(testPet.name, 'Jerry');

        const testPetElement = new pets.PetElement(
            petImageEl,
            petDivEl,
            petSpeechEl,
            testPet,
            PetColor.brown,
            PetType.cat,
        );
        assert.strictEqual(testPetElement.color, PetColor.brown);
        assert.strictEqual(testPetElement.type, PetType.cat);

        assert.strictEqual(collection.locate('Jerry'), undefined);

        collection.push(testPetElement);
        assert.strictEqual(collection.locate('Jerry'), testPetElement);

        collection.remove(testPetElement);
        assert.strictEqual(collection.locate('Jerry'), undefined);
    });

    ALL_THEMES.forEach((theme) => {
        ALL_PETS.forEach((petType) => {
            test(
                'Test panel app initialization with theme and ' +
                    String(petType) +
                    ' and ' +
                    String(theme),
                () => {
                    const mockState = new MockState();
                    const color = pets.normalizeColor(PetColor.black, petType);
                    panel.allPets.reset();
                    mockState.reset();
                    panel.petPanelApp(
                        'https://test.com',
                        theme,
                        ColorThemeKind.dark,
                        color,
                        PetSize.large,
                        petType,
                        false,
                        false,
                        mockState,
                    );

                    if (theme !== Theme.none) {
                        assert.notStrictEqual(
                            document.getElementById('background')?.style
                                .backgroundImage,
                            '',
                        );
                        assert.notStrictEqual(
                            document.getElementById('foreground')?.style
                                .backgroundImage,
                            '',
                        );
                    } else {
                        assert.strictEqual(
                            document.getElementById('background')?.style
                                .backgroundImage,
                            '',
                        );
                        assert.strictEqual(
                            document.getElementById('foreground')?.style
                                .backgroundImage,
                            '',
                        );
                    }

                    assert.equal(mockState.getState()?.petStates?.length, 1);

                    const firstPet: PetElementState = (mockState.getState()
                        ?.petStates ?? [])[0];
                    assert.equal(firstPet.petType, petType);
                    assert.equal(firstPet.petColor, color);

                    const createdPets = panel.allPets.pets;
                    assert.notEqual(createdPets.at(0), undefined);

                    assert.equal(createdPets.at(0)?.color, color);

                    /// Cycle 1000 frames
                    for (var i = 0; i < 1000; i++) {
                        createdPets.at(0)?.pet.nextFrame();
                        assert.notEqual(
                            createdPets.at(0)?.pet.getState(),
                            undefined,
                        );
                    }
                },
            );
        });
    });

    test('Test panel app initialization with no theme', () => {
        const mockState = new MockState();
        panel.allPets.reset();
        mockState.reset();
        panel.petPanelApp(
            'https://test.com',
            Theme.none,
            ColorThemeKind.dark,
            PetColor.black,
            PetSize.large,
            PetType.cat,
            false,
            false,
            mockState,
        );

        assert.strictEqual(
            document.getElementById('background')?.style.backgroundImage,
            '',
        );
        assert.strictEqual(
            document.getElementById('foreground')?.style.backgroundImage,
            '',
        );
    });

    test('Test post message to panel', () => {
        const mockState = new MockState();
        panel.allPets.reset();
        mockState.reset();
        panel.petPanelApp(
            'https://test.com',
            Theme.none,
            ColorThemeKind.dark,
            PetColor.black,
            PetSize.large,
            PetType.cat,
            false,
            false,
            mockState,
        );

        assert.strictEqual(
            document.getElementById('background')?.style.backgroundImage,
            '',
        );
        assert.strictEqual(
            document.getElementById('foreground')?.style.backgroundImage,
            '',
        );
        const message = new MessageEvent('command', {
            data: { message: 'roll-call' },
        });
        window.postMessage(message, '/');

        // assert.notEqual(mockState.getMessages().length, 0);
    });
});

suite('Finley Test Suite', () => {
    const extensionRoot = path.resolve(__dirname, '../../..');
    const mediaRoot = path.join(extensionRoot, 'media', 'finley');
    const spriteNames = [
        'idle',
        'walk',
        'walk_fast',
        'run',
        'swipe',
        'with_ball',
    ];

    function createFinley(size: PetSize = PetSize.small) {
        const image = document.createElement('img');
        image.width = 30;
        const pet = pets.createPet(
            PetType.finley,
            image,
            document.createElement('div'),
            document.createElement('div'),
            size,
            100,
            0,
            path.join(mediaRoot, 'blue'),
            0,
            'Finley Custom',
        );
        assert.ok(pet instanceof Finley);
        return { pet, image };
    }

    test('Registers Finley with the original color and default name', () => {
        const { pet } = createFinley();
        assert.ok(ALL_PETS.includes(PetType.finley));
        assert.ok(ALL_COLORS.includes(PetColor.blue));
        assert.deepStrictEqual(pets.availableColors(PetType.finley), [
            PetColor.blue,
        ]);
        assert.strictEqual(
            pets.normalizeColor(PetColor.blue, PetType.finley),
            PetColor.blue,
        );
        assert.strictEqual(
            pets.normalizeColor(PetColor.brown, PetType.finley),
            PetColor.blue,
        );
        assert.strictEqual(randomName(PetType.finley), 'Finley');
        assert.strictEqual(pet.name, 'Finley Custom');
        assert.strictEqual(pet.label, 'finley');
        assert.strictEqual(pet.emoji, '🔷');
        assert.ok(pet.hello.includes('Finley'));
        assert.ok(pet.speed >= PetSpeed.normal * 0.7);
        assert.ok(pet.speed <= PetSpeed.normal * 1.3);
        assert.ok(pet.canChase);
        assert.ok(pet.canSwipe);
    });

    ALL_SCALES.forEach((size, index) => {
        test(`Supports Finley at ${size} size`, () => {
            const { image } = createFinley(size);
            const width = `${[30, 40, 55, 110][index]}px`;
            assert.strictEqual(image.style.maxWidth, width);
            assert.strictEqual(image.style.maxHeight, width);
        });
    });

    test('Maps ground states to the correct sprites and directions', () => {
        const { pet, image } = createFinley();
        const states: [States, string, string][] = [
            [States.sitIdle, 'idle', 'scaleX(1)'],
            [States.walkRight, 'walk', 'scaleX(1)'],
            [States.walkLeft, 'walk', 'scaleX(-1)'],
            [States.runRight, 'walk_fast', 'scaleX(1)'],
            [States.runLeft, 'walk_fast', 'scaleX(-1)'],
            [States.idleWithBall, 'with_ball', 'scaleX(-1)'],
        ];
        for (const [state, sprite, direction] of states) {
            pet.recoverState({ currentStateEnum: state });
            pet.nextFrame();
            assert.ok(image.src.endsWith(`blue_${sprite}_8fps.gif`));
            assert.strictEqual(image.style.transform, direction);
        }
        for (const state of pet.sequence.sequenceStates) {
            assert.ok(state.possibleNextStates.length > 0);
            for (const next of state.possibleNextStates) {
                assert.ok(
                    pet.sequence.sequenceStates.some(
                        (entry) => entry.state === next,
                    ),
                );
            }
        }
    });

    test('Waves on hover and restores the interrupted movement', () => {
        const { pet, image } = createFinley();
        pet.recoverState({ currentStateEnum: States.walkRight });
        const interrupted = pet.currentState;
        pet.swipe();
        pet.nextFrame();
        assert.ok(image.src.endsWith('blue_swipe_8fps.gif'));
        pet.swipe();
        for (let frame = 0; frame < 15; frame++) {
            pet.nextFrame();
        }
        assert.strictEqual(pet.currentStateEnum, States.walkRight);
        assert.strictEqual(pet.currentState, interrupted);
        pet.nextFrame();
        assert.ok(image.src.endsWith('blue_walk_8fps.gif'));
    });

    test('Catches and holds a ball, and handles cancelled chases', () => {
        const { pet, image } = createFinley();
        const canvas = document.createElement('canvas');
        canvas.height = 100;
        const ball = new BallState(pet.left + pet.speed / 2, 100, 0, 0);
        pet.chase(ball, canvas);
        pet.nextFrame();
        assert.ok(image.src.endsWith('blue_run_8fps.gif'));
        assert.strictEqual(ball.paused, true);
        assert.strictEqual(canvas.style.display, 'none');
        assert.strictEqual(pet.currentStateEnum, States.idleWithBall);
        pet.nextFrame();
        assert.ok(image.src.endsWith('blue_with_ball_8fps.gif'));
        for (let frame = 0; frame < 30; frame++) {
            pet.nextFrame();
        }
        assert.notStrictEqual(pet.currentStateEnum, States.idleWithBall);
        pet.chase(ball, canvas);
        pet.nextFrame();
        assert.notStrictEqual(pet.currentStateEnum, States.chase);
    });

    test('Plays chase with friends and returns to normal behavior', () => {
        const { pet, image } = createFinley();
        const friend = createFinley().pet;
        friend.positionLeft(200);
        friend.recoverState({ currentStateEnum: States.runRight });
        assert.ok(pet.makeFriendsWith(friend));
        pet.nextFrame();
        assert.strictEqual(pet.currentStateEnum, States.chaseFriend);
        pet.nextFrame();
        assert.ok(image.src.endsWith('blue_run_8fps.gif'));
        friend.recoverState({ currentStateEnum: States.sitIdle });
        pet.nextFrame();
        assert.notStrictEqual(pet.currentStateEnum, States.chaseFriend);
    });

    test('Persists Finley identity, custom name, color and ground state', () => {
        const mockState = new MockState();
        const { pet, image } = createFinley();
        pet.recoverState({ currentStateEnum: States.walkLeft });
        panel.allPets.reset();
        panel.allPets.push(
            new pets.PetElement(
                image,
                document.createElement('div'),
                document.createElement('div'),
                pet,
                PetColor.blue,
                PetType.finley,
            ),
        );
        panel.saveState(mockState);
        panel.allPets.reset();
        panel.petPanelApp(
            vscode.Uri.file(path.join(extensionRoot, 'media')).toString(),
            Theme.none,
            ColorThemeKind.dark,
            PetColor.blue,
            PetSize.small,
            PetType.finley,
            false,
            true,
            mockState,
        );
        assert.strictEqual(panel.allPets.pets.length, 1);
        const restored = panel.allPets.pets[0];
        assert.ok(restored.pet instanceof Finley);
        assert.strictEqual(restored.pet.name, 'Finley Custom');
        assert.strictEqual(restored.type, PetType.finley);
        assert.strictEqual(restored.color, PetColor.blue);
        assert.strictEqual(
            restored.pet.getState().currentStateEnum,
            States.walkLeft,
        );
        restored.pet.nextFrame();
        assert.ok(restored.el.src.endsWith('blue_walk_8fps.gif'));
        panel.allPets.reset();
    });

    test('Ships every required GIF, icon and Microsoft license', () => {
        for (const sprite of spriteNames) {
            const gif = readFileSync(
                path.join(mediaRoot, `blue_${sprite}_8fps.gif`),
            );
            assert.strictEqual(gif.toString('ascii', 0, 6), 'GIF89a');
            assert.strictEqual(gif.readUInt16LE(6), 128);
            assert.strictEqual(gif.readUInt16LE(8), 128);
            assert.ok(gif.includes(Buffer.from('NETSCAPE2.0')));
        }
        const icon = readFileSync(path.join(mediaRoot, 'icon.png'));
        assert.strictEqual(icon.toString('ascii', 1, 4), 'PNG');
        assert.strictEqual(icon.readUInt32BE(16), 32);
        assert.strictEqual(icon.readUInt32BE(20), 32);
        const license = readFileSync(path.join(mediaRoot, 'LICENSE'), 'utf8');
        assert.ok(license.includes('Copyright (c) Microsoft Corporation.'));
        assert.ok(license.includes('Permission is hereby granted'));
    });

    test('Aligns settings entries and localized labels', () => {
        const manifest: {
            contributes: {
                configuration: {
                    properties: Record<
                        string,
                        { enum: string[]; enumItemLabels: string[] }
                    >;
                }[];
            };
        } = JSON.parse(
            readFileSync(path.join(extensionRoot, 'package.json'), 'utf8'),
        );
        const labels: Record<string, string> = JSON.parse(
            readFileSync(path.join(extensionRoot, 'package.nls.json'), 'utf8'),
        );
        for (const [setting, value] of [
            ['petType', 'finley'],
            ['petColor', 'blue'],
        ]) {
            const property =
                manifest.contributes.configuration[0].properties[
                    `vscode-pets.${setting}`
                ];
            const index = property.enum.indexOf(value);
            const key = `vscode-pets.${setting}.${value}`;
            assert.ok(index >= 0);
            assert.strictEqual(
                property.enum.length,
                property.enumItemLabels.length,
            );
            assert.strictEqual(property.enumItemLabels[index], `%${key}%`);
            assert.ok(labels[key]);
        }
        const runtimeLabels: Record<string, string> = JSON.parse(
            readFileSync(
                path.join(extensionRoot, 'l10n', 'bundle.l10n.json'),
                'utf8',
            ),
        );
        assert.strictEqual(runtimeLabels.finley, 'Finley');
    });

    test('Accepts Finley and blue from extension configuration', async () => {
        const configuration = vscode.workspace.getConfiguration('vscode-pets');
        const originalType =
            configuration.inspect<PetType>('petType')?.globalValue;
        const originalColor =
            configuration.inspect<PetColor>('petColor')?.globalValue;
        try {
            await configuration.update(
                'petType',
                PetType.finley,
                vscode.ConfigurationTarget.Global,
            );
            await configuration.update(
                'petColor',
                PetColor.blue,
                vscode.ConfigurationTarget.Global,
            );
            const pet = PetSpecification.fromConfiguration();
            assert.strictEqual(pet.type, PetType.finley);
            assert.strictEqual(pet.color, PetColor.blue);
            assert.strictEqual(pet.name, 'Finley');
        } finally {
            await configuration.update(
                'petType',
                originalType,
                vscode.ConfigurationTarget.Global,
            );
            await configuration.update(
                'petColor',
                originalColor,
                vscode.ConfigurationTarget.Global,
            );
        }
    });
});

suite('Change Theme Test Suite', () => {
    const COMMAND = 'vscode-pets.change-theme';
    const originalShowQuickPick = vscode.window.showQuickPick;

    suiteSetup(async () => {
        await vscode.extensions
            .getExtension('tonybaloney.vscode-pets')
            ?.activate();
    });

    teardown(async () => {
        (vscode.window as any).showQuickPick = originalShowQuickPick;
        await vscode.workspace
            .getConfiguration('vscode-pets')
            .update('theme', Theme.none, vscode.ConfigurationTarget.Global);
    });

    test('Test change-theme command is registered', async () => {
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes(COMMAND));
    });

    test('Test change-theme QuickPick lists all themes', async () => {
        let captured: any[] = [];
        (vscode.window as any).showQuickPick = (items: any[]) => {
            captured = items;
            return Promise.resolve(undefined);
        };
        await vscode.commands.executeCommand(COMMAND);
        assert.deepStrictEqual(
            captured.map((i) => i.value),
            ALL_THEMES,
        );
    });

    ALL_THEMES.forEach((theme) => {
        test('Test change-theme persists ' + String(theme), async () => {
            (vscode.window as any).showQuickPick = () =>
                Promise.resolve({ label: String(theme), value: theme });
            await vscode.commands.executeCommand(COMMAND);
            assert.strictEqual(
                vscode.workspace
                    .getConfiguration('vscode-pets')
                    .get<Theme>('theme'),
                theme,
            );
        });
    });

    test('Test change-theme cancel leaves theme unchanged', async () => {
        await vscode.workspace
            .getConfiguration('vscode-pets')
            .update('theme', Theme.forest, vscode.ConfigurationTarget.Global);
        (vscode.window as any).showQuickPick = () => Promise.resolve(undefined);
        await vscode.commands.executeCommand(COMMAND);
        assert.strictEqual(
            vscode.workspace
                .getConfiguration('vscode-pets')
                .get<Theme>('theme'),
            Theme.forest,
        );
    });
});
