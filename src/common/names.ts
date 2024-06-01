
import { DOG_NAMES } from '../panel/pets/dog';
import { PetType } from './types';

export function randomName(type: PetType): string {
    const collection: ReadonlyArray<string> =
        (
            {
                [PetType.dog]: DOG_NAMES,
            } as Record<PetType, ReadonlyArray<string>>
        )[type] ?? DOG_NAMES;

    return (
        collection[Math.floor(Math.random() * collection.length)] ?? 'Unknown'
    );
}
