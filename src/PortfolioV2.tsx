import React, { useEffect, useRef, useState } from 'react';
import CaseStudyModal, { CaseStudyData } from './components/CaseStudyModal';
import {
  artemisCaseStudy,
  codelessAgencyCaseStudy,
  dreamAiCaseStudy,
  gloUpCaseStudy,
  nesoCaseStudy,
  aaronIsraelCaseStudy,
} from './caseStudies';

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

// ── Assets ──────────────────────────────────────────────────────────────────
const portraitImg = new URL('../img/me.webp', import.meta.url).href;
const imgArtemis = new URL('../img/artemis.webp', import.meta.url).href;
const imgCodeless = new URL('../img/Mockup 26.webp', import.meta.url).href;
const imgDreamAI = new URL('../img/Mockup Ribbon 11.webp', import.meta.url).href;
const imgGloUp = new URL('../img/Notioneverything headers.webp', import.meta.url).href;
const imgNeso = new URL('../img/Notioneverything headers (1).webp', import.meta.url).href;
const imgAaron = new URL('../img/case-0.webp', import.meta.url).href;

// ── Real contact / links ────────────────────────────────────────────────────
const EMAIL = 'mosestosyn07@gmail.com';
const TWITTER = 'https://x.com/Oluwat0s1n';
const LINKEDIN = 'https://www.linkedin.com/in/tosin-aborishade/';
const RESUME = '/Oluwatosin_Ayomide_Aborishade_Resume.pdf';

const MAIL_SUBJECT = "Project inquiry — let's chat";
const MAIL_BODY = `Hi Oluwatosin,

I came across your portfolio and wanted to reach out.

A bit about the project:
• What we're building:
• Timeline / start date:
• Scope (design, build, both):
• Budget range:

Looking forward to hearing from you.

—`;
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;

type Stat = { n: string; target: string; suffix: string; label: string };
type Career = { period: string; role: string; org: string; desc: string };
type Quote = { quote: string; name: string; title: string };
type ProjectV2 = {
  n: string;
  name: string;
  type: string;
  tags: string;
  year: string;
  image: string;
  category: string;
  summary: string;
  metrics: string;
  outcome: string;
  caseStudy?: CaseStudyData;
  liveUrl?: string;
};

const stats: Stat[] = [
  { n: '01', target: '4', suffix: '', label: 'Years experience' },
  { n: '02', target: '20', suffix: '+', label: 'Products shipped' },
  { n: '03', target: '4.8', suffix: '', label: 'Avg client rating' },
  { n: '04', target: '12', suffix: '+', label: 'Brands & startups' },
];

const skills = ['Product Design', 'UI / UX', 'Frontend', 'Webflow', 'Framer', 'Bubble', 'Prototyping', 'Motion'];

