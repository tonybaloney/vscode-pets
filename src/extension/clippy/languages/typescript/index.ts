/**
 * TypeScript/JavaScript language patterns
 *
 * Each pattern is defined in its own file for maintainability.
 * To add a new pattern:
 * 1. Create a new file (e.g., myPattern.ts)
 * 2. Export a Pattern object
 * 3. Import and add it to the patterns array below
 */

import { Language } from '../../types';
import { consolePattern } from './console';
import { todoPattern } from './todo';
import { fixmePattern } from './fixme';
import { functionPattern } from './function';
import { arrowFunctionPattern } from './arrowFunction';
import { classPattern } from './class';
import { debuggerPattern } from './debugger';
import { asyncAwaitPattern } from './asyncAwait';
import { tryCatchPattern } from './tryCatch';
import { magicNumberPattern } from './magicNumber';

export const typescript: Language = {
    id: 'typescript',
    aliases: ['typescriptreact', 'javascript', 'javascriptreact'],
    patterns: [
        consolePattern,
        todoPattern,
        fixmePattern,
        functionPattern,
        arrowFunctionPattern,
        classPattern,
        debuggerPattern,
        asyncAwaitPattern,
        tryCatchPattern,
        magicNumberPattern,
    ],
};
