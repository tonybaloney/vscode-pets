export const enum PetColor {
    brown = 'brown',
    black = 'black',
    green = 'green',
    yellow = 'yellow',
    gray = 'gray',
    purple = 'purple',
    red = 'red',
    white = 'white',
    null = 'null',
}

export const enum PetType {
    cat = 'cat',
    clippy = 'clippy',
    cockatiel = 'cockatiel',
    crab = 'crab',
    dog = 'dog',
    mod = 'mod',
    rocky = 'rocky',
    rubberduck = 'rubber-duck',
    snake = 'snake',
    totoro = 'totoro',
    zappy = 'zappy',
    rat = 'rat',
    null = 'null',
}

export const enum PetSpeed {
    still = 0,
    verySlow = 1,
    slow = 2,
    normal = 3,
    fast = 4,
    veryFast = 5,
}

export const enum PetSize {
    nano = 'nano',
    medium = 'medium',
    large = 'large',
}

export const enum ExtPosition {
    panel = 'panel',
    explorer = 'explorer',
}

export const enum Theme {
    none = 'none',
    forest = 'forest',
    castle = 'castle',
    beach = 'beach',
}

export const enum ColorThemeKind {
    light = 1,
    dark = 2,
    highContrast = 3,
}

export class WebviewMessage {
    text: string;
    command: string;

    constructor(text: string, command: string) {
        this.text = text;
        this.command = command;
    }
}

export const ALL_PETS = [
    PetType.cat,
    PetType.clippy,
    PetType.cockatiel,
    PetType.crab,
    PetType.dog,
    PetType.mod,
    PetType.rocky,
    PetType.rubberduck,
    PetType.snake,
    PetType.totoro,
    PetType.zappy,
    PetType.rat
];
export const ALL_COLORS = [
    PetColor.black,
    PetColor.brown,
    PetColor.green,
    PetColor.yellow,
    PetColor.gray,
    PetColor.purple,
    PetColor.red,
    PetColor.white,
    PetColor.null,
];
export const ALL_SCALES = [PetSize.nano, PetSize.medium, PetSize.large];
export const ALL_THEMES = [Theme.none, Theme.forest, Theme.castle, Theme.beach];
