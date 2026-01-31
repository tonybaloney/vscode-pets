/**
 * Tip resolver for Clippy internationalization
 */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Personality } from './types';

const EXTENSION_ID = 'tonybaloney.vscode-pets';

// Cache for development bundle fallback
let devBundle: Record<string, string> | null = null;

/**
 * Get the extension path via vscode.extensions API
 * Falls back to VSCODE_PETS_EXTENSION_PATH env var for testing
 */
function getExtensionPath(): string | undefined {
    return vscode.extensions.getExtension(EXTENSION_ID)?.extensionPath;
}

/**
 * Load the l10n bundle directly for development mode
 */
function loadDevBundle(): Record<string, string> {
    if (devBundle) {
        return devBundle;
    }

    const extensionPath = getExtensionPath();
    if (!extensionPath) {
        devBundle = {};
        return devBundle;
    }
    try {
        const bundlePath = path.join(extensionPath, 'l10n', 'bundle.l10n.json');
        const content = fs.readFileSync(bundlePath, 'utf-8');
        devBundle = JSON.parse(content) as Record<string, string>;
        return devBundle;
    } catch {
        devBundle = {};
        return devBundle;
    }
}

/**
 * Get a random tip for a pattern using i18n
 * @param languageId - Programming language (e.g., 'typescript')
 * @param patternName - Pattern name (e.g., 'console')
 * @param personality - User's personality setting
 * @param tipCount - Number of available tips
 * @returns The localized tip string
 */
export function getTip(
    languageId: string,
    patternName: string,
    personality: Personality,
    tipCount: number,
): string {
    const index = Math.floor(Math.random() * tipCount);
    const key = `${languageId}.${patternName}.${personality}.${index}`;

    // Use VS Code's l10n if available (production/packaged mode)
    if (vscode.l10n.bundle !== undefined) {
        return vscode.l10n.t(key);
    }

    // Fallback to development bundle loading (development mode)
    const bundle = loadDevBundle();
    return bundle[key] ?? key;
}

/**
 * Tip counts for general (non-language-specific) events
 */
const GENERAL_TIP_COUNTS: Record<string, number> = {
    documentSave: 5,
    documentClose: 5,
    fileCreate: 5,
    fileDelete: 5,
};

/**
 * Get a random tip for a general event (non-language-specific)
 * @param eventName - Event name (e.g., 'documentSave', 'documentClose')
 * @param personality - User's personality setting
 * @returns The localized tip string, or null if no tips exist
 */
export function getGeneralTip(
    eventName: string,
    personality: Personality,
): string | null {
    const tipCount = GENERAL_TIP_COUNTS[eventName];
    if (!tipCount) {
        return null;
    }

    const index = Math.floor(Math.random() * tipCount);
    const key = `general.${eventName}.${personality}.${index}`;

    // Use VS Code's l10n if available (production/packaged mode)
    if (vscode.l10n.bundle !== undefined) {
        return vscode.l10n.t(key);
    }

    // Fallback to development bundle loading (development mode)
    const bundle = loadDevBundle();
    return bundle[key] ?? key;
}
