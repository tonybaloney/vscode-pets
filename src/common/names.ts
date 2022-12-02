import { CAT_NAMES } from '../panel/pets/cat';
import { CLIPPY_NAMES } from '../panel/pets/clippy';
import { COCKATIEL_NAMES } from '../panel/pets/cockatiel';
import { CODEY_NAMES } from '../panel/pets/codey';
import { CRAB_NAMES } from '../panel/pets/crab';
import { DOG_NAMES } from '../panel/pets/dog';
import { MOD_NAMES } from '../panel/pets/mod';
import { ROCKY_NAMES } from '../panel/pets/rocky';
import { DUCK_NAMES } from '../panel/pets/rubberduck';
import { SNAKE_NAMES } from '../panel/pets/snake';
import { TOTORO_NAMES } from '../panel/pets/totoro';
import { ZAPPY_NAMES } from '../panel/pets/zappy';
import { PetType } from './types';

export function randomName(type: PetType): string {
    const collection: ReadonlyArray<string> =
        (
            {
                [PetType.cat]: CAT_NAMES,
                [PetType.dog]: DOG_NAMES,
                [PetType.crab]: CRAB_NAMES,
                [PetType.clippy]: CLIPPY_NAMES,
                [PetType.mod]: MOD_NAMES,
                [PetType.totoro]: TOTORO_NAMES,
                [PetType.snake]: SNAKE_NAMES,
                [PetType.rubberduck]: DUCK_NAMES,
                [PetType.zappy]: ZAPPY_NAMES,
                [PetType.rocky]: ROCKY_NAMES,
                [PetType.cockatiel]: COCKATIEL_NAMES,
                [PetType.codey]: CODEY_NAMES,
            } as Record<PetType, ReadonlyArray<string>>
        )[type] ?? CAT_NAMES;

    return (
        collection[Math.floor(Math.random() * collection.length)] ?? 'Unknown'
    );
}
