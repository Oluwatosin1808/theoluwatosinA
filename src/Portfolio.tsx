import { useState } from 'react';
import CaseStudyModal, { CaseStudyData } from './components/CaseStudyModal';
import { dreamAiCaseStudy, codelessAgencyCaseStudy, nesoCaseStudy } from './caseStudies';

const portraitImage = new URL('../img/me.png', import.meta.url).href;

type ProjectShape = {
  title: string;
  category: string;
  summary: string;
  metrics: string;
  outcome: string;
  caseStudy?: CaseStudyData;
  liveUrl?: string;
};

const dreamAiProject: ProjectShape = {
  title: 'DreamAI',
  category: 'AI / Wellness',
  summary: 'An Azure OpenAI-powered platform that interprets dream journals and surfaces wellness signals.',
  metrics: '+38% D7 retention',
  outcome: 'Designed and shipped solo, end-to-end, in six weeks.',
  caseStudy: dreamAiCaseStudy,
  liveUrl: 'https://dreamai-52691.bubbleapps.io/version-test',
};
const shyneProject: ProjectShape = {
  title: 'Shyne Africa',
  category: 'Fintech · Mobile',
  summary: "Pan-African neobank's KYC and home surface, redesigned.",
  metrics: '92% KYC completion',
  outcome: 'Doubled KYC completion in a single quarter.',
  caseStudy: nesoCaseStudy,
};
const jrunProject: ProjectShape = {
  title: 'JRUN Global',
  category: 'EdTech · Design System',
  summary: 'A 120-token design system across student web, tutor portal, and admin.',
  metrics: '−70% review time',
  outcome: 'Three surfaces migrated across eight sprints.',
  caseStudy: codelessAgencyCaseStudy,
};

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<ProjectShape | null>(null);

  const openCase = (p: ProjectShape) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveProject(p);
  };

  return (
    <>
      <style>{styles}</style>

      <header className="topbar">
        <div className="topbar-inner">
          <a href="#top" className="brand">
            <div className="brand-mark">O</div>
            <div className="brand-name">Oluwatosin Adelaja <span>· Senior Product Designer</span></div>
          </a>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#work">Selected Work</a>
            <a href="#testimonials">Recommendations</a>
          </nav>
          <a href="#contact" className="top-cta">Schedule interview →</a>
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
                  <span>Open to senior &amp; staff roles · Q3 2026</span>
                </div>
                <h1>Senior Product Designer with a builder's <em>discipline</em>.</h1>
                <p className="hero-subhead">
                  Six years shipping <strong>fintech, EdTech, and AI</strong> products from zero to scale.
                  I lead end-to-end — research, design systems, and frontend delivery — for teams that want
                  one collaborator instead of three.
                </p>

                <div className="hero-meta">
                  <div className="item">
                    <span className="k">Location</span>
                    <span className="v">Lagos · open to relocation</span>
                  </div>
                  <div className="item">
                    <span className="k">Experience</span>
                    <span className="v"><em>6</em> years</span>
                  </div>
                  <div className="item">
                    <span className="k">Currently</span>
                    <span className="v">Design Engineer · Codeless</span>
                  </div>
                  <div className="item">
                    <span className="k">Visa</span>
                    <span className="v">Eligible · UK/EU/US</span>
                  </div>
                </div>

                <div className="hero-actions">
                  <a href="#" className="btn-primary">Download CV (PDF)<span className="arr">↓</span></a>
                  <a href="#contact" className="btn-secondary">Schedule a 30-min call</a>
                  <a href="mailto:hello@oluwatosin.design" className="btn-text">hello@oluwatosin.design</a>
                </div>
              </div>

              <div className="portrait-wrap">
                <div className="portrait">
                  <div className="corner-tag">Lagos · 2026</div>
                  <img src={portraitImage} alt="Portrait of Oluwatosin Adelaja" className="portrait-img" />
                </div>
                <div className="portrait-caption">
                  <span>Available · taking interviews</span>
                  <span><span className="star">★</span> 4.9 / 5.0 · 18 clients</span>
                </div>
              </div>
            </div>

            {/* LOGO WALL */}
            <div className="logo-wall">
              <div className="lw-header">
                <span className="label">// Trusted by founders &amp; teams at</span>
                <span className="right">2020 — present · 18 engagements</span>
              </div>
              <div className="logos">
                <div className="logo"><span className="name">Codeless</span></div>
                <div className="logo"><span className="name bold">JRUN&nbsp;Global</span></div>
                <div className="logo"><span className="name">Shyne&nbsp;Africa</span></div>
                <div className="logo"><span className="name bold">Coinly</span></div>
                <div className="logo"><span className="name">DreamAI</span></div>
                <div className="logo"><span className="name bold">+&nbsp;13&nbsp;more</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section id="impact" style={{ borderTop: 0 }}>
          <div className="container">
            <div className="section-head">
              <div className="meta">
                <span className="num">01</span>
                <span className="eyebrow">Impact at a glance</span>
              </div>
              <div>
                <h2>Numbers that hiring managers can <em>verify</em>.</h2>
                <p className="lede">Aggregated outcomes across the last 18 engagements. References available on request.</p>
              </div>
            </div>

            <div className="metrics">
              <div className="m">
                <span className="num"><em>40</em><sub>+</sub></span>
                <span className="label">Products shipped</span>
                <span className="desc">Mobile, web, internal tools — production code, not just prototypes.</span>
              </div>
              <div className="m">
                <span className="num"><em>$12</em>M<sub>+</sub></span>
                <span className="label">Funding helped raise</span>
                <span className="desc">Pitch decks, investor demos, and product UX for seed → Series A.</span>
              </div>
              <div className="m">
                <span className="num">×<em>2.4</em></span>
                <span className="label">Avg activation lift</span>
                <span className="desc">Median uplift on onboarding flows I redesigned (n=11).</span>
              </div>
              <div className="m">
                <span className="num"><em>4.9</em><sub>/5</sub></span>
                <span className="label">Client satisfaction</span>
                <span className="desc">From the last 18 engagements. 14 led to repeat business.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="container">
            <div className="section-head">
              <div className="meta">
                <span className="num">02</span>
                <span className="eyebrow">About me</span>
              </div>
              <div>
                <h2>A <em>generalist's range</em>, a specialist's depth.</h2>
                <p className="lede">The short version: I lead product design end-to-end and ship the frontend so you don't pay for the handoff twice.</p>
              </div>
            </div>

            <div className="about-grid">
              <div className="paper-card">
                <span className="pin"></span>
                <h3>Hi — I'm <em>Oluwatosin</em>.</h3>
                <p>I started as a product designer in 2020 and got curious enough about <strong>code</strong> that I learned to ship it myself. Six years later, I work at the seam between design and engineering — leading research, owning systems, and writing the production frontend for the same teams I design for.</p>
                <p>My happy place is the messy middle: when the strategy is half-baked, the constraints aren't obvious yet, and someone has to make the first decision. I've done that for fintechs, EdTech platforms, and most recently an AI wellness product I helped build solo from scratch.</p>
                <p>I'm looking for a <strong>senior or staff role</strong> at a product-led team — somewhere I can mentor, ship, and stay close to users. Permanent or contract; remote, hybrid, or relocating.</p>
                <div className="signoff">
                  <span>— Lagos, April 2026</span>
                  <span className="signature">Oluwatosin</span>
                </div>
              </div>

              <div className="about-side">
                <div className="info-card">
                  <div className="label">// Quick facts</div>
                  <div className="row"><span className="k">Years of experience</span><span className="v"><em>6</em> years</span></div>
                  <div className="row"><span className="k">Current role</span><span className="v">Design Engineer</span></div>
                  <div className="row"><span className="k">Seeking</span><span className="v">Senior · Staff · Lead</span></div>
                  <div className="row"><span className="k">Engagement</span><span className="v">FTE · Contract · 4–12 wk</span></div>
                  <div className="row"><span className="k">Location</span><span className="v">Lagos · GMT+1</span></div>
                  <div className="row"><span className="k">Relocation</span><span className="v">Open · UK · EU · US · Remote</span></div>
                  <div className="row"><span className="k">Languages</span><span className="v">English · Yoruba</span></div>
                  <div className="row"><span className="k">Notice</span><span className="v">≤ 4 weeks</span></div>
                </div>

                <div className="skills-card">
                  <div className="label">// Core skills</div>
                  <div className="skills-list">
                    {['Product Design','UX Strategy','Design Systems','User Research','Prototyping','Design Engineering','Frontend (React / Next.js)','No-Code Delivery','Mentorship','Stakeholder Management'].map(s => (
                      <span key={s} className="skill">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="container">
            <div className="section-head">
              <div className="meta">
                <span className="num">03</span>
                <span className="eyebrow">Experience</span>
              </div>
              <div>
                <h2>Six years, four <em>focused</em> chapters.</h2>
                <p className="lede">A snapshot of recent roles, the teams I've shipped alongside, and the outcomes that mattered.</p>
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
                    <ul>
                      {j.bullets.map((b, k) => <li key={k} dangerouslySetInnerHTML={{ __html: b }} />)}
                    </ul>
                  </div>
                  <span className="exp-arrow">→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section id="work">
          <div className="container">
            <div className="section-head">
              <div className="meta">
                <span className="num">04</span>
                <span className="eyebrow">Selected work</span>
              </div>
              <div>
                <h2>Three <em>case studies</em>, end-to-end.</h2>
                <p className="lede">Chosen for the messy middle, not the pretty pixels. Each shipped, measured, and documented.</p>
              </div>
            </div>

            <div className="case-grid">
              <article className="case-card">
                <div className="case-visual amber">
                  <span className="badge">CASE 01 · DreamAI</span>
                  <span className="yr">2025</span>
                  <div className="case-mock">
                    <div className="hdr"><i></i><i></i><i></i></div>
                    <div className="body">
                      <div className="skel w30"></div>
                      <div className="skel w70" style={{ height: 18 }}></div>
                      <div className="skel w50" style={{ height: 12 }}></div>
                      <div style={{ display: 'flex', gap: 8 }}><div className="skel h36" style={{ flex: 1 }}></div><div className="skel h36" style={{ flex: 1 }}></div></div>
                      <div className="skel tall"></div>
                    </div>
                  </div>
                </div>
                <div className="case-content">
                  <div className="case-tags">
                    <span className="tag">AI / Wellness</span>
                    <span className="tag">Mobile + Web</span>
                    <span className="tag">2025</span>
                  </div>
                  <span className="case-role">Role · <b>Lead designer + frontend</b> · 6 weeks</span>
                  <h3>DreamAI — turning <em>journal entries</em> into wellness insights.</h3>
                  <p>An Azure OpenAI-powered platform that interprets dream journals, surfaces wellness signals, and runs personalized check-ins. Designed and shipped solo end-to-end.</p>
                  <div className="case-outcomes">
                    <div className="o"><div className="n"><em>+38</em>%</div><div className="l">D7 retention</div></div>
                    <div className="o"><div className="n">×<em>2.4</em></div><div className="l">Activation</div></div>
                    <div className="o"><div className="n"><em>6</em>w</div><div className="l">Idea → live</div></div>
                  </div>
                  <a href="#" className="case-link" onClick={openCase(dreamAiProject)}>Read full case study →</a>
                </div>
              </article>

              <article className="case-card">
                <div className="case-visual blue">
                  <span className="badge">CASE 02 · Shyne Africa</span>
                  <span className="yr">2024</span>
                  <div className="case-mock">
                    <div className="hdr"><i></i><i></i><i></i></div>
                    <div className="body">
                      <div className="skel w50"></div>
                      <div className="skel w70" style={{ height: 20 }}></div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <div className="skel h36" style={{ flex: 1, background: 'linear-gradient(135deg,#f5b14c,#a06b18)' }}></div>
                        <div className="skel h36" style={{ flex: 1 }}></div>
                        <div className="skel h36" style={{ flex: 1 }}></div>
                      </div>
                      <div className="skel w30"></div>
                      <div className="skel tall"></div>
                    </div>
                  </div>
                </div>
                <div className="case-content">
                  <div className="case-tags">
                    <span className="tag">Fintech</span>
                    <span className="tag">Mobile</span>
                    <span className="tag">2024</span>
                  </div>
                  <span className="case-role">Role · <b>Lead Product Designer</b> · 12 months</span>
                  <h3>Shyne Africa — the founder-onboarding <em>redesigned</em>.</h3>
                  <p>Reimagined a Pan-African neobank's KYC and home surface for founders and SMEs. Made compliance feel like a conversation, not a checklist — and doubled completion in a single quarter.</p>
                  <div className="case-outcomes">
                    <div className="o"><div className="n"><em>92</em>%</div><div className="l">KYC complete</div></div>
                    <div className="o"><div className="n"><em>4.7</em>★</div><div className="l">App store</div></div>
                    <div className="o"><div className="n"><em>+47</em>%</div><div className="l">Card adds</div></div>
                  </div>
                  <a href="#" className="case-link" onClick={openCase(shyneProject)}>Read full case study →</a>
                </div>
              </article>

              <article className="case-card">
                <div className="case-visual green">
                  <span className="badge">CASE 03 · JRUN Global</span>
                  <span className="yr">2024</span>
                  <div className="case-mock">
                    <div className="hdr"><i></i><i></i><i></i></div>
                    <div className="body">
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <div className="skel" style={{ width: 40, height: 40, borderRadius: 6 }}></div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <div className="skel w70"></div>
                          <div className="skel w50"></div>
                        </div>
                      </div>
                      <div className="skel w30" style={{ background: 'var(--amber)' }}></div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, flex: 1 }}>
                        <div className="skel" style={{ background: 'linear-gradient(180deg,#1a2347,#0b132a)', borderRadius: 6 }}></div>
                        <div className="skel" style={{ background: 'linear-gradient(180deg,#1a2347,#0b132a)', borderRadius: 6 }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="case-content">
                  <div className="case-tags">
                    <span className="tag">EdTech</span>
                    <span className="tag">Design System</span>
                    <span className="tag">2024</span>
                  </div>
                  <span className="case-role">Role · <b>Senior Product Designer</b> · 14 months</span>
                  <h3>JRUN Global — a system built for <em>scale</em>.</h3>
                  <p>Built a 120-token design system and React component library across student web, tutor portal, and admin. Migration shipped across eight sprints and review cycles dropped 70%.</p>
                  <div className="case-outcomes">
                    <div className="o"><div className="n"><em>120</em></div><div className="l">Tokens</div></div>
                    <div className="o"><div className="n"><em>−70</em>%</div><div className="l">Review time</div></div>
                    <div className="o"><div className="n"><em>3</em></div><div className="l">Surfaces</div></div>
                  </div>
                  <a href="#" className="case-link" onClick={openCase(jrunProject)}>Read full case study →</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials">
          <div className="container">
            <div className="section-head">
              <div className="meta">
                <span className="num">05</span>
                <span className="eyebrow">Recommendations</span>
              </div>
              <div>
                <h2>What managers and <em>founders</em> have said.</h2>
                <p className="lede">References available on request — additional recommendations on LinkedIn.</p>
              </div>
            </div>

            <div className="quotes">
              {quotes.map((q, i) => (
                <figure className="quote" key={i}>
                  <div className="quote-rating">{Array.from({ length: 5 }).map((_, k) => <i key={k}>★</i>)}</div>
                  <blockquote className="quote-body" dangerouslySetInnerHTML={{ __html: q.body }} />
                  <figcaption className="quote-foot">
                    <div className="qavatar">{q.initial}</div>
                    <div>
                      <div className="qname">{q.name}</div>
                      <div className="qrole" dangerouslySetInnerHTML={{ __html: q.role }} />
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
                <span className="eyebrow">// Hiring for senior or staff design</span>
                <h2 style={{ marginTop: 14 }}>Let's see if there's a <em>fit</em>.</h2>
                <p>I respond to every recruiter and hiring manager within 48 hours. Send a JD, a brief, or just a "got 15 minutes?" — I'll bring portfolio references, salary expectations, and a clear yes/no.</p>
              </div>
              <div className="cta-actions">
                <a href="#" className="btn-primary">Download CV (PDF)<span className="arr">↓</span></a>
                <a href="#" className="btn-secondary" style={{ borderColor: 'rgba(245,177,76,.3)', color: 'var(--amber)' }}>Schedule 30-min interview →</a>
                <div className="cta-channels">
                  <span><b>Email</b> · hello@oluwatosin.design</span>
                  <span><b>LinkedIn</b> · /in/oluwatosin-adelaja</span>
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
                <div className="brand-mark">O</div>
                <div className="brand-name">Oluwatosin Adelaja</div>
              </div>
              <p>Senior Product Designer based in Lagos. Available for senior, staff, and lead roles — full-time, contract, or relocation.</p>
            </div>
            <div className="col">
              <h4>Sections</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#work">Selected Work</a></li>
                <li><a href="#testimonials">Recommendations</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="col">
              <h4>Elsewhere</h4>
              <ul>
                <li><a href="#">LinkedIn ↗</a></li>
                <li><a href="#">Read.cv ↗</a></li>
                <li><a href="#">Twitter / X ↗</a></li>
                <li><a href="#">Dribbble ↗</a></li>
                <li><a href="mailto:hello@oluwatosin.design">Email ↗</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-base">
            <span>© 2026 Oluwatosin Adelaja · All rights reserved</span>
            <span>Last updated April 2026 · References on request</span>
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
    duration: '1 yr 4 mo',
    location: 'Lagos · Hybrid',
    role: 'Design Engineer',
    company: 'Codeless Solutions',
    type: 'Full-time',
    summary: "Hired to bridge design and engineering across two product lines. Led the end-to-end design and frontend delivery of DreamAI, an Azure OpenAI-powered wellness app, from blank canvas to live users in six weeks.",
    bullets: [
      '<b>Lifted D7 retention by 38%</b> with a redesigned onboarding journal flow informed by 22 user interviews.',
      '<b>Reduced design-to-launch cycle by 58%</b> by running design and frontend together, cutting handoff overhead.',
      'Mentored two junior designers and rolled out a Figma component library now used across the agency.',
    ],
  },
  {
    dates: '2024 — 2025',
    duration: '1 yr 2 mo',
    location: 'Remote · Contract',
    role: 'Senior Product Designer',
    company: 'JRUN Global',
    type: 'Contract · EdTech',
    summary: "Owned the design system and UX architecture for an EdTech platform serving 40,000 students and 2,500 tutors across three surfaces (student web, tutor portal, admin).",
    bullets: [
      '<b>Built a 120-token design system</b> from scratch; cut design-review cycle time by 70%.',
      '<b>Increased tutor-application completion by 47%</b> via a redesigned multi-step onboarding.',
      'Partnered with 3 engineers to ship a React component library; documented in Storybook.',
    ],
  },
  {
    dates: '2023 — 2024',
    duration: '1 yr',
    location: 'Remote · Full-time',
    role: 'Lead Product Designer',
    company: 'Shyne Africa',
    type: 'Full-time · Fintech',
    summary: "First design hire. Built the design function from zero — research practice, design system, and weekly review rituals — for a Pan-African neobank serving founders and SMEs.",
    bullets: [
      '<b>Drove 92% KYC completion</b> (industry avg ~65%) on the founder-onboarding redesign.',
      '<b>Grew app-store rating from 3.6 to 4.7</b> across two release cycles.',
      'Hired and onboarded a mid-level designer; established the design-engineering partnership.',
    ],
  },
  {
    dates: '2020 — 2023',
    duration: '3 yrs',
    location: 'Lagos · Independent',
    role: 'Independent Product & Brand Designer',
    company: 'Self-employed',
    type: 'Contract · 12 clients',
    summary: 'Shipped 12 production engagements across fintech, EdTech, and SaaS. Took clients from briefs and Figma boards into live products — and learned no-code as a delivery medium.',
    bullets: [
      'Helped <b>4 founders raise a combined $12M</b> with pitch UX, demo flows, and live MVPs.',
      'Maintained a <b>4.9/5.0 client satisfaction</b> rating across 18 engagements (incl. earlier years).',
      'Wrote a weekly design newsletter (1,200 subscribers) and mentored 9 early-career designers.',
    ],
  },
];

const quotes = [
  {
    initial: 'A',
    body: '"Oluwatosin translated our product vision into a <em>clean, scalable system</em>. The new onboarding flow lifted activation within weeks — and his frontend delivery saved us a contractor."',
    name: 'Aaron Israel',
    role: '<b>CEO</b>, Codeless Solutions · worked with Oluwatosin in 2025',
  },
  {
    initial: 'G',
    body: '"From strategy to ship, every detail was <em>intentional</em>. He\'s the rare designer who lifts the whole team — engineering, PM, founders. I\'d hire him again tomorrow."',
    name: 'Godwin Okechukwu',
    role: '<b>Founder</b>, Shyne Africa · managed Oluwatosin 2023–24',
  },
  {
    initial: 'N',
    body: '"He onboarded faster than anyone we\'ve hired. Shipped a usable v1 of the design system in his <em>first month</em> and mentored two juniors before his first review."',
    name: 'Nkechi Eze',
    role: '<b>VP Product</b>, JRUN Global · managed Oluwatosin 2024–25',
  },
  {
    initial: 'D',
    body: '"He thinks like a PM, designs like a senior, and ships like an engineer. <em>Three hires in one</em> — and the team feels it."',
    name: 'David Ojo',
    role: '<b>Engineering Lead</b>, JRUN Global · partnered 2024–25',
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Manrope:wght@400;500;600;700&display=swap');

  :root{
    --bg:#0b132a; --bg-2:#111c3d; --bg-3:#16244c;
    --paper:#f4ecdb; --paper-2:#ebe1ca; --paper-ink:#1a1208;
    --rule:#1d2a52; --rule-paper:#d6c9a8;
    --ink:#f4ecdb; --ink-2:#d2cab6; --ink-3:#8b94b1; --ink-4:#4f5a82;
    --amber:#e8a64c; --amber-2:#f5c073; --amber-ink:#2a1c08; --green:#4caf7d;
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

  .serif{font-family:'Newsreader',serif;font-weight:400;letter-spacing:-.01em}
  .mono{font-family:'Manrope',sans-serif}
  .eyebrow{font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-3)}
  .container{max-width:1400px;margin:0 auto;padding:0 clamp(24px,5vw,80px)}

  /* Neutralize italic/colored emphasis inside headings (was an AI tell) */
  h1 em, h2 em, h3 em, h4 em,
  .hero h1 em, .section-head h2 em, .case-content h3 em,
  .paper-card h3 em, .cta-card h2 em, .quote-body em{
    font-style:normal !important;color:inherit !important;
  }

  .topbar{position:sticky;top:0;z-index:60;background:rgba(11,19,42,.85);backdrop-filter:blur(14px) saturate(140%);border-bottom:1px solid var(--rule)}
  .topbar-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 40px;max-width:1400px;margin:0 auto}
  .brand{display:flex;align-items:center;gap:12px}
  .brand-mark{width:34px;height:34px;border-radius:6px;background:linear-gradient(135deg,var(--amber),#a26b1c);display:grid;place-items:center;color:var(--amber-ink);font-family:'Newsreader',serif;font-weight:600;font-size:18px}
  .brand-name{font-weight:500;font-size:15px;letter-spacing:-.01em}
  .brand-name span{color:var(--ink-3);font-weight:400}
  .nav-links{display:flex;gap:28px}
  .nav-links a{font-size:14px;color:var(--ink-2);transition:color .15s}
  .nav-links a:hover{color:var(--ink)}
  .top-cta{display:inline-flex;align-items:center;gap:8px;padding:9px 18px;border-radius:6px;background:var(--amber);color:var(--amber-ink);font-weight:600;font-size:13px}
  .top-cta:hover{background:var(--amber-2)}

  .hero{padding:80px 0 60px}
  .hero-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:64px;align-items:center}
  .availability{display:inline-flex;align-items:center;gap:10px;padding:7px 14px;border-radius:999px;background:rgba(76,175,125,.12);border:1px solid rgba(76,175,125,.3);font-family:'Manrope',sans-serif;font-size:11px;color:#86d6a8;letter-spacing:.12em;text-transform:uppercase;margin-bottom:28px}
  .availability .pip{width:7px;height:7px;border-radius:50%;background:#4caf7d;box-shadow:0 0 8px #4caf7d}

  .hero h1{font-family:'Newsreader',serif;font-weight:400;font-size:clamp(44px,5vw,76px);line-height:1.05;letter-spacing:-.025em;margin-bottom:24px;text-wrap:balance}
  .hero h1 em{font-style:italic;color:var(--amber)}
  .hero-subhead{font-size:20px;color:var(--ink-2);max-width:560px;line-height:1.5;margin-bottom:32px}
  .hero-subhead strong{color:var(--ink);font-weight:600}

  .hero-meta{display:flex;flex-wrap:wrap;gap:28px 40px;padding:24px 0;margin-bottom:32px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
  .hero-meta .item{display:flex;flex-direction:column;gap:4px}
  .hero-meta .k{font-family:'Manrope',sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3)}
  .hero-meta .v{font-size:15px;color:var(--ink);font-weight:500}
  .hero-meta .v em{font-family:'Newsreader',serif;font-style:italic;color:var(--amber);font-weight:400;font-size:18px;margin-right:2px}

  .hero-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
  .btn-primary{display:inline-flex;align-items:center;gap:10px;padding:14px 22px;border-radius:8px;background:var(--amber);color:var(--amber-ink);font-weight:600;font-size:15px;transition:transform .15s, background .15s}
  .btn-primary:hover{background:var(--amber-2)}
  .btn-primary .arr{font-family:'Newsreader',serif;font-size:18px}
  .btn-secondary{display:inline-flex;align-items:center;gap:10px;padding:14px 22px;border-radius:8px;border:1px solid var(--rule);background:transparent;color:var(--ink);font-weight:500;font-size:15px;transition:border-color .15s, background .15s}
  .btn-secondary:hover{border-color:var(--ink-3);background:rgba(255,255,255,.03)}
  .btn-text{font-size:14px;color:var(--ink-3);padding:14px 8px;border-bottom:1px solid var(--ink-4);transition:color .15s, border-color .15s}
  .btn-text:hover{color:var(--amber);border-color:var(--amber)}

  .portrait-wrap{position:relative}
  .portrait{position:relative;aspect-ratio:4/5;border-radius:12px;overflow:hidden;background:linear-gradient(180deg,#2a1f0e 0%,#0b132a 100%);border:1px solid var(--rule)}
  .portrait::before{content:'';position:absolute;inset:0;background:radial-gradient(80% 60% at 50% 35%,rgba(245,177,76,.18) 0%,transparent 60%),repeating-linear-gradient(45deg,transparent 0 8px,rgba(245,177,76,.05) 8px 9px);pointer-events:none;z-index:1}
  .portrait-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 25%}
  .portrait .corner-tag{position:absolute;top:16px;left:16px;font-family:'Manrope',sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-2);background:rgba(0,0,0,.4);backdrop-filter:blur(8px);padding:6px 10px;border-radius:4px;z-index:2}
  .portrait-caption{margin-top:14px;display:flex;justify-content:space-between;align-items:center;font-family:'Manrope',sans-serif;font-size:11px;color:var(--ink-3);letter-spacing:.1em}
  .portrait-caption .star{color:var(--amber)}

  .logo-wall{margin-top:80px;padding-top:40px;border-top:1px solid var(--rule)}
  .logo-wall .lw-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:12px}
  .logo-wall .lw-header .label{font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-3)}
  .logo-wall .lw-header .right{font-family:'Manrope',sans-serif;font-size:11px;color:var(--ink-4);letter-spacing:.1em}
  .logos{display:grid;grid-template-columns:repeat(6,1fr);gap:0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
  .logos .logo{padding:24px 18px;display:grid;place-items:center;border-right:1px solid var(--rule);color:var(--ink-2);transition:color .15s, background .15s;text-align:center}
  .logos .logo:last-child{border-right:0}
  .logos .logo:hover{color:var(--amber);background:rgba(245,177,76,.04)}
  .logos .logo .name{font-family:'Newsreader',serif;font-style:italic;font-size:22px;letter-spacing:-.01em}
  .logos .logo .name.bold{font-weight:600;font-style:normal;font-family:'Manrope',sans-serif;letter-spacing:-.02em;font-size:18px}

  section{padding:100px 0;border-top:1px solid var(--rule)}
  .section-head{display:grid;grid-template-columns:240px 1fr;gap:48px;margin-bottom:60px;align-items:end}
  .section-head .meta{display:flex;flex-direction:column;gap:8px}
  .section-head .meta .num{font-family:'Newsreader',serif;font-style:italic;font-size:54px;color:var(--amber);line-height:.9}
  .section-head h2{font-family:'Newsreader',serif;font-weight:400;font-size:clamp(32px,3.4vw,46px);line-height:1.05;letter-spacing:-.02em}
  .section-head h2 em{font-style:italic;color:var(--amber)}
  .section-head .lede{font-size:16px;color:var(--ink-3);max-width:520px;margin-top:12px;line-height:1.55}

  .metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--rule);border-radius:14px;background:linear-gradient(180deg,rgba(245,177,76,.04),transparent);overflow:hidden}
  .metrics .m{padding:36px 28px;border-right:1px solid var(--rule);display:flex;flex-direction:column;gap:8px}
  .metrics .m:last-child{border-right:0}
  .metrics .m .num{font-family:'Newsreader',serif;font-size:64px;font-weight:400;line-height:.95;letter-spacing:-.02em;color:var(--ink)}
  .metrics .m .num em{font-style:italic;color:var(--amber)}
  .metrics .m .num sub{font-size:24px;color:var(--ink-3);font-style:italic;font-weight:400;vertical-align:baseline}
  .metrics .m .label{font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3);margin-top:4px}
  .metrics .m .desc{font-size:13px;color:var(--ink-2);line-height:1.5;margin-top:8px}

  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
  .paper-card{background:var(--paper);color:var(--paper-ink);border-radius:14px;padding:48px;position:relative;background-image:linear-gradient(180deg,rgba(0,0,0,.02),transparent 12%),repeating-linear-gradient(0deg,transparent 0 39px,rgba(26,18,8,.04) 39px 40px)}
  .paper-card .pin{position:absolute;top:-12px;left:48px;width:24px;height:24px;border-radius:50%;background:var(--amber);box-shadow:0 4px 8px rgba(0,0,0,.25), inset 0 -3px 6px rgba(0,0,0,.2), inset 0 3px 6px rgba(255,255,255,.3)}
  .paper-card h3{font-family:'Newsreader',serif;font-weight:400;font-size:32px;line-height:1.15;letter-spacing:-.01em;margin-bottom:20px;color:var(--paper-ink)}
  .paper-card h3 em{font-style:italic;color:#9a6b1c}
  .paper-card p{font-size:15px;color:#3a2e18;line-height:1.7;margin-bottom:14px}
  .paper-card p strong{color:var(--paper-ink);font-weight:600}
  .paper-card .signoff{margin-top:24px;padding-top:20px;border-top:1px dashed rgba(26,18,8,.2);display:flex;justify-content:space-between;align-items:center;font-family:'Manrope',sans-serif;font-size:11px;color:#6b5a3a;letter-spacing:.1em}
  .paper-card .signature{font-family:'Newsreader',serif;font-style:italic;font-size:24px;color:var(--paper-ink)}

  .about-side{display:flex;flex-direction:column;gap:24px}
  .info-card{border:1px solid var(--rule);border-radius:14px;padding:28px}
  .info-card .label{font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3);margin-bottom:16px}
  .info-card .row{display:flex;justify-content:space-between;align-items:baseline;padding:10px 0;border-bottom:1px solid var(--rule);font-size:14px}
  .info-card .row:last-child{border-bottom:0}
  .info-card .row .k{color:var(--ink-3);font-size:13px}
  .info-card .row .v{color:var(--ink);font-weight:500}
  .info-card .row .v em{font-family:'Newsreader',serif;font-style:italic;color:var(--amber);font-weight:400;font-size:16px}

  .skills-card{border:1px solid var(--rule);border-radius:14px;padding:28px}
  .skills-card .label{font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3);margin-bottom:16px}
  .skills-list{display:flex;flex-wrap:wrap;gap:8px}
  .skills-list .skill{padding:7px 13px;border-radius:6px;background:rgba(245,177,76,.08);border:1px solid rgba(245,177,76,.2);color:var(--amber-2);font-size:13px}

  .exp-grid{display:flex;flex-direction:column}
  .exp-job{display:grid;grid-template-columns:200px 1fr 60px;gap:48px;padding:32px 24px;border-top:1px solid var(--rule);align-items:start;transition:background .2s;border-radius:10px}
  .exp-job:last-child{border-bottom:1px solid var(--rule)}
  .exp-job:hover{background:linear-gradient(90deg,rgba(245,177,76,.05),rgba(245,177,76,.01) 70%,transparent)}
  .exp-when{display:flex;flex-direction:column;gap:6px}
  .exp-when .dates{font-family:'Manrope',sans-serif;font-size:13px;color:var(--ink);letter-spacing:.05em}
  .exp-when .duration{font-size:11px;color:var(--ink-4);font-family:'Manrope',sans-serif;letter-spacing:.1em}
  .exp-when .location{font-family:'Manrope',sans-serif;font-size:11px;color:var(--ink-4);margin-top:4px;letter-spacing:.05em}
  .exp-body h3{font-family:'Newsreader',serif;font-weight:500;font-size:30px;letter-spacing:-.01em;line-height:1.1}
  .exp-body .company{display:flex;align-items:center;gap:10px;margin-top:6px;font-size:14px;color:var(--amber);font-weight:500}
  .exp-body .company .type{font-family:'Manrope',sans-serif;font-size:10px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.15em;padding:2px 8px;border:1px solid var(--rule);border-radius:3px}
  .exp-body p{color:var(--ink-2);font-size:15px;line-height:1.6;margin-top:14px;max-width:640px}
  .exp-body ul{margin:14px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;max-width:640px}
  .exp-body ul li{display:flex;gap:12px;font-size:14px;color:var(--ink-2);line-height:1.55}
  .exp-body ul li::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--amber);flex-shrink:0;margin-top:9px}
  .exp-body ul li b{color:var(--ink);font-weight:600}
  .exp-arrow{width:36px;height:36px;border-radius:50%;border:1px solid var(--rule);display:grid;place-items:center;color:var(--ink-3);justify-self:end;transition:.2s;font-size:14px}
  .exp-job:hover .exp-arrow{background:var(--amber);color:var(--amber-ink);border-color:var(--amber);transform:rotate(-45deg)}

  .case-grid{display:flex;flex-direction:column;gap:32px}
  .case-card{display:grid;grid-template-columns:1.1fr 1fr;gap:40px;border:1px solid var(--rule);border-radius:16px;overflow:hidden;background:linear-gradient(180deg,var(--bg-2),var(--bg));transition:transform .3s, border-color .3s}
  .case-card:hover{transform:translateY(-3px);border-color:rgba(245,177,76,.3)}
  .case-visual{aspect-ratio:auto;min-height:340px;position:relative;overflow:hidden;border-right:1px solid var(--rule)}
  .case-visual.green{background:linear-gradient(135deg,#2a1f0e 0%,#0b132a 100%)}
  .case-visual.blue{background:linear-gradient(135deg,#0e1a3d 0%,#1a2c66 100%)}
  .case-visual.amber{background:linear-gradient(135deg,#3a2810 0%,#0b132a 100%)}
  .case-visual::before{content:'';position:absolute;inset:0;background-image:linear-gradient(var(--rule) 1px,transparent 1px),linear-gradient(90deg,var(--rule) 1px,transparent 1px);background-size:32px 32px;opacity:.2}
  .case-visual .badge{position:absolute;top:18px;left:18px;font-family:'Manrope',sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink);padding:6px 10px;background:rgba(0,0,0,.4);backdrop-filter:blur(8px);border-radius:4px;z-index:2}
  .case-visual .yr{position:absolute;top:18px;right:18px;font-family:'Manrope',sans-serif;font-size:11px;color:var(--ink-2);z-index:2}
  .case-mock{position:absolute;left:10%;right:10%;top:22%;bottom:8%;background:#0b132a;border:1px solid rgba(255,255,255,.12);border-radius:10px;overflow:hidden;box-shadow:0 30px 60px -20px rgba(0,0,0,.5)}
  .case-mock .hdr{height:24px;background:#111c3d;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:5px;padding:0 10px}
  .case-mock .hdr i{width:6px;height:6px;border-radius:50%;background:var(--ink-4)}
  .case-mock .body{padding:16px;display:flex;flex-direction:column;gap:8px;height:calc(100% - 24px)}
  .skel{height:8px;background:linear-gradient(90deg,#1a2347,#243164);border-radius:4px}
  .skel.w70{width:70%}.skel.w50{width:50%}.skel.w30{width:30%;background:var(--amber)}
  .skel.h36{height:36px;border-radius:6px}
  .skel.tall{flex:1;border-radius:6px;background:linear-gradient(180deg,#1a2347,#0b132a)}

  .case-content{padding:36px 40px;display:flex;flex-direction:column;justify-content:center;gap:18px}
  .case-tags{display:flex;flex-wrap:wrap;gap:6px}
  .case-tags .tag{font-family:'Manrope',sans-serif;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--ink-3);padding:4px 10px;border:1px solid var(--rule);border-radius:999px}
  .case-content h3{font-family:'Newsreader',serif;font-weight:400;font-size:36px;line-height:1.05;letter-spacing:-.015em}
  .case-content h3 em{font-style:italic;color:var(--amber)}
  .case-role{font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--ink-3)}
  .case-role b{color:var(--amber);font-weight:400}
  .case-content p{color:var(--ink-2);font-size:15px;line-height:1.55;max-width:480px}
  .case-outcomes{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding-top:18px;border-top:1px solid var(--rule);margin-top:8px}
  .case-outcomes .o .n{font-family:'Newsreader',serif;font-size:28px;font-weight:400;line-height:1;letter-spacing:-.01em}
  .case-outcomes .o .n em{font-style:italic;color:var(--amber)}
  .case-outcomes .o .l{font-family:'Manrope',sans-serif;font-size:9px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.15em;margin-top:6px}
  .case-link{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-2);font-weight:500;margin-top:6px;width:fit-content;padding-bottom:4px;border-bottom:1px solid var(--ink-4);transition:.2s;cursor:pointer}
  .case-link:hover{color:var(--amber);border-color:var(--amber)}

  .quotes{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  .quote{border:1px solid var(--rule);border-radius:14px;padding:36px;display:flex;flex-direction:column;gap:24px;background:linear-gradient(180deg,rgba(245,177,76,.03),transparent)}
  .quote-rating{display:flex;gap:3px}
  .quote-rating i{color:var(--amber);font-style:normal;font-size:14px}
  .quote-body{font-family:'Newsreader',serif;font-size:24px;font-weight:400;line-height:1.3;letter-spacing:-.005em;color:var(--ink)}
  .quote-body em{font-style:italic;color:var(--amber)}
  .quote-foot{display:flex;align-items:center;gap:14px;margin-top:auto;padding-top:20px;border-top:1px solid var(--rule)}
  .qavatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--amber),#a06b18);display:grid;place-items:center;color:var(--amber-ink);font-family:'Newsreader',serif;font-weight:600;font-size:18px;flex-shrink:0}
  .qname{font-weight:600;font-size:15px;color:var(--ink)}
  .qrole{font-size:12px;color:var(--ink-3);margin-top:2px}
  .qrole b{color:var(--amber);font-weight:500}

  .cta-section{padding:120px 0;border-top:1px solid var(--rule)}
  .cta-card{border:1px solid var(--rule);border-radius:20px;padding:64px;background:radial-gradient(60% 80% at 100% 0%,rgba(245,177,76,.18),transparent 60%),radial-gradient(80% 100% at 0% 100%,rgba(76,175,125,.08),transparent 60%),var(--bg-2);display:grid;grid-template-columns:1.4fr 1fr;gap:48px;align-items:center;position:relative;overflow:hidden}
  .cta-card h2{font-family:'Newsreader',serif;font-weight:400;font-size:clamp(32px,3.4vw,46px);line-height:1.05;letter-spacing:-.02em}
  .cta-card h2 em{font-style:italic;color:var(--amber)}
  .cta-card p{color:var(--ink-2);font-size:16px;margin-top:16px;line-height:1.55;max-width:440px}
  .cta-actions{display:flex;flex-direction:column;gap:12px}
  .cta-actions .btn-primary,.cta-actions .btn-secondary{justify-content:center}
  .cta-channels{margin-top:18px;padding-top:18px;border-top:1px solid var(--rule);font-family:'Manrope',sans-serif;font-size:11px;color:var(--ink-3);letter-spacing:.08em;display:flex;flex-direction:column;gap:6px}
  .cta-channels b{color:var(--ink);font-weight:500}

  footer{padding:48px 0 60px;border-top:1px solid var(--rule)}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:48px;align-items:start}
  .footer-grid .col p{color:var(--ink-3);font-size:13px;max-width:300px;line-height:1.6}
  .footer-grid .col h4{font-family:'Manrope',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3);margin-bottom:14px}
  .footer-grid .col ul{list-style:none;display:flex;flex-direction:column;gap:8px}
  .footer-grid .col ul a{font-size:14px;color:var(--ink-2);transition:color .15s}
  .footer-grid .col ul a:hover{color:var(--amber)}
  .footer-base{margin-top:48px;padding-top:24px;border-top:1px solid var(--rule);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-family:'Manrope',sans-serif;font-size:11px;color:var(--ink-4);letter-spacing:.1em}

  /* Large desktop refinement */
  @media (max-width:1280px){
    .container{padding:0 32px}
    .topbar-inner{padding:14px 32px}
  }
  /* Tablet landscape */
  @media (max-width:1100px){
    .hero-grid{gap:48px}
    .about-grid{gap:36px}
    .cta-card{padding:48px;gap:36px}
    .nav-links{gap:20px}
    .nav-links a{font-size:13px}
  }
  /* Tablet / collapse hero & two-column layouts */
  @media (max-width:980px){
    section{padding:80px 0}
    .hero{padding:60px 0 40px}
    .hero-grid,.about-grid,.cta-card,.case-card{grid-template-columns:1fr;gap:32px}
    .portrait-wrap{max-width:520px;margin:0 auto;width:100%}
    .case-visual{border-right:0;border-bottom:1px solid var(--rule);min-height:240px}
    .metrics{grid-template-columns:1fr 1fr}
    .metrics .m{border-right:1px solid var(--rule);border-bottom:1px solid var(--rule)}
    .metrics .m:nth-child(2n){border-right:0}
    .metrics .m:nth-last-child(-n+2){border-bottom:0}
    .logos{grid-template-columns:repeat(3,1fr)}
    .logos .logo:nth-child(3n){border-right:0}
    .logos .logo:nth-child(n+4){border-top:1px solid var(--rule)}
    .quotes,.footer-grid{grid-template-columns:1fr}
    .section-head{grid-template-columns:1fr;gap:16px;margin-bottom:40px}
    .exp-job{grid-template-columns:140px 1fr;gap:24px}
    .exp-arrow{display:none}
    .nav-links{display:none}
    .case-content{padding:28px}
    .paper-card,.cta-card{padding:32px}
    .logo-wall{margin-top:56px}
  }
  /* Phone landscape / large phone */
  @media (max-width:760px){
    .hero h1{font-size:clamp(38px,8vw,56px)}
    .hero-subhead{font-size:17px}
    .section-head h2,.cta-card h2{font-size:clamp(28px,6vw,38px)}
    .case-content h3{font-size:28px}
    .metrics .m .num{font-size:48px}
    .quote-body{font-size:20px}
    .top-cta{padding:8px 12px;font-size:12px}
    .brand-name span{display:none}
  }
  /* Phone */
  @media (max-width:600px){
    .container{padding:0 20px}
    .topbar-inner{padding:12px 20px}
    section{padding:64px 0}
    .hero{padding:40px 0 32px}
    .hero-meta{gap:20px 28px;padding:20px 0}
    .hero-actions{gap:10px}
    .btn-primary,.btn-secondary{flex:1;justify-content:center;padding:12px 16px;font-size:14px}
    .btn-text{width:100%;text-align:center}
    .metrics{grid-template-columns:1fr}
    .metrics .m{border-right:0;padding:28px 22px}
    .metrics .m:last-child{border-bottom:0}
    .case-outcomes{grid-template-columns:1fr 1fr;gap:14px}
    .case-content{padding:24px;gap:14px}
    .case-content h3{font-size:24px}
    .paper-card,.cta-card{padding:24px}
    .info-card,.skills-card,.quote{padding:22px}
    .exp-job{grid-template-columns:1fr;gap:12px;padding:24px 0}
    .exp-when{flex-direction:row;flex-wrap:wrap;gap:10px 16px}
    .exp-body h3{font-size:24px}
    .logos{grid-template-columns:repeat(2,1fr)}
    .logos .logo:nth-child(3n){border-right:1px solid var(--rule)}
    .logos .logo:nth-child(2n){border-right:0}
    .logos .logo:nth-child(n+3){border-top:1px solid var(--rule)}
    .logo-wall .lw-header .right{display:none}
    .footer-base{flex-direction:column;align-items:flex-start;gap:8px}
    .case-mock{left:6%;right:6%;top:28%}
  }
  /* Tiny phones */
  @media (max-width:380px){
    .hero h1{font-size:34px}
    .hero-actions{flex-direction:column;align-items:stretch}
    .btn-primary,.btn-secondary{width:100%}
    .top-cta{padding:7px 10px;font-size:11px;gap:4px}
    .brand-mark{width:30px;height:30px;font-size:16px}
    .brand-name{font-size:13px}
  }
`;
