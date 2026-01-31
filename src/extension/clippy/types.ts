/**
 * Type definitions for Clippy Code Tips
 */

/**
 * Personality types that determine the tone of tips
 */
export type Personality = 'helpful' | 'sarcastic' | 'encouraging';

/**
 * Frequency settings that control how often tips appear
 */
export type Frequency = 'always' | 'sometimes' | 'rarely';

/**
 * A pattern that Clippy can detect in code
 */
export interface Pattern {
    name: string;
    regex: RegExp;
    tipCount: number;
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
        cooldownMs: 30000, // 30 seconds cooldown
        randomChance: 0.3, // 30% chance to show
    },
    rarely: {
        cooldownMs: 120000, // 2 minutes cooldown
        randomChance: 0.1, // 10% chance to show
    },
};
