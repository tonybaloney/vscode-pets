import { Pattern } from '../../types';

export const fixmePattern: Pattern = {
    name: 'fixme',
    regex: /\/\/\s*FIXME\b/gi,
    tipCount: 5,
};
