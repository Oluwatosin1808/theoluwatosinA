/**
 * Base + theme CSS shared by every page of the site.
 *
 * Extracted from PortfolioV2 so the standalone /play arcade page
 * (play/index.html → src/play.tsx) can render the same dark/light palette
 * without importing the portfolio component (and its bundle).
 *
 * Both pages inject this once inside their root component's <style> tag.
 * Theme is driven by `html[data-theme="light"]` (default = dark); the saved
 * value lives in localStorage under `ot-theme` and is applied before paint.
 *
 * `[data-root="c"]` scopes the game/surface palette — every page wrapper
 * carries that attribute so `var(--bg)` / `var(--surface)` / `var(--accent)`
 * resolve the same way everywhere.
 */

export const BASE_CSS = `
*{box-sizing:border-box}
html,body{margin:0;padding:0}
html{--chrome-bg:rgba(15,17,21,.6);--chrome-fg:#e9eaee;--chrome-line:rgba(255,255,255,.09);--chip-bg:rgba(255,255,255,.06);--chip-line:rgba(255,255,255,.12);--body-bg:#0f1115;--chrome-accent:#2f6bff}
html[data-theme="light"]{--chrome-bg:rgba(236,238,241,.72);--chrome-fg:#16181d;--chrome-line:rgba(0,0,0,.1);--chip-bg:rgba(0,0,0,.045);--chip-line:rgba(0,0,0,.1);--body-bg:#eceef1}
body{background-color:var(--body-bg);font-family:'General Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
::selection{background:var(--chrome-accent);color:#fff}

[data-root="c"]{--bg:#0f1115;--fg:#e9eaee;--muted:#aeb1bb;--faint:#757985;--line:rgba(233,234,238,.12);--surface:#15171d;--surface2:#1a1d24;--accent:#2f6bff;--accent-ink:#fff;--grid:rgba(233,234,238,.045);--ink:var(--fg);--ink-2:var(--muted);--ink-3:var(--faint);--rule:var(--line);--amber:var(--accent);--amber-2:#5b8bff;--amber-ink:var(--accent-ink);--skill-color:var(--accent);--card-bg-from:var(--surface2);--card-bg-to:var(--surface);--bg-2:var(--surface2)}
html[data-theme="light"] [data-root="c"]{--bg:#eceef1;--fg:#16181d;--muted:#54585f;--faint:#7a7e88;--line:rgba(22,24,29,.13);--surface:#e0e3e7;--surface2:#d7dadf;--accent:#2f6bff;--accent-ink:#fff;--grid:rgba(22,24,29,.05);--amber-2:#2057e6}

@keyframes ot-blink{0%,100%{opacity:1}50%{opacity:.25}}
`;
