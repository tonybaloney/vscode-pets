import * as vscode from 'vscode';
import {
    PetSize,
    PetColor,
    PetType,
    ALL_PETS,
    ALL_COLORS,
} from '../common/types';
import { randomName } from '../common/names';
import * as defaults from './defaults';
import { getConfiguredSize } from './configuration';

export class PetSpecification {
    color: PetColor;
    type: PetType;
    size: PetSize;
    name: string;

    constructor(color: PetColor, type: PetType, size: PetSize, name?: string) {
        this.color = color;
        this.type = type;
        this.size = size;
        if (!name) {
            this.name = randomName(type);
        } else {
            this.name = name;
        }
    }

    static fromConfiguration(): PetSpecification {
        var color = vscode.workspace
            .getConfiguration('vscode-pets')
            .get<PetColor>('petColor', defaults.DEFAULT_COLOR);
        if (ALL_COLORS.lastIndexOf(color) === -1) {
            color = defaults.DEFAULT_COLOR;
        }
        var type = vscode.workspace
            .getConfiguration('vscode-pets')
            .get<PetType>('petType', defaults.DEFAULT_PET_TYPE);
        if (ALL_PETS.lastIndexOf(type) === -1) {
            type = defaults.DEFAULT_PET_TYPE;
        }

        return new PetSpecification(color, type, getConfiguredSize());
    }

    static collectionFromMemento(
        context: vscode.ExtensionContext,
        size: PetSize,
    ): PetSpecification[] {
        var contextTypes = context.globalState.get<PetType[]>(
            defaults.EXTRA_PETS_KEY_TYPES,
            [],
        );
        var contextColors = context.globalState.get<PetColor[]>(
            defaults.EXTRA_PETS_KEY_COLORS,
            [],
        );
        var contextNames = context.globalState.get<string[]>(
            defaults.EXTRA_PETS_KEY_NAMES,
            [],
        );
        var result: PetSpecification[] = new Array();
        for (let index = 0; index < contextTypes.length; index++) {
            result.push(
                new PetSpecification(
                    contextColors?.[index] ?? defaults.DEFAULT_COLOR,
                    contextTypes[index],
                    size,
                    contextNames[index],
                ),
            );
        }
        return result;
    }
}
