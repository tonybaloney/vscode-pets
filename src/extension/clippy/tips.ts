/**
 * Tip resolver for Clippy internationalization
 */

import * as l10n from '@vscode/l10n';
import { Personality } from './types';

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
    return l10n.t(key);
}
