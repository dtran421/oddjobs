module.exports = {
    extends: [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    plugins: ["@typescript-eslint", "react", "prettier"],
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
        "prettier/prettier": "warn",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "import/extensions": ["error", "never"],
        "react/prop-types": 0,
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "off",
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-unused-vars": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "react/require-default-props": "off",
        "react/function-component-definition": [
            "error",
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function"
            }
        ],
        "react/no-unstable-nested-components": "off"
    }
};
