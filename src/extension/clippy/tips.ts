/**
 * Tip resolver for Clippy internationalization
 */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FileContext, Personality } from './types';

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
 * Extract file context from a URI and optional language ID
 *
 * @param uri - The file URI
 * @param languageId - Optional language ID (defaults to extension-based guess)
 * @returns FileContext with file information
 */
export function extractFileContext(
    uri: vscode.Uri,
    languageId?: string,
): FileContext {
    const fileName = path.basename(uri.fsPath);
    const fileExtension = path.extname(uri.fsPath);
    const fileNameWithoutExtension = path.basename(uri.fsPath, fileExtension);

    return {
        fileName,
        fileExtension,
        fileNameWithoutExtension,
        languageId: languageId || fileExtension.slice(1) || 'plaintext',
    };
}

/**
 * Replace positional placeholders with values
 *
 * Supported placeholders:
 * - {0}, {1}, {2}, etc. - Positional placeholders replaced by values array
 *
 * @param template - The tip template string with positional placeholders
 * @param values - Array of values to replace placeholders
 * @returns The tip with placeholders replaced
 */
export function applyTemplate(template: string, values: string[] = []): string {
    if (!values || values.length === 0) {
        return template;
    }

    let result = template;

    // Replace positional placeholders {0}, {1}, {2}, etc.
    values.forEach((value, index) => {
        const placeholder = new RegExp(`\\{${index}\\}`, 'g');
        result = result.replace(placeholder, value);
    });

    return result;
}

/**
 * Get a random tip for a pattern using i18n
 * @param universalPatternName - Universal pattern name (e.g., 'logging', 'symbol.class')
 * @param personality - User's personality setting
 * @param tipCount - Number of available tips
 * @param values - Optional array of values for positional placeholders {0}, {1}, {2}, etc.
 * @returns The localized tip string with templates applied
 */
export function getTip(
    universalPatternName: string,
    personality: Personality,
    tipCount: number,
    values: string[] = [],
): string {
    const index = Math.floor(Math.random() * tipCount);
    const key = `${universalPatternName}.${personality}.${index}`;

    let result: string;

    // Use VS Code's l10n if available (production/packaged mode)
    if (vscode.l10n.bundle !== undefined) {
        // VS Code's l10n.t natively supports positional placeholders
        result = vscode.l10n.t(key, ...values);
    } else {
        // Fallback to development bundle loading (development mode)
        const bundle = loadDevBundle();
        const template = bundle[key] ?? key;
        // Apply template replacements manually in dev mode
        result = applyTemplate(template, values);
    }

    return result;
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
 * @param values - Optional array of values for positional placeholders
 * @returns The localized tip string with templates applied, or null if no tips exist
 */
export function getGeneralTip(
    eventName: string,
    personality: Personality,
    values: string[] = [],
): string | null {
    const tipCount = GENERAL_TIP_COUNTS[eventName];
    if (!tipCount) {
        return null;
    }

    const index = Math.floor(Math.random() * tipCount);
    const key = `general.${eventName}.${personality}.${index}`;

    let result: string;

    // Use VS Code's l10n if available (production/packaged mode)
    if (vscode.l10n.bundle !== undefined) {
        result = vscode.l10n.t(key, ...values);
    } else {
        // Fallback to development bundle loading (development mode)
        const bundle = loadDevBundle();
        const template = bundle[key] ?? key;
        result = applyTemplate(template, values);
    }

    return result;
}
