import * as path from 'path';
import { mkdtemp, rm } from 'fs/promises';
import { tmpdir } from 'os';

import { runTests } from '@vscode/test-electron';

async function main() {
    const profile = await mkdtemp(path.join(tmpdir(), 'vscode-pets-test-'));
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');

        // The path to test runner
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './suite/index');

        // Download VS Code, unzip it and run the integration test
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: [
                '--user-data-dir',
                path.join(profile, 'user-data'),
                '--extensions-dir',
                path.join(profile, 'extensions'),
                '--disable-extensions',
                '--disable-workspace-trust',
                '--skip-welcome',
                '--skip-release-notes',
            ],
        });
    } catch (err) {
        console.error('Failed to run tests', err);
        process.exitCode = 1;
    } finally {
        await rm(profile, { recursive: true, force: true });
    }
}

void main();
