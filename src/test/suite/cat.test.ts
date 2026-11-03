import * as assert from 'assert';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ALL_COLORS, PetColor, PetType } from '../../common/types';
import { availableColors, normalizeColor } from '../../panel/pets';
import { Cat } from '../../panel/pets/cat';

suite('Cat Coat Registration', () => {
    const root = path.resolve(__dirname, '..', '..', '..');
    const catalog: {
        color: PetColor;
        reviewId: string;
        label: string;
        group: string;
    }[] = JSON.parse(
        readFileSync(path.join(root, 'media', 'cat-colors.json'), 'utf8'),
    );
    const legacy = [
        PetColor.black,
        PetColor.brown,
        PetColor.gray,
        PetColor.lightbrown,
        PetColor.orange,
        PetColor.white,
    ];

    test('Preserves saved colors and adds the 17 catalogued coats', () => {
        assert.strictEqual(catalog.length, 17);
        assert.deepStrictEqual(Cat.possibleColors, [
            ...legacy,
            ...catalog.map((coat) => coat.color),
        ]);
        assert.deepStrictEqual(
            availableColors(PetType.cat),
            Cat.possibleColors,
        );
        assert.strictEqual(new Set(Cat.possibleColors).size, 23);
        for (const color of Cat.possibleColors) {
            assert.ok(ALL_COLORS.includes(color));
            assert.strictEqual(normalizeColor(color, PetType.cat), color);
        }
        assert.ok(!catalog.some((coat) => legacy.includes(coat.color)));
        assert.strictEqual(
            catalog.find((coat) => coat.color === PetColor.solidWhite)
                ?.reviewId,
            'white',
        );
    });

    test('Aligns settings, default labels and archive generation groups', () => {
        const manifest = JSON.parse(
            readFileSync(path.join(root, 'package.json'), 'utf8'),
        );
        const setting =
            manifest.contributes.configuration[0].properties[
                'vscode-pets.petColor'
            ];
        assert.strictEqual(setting.enum.length, setting.enumItemLabels.length);
        const settingsLabels: Record<string, string> = JSON.parse(
            readFileSync(path.join(root, 'package.nls.json'), 'utf8'),
        );
        const runtimeLabels: Record<string, string> = JSON.parse(
            readFileSync(path.join(root, 'l10n', 'bundle.l10n.json'), 'utf8'),
        );
        for (const coat of catalog) {
            const index = setting.enum.indexOf(coat.color);
            const key = `vscode-pets.petColor.${coat.color}`;
            assert.ok(index >= 0);
            assert.strictEqual(setting.enumItemLabels[index], `%${key}%`);
            assert.strictEqual(settingsLabels[key], coat.label);
            assert.strictEqual(runtimeLabels[coat.color], coat.label);
            assert.match(coat.color.replace(' ', '_'), /^[a-z]+(?:_[a-z]+)?$/);
        }
        assert.strictEqual(
            catalog.filter((coat) => coat.group === 'palette-swaps').length,
            9,
        );
        assert.strictEqual(
            catalog.filter((coat) => coat.group === 'new-region-masks').length,
            8,
        );
    });
});
