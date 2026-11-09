import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Mini browser games — Snake, Tic-Tac-Toe and Memory, framed inside a fake
 * mini browser window (dots, URL pill, tabs). Everything runs in-page:
 * a canvas for Snake, plain state for the other two. No dependencies.
 */

const MONO = "'Space Mono', monospace";

type GameKey = 'snake' | 'ttt' | 'memory';

const GAME_TABS: Array<{ id: GameKey; idx: string; label: string; url: string }> = [
  { id: 'snake', idx: '01', label: 'Snake', url: 'play://snake' },
  { id: 'ttt', idx: '02', label: 'Tic-Tac-Toe', url: 'play://tic-tac-toe' },
  { id: 'memory', idx: '03', label: 'Memory', url: 'play://memory' },
];

// ── shared bits ─────────────────────────────────────────────────────────────

function Overlay({
  title,
  lines,
  action,
  onAction,
}: {
  title: string;
  lines: string[];
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="mg-overlay">
      <div className="mg-overlay-title">{title}</div>
      {lines.map((l) => (
        <div key={l} className="mg-overlay-line">
          {l}
        </div>
      ))}
      <button className="mg-btn" onClick={onAction}>
        {action}
      </button>
    </div>
  );
}

// ── 1. Snake ────────────────────────────────────────────────────────────────

const GRID = 16;
const CELL = 20;

