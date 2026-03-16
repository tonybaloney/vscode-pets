/**
 * Language registry and trigger matching
 */

import * as vscode from 'vscode';
import {
    Language,
    Trigger,
    TriggerMatch,
    Personality,
    TemplateContext,
} from '../types';
import { getMessage } from '../messages';
import { typescript } from './typescript/index';
import { symbolTriggers } from './symbols';

// Re-export symbol triggers for use by language modules
export { symbolTriggers } from './symbols';

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
 * Languages with custom triggers (regex + symbol triggers)
 * These languages have hand-crafted regex triggers in addition to symbol detection
 */
const LANGUAGES_WITH_CUSTOM_TRIGGERS: Language[] = [typescript];

/**
 * Create a language definition for symbol-only languages
 */
function createSymbolOnlyLanguage(id: string): Language {
    return { id, triggers: [...symbolTriggers] };
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

    // Start with languages that have custom triggers
    const languages: Language[] = [...LANGUAGES_WITH_CUSTOM_TRIGGERS];
    const languageMap = new Map<string, Language>();

    // Get all language IDs from VSCode
    const allLanguageIds = await vscode.languages.getLanguages();

    // Track IDs we've already registered
    const registeredIds = new Set<string>();

    // Register custom trigger languages
    for (const lang of LANGUAGES_WITH_CUSTOM_TRIGGERS) {
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

    // Auto-register remaining programming languages with symbol triggers
    for (const langId of allLanguageIds) {
        // Skip if already registered or excluded
        if (registeredIds.has(langId) || EXCLUDED_LANGUAGES.has(langId)) {
            continue;
        }

        // Register with symbol triggers only
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
 * Find all trigger matches in a line of text
 */
export function findTriggersInLine(
    lineText: string,
    languageId: string,
): TriggerMatch[] {
    const language = getLanguage(languageId);
    if (!language) {
        return [];
    }

    const matches: TriggerMatch[] = [];

    for (const trigger of language.triggers) {
        const regex = new RegExp(trigger.regex.source, trigger.regex.flags);
        regex.lastIndex = 0;

        let match: RegExpExecArray | null;
        while ((match = regex.exec(lineText)) !== null) {
            matches.push({
                name: trigger.name,
                matchedText: match[0],
                startIndex: match.index,
                endIndex: match.index + match[0].length,
            });
        }
    }

    return matches;
}

/**
 * Find trigger match at a specific cursor position
 */
export function findTriggerAtPosition(
    lineText: string,
    position: number,
    languageId: string,
): TriggerMatch | null {
    const matches = findTriggersInLine(lineText, languageId);

    for (const match of matches) {
        if (position >= match.startIndex && position <= match.endIndex) {
            return match;
        }
    }

    return null;
}

/**
 * Get a random message for a trigger
 */
export function getMessageForTrigger(
    triggerName: string | null,
    personality: Personality,
    languageId: string,
    context?: TemplateContext,
): string | null {
    if (!triggerName) {
        return null;
    }

    const language = getLanguage(languageId);
    if (!language) {
        return null;
    }

    const trigger = language.triggers.find((t) => t.name === triggerName);
    if (!trigger || trigger.messageCount === 0) {
        return null;
    }

    const { universalName, messageCount, getTemplateValues } = trigger;

    // Extract template values using trigger's extractor function
    const values =
        getTemplateValues && context ? getTemplateValues(context) : [];

    return getMessage(universalName, personality, messageCount, values);
}

/**
 * Get trigger by name for a language
 */
export function getTrigger(
    triggerName: string,
    languageId: string,
): Trigger | null {
    const language = getLanguage(languageId);
    if (!language) {
        return null;
    }
    return language.triggers.find((t) => t.name === triggerName) || null;
}

/**
 * Get all trigger names for a language
 */
export function getTriggerNames(languageId: string): string[] {
    const language = getLanguage(languageId);
    if (!language) {
        return [];
    }
    return language.triggers.map((t) => t.name);
}

/**
 * Symbol kind to trigger name mapping
 * Maps VS Code SymbolKind enum values to trigger names (language-specific)
 */
const SYMBOL_KIND_TO_TRIGGER: Partial<Record<vscode.SymbolKind, string>> = {
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
 * Get trigger name for a symbol kind
 *
 * @param kind The VS Code symbol kind
 * @param languageId The language ID (for language-specific overrides)
 * @returns The trigger name or null if no mapping exists
 */
export function getTriggerNameForSymbolKind(
    kind: vscode.SymbolKind,
    languageId: string,
): string | null {
    // Check if the language supports the trigger
    const language = getLanguage(languageId);
    if (!language) {
        return null;
    }

    const triggerName = SYMBOL_KIND_TO_TRIGGER[kind];
    if (!triggerName) {
        return null;
    }

    // Verify the language has this trigger defined
    const hasTrigger = language.triggers.some((t) => t.name === triggerName);
    return hasTrigger ? triggerName : null;
}

/**
 * Hover content triggers that map to trigger names
 */
const HOVER_CONTENT_TRIGGERS: Array<{ pattern: RegExp; triggerName: string }> =
    [
        { pattern: /\bconsole\.log\b/, triggerName: 'console' },
        { pattern: /\bPromise</, triggerName: 'asyncAwait' },
    ];

/**
 * Get trigger name from hover content
 *
 * @param hoverContent The hover content text
 * @param languageId The language ID
 * @returns The trigger name or null if no match
 */
export function getTriggerNameFromHoverContent(
    hoverContent: string,
    languageId: string,
): string | null {
    const language = getLanguage(languageId);
    if (!language) {
        return null;
    }

    for (const { pattern, triggerName } of HOVER_CONTENT_TRIGGERS) {
        if (pattern.test(hoverContent)) {
            // Verify the language has this trigger defined
            const hasTrigger = language.triggers.some(
                (t) => t.name === triggerName,
            );
            if (hasTrigger) {
                return triggerName;
            }
        }
    }

    return null;
}