const projects: ProjectV2[] = [
  {
    n: '01', name: 'Artemis II', type: 'Creative Coding · 3D', tags: 'Three.js, WebGL', year: '2026', image: imgArtemis,
    category: 'Creative Coding · 3D',
    summary: "A real-time 3D tribute to NASA's Artemis II mission. Designed with Maryam Alakoso, built in code on omma.build.",
    metrics: 'Real-time WebGL',
    outcome: 'A single scene authored in code — geometry, lighting, and camera all live in source.',
    caseStudy: artemisCaseStudy, liveUrl: 'https://omma.build/p/artemis-ii-3d-scene-code-jwabi0',
  },
  {
    n: '02', name: 'Codeless', type: 'Agency · Next.js', tags: 'Webflow, Next.js', year: '2026', image: imgCodeless,
    category: 'Product Design + Development',
    summary: 'A home for a no-code agency that needed to look anything but ordinary.',
    metrics: '38% increase in activation',
    outcome: 'Reduced drop-offs with data-driven flows and personalized nudges.',
    caseStudy: codelessAgencyCaseStudy, liveUrl: 'https://agency.codelessify.org',
  },
  {
    n: '03', name: 'DreamAI', type: 'AI Product · Bubble', tags: 'Bubble, GPT', year: '2025', image: imgDreamAI,
    category: 'No-Code Build & Design',
    summary: 'Designed and shipped an AI-powered dream journaling & interpretation web app.',
    metrics: 'Built on Bubble',
    outcome: 'AI-powered interpretation delivered in seconds with a journaling-first UX.',
    caseStudy: dreamAiCaseStudy, liveUrl: 'https://dreamai-52691.bubbleapps.io/version-test',
  },
  {
    n: '04', name: 'The Glo Up', type: 'Dating · Mobile', tags: 'iOS, Product', year: '2023', image: imgGloUp,
    category: 'Product Design',
    summary: 'A dating app that helps users find potential dates beyond the heterosexual default.',
    metrics: 'Mobile app in development',
    outcome: 'Connect based on sexuality and interests with options beyond romance.',
    caseStudy: gloUpCaseStudy,
    liveUrl: 'https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FOdXozCiTmU0EFVpB6esD3Y%2FThe-Glo-Up-Dating-App%3Fnode-id%3D0%253A1%26t%3DGpxOALxhnck2XF3y-1',
  },
  {
    n: '05', name: 'Neso', type: 'Health & Fitness', tags: 'Mobile, Nutrition', year: '2023', image: imgNeso,
    category: 'Product Design',
    summary: 'Workout and fitness tracker with built-in nutrition monitoring.',
    metrics: 'Fitness + nutrition tracking',
    outcome: 'Workout setup, progress tracking, and nutrition monitoring in one program-led experience.',
    caseStudy: nesoCaseStudy,
    liveUrl: 'https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FRp5R4gmO5aSdevyzHz57Qb%2FTrain-and-Earn-Fitness-App-(Copy)%3Fnode-id%3D0%253A1',
  },
  {
    n: '06', name: 'Aaron Israel', type: 'Portfolio · No-Code', tags: 'Webflow, Framer', year: '2026', image: imgAaron,
    category: 'No-Code Development',
    summary: 'No-code web developer and digital builder shipping production-ready websites in days.',
    metrics: '40+ projects shipped',
    outcome: '3x faster delivery than traditional dev cycles with a 98% client satisfaction rate.',
    caseStudy: aaronIsraelCaseStudy, liveUrl: 'https://aaron.pxxl.click',
  },
];

const career: Career[] = [
  { period: '2025 - 2026', role: 'Design Engineer', org: 'Codeless Solutions', desc: 'Lead end-to-end development of DreamAI — a no-code product integrating Azure OpenAI GPT for dream interpretation, wellness insights, and personalized recommendations.' },
  { period: '2024', role: 'Product Designer', org: 'Jrun Global', desc: 'Developed cohesive design systems and comprehensive style guides to ensure visual consistency across the web application.' },
];

const quotes: Quote[] = [
  { quote: 'Oluwatosin translated our product vision into a clean, scalable system. The new onboarding flow lifted activation within weeks.', name: 'Aaron Israel', title: 'CEO, Codeless Solutions' },
  { quote: 'From strategy to build, every detail was intentional. Our team now ships faster with confidence.', name: 'Godwin Okechukwu', title: 'Founder, Shyne Africa' },
];

const socials = [
  { label: 'Twitter', href: TWITTER },
  { label: 'LinkedIn', href: LINKEDIN },
  { label: 'Résumé', href: RESUME },
];

