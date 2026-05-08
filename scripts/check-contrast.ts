/**
 * WCAG contrast verification for the design tokens.
 *
 * Reads src/styles/tokens.css, extracts hex colors, computes WCAG 2.1
 * relative-luminance ratios for the pairings the site actually uses,
 * and exits non-zero if any pairing fails its target.
 *
 * Run: `npm run check:contrast`
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_PATH = resolve(__dirname, "../src/styles/tokens.css");

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return [r, g, b];
}

function relLuminance([r, g, b]: [number, number, number]): number {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a: string, b: string): number {
  const la = relLuminance(hexToRgb(a));
  const lb = relLuminance(hexToRgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

function extractToken(css: string, name: string): string {
  const re = new RegExp(`--${name}\\s*:\\s*(#[0-9a-fA-F]{6})`);
  const m = css.match(re);
  if (!m) throw new Error(`Token --${name} not found in tokens.css`);
  return m[1]!.toLowerCase();
}

interface Check {
  label: string;
  fg: string;
  bg: string;
  min: number;
}

const css = readFileSync(TOKENS_PATH, "utf8");

const tokens = {
  bin0: extractToken(css, "bin-0"),
  bin1: extractToken(css, "bin-1"),
  bin2: extractToken(css, "bin-2"),
  bin3: extractToken(css, "bin-3"),
  ink: extractToken(css, "ink"),
  inkMuted: extractToken(css, "ink-muted"),
  inkSubtle: extractToken(css, "ink-subtle"),
  accent: extractToken(css, "accent"),
  accentHover: extractToken(css, "accent-hover"),
  surface: extractToken(css, "surface"),
};

const checks: Check[] = [
  // Body text on white — AAA (>= 7)
  { label: "ink on surface (body text, AAA)", fg: tokens.ink, bg: tokens.surface, min: 7 },
  { label: "ink-muted on surface (AAA)", fg: tokens.inkMuted, bg: tokens.surface, min: 7 },
  // Subtle on surface — AA (>= 4.5)
  { label: "ink-subtle on surface (AA)", fg: tokens.inkSubtle, bg: tokens.surface, min: 4.5 },
  // Accent (links) — AA
  { label: "accent on surface (AA)", fg: tokens.accent, bg: tokens.surface, min: 4.5 },
  { label: "accent-hover on surface (AA)", fg: tokens.accentHover, bg: tokens.surface, min: 4.5 },
  // Top bin must support white text (used for state labels on dark fill)
  { label: "white on bin-3 (state label on dark fill, AA)", fg: "#ffffff", bg: tokens.bin3, min: 4.5 },
  { label: "white on bin-2 (state label, AA)", fg: "#ffffff", bg: tokens.bin2, min: 4.5 },
  // Light bins must support dark text on top (state labels on light fill)
  { label: "ink on bin-0 (state label on light fill, AAA)", fg: tokens.ink, bg: tokens.bin0, min: 7 },
  { label: "ink on bin-1 (state label, AAA)", fg: tokens.ink, bg: tokens.bin1, min: 7 },
];

let failed = 0;
for (const c of checks) {
  const ratio = contrast(c.fg, c.bg);
  const ok = ratio >= c.min;
  const tag = ok ? "PASS" : "FAIL";
  console.log(`${tag}  ${ratio.toFixed(2).padStart(5)} >= ${c.min.toFixed(1)}  ${c.label}  (${c.fg} on ${c.bg})`);
  if (!ok) failed++;
}

// Adjacent bin contrasts — informational only. Where these don't clear
// 3:1, the legend's hatched-pattern overlay carries the meaning.
console.log("\nAdjacent bin contrasts (informational; <3:1 relies on hatched pattern):");
for (const [a, b] of [
  [tokens.bin0, tokens.bin1],
  [tokens.bin1, tokens.bin2],
  [tokens.bin2, tokens.bin3],
] as const) {
  console.log(`  ${a} vs ${b}  =  ${contrast(a, b).toFixed(2)}`);
}

if (failed > 0) {
  console.error(`\n${failed} contrast check(s) failed. Adjust src/styles/tokens.css.`);
  process.exit(1);
}
console.log(`\nAll ${checks.length} required contrast checks passed.`);
