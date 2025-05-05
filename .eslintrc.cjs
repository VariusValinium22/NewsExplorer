module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "no-console": ["warn", { allow: ["error"] }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-unused-expressions": "warn",
    "operator-linebreak": ["off"],
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
      },
    ],
    "react/prop-types": 0,
    "no-warning-comments": [
      "error",
      {
        terms: [
          "eslint-disable",
          "eslint-disable-line",
          "eslint-disable-next-line",
        ],
        location: "start",
      },
    ],
    quotes: ["error", "single", { avoidEscape: true }],
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
    },
    {
      files: ["vite.config.js"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
