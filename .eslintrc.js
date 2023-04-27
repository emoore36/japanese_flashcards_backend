module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: 'standard',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'no-dupe-class-members': 'off',
        'no-unused-expressions': 'off'
    }
};
