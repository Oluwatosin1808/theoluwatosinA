import React, { useEffect, useRef, useState } from 'react';
import CaseStudyModal, { CaseStudyData } from './components/CaseStudyModal';
import Character3D from './components/Character3D';
import PixelImage from './components/PixelImage';
import { getCaseStudy, useCaseStudyOverrides, usePersonalProjects } from './lib/sanity';
import { BASE_CSS } from './theme';
import {
  artemisCaseStudy,
  codelessAgencyCaseStudy,
  dreamAiCaseStudy,
  gloUpCaseStudy,
  nesoCaseStudy,
  aaronIsraelCaseStudy,
} from './caseStudies';

const MONO = "'Space Mono', monospace";
const CAB = "'Cabinet Grotesk', sans-serif";
const GS = "'General Sans', sans-serif";

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

/** Playlist behind the ♪ button — swap this id for any open.spotify.com playlist. */
const SPOTIFY_PLAYLIST_ID = '37i9dQZF1E37DSFUJ2rXjD';

/** Nav-bar anchors (ids exist on the sections further down the page). */
const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'personal', label: 'Personal' },
  { id: 'career', label: 'Career' },
  { id: 'tools', label: 'Tools' },
  { id: 'play', label: 'Play' },
  { id: 'contact', label: 'Contact' },
] as const;

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
  /** Sanity document slug (keys into localCaseStudies / fetched overrides). */
  slug: string;
};

const stats: Stat[] = [
  { n: '01', target: '4', suffix: '', label: 'Years experience' },
  { n: '02', target: '20', suffix: '+', label: 'Products shipped' },
  { n: '03', target: '4.8', suffix: '', label: 'Avg client rating' },
  { n: '04', target: '12', suffix: '+', label: 'Brands & startups' },
];

const skills = ['Product Design', 'UI / UX', 'Frontend', 'Webflow', 'Framer', 'Bubble', 'Prototyping', 'Motion'];

// ── Tools (logo revealed on hover — masks read /img/tools/*.svg) ────────────
type Tool = { name: string; logo?: string; role: string };
const tools: Tool[] = [
  { name: 'Figma', logo: 'figma', role: 'interface design' },
  { name: 'Framer', logo: 'framer', role: 'prototyping · sites' },
  { name: 'Webflow', logo: 'webflow', role: 'no-code build' },
  { name: 'Bubble', role: 'no-code apps' }, // no Simple Icons entry → monogram
  { name: 'React', logo: 'react', role: 'frontend' },
  { name: 'Three.js', logo: 'threedotjs', role: '3D · WebGL' },
  { name: 'Sanity', logo: 'sanity', role: 'headless CMS' },
  { name: 'Vite', logo: 'vite', role: 'tooling' },
  { name: 'TypeScript', logo: 'typescript', role: 'type safety' },
  { name: 'Tailwind', logo: 'tailwindcss', role: 'styling' },
  { name: 'Next.js', logo: 'nextdotjs', role: 'react framework' },
  { name: 'Vercel', logo: 'vercel', role: 'hosting' },
];

