/**
 * TypeScript/JavaScript regex-based patterns
 *
 * These are language-specific patterns detected via regex.
 * Symbol-based patterns (class, method, etc.) are handled centrally
 * via VS Code's document symbol provider.
 */

import { Pattern, TemplateContext } from '../../types';

/**
 * All regex-based patterns for TypeScript/JavaScript
 */
export const regexPatterns: Pattern[] = [
    {
        name: 'console',
        universalName: 'logging',
        regex: /\bconsole\.(log|warn|error|info|debug)\s*\(/g,
        tipCount: 5,
        getTemplateValues: (ctx: TemplateContext) => [
            ctx.symbol?.symbolName ?? '', // {0}
        ],
    },
    {
        name: 'debugger',
        universalName: 'debugging',
        regex: /\bdebugger\b/g,
        tipCount: 5,
    },
    {
        name: 'todo',
        universalName: 'todo',
        regex: /\/\/\s*TODO\b/gi,
        tipCount: 5,
    },
    {
        name: 'fixme',
        universalName: 'fixme',
        regex: /\/\/\s*FIXME\b/gi,
        tipCount: 5,
    },
    {
        name: 'function',
        universalName: 'function',
        regex: /\bfunction\s+\w+\s*\(/g,
        tipCount: 5,
        getTemplateValues: (ctx: TemplateContext) => [
            ctx.symbol?.symbolName ?? '', // {0}
        ],
    },
    {
        name: 'arrowFunction',
        universalName: 'arrowFunction',
        regex: /(?:const|let|var)\s+\w+\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g,
        tipCount: 5,
    },
    {
        name: 'class',
        universalName: 'class',
        regex: /\bclass\s+\w+/g,
        tipCount: 5,
    },
    {
        name: 'asyncAwait',
        universalName: 'async',
        regex: /\b(async\s+function|await\s+)/g,
        tipCount: 5,
    },
    {
        name: 'tryCatch',
        universalName: 'errorHandling',
        regex: /\btry\s*\{/g,
        tipCount: 5,
    },
    {
        name: 'magicNumber',
        universalName: 'magicNumber',
        regex: /(?<![.\w])\d{3,}(?![.\w])/g,
        tipCount: 5,
    },
];
