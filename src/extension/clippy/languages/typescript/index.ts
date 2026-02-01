/**
 * TypeScript/JavaScript language configuration
 *
 * Regex triggers are language-specific (defined here).
 * Symbol triggers are shared across all languages (from parent index).
 */

import { Language } from '../../types';
import { regexTriggers } from './triggers';
import { symbolTriggers } from '../symbols';

export const typescript: Language = {
    id: 'typescript',
    aliases: ['typescriptreact', 'javascript', 'javascriptreact'],
    triggers: [...regexTriggers, ...symbolTriggers],
};
