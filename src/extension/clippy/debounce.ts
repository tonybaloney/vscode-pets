/**
 * Debounce utility for async functions with cancellation support
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A debounced function that can be cancelled
 */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): void;
    cancel(): void;
}

/**
 * Creates a debounced version of an async function
 *
 * @param fn The function to debounce
 * @param delayMs Delay in milliseconds before executing
 * @returns A debounced function with cancel() method
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delayMs: number,
): DebouncedFunction<T> {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const debouncedFn = (...args: Parameters<T>): void => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            timeoutId = null;
            fn(...args);
        }, delayMs);
    };

    debouncedFn.cancel = (): void => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    return debouncedFn;
}

/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Creates a promise that rejects after a timeout
 *
 * @param ms Timeout in milliseconds
 * @returns A promise that rejects with a timeout error
 */
export function timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), ms);
    });
}

/**
 * Wraps a promise with a timeout
 *
 * @param promise The promise to wrap
 * @param ms Timeout in milliseconds
 * @returns The promise result or null if timeout exceeded
 */
export async function withTimeout<T>(
    promise: Promise<T>,
    ms: number,
): Promise<T | null> {
    try {
        return await Promise.race([promise, timeout(ms)]);
    } catch {
        return null;
    }
}