type Pt = { x: number; y: number };

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem('ot-snake-best') || 0);
    } catch {
      return 0;
    }
  });
  const [status, setStatus] = useState<'idle' | 'run' | 'pause' | 'over'>('idle');
  const scoreRef = useRef(0);
  const bestRef = useRef(best);

  const g = useRef({
    snake: [{ x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }] as Pt[],
    dir: { x: 1, y: 0 } as Pt,
    queued: { x: 1, y: 0 } as Pt,
    food: { x: 11, y: 8 } as Pt,
    acc: 0,
    last: 0,
  });

  const reset = useCallback(() => {
    g.current = {
      snake: [{ x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }],
      dir: { x: 1, y: 0 },
      queued: { x: 1, y: 0 },
      food: { x: 11, y: 8 },
      acc: 0,
      last: performance.now(),
    };
    scoreRef.current = 0;
    setScore(0);
    setStatus('run');
  }, []);

  const placeFood = useCallback(() => {
    const s = g.current.snake;
    let p: Pt;
    do {
      p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (s.some((seg) => seg.x === p.x && seg.y === p.y));
    g.current.food = p;
  }, []);

  const die = useCallback(() => {
    setStatus('over');
    const sc = scoreRef.current;
    if (sc > bestRef.current) {
      bestRef.current = sc;
      try {
        localStorage.setItem('ot-snake-best', String(sc));
      } catch {
        /* ignore */
      }
      setBest(sc);
    }
  }, []);

  // keyboard — only mounted while the Snake tab is active
  useEffect(() => {
    const KEYMAP: Record<string, Pt> = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      w: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      a: { x: -1, y: 0 },
      d: { x: 1, y: 0 },
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === ' ' || k === 'Enter') {
        e.preventDefault();
        if (status === 'run') setStatus('pause');
        else if (status !== 'pause') reset();
        else setStatus('run');
        return;
      }
      if (k === 'r' && status !== 'run') {
        reset();
        return;
      }
      const nd = KEYMAP[k];
      if (!nd) return;
      // arrows own the page only while the snake is actually running
      if (status === 'run') e.preventDefault();
      const cur = g.current.dir;
      if (nd.x === -cur.x && nd.y === -cur.y) return; // no 180° turns
      g.current.queued = nd;
      if (status === 'idle') reset();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status, reset]);

  // touch swipe
  const touchStart = useRef<Pt | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s0 = touchStart.current;
    if (!s0) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s0.x;
    const dy = t.clientY - s0.y;
    touchStart.current = null;
    if (Math.abs(dx) < 18 && Math.abs(dy) < 18) {
      if (status === 'idle' || status === 'over') reset();
      else if (status === 'pause') setStatus('run');
      return;
    }
    const nd = Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) };
    const cur = g.current.dir;
    if (nd.x !== -cur.x || nd.y !== -cur.y) g.current.queued = nd;
    if (status === 'idle') reset();
  };

  // game loop
  useEffect(() => {
    if (status !== 'run') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    g.current.last = performance.now();

    const step = () => {
      const st = g.current;
      st.dir = st.queued;
      const head = { x: st.snake[0].x + st.dir.x, y: st.snake[0].y + st.dir.y };
      const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
      const hitSelf = st.snake.some((s, i) => i < st.snake.length - 1 && s.x === head.x && s.y === head.y);
      if (hitWall || hitSelf) {
        die();
        return;
      }
      st.snake.unshift(head);
      if (head.x === st.food.x && head.y === st.food.y) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        placeFood();
      } else {
        st.snake.pop();
      }
    };

    const draw = () => {
      const cs = getComputedStyle(canvas);
      const accent = cs.getPropertyValue('--accent').trim() || '#2f6bff';
      const surface = cs.getPropertyValue('--surface').trim() || '#15171d';
      const bg = cs.getPropertyValue('--bg').trim() || '#0f1115';
      const fg = cs.getPropertyValue('--fg').trim() || '#e9eaee';
      const line = cs.getPropertyValue('--line').trim() || 'rgba(233,234,238,.12)';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);
      // checkerboard board
      ctx.fillStyle = surface;
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          if ((x + y) % 2 === 1) ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
        }
      }
      // food
      const f = g.current.food;
      ctx.fillStyle = fg;
      ctx.fillRect(f.x * CELL + 5, f.y * CELL + 5, CELL - 10, CELL - 10);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(f.x * CELL + 4, f.y * CELL + 4, CELL - 8, CELL - 8);
      // snake
      g.current.snake.forEach((s, i) => {
        const pad = i === 0 ? 1 : 2.5;
        ctx.fillStyle = accent;
        ctx.globalAlpha = i === 0 ? 1 : Math.max(0.34, 1 - i * 0.045);
        ctx.fillRect(s.x * CELL + pad, s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
      });
      ctx.globalAlpha = 1;
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, GRID * CELL - 1, GRID * CELL - 1);
    };

    const loop = (t: number) => {
      const st = g.current;
      const dt = Math.min(t - st.last, 120);
      st.last = t;
      st.acc += dt;
      const speed = Math.max(72, 150 - score * 4);
      while (st.acc >= speed) {
        st.acc -= speed;
        step();
        if (status !== 'run') break;
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, score]);

  // draw the idle board too (before the first run)
  useEffect(() => {
    if (status === 'run') return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const cs = getComputedStyle(canvas);
    const accent = cs.getPropertyValue('--accent').trim() || '#2f6bff';
    const surface = cs.getPropertyValue('--surface').trim() || '#15171d';
    const bg = cs.getPropertyValue('--bg').trim() || '#0f1115';
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);
    ctx.fillStyle = surface;
    for (let y = 0; y < GRID; y++)
      for (let x = 0; x < GRID; x++) if ((x + y) % 2 === 1) ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
    g.current.snake.forEach((s, i) => {
      ctx.fillStyle = accent;
      ctx.globalAlpha = i === 0 ? 1 : 0.6;
      ctx.fillRect(s.x * CELL + 2, s.y * CELL + 2, CELL - 4, CELL - 4);
    });
    ctx.globalAlpha = 1;
    const f = g.current.food;
    ctx.fillStyle = cs.getPropertyValue('--fg').trim() || '#e9eaee';
    ctx.fillRect(f.x * CELL + 5, f.y * CELL + 5, CELL - 10, CELL - 10);
  }, [status]);

  return (
    <div className="mg-game">
      <div className="mg-hud">
        <span>
          SCORE <b>{String(score).padStart(2, '0')}</b>
        </span>
        <span className="mg-hud-hint">arrows / wasd / swipe</span>
        <span>
          BEST <b>{String(best).padStart(2, '0')}</b>
        </span>
      </div>
      <div className="mg-canvas-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <canvas ref={canvasRef} width={GRID * CELL} height={GRID * CELL} className="mg-canvas" />
        {status === 'idle' && (
          <Overlay title="SNAKE" lines={['eat the blocks · don\'t hit anything', 'press space or tap to start']} action="START" onAction={reset} />
        )}
        {status === 'pause' && (
          <Overlay title="PAUSED" lines={['the snake is waiting', 'space or tap to resume']} action="RESUME" onAction={() => setStatus('run')} />
        )}
        {status === 'over' && (
          <Overlay title="GAME OVER" lines={[`score ${score}`, score >= best && score > 0 ? 'new personal best!' : `best ${best}`]} action="RETRY (R)" onAction={reset} />
        )}
      </div>
      <div className="mg-note">walls bite. every 5 points speeds it up.</div>
    </div>
  );
}

