/**
 * TypeScript/JavaScript regex-based triggers
 *
 * These are language-specific triggers detected via regex.
 * Symbol-based triggers (class, method, etc.) are handled centrally
 * via VS Code's document symbol provider.
 */

import { Trigger, TemplateContext } from '../../types';

/**
 * All regex-based triggers for TypeScript/JavaScript
 */
export const regexTriggers: Trigger[] = [
    {
        name: 'console',
        universalName: 'logging',
        regex: /\bconsole\.(log|warn|error|info|debug)\s*\(/g,
        messageCount: 5,
        getTemplateValues: (ctx: TemplateContext) => [
            ctx.symbol?.symbolName ?? '', // {0}
        ],
    },
    {
        name: 'debugger',
        universalName: 'debugging',
        regex: /\bdebugger\b/g,
        messageCount: 5,
    },
    {
        name: 'todo',
        universalName: 'todo',
        regex: /\/\/\s*TODO\b/gi,
        messageCount: 5,
    },
    {
        name: 'fixme',
        universalName: 'fixme',
        regex: /\/\/\s*FIXME\b/gi,
        messageCount: 5,
    },
    {
        name: 'function',
        universalName: 'function',
        regex: /\bfunction\s+\w+\s*\(/g,
        messageCount: 5,
        getTemplateValues: (ctx: TemplateContext) => [
            ctx.symbol?.symbolName ?? '', // {0}
        ],
    },
    {
        name: 'arrowFunction',
        universalName: 'arrowFunction',
        regex: /(?:const|let|var)\s+\w+\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g,
        messageCount: 5,
    },
    {
        name: 'class',
        universalName: 'class',
        regex: /\bclass\s+\w+/g,
        messageCount: 5,
    },
    {
        name: 'asyncAwait',
        universalName: 'async',
        regex: /\b(async\s+function|await\s+)/g,
        messageCount: 5,
    },
    {
        name: 'tryCatch',
        universalName: 'errorHandling',
        regex: /\btry\s*\{/g,
        messageCount: 5,
    },
    {
        name: 'magicNumber',
        universalName: 'magicNumber',
        regex: /(?<![.\w])\d{3,}(?![.\w])/g,
        messageCount: 5,
    },
];
