import { CaseStudyData } from './components/CaseStudyModal';

const aaronCaseStudyImageOne = new URL('../img/case-0.webp', import.meta.url).href;
const aaronCaseStudyImageTwo = new URL('../img/case-0-2.webp', import.meta.url).href;
const artemisImage = new URL('../img/artemis.webp', import.meta.url).href;

export const codelessAgencyCaseStudy: CaseStudyData = {
  title: 'Codeless Solutions',
  category: 'Product Design + Development',
  coverMeta: [
    { label: 'Client', value: 'Codeless (codelessify.org)' },
    { label: 'Deliverable', value: 'Agency Website' },
    { label: 'Scope', value: 'Design + Development' },
    { label: 'Stack', value: 'Next.js · Tailwind CSS' },
  ],
  sections: [
    {
      eyebrow: 'Overview',
      title: 'A studio that needed a website as sharp as its work.',
      paragraphs: [
        'Codeless is a product design and no-code development agency that helps startups and growing teams build, launch, and scale digital products — without writing a single line of traditional code. With 50+ launches under their belt and a 4.9 client rating, the team already had the track record. What they needed was a website that could communicate that credibility at a glance.',
        'The brief was clear: design and build a marketing site that positions Codeless as a senior, focused studio — not another freelancer marketplace. Every pixel had to earn its place.',
      ],
      stats: [
        { num: '50+', desc: 'Projects delivered' },
        { num: '4.9★', desc: 'Average client rating' },
        { num: '4', desc: 'Core service verticals' },
      ],
    },
    {
      eyebrow: 'The Challenge',
      title: 'Competing with trust, not just traffic.',
      paragraphs: [
        'No-code agencies occupy a peculiar position in the market. Potential clients are often skeptical — they wonder whether "no-code" means cutting corners. The old site didn\'t address this fear head-on. It underplayed the quality of the work, the seniority of the team, and the depth of the process.',
        'The challenges were structural as well as visual:',
      ],
      cards: [
        { title: 'Weak first impression', body: 'The previous site lacked the visual confidence needed to convert high-value project inquiries from funded startups and established teams.' },
        { title: 'Service clarity', body: 'Four distinct service areas — design, development, brand identity, and strategy — were described inconsistently and in isolation from each other.' },
        { title: 'No social proof architecture', body: 'Strong testimonials from clients like Podium X, TeamBooster, and SpaceTime existed but weren\'t surfaced in a way that built momentum.' },
        { title: 'Low conversion pathway', body: 'Visitors had no clear next step. The call-to-action strategy was ad hoc rather than deliberate, leaving intent without a clear outlet.' },
      ],
    },
    {
      eyebrow: 'Design Process',
      title: 'From brief to build — four deliberate phases.',
      paragraphs: ['The project followed a structured process that prioritised strategy before aesthetics, and content architecture before visual styling.'],
      steps: [
        { step: '01', title: 'Discovery & Positioning', body: 'Audited the competitive landscape of no-code and boutique design agencies to understand how Codeless should position itself. Defined the core audience — early-stage startup founders and product leads — and mapped their decision-making triggers. The key insight: buyers of agency services are buying confidence. The site had to radiate it.' },
        { step: '02', title: 'Content Architecture', body: 'Structured the single-page layout around a deliberate narrative arc: attention → credibility → proof → action. Services were reframed from a list to a suite — "a complete set of services from a single senior team" — to eliminate the mental overhead of vendor coordination for the client.' },
        { step: '03', title: 'Visual Design', body: 'Developed a bold, minimal visual system in dark and light tones that communicates sophistication without sacrificing warmth. Typography was treated as the primary design element — a large editorial headline treatment anchors the hero section with the agency\'s value proposition front and centre.' },
        { step: '04', title: 'Development & Delivery', body: 'Built the site in Next.js for performance, SEO, and a scalable content foundation. Implemented a blog and learning hub as separate routes to support future content marketing. The project page structure was architected to accommodate ongoing case study additions without design rework.' },
      ],
    },
    {
      quote: {
        text: 'The goal was never to build a pretty website. It was to build a site that works as hard as the team does — turning cold visitors into warm conversations.',
        cite: 'Aaron Israel · CEO & Founder, Codeless',
      },
    },
    {
      eyebrow: 'What Was Built',
      title: 'Six sections, one coherent story.',
      paragraphs: ['Every section of the site was designed as a distinct conversion layer, not a decorative afterthought.'],
      cards: [
        { title: 'Hero with singular focus', body: 'A clean, full-width hero anchored by a single value proposition. Two CTAs funnel different intent types without competing.' },
        { title: 'Services as a suite', body: 'Four service verticals presented with custom artwork and concise copy, emphasising that a single team handles all of them. This reduces perceived coordination risk.' },
        { title: 'Project showcase', body: 'Selected work featuring Dream AI, Dryrunz, SongPact, and TeamBooster — each with a clear category label signalling range and specificity.' },
        { title: 'Team section with faces', body: 'A "people behind the pixels" section humanises the studio and counters the anonymity problem common to small agencies.' },
        { title: 'Scrolling testimonials', body: 'Client testimonials in an auto-scrolling ticker that keeps social proof in constant view without consuming vertical real estate.' },
        { title: 'Blog & Learning Hub', body: 'Standalone content routes built into the Next.js architecture for ongoing product insights, no-code tutorials, and launch playbooks.' },
      ],
    },
    {
      eyebrow: 'Technical Decisions',
      title: 'Built to be fast, scalable, and maintainable.',
      paragraphs: [
        'The technology choices were made to serve the business — not to demonstrate complexity. The priority was a site that loads instantly, ranks well, and can be extended without a developer on standby.',
        'Next.js provided server-side rendering for fast initial loads and strong SEO defaults. Routing is cleanly separated between marketing pages, blog, and the learning hub — allowing independent content updates without touching the core design.',
      ],
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'next/image', 'File-based routing', 'Blog route', 'Learning hub route'],
    },
    {
      eyebrow: 'Outcomes',
      title: 'A website that converts credibility into conversations.',
      paragraphs: ['The completed site positions Codeless as a premium, trustworthy studio for startups and growth-stage teams.'],
      results: [
        { title: 'Positioning clarity', body: 'Services are now understood as an integrated suite, removing the confusion that arose from listing them in isolation.' },
        { title: 'Persistent social proof', body: 'Testimonials from five named founders and CEOs are visible throughout the site without disrupting the primary conversion flow.' },
        { title: 'Scalable content infrastructure', body: 'The blog and learning hub are live and independently updatable, giving the team a platform to demonstrate expertise over time.' },
        { title: 'Optimised performance', body: 'Next.js server-side rendering and next/image processing deliver fast page loads and strong Core Web Vitals scores.' },
        { title: 'Dual-CTA conversion system', body: '"Book a call" and "Join the newsletter" capture both immediate project leads and long-term audience members in a single session.' },
      ],
    },
  ],
};

