import {
    PetSize,
    PetColor,
    ExtPosition,
    Theme,
    PetType,
} from '../common/types';

export const EXTRA_PETS_KEY = 'vscode-pets.extra-pets';
export const EXTRA_PETS_KEY_TYPES = EXTRA_PETS_KEY + '.types';
export const EXTRA_PETS_KEY_COLORS = EXTRA_PETS_KEY + '.colors';
export const EXTRA_PETS_KEY_NAMES = EXTRA_PETS_KEY + '.names';
export const DEFAULT_PET_SCALE = PetSize.nano;
export const DEFAULT_COLOR = PetColor.brown;
export const DEFAULT_POSITION = ExtPosition.panel;
export const DEFAULT_THEME = Theme.none;
export const DEFAULT_PET_TYPE = PetType.cat;
