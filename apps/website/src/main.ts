// Website host for the vscode-pets engine.
//
// The engine (src/panel) is host-agnostic: it only needs a "state API"
// (getState/setState/postMessage) and command messages on the window.
// In VS Code that API comes from `acquireVsCodeApi()`. Here we provide a
// browser-native equivalent backed by localStorage, and we drive the
// animation tick + commands ourselves.

import './styles.css';
import { petPanelApp } from '../../../src/panel/main';
import { availableColors, normalizeColor } from '../../../src/panel/pets';
import { ALL_PETS, ALL_SCALES, ALL_THEMES } from '../../../src/common/types';
// Type-only: these are `const enum`s — esbuild can't inline their members
// across files in Vite dev, so we use literal values at runtime and import
// the enums purely as types (erased at build time).
import type {
    PetType,
    PetColor,
    PetSize,
    Theme,
    ColorThemeKind,
} from '../../../src/common/types';

const STATE_KEY = 'vscode-pets-web.state'; // engine's own pet state
const SETTINGS_KEY = 'vscode-pets-web.settings'; // our UI selections

// cat / frog / bunny sprites are NOT redistributable (paid "catset" assets,
// shipped only in the password-protected media/extra.zip). Hide them so the
// website never points at gifs that don't exist.
const UNAVAILABLE = new Set<string>(['cat', 'frog', 'bunny']);
const PET_TYPES = ALL_PETS.filter((t) => !UNAVAILABLE.has(t));

interface Settings {
    type: PetType;
    color: PetColor;
    size: PetSize;
    theme: Theme;
}

const DEFAULTS: Settings = {
    type: 'dog' as PetType,
    color: 'brown' as PetColor,
    size: 'nano' as PetSize,
    theme: 'none' as Theme,
};

