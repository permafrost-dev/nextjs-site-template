/** @type {import('eslint').Linter.Config } */
module.exports = {
    env: {
        browser: true,
        commonjs: true,
    },
    settings: {},
    overrides: [
        { files: '*.d.ts', rules: { strict: [ 'error', 'never' ] } },
        {
            files: [ '.eslintrc.js', 'next.config.js' ],
            rules: {
                'sort-keys': 'off',
                'array-element-newline': [ 'warn', { multiline: true, minItems: 4 }],
            },
        },
    ],
    plugins: [ 'tailwindcss' ],
    extends: [
        'eslint:recommended',
        'next',
        'next/core-web-vitals',
        'plugin:tailwindcss/recommended'
    ],
    rules: {
        '@next/next/no-server-import-in-page': 'off',
        '@next/next/no-html-link-for-pages': 'off',
        'newline-per-chained-call': [ 'warn', { ignoreChainWithDepth: 2 }],
        'array-bracket-newline': [ 'warn', { multiline: true, minItems: 4 }],
        'array-bracket-spacing': [ 'warn', 'always', { objectsInArrays: false }],
        'array-element-newline': [ 'warn', { multiline: true, minItems: 3 }],
        eqeqeq: [ 'error', 'smart' ],
        indent: [ 'warn', 4, { SwitchCase: 1 }],
        'no-eval': 'error',
        'no-var': 'error',
        'object-curly-newline': [ 'warn', { ObjectExpression: { multiline: true, minProperties: 4 }, ObjectPattern: { multiline: true, minProperties: 4 }, ImportDeclaration: 'never' },],
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 'off',
        'sort-imports': [
            'warn',
            {
                memberSyntaxSortOrder: [
                    'multiple',
                    'single',
                    'none',
                    'all'
                ],
            },
        ],
        'sort-keys': [ 'warn', 'asc', { caseSensitive: false, minKeys: 2, natural: true }],
        'tailwindcss/no-custom-classname': [ 'warn', { whitelist: [ 'text-md', 'ring-opacity/5' ] }],
    },
    ignorePatterns: [
        'dist/*',
        '.next/*',
        'node_modules/*',
        '*.d.ts'
    ],
};