const projects: ProjectV2[] = [
  {
    n: '01', name: 'Artemis II', type: 'Creative Coding · 3D', tags: 'Three.js, WebGL', year: '2026', image: imgArtemis,
    category: 'Creative Coding · 3D',
    summary: "A real-time 3D tribute to NASA's Artemis II mission. Designed with Maryam Alakoso, built in code on omma.build.",
    metrics: 'Real-time WebGL',
    outcome: 'A single scene authored in code — geometry, lighting, and camera all live in source.',
    caseStudy: artemisCaseStudy, liveUrl: 'https://omma.build/p/artemis-ii-3d-scene-code-jwabi0',
    slug: 'artemis-ii-3d-scene',
  },
  {
    n: '02', name: 'Codeless', type: 'Agency · Next.js', tags: 'Webflow, Next.js', year: '2026', image: imgCodeless,
    category: 'Product Design + Development',
    summary: 'A home for a no-code agency that needed to look anything but ordinary.',
    metrics: '38% increase in activation',
    outcome: 'Reduced drop-offs with data-driven flows and personalized nudges.',
    caseStudy: codelessAgencyCaseStudy, liveUrl: 'https://agency.codelessify.org',
    slug: 'codeless-solutions',
  },
  {
    n: '03', name: 'DreamAI', type: 'AI Product · Bubble', tags: 'Bubble, GPT', year: '2025', image: imgDreamAI,
    category: 'No-Code Build & Design',
    summary: 'Designed and shipped an AI-powered dream journaling & interpretation web app.',
    metrics: 'Built on Bubble',
    outcome: 'AI-powered interpretation delivered in seconds with a journaling-first UX.',
    caseStudy: dreamAiCaseStudy, liveUrl: 'https://dreamai-52691.bubbleapps.io/version-test',
    slug: 'dreamai',
  },
  {
    n: '04', name: 'The Glo Up', type: 'Dating · Mobile', tags: 'iOS, Product', year: '2023', image: imgGloUp,
    category: 'Product Design',
    summary: 'A dating app that helps users find potential dates beyond the heterosexual default.',
    metrics: 'Mobile app in development',
    outcome: 'Connect based on sexuality and interests with options beyond romance.',
    caseStudy: gloUpCaseStudy,
    liveUrl: 'https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FOdXozCiTmU0EFVpB6esD3Y%2FThe-Glo-Up-Dating-App%3Fnode-id%3D0%253A1%26t%3DGpxOALxhnck2XF3y-1',
    slug: 'the-glo-up-app',
  },
  {
    n: '05', name: 'Neso', type: 'Health & Fitness', tags: 'Mobile, Nutrition', year: '2023', image: imgNeso,
    category: 'Product Design',
    summary: 'Workout and fitness tracker with built-in nutrition monitoring.',
    metrics: 'Fitness + nutrition tracking',
    outcome: 'Workout setup, progress tracking, and nutrition monitoring in one program-led experience.',
    caseStudy: nesoCaseStudy,
    liveUrl: 'https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FRp5R4gmO5aSdevyzHz57Qb%2FTrain-and-Earn-Fitness-App-(Copy)%3Fnode-id%3D0%253A1',
    slug: 'neso',
  },
  {
    n: '06', name: 'Aaron Israel', type: 'Portfolio · No-Code', tags: 'Webflow, Framer', year: '2026', image: imgAaron,
    category: 'No-Code Development',
    summary: 'No-code web developer and digital builder shipping production-ready websites in days.',
    metrics: '40+ projects shipped',
    outcome: '3x faster delivery than traditional dev cycles with a 98% client satisfaction rate.',
    caseStudy: aaronIsraelCaseStudy, liveUrl: 'https://aaron.pxxl.click',
    slug: 'aaron-israel',
  },
];

