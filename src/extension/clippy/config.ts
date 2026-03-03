/**
 * Configuration loading and validation for Clippy Code Tips
 */

import * as vscode from 'vscode';
import { ClippyConfig, Frequency, Personality } from './types';

// Re-export ClippyConfig for convenience
export { ClippyConfig } from './types';

/**
 * Load configuration from VS Code settings
 */
export function loadConfig(): ClippyConfig {
    const config = vscode.workspace.getConfiguration('vscode-pets');
    return {
        enabled: config.get<boolean>('clippyHover.enabled', false),
        personality: config.get<Personality>(
            'clippyHover.personality',
            'helpful',
        ),
        frequency: config.get<Frequency>('clippyHover.frequency', 'sometimes'),
        enabledLanguages: config.get<string[]>('clippyHover.enabledLanguages', [
            '*',
        ]),
    };
}

/**
 * Check if the current language is enabled
 */
export function isLanguageEnabled(
    languageId: string,
    config: ClippyConfig,
): boolean {
    if (config.enabledLanguages.includes('*')) {
        return true;
    }
    return config.enabledLanguages.includes(languageId);
}
