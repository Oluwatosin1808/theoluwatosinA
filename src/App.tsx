import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import CaseStudyModal from './components/CaseStudyModal';

const atlasMockupImage = new URL('../img/Mockup 26.png', import.meta.url).href;
const dreamAiMockupImage = new URL('../img/Mockup Ribbon 11.png', import.meta.url).href;
const gloUpMockupImage = new URL('../img/Notioneverything headers.png', import.meta.url).href;
const nesoMockupImage = new URL('../img/Notioneverything headers (1).png', import.meta.url).href;
const portraitImage = new URL('../img/me.png', import.meta.url).href;

const codelessAgencyCaseStudyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Case Study — Codeless Agency Website</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0e0e0e;
    --ink-2: #3a3a3a;
    --ink-3: #7a7a7a;
    --surface: #fafaf8;
    --surface-2: #f0ede6;
    --accent: #1a1a1a;
    --gold: #c8a96e;
    --border: rgba(0,0,0,0.1);
    --serif: 'DM Serif Display', serif;
    --sans: 'DM Sans', sans-serif;
  }

  html { font-size: 16px; }

  body {
    font-family: var(--sans);
    background: var(--surface);
    color: var(--ink);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  /* ── COVER ─────────────────────────────────────── */
  .cover {
    background: #0e0e0e;
    color: #fafaf8;
    padding: 80px 60px 72px;
    position: relative;
    overflow: hidden;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: -120px; right: -120px;
    width: 480px; height: 480px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,169,110,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .cover-label {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cover-label::after {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background: var(--gold);
    opacity: 0.5;
  }
  .cover h1 {
    font-family: var(--serif);
    font-size: clamp(38px, 6vw, 68px);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.02em;
    max-width: 780px;
    margin-bottom: 28px;
  }
  .cover h1 em {
    font-style: italic;
    color: var(--gold);
  }
  .cover-sub {
    font-size: 16px;
    color: rgba(250,250,248,0.6);
    max-width: 520px;
    line-height: 1.65;
    margin-bottom: 56px;
  }
  .cover-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .cover-meta-item { }
  .cover-meta-item .label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(250,250,248,0.4);
    margin-bottom: 6px;
  }
  .cover-meta-item .value {
    font-size: 14px;
    font-weight: 500;
    color: rgba(250,250,248,0.85);
  }

  /* ── LAYOUT ─────────────────────────────────────── */
  .container {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 48px;
  }

  /* ── SECTION ─────────────────────────────────────── */
  section {
    padding: 72px 0;
    border-bottom: 1px solid var(--border);
  }
  section:last-child { border-bottom: none; }

  .section-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
  }

  h2 {
    font-family: var(--serif);
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-bottom: 24px;
  }
  h2 em { font-style: italic; color: #555; }

  h3 {
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: var(--ink-2);
    line-height: 1.8;
    margin-bottom: 20px;
    max-width: 680px;
  }
  p:last-child { margin-bottom: 0; }

  /* ── STAT ROW ─────────────────────────────────────── */
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin: 48px 0;
  }
  .stat {
    background: var(--surface);
    padding: 28px 24px;
    text-align: center;
  }
  .stat .num {
    font-family: var(--serif);
    font-size: 42px;
    line-height: 1;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .stat .desc {
    font-size: 12px;
    color: var(--ink-3);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* ── CHALLENGE CARDS ─────────────────────────────── */
  .challenge-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 36px;
  }
  .challenge-card {
    background: var(--surface-2);
    border-radius: 10px;
    padding: 24px 22px;
    border-left: 3px solid var(--gold);
  }
  .challenge-card h3 { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
  .challenge-card p { font-size: 14px; margin: 0; color: var(--ink-2); max-width: 100%; line-height: 1.7; }

  /* ── PROCESS ─────────────────────────────────────── */
  .process-steps {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .process-step {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 24px;
    padding: 28px 0;
    border-bottom: 1px solid var(--border);
    align-items: start;
  }
  .process-step:last-child { border-bottom: none; }
  .step-num {
    font-family: var(--serif);
    font-size: 32px;
    color: rgba(0,0,0,0.12);
    line-height: 1;
    padding-top: 4px;
  }
  .step-body h3 { margin-bottom: 8px; }
  .step-body p { font-size: 15px; margin: 0; max-width: 100%; }

  /* ── FEATURES ────────────────────────────────────── */
  .features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    margin-top: 36px;
  }
  .feature {
    padding: 0;
  }
  .feature-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--gold);
    margin-bottom: 14px;
  }
  .feature h3 { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
  .feature p { font-size: 14px; margin: 0; color: var(--ink-2); max-width: 100%; line-height: 1.7; }

  /* ── TECH STACK ───────────────────────────────────── */
  .tech-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }
  .tech-pill {
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 500;
    padding: 7px 16px;
    border: 1px solid var(--border);
    border-radius: 100px;
    color: var(--ink-2);
    background: #fff;
  }

  /* ── PULL QUOTE ──────────────────────────────────── */
  .pull-quote {
    background: #0e0e0e;
    color: #fafaf8;
    border-radius: 14px;
    padding: 48px 52px;
    margin: 56px 0;
    position: relative;
    overflow: hidden;
  }
  .pull-quote::before {
    content: '\\201C';
    font-family: var(--serif);
    font-size: 180px;
    line-height: 0.8;
    color: rgba(200,169,110,0.15);
    position: absolute;
    top: 20px; left: 32px;
    pointer-events: none;
  }
  .pull-quote blockquote {
    font-family: var(--serif);
    font-size: clamp(20px, 3vw, 27px);
    font-style: italic;
    line-height: 1.45;
    color: rgba(250,250,248,0.92);
    max-width: 640px;
    position: relative;
    z-index: 1;
    margin-bottom: 24px;
  }
  .pull-quote cite {
    font-family: var(--sans);
    font-size: 13px;
    color: var(--gold);
    font-style: normal;
    letter-spacing: 0.04em;
  }

  /* ── RESULTS ─────────────────────────────────────── */
  .results-list {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .result-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  .result-icon {
    width: 22px; height: 22px;
    flex-shrink: 0;
    margin-top: 2px;
    background: rgba(200,169,110,0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .result-icon svg { width: 11px; height: 11px; }
  .result-item p { font-size: 15px; margin: 0; max-width: 100%; }

  /* ── FOOTER ──────────────────────────────────────── */
  .doc-footer {
    background: #0e0e0e;
    color: rgba(250,250,248,0.4);
    text-align: center;
    padding: 40px 48px;
    font-size: 12px;
    letter-spacing: 0.04em;
  }
  .doc-footer a { color: var(--gold); text-decoration: none; }

  @media (max-width: 640px) {
    .cover { padding: 52px 28px 48px; }
    .container { padding: 0 24px; }
    .challenge-grid, .features-grid { grid-template-columns: 1fr; }
    .stats { grid-template-columns: 1fr; }
    .pull-quote { padding: 36px 28px; }
    .cover-meta { gap: 24px; }
  }
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div class="container" style="max-width:860px;">
    <div class="cover-label">Case Study</div>
    <h1>Designing the <em>face</em> of a no-code agency that ships.</h1>
    <p class="cover-sub">How a complete website redesign and rebuild turned Codeless into a credibility engine for a product design and no-code development studio.</p>
    <div class="cover-meta">
      <div class="cover-meta-item">
        <div class="label">Client</div>
        <div class="value">Codeless (codelessify.org)</div>
      </div>
      <div class="cover-meta-item">
        <div class="label">Deliverable</div>
        <div class="value">Agency Website</div>
      </div>
      <div class="cover-meta-item">
        <div class="label">Scope</div>
        <div class="value">Design + Development</div>
      </div>
      <div class="cover-meta-item">
        <div class="label">Stack</div>
        <div class="value">Next.js · Tailwind CSS</div>
      </div>
    </div>
  </div>
</div>

<!-- OVERVIEW -->
<div class="container">
  <section>
    <div class="section-eyebrow">Overview</div>
    <h2>A studio that needed a website as sharp as its work.</h2>
    <p>Codeless is a product design and no-code development agency that helps startups and growing teams build, launch, and scale digital products — without writing a single line of traditional code. With 50+ launches under their belt and a 4.9 client rating, the team already had the track record. What they needed was a website that could communicate that credibility at a glance.</p>
    <p>The brief was clear: design and build a marketing site that positions Codeless as a senior, focused studio — not another freelancer marketplace. Every pixel had to earn its place.</p>

    <div class="stats">
      <div class="stat">
        <div class="num">50+</div>
        <div class="desc">Projects delivered</div>
      </div>
      <div class="stat">
        <div class="num">4.9★</div>
        <div class="desc">Average client rating</div>
      </div>
      <div class="stat">
        <div class="num">4</div>
        <div class="desc">Core service verticals</div>
      </div>
    </div>
  </section>

  <!-- CHALLENGE -->
  <section>
    <div class="section-eyebrow">The Challenge</div>
    <h2>Competing with trust, not just <em>traffic.</em></h2>
    <p>No-code agencies occupy a peculiar position in the market. Potential clients are often skeptical — they wonder whether "no-code" means cutting corners. The old site didn't address this fear head-on. It underplayed the quality of the work, the seniority of the team, and the depth of the process.</p>
    <p>The challenges were structural as well as visual:</p>

    <div class="challenge-grid">
      <div class="challenge-card">
        <h3>Weak first impression</h3>
        <p>The previous site lacked the visual confidence needed to convert high-value project inquiries from funded startups and established teams.</p>
      </div>
      <div class="challenge-card">
        <h3>Service clarity</h3>
        <p>Four distinct service areas — design, development, brand identity, and strategy — were described inconsistently and in isolation from each other.</p>
      </div>
      <div class="challenge-card">
        <h3>No social proof architecture</h3>
        <p>Strong testimonials from clients like Podium X, TeamBooster, and SpaceTime existed but weren't surfaced in a way that built momentum.</p>
      </div>
      <div class="challenge-card">
        <h3>Low conversion pathway</h3>
        <p>Visitors had no clear next step. The call-to-action strategy was ad hoc rather than deliberate, leaving intent without a clear outlet.</p>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section>
    <div class="section-eyebrow">Design Process</div>
    <h2>From brief to <em>build</em> — four deliberate phases.</h2>
    <p>The project followed a structured process that prioritised strategy before aesthetics, and content architecture before visual styling.</p>

    <div class="process-steps">
      <div class="process-step">
        <div class="step-num">01</div>
        <div class="step-body">
          <h3>Discovery &amp; Positioning</h3>
          <p>Audited the competitive landscape of no-code and boutique design agencies to understand how Codeless should position itself. Defined the core audience — early-stage startup founders and product leads — and mapped their decision-making triggers. The key insight: buyers of agency services are buying confidence. The site had to radiate it.</p>
        </div>
      </div>
      <div class="process-step">
        <div class="step-num">02</div>
        <div class="step-body">
          <h3>Content Architecture</h3>
          <p>Structured the single-page layout around a deliberate narrative arc: attention → credibility → proof → action. Each section of the homepage was assigned a specific persuasive job. Services were reframed from a list to a suite — "a complete set of services from a single senior team" — to eliminate the mental overhead of vendor coordination for the client.</p>
        </div>
      </div>
      <div class="process-step">
        <div class="step-num">03</div>
        <div class="step-body">
          <h3>Visual Design</h3>
          <p>Developed a bold, minimal visual system in dark and light tones that communicates sophistication without sacrificing warmth. Typography was treated as the primary design element — a large editorial headline treatment anchors the hero section with the agency's value proposition front and centre. Custom service artwork was commissioned to give each vertical a distinct visual identity.</p>
        </div>
      </div>
      <div class="process-step">
        <div class="step-num">04</div>
        <div class="step-body">
          <h3>Development &amp; Delivery</h3>
          <p>Built the site in Next.js for performance, SEO, and a scalable content foundation. Implemented a blog and learning hub as separate routes to support future content marketing. The project page structure was architected to accommodate ongoing case study additions without design rework.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PULL QUOTE -->
  <div class="pull-quote">
    <blockquote>"The goal was never to build a pretty website. It was to build a site that works as hard as the team does — turning cold visitors into warm conversations."</blockquote>
    <cite>Aaron Israel · CEO &amp; Founder, Codeless</cite>
  </div>

  <!-- KEY FEATURES -->
  <section>
    <div class="section-eyebrow">What Was Built</div>
    <h2>Six sections, one <em>coherent story.</em></h2>
    <p>Every section of the site was designed as a distinct conversion layer, not a decorative afterthought.</p>

    <div class="features-grid">
      <div class="feature">
        <div class="feature-dot"></div>
        <h3>Hero with singular focus</h3>
        <p>A clean, full-width hero anchored by a single value proposition: "Build Smart. Launch Fast. Grow Without Code." Two CTAs — Start a Project and See Our Work — funnel different intent types without competing.</p>
      </div>
      <div class="feature">
        <div class="feature-dot"></div>
        <h3>Services as a suite</h3>
        <p>Four service verticals (design, development, brand, and strategy) presented with custom artwork and concise copy, emphasising that a single team handles all of them. This reduces perceived coordination risk for clients.</p>
      </div>
      <div class="feature">
        <div class="feature-dot"></div>
        <h3>Project showcase</h3>
        <p>Selected work featuring Dream AI, Dryrunz, SongPact, and TeamBooster — each with a clear category label. The format signals range and specificity without requiring visitors to click through to understand the agency's capability.</p>
      </div>
      <div class="feature">
        <div class="feature-dot"></div>
        <h3>Team section with faces</h3>
        <p>A "people behind the pixels" section humanises the studio and counters the anonymity problem common to small agencies. Showing faces and titles builds implicit accountability.</p>
      </div>
      <div class="feature">
        <div class="feature-dot"></div>
        <h3>Scrolling testimonials</h3>
        <p>Client testimonials from verified CEOs and founders are displayed in an auto-scrolling ticker that keeps social proof in constant view without consuming vertical real estate. Quotes from Podium X, TeamBooster, and SpaceTime provide category-specific credibility.</p>
      </div>
      <div class="feature">
        <div class="feature-dot"></div>
        <h3>Blog &amp; Learning Hub</h3>
        <p>Standalone content routes built into the Next.js architecture, enabling the team to publish product insights, no-code tutorials, and launch playbooks — supporting SEO and long-term audience building beyond the homepage.</p>
      </div>
    </div>
  </section>

  <!-- TECH STACK -->
  <section>
    <div class="section-eyebrow">Technical Decisions</div>
    <h2>Built to be fast, scalable, <em>and maintainable.</em></h2>
    <p>The technology choices were made to serve the business — not to demonstrate complexity. The priority was a site that loads instantly, ranks well, and can be extended without a developer on standby.</p>
    <p>Next.js provided server-side rendering for fast initial loads and strong SEO defaults. The image pipeline (next/image) handles optimisation automatically, serving appropriately sized assets for every viewport. Routing is cleanly separated between marketing pages, blog, and the learning hub — allowing independent content updates without touching the core design.</p>
    <div class="tech-pills">
      <span class="tech-pill">Next.js</span>
      <span class="tech-pill">React</span>
      <span class="tech-pill">Tailwind CSS</span>
      <span class="tech-pill">Vercel deployment</span>
      <span class="tech-pill">next/image optimisation</span>
      <span class="tech-pill">File-based routing</span>
      <span class="tech-pill">Custom blog route</span>
      <span class="tech-pill">Learning hub route</span>
    </div>
  </section>

  <!-- RESULTS -->
  <section>
    <div class="section-eyebrow">Outcomes</div>
    <h2>A website that converts <em>credibility into conversations.</em></h2>
    <p>The completed site positions Codeless as a premium, trustworthy studio for startups and growth-stage teams. The strategic combination of strong social proof, clear service architecture, and direct conversion pathways means every visitor — regardless of entry point — is guided toward a meaningful next step.</p>

    <div class="results-list">
      <div class="result-item">
        <div class="result-icon">
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6.5L5 9.5L10 3" stroke="#c8a96e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p><strong>Positioning clarity</strong> — Services are now understood as an integrated suite, removing the confusion that arose from listing them in isolation. Clients immediately understand what Codeless offers and who it's for.</p>
      </div>
      <div class="result-item">
        <div class="result-icon">
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6.5L5 9.5L10 3" stroke="#c8a96e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p><strong>Persistent social proof</strong> — Testimonials from five named founders and CEOs are visible throughout the site without disrupting the primary conversion flow. This builds trust passively as visitors scroll.</p>
      </div>
      <div class="result-item">
        <div class="result-icon">
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6.5L5 9.5L10 3" stroke="#c8a96e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p><strong>Scalable content infrastructure</strong> — The blog and learning hub are live and independently updatable, giving the team a platform to demonstrate expertise and attract organic search traffic over time.</p>
      </div>
      <div class="result-item">
        <div class="result-icon">
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6.5L5 9.5L10 3" stroke="#c8a96e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p><strong>Optimised performance</strong> — Next.js server-side rendering and next/image processing deliver fast page loads and strong Core Web Vitals scores, supporting both user experience and search engine visibility.</p>
      </div>
      <div class="result-item">
        <div class="result-icon">
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6.5L5 9.5L10 3" stroke="#c8a96e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p><strong>A dual-CTA conversion system</strong> — "Book a call" and "Join the newsletter" serve high-intent and low-intent visitors respectively, capturing both immediate project leads and long-term audience members in a single session.</p>
      </div>
    </div>
  </section>
</div>

<!-- FOOTER -->
<div class="doc-footer">
  <p>Case study prepared for <a href="https://agency.codelessify.org/" target="_blank">agency.codelessify.org</a> &nbsp;·&nbsp; Codeless — Build Smart. Launch Fast.</p>
</div>

</body>
</html>`;

const nesoCaseStudyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Neso — Case Study</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    :root {
      --bg: #0b0d16;
      --surface: rgba(255,255,255,0.06);
      --border: rgba(255,255,255,0.12);
      --text: rgba(255,255,255,0.92);
      --muted: rgba(255,255,255,0.74);
    }

    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      background:
        radial-gradient(1000px 600px at 20% 10%, rgba(34,197,94,0.14), transparent 55%),
        radial-gradient(900px 600px at 80% 15%, rgba(59,130,246,0.10), transparent 55%),
        var(--bg);
      color: var(--text);
      line-height: 1.75;
    }

    .wrap {
      max-width: 920px;
      margin: 0 auto;
      padding: 44px 26px 56px;
    }

    h1 {
      margin: 0 0 10px;
      font-size: clamp(30px, 4.2vw, 46px);
      letter-spacing: -0.02em;
    }

    h2 {
      margin: 30px 0 10px;
      font-size: 20px;
      letter-spacing: -0.01em;
    }

    p {
      margin: 0 0 14px;
      color: var(--muted);
    }

    ul { margin: 0 0 14px 18px; color: var(--muted); }
    li { margin: 0 0 8px; }

    hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 18px 0 22px;
    }

    .card {
      margin-top: 12px;
      padding: 16px 16px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--surface);
    }

    strong { color: var(--text); }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Neso — Case Study</h1>
    <hr />

    <h2>Project Overview</h2>
    <p><strong>NESO</strong> is a workout/fitness tracker that allows users to set up workouts, track their progress, and monitor their nutrition and diet during the period of their specific program. It includes more than 50 foods and over 100 exercises that will help you stay active no matter where you are. And with automatic food tracking and nutrition facts for each one of your meals, and easy-to-use tools like eating plans and meal plans, you can lose weight safely and effectively with this app while also earning money in realtime too.</p>

    <h2>Objectives/Goals</h2>
    <div class="card">
      <ul>
        <li>To create an experience that encourages users to perform activities in order to improve their health and fitness.</li>
        <li>Discovering through research the problems people face while using workout/fitness applications.</li>
        <li>Creating a clean and modern user interface.</li>
        <li>Creating an easy to use application for optimum user experience.</li>
      </ul>
    </div>

    <h2>Problems</h2>
    <p>User Interviews was conducted to gain insights about how users feel about using workout/fitness apps.</p>
    <p>The traditional way of working out is acceptable, but with the growing concerns regarding the health and well-being of the body because of its high stress levels and lack of motivation. In short, with all the distractions (work pressure, family pressure etc.), it becomes hard to focus on what should be done in order to get fit. With gym memberships being expensive and gyms not really available in local areas, people tend to find a new way to workout.</p>

    <h2>Who are the users?</h2>
    <p>Users are people between the ages of 17-35 all around the world, or anyone who is looking for a way to workout comfortably without visiting the gym.</p>

    <h2>Solution</h2>
    <p>After conducting considerable study, we decided to create a fitness application that would provide users with a diverse range of workouts and routines, such as bodybuilding, self-defense, and crossfit. We also integrated a nutrition component so that users could track, manage, and regulate their food consumption while working out.</p>
  </div>
</body>
</html>`;

const gloUpCaseStudyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Glo Up — Case Study</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    :root {
      --bg: #0b0d16;
      --surface: rgba(255,255,255,0.06);
      --border: rgba(255,255,255,0.12);
      --text: rgba(255,255,255,0.92);
      --muted: rgba(255,255,255,0.74);
    }

    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      background:
        radial-gradient(1000px 600px at 20% 10%, rgba(236,72,153,0.18), transparent 55%),
        radial-gradient(900px 600px at 80% 15%, rgba(59,130,246,0.12), transparent 55%),
        var(--bg);
      color: var(--text);
      line-height: 1.75;
    }

    .wrap {
      max-width: 920px;
      margin: 0 auto;
      padding: 44px 26px 56px;
    }

    h1 {
      margin: 0 0 10px;
      font-size: clamp(30px, 4.2vw, 46px);
      letter-spacing: -0.02em;
    }

    h2 {
      margin: 30px 0 10px;
      font-size: 20px;
      letter-spacing: -0.01em;
    }

    p {
      margin: 0 0 14px;
      color: var(--muted);
    }

    ul { margin: 0 0 14px 18px; color: var(--muted); }

    li { margin: 0 0 8px; }

    hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 18px 0 22px;
    }

    .card {
      margin-top: 12px;
      padding: 16px 16px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--surface);
    }

    strong { color: var(--text); }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>The Glo Up — Case Study</h1>
    <hr />

    <h2>Project Overview</h2>
    <p>A dating app, <strong>[The Glo Up]</strong>, is a mobile application that helps users find potential dates. The goal is to help people find and connect based on their sexuality and interests. The app is currently in development and will be available for both iOS and Android devices.</p>

    <h2>Objectives/Goals</h2>
    <div class="card">
      <ul>
        <li>Create options for users that want company without romantic intentions.</li>
        <li>Gaining insight on the problems people face while using dating applications.</li>
        <li>Solve the problem of sexuality mismatch among users of dating applications.</li>
        <li>Creating an easy to use application for optimum user experience.</li>
      </ul>
    </div>

    <h2>Problems Statement</h2>
    <p>Mainstream dating apps mostly caters to individuals finding heterosexual relationships and neglect other forms of sexuality i.e. , the <strong>LGBT.</strong> As a result, these dating applications do not cater to users seeking relationships outside of heterosexuality. They also do not cater to users that would prefer relationships that are not romantic e.g. coffee break pals, hiking partners etc.</p>
    <p>User surveys was conducted to gain insights about how users feel about using dating applications that not only served the heterosexuals, but also catered to the needs of people from the <strong>LGBT</strong> Community and allowed for options other than romantic relationships.</p>

    <h2>Who are the users?</h2>
    <p>The mobile application is aimed at young and full grown adults looking to search for other users/people looking to find the same thing as themselves (i.e., love, casuals, someone to hang out with or just friendships).</p>

    <h2>Solution</h2>
    <p>After conducting considerable study, we decided to create an easy-to-use dating application that would include users from the <strong>LGBT</strong> community and would help other users alike find potential partners based on their preferred sexuality, interests and personalities so that they can have a great time with someone they like or that shares similar interests.</p>
  </div>
</body>
</html>`;

const dreamAiCaseStudyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DreamAI — Case Study</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    :root {
      --bg: #0b0d16;
      --surface: rgba(255,255,255,0.06);
      --border: rgba(255,255,255,0.12);
      --text: rgba(255,255,255,0.92);
      --muted: rgba(255,255,255,0.74);
      --accent: #8b5cf6;
    }

    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      background:
        radial-gradient(1200px 700px at 20% 10%, rgba(139,92,246,0.22), transparent 60%),
        radial-gradient(900px 600px at 80% 15%, rgba(59,130,246,0.14), transparent 55%),
        var(--bg);
      color: var(--text);
      line-height: 1.75;
    }

    .wrap {
      max-width: 920px;
      margin: 0 auto;
      padding: 44px 26px 56px;
    }

    h1 {
      margin: 0 0 6px;
      font-size: clamp(30px, 4.2vw, 46px);
      letter-spacing: -0.02em;
    }

    h2 {
      margin: 34px 0 10px;
      font-size: 20px;
      letter-spacing: -0.01em;
    }

    h3 {
      margin: 24px 0 8px;
      font-size: 16px;
    }

    p {
      margin: 0 0 14px;
      color: var(--muted);
    }

    strong { color: var(--text); }

    em { color: rgba(255,255,255,0.86); }

    hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 18px 0 22px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.82);
      font-size: 13px;
      margin-bottom: 14px;
    }

    .card {
      margin-top: 12px;
      padding: 16px 16px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--surface);
    }

    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: rgba(255,255,255,0.66);
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>DreamAI — Case Study</h1>
    <h2 style="margin: 6px 0 0; font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.86);">AI-Powered Dream Journaling &amp; Interpretation</h2>
    <p style="margin: 10px 0 0; color: rgba(255,255,255,0.75);"><em>Designed &amp; built on Bubble</em></p>
    <hr />

    <h2>Overview</h2>
    <p>DreamAI is a no-code web application that helps everyday users capture, understand, and find meaning in their dreams. By combining a frictionless journaling experience with AI-driven interpretation, it transforms the fleeting, hard-to-articulate nature of dreams into something reflective and personal — delivered in seconds.</p>
    <p>The product was designed for general consumers and wellness-minded individuals who are curious about their inner world but don't have access to a therapist, analyst, or the patience for dense dream dictionaries. The core promise: write down what you remember, and DreamAI does the rest.</p>

    <h2>The Problem</h2>
    <p>Dreams are notoriously difficult to capture. You wake up with a vivid impression that fades within minutes, and even when you try to write it down, the meaning feels just out of reach. Existing solutions — physical journals, generic apps, or symbolic dream dictionaries — all share the same flaw: they're passive. They store your entry, but they don't engage with it.</p>
    <p>For wellness-oriented users, this is a missed opportunity. Dreams are increasingly recognised as a window into emotional processing, stress patterns, and subconscious thinking. The challenge was to create an experience that felt both effortless to use in a groggy morning state and substantive enough to provide genuine psychological value.</p>

    <h2>Design Goals</h2>
    <div class="card">
      <p><strong>1. Zero friction at the moment of capture.</strong> The journaling interface had to be the first thing a user encountered — no onboarding walls, no feature tours. If a user had to think for more than a second about where to start, the dream would be gone.</p>
    </div>
    <div class="card">
      <p><strong>2. Warmth over clinical sterility.</strong> Many wellness apps err toward cold, medical aesthetics. DreamAI needed to feel intimate and slightly otherworldly — reflective of the dream state itself. The visual language had to signal safety and curiosity, not productivity.</p>
    </div>
    <div class="card">
      <p><strong>3. Interpretation as conversation, not classification.</strong> AI output shouldn't feel like a printout. The goal was for responses to read like something a thoughtful, empathetic friend might say — inviting reflection rather than delivering verdicts.</p>
    </div>

    <h2>UX &amp; Design Decisions</h2>

    <h3>Journaling First, Account Later</h3>
    <p>The entry point of DreamAI is a large, open text area — not a sign-up screen. Users can begin writing immediately. This decision was deliberate: asking someone to create an account before they've experienced any value is a significant source of early drop-off, especially for a wellness product where trust hasn't yet been established. Authentication was pushed to a natural save/persist moment, reducing the cognitive cost of getting started.</p>

    <h3>Visual Language: Dark, Soft, and Spatial</h3>
    <p>The colour palette draws from deep indigos, muted purples, and near-blacks — evoking the liminal quality of sleep without feeling oppressive. Soft glows and subtle gradients reinforce the sense that the interface exists somewhere between the conscious and unconscious. Typography was chosen for readability under low-light conditions, recognising that many users would be writing shortly after waking, often in a dim room.</p>
    <p>This aesthetic choice also serves a functional purpose: it signals to users that DreamAI is a different kind of app — one that takes the inner life seriously, and isn't competing for attention in the same visual register as productivity tools or social media.</p>

    <h3>The Interpretation Experience</h3>
    <p>After a dream entry is submitted, the AI interpretation is revealed progressively rather than dumped all at once. This pacing was a conscious UX choice: it mimics the feeling of someone reading carefully and responding thoughtfully, rather than an instant machine-generated response. It slows the user down and encourages them to read — not skim.</p>
    <p>The interpretation itself avoids diagnostic language. Rather than labelling symbols or issuing psychological verdicts, responses frame insights as possibilities and questions, nudging users toward self-reflection. This approach is both more honest (AI interpretation is probabilistic, not prescient) and more useful for a wellness context where autonomy over one's own narrative matters.</p>

    <h3>Returning User Experience</h3>
    <p>For users who return regularly, the journal history view was designed to surface patterns over time rather than simply listing past entries. Thematic echoes between dreams — recurring figures, locations, or emotional tones — are gently highlighted, turning the archive into something that rewards ongoing use. This was central to the retention strategy: a user who notices meaningful patterns across their dreams has a reason to keep coming back.</p>

    <h3>Mobile-First Thinking</h3>
    <p>Given that the most natural moment to log a dream is immediately after waking — often while still in bed, phone in hand — the entire layout was designed mobile-first. Touch targets are generous, the text input expands naturally, and no critical action requires a precise tap. Even though the app is browser-based, it was tested extensively at mobile viewport sizes to ensure it felt native, not adapted.</p>

    <h2>Building on Bubble</h2>
    <p>Bubble was chosen as the platform to allow for rapid iteration without sacrificing a polished front-end. The visual design was implemented using Bubble's responsive engine with custom CSS applied where the native components fell short of the intended aesthetic. AI interpretation is handled via API connector, with prompt engineering done to ensure tonal consistency across diverse dream inputs.</p>
    <p>The no-code approach meant that design decisions could be tested and revised in real time — a significant advantage when the product is this feeling-dependent. Small changes to spacing, animation timing, or copy could be deployed and assessed immediately, keeping the design process tight and intuitive.</p>

    <h2>Reflections</h2>
    <p>DreamAI is a product that lives or dies on trust. Users are sharing something deeply personal — the unfiltered content of their sleeping mind — and the design has to honour that. Every decision, from the colour of the background to the cadence of the AI response, was made in service of one question: <em>does this feel safe, and does this feel worth it?</em></p>
    <p>The answer, in early use, appears to be yes. The design succeeds most where it gets out of the way — where the experience feels less like using a tool and more like opening a private notebook that happens to write back.</p>

    <p class="footer"><em>Built with Bubble · Designed for curious minds and restless sleepers</em></p>
  </div>
</body>
</html>`;

type ToolItem = {
  name: string;
  icon: string;
  group: string;
};

type ProjectItem = {
  title: string;
  category: string;
  summary: string;
  metrics: string;
  outcome: string;
  image?: string;
  caseStudyHtml?: string;
  liveUrl?: string;
};

type TimelineItem = {
  year: string;
  role: string;
  company: string;
  summary: string;
};

const roles = ["Product Designer", "No-Code Developer", "Frontend Developer"];

const tools: ToolItem[] = [
  { name: "Figma", icon: "figma", group: "Design" },
  { name: "FigJam", icon: "figjam", group: "Design" },
  { name: "Bubble", icon: "bubble", group: "No-Code / Builders" },
  { name: "Webflow", icon: "webflow", group: "No-Code / Builders" },
  { name: "Framer", icon: "framer", group: "No-Code / Builders" },
  { name: "FlutterFlow", icon: "flutter", group: "No-Code / Builders" },
  { name: "Next.js", icon: "nextdotjs", group: "Frontend" },
  { name: "HTML", icon: "html5", group: "Frontend" },
  { name: "CSS", icon: "css3", group: "Frontend" },
  { name: "JavaScript", icon: "javascript", group: "Frontend" },
  { name: "Airtable", icon: "airtable", group: "Automation & Data" },
  { name: "Make", icon: "make", group: "Automation & Data" },
  { name: "REST APIs", icon: "postman", group: "Automation & Data" }
];

const projects: ProjectItem[] = [
  {
    title: "Codeless Solutions",
    category: "Product Design + Development",
    summary: "A home for a no-code agency that needed to look anything but ordinary",
    metrics: "38% increase in activation",
    outcome: "Reduced drop-offs with data-driven flows and personalized nudges.",
    image: atlasMockupImage,
    caseStudyHtml: codelessAgencyCaseStudyHtml
  },
  {
    title: "DreamAI",
    category: "No-Code Build & Design",
    summary: "Designed and shipped AI-Powered Dream Journaling & Interpretation web App",
    metrics: "Built on Bubble",
    outcome: "AI-powered interpretation delivered in seconds with a journaling-first UX.",
    image: dreamAiMockupImage,
    caseStudyHtml: dreamAiCaseStudyHtml,
    liveUrl: "https://dreamai-52691.bubbleapps.io/version-test"
  },
  {
    title: "The Glo Up App",
    category: "Product Design",
    summary: "A dating app that helps users find potential dates",
    metrics: "Mobile app in development",
    outcome: "Connect based on sexuality and interests with options beyond romance.",
    image: gloUpMockupImage,
    caseStudyHtml: gloUpCaseStudyHtml,
    liveUrl: "https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FOdXozCiTmU0EFVpB6esD3Y%2FThe-Glo-Up-Dating-App%3Fnode-id%3D0%253A1%26t%3DGpxOALxhnck2XF3y-1"
  },
  {
    title: "Neso",
    category: "Product Design",
    summary: "Workout and Fitness Tracker",
    metrics: "Fitness + nutrition tracking",
    outcome: "Workout setup, progress tracking, and nutrition monitoring in one program-led experience.",
    image: nesoMockupImage,
    caseStudyHtml: nesoCaseStudyHtml,
    liveUrl: "https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FRp5R4gmO5aSdevyzHz57Qb%2FTrain-and-Earn-Fitness-App-(Copy)%3Fnode-id%3D0%253A1"
  }
];

const services = [
  {
    title: "Product Strategy",
    description: "Research, positioning, and product direction that align business goals with real user needs."
  },
  {
    title: "UX + Interface Design",
    description: "High-fidelity UI, rapid prototyping, and design systems ready for scale."
  },
  {
    title: "No-Code Delivery",
    description: "Production-ready builds in Bubble, Webflow, and Framer with integrations and automation."
  },
  {
    title: "Frontend Development",
    description: "Modern, accessible web apps built with Next.js, React, and scalable component libraries."
  }
];

const process = [
  {
    step: "01",
    title: "Discover",
    description: "Align goals, audit data, and map user journeys to define opportunity spaces."
  },
  {
    step: "02",
    title: "Design",
    description: "Create flows, prototypes, and UI systems with measurable outcomes."
  },
  {
    step: "03",
    title: "Deliver",
    description: "Build and iterate with no-code or frontend, ensuring performance and accessibility."
  }
];

const testimonials = [
  {
    quote:
      "Oluwatosin translated our product vision into a clean, scalable system. The new onboarding flow lifted activation within weeks.",
    name: "Aaron Israel",
    title: "CEO, Codeless Solutions"
  },
  {
    quote:
      "From strategy to build, every detail was intentional. Our team now ships faster with confidence.",
    name: "Godwin Okechukwu",
    title: "Founder, Shyne Africa"
  }
];

const timeline: TimelineItem[] = [
  {
    year: "2025 - Now",
    role: "Design Engineer",
    company: "Codeless Solutions",
    summary: "Lead end-to-end development of DreamAI, an innovative no-code project integrating Azure OpenAI's GPT via API to enhance dream interpretation, wellness insights, and personalized recommendations."
  },
  {
    year: "2024",
    role: "Product Designer",
    company: "Jrun Global",
    summary: "Developed cohesive design systems and comprehensive style guides to ensure visual consistency across web application."
  }
];

const stats = [
  { label: "Years of experience", value: "4+" },
  { label: "Products shipped", value: "10+" },
  { label: "Average Customer Satisfaction Score", value: "4.8/5" }
];

const duplicatedTools = [...tools, ...tools];

const sectionMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.21, 0.61, 0.35, 1] as const }
};

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const [roleIndex, setRoleIndex] = React.useState(0);
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    window.localStorage.setItem('theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  const openCaseStudy = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeCaseStudy = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className={`portfolio-root ${theme}-theme`}>
      <style>{pageStyles}</style>
      <div className="background-glow" aria-hidden="true" />
      <main className="main">
        <nav className="nav">
          <div className="logo">OA.</div>
          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#work" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#tools" onClick={() => setIsMobileMenuOpen(false)}>Tools</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={() => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M12 4.5V2m0 20v-2.5m7.5-7.5H22m-20 0h2.5m14.596 5.096 1.768 1.768M3.136 3.136l1.768 1.768m12.192-1.768-1.768 1.768M4.904 19.096l-1.768 1.768M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M21 12.8A9 9 0 1 1 11.2 3a7.2 7.2 0 1 0 9.8 9.8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <a className="nav-cta" href="#contact">
              Let&apos;s talk
            </a>
            <button
              className="hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </nav>

        <header className="hero" id="hero">
          <div className="hero-grid">
            <motion.div className="hero-copy" {...sectionMotion}>
              <p className="intro">Hey, I&apos;m</p>
              <h1 className="name">Oluwatosin</h1>
              <h2 className="role" aria-live="polite">
                <span className="role-wrapper">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roles[roleIndex]}
                      className="role-text"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>
              <p className="supporting">
                I design and build scalable, user-focused digital products from concept to production.
              </p>
              <div className="role-ats">
                Product Designer • No-Code Developer • Frontend Developer
              </div>
              <div className="cta-row">
                <a className="cta primary" href="#work">
                  View Work
                </a>
                <a className="cta secondary" href="#contact">
                  Work With Me
                </a>
              </div>
              <div className="location">
                <span className="location-label">Living in</span>
                <span className="location-value">Nigeria</span>
              </div>
              <div className="spotify-card" aria-live="polite">
                <span className="spotify-label">Spotify • Now Playing</span>
                <iframe
                  data-testid="embed-iframe"
                  src="https://open.spotify.com/embed/album/60S0Nvtm54AmG6d8lVkhMF?utm_source=generator&autoplay=1&show_info=0"
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={{ borderRadius: "12px" }}
                />
              </div>
              <div className="hero-strip">
                <span>Available for selective projects</span>
              </div>
              <div className="stat-grid">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-card">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div className="hero-globe" {...sectionMotion}>
              <GlobeCanvas />
            </motion.div>
          </div>
        </header>

        <motion.section className="section photo-section" id="portrait" {...sectionMotion}>
          <div className="photo-grid">
            <div className="work-image">
              <img src={portraitImage} alt="Portrait of Oluwatosin" />
            </div>
            <div className="photo-copy">
              <h2>Put a face to the work</h2>
              <p className="section-lead">
                I'm a Design Engineer who bridges the gap between design and code. When I'm not crafting intuitive digital experiences, you'll find me diving into autobiographies to learn from the greats or leveling up in video games—both fuel my creativity and problem-solving approach.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="section about" id="about" {...sectionMotion}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">About</p>
              <h2>I design things that make sense. Then I build them so they actually work.</h2>
            </div>
          </div>
          <div className="about-grid">
            <div className="about-content">
              <div className="about-copy">
                <p>
                  I'm Oluwatosin, a Product Designer who refuses to stop at pretty screens. Somewhere along the way, I got curious about how things behave under the hood… and now I live comfortably in both worlds, designing interfaces and building them into real, usable products.
                </p>
                <p>
                  I've worked across EdTech, service platforms, and internal tools, helping ideas move from "this could be cool" to "this is live and people are using it." I care a lot about clarity, structure, and making sure users don't have to think harder than they should.
                </p>
                <p>
                  My workflow usually looks like this:<br />
                  idea → messy notes → structured flows → clean UI → working product → small obsessive tweaks nobody asked for but everyone benefits from.
                </p>
                <p>
                  I'm big on:
                </p>
                <ul>
                  <li>simple, usable design over flashy noise</li>
                  <li>systems that scale, not hacks that break later</li>
                  <li>building things, not just talking about them</li>
                </ul>
                <p>
                  When I'm not designing or building, I'm probably exploring new tools, refining how I work, or quietly judging bad UX in the wild (it's a disease at this point).
                </p>
                <p>
                  If you're building something and want it to be both well-designed and actually functional, we'll get along just fine.
                </p>
              </div>
              <div className="about-card">
                <h3>Core Focus</h3>
                <div className="tag-grid">
                  <span>UX Strategy</span>
                  <span>Design Systems</span>
                  <span>Rapid Prototyping</span>
                  <span>Conversion UX</span>
                  <span>Frontend Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="seo-block">
          <p>
            Product Designer and Frontend Developer specializing in UI/UX design, no-code development, and modern
            web applications using Bubble, Webflow, Framer, and Next.js.
          </p>
        </section>

        <motion.section className="section" id="work" {...sectionMotion}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2>Product stories that move the metrics</h2>
            </div>
            <p className="section-lead">
              A snapshot of digital products I&apos;ve designed and shipped end-to-end.
            </p>
          </div>
          <div className="work-grid">
            {projects.map((project) => (
              <div key={project.title} className="work-card">
                <div className="work-image">
                  <img
                    src={
                      project.image ??
                      `https://picsum.photos/seed/${project.title.toLowerCase().replace(/\s+/g, '-')}/400/300.jpg`
                    }
                    alt={`${project.title} preview`}
                  />
                </div>
                <div className="work-meta">
                  <span className="badge">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <button
                  className="case-study-btn"
                  onClick={() => openCaseStudy(project)}
                >
                  View Case Study →
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" id="services" {...sectionMotion}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Services</p>
              <h2>End-to-end product support</h2>
            </div>
            <p className="section-lead">
              Strategy, design, and delivery combined into one collaborative engagement.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="section process" {...sectionMotion}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Process</p>
              <h2>Focused, collaborative, and delivery-ready</h2>
            </div>
            <p className="section-lead">A simple, proven flow for turning ideas into scalable products.</p>
          </div>
          <div className="process-grid">
            {process.map((step) => (
              <div key={step.step} className="process-card">
                <span className="process-step">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" id="tools" {...sectionMotion}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Toolbox</p>
              <h2>Tools I Work With</h2>
            </div>
            <p className="section-lead">
              Designing, building, and shipping products using modern tools and frameworks.
            </p>
          </div>
          <div className="carousel">
            <div className="carousel-track">
              {duplicatedTools.map((tool, index) => (
                <div className="tool-card" key={`${tool.name}-${index}`}>
                  <div className="tool-icon" aria-hidden="true">
                    <img
                      src={`https://cdn.simpleicons.org/${tool.icon}/1a1a1a`}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div className="tool-meta">
                    <span className="tool-name">{tool.name}</span>
                    <span className="tool-group">{tool.group}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="section testimonials" {...sectionMotion}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Testimonials</p>
              <h2>Trusted by product teams</h2>
            </div>
            <p className="section-lead">Feedback from partners and leaders I&apos;ve worked with.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="testimonial-card">
                <p>"{testimonial.quote}"</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.title}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" id="experience" {...sectionMotion}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Experience</p>
              <h2>Career highlights</h2>
            </div>
            <p className="section-lead">A snapshot of recent roles and collaborations.</p>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <div key={item.company} className="timeline-item">
                <div>
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.role}</h3>
                  <p className="timeline-company">{item.company}</p>
                </div>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="cta-section" {...sectionMotion}>
          <div>
            <p className="eyebrow">Let&apos;s build</p>
            <h2>Have a product to launch or refine?</h2>
            <p className="section-lead">
              I help teams design, build, and ship polished experiences with measurable impact.
            </p>
          </div>
          <div className="cta-row">
            <a className="cta primary" href="https://calendly.com/mosestosyn07/30min" target="_blank" rel="noopener noreferrer">Book a Call</a>
            <a className="cta secondary" href="#work">
              View Case Studies
            </a>
          </div>
        </motion.section>

        <motion.section className="section contact" id="contact" {...sectionMotion}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Start a conversation</h2>
            </div>
            <p className="section-lead">
              Share your goals, timeline, and challenges. I respond within 48 hours.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Project intake</h3>
              <p>Based in Nigeria, working globally.</p>
            </div>
            <div className="contact-card accent">
              <div className="availability-header">
                <h3>Availability</h3>
                <div className="online-indicator">
                  <span className="online-dot" />
                  <span>Online</span>
                </div>
              </div>
              <p>Available for product design, no-code builds, and frontend delivery.</p>
              <a className="cta primary" href="mailto:">Send an email</a>
            </div>
          </div>
        </motion.section>
        {selectedProject && (
          <CaseStudyModal isOpen={isModalOpen} onClose={closeCaseStudy} project={selectedProject} />
        )}
      </main>

      <footer className="footer">
        <div>
          <strong>Oluwatosin</strong>
          <p>Product designer and builder crafting meaningful digital products.</p>
        </div>
        <div className="footer-links">
          <a href="#work" aria-label="Work">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/tosin-aborishade/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a href="https://x.com/Oluwat0s1n" target="_blank" rel="noreferrer" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

function GlobeCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let renderer: any;
    let scene: any;
    let camera: any;
    let sphere: any;
    let ring: any;
    let marker: any;
    let glow: any;
    let frameId = 0;
    let rotationSpeed = 0.002;
    let disposed = false;

    const init = async () => {
      try {
        const THREE = await import("three");
        if (!canvasRef.current || !containerRef.current) {
          return;
        }

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
          alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 3.2);

        const ambient = new THREE.AmbientLight(0xffffff, 0.75);
        const directional = new THREE.DirectionalLight(0xffffff, 0.55);
        directional.position.set(3, 2, 4);
        scene.add(ambient, directional);

        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const texture = new THREE.TextureLoader().load(
          "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
        );
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.9,
          metalness: 0.1
        });
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const markerPosition = latLongToVector3(9.082, 8.6753, 1.02);
        const markerGeometry = new THREE.SphereGeometry(0.045, 18, 18);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: '#22c55e' });
        marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(markerPosition.x, markerPosition.y, markerPosition.z);
        scene.add(marker);

        const glowGeometry = new THREE.SphereGeometry(0.06, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: '#22c55e',
          transparent: true,
          opacity: 0.3
        });
        glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.copy(marker.position);
        scene.add(glow);

        const ringGeometry = new THREE.RingGeometry(0.06, 0.1, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: '#22c55e',
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide
        });
        ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.copy(marker.position);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(ring);

        const resize = () => {
          if (!containerRef.current) return;
          const nextWidth = containerRef.current.clientWidth;
          const nextHeight = containerRef.current.clientHeight;
          renderer.setSize(nextWidth, nextHeight);
          camera.aspect = nextWidth / nextHeight;
          camera.updateProjectionMatrix();
        };

        const observer = new ResizeObserver(resize);
        observer.observe(containerRef.current);

        const animate = () => {
          if (disposed) return;
          sphere.rotation.y += rotationSpeed;
          sphere.rotation.x = -0.2;
          ring.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.12);
          ring.material.opacity = 0.4 + Math.sin(Date.now() * 0.003) * 0.2;
          glow.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.15);
          glow.material.opacity = 0.2 + Math.sin(Date.now() * 0.002) * 0.1;
          renderer.render(scene, camera);
          frameId = requestAnimationFrame(animate);
        };

        const handleEnter = () => {
          rotationSpeed = 0.0008;
        };

        const handleLeave = () => {
          rotationSpeed = 0.002;
        };

        containerRef.current.addEventListener("mouseenter", handleEnter);
        containerRef.current.addEventListener("mouseleave", handleLeave);

        animate();
        setReady(true);

        return () => {
          observer.disconnect();
          containerRef.current?.removeEventListener("mouseenter", handleEnter);
          containerRef.current?.removeEventListener("mouseleave", handleLeave);
        };
      } catch (error) {
        setReady(false);
      }
    };

    let cleanup: (() => void) | undefined;
    init().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => {
      disposed = true;
      if (cleanup) cleanup();
      if (frameId) cancelAnimationFrame(frameId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div className="globe-shell" ref={containerRef}>
      <canvas ref={canvasRef} className="globe-canvas" aria-hidden="true" />
      {!ready && <div className="globe-fallback" aria-hidden="true" />}
      <div className="globe-caption">
        <span className="pulse" aria-hidden="true" />
        Nigeria
      </div>
    </div>
  );
}