const career: Career[] = [
  { period: '2026 — Present', role: 'Design Engineer', org: 'Finbloom Capital Ltd', desc: 'Designing and building product experiences for finance — taking features from research and interface design through to shipped, production-grade frontend.' },
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

// Base reset / theme vars / ot-blink live in src/theme.ts (shared with /play).
const css = BASE_CSS + `
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

/* featured projects grid */
.v2-proj-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(34px,4.5vw,64px) clamp(20px,3vw,44px);align-items:start}
.v2-proj-grid .v2-proj{margin:0}
.v2-proj-grid .v2-proj:nth-child(even){margin-top:clamp(28px,4.5vw,76px)} /* editorial offset for the right column */

/* personal projects — coming soon banner */
.v2-soon{position:relative;border:1px solid var(--line);background:linear-gradient(165deg,var(--surface2),var(--surface) 72%);padding:clamp(26px,4vw,52px);overflow:hidden;transition:border-color .35s}
.v2-soon:hover{border-color:color-mix(in srgb,var(--accent) 40%,transparent)}
.v2-soon::before{content:"";position:absolute;top:-45%;right:-8%;width:54%;height:190%;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 13%,transparent),transparent 72%);pointer-events:none}
.v2-soon-head{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.v2-soon-badge{display:inline-flex;align-items:center;gap:9px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);border:1px solid color-mix(in srgb,var(--accent) 38%,transparent);background:color-mix(in srgb,var(--accent) 10%,transparent);padding:8px 15px;border-radius:999px}
.v2-soon-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:ot-blink 1.5s ease-in-out infinite}
.v2-soon-meta{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint)}
.v2-soon-title{position:relative;z-index:1;margin:clamp(20px,3vw,36px) 0 0;font-family:'Cabinet Grotesk',sans-serif;font-weight:900;font-size:clamp(36px,6.5vw,84px);line-height:.9;letter-spacing:-.03em;color:var(--fg)}
.v2-soon-desc{position:relative;z-index:1;margin:16px 0 0;max-width:58ch;font-size:clamp(15px,1.7vw,18px);line-height:1.6;color:var(--muted)}
.v2-soon-slots{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:clamp(26px,3.5vw,44px)}
.v2-soon-slot{display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px dashed color-mix(in srgb,var(--fg) 26%,transparent);padding:16px 18px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);background:color-mix(in srgb,var(--bg) 55%,transparent);transition:border-color .3s,color .3s}
.v2-soon-slot:hover{border-color:color-mix(in srgb,var(--accent) 45%,transparent);color:var(--muted)}

/* case study modal — re-themed from the old palette to v2 tokens */
[data-root="c"] .modal-content,[data-root="c"] .modal-header{background:var(--surface)}
[data-root="c"] .modal-meta h2,[data-root="c"] .cs-heading,[data-root="c"] .cs-stat-num,[data-root="c"] .cs-quote-text,[data-root="c"] .cs-step-num{font-family:'Cabinet Grotesk',sans-serif;font-style:normal}
[data-root="c"] .cs-subtitle,[data-root="c"] .cs-eyebrow,[data-root="c"] .modal-badge,[data-root="c"] .cs-meta-label,[data-root="c"] .cs-stat-desc,[data-root="c"] .cs-tech-pill,[data-root="c"] .cs-quote-cite,[data-root="c"] .cs-table th,[data-root="c"] .external-link-btn,[data-root="c"] .modal-close{font-family:'Space Mono',monospace;font-style:normal}
[data-root="c"] .modal-badge{background:color-mix(in srgb,var(--accent) 14%,transparent);border-color:color-mix(in srgb,var(--accent) 35%,transparent)}
[data-root="c"] .cs-tech-pill{background:color-mix(in srgb,var(--accent) 10%,transparent);border-color:color-mix(in srgb,var(--accent) 28%,transparent)}
[data-root="c"] .cs-result-dot{background:color-mix(in srgb,var(--accent) 20%,transparent)}
html[data-theme="light"] [data-root="c"] .modal-overlay{background:rgba(15,17,21,.34)}
html[data-theme="light"] [data-root="c"] .modal-badge{background:color-mix(in srgb,var(--accent) 16%,transparent);border-color:color-mix(in srgb,var(--accent) 35%,transparent)}

/* ── nav bar ─────────────────────────────────────────────────────────────── */
html{scroll-behavior:smooth}
section[id]{scroll-margin-top:88px}
.v2-nav{display:flex;align-items:center;gap:clamp(2px,.8vw,10px)}
.v2-nav a{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--chrome-fg);opacity:.5;text-decoration:none;padding:7px 9px;border:1px solid transparent;transition:opacity .2s,color .2s,border-color .2s,background .2s}
.v2-nav a:hover{opacity:1;color:var(--chrome-accent)}
.v2-nav a.on{opacity:1;color:var(--chrome-accent);border-color:color-mix(in srgb,var(--chrome-accent) 38%,transparent);background:color-mix(in srgb,var(--chrome-accent) 12%,transparent)}
.v2-chipbtn{border:1px solid var(--chip-line);background:var(--chip-bg);color:var(--chrome-fg);cursor:pointer;height:38px;min-width:38px;padding:0 11px;border-radius:999px;display:flex;align-items:center;justify-content:center;gap:7px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.1em;transition:all .22s;flex:none}
.v2-chipbtn:hover{border-color:color-mix(in srgb,var(--chrome-accent) 55%,transparent);color:var(--chrome-accent)}
.v2-chipbtn.on{background:var(--chrome-accent);border-color:var(--chrome-accent);color:#fff}
.v2-chipbtn.on:hover{color:#fff}
.v2-navtoggle{display:none}
.v2-menu{display:none}
@media (max-width:940px){ .v2-status{display:none} }
@media (max-width:840px){
  .v2-nav{display:none}
  .v2-navtoggle{display:flex}
  .v2-menu.open{display:flex;position:absolute;top:100%;left:0;right:0;flex-direction:column;background:var(--chrome-bg);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--chrome-line);padding:6px clamp(16px,4vw,40px) 14px;gap:2px;z-index:5}
  .v2-menu a{font-family:'Space Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--chrome-fg);text-decoration:none;padding:11px 4px;border-bottom:1px solid var(--chrome-line)}
  .v2-menu a:last-child{border-bottom:none}
  .v2-menu a.on{color:var(--chrome-accent)}
}

/* ── pixelated image loading state ───────────────────────────────────────── */
.v2-fade-in{opacity:0;transition:opacity .5s ease}
.v2-fade-in.v2-img-ready{opacity:1}
.v2-proj-photo.v2-fade-in{transition:opacity .5s ease,transform 1.25s cubic-bezier(.16,.84,.32,1)}
.v2-pixel-ph{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;image-rendering:pixelated;image-rendering:crisp-edges;z-index:0;transition:opacity .45s ease}
.v2-pixel-loader{position:absolute;inset:0;z-index:1;overflow:hidden;background:color-mix(in srgb,var(--surface) 94%,transparent);display:grid;place-items:center;pointer-events:none}
.v2-pixel-loader--soft{background:color-mix(in srgb,var(--bg) 38%,transparent)}
.v2-pixel-checker{position:absolute;inset:-34px;background-image:conic-gradient(color-mix(in srgb,var(--accent) 17%,transparent) 0 25%,transparent 0 50%,color-mix(in srgb,var(--accent) 17%,transparent) 0 75%,transparent 0);background-size:32px 32px;animation:ot-pixscroll 1.1s steps(4) infinite}
.v2-pixel-loader--soft .v2-pixel-checker{opacity:.55;animation-duration:1.7s}
@keyframes ot-pixscroll{from{background-position:0 0}to{background-position:32px 0}}
.v2-pixel-loader-center{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:9px}
.v2-pixel-blocks{display:flex;gap:5px}
.v2-pixel-blocks i{width:10px;height:10px;background:var(--line);animation:ot-pixblock .9s steps(2) infinite}
.v2-pixel-blocks i:nth-child(2){animation-delay:.15s}
.v2-pixel-blocks i:nth-child(3){animation-delay:.3s}
.v2-pixel-blocks i:nth-child(4){animation-delay:.45s}
@keyframes ot-pixblock{0%,100%{background:var(--line);transform:none}50%{background:var(--accent);transform:scale(1.3)}}
.v2-pixel-tag{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--faint);background:color-mix(in srgb,var(--bg) 80%,transparent);border:1px solid var(--line);padding:5px 9px;white-space:nowrap}

/* personal-project skeleton while Sanity responds */
.v2-skel-bar{height:26px;background:var(--surface2);position:relative;overflow:hidden;display:block}
.v2-skel-bar::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--fg) 8%,transparent),transparent);animation:ot-sheen 1.2s steps(7) infinite}
@keyframes ot-sheen{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
.v2-skel-cap{display:flex;justify-content:space-between;align-items:baseline;margin-top:16px;gap:12px}

/* ── tools: logo on hover ────────────────────────────────────────────────── */
.v2-tools{display:grid;grid-template-columns:repeat(auto-fill,minmax(158px,1fr));gap:10px}
.v2-tool{position:relative;border:1px solid var(--line);background:color-mix(in srgb,var(--surface) 45%,transparent);padding:16px;min-height:112px;display:flex;flex-direction:column;justify-content:flex-end;gap:5px;overflow:hidden;transition:border-color .25s,background .25s}
.v2-tool:hover{border-color:color-mix(in srgb,var(--accent) 55%,transparent);background:color-mix(in srgb,var(--accent) 7%,transparent)}
.v2-tool-idx{position:absolute;top:12px;left:14px;font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.1em;color:var(--faint)}
.v2-tool-mark{position:absolute;top:44%;left:50%;transform:translate(-50%,-50%) scale(.68);width:44px;height:44px;opacity:0;transition:opacity .26s steps(3),transform .3s cubic-bezier(.2,.8,.2,1);background:var(--accent);mask-position:center;mask-repeat:no-repeat;mask-size:contain;-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;-webkit-mask-size:contain;pointer-events:none}
.v2-tool:hover .v2-tool-mark{opacity:1;transform:translate(-50%,-50%) scale(1)}
.v2-tool-mono{position:absolute;top:44%;left:50%;transform:translate(-50%,-50%) scale(.68);width:44px;height:44px;opacity:0;display:grid;place-items:center;background:var(--accent);color:var(--accent-ink);font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:16px;letter-spacing:-.02em;transition:opacity .26s steps(3),transform .3s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.v2-tool:hover .v2-tool-mono{opacity:1;transform:translate(-50%,-50%) scale(1)}
.v2-tool-name{font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:17px;letter-spacing:-.01em;transition:opacity .25s}
.v2-tool:hover .v2-tool-name{opacity:.32}
.v2-tool-role{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);transition:opacity .25s}
.v2-tool:hover .v2-tool-role{opacity:.45}
@media (hover:none){
  .v2-tool-mark,.v2-tool-mono{opacity:.92;transform:translate(-50%,-50%) scale(.9)}
  .v2-tool-name{opacity:.55}
  .v2-tool:hover .v2-tool-name{opacity:.55}
}

/* ── Spotify mini player ─────────────────────────────────────────────────── */
.v2-player{position:fixed;left:clamp(12px,3vw,28px);bottom:clamp(12px,3vw,24px);width:min(352px,calc(100vw - 24px));z-index:115;border:1px solid var(--line);background:color-mix(in srgb,var(--surface) 94%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 20px 55px rgba(0,0,0,.45);animation:v2-player-in .34s cubic-bezier(.2,.8,.2,1) both}
@keyframes v2-player-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.v2-player-head{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 11px;border-bottom:1px solid var(--line);font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint)}
.v2-player-live{display:flex;align-items:center;gap:8px;color:var(--accent)}
.v2-player-live i{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:ot-blink 1.5s steps(2) infinite}
.v2-player-close{border:1px solid var(--line);background:none;color:var(--faint);width:26px;height:26px;border-radius:50%;cursor:pointer;font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center;transition:all .2s}
.v2-player-close:hover{border-color:var(--accent);color:var(--accent)}
.v2-player iframe{display:block;border:0;width:100%}

/* ── arcade teaser (links to the full-screen /play page) ────────────────── */
.v2-arcade{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:clamp(20px,4vw,56px);align-items:center;border:1px solid var(--line);background:color-mix(in srgb,var(--surface) 55%,transparent);padding:clamp(28px,5vw,60px);overflow:hidden;text-decoration:none;color:inherit;transition:border-color .3s ease,transform .3s ease,background .3s ease}
.v2-arcade:hover{border-color:color-mix(in srgb,var(--accent) 55%,transparent);background:color-mix(in srgb,var(--accent) 8%,transparent);transform:translateY(-3px)}
.v2-arcade-grid{position:absolute;top:-56px;right:-56px;width:320px;height:320px;background-image:linear-gradient(color-mix(in srgb,var(--accent) 30%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--accent) 30%,transparent) 1px,transparent 1px);background-size:26px 26px;background-position:0 0;mask-image:radial-gradient(closest-side,#000 30%,transparent 78%);-webkit-mask-image:radial-gradient(closest-side,#000 30%,transparent 78%);animation:v2-arcadegrid 4s steps(4) infinite;pointer-events:none}
@keyframes v2-arcadegrid{from{background-position:0 0}to{background-position:26px 26px}}
.v2-arcade-body{position:relative;z-index:1;display:flex;flex-direction:column;align-items:flex-start;gap:14px;min-width:0}
.v2-arcade-badge{display:inline-flex;align-items:center;gap:8px;font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);border:1px solid color-mix(in srgb,var(--accent) 45%,transparent);background:color-mix(in srgb,var(--accent) 12%,transparent);padding:6px 11px}
.v2-arcade-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:ot-blink 1.5s steps(2) infinite}
.v2-arcade h2{margin:0;font-family:'Cabinet Grotesk',sans-serif;font-weight:900;font-size:clamp(34px,5.5vw,68px);line-height:.95;letter-spacing:-.03em;color:var(--fg)}
.v2-arcade p{margin:0;font-size:15.5px;line-height:1.65;color:var(--muted);max-width:56ch}
.v2-arcade-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:2px}
.v2-arcade-chips span{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);border:1px solid var(--line);padding:6px 10px;transition:color .25s,border-color .25s}
.v2-arcade:hover .v2-arcade-chips span{color:var(--muted);border-color:color-mix(in srgb,var(--accent) 35%,transparent)}
.v2-arcade-cta{position:relative;z-index:1;display:inline-flex;align-items:center;gap:12px;white-space:nowrap;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.14em;text-transform:uppercase;background:var(--accent);color:var(--accent-ink);padding:20px 30px;box-shadow:0 12px 34px color-mix(in srgb,var(--accent) 35%,transparent);transition:transform .25s ease,box-shadow .25s ease}
.v2-arcade:hover .v2-arcade-cta{transform:translate(3px,-3px);box-shadow:0 16px 40px color-mix(in srgb,var(--accent) 45%,transparent)}
.v2-arcade-cta b{font-weight:400;transition:transform .25s ease}
.v2-arcade:hover .v2-arcade-cta b{transform:translateX(4px)}
@media (max-width:760px){
  .v2-arcade{grid-template-columns:1fr;gap:22px}
  .v2-arcade-cta{justify-content:center;width:100%}
}

/* responsive */
@media (max-width:860px){
  .v2-hero{grid-template-columns:1fr !important}
  .v2-stats{grid-template-columns:repeat(2,1fr) !important}
  .v2-about{grid-template-columns:1fr !important}
  .v2-career-row{grid-template-columns:1fr !important;gap:6px !important}
  .v2-quotes{grid-template-columns:1fr !important}
  .v2-proj-grid{grid-template-columns:1fr}
  .v2-proj-grid .v2-proj:nth-child(even){margin-top:0}
  .v2-soon-slots{grid-template-columns:1fr}
}
@media (max-width:480px){
  .v2-stats{grid-template-columns:1fr !important}
}

@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  .v2-proj-figure{clip-path:none !important}
  .v2-proj-photo{transform:none !important}
  .v2-proj-caption{opacity:1 !important;transform:none !important}
  .v2-soon-dot{animation:none}
  .v2-pixel-checker,.v2-pixel-blocks i,.v2-skel-bar::after,.v2-player{animation:none}
  .v2-tool-mark,.v2-tool-mono,.v2-tool-name{transition:none}
  .v2-arcade{transition:none}
  .v2-arcade:hover{transform:none;background:color-mix(in srgb,var(--surface) 55%,transparent)}
  .v2-arcade-grid,.v2-arcade-dot,.v2-arcade-cta,.v2-arcade-cta b{animation:none;transition:none}
}
`;

export default function PortfolioV2() {
  const themeRef = useRef<'dark' | 'light'>('dark');
  const themeBtnRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<ProjectV2 | null>(null);
  // Case studies from Sanity (empty until/unless the fetch resolves — the
  // bundled caseStudies.ts content fills any gap, see getCaseStudy).
  const caseStudyOverrides = useCaseStudyOverrides();
  // Personal projects published from the Studio (drives the second grid).
  const { items: personalProjects, loading: personalLoading } = usePersonalProjects();
  const [menuOpen, setMenuOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('work');

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
    // Sanity content wins for this slug; fall back to the bundled study.
    const caseStudy = getCaseStudy(p.slug, caseStudyOverrides) ?? p.caseStudy;
    setActive(caseStudy ? { ...p, caseStudy } : p);
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

    // scrollspy: highlight the section the reader is actually in
    const sectionIds: string[] = NAV_ITEMS.map((n) => n.id);
    const onScrollSpy = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.38) current = id;
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();

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

    // project entrance reveal (case studies) — cinematic clip + scale + title rise.
    // Cards reveal independently and stay revealed (grid layout: several are on screen at once)
    let pio: IntersectionObserver | null = null;
    const projEls = Array.from(document.querySelectorAll<HTMLElement>('.v2-proj'));
    if ('IntersectionObserver' in window) {
      pio = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              (en.target as HTMLElement).dataset.shown = '1';
            }
          });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.25 }
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
      window.removeEventListener('scroll', onScrollSpy);
      window.clearInterval(clockId);
      if (io) io.disconnect();
      if (pio) pio.disconnect();
      timeouts.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reveal pass for cards that mount after first paint — personal projects
  // arrive from Sanity once their fetch resolves, so they miss the observers
  // set up in the effect above.
  useEffect(() => {
    const fresh = Array.from(document.querySelectorAll<HTMLElement>('.v2-proj:not([data-shown])'));
    if (fresh.length === 0) return;
    fresh.forEach((el) => {
      el.dataset.shown = '0';
    });
    if (!('IntersectionObserver' in window)) {
      fresh.forEach((el) => {
        el.dataset.shown = '1';
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            (en.target as HTMLElement).dataset.shown = '1';
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.25 }
    );
    fresh.forEach((el) => io.observe(el));
    const t = window.setTimeout(
      () => fresh.forEach((el) => { el.dataset.shown = '1'; }),
      4200
    );
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [personalProjects.length, personalLoading]);

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
        <nav className="v2-nav" aria-label="Sections">
          {NAV_ITEMS.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={activeSection === n.id ? 'on' : ''}>
              {n.label}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            className="v2-status"
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
            className={`v2-chipbtn${playerOpen ? ' on' : ''}`}
            onClick={() => setPlayerOpen((v) => !v)}
            title={playerOpen ? 'Close the playlist player' : 'Play my Spotify playlist in a mini player'}
            aria-label="Toggle Spotify mini player"
            aria-pressed={playerOpen}
            style={{ fontSize: 15 }}
          >
            ♪
          </button>
          <button
            className="v2-chipbtn v2-navtoggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ fontSize: 13 }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
          <button
            id="ot-theme"
            ref={themeBtnRef}
            onClick={toggleTheme}
            title="Toggle light / dark"
            className="v2-chipbtn"
            style={{ fontSize: 15 }}
          >
            ☀
          </button>
        </div>
        <div className={`v2-menu${menuOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={activeSection === n.id ? 'on' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </a>
          ))}
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
                I work across EdTech, SaaS, and Fintech, bringing together product design, frontend
                engineering, and emerging technologies to turn complex ideas into simple, functional,
                and engaging digital experiences.
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
                  <span>drag · gaze follows you</span>
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
                  <Character3D />
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
            <div className="v2-proj-grid">
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
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="v2-proj-figure"
                  style={{ position: 'relative', aspectRatio: '16/10', border: '1px solid var(--line)', overflow: 'hidden', background: 'var(--surface)' }}
                >
                  <PixelImage
                    src={p.image}
                    alt={`${p.name} — ${p.type}`}
                    imgClassName="v2-proj-photo"
                    imgStyle={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    label="loading pixels…"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.5) 0%, transparent 26%, transparent 62%, rgba(0,0,0,.55) 100%)', pointerEvents: 'none' }} />
                  <span style={{ position: 'absolute', top: 14, left: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.1em', color: '#fff' }}>[{p.n}]</span>
                  <span style={{ position: 'absolute', top: 14, right: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.85)' }}>{p.type}</span>
                  <span className="v2-proj-view" style={{ position: 'absolute', bottom: 14, left: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff' }}>View case study →</span>
                  <span style={{ position: 'absolute', bottom: 14, right: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.08em', color: 'rgba(255,255,255,.8)' }}>{p.tags}</span>
                </div>
                <div className="v2-proj-caption" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 16, gap: 12 }}>
                  <h3
                    className="v2-proj-title"
                    style={{ margin: 0, fontFamily: CAB, fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 0.95, letterSpacing: '-.03em', color: 'var(--fg)', transition: 'color .3s' }}
                  >
                    {p.name}
                  </h3>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--faint)', whiteSpace: 'nowrap' }}>{p.year} ↗</span>
                </div>
              </article>
            ))}
            </div>

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

          {/* ============ PERSONAL PROJECTS (published from Sanity) ============ */}
          <section id="personal" style={{ paddingBottom: 'clamp(60px,9vw,120px)' }}>
            <div data-reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'clamp(28px,4vw,52px)' }}>
              <div style={labelStyle}>// PERSONAL PROJECTS</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--faint)' }}>
                INDEX {personalLoading ? '··' : String(personalProjects.length).padStart(2, '0')}
              </div>
            </div>

            {(personalLoading || personalProjects.length > 0) && (
              <div className="v2-proj-grid">
                {/* pixelated skeleton while the Sanity fetch is in flight */}
                {personalLoading &&
                  [0, 1, 2].map((i) => (
                    <article key={`personal-skel-${i}`} className="v2-proj" data-index={i} aria-hidden="true">
                      <div
                        className="v2-proj-figure"
                        style={{ position: 'relative', aspectRatio: '16/10', border: '1px solid var(--line)', overflow: 'hidden', background: 'var(--surface)' }}
                      >
                        <div className="v2-pixel-loader">
                          <div className="v2-pixel-checker" />
                          <div className="v2-pixel-loader-center">
                            <span className="v2-pixel-blocks">
                              <i />
                              <i />
                              <i />
                              <i />
                            </span>
                            <span className="v2-pixel-tag">fetching from sanity…</span>
                          </div>
                        </div>
                      </div>
                      <div className="v2-skel-cap">
                        <span className="v2-skel-bar" style={{ width: '54%' }} />
                        <span className="v2-skel-bar" style={{ width: 64, height: 20 }} />
                      </div>
                    </article>
                  ))}

                {personalProjects.map((p, i) => {
                  const href = p.liveUrl || p.repoUrl;
                  const open = () => {
                    if (href) window.open(href, '_blank', 'noopener,noreferrer');
                  };
                  return (
                    <article
                      key={p.slug}
                      className="v2-proj"
                      data-index={i}
                      data-name={p.title}
                      onMouseEnter={href ? rowEnter : undefined}
                      onMouseLeave={href ? rowLeave : undefined}
                      onClick={href ? open : undefined}
                      onKeyDown={
                        href
                          ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                open();
                              }
                            }
                          : undefined
                      }
                      role={href ? 'button' : undefined}
                      tabIndex={href ? 0 : undefined}
                      aria-label={href ? `Open ${p.title}` : undefined}
                      style={{ cursor: href ? 'pointer' : 'default' }}
                    >
                      <div
                        className="v2-proj-figure"
                        style={{ position: 'relative', aspectRatio: '16/10', border: '1px solid var(--line)', overflow: 'hidden', background: 'var(--surface)' }}
                      >
                        {p.image && (
                          <PixelImage
                            src={p.image}
                            pixelSrc={p.pixel}
                            alt={`${p.title}${p.type ? ` — ${p.type}` : ''}`}
                            imgClassName="v2-proj-photo"
                            imgStyle={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            label="developing pixels…"
                          />
                        )}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.5) 0%, transparent 26%, transparent 62%, rgba(0,0,0,.55) 100%)', pointerEvents: 'none' }} />
                        <span style={{ position: 'absolute', top: 14, left: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.1em', color: '#fff' }}>
                          [{String(i + 1).padStart(2, '0')}]
                        </span>
                        {p.type && (
                          <span style={{ position: 'absolute', top: 14, right: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.85)' }}>
                            {p.type}
                          </span>
                        )}
                        {href && (
                          <span className="v2-proj-view" style={{ position: 'absolute', bottom: 14, left: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff' }}>
                            Open ↗
                          </span>
                        )}
                        {p.tags && (
                          <span style={{ position: 'absolute', bottom: 14, right: 16, fontFamily: MONO, fontSize: 11, letterSpacing: '.08em', color: 'rgba(255,255,255,.8)' }}>
                            {p.tags}
                          </span>
                        )}
                      </div>
                      <div className="v2-proj-caption" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 16, gap: 12 }}>
                        <h3
                          className="v2-proj-title"
                          style={{ margin: 0, fontFamily: CAB, fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 0.95, letterSpacing: '-.03em', color: 'var(--fg)', transition: 'color .3s' }}
                        >
                          {p.title}
                        </h3>
                        <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--faint)', whiteSpace: 'nowrap' }}>
                          {p.year ?? '—'}
                          {href ? ' ↗' : ''}
                        </span>
                      </div>
                      {p.summary && (
                        <p
                          style={{
                            margin: '8px 0 0',
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: 'var(--muted)',
                            maxWidth: '58ch',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {p.summary}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            )}

            {/* empty state — no published personal projects yet */}
            {!personalLoading && personalProjects.length === 0 && (
              <div data-reveal className="v2-soon">
                <div className="v2-soon-head">
                  <span className="v2-soon-badge">
                    <span className="v2-soon-dot" />
                    Workshop
                  </span>
                  <span className="v2-soon-meta">Side projects · experiments · open source</span>
                </div>
                <h2 className="v2-soon-title">Personal projects</h2>
                <p className="v2-soon-desc">
                  Built in my own time — tools, experiments and open source that don't fit inside client
                  work.
                </p>
                <div className="v2-soon-slots">
                  {['Experiments', 'Tools & scripts', 'Open source'].map((t, i) => (
                    <div key={t} className="v2-soon-slot">
                      <span>[{String(i + 1).padStart(2, '0')}]</span>
                      <span>{t}</span>
                      <span>Soon</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ============ CAREER ============ */}
          <section id="career" style={{ paddingBottom: 'clamp(60px,9vw,120px)' }}>
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

          {/* ============ TOOLS (logo on hover) ============ */}
          <section id="tools" style={{ paddingBottom: 'clamp(60px,9vw,120px)' }}>
            <div data-reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'clamp(28px,4vw,52px)' }}>
              <div style={labelStyle}>// STACK &amp; TOOLS</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--faint)' }}>INDEX 08</div>
            </div>
            <div className="v2-tools">
              {tools.map((t, i) => (
                <div key={t.name} data-reveal className="v2-tool">
                  <span className="v2-tool-idx">[{String(i + 1).padStart(2, '0')}]</span>
                  {t.logo ? (
                    <span
                      className="v2-tool-mark"
                      aria-hidden="true"
                      style={{
                        maskImage: `url(/img/tools/${t.logo}.svg)`,
                        WebkitMaskImage: `url(/img/tools/${t.logo}.svg)`,
                      }}
                    />
                  ) : (
                    <span className="v2-tool-mono" aria-hidden="true">
                      {t.name.slice(0, 2)}
                    </span>
                  )}
                  <span className="v2-tool-name">{t.name}</span>
                  <span className="v2-tool-role">{t.role}</span>
                </div>
              ))}
            </div>
            <div data-reveal style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginTop: 16 }}>
              hover a tile to reveal the logo
            </div>
          </section>

          {/* ============ ARCADE (teaser → the /play page) ============ */}
          <section id="play" style={{ paddingBottom: 'clamp(60px,9vw,120px)' }}>
            <div data-reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'clamp(28px,4vw,52px)' }}>
              <div style={labelStyle}>// MINI GAMES</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--faint)' }}>INDEX 09</div>
            </div>
            <a
              data-reveal
              href="/play"
              className="v2-arcade"
              aria-label="Enter the arcade — Snake, Tic-Tac-Toe and Memory live on their own full-screen page"
            >
              <span className="v2-arcade-grid" aria-hidden="true" />
              <div className="v2-arcade-body">
                <span className="v2-arcade-badge">
                  <span className="v2-arcade-dot" />
                  Arcade · own page now
                </span>
                <h2>
                  Take five.
                  <br />
                  Play something.
                </h2>
                <p>
                  Snake, Tic-Tac-Toe and Memory moved out to their own full-screen page — no installs,
                  no accounts, they just run in your browser while the coffee cools.
                </p>
                <div className="v2-arcade-chips">
                  {[['01', 'Snake'], ['02', 'Tic-Tac-Toe'], ['03', 'Memory']].map(([i, n]) => (
                    <span key={n}>[{i}] {n}</span>
                  ))}
                </div>
              </div>
              <span className="v2-arcade-cta">
                Enter arcade <b>→</b>
              </span>
            </a>
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
            id="contact"
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

        {/* ============ SPOTIFY MINI PLAYER ============ */}
        {playerOpen && (
          <div className="v2-player" role="region" aria-label="Spotify playlist player">
            <div className="v2-player-head">
              <span className="v2-player-live">
                <i />
                now playing · playlist
              </span>
              <button className="v2-player-close" onClick={() => setPlayerOpen(false)} aria-label="Close player">
                ✕
              </button>
            </div>
            <iframe
              src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="172"
              frameBorder="0"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              title="Spotify playlist"
            />
          </div>
        )}

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
