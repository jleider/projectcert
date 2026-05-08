// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      ".claude/**",
      "public/**",
      "playwright-report/**",
      "test-results/**",
      // Svelte 5 + TS-in-template needs a custom parser pipeline that
      // we haven't wired yet — rely on `astro check` (svelte-check) for
      // type errors there until we do.
      "**/*.svelte",
      "src/env.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // We rely on Astro's content-collection types; explicit `any` shows
      // up only deliberately at JSON-LD boundaries.
      "@typescript-eslint/no-explicit-any": "warn",
      // Unused vars are noisy during refactors; keep as warnings.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Inline scripts in .astro pages legitimately use `var` patterns.
      "no-empty": ["warn", { allowEmptyCatch: true }],
    },
  },
  {
    files: ["scripts/**/*.ts"],
    rules: {
      // Scripts log progress to stderr/stdout intentionally.
      "no-console": "off",
    },
  },
];
