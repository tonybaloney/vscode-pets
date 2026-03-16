/**
 * Semantic detection module using VS Code APIs
 *
 * Uses executeDocumentSymbolProvider and executeHoverProvider to detect
 * code patterns more reliably than regex alone.
 */

import * as vscode from 'vscode';
import {
    SemanticDetectionResult,
    SemanticDetectionConfig,
    SymbolContext,
} from './types';
import { DocumentSymbolCache } from './cache';
import { withTimeout } from './debounce';
import {
    getTriggerNameForSymbolKind,
    getTriggerNameFromHoverContent,
} from './languages/index';

/**
 * Default configuration for semantic detection
 */
export const DEFAULT_SEMANTIC_CONFIG: SemanticDetectionConfig = {
    debounceMs: 150,
    cacheTtlMs: 30000,
    apiTimeoutMs: 300,
};

/**
 * Global symbol cache instance
 */
const symbolCache = new DocumentSymbolCache(
    50,
    DEFAULT_SEMANTIC_CONFIG.cacheTtlMs,
);

/**
 * Get the symbol cache instance (for cache invalidation)
 */
export function getSymbolCache(): DocumentSymbolCache {
    return symbolCache;
}

/**
 * Result from finding a symbol with its ancestry
 */
interface SymbolSearchResult {
    symbol: vscode.DocumentSymbol;
    parent?: vscode.DocumentSymbol;
    grandparent?: vscode.DocumentSymbol;
    siblings: vscode.DocumentSymbol[];
}

/**
 * Find the innermost symbol containing the given position, with ancestry
 *
 * @param symbols The document symbols to search
 * @param position The position to find
 * @param parent The parent symbol (for tracking ancestry)
 * @param grandparent The grandparent symbol
 * @returns The innermost symbol with ancestry info, or undefined
 */
function findInnermostSymbolWithAncestry(
    symbols: vscode.DocumentSymbol[],
    position: vscode.Position,
    parent?: vscode.DocumentSymbol,
    grandparent?: vscode.DocumentSymbol,
): SymbolSearchResult | undefined {
    for (const symbol of symbols) {
        if (symbol.range.contains(position)) {
            // Check children first (more specific)
            const childMatch = findInnermostSymbolWithAncestry(
                symbol.children,
                position,
                symbol,
                parent,
            );
            if (childMatch) {
                return childMatch;
            }
            return {
                symbol,
                parent,
                grandparent,
                siblings: parent?.children.filter((s) => s !== symbol) ?? [],
            };
        }
    }
    return undefined;
}

/**
 * Count children by symbol kind
 */
function countChildrenByKind(children: vscode.DocumentSymbol[]): {
    methods: number;
    properties: number;
} {
    let methods = 0;
    let properties = 0;
    for (const child of children) {
        if (
            child.kind === vscode.SymbolKind.Method ||
            child.kind === vscode.SymbolKind.Function
        ) {
            methods++;
        } else if (
            child.kind === vscode.SymbolKind.Property ||
            child.kind === vscode.SymbolKind.Field
        ) {
            properties++;
        }
    }
    return { methods, properties };
}

/**
 * Build SymbolContext from a symbol search result
 */
function buildSymbolContext(result: SymbolSearchResult): SymbolContext {
    const { symbol, parent, grandparent, siblings } = result;
    const counts = countChildrenByKind(symbol.children);

    return {
        symbolName: symbol.name,
        parentName: parent?.name,
        grandparentName: grandparent?.name,
        childCount: symbol.children.length,
        methodCount: counts.methods,
        propertyCount: counts.properties,
        siblingCount: siblings.length,
        modifiers: [], // Will be filled by semantic tokens
        kindName: vscode.SymbolKind[symbol.kind],
        parentKindName: parent ? vscode.SymbolKind[parent.kind] : undefined,
    };
}

/**
 * Detect trigger from document symbols
 *
 * @param document The document to analyze
 * @param position The cursor position
 * @param config Detection configuration
 * @returns Detection result or null if no match
 */
