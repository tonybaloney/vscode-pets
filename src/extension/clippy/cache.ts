/**
 * LRU cache for document symbols with TTL support
 */

import * as vscode from 'vscode';

/**
 * Cache entry with timestamp for TTL
 */
interface CacheEntry<T> {
    value: T;
    timestamp: number;
    documentVersion: number;
}

/**
 * LRU cache with TTL support for document symbols
 */
export class DocumentSymbolCache {
    private cache = new Map<string, CacheEntry<vscode.DocumentSymbol[]>>();
    private readonly maxSize: number;
    private readonly ttlMs: number;

    /**
     * Creates a new DocumentSymbolCache
     *
     * @param maxSize Maximum number of entries to cache (default: 50)
     * @param ttlMs Time-to-live in milliseconds (default: 30000 = 30s)
     */
    constructor(maxSize: number = 50, ttlMs: number = 30000) {
        this.maxSize = maxSize;
        this.ttlMs = ttlMs;
    }

    /**
     * Gets the cache key for a document
     */
    private getKey(uri: vscode.Uri): string {
        return uri.toString();
    }

    /**
     * Checks if an entry is still valid
     */
    private isValid(
        entry: CacheEntry<vscode.DocumentSymbol[]>,
        documentVersion: number,
    ): boolean {
        const now = Date.now();
        const isNotExpired = now - entry.timestamp < this.ttlMs;
        const isVersionMatch = entry.documentVersion === documentVersion;
        return isNotExpired && isVersionMatch;
    }

    /**
     * Gets cached symbols for a document
     *
     * @param document The document to get symbols for
     * @returns Cached symbols or undefined if not in cache or invalid
     */
    get(document: vscode.TextDocument): vscode.DocumentSymbol[] | undefined {
        const key = this.getKey(document.uri);
        const entry = this.cache.get(key);

        if (!entry) {
            return undefined;
        }

        if (!this.isValid(entry, document.version)) {
            this.cache.delete(key);
            return undefined;
        }

        // Move to end for LRU (delete and re-add)
        this.cache.delete(key);
        this.cache.set(key, entry);

        return entry.value;
    }

    /**
     * Stores symbols in the cache
     *
     * @param document The document the symbols are for
     * @param symbols The symbols to cache
     */
    set(document: vscode.TextDocument, symbols: vscode.DocumentSymbol[]): void {
        const key = this.getKey(document.uri);

        // Evict oldest if at capacity
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey) {
                this.cache.delete(oldestKey);
            }
        }

        this.cache.set(key, {
            value: symbols,
            timestamp: Date.now(),
            documentVersion: document.version,
        });
    }

    /**
     * Invalidates cache for a specific document
     *
     * @param uri The document URI to invalidate
     */
    invalidate(uri: vscode.Uri): void {
        this.cache.delete(this.getKey(uri));
    }

    /**
     * Clears all cached entries
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Gets the current cache size
     */
    get size(): number {
        return this.cache.size;
    }
}
