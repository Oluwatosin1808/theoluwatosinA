import React, { useEffect, useRef } from 'react';

// model-viewer is a custom element registered globally (script loaded in index.html).
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const MONO = "'Space Mono', monospace";
const CAB = "'Cabinet Grotesk', sans-serif";
const GS = "'General Sans', sans-serif";

const MODEL_SRC = 'https://tosin-model-host.vercel.app/tosin-model.glb';

type Stat = { n: string; target: string; suffix: string; label: string };
type Project = { n: string; name: string; type: string; tags: string; year: string };
type Career = { period: string; role: string; org: string; desc: string };
type Quote = { quote: string; name: string; title: string };

const stats: Stat[] = [
  { n: '01', target: '4', suffix: '', label: 'Years experience' },
  { n: '02', target: '20', suffix: '+', label: 'Products shipped' },
  { n: '03', target: '4.8', suffix: '', label: 'Avg client rating' },
  { n: '04', target: '12', suffix: '+', label: 'Brands & startups' },
];

const skills = ['Product Design', 'UI / UX', 'Frontend', 'Webflow', 'Framer', 'Bubble', 'Prototyping', 'Motion'];

const projects: Project[] = [
  { n: '01', name: 'Artemis II', type: 'WebGL · 3D Scene', tags: 'Three.js, GLSL', year: '2024' },
  { n: '02', name: 'Codeless', type: 'No-code Platform', tags: 'Webflow, CMS', year: '2024' },
  { n: '03', name: 'DreamAI', type: 'AI Product', tags: 'Bubble, GPT', year: '2023' },
  { n: '04', name: 'The Glo Up', type: 'Fintech Mobile', tags: 'iOS, Product', year: '2023' },
  { n: '05', name: 'Nepo', type: 'Health & Fitness', tags: 'Mobile, Nutrition', year: '2023' },
  { n: '06', name: 'Aaron Israel', type: 'Portfolio Site', tags: 'Frontend, Webflow', year: '2024' },
];

const career: Career[] = [
  { period: '2024 — PRESENT', role: 'Design Engineer', org: 'Codeless', desc: 'Designing and shipping no-code products end to end — from first sketch to live production.' },
  { period: '2022 — 2024', role: 'Product Designer', org: 'Freelance', desc: 'Partnered with startups across fintech, health and AI to design intuitive, high-converting products.' },
  { period: '2021 — 2022', role: 'UI Designer', org: 'Studio', desc: 'Crafted interfaces and early design systems for emerging brands and founders.' },
];

const quotes: Quote[] = [
  { quote: 'Oluwatosin translated our product vision into a clean, scalable system. The new onboarding lifted activation within weeks.', name: 'Aaron Israel', title: 'Founder, CandleLeap' },
  { quote: 'From strategy to build, every detail was intentional. Our team now ships faster with confidence.', name: 'Gabriel Oladubu', title: 'CTO, Funema' },
  { quote: 'A rare designer who can build exactly what he designs. Reliable, creative and precise.', name: 'Omijuke Abolade', title: 'Product Manager, Mindspace' },
  { quote: 'He effortlessly turned messy ideas into a memorable experience. Highly recommended.', name: 'Wendy Edeke', title: 'Founder, Agioweb' },
];

const socials = ['Twitter', 'Instagram', 'LinkedIn', 'Résumé'];

