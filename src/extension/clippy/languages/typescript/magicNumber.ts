import { Pattern } from '../../types';

export const magicNumberPattern: Pattern = {
    name: 'magicNumber',
    regex: /(?<![.\w])\d{3,}(?![.\w])/g,
    tipCount: 5,
};
