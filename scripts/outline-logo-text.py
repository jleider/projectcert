"""
Outline the "projectcert" wordmark to SVG path data using IBM Plex
Sans at weight 600 and write public/logo.svg + public/logo-mono.svg
directly. Converts the text to geometry so the SVG renders
identically without requiring the font to be installed at view time.

Run: python3 scripts/outline-logo-text.py
"""

from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2"
TEXT = "projectcert"
WEIGHT = 600
FONT_SIZE = 22
BASELINE_X = 52
BASELINE_Y = 31
COLOR_SPLIT = 7  # first N glyphs use --ink, rest use --brand

font = instantiateVariableFont(TTFont(str(FONT)), {"wght": WEIGHT})
cmap = font.getBestCmap()
glyf_set = font.getGlyphSet()
hmtx = font["hmtx"].metrics
scale = FONT_SIZE / font["head"].unitsPerEm

x_units = 0.0
glyph_paths = []  # list of (x_px, path_d)
for ch in TEXT:
    gid = cmap[ord(ch)]
    pen = SVGPathPen(glyf_set)
    glyf_set[gid].draw(pen)
    glyph_paths.append((x_units * scale, pen.getCommands()))
    x_units += hmtx[gid][0]


def emit_glyphs(indices):
    lines = []
    for i in indices:
        x_px, d = glyph_paths[i]
        lines.append(
            f'      <path transform="translate({x_px:.3f} 0) scale({scale} {-scale})" d="{d}"/>'
        )
    return "\n".join(lines)


ink_glyphs = emit_glyphs(range(0, COLOR_SPLIT))
brand_glyphs = emit_glyphs(range(COLOR_SPLIT, len(TEXT)))
all_glyphs = emit_glyphs(range(0, len(TEXT)))

COLOR_LOGO = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 48" role="img" aria-label="projectcert">
  <title>projectcert</title>
  <!--
    Standalone SVGs cannot inherit CSS custom properties from the
    embedding page. The palette is mirrored internally and flips via
    prefers-color-scheme so the logo adapts when shown in dark
    contexts (in-page, social-share previews on dark clients, etc.).
    Light-mode values mirror tokens.css bin-0..bin-3, ink, and brand;
    dark-mode values mirror the dark theme.

    The wordmark is outlined to paths (IBM Plex Sans SemiBold, 22px)
    so the SVG renders identically without a font dependency.
    Regenerate with `python3 scripts/outline-logo-text.py` when the
    typeface, weight, or wordmark text changes.
  -->
  <style>
    svg {{
      --bin-0: #e8cffa;
      --bin-1: #bc92ea;
      --bin-2: #6731b8;
      --bin-3: #3d1971;
      --check: #ffffff;
      --ink: #16181f;
      --brand: #3d1971;
    }}
    /*
     * Dark-mode brand palette intentionally preserves the same
     * luminance direction as light mode (dim 0 -> bright 3) rather
     * than flipping it like the map choropleth does. The map flips
     * because a dim tile on a dark surface reads as "low value";
     * the brand mark is recognized as a shape, not a data encoding,
     * so consistency of relative tile brightness across themes
     * matters more than directional encoding. See CLAUDE.md
     * "Dark theme" for the map-tile convention this departs from.
     */
    @media (prefers-color-scheme: dark) {{
      svg {{
        --bin-0: #f0e1ff;
        --bin-1: #d2afef;
        --bin-2: #b884f0;
        --bin-3: #7a3ed8;
        --check: #ffffff;
        --ink: #e8eaf0;
        --brand: #c9a0ff;
      }}
    }}
  </style>
  <g>
    <rect x="2"  y="4"  width="18" height="18" rx="3.5" fill="var(--bin-0)"/>
    <rect x="22" y="4"  width="18" height="18" rx="3.5" fill="var(--bin-1)"/>
    <rect x="2"  y="24" width="18" height="18" rx="3.5" fill="var(--bin-2)"/>
    <rect x="22" y="24" width="18" height="18" rx="3.5" fill="var(--bin-3)"/>
    <path d="M26.5 33.5 L30.5 37.5 L37.5 28"
          fill="none" stroke="var(--check)" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <g transform="translate({BASELINE_X} {BASELINE_Y})">
    <g fill="var(--ink)">
{ink_glyphs}
    </g>
    <g fill="var(--brand)">
{brand_glyphs}
    </g>
  </g>
</svg>
"""

MONO_LOGO = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 48" role="img" aria-label="projectcert"
     fill="currentColor">
  <title>projectcert</title>
  <!--
    Monochrome logo. All paint uses `currentColor`, so the logo
    inherits the surrounding text color: dark on light surfaces,
    light on dark. The check on the darkest tile is cut through to
    the background via a mask so it stays legible on any surface.
    The wordmark is outlined to paths (IBM Plex Sans SemiBold,
    22px); regenerate with `python3 scripts/outline-logo-text.py`.
  -->
  <defs>
    <mask id="pc-check-cutout" maskUnits="userSpaceOnUse">
      <rect width="220" height="48" fill="white"/>
      <path d="M26.5 33.5 L30.5 37.5 L37.5 28"
            fill="none" stroke="black" stroke-width="3"
            stroke-linecap="round" stroke-linejoin="round"/>
    </mask>
  </defs>

  <g mask="url(#pc-check-cutout)">
    <rect x="2"  y="4"  width="18" height="18" rx="3.5" opacity="0.18"/>
    <rect x="22" y="4"  width="18" height="18" rx="3.5" opacity="0.40"/>
    <rect x="2"  y="24" width="18" height="18" rx="3.5" opacity="0.70"/>
    <rect x="22" y="24" width="18" height="18" rx="3.5" opacity="1"/>
  </g>

  <g transform="translate({BASELINE_X} {BASELINE_Y})">
{all_glyphs}
  </g>
</svg>
"""

(ROOT / "public/logo.svg").write_text(COLOR_LOGO)
(ROOT / "public/logo-mono.svg").write_text(MONO_LOGO)
print(f"wrote public/logo.svg and public/logo-mono.svg (wordmark width: {x_units * scale:.2f}px)")
