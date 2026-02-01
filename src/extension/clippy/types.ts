/**
 * Type definitions for Clippy Code Tips
 */

import * as vscode from 'vscode';

/**
 * Personality types that determine the tone of tips
 */
export type Personality = 'helpful' | 'sarcastic' | 'encouraging' | 'roast';

/**
 * Source of pattern detection
 */
export type DetectionSource = 'regex' | 'symbol' | 'hover';

/**
 * Context about the current file for template replacement
 */
export interface FileContext {
    /** The file name with extension (e.g., "UserRepository.ts") */
    fileName: string;
    /** The file extension including dot (e.g., ".ts") */
    fileExtension: string;
    /** The file name without extension (e.g., "UserRepository") */
    fileNameWithoutExtension: string;
    /** The VS Code language ID (e.g., "typescript") */
    languageId: string;
}

/**
 * Combined context for template replacement
 */
export interface TemplateContext {
    /** Symbol context (for cursor position) */
    symbol?: SymbolContext;
    /** File context (for current document) */
    file?: FileContext;
}

/**
 * Context about a detected symbol for template replacement
 */
export interface SymbolContext {
    /** The symbol's name (e.g., "UserRepository", "TItem") */
    symbolName: string;
    /** Parent symbol name if nested (e.g., class name for a method) */
    parentName?: string;
    /** Grandparent symbol name if deeply nested */
    grandparentName?: string;
    /** Total number of direct children */
    childCount: number;
    /** Number of method children */
    methodCount: number;
    /** Number of property/field children */
    propertyCount: number;
    /** Number of siblings (other children of parent) */
    siblingCount: number;
    /** Semantic token modifiers (e.g., "async", "readonly", "static") */
    modifiers: string[];
    /** The symbol kind as a readable string */
    kindName: string;
    /** Parent's kind as a readable string */
    parentKindName?: string;
}

/**
 * Result from semantic detection
 */
export interface SemanticDetectionResult {
    patternName: string;
    source: DetectionSource;
    containingSymbol?: vscode.DocumentSymbol;
    hoverInfo?: string;
    /** Rich context for template replacement */
    context?: SymbolContext;
}

/**
 * Configuration for semantic detection
 */
export interface SemanticDetectionConfig {
    debounceMs: number;
    cacheTtlMs: number;
    apiTimeoutMs: number;
}

/**
 * Frequency settings that control how often tips appear
 */
export type Frequency = 'always' | 'sometimes' | 'rarely';

/**
 * A pattern that Clippy can detect in code
 */
export interface Pattern {
    name: string;
    universalName: string;
    regex: RegExp;
    tipCount: number;
    /**
     * Optional function to extract template values from context
     * Returns array of values for positional placeholders {0}, {1}, {2}, etc.
     */
    getTemplateValues?: (context: TemplateContext) => string[];
}

/**
 * Language definition with its patterns
 */
export interface Language {
    id: string;
    aliases?: string[];
    patterns: Pattern[];
}

/**
 * Match result from pattern detection
 */
export interface PatternMatch {
    name: string;
    matchedText: string;
    startIndex: number;
    endIndex: number;
}

/**
 * Configuration for the Clippy provider
 */
export interface ClippyConfig {
    enabled: boolean;
    personality: Personality;
    frequency: Frequency;
    enabledLanguages: string[];
}

/**
 * Rate limit settings for each frequency level
 */
export interface RateLimitConfig {
    cooldownMs: number;
    randomChance: number;
}

/**
 * Rate limit configurations by frequency
 */
export const RATE_LIMIT_CONFIGS: Record<Frequency, RateLimitConfig> = {
    always: {
        cooldownMs: 0, // No cooldown
        randomChance: 1.0, // Always show
    },
    sometimes: {
        // Triggers ~ every 3 tips on average
        cooldownMs: 30000, // 30 seconds cooldown
        randomChance: 0.5, // 50% chance to show
    },
    rarely: {
        // Triggers ~ every 10 tips on average
        cooldownMs: 90000, // 1.5 minutes cooldown
        randomChance: 0.1, // 10% chance to show
    },
};