export async function detectFromSymbols(
    document: vscode.TextDocument,
    position: vscode.Position,
    config: SemanticDetectionConfig = DEFAULT_SEMANTIC_CONFIG,
): Promise<SemanticDetectionResult | null> {
    const languageId = document.languageId;

    // Try cache first
    let symbols = symbolCache.get(document);

    if (!symbols) {
        // Fetch symbols with timeout (wrap Thenable in Promise)
        const symbolsResult = await withTimeout(
            Promise.resolve(
                vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
                    'vscode.executeDocumentSymbolProvider',
                    document.uri,
                ),
            ),
            config.apiTimeoutMs,
        );

        if (!symbolsResult || symbolsResult.length === 0) {
            return null;
        }

        symbols = symbolsResult;
        symbolCache.set(document, symbols);
    }

    // Find innermost symbol at position with ancestry
    const searchResult = findInnermostSymbolWithAncestry(symbols, position);

    if (!searchResult) {
        return null;
    }

    // Map symbol kind to trigger name
    const triggerName = getTriggerNameForSymbolKind(
        searchResult.symbol.kind,
        languageId,
    );

    if (!triggerName) {
        return null;
    }

    // Build rich context
    const context = buildSymbolContext(searchResult);

    return {
        triggerName,
        source: 'symbol',
        containingSymbol: searchResult.symbol,
        context,
    };
}

/**
 * Extract text content from hover results
 *
 * @param hovers The hover results from the API
 * @returns Combined text content
 */
function extractHoverText(hovers: vscode.Hover[]): string {
    const texts: string[] = [];

    for (const hover of hovers) {
        for (const content of hover.contents) {
            if (typeof content === 'string') {
                texts.push(content);
            } else if ('value' in content) {
                texts.push(content.value);
            }
        }
    }

    return texts.join('\n');
}

/**
 * Detect trigger from hover information
 *
 * @param document The document to analyze
 * @param position The cursor position
 * @param config Detection configuration
 * @returns Detection result or null if no match
 */
export async function detectFromHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    config: SemanticDetectionConfig = DEFAULT_SEMANTIC_CONFIG,
): Promise<SemanticDetectionResult | null> {
    const languageId = document.languageId;

    // Fetch hover with timeout (wrap Thenable in Promise)
    const hovers = await withTimeout(
        Promise.resolve(
            vscode.commands.executeCommand<vscode.Hover[]>(
                'vscode.executeHoverProvider',
                document.uri,
                position,
            ),
        ),
        config.apiTimeoutMs,
    );

    if (!hovers || hovers.length === 0) {
        return null;
    }

    const hoverText = extractHoverText(hovers);
    if (!hoverText) {
        return null;
    }

    // Map hover content to trigger name
    const triggerName = getTriggerNameFromHoverContent(hoverText, languageId);
    if (!triggerName) {
        return null;
    }

    return {
        triggerName,
        source: 'hover',
        hoverInfo: hoverText,
    };
}

/**
 * Semantic token type to trigger name mapping
 * These are token types that the document symbol provider doesn't handle well
 * Maps to language-specific trigger names for detection
 */
const SEMANTIC_TOKEN_TO_TRIGGER: Record<string, string> = {
    typeParameter: 'symbolTypeParameter',
    enumMember: 'symbolEnumMember',
};

/**
 * Decode token modifiers bitmask into string array
 */
function decodeModifiers(
    modifiersBitmask: number,
    legend: vscode.SemanticTokensLegend,
): string[] {
    const modifiers: string[] = [];
    for (let i = 0; i < legend.tokenModifiers.length; i++) {
        if (modifiersBitmask & (1 << i)) {
            modifiers.push(legend.tokenModifiers[i]);
        }
    }
    return modifiers;
}

/**
 * Detect trigger from semantic tokens at a specific position
 *
 * @param document The document to analyze
 * @param position The cursor position
 * @param config Detection configuration
 * @returns Detection result or null if no match
 */
