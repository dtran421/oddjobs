module.exports = {
    extends: [
        "airbnb",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "eslint:recommended"
    ],
    plugins: ["@typescript-eslint", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
    },
    ignorePatterns: ["*.js"],
    rules: {
        "import/no-unresolved": 0,
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [".ts", ".tsx"]
            }
        ],
        "prettier/prettier": "error",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "import/extensions": ["error", "never"],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "no-console": ["error", { allow: ["warn", "error"] }]
    }
};
