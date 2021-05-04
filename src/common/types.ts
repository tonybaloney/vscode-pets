
export const enum PetColor {
	brown = "brown", 
	black = "black", 
	green = "green",
	yellow = "yellow",
	gray = "gray",
	red = "red"
}

export const enum PetType {
	dog = "dog",
	cat = "cat",
	snake = "snake",
	clippy = "clippy",
	rubberduck = "rubber-duck",
	totoro = "totoro",
	crab = "crab"
}

export const enum PetSpeed {
	verySlow = 1,
	slow = 2,
	normal = 3,
	fast = 4,
	verFast = 5
}

export const enum PetSize {
	nano = "nano",
	medium = "medium",
	large = "large"
}

export const enum ExtPosition {
	panel = "panel",
	explorer = "explorer"
}

export const enum Theme {
	none = "none",
	forest = "forest",
	castle = "castle"
}

export const enum ColorThemeKind {
	Light = 1,
	Dark = 2,
	HighContrast = 3
}

export class WebviewMessage {
	text: string;
	command: string;

	constructor(text: string, command: string) {
		this.text = text;
		this.command = command;
	}
}