const css = `
*{box-sizing:border-box}
html,body{margin:0;padding:0}
html{--chrome-bg:rgba(15,17,21,.6);--chrome-fg:#e9eaee;--chrome-line:rgba(255,255,255,.09);--chip-bg:rgba(255,255,255,.06);--chip-line:rgba(255,255,255,.12);--body-bg:#0f1115;--chrome-accent:#2f6bff}
html[data-theme="light"]{--chrome-bg:rgba(236,238,241,.72);--chrome-fg:#16181d;--chrome-line:rgba(0,0,0,.1);--chip-bg:rgba(0,0,0,.045);--chip-line:rgba(0,0,0,.1);--body-bg:#eceef1}
body{background-color:var(--body-bg);font-family:'General Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
::selection{background:var(--chrome-accent);color:#fff}

[data-root="c"]{--bg:#0f1115;--fg:#e9eaee;--muted:#aeb1bb;--faint:#757985;--line:rgba(233,234,238,.12);--surface:#15171d;--surface2:#1a1d24;--accent:#2f6bff;--accent-ink:#fff;--grid:rgba(233,234,238,.045);--ink:var(--fg);--ink-2:var(--muted);--ink-3:var(--faint);--rule:var(--line);--amber:var(--accent);--amber-2:#5b8bff;--amber-ink:var(--accent-ink);--skill-color:var(--accent);--card-bg-from:var(--surface2);--card-bg-to:var(--surface);--bg-2:var(--surface2)}
html[data-theme="light"] [data-root="c"]{--bg:#eceef1;--fg:#16181d;--muted:#54585f;--faint:#7a7e88;--line:rgba(22,24,29,.13);--surface:#e0e3e7;--surface2:#d7dadf;--accent:#2f6bff;--accent-ink:#fff;--grid:rgba(22,24,29,.05);--amber-2:#2057e6}

model-viewer{--poster-color:transparent;background-color:transparent}
@keyframes ot-blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes ot-grid{from{background-position:0 0}to{background-position:0 44px}}
@keyframes ot-scan{0%{top:3%;opacity:0}12%{opacity:.75}88%{opacity:.75}100%{top:95%;opacity:0}}
@keyframes ot-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes ot-glow{0%,100%{opacity:.8}50%{opacity:1}}
@keyframes ot-orbitline{0%,100%{transform:scaleX(.4);opacity:.3}50%{transform:scaleX(1);opacity:.8}}

/* portrait */
.v2-portrait img{transition:filter .5s ease, transform .8s cubic-bezier(.2,.7,.15,1)}
.v2-portrait:hover img{filter:none;transform:scale(1.03)}

/* project entrance reveal (case studies) */
.v2-proj-figure{clip-path:inset(0 0 100% 0);transition:clip-path 1s cubic-bezier(.16,.84,.32,1),border-color .3s,transform .4s}
.v2-proj-photo{transform:scale(1.18);transition:transform 1.25s cubic-bezier(.16,.84,.32,1);will-change:transform}
.v2-proj-caption{opacity:0;transform:translateY(38px);transition:opacity .85s ease .18s,transform .9s cubic-bezier(.2,.7,.15,1) .18s}

/* Staggered animation delays */
.v2-proj[data-index="0"] .v2-proj-figure,
.v2-proj[data-index="0"] .v2-proj-photo,
.v2-proj[data-index="0"] .v2-proj-caption { transition-delay: 0s; }
.v2-proj[data-index="1"] .v2-proj-figure,
.v2-proj[data-index="1"] .v2-proj-photo,
.v2-proj[data-index="1"] .v2-proj-caption { transition-delay: 0.1s; }
.v2-proj[data-index="2"] .v2-proj-figure,
.v2-proj[data-index="2"] .v2-proj-photo,
.v2-proj[data-index="2"] .v2-proj-caption { transition-delay: 0.2s; }
.v2-proj[data-index="3"] .v2-proj-figure,
.v2-proj[data-index="3"] .v2-proj-photo,
.v2-proj[data-index="3"] .v2-proj-caption { transition-delay: 0.3s; }
.v2-proj[data-index="4"] .v2-proj-figure,
.v2-proj[data-index="4"] .v2-proj-photo,
.v2-proj[data-index="4"] .v2-proj-caption { transition-delay: 0.4s; }
.v2-proj[data-index="5"] .v2-proj-figure,
.v2-proj[data-index="5"] .v2-proj-photo,
.v2-proj[data-index="5"] .v2-proj-caption { transition-delay: 0.5s; }

.v2-proj[data-shown="0"] .v2-proj-figure{clip-path:inset(0 0 100% 0)}
.v2-proj[data-shown="0"] .v2-proj-photo{transform:scale(1.18)}
.v2-proj[data-shown="0"] .v2-proj-caption{opacity:0;transform:translateY(38px)}
.v2-proj[data-shown="1"] .v2-proj-figure{clip-path:inset(0 0 0 0)}
.v2-proj[data-shown="1"] .v2-proj-photo{transform:scale(1)}
.v2-proj[data-shown="1"] .v2-proj-caption{opacity:1;transform:none}

/* Parallax hover effect */
.v2-proj:hover .v2-proj-photo {
  transform: scale(1.05) translateY(-5px);
}
.v2-proj:hover .v2-proj-figure,.v2-proj:focus-visible .v2-proj-figure{border-color:var(--accent);transform:translateY(-4px)}
.v2-proj:hover .v2-proj-title,.v2-proj:focus-visible .v2-proj-title{color:var(--accent)}
.v2-proj-view{opacity:0;transform:translateY(6px);transition:opacity .3s ease,transform .3s ease}
.v2-proj:hover .v2-proj-view,.v2-proj:focus-visible .v2-proj-view{opacity:1;transform:none}
.v2-proj:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent)}

/* case study modal — re-themed from the old palette to v2 tokens */
[data-root="c"] .modal-content,[data-root="c"] .modal-header{background:var(--surface)}
[data-root="c"] .modal-meta h2,[data-root="c"] .cs-heading,[data-root="c"] .cs-stat-num,[data-root="c"] .cs-quote-text,[data-root="c"] .cs-step-num{font-family:'Cabinet Grotesk',sans-serif;font-style:normal}
[data-root="c"] .cs-subtitle,[data-root="c"] .cs-eyebrow,[data-root="c"] .modal-badge,[data-root="c"] .cs-meta-label,[data-root="c"] .cs-stat-desc,[data-root="c"] .cs-tech-pill,[data-root="c"] .cs-quote-cite,[data-root="c"] .cs-table th,[data-root="c"] .external-link-btn,[data-root="c"] .modal-close{font-family:'Space Mono',monospace;font-style:normal}
[data-root="c"] .modal-badge{background:color-mix(in srgb,var(--accent) 14%,transparent);border-color:color-mix(in srgb,var(--accent) 35%,transparent)}
[data-root="c"] .cs-tech-pill{background:color-mix(in srgb,var(--accent) 10%,transparent);border-color:color-mix(in srgb,var(--accent) 28%,transparent)}
[data-root="c"] .cs-result-dot{background:color-mix(in srgb,var(--accent) 20%,transparent)}
html[data-theme="light"] [data-root="c"] .modal-overlay{background:rgba(15,17,21,.34)}
html[data-theme="light"] [data-root="c"] .modal-badge{background:color-mix(in srgb,var(--accent) 16%,transparent);border-color:color-mix(in srgb,var(--accent) 35%,transparent)}

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

@media (prefers-reduced-motion: reduce){
  .v2-proj-figure{clip-path:none !important}
  .v2-proj-photo{transform:none !important}
  .v2-proj-caption{opacity:1 !important;transform:none !important}
}
`;