export const aaronIsraelCaseStudy: CaseStudyData = {
  title: 'Aaron Israel',
  category: 'No-Code Development',
  coverMeta: [
    { label: 'Status', value: 'Available for projects' },
    { label: 'Portfolio', value: 'aaron.pxxl.click' },
  ],
  sections: [
    { images: [aaronCaseStudyImageOne, aaronCaseStudyImageTwo] },
    {
      eyebrow: 'Overview',
      title: 'No-code web developer shipping production-ready websites in days.',
      paragraphs: [
        'Aaron Israel is a no-code web developer and digital product builder, specialising in shipping powerful, production-ready websites and web applications fast. Where traditional development agencies quote months, Aaron delivers in days.',
        'His philosophy is that no-code is not a compromise; it is the smarter path. He builds real architecture with real performance — not glorified templates — and ships them at a fraction of the time and cost of traditional development.',
      ],
    },
    {
      eyebrow: 'Services',
      title: 'What he builds.',
      cards: [
        { title: 'No-Code Website Development', body: 'Full-stack websites on Webflow, Framer, and Wix Studio. Faster launches, lower cost, and sites clients can manage without a developer on retainer.' },
        { title: 'MVP & Rapid Prototyping', body: 'For startups that cannot afford slow dev cycles, Aaron turns rough ideas into working products in days using Bubble, Glide, and Softr.' },
        { title: 'Automation & Workflows', body: 'Using Zapier, Make, and Airtable, Aaron connects tools and automates business processes end-to-end for fewer errors and scalable operations.' },
        { title: 'Landing Pages That Convert', body: 'Built on Framer, Webflow, and Unbounce — engineered for higher conversion rates, better ad ROI, and more leads.' },
      ],
    },
    {
      eyebrow: 'Production Pipeline',
      title: 'How he ships.',
      table: {
        headers: ['Phase', 'What Happens'] as [string, string],
        rows: [
          { col1: '01 — Strategy', col2: 'Define goals, identify users, and map what success looks like before a single pixel is placed.' },
          { col1: '02 — Structure', col2: 'Plan UX, information flow, and architecture so users always know what to do next.' },
          { col1: '03 — Build', col2: 'Develop with the right no-code tools — fast builds without sacrificing quality or scale.' },
          { col1: '04 — Optimize', col2: 'Refine performance, run conversion checks, and set up automations so the site grows with the business.' },
        ],
      },
    },
    {
      eyebrow: 'Why Clients Choose Him',
      bullets: [
        'Speed without sacrifice. What takes dev agencies three months, Aaron ships in two to three weeks.',
        'No-code, but production-ready. His builds are architected to scale, perform, and support real business growth.',
        'Scalable systems that evolve as the client business grows.',
        'Performance-focused. Every build is optimised for speed, conversion, and reliability from day one.',
      ],
    },
    {
      eyebrow: 'Impact',
      title: 'By the numbers.',
      table: {
        headers: ['Metric', 'Result'] as [string, string],
        rows: [
          { col1: 'Projects Shipped', col2: '40+' },
          { col1: 'Average Time to Launch', col2: '12 days' },
          { col1: 'Faster than Traditional Dev', col2: '3x' },
          { col1: 'Client Satisfaction Rate', col2: '98%' },
        ],
      },
    },
    {
      eyebrow: 'Conclusion',
      paragraphs: [
        'Aaron Israel represents a new generation of digital builder who leverages the best of no-code tooling to deliver outcomes that rival traditional development at a fraction of the cost and timeline.',
        'With 40+ projects shipped, a 98% client satisfaction rate, and an average launch time of 12 days, his track record speaks for itself.',
      ],
    },
  ],
};

