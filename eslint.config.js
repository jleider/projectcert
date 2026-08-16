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
      ".wrangler/**",
      ".claude/**",
      "public/**",
      "playwright-report/**",
      "test-results/**",
      "src/env.d.ts",
      // Standalone Playwright e2e harness for the gated console — run via
      // `node` (needs wrangler + a browser), not part of the lint/type gate.
      "tests/e2e/**/*.mjs",
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
      // Warnings are errors. Every rule below is blocking (also enforced
      // by `--max-warnings 0`). `any` is permitted only with an explicit
      // inline eslint-disable at the rare JSON-LD boundary that needs it.
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-empty": ["error", { allowEmptyCatch: true }],
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
    // Every internal route must come from ROUTES / ANCHORS in @/lib/routes
    // or the per-state helpers in @/lib/state-types, so a renamed page
    // surfaces as a typecheck failure rather than a silent broken link.
    //
    // All three selectors live in ONE config object on purpose: flat config
    // REPLACES a rule's options rather than merging them, so a second block
    // setting `no-restricted-syntax` for an overlapping glob silently
    // disables the selectors declared in the first.
    //
    // Exempted: @/lib/state-types.ts is where the per-state path helpers are
    // defined, and the build-check scripts assert against built output paths
    // rather than linking to them.
    files: ["**/*.astro", "**/*.svelte", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    ignores: ["src/lib/state-types.ts", "scripts/**", "tests/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          // Astro/JSX markup. Permitted: external URLs (`https://`,
          // `mailto:`, `tel:`) and expressions resolving to a Route /
          // LinkUrl. Forbidden: literal "/foo/" or "#anchor" strings.
          selector: "JSXOpeningElement[name.name='a'] > JSXAttribute[name.name='href'] > Literal[value=/^[/#]/u]",
          message:
            "Bare-string href on <a>. Use href={ROUTES.x} or href={sameAnchor(ANCHORS.x)} from @/lib/routes; per-state URLs come from stateUrl(usps).",
        },
        {
          // The same rule for Svelte islands, whose markup parses to
          // SvelteElement/SvelteAttribute rather than JSX — so the selector
          // above never saw them, and every hand-built href inside an island
          // went unguarded.
          //
          // `/` rather than a literal `/`: esquery ends an attribute
          // regex at the first unescaped slash, even inside a character
          // class, so `/^[/#]/u` compiles but matches nothing.
          selector:
            "SvelteElement[name.name='a'] > SvelteStartTag > SvelteAttribute[key.name='href'] > SvelteLiteral[value=/^[\\u002F#]/u]",
          message:
            "Bare-string href on <a>. Use href={ROUTES.x} from @/lib/routes; per-state URLs come from stateUrl(usps) in @/lib/state-types.",
        },
        {
          // The other half of the same bug: a template literal assembling an
          // internal path. The two selectors above only see string literals,
          // so `` `/states/${usps}/` `` slipped past them in every file type
          // — which is how Compare.svelte came to hand-build one in defiance
          // of CLAUDE.md.
          selector:
            "TemplateLiteral > TemplateElement:first-child[value.raw=/^\\u002F(states|audit|credentials)\\u002F/u]",
          message:
            "Hand-built internal path. Use stateUrl / elPercentHistoryUrl / auditStateUrl from @/lib/state-types, or ROUTES from @/lib/routes — never concatenate the path, and never cast the result `as LinkUrl`.",
        },
      ],
    },
  },
  // Must come last: turns off ESLint stylistic rules that would conflict
  // with Prettier. Formatting is owned by Prettier (`npm run check:format`).
  eslintConfigPrettier,
];
