/**
 * TypeScript/JavaScript language configuration
 *
 * Regex patterns are language-specific (defined here).
 * Symbol patterns are shared across all languages (from parent index).
 */

import { Language } from '../../types';
import { regexPatterns } from './patterns';
import { symbolPatterns } from '../symbols';

export const typescript: Language = {
    id: 'typescript',
    aliases: ['typescriptreact', 'javascript', 'javascriptreact'],
    patterns: [...regexPatterns, ...symbolPatterns],
};