export const nesoCaseStudy: CaseStudyData = {
  title: 'Neso',
  category: 'Product Design',
  coverMeta: [
    { label: 'Type', value: 'Mobile App Design' },
    { label: 'Platform', value: 'iOS & Android' },
    { label: 'Focus', value: 'Fitness & Nutrition' },
  ],
  sections: [
    {
      eyebrow: 'Overview',
      title: 'A fitness tracker that meets you where you are.',
      paragraphs: [
        'NESO is a workout/fitness tracker that allows users to set up workouts, track their progress, and monitor their nutrition and diet during the period of their specific program. It includes more than 50 foods and over 100 exercises to help you stay active no matter where you are.',
        'With automatic food tracking and nutrition facts for each meal, and easy-to-use tools like eating plans and meal plans, users can lose weight safely and effectively while also earning rewards in real time.',
      ],
    },
    {
      eyebrow: 'Objectives',
      title: 'What we set out to achieve.',
      bullets: [
        'Create an experience that encourages users to perform activities in order to improve their health and fitness.',
        'Discover through research the problems people face while using workout and fitness applications.',
        'Create a clean and modern user interface.',
        'Create an easy to use application for optimum user experience.',
      ],
    },
    {
      eyebrow: 'The Problem',
      title: 'Working out without support is hard.',
      paragraphs: [
        'User interviews were conducted to gain insights about how users feel about using workout and fitness apps.',
        'The traditional way of working out is acceptable, but with growing concerns regarding health and well-being because of high stress levels and lack of motivation, it becomes hard to focus on what should be done to get fit. With gym memberships being expensive and gyms not available in local areas, people tend to find a new way to workout.',
      ],
    },
    {
      eyebrow: 'The User',
      paragraphs: [
        'Users are people between the ages of 17-35 all around the world, or anyone who is looking for a way to workout comfortably without visiting the gym.',
      ],
    },
    {
      eyebrow: 'Solution',
      title: 'One app. Workouts, routines, and nutrition.',
      paragraphs: [
        'After conducting considerable study, we decided to create a fitness application that would provide users with a diverse range of workouts and routines, such as bodybuilding, self-defense, and crossfit. We also integrated a nutrition component so that users could track, manage, and regulate their food consumption while working out.',
      ],
    },
  ],
};

