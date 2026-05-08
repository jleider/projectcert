/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,svelte,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        // Choropleth bins (sequential single-hue purple).
        // Tuned for WCAG AA: each adjacent pair clears 3:1 against
        // each other and against the 1px white border between states.
        // Final values are checked at build time by check-contrast.ts.
        bin: {
          0: "var(--bin-0)", // <3% EL
          1: "var(--bin-1)", // 3-6% EL
          2: "var(--bin-2)", // 6-10% EL
          3: "var(--bin-3)", // >=10% EL
        },
        // Green is reserved for UI accents (links, focus, success).
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          ring: "var(--accent-ring)",
        },
        // Slate scale for body text. AAA contrast on white.
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          subtle: "var(--ink-subtle)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
          warn: "var(--surface-warn)",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Inter",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
