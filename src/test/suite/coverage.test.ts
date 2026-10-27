import * as assert from 'assert';
import { readFileSync } from 'fs';
import * as path from 'path';
import { runInNewContext } from 'vm';

suite('Coverage Lifecycle Test Suite', () => {
    function mockRunner(failures = 0, failReport = false) {
        const events: string[] = [];
        const exports = { run: async (): Promise<void> => {} };

        class MockMocha {
            addFile() {}
            run(callback: (failures: number) => void) {
                events.push('tests-start');
                void Promise.resolve().then(() => {
                    events.push('tests-finish');
                    callback(failures);
                });
            }
        }

        class MockNyc {
            async reset() {
                events.push('reset-start');
                await Promise.resolve();
                events.push('reset-finish');
            }
            wrap() {
                events.push('hooks-installed');
            }
            async writeCoverageFile() {
                events.push('write');
            }
            async report() {
                events.push('report');
                if (failReport) {
                    throw new Error('Coverage report failed');
                }
            }
        }

        runInNewContext(
            readFileSync(path.join(__dirname, 'index.js'), 'utf8'),
            {
                exports,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                __dirname,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                process: { env: { COVERAGE: '1' } },
                require(name: string) {
                    switch (name) {
                        case 'path':
                            return path;
                        case 'mocha':
                            return MockMocha;
                        case 'nyc':
                            return MockNyc;
                        case 'glob':
                            return (
                                _pattern: string,
                                _options: object,
                                callback: (
                                    error: null,
                                    files: string[],
                                ) => void,
                            ) => callback(null, ['example.test.js']);
                        default:
                            throw new Error(`Unexpected dependency: ${name}`);
                    }
                },
            },
        );
        return { events, run: exports.run };
    }

    test('Installs hooks before yielding and reports after tests finish', async () => {
        const runner = mockRunner();
        await runner.run();
        assert.deepStrictEqual(runner.events, [
            'reset-start',
            'hooks-installed',
            'reset-finish',
            'tests-start',
            'tests-finish',
            'write',
            'report',
        ]);
    });

    test('Writes completed coverage even when a test fails', async () => {
        const runner = mockRunner(1);
        await assert.rejects(runner.run(), /1 tests failed/);
        assert.deepStrictEqual(runner.events.slice(-3), [
            'tests-finish',
            'write',
            'report',
        ]);
    });

    test('Propagates coverage-report failures', async () => {
        const runner = mockRunner(0, true);
        await assert.rejects(runner.run(), /Coverage report failed/);
    });
});