export default function PortfolioV2() {
  const themeRef = useRef<'dark' | 'light'>('dark');
  const themeBtnRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<ProjectV2 | null>(null);

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

  const openProject = (p: ProjectV2) => {
    rowLeave();
    setActive(p);
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
      if (el) el.textContent = new Date().toLocaleTimeString('en-GB') + ' GMT+1';
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

    // scroll reveal (generic fade/slide for headers, text, etc.)
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

    // project entrance reveal (case studies) — cinematic clip + scale + title rise
    let pio: IntersectionObserver | null = null;
    let currentShownEl: HTMLElement | null = null;
    const projEls = Array.from(document.querySelectorAll<HTMLElement>('.v2-proj'));
    if ('IntersectionObserver' in window) {
      pio = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              // Hide the previously shown project
              if (currentShownEl && currentShownEl !== en.target) {
                currentShownEl.dataset.shown = '0';
              }
              // Show the new one
              (en.target as HTMLElement).dataset.shown = '1';
              currentShownEl = en.target as HTMLElement;
            }
          });
        },
        { rootMargin: '0px 0px -30% 0px', threshold: 0.5 }
      );
      projEls.forEach((el) => pio!.observe(el));
    } else {
      projEls.forEach((el) => { el.dataset.shown = '1'; });
    }

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
      if (pio) pio.disconnect();
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
            <span id="ot-clock" style={{ color: 'var(--accent)' }}>--:--:-- GMT+1</span>
            <span>REMOTE · WORLDWIDE</span>
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
                style={{ margin: 0, fontFamily: CAB, fontWeight: 900, fontSize: 'clamp(42px,8vw,108px)', lineHeight: 1, letterSpacing: '-.035em', whiteSpace: 'nowrap', opacity: 0 }}
              >
                Oluwatosin<span style={{ color: 'var(--accent)' }}>.</span>
              </h1>
              <p data-reveal style={{ margin: '26px 0 0', maxWidth: '46ch', fontSize: 'clamp(16px,1.55vw,20px)', lineHeight: 1.6, color: 'var(--muted)' }}>
                I design things that make sense, then build them so they actually work — scalable, user-focused digital products from concept to
                production.
              </p>
              <div data-reveal style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 34 }}>
                <a
                  href={MAILTO}
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
                <div><div style={{ color: 'var(--accent)' }}>BASED</div><div style={{ color: 'var(--fg)' }}>Remote</div></div>
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
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
              <div data-reveal>
                <div
                  className="v2-portrait"
                  style={{
                    position: 'relative',
                    border: '1px solid var(--line)',
                    aspectRatio: '1/1',
                    overflow: 'hidden',
                    background: 'var(--surface)',
                  }}
                >
                  <img
                    src={portraitImg}
                    alt="Portrait of Oluwatosin"
                    loading="lazy"
                    decoding="async"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', filter: 'grayscale(1) contrast(1.03)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 58%, rgba(0,0,0,.5) 100%)', pointerEvents: 'none' }} />
                  <span style={{ position: 'absolute', left: 14, bottom: 14, fontFamily: MONO, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.82)' }}>
                    oluwatosin.jpg
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ============ FEATURED PROJECTS / CASE STUDIES ============ */}
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
            {projects.map((p, i) => (
              <article
                key={p.n}
                className="v2-proj"
                data-index={i}
                data-name={p.name}
                onMouseEnter={rowEnter}
                onMouseLeave={rowLeave}
                onClick={() => openProject(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProject(p);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open case study for ${p.name}`}
                style={{ margin: '0 auto clamp(48px,7vw,88px)', maxWidth: 820, cursor: 'pointer' }}
              >
                <div
                  className="v2-proj-figure"
                  style={{ position: 'relative', aspectRatio: '16/10', border: '1px solid var(--line)', overflow: 'hidden', background: 'var(--surface)' }}
                >
                  <img
                    className="v2-proj-photo"
                    src={p.image}
                    alt={`${p.name} — ${p.type}`}
                    loading="lazy"
                    decoding="async"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.5) 0%, transparent 26%, transparent 62%, rgba(0,0,0,.55) 100%)', pointerEvents: 'none' }} />
                  <span style={{ position: 'absolute', top: 14, left: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.1em', color: '#fff' }}>[{p.n}]</span>
                  <span style={{ position: 'absolute', top: 14, right: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.85)' }}>{p.type}</span>
                  <span className="v2-proj-view" style={{ position: 'absolute', bottom: 14, left: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff' }}>View case study →</span>
                  <span style={{ position: 'absolute', bottom: 14, right: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.08em', color: 'rgba(255,255,255,.8)' }}>{p.tags}</span>
                </div>
                <div className="v2-proj-caption" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 18, gap: 16 }}>
                  <h3
                    className="v2-proj-title"
                    style={{ margin: 0, fontFamily: CAB, fontWeight: 800, fontSize: 'clamp(30px,5vw,64px)', lineHeight: 0.92, letterSpacing: '-.03em', color: 'var(--fg)', transition: 'color .3s' }}
                  >
                    {p.name}
                  </h3>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--faint)', whiteSpace: 'nowrap' }}>{p.year} ↗</span>
                </div>
              </article>
            ))}

            <div data-reveal style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, padding: 'clamp(40px,6vw,72px) 0 clamp(20px,3vw,40px)' }}>
              <a
                href={MAILTO}
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
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--faint)' }}>Let's build the next one</span>
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
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: CAB,
                        fontWeight: 800,
                        fontSize: 14,
                        color: 'var(--accent)',
                        background: 'color-mix(in srgb,var(--accent) 10%,transparent)',
                        flex: 'none',
                      }}
                    >
                      {q.name.charAt(0)}
                    </div>
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
              href={MAILTO}
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
              {EMAIL} →
            </a>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 8, fontFamily: MONO, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>
              {socials.map((soc) => {
                const external = soc.href.startsWith('http') || soc.href.startsWith('/');
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="v2-social"
                    style={{ color: 'var(--faint)', textDecoration: 'none', transition: 'color .2s' }}
                  >
                    {soc.label} ↗
                  </a>
                );
              })}
            </div>
          </section>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 11, color: 'var(--faint)', paddingBottom: 40 }}>
            <span>© 2026 OLUWATOSIN</span>
            <span id="ot-coord">0000 · 0000</span>
          </div>
        </div>

        {active && (
          <CaseStudyModal
            isOpen
            onClose={() => setActive(null)}
            project={{
              title: active.name,
              category: active.category,
              summary: active.summary,
              metrics: active.metrics,
              outcome: active.outcome,
              caseStudy: active.caseStudy,
              liveUrl: active.liveUrl,
            }}
          />
        )}
      </div>
    </>
  );
}
