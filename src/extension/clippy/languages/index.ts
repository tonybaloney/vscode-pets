/**
 * Language registry and pattern matching
 */

import { Language, Pattern, PatternMatch, Personality } from '../types';
import { getTip } from '../tips';
import { typescript } from './typescript/index';

/**
 * All registered languages
 */
const LANGUAGES: Language[] = [typescript];

/**
 * Find language by VS Code language ID
 */
export function getLanguage(languageId: string): Language | null {
    for (const lang of LANGUAGES) {
        if (lang.id === languageId) {
            return lang;
        }
        if (lang.aliases?.includes(languageId)) {
            return lang;
        }
    }
    return null;
}

/**
 * Get all registered language IDs (including aliases)
 */
export function getAllLanguageIds(): string[] {
    const ids: string[] = [];
    for (const lang of LANGUAGES) {
        ids.push(lang.id);
        if (lang.aliases) {
            ids.push(...lang.aliases);
        }
    }
    return ids;
}

/**
 * Find all pattern matches in a line of text
 */
export function findPatternsInLine(
    lineText: string,
    languageId: string,
): PatternMatch[] {
    const language = getLanguage(languageId);
    if (!language) {
        return [];
    }

    const matches: PatternMatch[] = [];

    for (const pattern of language.patterns) {
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        regex.lastIndex = 0;

        let match: RegExpExecArray | null;
        while ((match = regex.exec(lineText)) !== null) {
            matches.push({
                name: pattern.name,
                matchedText: match[0],
                startIndex: match.index,
                endIndex: match.index + match[0].length,
            });
        }
    }

    return matches;
}

/**
 * Find pattern match at a specific cursor position
 */
export function findMatchAtPosition(
    lineText: string,
    position: number,
    languageId: string,
): PatternMatch | null {
    const matches = findPatternsInLine(lineText, languageId);

    for (const match of matches) {
        if (position >= match.startIndex && position <= match.endIndex) {
            return match;
        }
    }

    return null;
}

/**
 * Get a random tip for a pattern
 */
export function getTipForPattern(
    patternName: string,
    personality: Personality,
    languageId: string,
): string | null {
    const language = getLanguage(languageId);
    if (!language) {
        return null;
    }

    const pattern = language.patterns.find((p) => p.name === patternName);
    if (!pattern || pattern.tipCount === 0) {
        return null;
    }

    return getTip(language.id, patternName, personality, pattern.tipCount);
}

/**
 * Get pattern by name for a language
 */
export function getPattern(
    patternName: string,
    languageId: string,
): Pattern | null {
    const language = getLanguage(languageId);
    if (!language) {
        return null;
    }
    return language.patterns.find((p) => p.name === patternName) || null;
}

/**
 * Get all pattern names for a language
 */
export function getPatternNames(languageId: string): string[] {
    const language = getLanguage(languageId);
    if (!language) {
        return [];
    }
    return language.patterns.map((p) => p.name);
}
