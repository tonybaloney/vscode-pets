/**
 * Clippy trigger matching tests
 */

import * as assert from 'assert';
import {
    findTriggersInLine,
    findTriggerAtPosition,
    getLanguage,
    getMessageForTrigger,
    getTrigger,
    getTriggerNames,
} from '../extension/clippy/languages/index.js';
import { typescript } from '../extension/clippy/languages/typescript/index.js';
import type { TriggerMatch } from '../extension/clippy/types.js';

suite('Clippy Tests', () => {
    suite('Trigger Detection', () => {
        test('finds console.log', () => {
            const matches = findTriggersInLine(
                'console.log("hi")',
                'typescript',
            );
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'console');
        });

        test('finds TODO comments', () => {
            const matches = findTriggersInLine('// TODO: fix', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'todo');
        });

        test('finds FIXME comments', () => {
            const matches = findTriggersInLine(
                '// FIXME: broken',
                'typescript',
            );
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'fixme');
        });

        test('finds function declarations', () => {
            const matches = findTriggersInLine(
                'function foo() {',
                'typescript',
            );
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'function');
        });

        test('finds arrow functions', () => {
            const matches = findTriggersInLine(
                'const fn = () => {}',
                'typescript',
            );
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'arrowFunction');
        });

        test('finds class declarations', () => {
            const matches = findTriggersInLine('class Foo {', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'class');
        });

        test('finds debugger statements', () => {
            const matches = findTriggersInLine('debugger;', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'debugger');
        });

        test('finds await keyword', () => {
            const matches = findTriggersInLine('await fetch()', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'asyncAwait');
        });

        test('finds try blocks', () => {
            const matches = findTriggersInLine('try {', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'tryCatch');
        });

        test('finds magic numbers', () => {
            const matches = findTriggersInLine('const x = 3000;', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'magicNumber');
        });

        test('ignores small numbers', () => {
            const matches = findTriggersInLine('const x = 42;', 'typescript');
            const magic = matches.filter(
                (m: TriggerMatch) => m.name === 'magicNumber',
            );
            assert.strictEqual(magic.length, 0);
        });

        test('finds multiple triggers', () => {
            const matches = findTriggersInLine(
                'console.log("x"); // TODO',
                'typescript',
            );
            assert.strictEqual(matches.length, 2);
        });

        test('returns empty for unknown language', () => {
            const matches = findTriggersInLine('console.log("x")', 'cobol');
            assert.strictEqual(matches.length, 0);
        });

        test('returns empty for empty line', () => {
            const matches = findTriggersInLine('', 'typescript');
            assert.strictEqual(matches.length, 0);
        });
    });

    suite('Language Registry', () => {
        test('finds typescript', () => {
            const lang = getLanguage('typescript');
            assert.strictEqual(lang?.id, 'typescript');
        });

        test('finds javascript as typescript alias', () => {
            const lang = getLanguage('javascript');
            assert.strictEqual(lang?.id, 'typescript');
        });

        test('finds typescriptreact as alias', () => {
            const lang = getLanguage('typescriptreact');
            assert.strictEqual(lang?.id, 'typescript');
        });

        test('returns null for unknown language', () => {
            const lang = getLanguage('cobol');
            assert.strictEqual(lang, null);
        });

        test('getTriggerNames returns trigger list', () => {
            const names = getTriggerNames('typescript');
            assert.ok(names.includes('console'));
            assert.ok(names.includes('todo'));
        });
    });

    suite('Position Matching', () => {
        test('finds match at cursor position', () => {
            const match = findTriggerAtPosition(
                'console.log("x")',
                5,
                'typescript',
            );
            assert.strictEqual(match?.name, 'console');
        });

        test('returns null when cursor not on trigger', () => {
            const match = findTriggerAtPosition(
                'const x = 5;',
                5,
                'typescript',
            );
            assert.strictEqual(match, null);
        });
    });

    suite('Messages', () => {
        test('all triggers have at least 3 messages', () => {
            for (const trigger of typescript.triggers) {
                assert.ok(
                    trigger.messageCount >= 3,
                    `${trigger.name} has ${trigger.messageCount} messages, expected >= 3`,
                );
            }
        });

        test('getMessageForTrigger returns string', () => {
            const message = getMessageForTrigger(
                'console',
                'helpful',
                'typescript',
            );
            assert.strictEqual(typeof message, 'string');
        });

        test('getTrigger returns trigger info', () => {
            const trigger = getTrigger('console', 'typescript');
            assert.strictEqual(trigger?.name, 'console');
            assert.ok(trigger?.messageCount !== undefined);
        });
    });
});