// ── 2. Tic-Tac-Toe ──────────────────────────────────────────────────────────

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6], // diags
];

type Mark = 'X' | 'O';

function winnerOf(board: Array<Mark | null>): Mark | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]!;
  }
  return null;
}

function cpuPick(board: Array<Mark | null>): number {
  const empty = board.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0);
  const find = (m: Mark) => {
    for (const i of empty) {
      const copy = [...board];
      copy[i] = m;
      if (winnerOf(copy) === m) return i;
    }
    return -1;
  };
  const win = find('O');
  if (win >= 0) return win;
  const block = find('X');
  if (block >= 0) return block;
  if (board[4] === null) return 4;
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empty[Math.floor(Math.random() * empty.length)];
}

function TicTacToe() {
  const [board, setBoard] = useState<Array<Mark | null>>(Array(9).fill(null));
  const [turn, setTurn] = useState<'player' | 'cpu'>('player');
  const [rounds, setRounds] = useState({ x: 0, o: 0, d: 0 });

  const w = winnerOf(board);
  const full = board.every(Boolean);
  const done = Boolean(w) || full;

  const play = (i: number) => {
    if (board[i] || done || turn !== 'player') return;
    const next = [...board];
    next[i] = 'X';
    setBoard(next);
    setTurn('cpu');
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setTurn('player');
  };

  // cpu move (+ round tallies)
  useEffect(() => {
    if (turn !== 'cpu' || done) return;
    const id = window.setTimeout(() => {
      const next = [...board];
      const pick = cpuPick(next);
      if (pick >= 0) next[pick] = 'O';
      setBoard(next);
      setTurn('player');
    }, 420);
    return () => window.clearTimeout(id);
  }, [turn, done, board]);

  // count finished rounds exactly once
  const counted = useRef(false);
  useEffect(() => {
    if (!done) {
      counted.current = false;
      return;
    }
    if (counted.current) return;
    counted.current = true;
    setRounds((r) =>
      w === 'X' ? { ...r, x: r.x + 1 } : w === 'O' ? { ...r, o: r.o + 1 } : { ...r, d: r.d + 1 }
    );
  }, [done, w]);

  const resultLine = w === 'X' ? 'you win' : w === 'O' ? 'computer wins' : full ? "it's a draw" : turn === 'cpu' ? 'computer thinking…' : 'your move — you are ✕';

  return (
    <div className="mg-game">
      <div className="mg-hud">
        <span>
          YOU <b>{rounds.x}</b>
        </span>
        <span className="mg-hud-hint">{resultLine}</span>
        <span>
          CPU <b>{rounds.o}</b> · DRAW <b>{rounds.d}</b>
        </span>
      </div>
      <div className="mg-ttt">
        {board.map((v, i) => (
          <button
            key={i}
            className={`mg-cell${v ? ' mg-cell--' + v.toLowerCase() : ''}`}
            onClick={() => play(i)}
            disabled={Boolean(v) || done || turn !== 'player'}
            aria-label={`cell ${i + 1}${v ? ` — ${v}` : ''}`}
          >
            {v}
          </button>
        ))}
      </div>
      {done && (
        <Overlay
          title={w === 'X' ? 'YOU WIN' : w === 'O' ? 'CPU WINS' : 'DRAW'}
          lines={[w === 'X' ? 'nice. run it back.' : w === 'O' ? 'it blocks. it wins. try again.' : 'nobody blinked.']}
          action="NEW ROUND"
          onAction={restart}
        />
      )}
      <div className="mg-note">the computer wins — it just also plays fair.</div>
    </div>
  );
}

// ── 3. Memory ───────────────────────────────────────────────────────────────

