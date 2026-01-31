import { Pattern } from '../../types';

export const tryCatchPattern: Pattern = {
    name: 'tryCatch',
    regex: /\btry\s*\{/g,
    tipCount: 5,
};