export async function detectFromSemanticTokens(
    document: vscode.TextDocument,
    position: vscode.Position,
    config: SemanticDetectionConfig = DEFAULT_SEMANTIC_CONFIG,
): Promise<SemanticDetectionResult | null> {
    // Get the legend first
    const legend = await withTimeout(
        Promise.resolve(
            vscode.commands.executeCommand<vscode.SemanticTokensLegend>(
                'vscode.provideDocumentSemanticTokensLegend',
                document.uri,
            ),
        ),
        config.apiTimeoutMs,
    );

    if (!legend) {
        return null;
    }

    // Get the tokens
    const tokens = await withTimeout(
        Promise.resolve(
            vscode.commands.executeCommand<vscode.SemanticTokens>(
                'vscode.provideDocumentSemanticTokens',
                document.uri,
            ),
        ),
        config.apiTimeoutMs,
    );

    if (!tokens || !tokens.data || tokens.data.length === 0) {
        return null;
    }

    // Decode tokens to find one at the cursor position
    // Token data is encoded as: [deltaLine, deltaStartChar, length, tokenType, tokenModifiers]
    const data = tokens.data;
    let currentLine = 0;
    let currentChar = 0;

    for (let i = 0; i < data.length; i += 5) {
        const deltaLine = data[i];
        const deltaStartChar = data[i + 1];
        const length = data[i + 2];
        const tokenTypeIndex = data[i + 3];
        const tokenModifiersBitmask = data[i + 4];

        // Update position
        if (deltaLine > 0) {
            currentLine += deltaLine;
            currentChar = deltaStartChar;
        } else {
            currentChar += deltaStartChar;
        }

        // Check if cursor is within this token
        if (
            currentLine === position.line &&
            currentChar <= position.character &&
            position.character < currentChar + length
        ) {
            const tokenType = legend.tokenTypes[tokenTypeIndex];
            const triggerName = SEMANTIC_TOKEN_TO_TRIGGER[tokenType];
            const modifiers = decodeModifiers(tokenModifiersBitmask, legend);

            // Extract the actual token text from the document
            const tokenRange = new vscode.Range(
                currentLine,
                currentChar,
                currentLine,
                currentChar + length,
            );
            const symbolName = document.getText(tokenRange);

            if (triggerName) {
                // Build partial context from semantic token info
                const context: SymbolContext = {
                    symbolName,
                    childCount: 0,
                    methodCount: 0,
                    propertyCount: 0,
                    siblingCount: 0,
                    modifiers,
                    kindName: tokenType,
                };

                return {
                    triggerName,
                    source: 'symbol',
                    context,
                };
            }
        }
    }

    return null;
}

/**
 * Merge contexts from multiple detection sources
 * Semantic tokens provide: symbolName, modifiers, kindName
 * Document symbols provide: parentName, childCount, siblingCount, etc.
 */
function mergeContexts(
    semanticContext?: SymbolContext,
    symbolContext?: SymbolContext,
): SymbolContext | undefined {
    if (!semanticContext && !symbolContext) {
        return undefined;
    }

    if (!semanticContext) {
        return symbolContext;
    }

    if (!symbolContext) {
        return semanticContext;
    }

    // Merge: prefer semantic token data for name/modifiers,
    // document symbol data for relationships
    return {
        symbolName: semanticContext.symbolName || symbolContext.symbolName,
        parentName: symbolContext.parentName,
        grandparentName: symbolContext.grandparentName,
        childCount: symbolContext.childCount,
        methodCount: symbolContext.methodCount,
        propertyCount: symbolContext.propertyCount,
        siblingCount: symbolContext.siblingCount,
        modifiers:
            semanticContext.modifiers.length > 0
                ? semanticContext.modifiers
                : symbolContext.modifiers,
        kindName: semanticContext.kindName || symbolContext.kindName,
        parentKindName: symbolContext.parentKindName,
    };
}

/**
 * Run semantic detection using Symbol, Hover, and Semantic Token APIs
 *
 * @param document The document to analyze
 * @param position The cursor position
 * @param config Detection configuration
 * @returns Detection result or null if no match
 */
export async function detectSemantic(
    document: vscode.TextDocument,
    position: vscode.Position,
    config: SemanticDetectionConfig = DEFAULT_SEMANTIC_CONFIG,
): Promise<SemanticDetectionResult | null> {
    // Run all detections in parallel
    const [symbolResult, hoverResult, semanticTokenResult] = await Promise.all([
        detectFromSymbols(document, position, config),
        detectFromHover(document, position, config),
        detectFromSemanticTokens(document, position, config),
    ]);

    // Determine which result to use (prefer semantic tokens > hover > symbol)
    const primaryResult = semanticTokenResult || hoverResult || symbolResult;

    if (!primaryResult) {
        return null;
    }

    // Merge contexts from all sources for richer information
    const mergedContext = mergeContexts(
        semanticTokenResult?.context,
        symbolResult?.context,
    );

    return {
        ...primaryResult,
        context: mergedContext,
    };
}