const css = `
*{box-sizing:border-box}
html,body{margin:0;padding:0}
html{--chrome-bg:rgba(15,17,21,.6);--chrome-fg:#e9eaee;--chrome-line:rgba(255,255,255,.09);--chip-bg:rgba(255,255,255,.06);--chip-line:rgba(255,255,255,.12);--body-bg:#0f1115;--chrome-accent:#2f6bff}
html[data-theme="light"]{--chrome-bg:rgba(236,238,241,.72);--chrome-fg:#16181d;--chrome-line:rgba(0,0,0,.1);--chip-bg:rgba(0,0,0,.045);--chip-line:rgba(0,0,0,.1);--body-bg:#eceef1}
body{background-color:var(--body-bg);font-family:'General Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
::selection{background:var(--chrome-accent);color:#fff}

[data-root="c"]{--bg:#0f1115;--fg:#e9eaee;--muted:#aeb1bb;--faint:#757985;--line:rgba(233,234,238,.12);--surface:#15171d;--surface2:#1a1d24;--accent:#2f6bff;--accent-ink:#fff;--grid:rgba(233,234,238,.045)}
html[data-theme="light"] [data-root="c"]{--bg:#eceef1;--fg:#16181d;--muted:#54585f;--faint:#7a7e88;--line:rgba(22,24,29,.13);--surface:#e0e3e7;--surface2:#d7dadf;--accent:#2f6bff;--accent-ink:#fff;--grid:rgba(22,24,29,.05)}

model-viewer{--poster-color:transparent;background-color:transparent}
@keyframes ot-blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes ot-grid{from{background-position:0 0}to{background-position:0 44px}}
@keyframes ot-scan{0%{top:3%;opacity:0}12%{opacity:.75}88%{opacity:.75}100%{top:95%;opacity:0}}
@keyframes ot-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes ot-glow{0%,100%{opacity:.8}50%{opacity:1}}
@keyframes ot-orbitline{0%,100%{transform:scaleX(.4);opacity:.3}50%{transform:scaleX(1);opacity:.8}}

/* interactive hover states (compiled from style-hover in the source design) */
.v2-proj:hover .v2-proj-img{border-color:var(--accent);transform:translateY(-4px)}
.v2-proj:hover .v2-proj-title{color:var(--accent)}
.v2-quote:hover{border-color:var(--accent)}
.v2-social:hover{color:var(--fg)}

/* responsive */
@media (max-width:860px){
  .v2-hero{grid-template-columns:1fr !important}
  .v2-stats{grid-template-columns:repeat(2,1fr) !important}
  .v2-about{grid-template-columns:1fr !important}
  .v2-career-row{grid-template-columns:1fr !important;gap:6px !important}
  .v2-quotes{grid-template-columns:1fr !important}
}
@media (max-width:480px){
  .v2-stats{grid-template-columns:1fr !important}
}
`;

