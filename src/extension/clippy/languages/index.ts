/**
 * Language registry and pattern matching
 */

import * as vscode from 'vscode';
import {
    Language,
    Pattern,
    PatternMatch,
    Personality,
    TemplateContext,
} from '../types';
import { getTip } from '../tips';
import { typescript } from './typescript/index';
import { symbolPatterns } from './symbols';

// Re-export symbol patterns for use by language modules
export { symbolPatterns } from './symbols';

/**
 * Languages that should be excluded (non-programming languages)
 * These are typically data formats, markup, or configuration files
 */
const EXCLUDED_LANGUAGES = new Set([
    'plaintext',
    'markdown',
    'json',
    'jsonc',
    'xml',
    'yaml',
    'yml',
    'toml',
    'ini',
    'properties',
    'csv',
    'tsv',
    'html',
    'css',
    'scss',
    'sass',
    'less',
    'svg',
    'ignore',
    'gitignore',
    'log',
    'diff',
    'git-commit',
    'git-rebase',
    'code-text-binary',
    'scminput',
]);

/**
 * Languages with custom patterns (regex + symbol patterns)
 * These languages have hand-crafted regex patterns in addition to symbol detection
 */
const LANGUAGES_WITH_CUSTOM_PATTERNS: Language[] = [typescript];

/**
 * Create a language definition for symbol-only languages
 */
function createSymbolOnlyLanguage(id: string): Language {
    return { id, patterns: [...symbolPatterns] };
}

/**
 * Map of language ID -> Language for O(1) lookups
 * Includes both primary IDs and aliases
 */
let LANGUAGE_MAP: Map<string, Language> = new Map();

/**
 * All registered languages (for iteration/testing purposes)
 */
let LANGUAGES: Language[] = [];

/**
 * Whether languages have been initialized
 */
let initialized = false;

/**
 * Initialize language registry from VSCode's available languages
 *
 * @returns Promise that resolves when initialization is complete
 */
export async function initializeLanguages(): Promise<void> {
    if (initialized) {
        return;
    }

    // Start with languages that have custom patterns
    const languages: Language[] = [...LANGUAGES_WITH_CUSTOM_PATTERNS];
    const languageMap = new Map<string, Language>();

    // Get all language IDs from VSCode
    const allLanguageIds = await vscode.languages.getLanguages();

    // Track IDs we've already registered
    const registeredIds = new Set<string>();

    // Register custom pattern languages
    for (const lang of LANGUAGES_WITH_CUSTOM_PATTERNS) {
        registeredIds.add(lang.id);
        languageMap.set(lang.id, lang);

        // Map aliases to the same language object
        if (lang.aliases) {
            lang.aliases.forEach((alias) => {
                registeredIds.add(alias);
                languageMap.set(alias, lang);
            });
        }
    }

    // Auto-register remaining programming languages with symbol patterns
    for (const langId of allLanguageIds) {
        // Skip if already registered or excluded
        if (registeredIds.has(langId) || EXCLUDED_LANGUAGES.has(langId)) {
            continue;
        }

        // Register with symbol patterns only
        const lang = createSymbolOnlyLanguage(langId);
        languages.push(lang);
        languageMap.set(langId, lang);
        registeredIds.add(langId);
    }

    LANGUAGES = languages;
    LANGUAGE_MAP = languageMap;
    initialized = true;
}

/**
 * Find language by VS Code language ID
 * O(1) lookup using Map instead of O(n) array iteration
 */
export function getLanguage(languageId: string): Language | null {
    return LANGUAGE_MAP.get(languageId) ?? null;
}

/**
 * Get all registered language IDs (including aliases)
 * Uses LANGUAGES array to avoid duplicates from Map
 *
 * NOTE: Used for testing purposes only - see `test-with-mock.ts`
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
    context?: TemplateContext,
): string | null {
    const language = getLanguage(languageId);
    if (!language) {
        return null;
    }

    const pattern = language.patterns.find((p) => p.name === patternName);
    if (!pattern || pattern.tipCount === 0) {
        return null;
    }

    const { universalName, tipCount, getTemplateValues } = pattern;

    // Extract template values using pattern's extractor function
    const values =
        getTemplateValues && context ? getTemplateValues(context) : [];

    return getTip(universalName, personality, tipCount, values);
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

/**
 * Symbol kind to pattern name mapping
 * Maps VS Code SymbolKind enum values to pattern names (language-specific)
 */
