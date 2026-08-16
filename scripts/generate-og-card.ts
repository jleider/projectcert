/**
 * Regenerates `public/og-default.png`, the 1200x630 social-share card.
 *
 * The card is built from the same brand mark as `public/logo.svg` — the
 * four-square bin palette plus the checkmark glyph — so the share card and
 * the site header cannot drift apart. The wordmark is lifted verbatim from
 * `logo.svg` as vector path data rather than set as text, which keeps the
 * output independent of whatever fonts happen to be installed on the
 * machine doing the rasterizing.
 *
 * Colors are hardcoded to the light-mode token values. A PNG cannot respond
 * to `prefers-color-scheme`, and social-share cards are composited onto the
 * sharing platform's own surface, so there is no theme to inherit.
 *
 * Run after changing the brand mark:
 *
 *   npx tsx scripts/generate-og-card.ts
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = resolve(ROOT, "public/logo.svg");
const OUT = resolve(ROOT, "public/og-default.png");

const WIDTH = 1200;
const HEIGHT = 630;

// Light-mode token values, mirroring src/styles/tokens.css.
const BIN_0 = "#e8cffa";
const BIN_1 = "#bc92ea";
const BIN_2 = "#6731b8";
const BIN_3 = "#3d1971";
const CHECK = "#ffffff";
const INK = "#16181f";
const INK_MUTED = "#5b6070";
const BRAND = "#3d1971";
const SURFACE = "#ffffff";

/**
 * Pull the wordmark and checkmark paths out of logo.svg. The wordmark is
 * split into "project" (the ink token) and "cert" (the brand token). All are
 * matched by their `fill` so a change to the path data itself flows through
 * without touching this script.
 */
function logoPaths(): { project: string; cert: string; check: string } {
  const svg = readFileSync(LOGO, "utf8");

  const grabFill = (token: string): string => {
    const match = new RegExp(`<path fill="var\\(--${token}\\)" d="([^"]+)"`).exec(svg);
    if (!match?.[1]) {
      throw new Error(`Could not find the --${token} wordmark path in public/logo.svg. Did the logo change shape?`);
    }
    return match[1];
  };

  // The checkmark is read from the logo rather than duplicated here. A copy
  // would be free to drift from the brand mark, which is exactly the failure
  // this script exists to prevent — the card and the site header must show
  // the same glyph.
  const checkMatch = /<path fill="none" stroke="var\(--check\)"[^>]*d="([^"]+)"/.exec(svg);
  if (!checkMatch?.[1]) {
    throw new Error("Could not find the --check glyph path in public/logo.svg. Did the logo change shape?");
  }

  return { project: grabFill("ink"), cert: grabFill("brand"), check: checkMatch[1] };
}

function buildSvg(): string {
  const { project, cert, check } = logoPaths();

  // logo.svg is authored against a 220x48 viewBox. Scaling by 4 gives an
  // 880x192 wordmark, which leaves comfortable margins at 1200x630.
  //
  // The vertical offsets below are chosen so the whole block — mark,
  // wordmark, two subtitle lines and the rule — is optically centred. The
  // mark's own artwork starts at y=4 within the logo viewBox, so the group
  // translate is not the top of the visible content.
  const scale = 4;
  const wordmarkX = (WIDTH - 220 * scale) / 2;
  const wordmarkY = 155;
  const subtitleY = 375;
  const subtitleLineHeight = 48;
  const ruleY = 467;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${SURFACE}"/>
  <rect width="${WIDTH}" height="14" fill="${BRAND}"/>

  <g transform="translate(${wordmarkX} ${wordmarkY}) scale(${scale})">
    <rect width="18" height="18" x="2" y="4" fill="${BIN_0}" rx="3.5"/>
    <rect width="18" height="18" x="22" y="4" fill="${BIN_1}" rx="3.5"/>
    <rect width="18" height="18" x="2" y="24" fill="${BIN_2}" rx="3.5"/>
    <rect width="18" height="18" x="22" y="24" fill="${BIN_3}" rx="3.5"/>
    <path fill="none" stroke="${CHECK}" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="${check}"/>
    <path fill="${INK}" d="${project}"/>
    <path fill="${BRAND}" d="${cert}"/>
  </g>

  <text x="${WIDTH / 2}" y="${subtitleY}" text-anchor="middle" fill="${INK_MUTED}"
        font-family="Helvetica, Arial, sans-serif" font-size="34">
    Teacher certification for English Learner students
  </text>
  <text x="${WIDTH / 2}" y="${subtitleY + subtitleLineHeight}" text-anchor="middle" fill="${INK_MUTED}"
        font-family="Helvetica, Arial, sans-serif" font-size="34">
    across all 51 state education agencies
  </text>

  <rect x="${WIDTH / 2 - 60}" y="${ruleY}" width="120" height="4" rx="2" fill="${BIN_1}"/>
</svg>`;
}

const png = await sharp(Buffer.from(buildSvg())).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(OUT, png);

const { width, height } = await sharp(png).metadata();
console.log(`Wrote ${OUT} (${width}x${height}, ${(png.length / 1024).toFixed(1)} KB)`);
