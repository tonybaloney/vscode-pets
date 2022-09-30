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
            window: Window;
            navigator: Navigator;
        }
    }
}

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = global.document.defaultView;

suite('Pets Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Test pet collection', () => {
        var collection = new pets.PetCollection();
        const petImageEl = new HTMLImageElement();
        const petDivEl = new HTMLDivElement();
        const testPet = pets.createPet(
            'cat',
            petImageEl,
            petDivEl,
            PetSize.medium,
            0,
            0,
            'testPet',
            0,
            'Jerry',
        );
        assert(testPet instanceof pets.Cat);
        assert(testPet.emoji() === '🐱');
        assert(testPet.name() === 'Jerry');

        const testPetElement = new pets.PetElement(
            petImageEl,
            petDivEl,
            testPet,
            PetColor.brown,
            PetType.cat,
        );
        assert(testPetElement.color === PetColor.brown);
        assert(testPetElement.type === PetType.cat);

        assert(collection.locate('Jerry') === undefined);

        collection.push(testPetElement);
        assert(collection.locate('Jerry') === testPetElement);

        collection.remove('Jerry');
        assert(collection.locate('Jerry') === undefined);
    });
});
