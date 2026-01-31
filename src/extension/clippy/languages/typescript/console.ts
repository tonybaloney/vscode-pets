import { Pattern } from '../../types';

export const consolePattern: Pattern = {
    name: 'console',
    regex: /\bconsole\.(log|warn|error|info|debug)\s*\(/g,
    tipCount: 5,
};
