/**
 * Clippy pattern matching tests
 */

import * as assert from 'assert';
import {
    findPatternsInLine,
    findMatchAtPosition,
    getLanguage,
    getTipForPattern,
    getPattern,
    getPatternNames,
} from '../extension/clippy/languages/index.js';
import { typescript } from '../extension/clippy/languages/typescript/index.js';
import type { PatternMatch } from '../extension/clippy/types.js';

suite('Clippy Tests', () => {
    suite('Pattern Detection', () => {
        test('finds console.log', () => {
            const matches = findPatternsInLine(
                'console.log("hi")',
                'typescript',
            );
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'console');
        });

        test('finds TODO comments', () => {
            const matches = findPatternsInLine('// TODO: fix', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'todo');
        });

        test('finds FIXME comments', () => {
            const matches = findPatternsInLine(
                '// FIXME: broken',
                'typescript',
            );
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'fixme');
        });

        test('finds function declarations', () => {
            const matches = findPatternsInLine(
                'function foo() {',
                'typescript',
            );
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'function');
        });

        test('finds arrow functions', () => {
            const matches = findPatternsInLine(
                'const fn = () => {}',
                'typescript',
            );
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'arrowFunction');
        });

        test('finds class declarations', () => {
            const matches = findPatternsInLine('class Foo {', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'class');
        });

        test('finds debugger statements', () => {
            const matches = findPatternsInLine('debugger;', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'debugger');
        });

        test('finds await keyword', () => {
            const matches = findPatternsInLine('await fetch()', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'asyncAwait');
        });

        test('finds try blocks', () => {
            const matches = findPatternsInLine('try {', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'tryCatch');
        });

        test('finds magic numbers', () => {
            const matches = findPatternsInLine('const x = 3000;', 'typescript');
            assert.strictEqual(matches.length, 1);
            assert.strictEqual(matches[0].name, 'magicNumber');
        });

        test('ignores small numbers', () => {
            const matches = findPatternsInLine('const x = 42;', 'typescript');
            const magic = matches.filter(
                (m: PatternMatch) => m.name === 'magicNumber',
            );
            assert.strictEqual(magic.length, 0);
        });

        test('finds multiple patterns', () => {
            const matches = findPatternsInLine(
                'console.log("x"); // TODO',
                'typescript',
            );
            assert.strictEqual(matches.length, 2);
        });

        test('returns empty for unknown language', () => {
            const matches = findPatternsInLine('console.log("x")', 'cobol');
            assert.strictEqual(matches.length, 0);
        });

        test('returns empty for empty line', () => {
            const matches = findPatternsInLine('', 'typescript');
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

        test('getPatternNames returns pattern list', () => {
            const names = getPatternNames('typescript');
            assert.ok(names.includes('console'));
            assert.ok(names.includes('todo'));
        });
    });

    suite('Position Matching', () => {
        test('finds match at cursor position', () => {
            const match = findMatchAtPosition(
                'console.log("x")',
                5,
                'typescript',
            );
            assert.strictEqual(match?.name, 'console');
        });

        test('returns null when cursor not on pattern', () => {
            const match = findMatchAtPosition('const x = 5;', 5, 'typescript');
            assert.strictEqual(match, null);
        });
    });

    suite('Tips', () => {
        test('all patterns have at least 3 tips', () => {
            for (const pattern of typescript.patterns) {
                assert.ok(
                    pattern.tipCount >= 3,
                    `${pattern.name} has ${pattern.tipCount} tips, expected >= 3`,
                );
            }
        });

        test('getTipForPattern returns string', () => {
            const tip = getTipForPattern('console', 'helpful', 'typescript');
            assert.strictEqual(typeof tip, 'string');
        });

        test('getPattern returns pattern info', () => {
            const pattern = getPattern('console', 'typescript');
            assert.strictEqual(pattern?.name, 'console');
            assert.ok(pattern?.tipCount !== undefined);
        });
    });
});
