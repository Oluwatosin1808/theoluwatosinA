import { useState, useEffect, useRef } from 'react';
import CaseStudyModal, { CaseStudyData } from './components/CaseStudyModal';
import {
  dreamAiCaseStudy,
  codelessAgencyCaseStudy,
  nesoCaseStudy,
  gloUpCaseStudy,
  aaronIsraelCaseStudy,
  artemisCaseStudy,
} from './caseStudies';

const portraitImage = new URL('../img/me.png', import.meta.url).href;
const atlasMockupImage = new URL('../img/Mockup 26.png', import.meta.url).href;
const dreamAiMockupImage = new URL('../img/Mockup Ribbon 11.png', import.meta.url).href;
const gloUpMockupImage = new URL('../img/Notioneverything headers.png', import.meta.url).href;
const nesoMockupImage = new URL('../img/Notioneverything headers (1).png', import.meta.url).href;
const aaronMockupImage = new URL('../img/case-0.png', import.meta.url).href;
const artemisMockupImage = new URL('../img/artemis.jpg', import.meta.url).href;
const showreelVideo = new URL('../img/0409.mp4', import.meta.url).href;

const CONTACT_EMAIL = 'mosestosyn07@gmail.com';
const CALENDLY_URL = 'https://calendly.com/mosestosyn07/30min';
const LINKEDIN_URL = 'https://www.linkedin.com/in/tosin-aborishade/';
const TWITTER_URL = 'https://x.com/Oluwat0s1n';

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
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;

type ProjectShape = {
  title: string;
  category: string;
  summary: string;
  metrics: string;
  outcome: string;
  caseStudy?: CaseStudyData;
  liveUrl?: string;
  image?: string;
  tags: string[];
  year: string;
  role: string;
};

const projects: ProjectShape[] = [
  {
    title: 'Artemis II — 3D Scene',
    category: 'Creative Coding · 3D',
    summary: 'A real-time 3D tribute to NASA\'s Artemis II mission. Designed with Maryam Alakoso, built in code on omma.build.',
    metrics: 'Real-time WebGL',
    outcome: 'A single scene authored in code — geometry, lighting, and camera all live in source.',
    image: artemisMockupImage,
    caseStudy: artemisCaseStudy,
    liveUrl: 'https://omma.build/p/artemis-ii-3d-scene-code-jwabi0',
    tags: ['3D', 'WebGL', '2026'],
    year: '2026',
    role: 'Design + build (with Maryam Alakoso)',
  },
  {
    title: 'Aaron Israel',
    category: 'No-Code Development',
    summary: 'No-code web developer and digital builder shipping production-ready websites in days.',
    metrics: '40+ projects shipped',
    outcome: '3x faster delivery than traditional dev cycles with a 98% client satisfaction rate.',
    image: aaronMockupImage,
    caseStudy: aaronIsraelCaseStudy,
    liveUrl: 'https://aaron.pxxl.click',
    tags: ['No-Code', 'Web', '2024'],
    year: '2026',
    role: 'Design + No-code build',
  },
  {
    title: 'Codeless Solutions',
    category: 'Product Design + Development',
    summary: 'A home for a no-code agency that needed to look anything but ordinary.',
    metrics: '38% increase in activation',
    outcome: 'Reduced drop-offs with data-driven flows and personalized nudges.',
    image: atlasMockupImage,
    caseStudy: codelessAgencyCaseStudy,
    liveUrl: 'https://agency.codelessify.org',
    tags: ['Agency', 'Next.js', '2024'],
    year: '2026',
    role: 'Lead designer + frontend',
  },
  {
    title: 'DreamAI',
    category: 'No-Code Build & Design',
    summary: 'Designed and shipped AI-Powered Dream Journaling & Interpretation web app.',
    metrics: 'Built on Bubble',
    outcome: 'AI-powered interpretation delivered in seconds with a journaling-first UX.',
    image: dreamAiMockupImage,
    caseStudy: dreamAiCaseStudy,
    liveUrl: 'https://dreamai-52691.bubbleapps.io/version-test',
    tags: ['AI / Wellness', 'Bubble', '2025'],
    year: '2025',
    role: 'Lead designer + frontend',
  },
  
  {
    title: 'The Glo Up App',
    category: 'Product Design',
    summary: 'A dating app that helps users find potential dates beyond the heterosexual default.',
    metrics: 'Mobile app in development',
    outcome: 'Connect based on sexuality and interests with options beyond romance.',
    image: gloUpMockupImage,
    caseStudy: gloUpCaseStudy,
    liveUrl: 'https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FOdXozCiTmU0EFVpB6esD3Y%2FThe-Glo-Up-Dating-App%3Fnode-id%3D0%253A1%26t%3DGpxOALxhnck2XF3y-1',
    tags: ['Dating', 'Mobile', '2023'],
    year: '2023',
    role: 'Product Designer',
  },
  {
    title: 'Neso',
    category: 'Product Design',
    summary: 'Workout and fitness tracker with built-in nutrition monitoring.',
    metrics: 'Fitness + nutrition tracking',
    outcome: 'Workout setup, progress tracking, and nutrition monitoring in one program-led experience.',
    image: nesoMockupImage,
    caseStudy: nesoCaseStudy,
    liveUrl: 'https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FRp5R4gmO5aSdevyzHz57Qb%2FTrain-and-Earn-Fitness-App-(Copy)%3Fnode-id%3D0%253A1',
    tags: ['Fitness', 'Mobile', '2023'],
    year: '2023',
    role: 'Product Designer',
  },
];

type Theme = 'dark' | 'light';

