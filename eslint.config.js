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
      ".wrangler/**",
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
      // Warnings are errors. Every rule below is blocking (also enforced
      // by `--max-warnings 0`). `any` is permitted only with an explicit
      // inline eslint-disable at the rare JSON-LD boundary that needs it.
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
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
];
