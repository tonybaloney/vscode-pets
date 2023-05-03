import { CAT_NAMES } from '../panel/pets/cat';
import { CHICKEN_NAMES } from '../panel/pets/chicken';
import { CLIPPY_NAMES } from '../panel/pets/clippy';
import { COCKATIEL_NAMES } from '../panel/pets/cockatiel';
import { CRAB_NAMES } from '../panel/pets/crab';
import { DOG_NAMES } from '../panel/pets/dog';
import { FOX_NAMES } from '../panel/pets/fox';
import { MOD_NAMES } from '../panel/pets/mod';
import { ROCKY_NAMES } from '../panel/pets/rocky';
import { DUCK_NAMES } from '../panel/pets/rubberduck';
import { SNAKE_NAMES } from '../panel/pets/snake';
import { TOTORO_NAMES } from '../panel/pets/totoro';
import { ZAPPY_NAMES } from '../panel/pets/zappy';
import { RAT_NAMES } from '../panel/pets/rat';
import { TURTLE_NAMES } from '../panel/pets/turtle';
import { STICKBUG_NAMES } from '../panel/pets/stickbug';
import { CBAT_NAMES } from '../panel/pets/cbat';
import { CHUD_NAMES } from '../panel/pets/chud';
import { PetType } from './types';

export function randomName(type: PetType): string {
    const collection: ReadonlyArray<string> =
        (
            {
                [PetType.cat]: CAT_NAMES,
                [PetType.chicken]: CHICKEN_NAMES,
                [PetType.chud]: CHUD_NAMES,
                [PetType.dog]: DOG_NAMES,
                [PetType.fox]: FOX_NAMES,
                [PetType.crab]: CRAB_NAMES,
                [PetType.clippy]: CLIPPY_NAMES,
                [PetType.mod]: MOD_NAMES,
                [PetType.totoro]: TOTORO_NAMES,
                [PetType.snake]: SNAKE_NAMES,
                [PetType.rubberduck]: DUCK_NAMES,
                [PetType.zappy]: ZAPPY_NAMES,
                [PetType.rocky]: ROCKY_NAMES,
                [PetType.cockatiel]: COCKATIEL_NAMES,
                [PetType.rat]: RAT_NAMES,
                [PetType.turtle]: TURTLE_NAMES,
                [PetType.stickbug]: STICKBUG_NAMES,
                [PetType.cbat]: CBAT_NAMES,
            } as Record<PetType, ReadonlyArray<string>>
        )[type] ?? CAT_NAMES;

    return (
        collection[Math.floor(Math.random() * collection.length)] ?? 'Unknown'
    );
}
