import { PetColor, PetSize, PetSpeed, PetType } from '../common/types';
import { Cat } from './pets/cat';
import { Chicken } from './pets/chicken';
import { Clippy } from './pets/clippy';
import { Cockatiel } from './pets/cockatiel';
import { Crab } from './pets/crab';
import { Dog } from './pets/dog';
import { Fox } from './pets/fox';
import { Mod } from './pets/mod';
import { Rocky } from './pets/rocky';
import { RubberDuck } from './pets/rubberduck';
import { Snake } from './pets/snake';
import { Totoro } from './pets/totoro';
import { Zappy } from './pets/zappy';
import { Rat } from './pets/rat';
import { Turtle } from './pets/turtle';
import { IPetType } from './states';

export class PetElement {
    el: HTMLImageElement;
    collision: HTMLDivElement;
    speech: HTMLDivElement;
    pet: IPetType;
    color: PetColor;
    type: PetType;
    remove() {
        this.el.remove();
        this.collision.remove();
        this.speech.remove();
        this.color = PetColor.null;
        this.type = PetType.null;
    }

    constructor(
        el: HTMLImageElement,
        collision: HTMLDivElement,
        speech: HTMLDivElement,
        pet: IPetType,
        color: PetColor,
        type: PetType,
    ) {
        this.el = el;
        this.collision = collision;
        this.speech = speech;
        this.pet = pet;
        this.color = color;
        this.type = type;
    }
}

export interface IPetCollection {
    pets: Array<PetElement>;
    push(pet: PetElement): void;
    reset(): void;
    seekNewFriends(): string[];
    locate(name: string): PetElement | undefined;
    remove(name: string): void;
}

export class PetCollection implements IPetCollection {
    private _pets: Array<PetElement>;

    constructor() {
        this._pets = new Array(0);
    }

    public get pets() {
        return this._pets;
    }

    push(pet: PetElement) {
        this._pets.push(pet);
    }

    reset() {
        this._pets.forEach((pet) => {
            pet.remove();
        });
        this._pets = [];
    }

    locate(name: string): PetElement | undefined {
        return this._pets.find((collection) => {
            return collection.pet.name === name;
        });
    }

    remove(name: string): any {
        this._pets.forEach((pet) => {
            if (pet.pet.name === name) {
                pet.remove();
            }
        });
        this._pets = this._pets.filter((pet) => {
            return pet.pet.name !== name;
        });
    }

    seekNewFriends(): string[] {
        if (this._pets.length <= 1) {
            return [];
        } // You can't be friends with yourself.
        var messages = new Array<string>(0);
        this._pets.forEach((petInCollection) => {
            if (petInCollection.pet.hasFriend) {
                return;
            } // I already have a friend!
            this._pets.forEach((potentialFriend) => {
                if (potentialFriend.pet.hasFriend) {
                    return;
                } // Already has a friend. sorry.
                if (!potentialFriend.pet.canChase) {
                    return;
                } // Pet is busy doing something else.
                if (
                    potentialFriend.pet.left > petInCollection.pet.left &&
                    potentialFriend.pet.left <
                        petInCollection.pet.left + petInCollection.pet.width
                ) {
                    // We found a possible new friend..
                    console.log(
                        petInCollection.pet.name,
                        ' wants to be friends with ',
                        potentialFriend.pet.name,
                        '.',
                    );
                    if (
                        petInCollection.pet.makeFriendsWith(potentialFriend.pet)
                    ) {
                        potentialFriend.pet.showSpeechBubble('❤️', 2000);
                        petInCollection.pet.showSpeechBubble('❤️', 2000);
                    }
                }
            });
        });
        return messages;
    }
}

export class InvalidPetException {
    message?: string;

    constructor(message?: string) {
        this.message = message;
    }
}

export function createPet(
    petType: string,
    el: HTMLImageElement,
    collision: HTMLDivElement,
    speech: HTMLDivElement,
    size: PetSize,
    left: number,
    bottom: number,
    petRoot: string,
    floor: number,
    name: string,
): IPetType {
    if (name === undefined || name === null || name === '') {
        throw new InvalidPetException('name is undefined');
    }

    const standardPetArguments: [
        HTMLImageElement,
        HTMLDivElement,
        HTMLDivElement,
        PetSize,
        number,
        number,
        string,
        number,
        string,
    ] = [el, collision, speech, size, left, bottom, petRoot, floor, name];

    switch (petType) {
        case PetType.cat:
            return new Cat(...standardPetArguments, PetSpeed.normal);
        case PetType.chicken:
            return new Chicken(...standardPetArguments, PetSpeed.normal);
        case PetType.dog:
            return new Dog(...standardPetArguments, PetSpeed.normal);
        case PetType.fox:
            return new Fox(...standardPetArguments, PetSpeed.fast);
        case PetType.crab:
            return new Crab(...standardPetArguments, PetSpeed.slow);
        case PetType.clippy:
            return new Clippy(...standardPetArguments, PetSpeed.slow);
        case PetType.mod:
            return new Mod(...standardPetArguments, PetSpeed.normal);
        case PetType.totoro:
            return new Totoro(...standardPetArguments, PetSpeed.normal);
        case PetType.snake:
            return new Snake(...standardPetArguments, PetSpeed.verySlow);
        case PetType.rubberduck:
            return new RubberDuck(...standardPetArguments, PetSpeed.fast);
        case PetType.zappy:
            return new Zappy(...standardPetArguments, PetSpeed.veryFast);
        case PetType.rocky:
            return new Rocky(...standardPetArguments, PetSpeed.still);
        case PetType.cockatiel:
            return new Cockatiel(...standardPetArguments, PetSpeed.normal);
        case PetType.rat:
            return new Rat(...standardPetArguments, PetSpeed.normal);
        case PetType.turtle:
            return new Turtle(...standardPetArguments, PetSpeed.verySlow);
        default:
            throw new InvalidPetException("Pet type doesn't exist");
    }
}

export function availableColors(petType: PetType): PetColor[] {
    switch (petType) {
        case PetType.cat:
            return Cat.possibleColors;
        case PetType.chicken:
            return Chicken.possibleColors;
        case PetType.dog:
            return Dog.possibleColors;
        case PetType.fox:
            return Fox.possibleColors;
        case PetType.crab:
            return Crab.possibleColors;
        case PetType.clippy:
            return Clippy.possibleColors;
        case PetType.mod:
            return Mod.possibleColors;
        case PetType.totoro:
            return Totoro.possibleColors;
        case PetType.snake:
            return Snake.possibleColors;
        case PetType.rubberduck:
            return RubberDuck.possibleColors;
        case PetType.zappy:
            return Zappy.possibleColors;
        case PetType.rocky:
            return Rocky.possibleColors;
        case PetType.cockatiel:
            return Cockatiel.possibleColors;
        case PetType.rat:
            return Rat.possibleColors;
        case PetType.turtle:
            return Turtle.possibleColors;
        default:
            throw new InvalidPetException("Pet type doesn't exist");
    }
}

/**
 * Some pets can only have certain colors, this makes sure they haven't been misconfigured.
 * @param petColor
 * @param petType
 * @returns normalized color
 */
export function normalizeColor(petColor: PetColor, petType: PetType): PetColor {
    const colors = availableColors(petType);
    if (colors.includes(petColor)) {
        return petColor;
    } else {
        return colors[0];
    }
}
