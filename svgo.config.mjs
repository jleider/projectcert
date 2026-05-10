/**
 * SVGO config tuned for projectcert.
 *
 * Disables `inlineStyles` because our brand SVGs (public/logo.svg,
 * public/favicon.svg) declare light-mode CSS variables in a <style>
 * block and override them inside a `@media (prefers-color-scheme:
 * dark)` rule. svgo's default `inlineStyles` plugin hoists the
 * light-mode declarations onto a `style=""` attribute on the root
 * <svg>, which then beats the @media-block rule on specificity
 * (inline style > any selector), breaking dark-mode swap.
 *
 * Disables `removeViewBox` (kept by default in svgo 3.x, restated
 * here so it stays loud) — the wordmark needs the explicit viewBox
 * for predictable scaling inside flex containers.
 */
export default {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          inlineStyles: false,
          removeViewBox: false,
        },
      },
    },
  ],
};