const SYMBOL_KIND_TO_PATTERN: Partial<Record<vscode.SymbolKind, string>> = {
    [vscode.SymbolKind.File]: 'symbolFile',
    [vscode.SymbolKind.Module]: 'symbolModule',
    [vscode.SymbolKind.Namespace]: 'symbolNamespace',
    [vscode.SymbolKind.Package]: 'symbolPackage',
    [vscode.SymbolKind.Class]: 'symbolClass',
    [vscode.SymbolKind.Method]: 'symbolMethod',
    [vscode.SymbolKind.Property]: 'symbolProperty',
    [vscode.SymbolKind.Field]: 'symbolField',
    [vscode.SymbolKind.Constructor]: 'symbolConstructor',
    [vscode.SymbolKind.Enum]: 'symbolEnum',
    [vscode.SymbolKind.Interface]: 'symbolInterface',
    [vscode.SymbolKind.Function]: 'symbolFunction',
    [vscode.SymbolKind.Variable]: 'symbolVariable',
    [vscode.SymbolKind.Constant]: 'symbolConstant',
    [vscode.SymbolKind.String]: 'symbolString',
    [vscode.SymbolKind.Number]: 'symbolNumber',
    [vscode.SymbolKind.Boolean]: 'symbolBoolean',
    [vscode.SymbolKind.Array]: 'symbolArray',
    [vscode.SymbolKind.Object]: 'symbolObject',
    [vscode.SymbolKind.Key]: 'symbolKey',
    [vscode.SymbolKind.Null]: 'symbolNull',
    [vscode.SymbolKind.EnumMember]: 'symbolEnumMember',
    [vscode.SymbolKind.Struct]: 'symbolStruct',
    [vscode.SymbolKind.Event]: 'symbolEvent',
    [vscode.SymbolKind.Operator]: 'symbolOperator',
    [vscode.SymbolKind.TypeParameter]: 'symbolTypeParameter',
};

/**
 * Get pattern name for a symbol kind
 *
 * @param kind The VS Code symbol kind
 * @param languageId The language ID (for language-specific overrides)
 * @returns The pattern name or null if no mapping exists
 */
export function getPatternNameForSymbolKind(
    kind: vscode.SymbolKind,
    languageId: string,
): string | null {
    // Check if the language supports the pattern
    const language = getLanguage(languageId);
    if (!language) {
        return null;
    }

    const patternName = SYMBOL_KIND_TO_PATTERN[kind];
    if (!patternName) {
        return null;
    }

    // Verify the language has this pattern defined
    const hasPattern = language.patterns.some((p) => p.name === patternName);
    return hasPattern ? patternName : null;
}

/**
 * Hover content patterns that map to pattern names
 */
const HOVER_CONTENT_PATTERNS: Array<{ pattern: RegExp; patternName: string }> =
    [
        { pattern: /\bconsole\.log\b/, patternName: 'console' },
        { pattern: /\bPromise</, patternName: 'asyncAwait' },
    ];

/**
 * Get pattern name from hover content
 *
 * @param hoverContent The hover content text
 * @param languageId The language ID
 * @returns The pattern name or null if no match
 */
export function getPatternNameFromHoverContent(
    hoverContent: string,
    languageId: string,
): string | null {
    const language = getLanguage(languageId);
    if (!language) {
        return null;
    }

    for (const { pattern, patternName } of HOVER_CONTENT_PATTERNS) {
        if (pattern.test(hoverContent)) {
            // Verify the language has this pattern defined
            const hasPattern = language.patterns.some(
                (p) => p.name === patternName,
            );
            if (hasPattern) {
                return patternName;
            }
        }
    }

    return null;
}
