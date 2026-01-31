import { Pattern } from '../../types';

export const todoPattern: Pattern = {
    name: 'todo',
    regex: /\/\/\s*TODO\b/gi,
    tipCount: 5,
};