const EMOJI = ['🚀', '🎧', '🎮', '⚡', '🐙', '🍋', '🧊', '🎲'];

type Card = { id: number; emoji: string };

function makeDeck(): Card[] {
  const deck = [...EMOJI, ...EMOJI].map((emoji, id) => ({ id, emoji }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function MemoryGame() {
  const [deck, setDeck] = useState<Card[]>(makeDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(() => new Set());
  const [moves, setMoves] = useState(0);
  const busy = flipped.length === 2;
  const won = matched.size === deck.length;

  const restart = () => {
    setDeck(makeDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
  };

  const flip = (card: Card) => {
    if (busy || won || flipped.includes(card.id) || matched.has(card.id)) return;
    const next = [...flipped, card.id];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((id) => deck.find((c) => c.id === id)!);
      if (a.emoji === b.emoji) {
        setMatched((prev) => new Set(prev).add(a.id).add(b.id));
        setFlipped([]);
      }
      // a mismatch stays face-up until the effect below flips it back
    }
  };

  // clear a pending unflip on unmount / restart
  useEffect(() => {
    if (flipped.length < 2) return;
    const [a, b] = flipped;
    const ca = deck.find((c) => c.id === a);
    const cb = deck.find((c) => c.id === b);
    if (!ca || !cb || ca.emoji === cb.emoji) return;
    const t = window.setTimeout(() => setFlipped([]), 760);
    return () => window.clearTimeout(t);
  }, [flipped, deck]);

  const hint = useMemo(() => `${matched.size / 2} / ${EMOJI.length} pairs`, [matched]);

  return (
    <div className="mg-game">
      <div className="mg-hud">
        <span>
          MOVES <b>{String(moves).padStart(2, '0')}</b>
        </span>
        <span className="mg-hud-hint">{hint}</span>
        <span>
          PAIRS <b>{matched.size / 2}</b>
        </span>
      </div>
      <div className="mg-mem">
        {deck.map((c) => {
          const up = flipped.includes(c.id) || matched.has(c.id);
          return (
            <button
              key={c.id}
              className={`mg-memcard${up ? ' mg-memcard--up' : ''}${matched.has(c.id) ? ' mg-memcard--match' : ''}`}
              onClick={() => flip(c)}
              aria-label={up ? c.emoji : 'hidden card'}
            >
              <span>{up ? c.emoji : '?'}</span>
            </button>
          );
        })}
      </div>
      {won && (
        <Overlay title="CLEARED" lines={[`${moves} moves`, moves <= 14 ? 'sharp memory.' : 'done is done.']} action="SHUFFLE" onAction={restart} />
      )}
      <div className="mg-note">find all 8 pairs in as few moves as you can.</div>
    </div>
  );
}

// ── frame ───────────────────────────────────────────────────────────────────

export default function MiniGames() {
  const [tab, setTab] = useState<GameKey>('snake');
  const active = GAME_TABS.find((t) => t.id === tab)!;

  return (
    <div className="mg-frame">
      <style>{MG_CSS}</style>
      <div className="mg-chrome">
        <span className="mg-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="mg-url">{active.url}</span>
        <span className="mg-hosted">local · offline-ready</span>
      </div>
      <div className="mg-tabs" role="tablist" aria-label="Mini games">
        {GAME_TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`mg-tab${tab === t.id ? ' mg-tab--on' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="mg-tab-idx">[{t.idx}]</span> {t.label}
          </button>
        ))}
      </div>
      <div className="mg-stage">
        {tab === 'snake' && <SnakeGame />}
        {tab === 'ttt' && <TicTacToe />}
        {tab === 'memory' && <MemoryGame />}
      </div>
      <div className="mg-foot">runs entirely in your browser — nothing leaves this page</div>
    </div>
  );
}

// ── styles ──────────────────────────────────────────────────────────────────

const MG_CSS = `
.mg-frame{border:1px solid var(--line);background:var(--surface);overflow:hidden;max-width:640px}
.mg-chrome{display:flex;align-items:center;gap:14px;padding:11px 16px;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--surface2) 80%,transparent)}
.mg-dots{display:flex;gap:6px}
.mg-dots i{width:9px;height:9px;border-radius:50%;background:var(--line)}
.mg-dots i:first-child{background:color-mix(in srgb,var(--accent) 70%,#ff5f57)}
.mg-dots i:nth-child(2){background:color-mix(in srgb,var(--accent) 55%,#febc2e)}
.mg-url{flex:1;text-align:center;font-family:${MONO};font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);border:1px solid var(--line);padding:5px 10px;background:color-mix(in srgb,var(--bg) 55%,transparent);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mg-hosted{font-family:${MONO};font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);display:none}
@media(min-width:560px){.mg-hosted{display:block}}
.mg-tabs{display:flex;border-bottom:1px solid var(--line);overflow-x:auto}
.mg-tab{flex:none;display:flex;align-items:center;gap:7px;padding:11px 16px;background:none;border:none;border-right:1px solid var(--line);color:var(--faint);font-family:${MONO};font-size:10px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:color .2s,background .2s}
.mg-tab:hover{color:var(--fg);background:color-mix(in srgb,var(--accent) 7%,transparent)}
.mg-tab--on{color:var(--accent);background:color-mix(in srgb,var(--accent) 10%,transparent)}
.mg-tab--on .mg-tab-idx{color:var(--accent)}
.mg-tab-idx{color:var(--faint)}
.mg-stage{position:relative;padding:clamp(16px,3vw,26px);display:flex;justify-content:center;background:linear-gradient(180deg,color-mix(in srgb,var(--bg) 45%,transparent),transparent)}
.mg-game{width:100%;max-width:420px;display:flex;flex-direction:column;gap:14px;align-items:stretch}
.mg-hud{display:flex;justify-content:space-between;align-items:center;gap:10px;font-family:${MONO};font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint)}
.mg-hud b{color:var(--accent);font-weight:400}
.mg-hud-hint{color:var(--muted);text-align:center;flex:1}
.mg-canvas-wrap{position:relative;border:1px solid var(--line);background:var(--bg);line-height:0}
.mg-canvas{width:100%;height:auto;image-rendering:pixelated;touch-action:pan-y}
.mg-note{font-family:${MONO};font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--faint);text-align:center}
.mg-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(3px);z-index:3;text-align:center;padding:14px}
.mg-overlay-title{font-family:'Cabinet Grotesk',sans-serif;font-weight:900;font-size:clamp(26px,5vw,40px);letter-spacing:-.02em;color:var(--fg);line-height:1}
.mg-overlay-line{font-family:${MONO};font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.mg-btn{margin-top:8px;font-family:${MONO};font-size:11px;letter-spacing:.14em;text-transform:uppercase;background:var(--accent);color:var(--accent-ink);border:none;padding:12px 22px;cursor:pointer;transition:transform .15s}
.mg-btn:hover{transform:translateY(-2px)}
.mg-ttt{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.mg-cell{aspect-ratio:1;background:var(--bg);border:1px solid var(--line);color:var(--fg);font-family:'Cabinet Grotesk',sans-serif;font-weight:900;font-size:clamp(30px,7vw,46px);line-height:1;cursor:pointer;transition:background .18s,border-color .18s,transform .12s}
.mg-cell:hover:not(:disabled){border-color:var(--accent);transform:translateY(-2px)}
.mg-cell:disabled{cursor:default}
.mg-cell--x{color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,var(--bg))}
.mg-cell--o{color:var(--fg);background:color-mix(in srgb,var(--fg) 7%,var(--bg))}
.mg-mem{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.mg-memcard{aspect-ratio:1;background:var(--bg);border:1px solid var(--line);color:var(--faint);font-family:${MONO};font-size:clamp(16px,4vw,24px);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .18s,border-color .18s,background .18s,color .18s}
.mg-memcard:hover:not(.mg-memcard--up){border-color:var(--accent);transform:translateY(-2px)}
.mg-memcard--up{background:color-mix(in srgb,var(--accent) 12%,var(--bg));border-color:color-mix(in srgb,var(--accent) 55%,transparent);color:var(--fg);transform:none}
.mg-memcard--match{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 20%,var(--bg))}
@media (prefers-reduced-motion: reduce){
  .mg-tab,.mg-btn,.mg-cell,.mg-memcard{transition:none}
}
`;
