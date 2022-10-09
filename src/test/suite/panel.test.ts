import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { PetSize, PetType, PetColor } from '../../common/types';
import * as pets from '../../panel/pets';

import { JSDOM } from 'jsdom';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
        }
    }
}

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;

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
});