export const gloUpCaseStudy: CaseStudyData = {
  title: 'The Glo Up App',
  category: 'Product Design',
  coverMeta: [
    { label: 'Type', value: 'Mobile App Design' },
    { label: 'Platform', value: 'iOS & Android' },
    { label: 'Status', value: 'In Development' },
  ],
  sections: [
    {
      eyebrow: 'Overview',
      title: 'A dating app built for everyone.',
      paragraphs: [
        'The Glo Up is a mobile application that helps users find potential dates. The goal is to help people find and connect based on their sexuality and interests. The app is currently in development and will be available for both iOS and Android devices.',
      ],
    },
    {
      eyebrow: 'Objectives',
      title: 'What we set out to solve.',
      bullets: [
        'Create options for users that want company without romantic intentions.',
        'Gain insight on the problems people face while using dating applications.',
        'Solve the problem of sexuality mismatch among users of dating applications.',
        'Create an easy to use application for optimum user experience.',
      ],
    },
    {
      eyebrow: 'The Problem',
      title: 'Most dating apps are built for one kind of relationship.',
      paragraphs: [
        'Mainstream dating apps mostly cater to individuals finding heterosexual relationships and neglect other forms of sexuality. As a result, these dating applications do not cater to users seeking relationships outside of heterosexuality. They also do not cater to users that would prefer relationships that are not romantic.',
        'User surveys were conducted to gain insights about how users feel about using dating applications that not only served heterosexuals, but also catered to the needs of people from the LGBT community.',
      ],
    },
    {
      eyebrow: 'The User',
      paragraphs: [
        'The mobile application is aimed at young and full grown adults looking to search for other users/people looking to find the same thing as themselves — love, casuals, someone to hang out with, or just friendships.',
      ],
    },
    {
      eyebrow: 'Solution',
      title: 'Connect based on who you are, not just who fits the default.',
      paragraphs: [
        'After conducting considerable study, we decided to create an easy-to-use dating application that would include users from the LGBT community and would help other users find potential partners based on their preferred sexuality, interests, and personalities.',
      ],
    },
  ],
};

