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
} from '../../common/types';
import { PetElementState, PetPanelState } from '../../panel/states';
import * as pets from '../../panel/pets';

function mockPanelWindow() {
    const html =
        '<!doctype html><html><body><canvas id="petCanvas"></canvas><div id="petsContainer"></div><div id="foreground"></div></body></html>';

    var jsdom = require('jsdom');
    var document = new jsdom.JSDOM(html);
    var window = document.window;

    global.document = window.document;
    global.window = window;
    window.console = global.console;
}

class MockState implements VscodeStateApi {
    counter: number = 1;
    states: Array<PetElementState> = [];
    sentMessages: Array<WebviewMessage> = [];

    getState(): PetPanelState {
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
}

mockPanelWindow();

import * as panel from '../../panel/main';

suite('Pets Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

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
        assert.ok(testPet instanceof pets.Cat);
        assert.equal(testPet.emoji(), '🐱');
        assert.equal(testPet.name(), 'Jerry');

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

        collection.remove('Jerry');
        assert.strictEqual(collection.locate('Jerry'), undefined);
    });

    test('Test panel app initialization', () => {
        const mockState = new MockState();
        panel.petPanelApp(
            'https://test.com',
            Theme.beach,
            ColorThemeKind.dark,
            PetColor.black,
            PetSize.large,
            PetType.cat,
            mockState,
        );

        assert.notStrictEqual(document.body.style.backgroundImage, '');
        assert.notStrictEqual(
            document.getElementById('foreground')?.style.backgroundImage,
            '',
        );
    });
});
