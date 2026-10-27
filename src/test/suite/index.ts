import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';
import { join } from 'path';

async function setupCoverage() {
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

    const reset = nyc.reset();
    // Install hooks before yielding, while the extension host can still activate modules.
    nyc.wrap();
    await reset;

    return nyc;
}

export async function run(): Promise<void> {
    const nyc = process.env.COVERAGE ? await setupCoverage() : null;

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

    try {
        await new Promise<void>((resolve, reject) => {
            glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
                if (err) {
                    return reject(err);
                }

                try {
                    files.forEach((file) =>
                        mocha.addFile(path.resolve(testsRoot, file)),
                    );
                    mocha.run((failures) => {
                        if (failures > 0) {
                            reject(new Error(`${failures} tests failed.`));
                        } else {
                            resolve();
                        }
                    });
                } catch (error) {
                    reject(error);
                }
            });
        });
    } finally {
        if (nyc) {
            await nyc.writeCoverageFile();
            await nyc.report();
        }
    }
}
