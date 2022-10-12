import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';
import { join } from 'path';

function setupCoverage() {
    const NYC = require('nyc');
    const nyc = new NYC({
        cwd: join(__dirname, '..', '..', '..'),
        exclude: ['**/test/**', '.vscode-test/**'],
        reporter: ['text', 'html', 'lcov'],
        all: true,
        instrument: true,
        hookRequire: true,
        hookRunInContext: true,
        hookRunInThisContext: true,
    });

    nyc.reset();
    nyc.wrap();

    return nyc;
}

export async function run(): Promise<void> {
    const nyc = process.env.COVERAGE ? setupCoverage() : null;

    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true,
        require: [
            'ts-node/register',
            'source-map-support/register',
            'jsdom-global/register',
        ],
    });

    const testsRoot = path.resolve(__dirname, '..');

    return new Promise((c, e) => {
        glob('**/**.test.js', { cwd: testsRoot }, async (err, files) => {
            if (err) {
                return e(err);
            }

            // Add files to the test suite
            files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

            try {
                // Run the mocha test
                mocha.run((failures) => {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    } else {
                        c();
                    }
                });
            } catch (err) {
                console.error(err);
                e(err);
            } finally {
                if (nyc) {
                    nyc.writeCoverageFile();
                    await nyc.report();
                }
            }
        });
    });
}
