import React, { useCallback, useEffect, useState } from 'react';
import MiniGames from './MiniGames';
import { BASE_CSS } from '../theme';

/**
 * /play — the arcade.
 *
 * A standalone, full-screen page for the mini games (separate Vite entry:
 * play/index.html → src/play.tsx). None of the portfolio bundle — and none
 * of the 8 MB 3D model — loads here; the page is header + headline + the
 * games frame filling the rest of the viewport.
 *
 * Shares the site's theme: BASE_CSS defines the palette behind
 * `[data-root="c"]`, the saved light/dark choice lives in `ot-theme`
 * (same key as the portfolio), and a ⛶ chip toggles real full screen.
 */

const MONO = "'Space Mono', monospace";
const CAB = "'Cabinet Grotesk', sans-serif";

export default function PlayPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'
      ? 'light'
      : 'dark'
  );
  const [fullscreen, setFullscreen] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('ot-theme', next);
      } catch {
        /* private mode — theme just won't persist */
      }
      return next;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    try {
      if (document.fullscreenElement) {
        void document.exitFullscreen();
      } else {
        void document.documentElement.requestFullscreen?.();
      }
    } catch {
      /* fullscreen denied — stay windowed */
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  return (
    <div data-root="c" className="arcade" style={{ fontFamily: MONO }}>
      <style>{BASE_CSS + ARCADE_CSS}</style>

      {/* top chrome */}
      <header className="arcade-top">
        <a href="/" className="arcade-brand" aria-label="Back to the portfolio">
          <span className="arcade-blink" />
          <span style={{ fontFamily: CAB, fontWeight: 800, fontSize: 20, letterSpacing: '-.02em' }}>
            Oluwatosin
          </span>
          <span className="arcade-top-tag">← portfolio</span>
        </a>
        <span className="arcade-top-mid">ARCADE · MINI GAMES · RUNS LOCALLY</span>
        <div className="arcade-top-actions">
          <button
            className="arcade-chip"
            onClick={toggleFullscreen}
            title={fullscreen ? 'Exit full screen' : 'Go full screen'}
            aria-pressed={fullscreen}
          >
            {fullscreen ? '✕' : '⛶'} <span>{fullscreen ? 'exit' : 'full screen'}</span>
          </button>
          <button
            className="arcade-chip"
            onClick={toggleTheme}
            title="Toggle light / dark"
            aria-label="Toggle light or dark theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </header>

      {/* headline + the games, filling the viewport */}
      <main className="arcade-main">
        <div className="arcade-head">
          <div>
            <span className="arcade-eyebrow">// PLAY — THEY MOVED TO THEIR OWN PAGE</span>
            <h1>
              Mini games
              <span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
          </div>
          <p>
            Pick a tab, kill a few minutes. Snake, Tic-Tac-Toe and Memory — all running locally in
            this page, nothing to install and nothing to sign into. Hit full screen for the proper
            arcade feel.
          </p>
        </div>

        <div className="arcade-stage">
          <MiniGames variant="page" />
        </div>
      </main>

      <footer className="arcade-foot">
        <a href="/">← back to oluwatosin.site</a>
      </footer>
    </div>
  );
}

const ARCADE_CSS = `
.arcade{min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;background:var(--bg);color:var(--fg)}

/* top chrome */
.arcade-top{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px clamp(16px,4vw,40px);border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--bg) 84%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.arcade-brand{display:flex;align-items:center;gap:10px;color:var(--fg);text-decoration:none;min-width:0}
.arcade-blink{width:9px;height:9px;border-radius:2px;background:var(--chrome-accent);animation:ot-blink 1.7s steps(2) infinite;flex:none}
.arcade-top-tag{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);border:1px solid var(--line);padding:5px 9px;white-space:nowrap;transition:color .2s,border-color .2s}
.arcade-brand:hover .arcade-top-tag{color:var(--chrome-accent);border-color:color-mix(in srgb,var(--chrome-accent) 50%,transparent)}
.arcade-top-mid{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.arcade-top-actions{display:flex;gap:9px;flex:none}
.arcade-chip{display:flex;align-items:center;gap:7px;height:38px;padding:0 13px;border:1px solid var(--line);background:color-mix(in srgb,var(--surface) 45%,transparent);color:var(--fg);border-radius:999px;cursor:pointer;font-family:${MONO};font-size:11px;letter-spacing:.1em;text-transform:uppercase;transition:border-color .2s,color .2s,background .2s}
.arcade-chip:hover{border-color:color-mix(in srgb,var(--chrome-accent) 55%,transparent);color:var(--chrome-accent)}
.arcade-chip[aria-pressed="true"]{background:color-mix(in srgb,var(--chrome-accent) 16%,transparent);border-color:color-mix(in srgb,var(--chrome-accent) 55%,transparent);color:var(--chrome-accent)}

/* main column */
.arcade-main{flex:1;display:flex;flex-direction:column;gap:clamp(16px,2.6vh,28px);width:100%;max-width:1320px;margin:0 auto;padding:clamp(18px,3vh,34px) clamp(16px,4vw,40px);min-height:0;box-sizing:border-box}
.arcade-head{display:flex;justify-content:space-between;align-items:flex-end;gap:clamp(16px,3vw,48px);flex-wrap:wrap}
.arcade-eyebrow{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--faint)}
.arcade-head h1{margin:8px 0 0;font-family:'Cabinet Grotesk',sans-serif;font-weight:900;font-size:clamp(42px,7vw,88px);line-height:.92;letter-spacing:-.03em;color:var(--fg)}
.arcade-head p{margin:0;max-width:54ch;font-size:14.5px;line-height:1.7;color:var(--muted)}

/* the games fill every remaining pixel */
.arcade-stage{flex:1;min-height:min(64vh,720px);display:flex}
.arcade-stage > .mg-frame{flex:1}

/* footer */
.arcade-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:14px clamp(16px,4vw,40px);border-top:1px solid var(--line);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint)}
.arcade-foot a{color:var(--faint);text-decoration:none;transition:color .2s}
.arcade-foot a:hover{color:var(--chrome-accent)}

@media (max-width:720px){
  .arcade-top-mid{display:none}
  .arcade-top-tag{display:none}
  .arcade-chip span{display:none}
  .arcade-chip{padding:0 11px;justify-content:center}
  .arcade-head p{font-size:14px}
  .arcade-stage{min-height:min(70vh,560px)}
}
@media (prefers-reduced-motion: reduce){
  .arcade-blink{animation:none}
  .arcade-chip,.arcade-top-tag,.arcade-foot a{transition:none}
}
`;