export default function PortfolioV2() {
  const themeRef = useRef<'dark' | 'light'>('dark');
  const themeBtnRef = useRef<HTMLButtonElement>(null);

  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', themeRef.current);
    if (themeBtnRef.current) themeBtnRef.current.textContent = themeRef.current === 'dark' ? '☀' : '☾';
    try { localStorage.setItem('ot-theme', themeRef.current); } catch { /* ignore */ }
  };

  const toggleTheme = () => {
    themeRef.current = themeRef.current === 'dark' ? 'light' : 'dark';
    applyTheme();
  };

  // magnetic buttons
  const magMove = (e: React.MouseEvent<HTMLElement>) => {
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    b.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.4 + 'px)';
  };
  const magLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate(0,0)';
  };

  // project row -> cursor chip
  const rowEnter = (e: React.MouseEvent<HTMLElement>) => {
    const c = document.getElementById('ot-chip');
    if (!c) return;
    c.textContent = (e.currentTarget.dataset.name || 'View') + ' ↗';
    c.dataset.on = '1';
    c.style.opacity = '1';
    c.style.transform = 'translate(-50%,-150%) scale(1)';
  };
  const rowLeave = () => {
    const c = document.getElementById('ot-chip');
    if (!c) return;
    c.dataset.on = '0';
    c.style.opacity = '0';
    c.style.transform = 'translate(-50%,-150%) scale(.6)';
  };

  useEffect(() => {
    const timeouts: number[] = [];
    const setT = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timeouts.push(id);
      return id;
    };

    // theme
    try {
      const saved = localStorage.getItem('ot-theme');
      if (saved === 'light' || saved === 'dark') themeRef.current = saved;
    } catch { /* ignore */ }
    applyTheme();

    // live clock
    const tick = () => {
      const el = document.getElementById('ot-clock');
      if (el) el.textContent = new Date().toLocaleTimeString('en-GB') + ' WAT';
    };
    const clockId = window.setInterval(tick, 1000);
    tick();

    // pointer: cursor chip follow, coordinate readout, hero model parallax
    const onMove = (e: MouseEvent) => {
      const c = document.getElementById('ot-chip');
      if (c && c.dataset.on === '1') {
        c.style.left = e.clientX + 'px';
        c.style.top = e.clientY + 'px';
      }
      const co = document.getElementById('ot-coord');
      if (co) {
        co.textContent =
          String(Math.round(e.clientX)).padStart(4, '0') + ' · ' + String(Math.round(e.clientY)).padStart(4, '0');
      }
      const f = document.getElementById('ot-modelframe');
      if (f) {
        const dx = e.clientX / window.innerWidth - 0.5;
        const dy = e.clientY / window.innerHeight - 0.5;
        f.style.transform = 'translate(' + (dx * -10).toFixed(2) + 'px,' + (dy * -10).toFixed(2) + 'px)';
      }
    };
    document.addEventListener('mousemove', onMove);

    // scroll reveal
    let io: IntersectionObserver | null = null;
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    revealEls.forEach((el) => {
      el.dataset.shown = '0';
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      el.style.transition = 'opacity .85s ease, transform .9s cubic-bezier(.2,.7,.15,1)';
    });
    const show = (el: HTMLElement) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.dataset.shown = '1';
    };
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              show(en.target as HTMLElement);
              io!.unobserve(en.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.04 }
      );
      revealEls.forEach((el) => io!.observe(el));
    } else {
      revealEls.forEach(show);
    }
    setT(() => revealEls.forEach((el) => { if (el.dataset.shown !== '1') show(el); }), 3800);

    // headline split-in animation (preserves <br> and the coloured "." span)
    const splitText = () => {
      document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
        if (el.dataset.splitDone === '1') return;
        const mode = el.getAttribute('data-split') === 'chars' ? 'chars' : 'words';
        const nodes = Array.from(el.childNodes);
        el.textContent = '';
        el.style.opacity = '1';
        let i = 0;
        const emit = (txt: string, color: string | null) => {
          const units = mode === 'chars' ? txt.split('') : txt.split(/(\s+)/);
          units.forEach((u) => {
            if (/^\s+$/.test(u)) {
              el.appendChild(document.createTextNode(u));
              return;
            }
            const mask = document.createElement('span');
            mask.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em';
            const inner = document.createElement('span');
            inner.setAttribute('data-split-i', '1');
            inner.textContent = u;
            if (color) inner.style.color = color;
            inner.style.cssText +=
              ';display:inline-block;transform:translateY(110%);transition:transform .85s cubic-bezier(.2,.78,.16,1);transition-delay:' +
              i * 0.04 +
              's';
            mask.appendChild(inner);
            el.appendChild(mask);
            i++;
          });
        };
        nodes.forEach((n) => {
          if (n.nodeName === 'BR') {
            el.appendChild(document.createElement('br'));
          } else if (n.nodeType === 3) {
            emit(n.textContent || '', null);
          } else {
            const he = n as HTMLElement;
            emit(he.textContent || '', he.style && he.style.color ? he.style.color : null);
          }
        });
        el.dataset.splitDone = '1';
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.querySelectorAll<HTMLElement>('[data-split-i]').forEach((s) => {
              s.style.transform = 'translateY(0)';
            });
          })
        );
      });
    };

    // animated counters
    const initCounters = () => {
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const raw = el.dataset.count || '0';
        const tgt = parseFloat(raw) || 0;
        const dec = (raw.split('.')[1] || '').length;
        const suf = el.dataset.suffix && el.dataset.suffix !== 'undefined' ? el.dataset.suffix : '';
        const final = tgt.toFixed(dec) + suf;
        let start: number | null = null;
        const dur = 1200;
        let done = false;
        const step = (t: number) => {
          if (start === null) start = t;
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (tgt * eased).toFixed(dec) + suf;
          if (p < 1) requestAnimationFrame(step);
          else done = true;
        };
        requestAnimationFrame(step);
        setT(() => { if (!done) el.textContent = final; }, 1400);
      });
    };

    const run = () => splitText();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
      setT(run, 600);
    } else {
      run();
    }
    setT(initCounters, 340);

    // safety: force everything visible if animations never settle
    setT(() => {
      document.querySelectorAll<HTMLElement>('[data-split]').forEach((e) => { e.style.opacity = '1'; });
      document.querySelectorAll<HTMLElement>('[data-split-i]').forEach((s) => {
        s.style.transition = 'none';
        s.style.transform = 'translateY(0px)';
      });
    }, 2600);

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.clearInterval(clockId);
      if (io) io.disconnect();
      timeouts.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labelStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: 11,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
  };

  return (
    <>
      <style>{css}</style>

      {/* ============ PERSISTENT CHROME ============ */}
      <div
        id="ot-chip"
        data-on="0"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 120,
          pointerEvents: 'none',
          opacity: 0,
          transform: 'translate(-50%,-140%) scale(.6)',
          transition: 'opacity .22s,transform .22s',
          background: 'var(--chrome-accent)',
          color: '#fff',
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          padding: '7px 13px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
          boxShadow: '0 8px 30px rgba(0,0,0,.35)',
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '13px clamp(16px,4vw,40px)',
          backdropFilter: 'blur(14px)',
          backgroundColor: 'var(--chrome-bg)',
          borderBottom: '1px solid var(--chrome-line)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: 'var(--chrome-accent)', animation: 'ot-blink 1.7s infinite' }} />
          <span style={{ fontFamily: CAB, fontWeight: 800, fontSize: 21, letterSpacing: '-.02em', color: 'var(--chrome-fg)', lineHeight: 1 }}>
            Oluwatosin
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="#work" style={{ display: 'none' }}>work</a>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--chrome-fg)',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--chrome-accent)', animation: 'ot-blink 1.6s infinite' }} />
            Open to work
          </span>
          <button
            id="ot-theme"
            ref={themeBtnRef}
            onClick={toggleTheme}
            title="Toggle light / dark"
            style={{
              border: '1px solid var(--chip-line)',
              background: 'var(--chip-bg)',
              color: 'var(--chrome-fg)',
              cursor: 'pointer',
              width: 38,
              height: 38,
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              transition: 'all .25s',
              flex: 'none',
            }}
          >
            ☀
          </button>
        </div>
      </div>

      {/* ============ SITE ============ */}
      <div
        data-root="c"
        style={{ position: 'relative', backgroundColor: 'var(--bg)', color: 'var(--fg)', fontFamily: GS, paddingTop: 64, overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: 'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px,4vw,40px)' }}>
          {/* status bar */}
          <div
            data-reveal
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--faint)',
              padding: '22px 0',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <span>[ DESIGN ENGINEER ]</span>
            <span id="ot-clock" style={{ color: 'var(--accent)' }}>--:--:-- WAT</span>
            <span>LAGOS · 6.5244° N</span>
          </div>

          {/* ============ HERO ============ */}
          <section
            className="v2-hero"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1.06fr) minmax(0,.94fr)',
              gap: 'clamp(20px,3.5vw,52px)',
              alignItems: 'center',
              padding: 'clamp(36px,5vw,72px) 0 clamp(40px,6vw,84px)',
            }}
          >
            <div>
              <div data-reveal style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>
                // PRODUCT DESIGNER · FRONTEND · NO-CODE
              </div>
              <h1
                data-split="chars"
                style={{ margin: 0, fontFamily: CAB, fontWeight: 900, fontSize: 'clamp(54px,9.2vw,132px)', lineHeight: 0.9, letterSpacing: '-.035em', opacity: 0 }}
              >
                Oluwa<br />tosin<span style={{ color: 'var(--accent)' }}>.</span>
              </h1>
              <p data-reveal style={{ margin: '26px 0 0', maxWidth: '46ch', fontSize: 'clamp(16px,1.55vw,20px)', lineHeight: 1.6, color: 'var(--muted)' }}>
                I design things that make sense, then build them so they actually work — scalable, user-focused digital products from concept to
                production.
              </p>
              <div data-reveal style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 34 }}>
                <a
                  href="mailto:hello@oluwatosin.site"
                  data-magnetic
                  onMouseMove={magMove}
                  onMouseLeave={magLeave}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'var(--accent)',
                    color: 'var(--accent-ink)',
                    textDecoration: 'none',
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    padding: '15px 24px',
                    transition: 'transform .2s',
                  }}
                >
                  Start a project →
                </a>
                <a
                  href="#work"
                  data-magnetic
                  onMouseMove={magMove}
                  onMouseLeave={magLeave}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    border: '1px solid var(--line)',
                    color: 'var(--fg)',
                    textDecoration: 'none',
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    padding: '15px 24px',
                    transition: 'transform .2s',
                  }}
                >
                  View work ↓
                </a>
              </div>
              <div
                data-reveal
                style={{
                  display: 'flex',
                  gap: 'clamp(18px,3vw,40px)',
                  flexWrap: 'wrap',
                  marginTop: 38,
                  fontFamily: MONO,
                  fontSize: 11,
                  lineHeight: 1.7,
                  letterSpacing: '.05em',
                  color: 'var(--faint)',
                }}
              >
                <div><div style={{ color: 'var(--accent)' }}>ROLE</div><div style={{ color: 'var(--fg)' }}>Design Engineer</div></div>
                <div><div style={{ color: 'var(--accent)' }}>BASED</div><div style={{ color: 'var(--fg)' }}>Lagos, NG</div></div>
                <div><div style={{ color: 'var(--accent)' }}>EXP</div><div style={{ color: 'var(--fg)' }}>4 years</div></div>
                <div><div style={{ color: 'var(--accent)' }}>SHIPPED</div><div style={{ color: 'var(--fg)' }}>20+ products</div></div>
              </div>
            </div>

            {/* model frame */}
            <div data-reveal style={{ position: 'relative' }}>
              <div
                id="ot-modelframe"
                style={{
                  position: 'relative',
                  border: '1px solid var(--line)',
                  background: 'radial-gradient(120% 90% at 50% 12%,var(--surface2) 0%,var(--surface) 60%,var(--bg) 100%)',
                  transition: 'transform .25s ease-out',
                  willChange: 'transform',
                }}
              >
                <span style={{ position: 'absolute', top: -1, left: -1, width: 14, height: 14, borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', zIndex: 3 }} />
                <span style={{ position: 'absolute', top: -1, right: -1, width: 14, height: 14, borderTop: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', zIndex: 3 }} />
                <span style={{ position: 'absolute', bottom: -1, left: -1, width: 14, height: 14, borderBottom: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', zIndex: 3 }} />
                <span style={{ position: 'absolute', bottom: -1, right: -1, width: 14, height: 14, borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', zIndex: 3 }} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--line)',
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--faint)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'ot-blink 1.6s infinite' }} />
                    tosin-model.glb
                  </span>
                  <span>drag to rotate</span>
                </div>

                {/* 3D stage */}
                <div style={{ position: 'relative', height: 'clamp(420px,58vh,600px)', overflow: 'hidden' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 0,
                      background: 'radial-gradient(56% 50% at 50% 34%, color-mix(in srgb, var(--accent) 24%, transparent) 0%, transparent 66%)',
                      animation: 'ot-glow 6s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '-30%',
                      right: '-30%',
                      bottom: '-4%',
                      height: '60%',
                      zIndex: 0,
                      transform: 'perspective(520px) rotateX(64deg)',
                      transformOrigin: '50% 100%',
                      backgroundImage:
                        'linear-gradient(color-mix(in srgb,var(--accent) 36%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--accent) 36%,transparent) 1px,transparent 1px)',
                      backgroundSize: '44px 44px',
                      animation: 'ot-grid 5s linear infinite',
                      WebkitMaskImage: 'linear-gradient(to top,#000 6%,transparent 76%)',
                      maskImage: 'linear-gradient(to top,#000 6%,transparent 76%)',
                      opacity: 0.45,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '8%',
                      width: '40%',
                      height: 26,
                      zIndex: 0,
                      transform: 'translateX(-50%)',
                      background: 'radial-gradient(ellipse at center, rgba(0,0,0,.5),transparent 72%)',
                      filter: 'blur(5px)',
                    }}
                  />
                  <model-viewer
                    src={MODEL_SRC}
                    alt="3D character of Oluwatosin"
                    camera-controls="true"
                    auto-rotate="true"
                    rotation-per-second="16deg"
                    auto-rotate-delay="0"
                    autoplay=""
                    animation-name="Armature.001|mixamo.com|Layer0"
                    interaction-prompt="none"
                    disable-zoom="true"
                    disable-pan="true"
                    touch-action="pan-y"
                    loading="eager"
                    reveal="auto"
                    exposure="1.08"
                    shadow-intensity="0.9"
                    shadow-softness="1"
                    environment-image="neutral"
                    camera-orbit="8deg 86deg auto"
                    field-of-view="32deg"
                    min-field-of-view="32deg"
                    max-field-of-view="32deg"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 1,
                      backgroundColor: 'transparent',
                      '--progress-bar-color': 'var(--accent)',
                    }}
                  ></model-viewer>
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: '3%',
                      height: 2,
                      zIndex: 2,
                      pointerEvents: 'none',
                      background: 'linear-gradient(90deg,transparent,var(--accent),transparent)',
                      boxShadow: '0 0 12px 2px color-mix(in srgb,var(--accent) 55%,transparent)',
                      opacity: 0.7,
                      animation: 'ot-scan 5s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '5%',
                      top: '21%',
                      zIndex: 2,
                      pointerEvents: 'none',
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      border: '1px solid color-mix(in srgb,var(--accent) 40%,transparent)',
                      background: 'color-mix(in srgb,var(--accent) 10%,transparent)',
                      padding: '4px 8px',
                      animation: 'ot-float 5.5s ease-in-out infinite',
                    }}
                  >
                    FRONTEND
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      right: '6%',
                      top: '38%',
                      zIndex: 2,
                      pointerEvents: 'none',
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: 'var(--faint)',
                      border: '1px solid var(--line)',
                      background: 'color-mix(in srgb,var(--fg) 5%,transparent)',
                      padding: '4px 8px',
                      animation: 'ot-float 6.4s ease-in-out infinite .6s',
                    }}
                  >
                    DESIGN.SYS
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: '8%',
                      bottom: '18%',
                      zIndex: 2,
                      pointerEvents: 'none',
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: 'var(--faint)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      animation: 'ot-float 7s ease-in-out infinite 1.1s',
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
                    θ 086°
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      right: '7%',
                      bottom: '22%',
                      width: 54,
                      height: 1,
                      zIndex: 2,
                      pointerEvents: 'none',
                      background: 'var(--accent)',
                      transformOrigin: 'right center',
                      animation: 'ot-orbitline 3.4s ease-in-out infinite',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '11px 16px',
                    borderTop: '1px solid var(--line)',
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--faint)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <span>RT · interactive 3D</span>
                  <span style={{ color: 'var(--accent)' }}>v2.026</span>
                </div>
              </div>
            </div>
          </section>

          {/* ============ STATS ============ */}
          <section
            data-reveal
            className="v2-stats"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid var(--line)', marginBottom: 'clamp(60px,9vw,120px)' }}
          >
            {stats.map((s) => (
              <div key={s.n} style={{ padding: 'clamp(22px,3vw,34px)', borderRight: '1px solid var(--line)' }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.1em', color: 'var(--accent)', marginBottom: 14 }}>[{s.n}]</div>
                <div style={{ fontFamily: CAB, fontWeight: 800, fontSize: 'clamp(38px,5vw,68px)', lineHeight: 1, letterSpacing: '-.02em' }}>
                  <span data-count={s.target} data-suffix={s.suffix}>0</span>
                </div>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--faint)', marginTop: 10 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </section>

          {/* ============ ABOUT ============ */}
          <section style={{ paddingBottom: 'clamp(60px,9vw,120px)' }}>
            <div data-reveal style={{ ...labelStyle, marginBottom: 24 }}>// ABOUT</div>
            <div className="v2-about" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 'clamp(28px,5vw,64px)', alignItems: 'start' }}>
              <div data-reveal>
                <p style={{ margin: '0 0 18px', fontFamily: CAB, fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-.02em' }}>
                  I design things that make sense. Then I build them so they actually work.
                </p>
                <p style={{ margin: '0 0 18px', fontSize: 16, lineHeight: 1.7, color: 'var(--muted)' }}>
                  Most days I'm translating fuzzy product ideas into clean, usable interfaces. I sit between design and engineering — prototyping in
                  the browser, building in no-code, and sweating the details most people don't notice but everybody feels.
                </p>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: 'var(--muted)' }}>
                  4+ years, 20+ products shipped end-to-end across fintech, health and AI. Currently going deeper on motion, 3D and the craft of
                  interaction.
                </p>
              </div>
              <div data-reveal>
                <div
                  style={{
                    border: '1px solid var(--line)',
                    background: 'repeating-linear-gradient(135deg,var(--surface) 0 11px,var(--bg) 11px 22px)',
                    aspectRatio: '3/4',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 14,
                    filter: 'grayscale(1) contrast(1.04)',
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>portrait.jpg</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                  {skills.map((k) => (
                    <span
                      key={k}
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                        border: '1px solid var(--line)',
                        padding: '6px 10px',
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ============ FEATURED PROJECTS ============ */}
          <section id="work" style={{ paddingBottom: 'clamp(50px,7vw,90px)' }}>
            <div data-reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'clamp(28px,4vw,52px)' }}>
              <div style={labelStyle}>// SELECTED WORK</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--faint)' }}>INDEX 06</div>
            </div>
            <h2
              data-reveal
              style={{
                margin: '0 0 clamp(36px,5vw,72px)',
                fontFamily: CAB,
                fontWeight: 900,
                fontSize: 'clamp(48px,10vw,150px)',
                lineHeight: 0.85,
                letterSpacing: '-.03em',
                textAlign: 'center',
              }}
            >
              Featured<br />projects
            </h2>
            {projects.map((p) => (
              <div
                key={p.n}
                className="v2-proj"
                data-name={p.name}
                onMouseEnter={rowEnter}
                onMouseLeave={rowLeave}
                data-reveal
                style={{ margin: '0 auto clamp(48px,7vw,88px)', maxWidth: 820, cursor: 'pointer' }}
              >
                <div
                  className="v2-proj-img"
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    background: 'repeating-linear-gradient(135deg,var(--surface) 0 12px,var(--bg) 12px 24px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--line)',
                    overflow: 'hidden',
                    transition: 'border-color .3s,transform .4s',
                  }}
                >
                  <span style={{ position: 'absolute', top: 14, left: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.1em', color: 'var(--accent)' }}>[{p.n}]</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--faint)' }}>{p.type} — mockup</span>
                  <span style={{ position: 'absolute', bottom: 14, right: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.08em', color: 'var(--faint)' }}>{p.tags}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 18, gap: 16 }}>
                  <h3
                    className="v2-proj-title"
                    style={{ margin: 0, fontFamily: CAB, fontWeight: 800, fontSize: 'clamp(30px,5vw,64px)', lineHeight: 0.92, letterSpacing: '-.03em', color: 'var(--fg)', transition: 'color .3s' }}
                  >
                    {p.name}
                  </h3>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--faint)', whiteSpace: 'nowrap' }}>{p.year} ↗</span>
                </div>
              </div>
            ))}

            <div data-reveal style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, padding: 'clamp(40px,6vw,72px) 0 clamp(20px,3vw,40px)' }}>
              <a
                href="#"
                data-magnetic
                onMouseMove={magMove}
                onMouseLeave={magLeave}
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  border: '1px solid var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  fontSize: 30,
                  textDecoration: 'none',
                  transition: 'transform .2s',
                }}
              >
                →
              </a>
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--faint)' }}>Explore more projects</span>
            </div>
          </section>

          {/* ============ CAREER ============ */}
          <section style={{ paddingBottom: 'clamp(60px,9vw,120px)' }}>
            <div data-reveal style={{ ...labelStyle, marginBottom: 24 }}>// CAREER LOG</div>
            {career.map((c, i) => (
              <div
                key={i}
                data-reveal
                className="v2-career-row"
                style={{ display: 'grid', gridTemplateColumns: '200px minmax(0,1fr)', gap: 'clamp(16px,3vw,44px)', padding: '24px 0', borderTop: '1px solid var(--line)' }}
              >
                <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '.06em', color: 'var(--faint)' }}>{c.period}</div>
                <div>
                  <div style={{ fontFamily: CAB, fontWeight: 700, fontSize: 'clamp(20px,2.4vw,28px)', letterSpacing: '-.01em' }}>
                    {c.role} <span style={{ color: 'var(--accent)' }}>@ {c.org}</span>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', maxWidth: '62ch' }}>{c.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--line)' }} />
          </section>

          {/* ============ TESTIMONIALS ============ */}
          <section style={{ paddingBottom: 'clamp(60px,9vw,120px)' }}>
            <div data-reveal style={{ ...labelStyle, marginBottom: 24 }}>// TRUSTED BY TEAMS</div>
            <div className="v2-quotes" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
              {quotes.map((q, i) => (
                <div
                  key={i}
                  data-reveal
                  className="v2-quote"
                  style={{
                    border: '1px solid var(--line)',
                    padding: 'clamp(22px,3vw,34px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 220,
                    transition: 'border-color .3s',
                  }}
                >
                  <p style={{ margin: '0 0 24px', fontSize: 'clamp(17px,1.9vw,21px)', lineHeight: 1.5, color: 'var(--fg)' }}>"{q.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        border: '1px solid var(--line)',
                        background: 'repeating-linear-gradient(135deg,var(--surface) 0 6px,var(--bg) 6px 12px)',
                        filter: 'grayscale(1)',
                        flex: 'none',
                      }}
                    />
                    <div>
                      <div style={{ fontFamily: CAB, fontWeight: 700, fontSize: 15 }}>{q.name}</div>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--faint)', marginTop: 2 }}>{q.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============ CONTACT ============ */}
          <section
            data-reveal
            style={{ border: '1px solid var(--line)', padding: 'clamp(40px,6vw,80px)', marginBottom: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}
          >
            <div style={labelStyle}>// OPEN TO WORK</div>
            <h2 style={{ margin: 0, fontFamily: CAB, fontWeight: 900, fontSize: 'clamp(40px,7vw,96px)', lineHeight: 0.92, letterSpacing: '-.03em' }}>
              Have a product to<br />launch or refine?
            </h2>
            <a
              href="mailto:hello@oluwatosin.site"
              data-magnetic
              onMouseMove={magMove}
              onMouseLeave={magLeave}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                textDecoration: 'none',
                fontFamily: MONO,
                fontSize: 13,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                padding: '18px 30px',
                transition: 'transform .2s',
              }}
            >
              hello@oluwatosin.site →
            </a>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 8, fontFamily: MONO, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>
              {socials.map((soc) => (
                <a key={soc} href="#" className="v2-social" style={{ color: 'var(--faint)', textDecoration: 'none', transition: 'color .2s' }}>
                  {soc} ↗
                </a>
              ))}
            </div>
          </section>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 11, color: 'var(--faint)', paddingBottom: 40 }}>
            <span>© 2026 OLUWATOSIN</span>
            <span id="ot-coord">0000 · 0000</span>
          </div>
        </div>
      </div>
    </>
  );
}
