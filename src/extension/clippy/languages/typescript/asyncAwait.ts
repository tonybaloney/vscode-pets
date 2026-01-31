import { Pattern } from '../../types';

export const asyncAwaitPattern: Pattern = {
    name: 'asyncAwait',
    regex: /\b(async\s+function|await\s+)/g,
    tipCount: 5,
};
