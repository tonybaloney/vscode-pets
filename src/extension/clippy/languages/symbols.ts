/**
 * Universal symbol patterns (shared across all languages)
 *
 * These patterns are detected via VS Code's document symbol provider,
 * not regex. They work for any language that VS Code supports.
 */

import { Pattern, TemplateContext } from '../types';

/**
 * Symbol types supported by VS Code
 */
const SYMBOL_TYPES = [
    'file',
    'module',
    'namespace',
    'package',
    'class',
    'method',
    'property',
    'field',
    'constructor',
    'enum',
    'interface',
    'function',
    'variable',
    'constant',
    'string',
    'number',
    'boolean',
    'array',
    'object',
    'key',
    'null',
    'enumMember',
    'struct',
    'event',
    'operator',
    'typeParameter',
] as const;

/**
 * Symbol-type-specific value extractors for template replacement
 * Maps symbol types to functions that extract relevant context values
 *
 * Positional placeholder meanings:
 * - class: {0} = symbolName, {1} = childCount
 * - function: {0} = symbolName
 * - method: {0} = symbolName, {1} = parentName
 * - interface: {0} = symbolName, {1} = childCount
 * - property: {0} = symbolName, {1} = parentName
 * - variable: {0} = symbolName
 * - constant: {0} = symbolName
 * - constructor: {0} = symbolName, {1} = parentName
 * - enum: {0} = symbolName, {1} = childCount
 * - Default: {0} = symbolName
 */
const SYMBOL_VALUE_EXTRACTORS: Record<
    string,
    (ctx: TemplateContext) => string[]
> = {
    class: (ctx) => [
        ctx.symbol?.symbolName ?? '', // {0} - symbol name
        ctx.symbol?.childCount?.toString() ?? '0', // {1} - number of members
    ],
    function: (ctx) => [
        ctx.symbol?.symbolName ?? '', // {0} - symbol name
    ],
    method: (ctx) => [
        ctx.symbol?.symbolName ?? '', // {0} - symbol name
        ctx.symbol?.parentName ?? '', // {1} - parent name
    ],
    interface: (ctx) => [
        ctx.symbol?.symbolName ?? '', // {0} - symbol name
        ctx.symbol?.childCount?.toString() ?? '0', // {1} - number of members
    ],
    property: (ctx) => [
        ctx.symbol?.symbolName ?? '', // {0} - symbol name
        ctx.symbol?.parentName ?? '', // {1} - parent name
    ],
    variable: (ctx) => [
        ctx.symbol?.symbolName ?? '', // {0} - symbol name
    ],
    constant: (ctx) => [
        ctx.symbol?.symbolName ?? '', // {0} - symbol name
    ],
    // Needs explicit typing to avoid conflict with reserved word
    constructor: (ctx: TemplateContext) => [
        ctx.symbol?.symbolName ?? '', // {0} - symbol name
        ctx.symbol?.parentName ?? '', // {1} - parent name
    ],
    enum: (ctx) => [
        ctx.symbol?.symbolName ?? '', // {0} - symbol name
        ctx.symbol?.childCount?.toString() ?? '0', // {1} - number of members
    ],
};

/**
 * Create a symbol pattern
 * Symbol patterns use a never-matching regex since they're detected via VS Code APIs
 */
function createSymbolPattern(symbolType: string): Pattern {
    // Get the value extractor for this symbol type, or use default (symbolName only)
    const extractor: (ctx: TemplateContext) => string[] =
        SYMBOL_VALUE_EXTRACTORS[symbolType] ||
        ((ctx: TemplateContext) => [ctx.symbol?.symbolName ?? '']);


    // Capitalize first letter for pattern name
    const symbolTypeName = symbolType.replace(/^./, (c) => c.toUpperCase());

    return {
        name: `symbol${symbolTypeName}`,
        universalName: `symbol.${symbolType}`,
        regex: /(?!)/g, // Never matches - detected via symbol provider
        tipCount: 5,
        getTemplateValues: extractor,
    };
}

/**
 * All symbol patterns (generated programmatically)
 */
export const symbolPatterns: Pattern[] = SYMBOL_TYPES.map(createSymbolPattern);
