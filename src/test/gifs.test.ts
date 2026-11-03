import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { spawnSync } from 'child_process';
import { checkGifFilenames, readArchivedFiles } from './gifs';

suite('GIF filename validator', () => {
    let folder: string;
    let errors: string[];
    let warnings: string[];
    const logger = {
        error: (message: string) => errors.push(message),
        warn: (message: string) => warnings.push(message),
    };

    setup(() => {
        folder = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-pets-gifs-'));
        errors = [];
        warnings = [];
    });

    teardown(() => {
        fs.rmSync(folder, { recursive: true, force: true });
    });

    test('Accepts a complete asset inventory', () => {
        assert.strictEqual(
            checkGifFilenames(() => true, logger),
            true,
        );
        assert.deepStrictEqual(errors, []);
        assert.deepStrictEqual(warnings, []);
    });

    test('Reports every missing GIF, including legacy and new colors', () => {
        const missing = new Set([
            'cat/black_idle_8fps.gif',
            'cat/solid_white_walk_fast_8fps.gif',
        ]);
        assert.strictEqual(
            checkGifFilenames((filename) => !missing.has(filename), logger),
            false,
        );
        assert.strictEqual(errors.length, missing.size);
        for (const filename of missing) {
            assert.ok(errors.some((message) => message.includes(filename)));
        }
    });

    test('Allows an existing default icon with a warning', () => {
        assert.strictEqual(
            checkGifFilenames(
                (filename) => filename !== 'cat/icon_solid_white.png',
                logger,
            ),
            true,
        );
        assert.deepStrictEqual(errors, []);
        assert.strictEqual(warnings.length, 1);
        assert.ok(warnings[0].includes('Using default icon'));
    });

    test('Rejects missing color and default icons', () => {
        assert.strictEqual(
            checkGifFilenames(
                (filename) =>
                    filename !== 'cat/icon_solid_white.png' &&
                    filename !== 'cat/icon.png',
                logger,
            ),
            false,
        );
        assert.strictEqual(errors.length, 1);
        assert.ok(errors[0].includes('cat/icon_solid_white.png'));
    });

    test('Rejects an empty asset inventory', () => {
        assert.strictEqual(
            checkGifFilenames(() => false, logger),
            false,
        );
        assert.ok(errors.length > 0);
    });

    test('Reads both ZIP directories without decrypting their contents', async () => {
        // Encrypted dummy text, not an image or a production asset.
        const fixture = Buffer.from(
            'UEsDBBQACQAIAKlIZF0AAAAAAAAAAAAAAAALACAAZml4dHVyZS50eHR1eAsAAQQAAAAABAAAAABVVA0AB59a6mqfWupqn1rqaiRHDKGkgtrNGDnJ5jiHKNSdUcBgIFBLBwjuQOUFFQAAAAcAAABQSwECFAMUAAkACACpSGRd7kDlBRUAAAAHAAAACwAYAAAAAAAAAAAAtoEAAAAAZml4dHVyZS50eHR1eAsAAQQAAAAABAAAAABVVAUAAZ9a6mpQSwUGAAAAAAEAAQBRAAAAbgAAAAAA',
            'base64',
        );
        for (const filename of ['extra.zip', 'extraIcons.zip']) {
            const archivePath = path.join(folder, filename);
            fs.writeFileSync(archivePath, fixture);
            assert.deepStrictEqual(
                await readArchivedFiles(folder),
                new Set(['fixture.txt']),
            );
            fs.unlinkSync(archivePath);
        }
    });

    test('Rejects a corrupt archive instead of ignoring it', async () => {
        fs.writeFileSync(path.join(folder, 'extra.zip'), 'not a ZIP');
        await assert.rejects(readArchivedFiles(folder), /Cannot read/);
    });

    test('Allows archives to be absent after extraction', async () => {
        assert.deepStrictEqual(await readArchivedFiles(folder), new Set());
    });

    test('CLI exits nonzero for missing GIFs, icons, and an empty media folder', function () {
        this.timeout(10000);
        const run = () =>
            spawnSync(process.execPath, [path.join(__dirname, 'gifs.js')], {
                cwd: folder,
                encoding: 'utf8',
            });
        assert.strictEqual(run().status, 1);

        checkGifFilenames((filename) => {
            const filePath = path.join(folder, 'media', filename);
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, '');
            return true;
        });
        const complete = run();
        assert.strictEqual(complete.status, 0, complete.stderr);

        const gif = path.join(
            folder,
            'media',
            'cat',
            'solid_white_walk_fast_8fps.gif',
        );
        fs.unlinkSync(gif);
        const missingGif = run();
        assert.strictEqual(missingGif.status, 1);
        assert.ok(
            missingGif.stderr.includes('cat/solid_white_walk_fast_8fps.gif'),
        );

        fs.writeFileSync(gif, '');
        fs.unlinkSync(
            path.join(folder, 'media', 'cat', 'icon_solid_white.png'),
        );
        const missingIcon = run();
        assert.strictEqual(missingIcon.status, 1);
        assert.ok(missingIcon.stderr.includes('cat/icon_solid_white.png'));
    });

    test('CLI exits nonzero for a corrupt archive', function () {
        this.timeout(10000);
        fs.mkdirSync(path.join(folder, 'media'));
        fs.writeFileSync(path.join(folder, 'media', 'extra.zip'), 'not a ZIP');
        const result = spawnSync(
            process.execPath,
            [path.join(__dirname, 'gifs.js')],
            { cwd: folder, encoding: 'utf8' },
        );
        assert.strictEqual(result.status, 1);
        assert.ok(result.stderr.includes('Cannot read'));
    });
});