function loadSettings(): Settings {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
    } catch {
        return { ...DEFAULTS };
    }
}
function saveSettings(s: Settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

const settings = loadSettings();
// Keep color valid for the chosen pet (e.g. dog has no "purple").
settings.color = normalizeColor(settings.color, settings.type);

// --- Host adapter: the same shape VS Code's acquireVsCodeApi() returns. ---
const webStateApi = {
    getState() {
        const raw = localStorage.getItem(STATE_KEY);
        return raw ? JSON.parse(raw) : undefined;
    },
    setState(state: unknown) {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    },
    // The engine posts outbound events (list-pets, info, errors, …) here.
    // VS Code would forward these to the extension; we handle the ones the
    // website cares about (the roster) and log the rest.
    postMessage(message: { command?: string; text?: string }) {
        if (message?.command === 'list-pets') {
            renderRoster(message.text ?? '');
            return;
        }
        console.debug('[pets] outbound message', message);
    },
};

// Assets (gifs, backgrounds) are served from /media via the public/media symlink.
const basePetUri = '/media';

petPanelApp(
    basePetUri,
    settings.theme,
    2 as ColorThemeKind, // dark
    settings.color,
    settings.size,
    settings.type,
    false, // throwBallWithMouse
    false, // disableEffects
    webStateApi,
);

// The engine doesn't run its own clock — the host advances frames by sending
// `tick`. VS Code does this every 100ms; we mirror that here.
setInterval(() => {
    window.postMessage({ command: 'tick' }, '*');
}, 100);

// ---------------------------------------------------------------------------
// Control panel
// ---------------------------------------------------------------------------
const typeSel = document.getElementById('petType') as HTMLSelectElement;
const colorSel = document.getElementById('petColor') as HTMLSelectElement;
const sizeSel = document.getElementById('petSize') as HTMLSelectElement;
const themeSel = document.getElementById('petTheme') as HTMLSelectElement;

function fillSelect(sel: HTMLSelectElement, values: string[], selected: string) {
    sel.replaceChildren();
    for (const v of values) {
        sel.add(new Option(v.replace(/-/g, ' '), v));
    }
    sel.value = selected;
}

function syncColors() {
    const colors = availableColors(settings.type as PetType).filter(
        (c) => c !== ('null' as PetColor),
    );
    settings.color = normalizeColor(settings.color, settings.type);
    fillSelect(colorSel, colors, settings.color);
}

fillSelect(typeSel, PET_TYPES, settings.type);
fillSelect(sizeSel, ALL_SCALES, settings.size);
fillSelect(themeSel, ALL_THEMES, settings.theme);
syncColors();

// Type & color are per-spawn — no reload needed, just persist the choice.
typeSel.addEventListener('change', () => {
    settings.type = typeSel.value as PetType;
    syncColors();
    saveSettings(settings);
});
colorSel.addEventListener('change', () => {
    settings.color = colorSel.value as PetColor;
    saveSettings(settings);
});

// Size is an init-time parameter (it's baked into each sprite). VS Code
// recreates the whole view when size changes; we do the same by persisting
// and reloading — the pet state in localStorage is preserved and recovered
// at the new size.
sizeSel.addEventListener('change', () => {
    settings.size = sizeSel.value as PetSize;
    saveSettings(settings);
    location.reload();
});

// Theme (background + weather effect) is also baked in at init — reload like size.
themeSel.addEventListener('change', () => {
    settings.theme = themeSel.value as Theme;
    saveSettings(settings);
    location.reload();
});

document.getElementById('spawn')!.addEventListener('click', () => {
    window.postMessage(
        { command: 'spawn-pet', type: settings.type, color: settings.color },
        '*',
    );
    refreshRoster();
});
document.getElementById('throw')!.addEventListener('click', () => {
    window.postMessage({ command: 'throw-ball' }, '*');
});
document.getElementById('reset')!.addEventListener('click', () => {
    window.postMessage({ command: 'reset-pet' }, '*');
    refreshRoster();
});

// ---------------------------------------------------------------------------
// Active-pet roster
// ---------------------------------------------------------------------------
const rosterEl = document.getElementById('roster') as HTMLElement;
const rosterCountEl = document.getElementById('rosterCount') as HTMLElement;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Ask the engine for its current pets; it replies via webStateApi.postMessage,
// which calls renderRoster(). postMessage is ordered, so calling this right
// after a spawn/delete reflects the updated state.
function refreshRoster() {
    window.postMessage({ command: 'list-pets' }, '*');
}

// `text` is the engine's "type,name,color" lines, one pet per line.
function renderRoster(text: string) {
    const pets = text
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => {
            const [type, name, color] = l.split(',');
            return { type, name, color };
        });

    rosterCountEl.textContent = String(pets.length);
    rosterEl.replaceChildren();

    if (pets.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'px-1 py-2 text-center text-xs text-muted';
        empty.textContent = 'No pets yet — add one!';
        rosterEl.append(empty);
        return;
    }

    for (const pet of pets) {
        const row = document.createElement('div');
        row.className = 'roster-row';

        const info = document.createElement('div');
        info.className = 'min-w-0';
        const nameEl = document.createElement('p');
        nameEl.className = 'truncate text-sm font-semibold text-ink';
        nameEl.textContent = pet.name;
        const metaEl = document.createElement('p');
        metaEl.className = 'truncate text-xs text-muted';
        metaEl.textContent = `${cap(pet.color)} ${cap(pet.type)}`;
        info.append(nameEl, metaEl);

        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'roster-del';
        del.setAttribute('aria-label', `Remove ${pet.name}`);
        del.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
        del.addEventListener('click', () => {
            window.postMessage(
                {
                    command: 'delete-pet',
                    name: pet.name,
                    type: pet.type,
                    color: pet.color,
                },
                '*',
            );
            refreshRoster();
        });

        row.append(info, del);
        rosterEl.append(row);
    }
}

// Initial paint — show pets restored from saved state.
refreshRoster();
