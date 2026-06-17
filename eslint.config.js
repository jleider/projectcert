// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";

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
  {
    // Prevent bare-string internal hrefs on <a>. Every internal route
    // must come from ROUTES / ANCHORS / stateUrl in @/lib/routes (and
    // @/lib/state-types) so a renamed page surfaces as a typecheck
    // failure rather than a silent broken link.
    //
    // Permitted: external URLs (`https://`, `mailto:`, `tel:`),
    // template literals, and JSX expressions resolving to a Route /
    // LinkUrl. Forbidden: literal "/foo/" or "#anchor" strings.
    files: ["**/*.astro", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXOpeningElement[name.name='a'] > JSXAttribute[name.name='href'] > Literal[value=/^[/#]/u]",
          message:
            "Bare-string href on <a>. Use href={ROUTES.x} or href={sameAnchor(ANCHORS.x)} from @/lib/routes; per-state URLs come from stateUrl(usps).",
        },
      ],
    },
  },
  // Must come last: turns off ESLint stylistic rules that would conflict
  // with Prettier. Formatting is owned by Prettier (`npm run check:format`).
  eslintConfigPrettier,
];
