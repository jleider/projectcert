// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
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
      "src/env.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...svelte.configs["flat/recommended"],

  // Type-aware rules, scoped to .ts files (tests excluded — see below).
  // The typescript-eslint project service auto-resolves the nearest
  // tsconfig per file, so src/scripts resolve against the root config and
  // functions/ against its own (functions/tsconfig.json) — which is where
  // a floating D1 promise is a real bug. .astro and .svelte stay on the
  // syntactic rule set; their types are covered by `astro check`
  // (astro-check / svelte-check).
  ...tseslint.config({
    files: ["**/*.ts"],
    // tests/ is excluded: tests/audit-api.integration.test.ts is
    // intentionally outside the root tsconfig (CLAUDE.md), so the project
    // service cannot type it, and the fixtures lean on `any` by design.
    // Tests still get the syntactic recommended set above.
    ignores: ["tests/**"],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // The `any`-propagation family is noise here: D1 query results,
      // JSON.parse output, and JSON-LD boundaries are deliberately
      // untyped and validated at the edge. The high-value type-checked
      // rules (no-floating-promises, no-misused-promises, await-thenable,
      // no-unnecessary-type-assertion) stay on.
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
    },
  }),

  // Svelte components: wire the Svelte parser with the TS parser for
  // <script lang="ts"> blocks. Kept on the syntactic rule set (no
  // type-checked rules) — svelte-check owns Svelte type errors.
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".svelte"],
      },
    },
    rules: {
      // TypeScript / svelte-check own undefined-symbol checking; core
      // no-undef false-flags browser globals and type-only references
      // (MouseEvent, Element, window) inside <script lang="ts">.
      "no-undef": "off",
      // Reactive ($:) assignments consumed only in the template read as
      // "useless" to the core rule, which cannot see template usage.
      "no-useless-assignment": "off",
    },
  },

  {
    rules: {
      // We rely on Astro's content-collection types; explicit `any` shows
      // up only deliberately at JSON-LD boundaries.
      "@typescript-eslint/no-explicit-any": "warn",
      // Unused vars are noisy during refactors; keep as warnings.
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
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
    files: ["tests/**/*.ts"],
    rules: {
      // Tests parse dynamic JSON response bodies and assert on their
      // shape; reading them as `any` is the pragmatic, conventional
      // choice and keeps the assertions legible.
      "@typescript-eslint/no-explicit-any": "off",
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
          selector: "JSXOpeningElement[name.name='a'] > JSXAttribute[name.name='href'] > Literal[value=/^[/#]/u]",
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