export const dreamAiCaseStudy: CaseStudyData = {
  title: 'DreamAI',
  subtitle: 'AI-Powered Dream Journaling & Interpretation',
  category: 'No-Code Build & Design',
  coverMeta: [
    { label: 'Platform', value: 'Bubble' },
    { label: 'Type', value: 'Web Application' },
    { label: 'Focus', value: 'Wellness & AI' },
  ],
  sections: [
    {
      eyebrow: 'Overview',
      title: 'Turning fleeting dreams into meaningful reflection.',
      paragraphs: [
        'DreamAI is a no-code web application that helps everyday users capture, understand, and find meaning in their dreams. By combining a frictionless journaling experience with AI-driven interpretation, it transforms the fleeting, hard-to-articulate nature of dreams into something reflective and personal — delivered in seconds.',
        "The product was designed for general consumers and wellness-minded individuals who are curious about their inner world but don't have access to a therapist or the patience for dense dream dictionaries. The core promise: write down what you remember, and DreamAI does the rest.",
      ],
    },
    {
      eyebrow: 'The Problem',
      title: "Existing tools store your dreams. They don't engage with them.",
      paragraphs: [
        "Dreams are notoriously difficult to capture. You wake up with a vivid impression that fades within minutes, and even when you try to write it down, the meaning feels just out of reach. Existing solutions — physical journals, generic apps, or symbolic dream dictionaries — all share the same flaw: they're passive.",
        'For wellness-oriented users, this is a missed opportunity. Dreams are increasingly recognised as a window into emotional processing, stress patterns, and subconscious thinking. The challenge was to create an experience that felt both effortless to use in a groggy morning state and substantive enough to provide genuine psychological value.',
      ],
    },
    {
      eyebrow: 'Design Goals',
      cards: [
        { title: 'Zero friction at capture', body: 'The journaling interface had to be the first thing a user encountered — no onboarding walls, no feature tours. If a user had to think for more than a second about where to start, the dream would be gone.' },
        { title: 'Warmth over clinical sterility', body: 'Many wellness apps err toward cold, medical aesthetics. DreamAI needed to feel intimate and slightly otherworldly — reflective of the dream state itself. The visual language had to signal safety and curiosity, not productivity.' },
        { title: 'Interpretation as conversation', body: "AI output shouldn't feel like a printout. The goal was for responses to read like something a thoughtful, empathetic friend might say — inviting reflection rather than delivering verdicts." },
      ],
    },
    {
      eyebrow: 'UX Decisions',
      title: 'Every micro-decision in service of trust.',
      steps: [
        { step: '01', title: 'Journaling First, Account Later', body: 'The entry point is a large, open text area — not a sign-up screen. Users can begin writing immediately. Authentication was pushed to a natural save/persist moment, reducing the cognitive cost of getting started.' },
        { step: '02', title: 'Visual Language: Dark, Soft, Spatial', body: 'The palette draws from deep indigos, muted purples, and near-blacks — evoking the liminal quality of sleep without feeling oppressive. Typography was chosen for readability under low-light conditions, recognising that many users write shortly after waking.' },
        { step: '03', title: 'Progressive Interpretation', body: 'After a dream is submitted, the AI interpretation is revealed progressively rather than dumped all at once. This pacing mimics someone reading carefully and responding thoughtfully — slowing the user down and encouraging them to read, not skim.' },
        { step: '04', title: 'Pattern-Surfacing History', body: 'The journal history view surfaces patterns over time rather than simply listing past entries. Thematic echoes between dreams are gently highlighted, turning the archive into something that rewards ongoing use.' },
        { step: '05', title: 'Mobile-First Thinking', body: 'Given that the most natural moment to log a dream is immediately after waking — often while still in bed, phone in hand — the entire layout was designed mobile-first. Touch targets are generous and the text input expands naturally.' },
      ],
    },
    {
      eyebrow: 'Building on Bubble',
      paragraphs: [
        "Bubble was chosen to allow for rapid iteration without sacrificing a polished front-end. The visual design was implemented using Bubble's responsive engine with custom CSS applied where the native components fell short. AI interpretation is handled via API connector, with prompt engineering done to ensure tonal consistency across diverse dream inputs.",
        'The no-code approach meant that design decisions could be tested and revised in real time — a significant advantage when the product is this feeling-dependent.',
      ],
    },
    {
      eyebrow: 'Reflections',
      paragraphs: [
        'DreamAI is a product that lives or dies on trust. Users are sharing something deeply personal — the unfiltered content of their sleeping mind — and the design has to honour that.',
        'The design succeeds most where it gets out of the way — where the experience feels less like using a tool and more like opening a private notebook that happens to write back.',
      ],
    },
  ],
};

