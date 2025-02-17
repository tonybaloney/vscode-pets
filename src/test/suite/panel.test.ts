import * as assert from 'assert';

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
} from '../../common/types';
import { PetElementState, PetPanelState } from '../../panel/states';
import * as pets from '../../panel/pets';

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
            false,
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
