import { Pattern } from '../../types';

export const arrowFunctionPattern: Pattern = {
    name: 'arrowFunction',
    regex: /(?:const|let|var)\s+\w+\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g,
    tipCount: 5,
};