function latLongToVector3(latitude: number, longitude: number, radius: number) {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    z: radius * Math.sin(phi) * Math.sin(theta),
    y: radius * Math.cos(phi)
  };
}

const pageStyles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap');

html {
  scroll-behavior: smooth;
}

:root {
  --ink: #f2f4f8;
  --ink-2: #d0d6df;
  --ink-3: #9aa3b2;
  --surface: #0b0d11;
  --surface-2: #141824;
  --accent: #1a1a1a;
  --gold: #c8a96e;
  --border: rgba(255,255,255,0.1);
  --nav-bg: rgba(19, 23, 32, 0.7);
  --page-gradient: radial-gradient(circle at 12% 12%, #1b2230 0%, #10141d 45%, #0b0d11 100%);
  --glow-gradient: radial-gradient(circle, rgba(245, 185, 74, 0.18), rgba(245, 185, 74, 0));
  --serif: 'Bricolage Grotesque', sans-serif;
  --sans: 'Manrope', sans-serif;
}

.portfolio-root.light-theme {
  --ink: #10151f;
  --ink-2: #3a4759;
  --ink-3: #64748b;
  --surface: #f4f7fb;
  --surface-2: #e7edf5;
  --border: rgba(16, 21, 31, 0.12);
  --nav-bg: rgba(255, 255, 255, 0.82);
  --page-gradient: radial-gradient(circle at 10% 5%, #ffffff 0%, #eef3fb 52%, #e4ebf5 100%);
  --glow-gradient: radial-gradient(circle, rgba(200, 169, 110, 0.2), rgba(200, 169, 110, 0));
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--surface);
  color: var(--ink);
}

.portfolio-root {
  font-family: 'Manrope', system-ui, sans-serif;
  background: var(--page-gradient);
  color: var(--ink);
  min-height: 100vh;
  padding: 0 1.5rem 5rem;
  position: relative;
  overflow: visible;
}

body {
  overflow-x: hidden;
}

.background-glow {
  position: absolute;
  inset: -30% -10% auto auto;
  width: 520px;
  height: 520px;
  background: var(--glow-gradient);
  filter: blur(0px);
  pointer-events: none;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  margin-top: 1rem;
  gap: 1.5rem;
  position: sticky;
  top: 0.75rem;
  z-index: 1000;
  transition: all 0.3s ease;
  background: var(--nav-bg);
  border: 1px solid var(--border);
  border-radius: 18px;
  backdrop-filter: blur(12px);
}

.logo {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.nav-links a {
  text-decoration: none;
  color: var(--ink-2);
  font-weight: 600;
  font-size: 0.95rem;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.theme-toggle {
  border: 1px solid var(--border);
  color: var(--ink);
  background: transparent;
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  padding: 0;
  border-radius: 999px;
  cursor: pointer;
}

.theme-toggle svg {
  width: 1.1rem;
  height: 1.1rem;
}

.nav-cta {
  text-decoration: none;
  border: 1px solid var(--border);
  color: var(--ink);
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  font-weight: 600;
  background: var(--nav-bg);
}

/* Hamburger menu styles */
.hamburger {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1000;
}

.hamburger-line {
  width: 25px;
  height: 2px;
  background-color: var(--ink);
  margin: 3px 0;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger-line.open:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-line.open:nth-child(2) {
  opacity: 0;
}

.hamburger-line.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.hero {
  padding: 4rem 0 2rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  align-items: center;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.intro {
  font-size: 1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8d96a5;
  margin: 0;
}

.name {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(2.8rem, 5vw, 4.6rem);
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.role {
  margin: 0;
  font-size: clamp(1.8rem, 3.4vw, 2.6rem);
  font-weight: 600;
  color: #f5f6f8;
}

.role-wrapper {
  display: inline-flex;
  position: relative;
  height: 1.3em;
  min-width: 16ch;
  overflow: hidden;
  align-items: center;
}

.role-text {
  position: absolute;
  left: 0;
  right: 0;
}

.supporting {
  font-size: 1.05rem;
  color: #b4bdc9;
  max-width: 520px;
  margin: 0;
  line-height: 1.6;
}

.role-ats {
  font-size: 0.95rem;
  color: #8d96a5;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cta {
  text-decoration: none;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cta.primary {
  background: #f5b94a;
  color: #1b1b1b;
  box-shadow: 0 16px 30px rgba(245, 185, 74, 0.3);
}

.cta.secondary {
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #f2f4f8;
  background: rgba(19, 23, 32, 0.6);
}

.cta:hover {
  transform: translateY(-2px);
}

.location {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 600;
}

.location-label {
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #8d96a5;
}

.location-value {
  font-size: 1.1rem;
}

.spotify-card {
  display: grid;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  background: rgba(22, 27, 37, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
  max-width: 420px;
}

.spotify-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9aa3b2;
}

.spotify-card iframe {
  border: none;
  width: 100%;
  height: 82px;
  border-radius: 12px;
  background: #121212;
}

.hero-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 0.95rem;
  color: #a4adbb;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: rgba(24, 30, 40, 0.9);
  padding: 1rem 1.2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stat-card h3 {
  margin: 0 0 0.2rem;
  font-size: 1.4rem;
}

.stat-card p {
  margin: 0;
  color: #9aa3b2;
  font-size: 0.85rem;
}

.hero-globe {
  display: flex;
  justify-content: center;
  align-items: center;
}

.globe-shell {
  position: relative;
  width: min(420px, 90vw);
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle at 30% 30%, rgba(40, 48, 66, 0.9), rgba(19, 24, 34, 0.8));
  border-radius: 36px;
  padding: 1.2rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.globe-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.globe-fallback {
  position: absolute;
  inset: 1.2rem;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #2d3646, #1b2536 68%, #0f141d 100%);
  animation: float 4s ease-in-out infinite;
}

.globe-caption {
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #e6ebf2;
  background: rgba(12, 16, 24, 0.65);
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

.globe-caption .pulse {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #f5b94a;
  box-shadow: 0 0 0 6px rgba(245, 185, 74, 0.2);
  animation: pulse 2.4s ease-in-out infinite;
}

.section {
  padding: 3.5rem 0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.photo-section {
  padding-top: 1.5rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.5rem;
  align-items: center;
}

.photo-frame {
  padding: 1rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 18px 36px rgba(25, 25, 25, 0.1);
}

.photo-frame img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 18px;
  aspect-ratio: 1 / 1;
}

.photo-copy {
  display: grid;
  gap: 1rem;
}

.photo-note {
  padding: 0.9rem 1rem;
  border-radius: 14px;
  background: rgba(245, 185, 74, 0.18);
  color: #5a4a2a;
  font-size: 0.9rem;
  line-height: 1.5;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-end;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.section-heading h2 {
  margin: 0.2rem 0 0;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-family: 'Bricolage Grotesque', sans-serif;
}

.section-lead {
  margin: 0;
  max-width: 420px;
  color: #a4adbb;
  font-size: 1rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: #8c96a6;
  margin: 0;
}

.work-grid,
.service-grid,
.process-grid,
.testimonial-grid {
  display: grid;
  gap: 1.5rem;
}

.work-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.work-card {
  background: rgba(20, 25, 35, 0.9);
  padding: 1.6rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.work-image {
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

@media (min-width: 721px) {
  .work-image {
    height: 500px;
  }
}

.work-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.work-card:hover .work-image img {
  transform: scale(1.05);
}

.work-card h3 {
  margin: 0.8rem 0 0.6rem;
}

.work-card p {
  margin: 0;
  color: #a4adbb;
  line-height: 1.5;
}

.work-meta .badge {
  display: inline-flex;
  background: rgba(245, 185, 74, 0.2);
  color: #fce7c3;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.work-stats {
  background: rgba(24, 31, 42, 0.9);
  padding: 1rem;
  border-radius: 16px;
  display: grid;
  gap: 0.6rem;
}

.work-stats strong {
  font-size: 1.1rem;
}

.work-label {
  text-transform: uppercase;
  font-size: 0.7rem;
  color: #8f99a9;
  letter-spacing: 0.08em;
}

.case-study-btn {
  background: #2a303c;
  color: #fff;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.case-study-btn:hover {
  background: #3a4150;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.about-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-copy p {
  margin-top: 0;
  color: #a4adbb;
  line-height: 1.7;
}

.about-copy ul {
  padding-left: 1.2rem;
  margin: 1rem 0 0;
  color: #a4adbb;
}

.about-card {
  background: rgba(22, 28, 38, 0.9);
  border-radius: 20px;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.tag-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tag-grid span {
  background: rgba(255, 255, 255, 0.08);
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

.about-note {
  border-top: 1px dashed rgba(255, 255, 255, 0.12);
  padding-top: 0.8rem;
  display: grid;
  gap: 0.2rem;
  font-size: 0.9rem;
  color: #9aa3b2;
}

.service-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.service-card {
  padding: 1.4rem;
  border-radius: 18px;
  background: rgba(21, 27, 37, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.service-card h3 {
  margin-top: 0;
}

.service-card p {
  color: #a4adbb;
  margin-bottom: 0;
}

.process-grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.process-card {
  padding: 1.4rem;
  border-radius: 18px;
  background: rgba(24, 30, 40, 0.9);
}

.process-step {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: #9aa3b2;
}

.carousel {
  overflow: hidden;
  position: relative;
  padding: 0.5rem 0;
}

.carousel-track {
  display: flex;
  gap: 1.2rem;
  width: max-content;
  animation: scroll 18s linear infinite;
}

.carousel:hover .carousel-track {
  animation-play-state: paused;
}

.tool-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1.2rem;
  background: rgba(20, 26, 36, 0.9);
  border-radius: 18px;
  min-width: 210px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.tool-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(245, 185, 74, 0.2);
}

.tool-icon img {
  width: 22px;
  height: 22px;
}

.tool-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.tool-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.tool-group {
  font-size: 0.75rem;
  color: #9aa3b2;
}

.testimonial-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.testimonial-card {
  background: rgba(20, 26, 36, 0.9);
  border-radius: 18px;
  padding: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.testimonial-card p {
  margin: 0;
  color: #a4adbb;
  line-height: 1.6;
}

.testimonial-card strong {
  display: block;
}

.testimonial-card span {
  font-size: 0.85rem;
  color: #8f99a9;
}

.timeline {
  display: grid;
  gap: 1.5rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: minmax(180px, 220px) 1fr;
  gap: 1.5rem;
  padding: 1.2rem;
  border-radius: 18px;
  background: rgba(20, 26, 36, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.timeline-year {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9aa3b2;
}

.timeline-company {
  color: #9aa3b2;
  margin-top: 0.3rem;
}

.cta-section {
  padding: 3rem;
  border-radius: 24px;
  background: #1b1b1b;
  color: #f5f4f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-section .section-lead {
  color: #d0d0d0;
}

.cta-section .cta.secondary {
  border-color: #f5f4f0;
  color: #f5f4f0;
  background: transparent;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.contact-card {
  padding: 1.6rem;
  border-radius: 20px;
  background: rgba(20, 26, 36, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: grid;
  gap: 0.7rem;
}

.contact-card.accent {
  background: rgba(36, 42, 54, 0.9);
}

.availability-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.online-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #22c55e;
}

.online-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.footer {
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer p {
  color: #9aa3b2;
  max-width: 320px;
}

.footer-links {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.footer a {
  color: #f2f4f8;
  text-decoration: none;
  font-weight: 600;
}

.seo-block {
  max-width: 760px;
  margin-top: 1.5rem;
  padding: 1rem 0 1.5rem;
  color: #9aa3b2;
  font-size: 0.95rem;
  line-height: 1.6;
}

.portfolio-root.light-theme .intro,
.portfolio-root.light-theme .role-ats,
.portfolio-root.light-theme .section-lead,
.portfolio-root.light-theme .about-copy p,
.portfolio-root.light-theme .about-copy ul,
.portfolio-root.light-theme .tool-group,
.portfolio-root.light-theme .work-card p,
.portfolio-root.light-theme .service-card p,
.portfolio-root.light-theme .testimonial-card p,
.portfolio-root.light-theme .timeline-year,
.portfolio-root.light-theme .timeline-company,
.portfolio-root.light-theme .footer p,
.portfolio-root.light-theme .seo-block,
.portfolio-root.light-theme .work-label,
.portfolio-root.light-theme .process-step,
.portfolio-root.light-theme .spotify-label,
.portfolio-root.light-theme .stat-card p,
.portfolio-root.light-theme .about-note {
  color: var(--ink-2);
}

.portfolio-root.light-theme .role,
.portfolio-root.light-theme .nav-links a,
.portfolio-root.light-theme .footer a,
.portfolio-root.light-theme .logo,
.portfolio-root.light-theme .name {
  color: var(--ink);
}

.portfolio-root.light-theme .work-card,
.portfolio-root.light-theme .service-card,
.portfolio-root.light-theme .testimonial-card,
.portfolio-root.light-theme .timeline-item,
.portfolio-root.light-theme .contact-card,
.portfolio-root.light-theme .about-card,
.portfolio-root.light-theme .tool-card,
.portfolio-root.light-theme .spotify-card,
.portfolio-root.light-theme .stat-card,
.portfolio-root.light-theme .work-stats,
.portfolio-root.light-theme .process-card {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(16, 21, 31, 0.12);
  box-shadow: 0 10px 26px rgba(60, 76, 97, 0.12);
}

.portfolio-root.light-theme .cta.secondary {
  border-color: rgba(16, 21, 31, 0.2);
  color: var(--ink);
  background: rgba(255, 255, 255, 0.75);
}

.portfolio-root.light-theme .globe-shell {
  background: radial-gradient(circle at 30% 30%, rgba(232, 239, 250, 0.95), rgba(210, 221, 238, 0.9));
  box-shadow: 0 24px 56px rgba(73, 87, 105, 0.2);
}

.portfolio-root.light-theme .globe-fallback {
  background: radial-gradient(circle at 35% 35%, #d5dff0, #b7c8e2 68%, #9eb2d1 100%);
}

.portfolio-root.light-theme .globe-caption {
  color: #1c2635;
  background: rgba(255, 255, 255, 0.75);
}

.portfolio-root.light-theme .cta-section {
  background: #1f2733;
  color: #f5f7fb;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 185, 74, 0.45);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(245, 185, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 185, 74, 0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: var(--nav-bg);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    transition: right 0.3s ease;
    z-index: 999;
  }

  .portfolio-root.light-theme .nav-links {
    background: rgba(255, 255, 255, 0.98);
  }

  .nav-links.open {
    display: flex;
    right: 0;
  }

  .nav-links a {
    font-size: 1.2rem;
    color: var(--ink);
  }

  .hamburger {
    display: flex;
  }

  .theme-toggle {
    width: 2.35rem;
    height: 2.35rem;
  }

  .nav-cta {
    display: none;
  }

  .work-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 2rem;
  }

  .timeline-item {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .hero {
    padding: 3.5rem 0 1.5rem;
  }

  .cta-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .globe-shell {
    width: min(360px, 90vw);
  }

  .carousel-track {
    animation-duration: 22s;
  }

  .section-heading {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-lead {
    max-width: 100%;
  }
}
`;
