import { Pattern } from '../../types';

export const functionPattern: Pattern = {
    name: 'function',
    regex: /\bfunction\s+\w+\s*\(/g,
    tipCount: 5,
};
