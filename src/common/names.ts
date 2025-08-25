import { BUNNY_NAMES } from '../panel/pets/bunny';
import { CAT_NAMES } from '../panel/pets/cat';
import { CHICKEN_NAMES } from '../panel/pets/chicken';
import { MORPH_NAMES } from '../panel/pets/morph';
import { CLIPPY_NAMES } from '../panel/pets/clippy';
import { COCKATIEL_NAMES } from '../panel/pets/cockatiel';
import { CRAB_NAMES } from '../panel/pets/crab';
import { DENO_NAMES } from '../panel/pets/deno';
import { DOG_NAMES } from '../panel/pets/dog';
import { FOX_NAMES } from '../panel/pets/fox';
import { FROG_NAMES } from '../panel/pets/frog';
import { MOD_NAMES } from '../panel/pets/mod';
import { FISH_NAMES } from '../panel/pets/fish';
import { PANDA_NAMES } from '../panel/pets/panda';
import { ROCKY_NAMES } from '../panel/pets/rocky';
import { DUCK_NAMES } from '../panel/pets/rubberduck';
import { SNAIL_NAMES } from '../panel/pets/snail';
import { SNAKE_NAMES } from '../panel/pets/snake';
import { TOTORO_NAMES } from '../panel/pets/totoro';
import { ZAPPY_NAMES } from '../panel/pets/zappy';
import { RAT_NAMES } from '../panel/pets/rat';
import { TURTLE_NAMES } from '../panel/pets/turtle';
import { HORSE_NAMES } from '../panel/pets/horse';
import { OCTOPUS_NAMES } from '../panel/pets/octopus';
import { PetType } from './types';

export function randomName(type: PetType): string {
    const collection: ReadonlyArray<string> =
        (
            {
                [PetType.bunny]: BUNNY_NAMES,
                [PetType.cat]: CAT_NAMES,
                [PetType.chicken]: CHICKEN_NAMES,
                [PetType.dog]: DOG_NAMES,
                [PetType.fox]: FOX_NAMES,
                [PetType.frog]: FROG_NAMES,
                [PetType.crab]: CRAB_NAMES,
                [PetType.clippy]: CLIPPY_NAMES,
                [PetType.deno]: DENO_NAMES,
                [PetType.mod]: MOD_NAMES,
                [PetType.totoro]: TOTORO_NAMES,
                [PetType.snail]: SNAIL_NAMES,
                [PetType.snake]: SNAKE_NAMES,
                [PetType.rubberduck]: DUCK_NAMES,
                [PetType.zappy]: ZAPPY_NAMES,
                [PetType.rocky]: ROCKY_NAMES,
                [PetType.cockatiel]: COCKATIEL_NAMES,
                [PetType.rat]: RAT_NAMES,
                [PetType.turtle]: TURTLE_NAMES,
                [PetType.horse]: HORSE_NAMES,
                [PetType.panda]: PANDA_NAMES,
                [PetType.octopus]: OCTOPUS_NAMES,
                [PetType.fish]: FISH_NAMES,
                [PetType.morph]: MORPH_NAMES,
            } as Record<PetType, ReadonlyArray<string>>
        )[type] ?? CAT_NAMES;

    return (
        collection[Math.floor(Math.random() * collection.length)] ?? 'Unknown'
    );
}
