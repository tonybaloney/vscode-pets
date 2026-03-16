/**
 * Rate limiting for Clippy Code Messages
 */

import { Frequency, RATE_LIMIT_CONFIGS } from './types';

/**
 * Type for send message function
 */
export type SendMessageFn = (message: string, triggerName: string) => void;

/**
 * Track last message time for rate limiting
 */
let lastMessageTime = 0;

/**
 * Check if we should show a message based on rate limiting
 *
 * Rate limiting works in two stages:
 * 1. Cooldown: Must wait cooldownMs since last message before any message can show
 * 2. Random chance: After cooldown, randomChance determines probability
 */
export function shouldShowMessage(frequency: Frequency = 'sometimes'): boolean {
    const rateLimit = RATE_LIMIT_CONFIGS[frequency];
    const timeSinceLastMessage = Date.now() - lastMessageTime;

    // Must wait for cooldown period to pass
    if (timeSinceLastMessage < rateLimit.cooldownMs) {
        return false;
    }

    // After cooldown, apply random chance
    return Math.random() < rateLimit.randomChance;
}

/**
 * Send message and record it was shown.
 */
export function sendAndRecord(
    message: string | null,
    triggerName: string | null,
    sendMessage: SendMessageFn,
): void {
    // Only proceed if there's a message to send - reduces unnecessary checks
    // from the caller side as well.
    if (!message || !triggerName) {
        return;
    }

    lastMessageTime = Date.now(); // Record message shown time
    sendMessage(message, triggerName); // Send the message using provided function
}

/**
 * Reset rate limit state (for config change handler)
 */
export function resetRateLimit(): void {
    lastMessageTime = 0;
}
