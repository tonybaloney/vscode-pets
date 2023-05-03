export const enum PetColor {
    brown = 'brown',
    lightbrown = 'lightbrown',
    black = 'black',
    green = 'green',
    yellow = 'yellow',
    gray = 'gray',
    purple = 'purple',
    red = 'red',
    white = 'white',
    orange = 'orange',
    null = 'null',
}

export const enum PetType {
    cat = 'cat',
    cbat = 'cbat',
    chicken = 'chicken',
    chud = 'chud',
    clippy = 'clippy',
    cockatiel = 'cockatiel',
    crab = 'crab',
    dog = 'dog',
    fox = 'fox',
    mod = 'mod',
    rat = 'rat',
    rocky = 'rocky',
    rubberduck = 'rubber-duck',
    snake = 'snake',
    stickbug = 'stick-bug',
    totoro = 'totoro',
    turtle = 'turtle',
    zappy = 'zappy',
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
    small = 'small',
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
    PetType.cbat,
    PetType.chicken,
    PetType.chud,
    PetType.clippy,
    PetType.cockatiel,
    PetType.crab,
    PetType.dog,
    PetType.fox,
    PetType.mod,
    PetType.rat,
    PetType.rocky,
    PetType.rubberduck,
    PetType.snake,
    PetType.stickbug,
    PetType.totoro,
    PetType.turtle,
    PetType.zappy,
];
export const ALL_COLORS = [
    PetColor.black,
    PetColor.brown,
    PetColor.lightbrown,
    PetColor.green,
    PetColor.yellow,
    PetColor.gray,
    PetColor.purple,
    PetColor.red,
    PetColor.white,
    PetColor.orange,
    PetColor.null,
];
export const ALL_SCALES = [
    PetSize.nano,
    PetSize.small,
    PetSize.medium,
    PetSize.large,
];
export const ALL_THEMES = [Theme.none, Theme.forest, Theme.castle, Theme.beach];