export const artemisCaseStudy: CaseStudyData = {
  title: 'Artemis II — 3D Scene',
  subtitle: 'A real-time 3D tribute to NASA\'s Artemis II mission, built in code.',
  category: 'Creative Coding · 3D',
  coverMeta: [
    { label: 'Collaboration', value: 'With Maryam Alakoso' },
    { label: 'Built on', value: 'omma.build' },
    { label: 'Medium', value: 'Real-time 3D in the browser' },
    { label: 'Role', value: 'Design + Build' },
  ],
  sections: [
    { images: [artemisImage] },
    {
      eyebrow: 'Overview',
      title: 'A 3D scene that lets a browser pretend to be a launch pad.',
      paragraphs: [
        'Artemis II is an interactive 3D scene paying homage to NASA\'s Artemis II crewed lunar mission. Built collaboratively with multidisciplinary designer Maryam Alakoso, the piece runs entirely in the browser and uses real-time rendering to recreate a moment in flight — the spacecraft, the lighting of low orbit, and the quiet drama of the journey.',
        'The brief we set ourselves was simple: a single scene, no marketing copy, no scroll narrative. Just craft. A page a visitor lands on and stays inside for longer than they intended.',
      ],
    },
    {
      eyebrow: 'The Collaboration',
      title: 'A two-person studio, two lenses on the same scene.',
      paragraphs: [
        'Maryam Alakoso led the visual direction — composition, materials, lighting language, and the overall mood of the scene. Coming from a multidisciplinary practice that spans editorial design and motion, she brought a sense of staging that pulled the project away from the usual "tech demo" register and toward something closer to a still image you can walk around inside.',
        'I led the build — translating that direction into geometry, code, and the runtime behaviour that holds the scene together. We iterated in tight loops, with most decisions made live in the browser rather than in a tool that abstracts the final output.',
      ],
      cards: [
        { title: 'Direction', body: 'Maryam Alakoso — composition, materials, mood. Portfolio at marikosstudios.framer.website.' },
        { title: 'Build', body: 'Real-time 3D scene authored in code. Geometry, lighting, and camera behaviour all live in the source.' },
        { title: 'Platform', body: 'Published on omma.build, which renders the scene directly from code with no asset pipeline in between.' },
      ],
    },
    {
      eyebrow: 'The Approach',
      title: 'Designing for a frame rate, not a screenshot.',
      steps: [
        { step: '01', title: 'Reference & Mood', body: 'We started with photography from the Artemis programme and the visual register Maryam wanted to land — high-contrast, near-monochrome, with the warmth pulled out of the highlights so the scene reads as cold and distant rather than sunlit.' },
        { step: '02', title: 'Blockout in Code', body: 'Rather than modelling the scene in a 3D tool and exporting, we blocked it out directly in code. That made it cheap to throw decisions away — a habit that paid off when the framing went through several revisions.' },
        { step: '03', title: 'Materials & Light', body: 'Material work took the longest. The metal of the spacecraft had to feel real under the limited lighting of orbit, which meant tuning roughness and reflectivity per-surface rather than relying on a single PBR pass.' },
        { step: '04', title: 'Camera & Pacing', body: 'The camera moves slowly and deliberately. We resisted the urge to add interactivity for its own sake — the scene rewards stillness, not input.' },
      ],
    },
    {
      eyebrow: 'Reflections',
      paragraphs: [
        'The piece is small on purpose. It\'s one scene, one camera, one mood — a deliberate counterweight to the maximalism of most "interactive 3D" work on the web.',
        'Working with Maryam reset our defaults. Most of the decisions that made the scene feel intentional were ones a developer working alone would have skipped — small lighting choices, the colour temperature of the rim light, the deliberate emptiness of the surrounding space.',
      ],
    },
  ],
};
