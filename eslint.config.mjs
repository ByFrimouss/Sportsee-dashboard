import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    extends: [js.configs.recommended, react.configs.flat.recommended],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React moderne
      "react/react-in-jsx-scope": "off",

      // Hooks (équivalent du recommended)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Qualité stricte mais réaliste
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
]);
