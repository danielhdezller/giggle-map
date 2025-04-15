import pgk from "@typescript-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";
import parser from "@typescript-eslint/parser";
import pluginPrettier from "eslint-plugin-prettier";
import * as typescriptPlugin from "@typescript-eslint/eslint-plugin";

const { config } = pgk;

export default defineConfig([
  {
    files: ["src/**/*.ts"],
    plugins: {
      prettier: pluginPrettier,
      "@typescript-eslint": typescriptPlugin,
    },
    languageOptions: {
      parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      // 🧹 TypeScript Rules
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/prefer-ts-expect-error": "warn",

      // ⚙️ ESLint Core Rules
      "no-console": "warn",
      "no-unused-vars": "off", // handled by TS
      "no-constant-condition": "warn",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-empty-function": "off", // handled by TS

      // 🎨 Prettier
      "prettier/prettier": "warn",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    ignores: ["dist", "node_modules"],
  },
]);
