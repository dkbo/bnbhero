// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    globals: {
        _M: true,
        moment: true,
        define: true
    },
    // required to lint *.vue files
    plugins: [
        'html', 'vue'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "space-before-function-paren": ["error", {
            "anonymous": "ignore",
            "named": "ignore",
            "asyncArrow": "ignore"
        }],
        'indent': [2, 4, { "SwitchCase": 1 }],
        'eol-last': [0, "always"],
        'no-useless-constructor': 0,
        "no-unused-vars": [1, { "vars": "all", "args": "after-used" }],
        'spaced-comment': [0, "never"],
        //駝峰命名
        'camelcase': ["error", { properties: "never" }],
        //tabs
        "disallowTabs": 0,
        'no-extra-boolean-cast': 0
    }
}