function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="showreel">
      <div className="container">
        <div className="showreel-frame" ref={ref}>
          {!ready && (
            <div className="showreel-placeholder">
              <div className="showreel-spinner" aria-hidden="true" />
            </div>
          )}
          {inView && (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={() => setReady(true)}
              className="showreel-video"
              style={{ display: ready ? 'block' : 'none' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<ProjectShape | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('portfolio-theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const spotifyContainerRef = useRef<HTMLDivElement>(null);
  const spotifyControllerRef = useRef<any>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    let mounted = true;

    const initController = () => {
      if (!mounted || !spotifyContainerRef.current) return;
      const api = (window as any).SpotifyIframeApi;
      if (!api) return;
      api.createController(
        spotifyContainerRef.current,
        { uri: 'spotify:album:60S0Nvtm54AmG6d8lVkhMF', width: '100%', height: 100 },
        (controller: any) => {
          if (!mounted) { controller?.destroy?.(); return; }
          spotifyControllerRef.current = controller;
          controller.addListener('playback_update', (e: any) => {
            if (!mounted) return;
            setIsPlaying(!e.data.isPaused);
          });
        }
      );
    };

    if ((window as any).SpotifyIframeApi) {
      initController();
    } else {
      const existing = document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]');
      if (!existing) {
        const script = document.createElement('script');
        script.src = 'https://open.spotify.com/embed/iframe-api/v1';
        script.async = true;
        document.body.appendChild(script);
      }
      (window as any).onSpotifyIframeApiReady = (api: any) => {
        (window as any).SpotifyIframeApi = api;
        initController();
      };
    }

    return () => {
      mounted = false;
      spotifyControllerRef.current?.destroy?.();
      spotifyControllerRef.current = null;
    };
  }, []);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const togglePlay = () => {
    if (spotifyControllerRef.current) {
      spotifyControllerRef.current.togglePlay();
    } else {
      window.open('https://open.spotify.com/album/60S0Nvtm54AmG6d8lVkhMF', '_blank', 'noreferrer');
    }
  };

  return (
    <>
      <style>{styles}</style>

      <header className="topbar">
        <div className="topbar-inner">
          <a href="#top" className="brand">
            <div className="brand-mark">OA</div>
            <div className="brand-name">Oluwatosin <span>· Product Designer &amp; Frontend Developer</span></div>
          </a>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#work">Selected Work</a>
            <a href="#experience">Experience</a>
            <a href="#testimonials">Testimonials</a>
          </nav>
          <div className="topbar-end">
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <a href="#contact" className="top-cta">Work With Me →</a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div>
                <div className="availability">
                  <span className="pip"></span>
                  <span>Available for select projects</span>
                </div>
                <p className="hero-kicker">Hey, I'm</p>
                <h1>Oluwatosin.</h1>
                <p className="hero-roles">Product Designer · No-Code Developer · Frontend Developer</p>
                <p className="hero-subhead">
                  I design and build <strong>scalable, user-focused digital products</strong> from concept to production.
                </p>

                <div className="hero-meta">
                  <div className="item">
                    <span className="k">Working from</span>
                    <span className="v"><span className="live-dot" aria-hidden="true"></span>GMT+1 · Working Globally</span>
                  </div>
                  <div className="item">
                    <span className="k">Experience</span>
                    <span className="v">4+ years</span>
                  </div>
                  <div className="item">
                    <span className="k">Currently</span>
                    <span className="v">Design Engineer · Codeless</span>
                  </div>
                  <div className="item">
                    <span className="k">Reply time</span>
                    <span className="v">Within 48 hours</span>
                  </div>
                </div>

                <div className="hero-actions">
                  <a href="#work" className="btn-primary">View Work<span className="arr">→</span></a>
                  <a href="#contact" className="btn-secondary">Work With Me</a>
                  <a href={MAILTO} className="btn-text">{CONTACT_EMAIL}</a>
                </div>
              </div>

              <div className="portrait-wrap">
                <div className="portrait">
                  <div className="corner-tag"><span className="live-dot" aria-hidden="true"></span>Online · GMT+1</div>
                  <img src={portraitImage} alt="Portrait of Oluwatosin" className="portrait-img" />
                </div>
                <div className="portrait-caption">
                  <span>Available for selective projects</span>
                  <span><span className="star">★</span> 4.8 / 5.0 CSAT</span>
                </div>

                <button
                  type="button"
                  className="now-playing-card"
                  onClick={togglePlay}
                  aria-label={`${isPlaying ? 'Pause' : 'Play'} REAL, Vol. 1 by Wizkid`}
                  aria-pressed={isPlaying}
                >
                  <div className="np-cover">
                    <img
                      src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022d9d222a08cb2e589cf4288e"
                      alt="REAL, Vol. 1 album cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="np-body">
                    <div className="np-row">
                      <span className="np-eyebrow">
                        <span className={`np-pulse${isPlaying ? ' is-playing' : ''}`} aria-hidden="true"><i></i><i></i><i></i></span>
                        <span>{isPlaying ? 'Now playing' : 'On rotation'}</span>
                      </span>
                      <svg className="np-logo" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.438 1.009C6.368.769 1.251 5.494 1.008 11.565c-.24 6.07 4.485 11.186 10.556 11.426 6.07.242 11.185-4.484 11.427-10.554S18.507 1.251 12.438 1.009m4.644 16.114a.657.657 0 0 1-.897.246 13.2 13.2 0 0 0-4.71-1.602 13.2 13.2 0 0 0-4.968.242.658.658 0 0 1-.31-1.278 14.5 14.5 0 0 1 5.46-.265c1.837.257 3.579.851 5.177 1.76.315.178.425.58.246.896zm1.445-2.887a.853.853 0 0 1-1.158.344 16.2 16.2 0 0 0-5.475-1.797 16.2 16.2 0 0 0-5.758.219.855.855 0 0 1-1.018-.65.85.85 0 0 1 .65-1.018 17.9 17.9 0 0 1 6.362-.241 17.9 17.9 0 0 1 6.049 1.985c.415.224.57.743.344 1.158zm1.602-3.255a1.05 1.05 0 0 1-1.418.448 19.7 19.7 0 0 0-6.341-2.025 19.6 19.6 0 0 0-6.655.199 1.05 1.05 0 1 1-.417-2.06 21.7 21.7 0 0 1 7.364-.22 21.7 21.7 0 0 1 7.019 2.24c.515.268.715.903.448 1.418" />
                      </svg>
                    </div>
                    <div className="np-title">REAL, Vol. 1</div>
                    <div className="np-meta">Wizkid <span className="np-dot">·</span> Album</div>
                  </div>
                  <span className="np-play" aria-hidden="true">
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24"><path d="M6 5h3v14H6zm9 0h3v14h-3z" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    )}
                  </span>
                </button>
                <div ref={spotifyContainerRef} className="spotify-embed-host" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section id="impact" className="impact-section">
          <div className="impact-shell">
            <div className="section-head">
              <div className="meta">
                <span className="eyebrow">By the numbers</span>
              </div>
              <div>
                <h2>A snapshot of digital products designed and shipped end-to-end.</h2>
                <p className="lede">Across EdTech, service platforms, and internal tools — ideas moved from "this could be cool" to "this is live and people are using it."</p>
              </div>
            </div>

            <div className="impact-grid">
             

              <div className="metrics three">
                <div className="m">
                  <span className="num">4<sub>+</sub></span>
                  <span className="label">Years of experience</span>
                  <span className="desc">Designing and building scalable products end-to-end.</span>
                </div>
                <div className="m">
                  <span className="num">20<sub>+</sub></span>
                  <span className="label">Products shipped</span>
                  <span className="desc">Mobile, web, internal tools — production code, not just prototypes.</span>
                </div>
                <div className="m">
                  <span className="num">4.8<sub>/5</sub></span>
                  <span className="label">Avg client satisfaction</span>
                  <span className="desc">Across recent engagements. Repeat work is the norm.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="container">
            <div className="section-head">
              <div className="meta">
                <span className="eyebrow">About</span>
              </div>
              <div>
                <h2>I design things that make sense. Then I build them so they actually work.</h2>
                <p className="lede">A Product Designer who refuses to stop at pretty screens — comfortable in design and code.</p>
              </div>
            </div>

            <div className="about-grid">
              <div className="bio-card">
                <h3>Hi — I'm Oluwatosin.</h3>
                <p>I'm a Product Designer who refuses to stop at pretty screens. Somewhere along the way, I got curious about how things behave under the hood… and now I live comfortably in both worlds, designing interfaces and building them into real, usable products.</p>
                <p>I've worked across <strong>EdTech, service platforms, and internal tools</strong>, helping ideas move from "this could be cool" to "this is live and people are using it." I care a lot about clarity, structure, and making sure users don't have to think harder than they should.</p>
                <p>My workflow usually looks like this: idea → messy notes → structured flows → clean UI → working product → small obsessive tweaks nobody asked for but everyone benefits from.</p>
                <p>I'm big on <strong>simple, usable design over flashy noise</strong>; <strong>systems that scale</strong>, not hacks that break later; and <strong>building things, not just talking about them</strong>.</p>
                <p>If you're building something and want it to be both well-designed and actually functional, we'll get along just fine.</p>
                <div className="bio-foot">
                  <span>GMT+1 · Working Globally</span>
                  <span>— Oluwatosin</span>
                </div>
              </div>

              <div className="about-side">
                <div className="info-card">
                  <div className="label">// Quick facts</div>
                  <div className="row"><span className="k">Years of experience</span><span className="v">4+ years</span></div>
                  <div className="row"><span className="k">Current role</span><span className="v">Design Engineer · Codeless</span></div>
                  <div className="row"><span className="k">Working hours</span><span className="v">GMT+1 · Working Globally</span></div>
                  <div className="row"><span className="k">Engagement</span><span className="v">FTE · Contract · Selective</span></div>
                  <div className="row"><span className="k">Reply time</span><span className="v">Within 48 hours</span></div>
                  <div className="row"><span className="k">Languages</span><span className="v">English</span></div>
                </div>

                <div className="skills-card">
                  <div className="label">// Core focus</div>
                  <div className="skills-list">
                    {['UX Strategy','Design Systems','Rapid Prototyping','Conversion UX','Frontend Delivery','No-Code Builds','Product Design','Frontend (Next.js)'].map(s => (
                      <span key={s} className="skill">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section id="work">
          <div className="container">
            <div className="section-head">
              <div className="meta">
                <span className="eyebrow">Selected Work</span>
              </div>
              <div>
                <h2>Product stories that move the metrics.</h2>
                <p className="lede">A snapshot of digital products I've designed and shipped end-to-end.</p>
              </div>
            </div>

            <div className="case-grid">
              {projects.map((p, i) => (
                <article
                  className="case-card"
                  key={p.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveProject(p)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveProject(p);
                    }
                  }}
                  aria-label={`Open case study for ${p.title}`}
                >
                  <div className="case-visual">
                    <span className="badge">CASE 0{i + 1} · {p.title}</span>
                    <span className="yr">{p.year}</span>
                    {p.image && (
                      <div className="case-image-wrap">
                        <img src={p.image} alt={`${p.title} preview`} loading="lazy" decoding="async" />
                      </div>
                    )}
                  </div>
                  <div className="case-content">
                    <div className="case-tags">
                      {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <span className="case-role">Role · <b>{p.role}</b></span>
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                    <div className="case-outcomes">
                      <div className="o">
                        <div className="n">{p.metrics}</div>
                        <div className="l">Highlight</div>
                      </div>
                      <div className="o wide">
                        <div className="n small">{p.outcome}</div>
                        <div className="l">Outcome</div>
                      </div>
                    </div>
                    <div className="case-actions">
                      <span className="case-link">View case study →</span>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          className="case-link soft"
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >Live ↗</a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SHOWREEL */}
        <LazyVideo src={showreelVideo} />

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="container">
            <div className="section-head">
              <div className="meta">
                <span className="eyebrow">Experience</span>
              </div>
              <div>
                <h2>Career highlights.</h2>
                <p className="lede">A snapshot of recent roles and collaborations.</p>
              </div>
            </div>

            <div className="exp-grid">
              {experience.map((j, i) => (
                <div className="exp-job" key={i}>
                  <div className="exp-when">
                    <span className="dates">{j.dates}</span>
                    <span className="duration">{j.duration}</span>
                    <span className="location">{j.location}</span>
                  </div>
                  <div className="exp-body">
                    <h3>{j.role}</h3>
                    <div className="company">{j.company} <span className="type">{j.type}</span></div>
                    <p>{j.summary}</p>
                  </div>
                  <span className="exp-arrow">→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials">
          <div className="container">
            <div className="section-head">
              <div className="meta">
                <span className="eyebrow">Testimonials</span>
              </div>
              <div>
                <h2>Trusted by product teams.</h2>
                <p className="lede">Feedback from partners and leaders I've worked with.</p>
              </div>
            </div>

            <div className="quotes">
              {quotes.map((q, i) => (
                <figure className="quote" key={i}>
                  <div className="quote-rating">{Array.from({ length: 5 }).map((_, k) => <i key={k}>★</i>)}</div>
                  <blockquote className="quote-body">{q.body}</blockquote>
                  <figcaption className="quote-foot">
                    <div className="qavatar">{q.initial}</div>
                    <div>
                      <div className="qname">{q.name}</div>
                      <div className="qrole">{q.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="cta-section">
          <div className="container">
            <div className="cta-card">
              <div>
                <span className="eyebrow">// Let's build</span>
                <h2 style={{ marginTop: 14 }}>Have a product to launch or refine?</h2>
                <p>I help teams design, build, and ship polished experiences with measurable impact. Share your goals, timeline, and challenges — I respond within 48 hours.</p>
              </div>
              <div className="cta-actions">
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">Book a Call<span className="arr">→</span></a>
                <a href={MAILTO} className="btn-secondary" style={{ borderColor: 'rgba(245,177,76,.3)', color: 'var(--amber)' }}>Send an email →</a>
                <div className="cta-channels">
                  <span><b>Email</b> · <a href={MAILTO}>{CONTACT_EMAIL}</a></span>
                  <span><b>LinkedIn</b> · <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">/in/tosin-aborishade</a></span>
                  <span><b>Replies</b> · within 48 hours · GMT+1</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="col">
              <div className="brand" style={{ marginBottom: 16 }}>
                <div className="brand-mark">OA</div>
                <div className="brand-name">Oluwatosin</div>
              </div>
              <p>Product Designer and builder crafting meaningful digital products. Working globally on GMT+1.</p>
            </div>
            <div className="col">
              <h4>Sections</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#work">Selected Work</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="col">
              <h4>Elsewhere</h4>
              <ul>
                <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
                <li><a href={TWITTER_URL} target="_blank" rel="noreferrer">Twitter / X ↗</a></li>
                <li><a href={CALENDLY_URL} target="_blank" rel="noreferrer">Book a call ↗</a></li>
                <li><a href={MAILTO}>Email ↗</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-base">
            <span>© 2026 Oluwatosin · All rights reserved</span>
            <span>GMT+1 · Working Globally</span>
          </div>
        </div>
      </footer>

      {activeProject && (
        <CaseStudyModal
          isOpen={!!activeProject}
          onClose={() => setActiveProject(null)}
          project={activeProject}
        />
      )}
    </>
  );
}

const experience = [
  {
    dates: '2025 — Present',
    duration: '1 yr+',
    location: 'Remote · GMT+1',
    role: 'Design Engineer',
    company: 'Codeless Solutions',
    type: 'Full-time',
    summary: "Lead end-to-end development of DreamAI, an innovative no-code project integrating Azure OpenAI's GPT via API to enhance dream interpretation, wellness insights, and personalized recommendations.",
  },
  {
    dates: '2024',
    duration: '12 mo',
    location: 'Remote · Contract',
    role: 'Product Designer',
    company: 'Jrun Global',
    type: 'Contract',
    summary: 'Developed cohesive design systems and comprehensive style guides to ensure visual consistency across web application.',
  },
];

const quotes = [
  {
    initial: 'A',
    body: '"Oluwatosin translated our product vision into a clean, scalable system. The new onboarding flow lifted activation within weeks."',
    name: 'Aaron Israel',
    role: 'CEO, Codeless Solutions',
  },
  {
    initial: 'G',
    body: '"From strategy to build, every detail was intentional. Our team now ships faster with confidence."',
    name: 'Godwin Okechukwu',
    role: 'Founder, Shyne Africa',
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Manrope:wght@400;500;600;700&display=swap');

  :root, :root[data-theme="dark"]{
    --bg:#0b132a; --bg-2:#111c3d; --bg-3:#16244c;
    --rule:#1d2a52;
    --ink:#f4ecdb; --ink-2:#d2cab6; --ink-3:#8b94b1; --ink-4:#4f5a82;
    --amber:#e8a64c; --amber-2:#f5c073; --amber-ink:#2a1c08; --green:#4caf7d;
    --topbar-bg:rgba(11,19,42,.85);
    --card-bg-from:var(--bg-2); --card-bg-to:var(--bg);
    --skill-color:var(--amber-2);
    --shadow-strong:0 30px 60px -20px rgba(0,0,0,.5);
  }
  :root[data-theme="light"]{
    --bg:#fbfaf7; --bg-2:#f3f1ec; --bg-3:#e8e4dc;
    --rule:#e1ddd2;
    --ink:#161310; --ink-2:#3a3530; --ink-3:#6b6258; --ink-4:#a8a094;
    --amber:#a26b1c; --amber-2:#7d4f0d; --amber-ink:#fbfaf7; --green:#2f8b58;
    --topbar-bg:rgba(251,250,247,.85);
    --card-bg-from:#f3f1ec; --card-bg-to:#e8e4dc;
    --skill-color:#7d4f0d;
    --shadow-strong:0 24px 48px -16px rgba(0,0,0,.12);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{
    background:var(--bg); color:var(--ink);
    font-family:'Manrope',system-ui,sans-serif;
    font-size:16px; line-height:1.6;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  ::selection{background:var(--amber);color:var(--amber-ink)}
  a{color:inherit;text-decoration:none}
  img{max-width:100%;display:block}

  .eyebrow{font-family:'Manrope',sans-serif;font-weight:600;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-3)}
  .container{max-width:1400px;margin:0 auto;padding:0 clamp(24px,5vw,80px)}

  /* Neutralize italic emphasis inside headings */
  h1 em, h2 em, h3 em, h4 em,
  .hero h1 em, .section-head h2 em, .case-content h3 em,
  .bio-card h3 em, .cta-card h2 em, .quote-body em{
    font-style:normal !important;color:inherit !important;
  }

  .live-dot{
    display:inline-block;width:7px;height:7px;border-radius:50%;
    background:#4caf7d;box-shadow:0 0 8px #4caf7d;margin-right:8px;
    animation:pulse 2s ease-in-out infinite;
  }
  @keyframes pulse{
    0%,100%{box-shadow:0 0 0 0 rgba(76,175,125,.6)}
    50%{box-shadow:0 0 0 6px rgba(76,175,125,0)}
  }

  .topbar{position:sticky;top:0;z-index:60;background:var(--topbar-bg);backdrop-filter:blur(14px) saturate(140%);border-bottom:1px solid var(--rule)}
  .topbar-end{display:flex;align-items:center;gap:12px}
  .theme-toggle{width:36px;height:36px;border-radius:8px;border:1px solid var(--rule);background:transparent;color:var(--ink-2);cursor:pointer;display:grid;place-items:center;transition:color .15s,border-color .15s,background .15s}
  .theme-toggle:hover{color:var(--amber);border-color:var(--amber);background:rgba(245,177,76,.06)}
  .topbar-inner{display:flex;align-items:center;justify-content:space-between;padding:14px clamp(24px,5vw,80px);max-width:1400px;margin:0 auto;gap:24px}
  .brand{display:flex;align-items:center;gap:12px;min-width:0}
  .brand-mark{width:34px;height:34px;border-radius:6px;background:linear-gradient(135deg,var(--amber),#a26b1c);display:grid;place-items:center;color:var(--amber-ink);font-family:'Newsreader',serif;font-weight:600;font-size:14px;letter-spacing:.01em;flex-shrink:0}
  .brand-name{font-weight:500;font-size:15px;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .brand-name span{color:var(--ink-3);font-weight:400}
  .nav-links{display:flex;gap:28px}
  .nav-links a{font-size:14px;color:var(--ink-2);transition:color .15s}
  .nav-links a:hover{color:var(--ink)}
  .top-cta{display:inline-flex;align-items:center;gap:8px;padding:9px 18px;border-radius:6px;background:var(--amber);color:var(--amber-ink);font-weight:600;font-size:13px;flex-shrink:0}
  .top-cta:hover{background:var(--amber-2)}

  .hero{padding:80px 0 60px}
  .hero-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:64px;align-items:center}
  .availability{display:inline-flex;align-items:center;gap:10px;padding:7px 14px;border-radius:999px;background:rgba(76,175,125,.12);border:1px solid rgba(76,175,125,.3);font-family:'Manrope',sans-serif;font-weight:500;font-size:11px;color:#86d6a8;letter-spacing:.12em;text-transform:uppercase;margin-bottom:28px}
  .availability .pip{width:7px;height:7px;border-radius:50%;background:#4caf7d;box-shadow:0 0 8px #4caf7d}

  .hero-kicker{font-family:'Newsreader',serif;font-style:italic;font-size:24px;color:var(--ink-3);margin-bottom:6px}
  .hero h1{font-family:'Newsreader',serif;font-weight:400;font-size:clamp(60px,8vw,128px);line-height:1;letter-spacing:-.03em;margin-bottom:18px;text-wrap:balance}
  .hero-roles{font-family:'Manrope',sans-serif;font-weight:500;font-size:14px;color:var(--amber);letter-spacing:.18em;text-transform:uppercase;margin-bottom:20px}
  .hero-subhead{font-size:20px;color:var(--ink-2);max-width:560px;line-height:1.5;margin-bottom:32px}
  .hero-subhead strong{color:var(--ink);font-weight:600}

  .hero-meta{display:flex;flex-wrap:wrap;gap:28px 40px;padding:24px 0;margin-bottom:32px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
  .hero-meta .item{display:flex;flex-direction:column;gap:4px}
  .hero-meta .k{font-family:'Manrope',sans-serif;font-weight:600;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3)}
  .hero-meta .v{font-size:15px;color:var(--ink);font-weight:500;display:inline-flex;align-items:center}

  .hero-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
  .btn-primary{display:inline-flex;align-items:center;gap:10px;padding:14px 22px;border-radius:8px;background:var(--amber);color:var(--amber-ink);font-weight:600;font-size:15px;transition:transform .15s, background .15s}
  .btn-primary:hover{background:var(--amber-2)}
  .btn-primary .arr{font-family:'Newsreader',serif;font-size:18px}
  .btn-secondary{display:inline-flex;align-items:center;gap:10px;padding:14px 22px;border-radius:8px;border:1px solid var(--rule);background:transparent;color:var(--ink);font-weight:500;font-size:15px;transition:border-color .15s, background .15s}
  .btn-secondary:hover{border-color:var(--ink-3);background:rgba(255,255,255,.04)}
  :root[data-theme="light"] .btn-secondary:hover{background:rgba(0,0,0,.04)}
  .btn-text{font-size:14px;color:var(--ink-3);padding:14px 8px;border-bottom:1px solid var(--ink-4);transition:color .15s, border-color .15s}
  .btn-text:hover{color:var(--amber);border-color:var(--amber)}

  .portrait-wrap{position:relative}
  .portrait{position:relative;aspect-ratio:4/5;border-radius:12px;overflow:hidden;background:linear-gradient(180deg,#2a1f0e 0%,#0b132a 100%);border:1px solid var(--rule)}
  .portrait::before{content:'';position:absolute;inset:0;background:radial-gradient(80% 60% at 50% 35%,rgba(245,177,76,.18) 0%,transparent 60%),repeating-linear-gradient(45deg,transparent 0 8px,rgba(245,177,76,.05) 8px 9px);pointer-events:none;z-index:1}
  .portrait-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 25%}
  .portrait .corner-tag{position:absolute;top:16px;left:16px;font-family:'Manrope',sans-serif;font-weight:500;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-2);background:rgba(0,0,0,.55);backdrop-filter:blur(8px);padding:6px 10px;border-radius:4px;z-index:2;display:inline-flex;align-items:center}
  .portrait-caption{margin-top:14px;display:flex;justify-content:space-between;align-items:center;font-family:'Manrope',sans-serif;font-weight:500;font-size:11px;color:var(--ink-3);letter-spacing:.1em}
  .portrait-caption .star{color:var(--amber)}

  section{padding:100px 0;border-top:1px solid var(--rule)}
  .section-head{display:flex;flex-direction:column;gap:18px;margin-bottom:60px}
  .section-head .meta .eyebrow{display:inline-flex;align-items:center;gap:14px;color:var(--amber)}
  .section-head .meta .eyebrow::before{content:"";display:inline-block;width:32px;height:1px;background:currentColor;opacity:.7}
  .section-head h2{font-family:'Newsreader',serif;font-weight:400;font-size:clamp(32px,3.4vw,46px);line-height:1.05;letter-spacing:-.02em;max-width:820px}
  .section-head .lede{font-size:16px;color:var(--ink-3);max-width:560px;margin-top:12px;line-height:1.55}

  .impact-section{position:relative;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;padding:100px 0 80px;border-top:0;background:var(--bg-2);overflow:hidden}
  .impact-shell{max-width:1800px;margin:0 auto;padding:0 clamp(24px,5vw,80px);}

  .metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--rule);border-radius:14px;background:linear-gradient(180deg,rgba(245,177,76,.04),transparent);overflow:hidden}
  .metrics.three{grid-template-columns:repeat(3,1fr)}
  .metrics .m{padding:36px 28px;border-right:1px solid var(--rule);display:flex;flex-direction:column;gap:8px}
  .metrics .m:last-child{border-right:0}
  .metrics .m .num{font-family:'Newsreader',serif;font-size:64px;font-weight:400;line-height:.95;letter-spacing:-.02em;color:var(--ink)}
  .metrics .m .num sub{font-size:24px;color:var(--ink-3);font-style:italic;font-weight:400;vertical-align:baseline}
  .metrics .m .label{font-family:'Manrope',sans-serif;font-weight:600;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3);margin-top:4px}
  .metrics .m .desc{font-size:13px;color:var(--ink-2);line-height:1.5;margin-top:8px}

  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
  .bio-card{border:1px solid var(--rule);border-radius:14px;padding:36px;background:linear-gradient(180deg,var(--card-bg-from),var(--card-bg-to))}
  .bio-card h3{font-family:'Newsreader',serif;font-weight:400;font-size:30px;line-height:1.15;letter-spacing:-.01em;margin-bottom:18px;color:var(--ink)}
  .bio-card p{font-size:15px;color:var(--ink-2);line-height:1.7;margin-bottom:14px}
  .bio-card p strong{color:var(--ink);font-weight:600}
  .bio-foot{margin-top:18px;padding-top:18px;border-top:1px solid var(--rule);display:flex;justify-content:space-between;align-items:center;font-family:'Manrope',sans-serif;font-weight:500;font-size:11px;color:var(--ink-3);letter-spacing:.12em;text-transform:uppercase;flex-wrap:wrap;gap:8px}

  .about-side{display:flex;flex-direction:column;gap:24px}
  .info-card,.skills-card{border:1px solid var(--rule);border-radius:14px;padding:28px}
  .info-card .label,.skills-card .label{font-family:'Manrope',sans-serif;font-weight:600;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3);margin-bottom:16px}
  .info-card .row{display:flex;justify-content:space-between;align-items:baseline;padding:10px 0;border-bottom:1px solid var(--rule);font-size:14px;gap:16px}
  .info-card .row:last-child{border-bottom:0}
  .info-card .row .k{color:var(--ink-3);font-size:13px}
  .info-card .row .v{color:var(--ink);font-weight:500;text-align:right}
  .skills-list{display:flex;flex-wrap:wrap;gap:8px}
  .skills-list .skill{padding:7px 13px;border-radius:6px;background:rgba(245,177,76,.08);border:1px solid rgba(245,177,76,.25);color:var(--skill-color);font-size:13px;font-weight:500}

  .now-playing-card{display:grid;grid-template-columns:auto 1fr auto;gap:14px;align-items:center;width:100%;margin-top:16px;padding:12px 14px;border:1px solid var(--rule);border-radius:14px;background:linear-gradient(135deg,rgba(245,177,76,.07) 0%,transparent 55%),linear-gradient(180deg,var(--card-bg-from),var(--card-bg-to));color:var(--ink);font:inherit;text-align:left;cursor:pointer;outline:none;transition:transform .25s, border-color .25s, box-shadow .25s}
  .now-playing-card:hover{border-color:rgba(245,177,76,.4);transform:translateY(-1px);box-shadow:0 14px 28px -16px rgba(0,0,0,.45)}
  .now-playing-card:focus-visible{outline:2px solid var(--amber);outline-offset:3px}
  .np-cover{width:56px;height:56px;border-radius:8px;overflow:hidden;background:#0b0b0b;flex-shrink:0;box-shadow:0 6px 14px -8px rgba(0,0,0,.5)}
  .np-cover img{width:100%;height:100%;object-fit:cover;display:block}
  .np-body{display:flex;flex-direction:column;gap:3px;min-width:0}
  .np-row{display:flex;align-items:center;justify-content:space-between;gap:10px}
  .np-eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'Manrope',sans-serif;font-weight:600;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-3)}
  .np-pulse{display:inline-flex;align-items:flex-end;gap:2px;height:10px}
  .np-pulse i{display:inline-block;width:2px;background:var(--amber);border-radius:1px;transform-origin:center bottom;animation:eq 1.2s ease-in-out infinite paused}
  .np-pulse.is-playing i{animation-play-state:running}
  .np-pulse i:nth-child(1){height:55%;animation-delay:-.4s}
  .np-pulse i:nth-child(2){height:100%;animation-delay:-.2s}
  .np-pulse i:nth-child(3){height:75%}
  @keyframes eq{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
  .np-logo{width:14px;height:14px;flex-shrink:0;color:var(--ink-3);opacity:.7;transition:color .25s, opacity .25s}
  .np-logo path{fill:currentColor}
  .now-playing-card:hover .np-logo{color:#1db954;opacity:1}
  .np-title{font-family:'Newsreader',serif;font-size:17px;font-weight:500;line-height:1.2;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.005em}
  .np-meta{font-size:12px;color:var(--ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .np-meta .np-dot{color:var(--ink-4);margin:0 2px}
  .np-play{width:36px;height:36px;border-radius:50%;background:var(--amber);display:grid;place-items:center;flex-shrink:0;transition:transform .25s, background .25s}
  .np-play svg{width:13px;height:13px;fill:var(--amber-ink);margin-left:2px}
  .now-playing-card:hover .np-play{transform:scale(1.05);background:var(--amber-2)}
  .spotify-embed-host{position:fixed;left:-9999px;top:0;width:300px;height:100px;opacity:0;pointer-events:none}

  .impact-grid{display:grid;gap:48px}

  .globe-stage-wrap{display:flex;flex-direction:column;align-items:center}
  .globe-stage{position:relative;aspect-ratio:1/1;width:100%;max-width:480px;margin:0 auto;border-radius:50%;overflow:hidden;border:1px solid rgba(245,177,76,.2);background:radial-gradient(circle at 28% 22%,rgba(245,177,76,.28),transparent 42%),radial-gradient(circle at 78% 82%,rgba(0,0,0,.75),transparent 55%),radial-gradient(circle at 50% 50%,var(--bg-3) 0%,var(--bg) 78%);box-shadow:inset 22px 22px 50px rgba(245,177,76,.1),inset -28px -36px 100px rgba(0,0,0,.7),inset 0 0 40px rgba(0,0,0,.3),0 0 32px rgba(245,177,76,.15),0 0 90px rgba(245,177,76,.07),0 30px 60px -24px rgba(0,0,0,.55)}
  .globe-svg{position:absolute;inset:0;width:100%;height:100%;display:block}
  .g-rim{fill:none;stroke:var(--amber);stroke-opacity:.45;stroke-width:.7}
  .g-par{fill:none;stroke:var(--amber);stroke-opacity:.2;stroke-width:.45}
  .g-eq{stroke:var(--amber);stroke-opacity:.42;stroke-width:.55}
  .g-mer{fill:none;stroke:var(--amber);stroke-opacity:.32;stroke-width:.5;animation:g-mer-spin 18s linear infinite}
  .g-m1{animation-delay:0s}
  .g-m2{animation-delay:-3s}
  .g-m3{animation-delay:-6s}
  .g-m4{animation-delay:-9s}
  .g-m5{animation-delay:-12s}
  .g-m6{animation-delay:-15s}
  @keyframes g-mer-spin{0%{rx:80px}50%{rx:.5px}100%{rx:80px}}
  .globe-caption{margin-top:18px;display:inline-flex;align-items:center;font-family:'Manrope',sans-serif;font-weight:500;font-size:11px;color:var(--ink-3);letter-spacing:.12em;text-transform:uppercase}

  .exp-grid{display:flex;flex-direction:column}
  .exp-job{display:grid;grid-template-columns:200px 1fr 60px;gap:48px;padding:32px 24px;border-top:1px solid var(--rule);align-items:start;transition:background .2s;border-radius:10px}
  .exp-job:last-child{border-bottom:1px solid var(--rule)}
  .exp-job:hover{background:linear-gradient(90deg,rgba(245,177,76,.05),rgba(245,177,76,.01) 70%,transparent)}
  .exp-when{display:flex;flex-direction:column;gap:6px}
  .exp-when .dates{font-family:'Manrope',sans-serif;font-weight:500;font-size:13px;color:var(--ink);letter-spacing:.05em}
  .exp-when .duration{font-size:11px;color:var(--ink-4);font-family:'Manrope',sans-serif;font-weight:500;letter-spacing:.1em}
  .exp-when .location{font-family:'Manrope',sans-serif;font-weight:500;font-size:11px;color:var(--ink-4);margin-top:4px;letter-spacing:.05em}
  .exp-body h3{font-family:'Newsreader',serif;font-weight:500;font-size:30px;letter-spacing:-.01em;line-height:1.1}
  .exp-body .company{display:flex;align-items:center;gap:10px;margin-top:6px;font-size:14px;color:var(--amber);font-weight:500;flex-wrap:wrap}
  .exp-body .company .type{font-family:'Manrope',sans-serif;font-weight:500;font-size:10px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.15em;padding:2px 8px;border:1px solid var(--rule);border-radius:3px}
  .exp-body p{color:var(--ink-2);font-size:15px;line-height:1.6;margin-top:14px;max-width:640px}
  .exp-arrow{width:36px;height:36px;border-radius:50%;border:1px solid var(--rule);display:grid;place-items:center;color:var(--ink-3);justify-self:end;transition:.2s;font-size:14px}
  .exp-job:hover .exp-arrow{background:var(--amber);color:var(--amber-ink);border-color:var(--amber);transform:rotate(-45deg)}

  .case-grid{display:flex;flex-direction:column;gap:32px}
  .case-card{display:grid;grid-template-columns:1.1fr 1fr;gap:0;border:1px solid var(--rule);border-radius:16px;overflow:hidden;background:linear-gradient(180deg,var(--card-bg-from),var(--card-bg-to));transition:transform .3s, border-color .3s, box-shadow .3s;cursor:pointer}
  .case-card:hover{transform:translateY(-3px);border-color:rgba(245,177,76,.4);box-shadow:var(--shadow-strong)}
  .case-card:focus-visible{outline:2px solid var(--amber);outline-offset:3px}
  .case-card:hover .case-link{color:var(--amber);border-color:var(--amber)}
  .case-visual{aspect-ratio:auto;min-height:340px;position:relative;overflow:hidden;border-right:1px solid var(--rule);background:linear-gradient(135deg,#2a1f0e 0%,#0b132a 100%)}
  .case-visual .badge{position:absolute;top:18px;left:18px;font-family:'Manrope',sans-serif;font-weight:600;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink);padding:6px 10px;background:rgba(0,0,0,.5);backdrop-filter:blur(8px);border-radius:4px;z-index:2}
  .case-visual .yr{position:absolute;top:18px;right:18px;font-family:'Manrope',sans-serif;font-weight:500;font-size:11px;color:var(--ink-2);z-index:2;background:rgba(0,0,0,.5);backdrop-filter:blur(8px);padding:6px 10px;border-radius:4px}
  .case-image-wrap{position:absolute;inset:0;overflow:hidden}
  .case-image-wrap::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.35) 100%),linear-gradient(90deg,rgba(0,0,0,.18),transparent 30%);pointer-events:none}
  .case-image-wrap img{width:100%;height:100%;object-fit:cover;object-position:center}

  .case-content{padding:36px 40px;display:flex;flex-direction:column;justify-content:center;gap:16px}
  .case-tags{display:flex;flex-wrap:wrap;gap:6px}
  .case-tags .tag{font-family:'Manrope',sans-serif;font-weight:500;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--ink-3);padding:4px 10px;border:1px solid var(--rule);border-radius:999px}
  .case-content h3{font-family:'Newsreader',serif;font-weight:400;font-size:36px;line-height:1.05;letter-spacing:-.015em}
  .case-role{font-family:'Manrope',sans-serif;font-weight:500;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--ink-3)}
  .case-role b{color:var(--amber);font-weight:500}
  .case-content p{color:var(--ink-2);font-size:15px;line-height:1.55;max-width:520px}
  .case-outcomes{display:grid;grid-template-columns:auto 1fr;gap:24px;padding-top:18px;border-top:1px solid var(--rule);margin-top:8px;align-items:start}
  .case-outcomes .o .n{font-family:'Newsreader',serif;font-size:24px;font-weight:400;line-height:1.1;letter-spacing:-.01em;color:var(--ink)}
  .case-outcomes .o .n.small{font-size:14px;line-height:1.45;color:var(--ink-2);font-family:'Manrope',sans-serif;font-weight:400}
  .case-outcomes .o .l{font-family:'Manrope',sans-serif;font-weight:600;font-size:9px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.15em;margin-top:6px}
  .case-actions{display:flex;gap:18px;margin-top:6px;flex-wrap:wrap}
  .case-link{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-2);font-weight:500;width:fit-content;padding-bottom:4px;border-bottom:1px solid var(--ink-4);transition:.2s;cursor:pointer}
  .case-link:hover{color:var(--amber);border-color:var(--amber)}
  .case-link.soft{color:var(--ink-3);border-color:transparent}
  .case-link.soft:hover{color:var(--amber)}

  .showreel{padding:80px 0}
  .showreel-frame{position:relative;width:100%;border-radius:18px;overflow:hidden;border:1px solid var(--rule);background:var(--bg-2);box-shadow:0 30px 60px -24px rgba(0,0,0,.45)}
  .showreel-placeholder{width:100%;aspect-ratio:16/9;max-height:75vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,var(--bg-3),var(--bg-2))}
  .showreel-spinner{width:36px;height:36px;border:2px solid rgba(245,177,76,.15);border-top-color:var(--amber);border-radius:50%;animation:showreel-spin .8s linear infinite}
  @keyframes showreel-spin{to{transform:rotate(360deg)}}
  .showreel-video{width:100%;max-height:75vh;object-fit:cover;display:block}

  .quotes{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  .quote{border:1px solid var(--rule);border-radius:14px;padding:36px;display:flex;flex-direction:column;gap:24px;background:linear-gradient(180deg,rgba(245,177,76,.03),transparent)}
  .quote-rating{display:flex;gap:3px}
  .quote-rating i{color:var(--amber);font-style:normal;font-size:14px}
  .quote-body{font-family:'Newsreader',serif;font-size:24px;font-weight:400;line-height:1.3;letter-spacing:-.005em;color:var(--ink)}
  .quote-foot{display:flex;align-items:center;gap:14px;margin-top:auto;padding-top:20px;border-top:1px solid var(--rule)}
  .qavatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--amber),#a06b18);display:grid;place-items:center;color:var(--amber-ink);font-family:'Newsreader',serif;font-weight:600;font-size:18px;flex-shrink:0}
  .qname{font-weight:600;font-size:15px;color:var(--ink)}
  .qrole{font-size:12px;color:var(--ink-3);margin-top:2px}

  .cta-section{padding:120px 0;border-top:1px solid var(--rule)}
  .cta-card{border:1px solid var(--rule);border-radius:20px;padding:64px;background:radial-gradient(60% 80% at 100% 0%,rgba(245,177,76,.18),transparent 60%),radial-gradient(80% 100% at 0% 100%,rgba(76,175,125,.08),transparent 60%),var(--card-bg-from);display:grid;grid-template-columns:1.4fr 1fr;gap:48px;align-items:center;position:relative;overflow:hidden}
  .cta-card h2{font-family:'Newsreader',serif;font-weight:400;font-size:clamp(32px,3.4vw,46px);line-height:1.05;letter-spacing:-.02em}
  .cta-card p{color:var(--ink-2);font-size:16px;margin-top:16px;line-height:1.55;max-width:440px}
  .cta-actions{display:flex;flex-direction:column;gap:12px}
  .cta-actions .btn-primary,.cta-actions .btn-secondary{justify-content:center}
  .cta-channels{margin-top:18px;padding-top:18px;border-top:1px solid var(--rule);font-family:'Manrope',sans-serif;font-weight:500;font-size:11px;color:var(--ink-3);letter-spacing:.04em;display:flex;flex-direction:column;gap:8px}
  .cta-channels b{color:var(--ink);font-weight:500}
  .cta-channels a{color:var(--ink-2);border-bottom:1px dashed var(--ink-4)}
  .cta-channels a:hover{color:var(--amber);border-color:var(--amber)}

  footer{padding:48px 0 60px;border-top:1px solid var(--rule)}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:48px;align-items:start}
  .footer-grid .col p{color:var(--ink-3);font-size:13px;max-width:300px;line-height:1.6}
  .footer-grid .col h4{font-family:'Manrope',sans-serif;font-weight:600;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3);margin-bottom:14px}
  .footer-grid .col ul{list-style:none;display:flex;flex-direction:column;gap:8px}
  .footer-grid .col ul a{font-size:14px;color:var(--ink-2);transition:color .15s}
  .footer-grid .col ul a:hover{color:var(--amber)}
  .footer-base{margin-top:48px;padding-top:24px;border-top:1px solid var(--rule);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-family:'Manrope',sans-serif;font-weight:500;font-size:11px;color:var(--ink-4);letter-spacing:.1em}

  /* Responsive */
  @media (max-width:1280px){
    .container{padding:0 32px}
    .topbar-inner{padding:14px 32px}
  }
  @media (max-width:1100px){
    .hero-grid{gap:48px}
    .about-grid{gap:36px}
    .cta-card{padding:48px;gap:36px}
    .nav-links{gap:20px}
    .nav-links a{font-size:13px}
  }
  @media (max-width:980px){
    section{padding:80px 0}
    .hero{padding:60px 0 40px}
    .hero-grid,.about-grid,.cta-card,.case-card,.impact-grid{grid-template-columns:1fr;gap:32px}
    .portrait-wrap{max-width:520px;margin:0 auto;width:100%}
    .case-visual{border-right:0;border-bottom:1px solid var(--rule);min-height:280px}
    .metrics,.metrics.three{grid-template-columns:1fr 1fr}
    .metrics .m{border-right:1px solid var(--rule);border-bottom:1px solid var(--rule)}
    .metrics .m:nth-child(2n){border-right:0}
    .metrics .m:nth-last-child(-n+2){border-bottom:0}
    .quotes,.footer-grid{grid-template-columns:1fr}
    .section-head{gap:14px;margin-bottom:40px}
    .exp-job{grid-template-columns:140px 1fr;gap:24px}
    .exp-arrow{display:none}
    .nav-links{display:none}
    .case-content{padding:28px}
    .bio-card,.cta-card{padding:32px}
  }
  @media (max-width:760px){
    .hero h1{font-size:clamp(46px,12vw,72px)}
    .hero-subhead{font-size:17px}
    .section-head h2,.cta-card h2{font-size:clamp(26px,5.5vw,36px)}
    .case-content h3{font-size:28px}
    .metrics .m .num{font-size:48px}
    .quote-body{font-size:20px}
    .top-cta{padding:8px 12px;font-size:12px}
    .brand-name span{display:none}
  }
  @media (max-width:600px){
    .container{padding:0 20px}
    .topbar-inner{padding:12px 20px}
    section{padding:64px 0}
    .hero{padding:32px 0 28px}
    .hero-meta{gap:16px 24px;padding:20px 0}
    .hero-actions{gap:10px}
    .btn-primary,.btn-secondary{flex:1;justify-content:center;padding:12px 16px;font-size:14px}
    .btn-text{width:100%;text-align:center}
    .metrics,.metrics.three{grid-template-columns:1fr}
    .metrics .m{border-right:0;padding:28px 22px}
    .metrics .m:last-child{border-bottom:0}
    .case-outcomes{grid-template-columns:1fr;gap:14px}
    .case-content{padding:24px;gap:14px}
    .case-content h3{font-size:24px}
    .bio-card,.cta-card{padding:24px}
    .info-card,.skills-card,.quote{padding:22px}
    .exp-job{grid-template-columns:1fr;gap:12px;padding:24px 16px}
    .exp-when{flex-direction:row;flex-wrap:wrap;gap:10px 16px}
    .exp-body h3{font-size:24px}
    .case-image-wrap{padding:32px}
    .footer-base{flex-direction:column;align-items:flex-start;gap:8px}
  }
  @media (max-width:380px){
    .hero h1{font-size:38px}
    .hero-actions{flex-direction:column;align-items:stretch}
    .btn-primary,.btn-secondary{width:100%}
    .top-cta{padding:7px 10px;font-size:11px;gap:4px}
    .brand-mark{width:30px;height:30px;font-size:12px}
    .brand-name{font-size:13px}
  }
`;
