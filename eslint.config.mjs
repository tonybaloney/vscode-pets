import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
    { ignores: ['**/*.js'] },
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.test.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'unused-imports': unusedImports,
        },
        rules: {
            '@typescript-eslint/naming-convention': 'warn',
            curly: 'warn',
            eqeqeq: 'warn',
            'no-throw-literal': 'warn',
            'no-unused-vars': ['error', { caughtErrors: 'none' }],
            'unused-imports/no-unused-imports': 'error',
            'prefer-const': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
        },
    },
];
