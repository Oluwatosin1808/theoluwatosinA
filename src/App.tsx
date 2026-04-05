import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import CaseStudyModal, { CaseStudyData } from './components/CaseStudyModal';

const atlasMockupImage = new URL('../img/Mockup 26.png', import.meta.url).href;
const dreamAiMockupImage = new URL('../img/Mockup Ribbon 11.png', import.meta.url).href;
const gloUpMockupImage = new URL('../img/Notioneverything headers.png', import.meta.url).href;
const nesoMockupImage = new URL('../img/Notioneverything headers (1).png', import.meta.url).href;
const aaronCaseStudyImageOne = new URL('../img/case-0.png', import.meta.url).href;
const aaronCaseStudyImageTwo = new URL('../img/case-0-2.png', import.meta.url).href;
const portraitImage = new URL('../img/me.png', import.meta.url).href;

const codelessAgencyCaseStudy: CaseStudyData = {
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

const aaronIsraelCaseStudy: CaseStudyData = {
  title: 'Aaron Israel',

  category: 'No-Code Development',

  coverMeta: [

    { label: 'Location', value: 'Nigeria' },

    { label: 'Status', value: 'Available for projects' },

    { label: 'Portfolio', value: 'aaron.pxxl.click' },

  ],

  sections: [

    { images: [aaronCaseStudyImageOne, aaronCaseStudyImageTwo] },

    {

      eyebrow: 'Overview',

      title: 'No-code web developer shipping production-ready websites in days.',

      paragraphs: [

        'Aaron Israel is a no-code web developer and digital product builder based in Nigeria, specialising in shipping powerful, production-ready websites and web applications fast. Where traditional development agencies quote months, Aaron delivers in days.',

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



const nesoCaseStudy: CaseStudyData = {

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



const gloUpCaseStudy: CaseStudyData = {

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



const dreamAiCaseStudy: CaseStudyData = {

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


type ToolItem = {
  name: string;
  icon: string;
  group: string;
};

function ToolIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

type ProjectItem = {
  title: string;
  category: string;
  summary: string;
  metrics: string;
  outcome: string;
  image?: string;
  caseStudy?: CaseStudyData;
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
  { name: "Figma", icon: "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z", group: "Design" },
  { name: "FigJam", icon: "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z", group: "Design" },
  { name: "Bubble", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zm-2.5 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z", group: "No-Code / Builders" },
  { name: "Webflow", icon: "m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z", group: "No-Code / Builders" },
  { name: "Framer", icon: "M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z", group: "No-Code / Builders" },
  { name: "FlutterFlow", icon: "M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z", group: "No-Code / Builders" },
  { name: "Next.js", icon: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z", group: "Frontend" },
  { name: "HTML", icon: "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z", group: "Frontend" },
  { name: "CSS", icon: "M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63", group: "Frontend" },
  { name: "JavaScript", icon: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z", group: "Frontend" },
  { name: "Airtable", icon: "M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.266 3.266 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.255 3.255 0 0 0-1.272-.257zM23.4 8.056a.589.589 0 0 0-.222.045l-10.012 3.877a.612.612 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.583.583 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596zM.676 8.095a.644.644 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006.307-.147 2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.57.57 0 0 0-.207-.044z", group: "Automation & Data" },
  { name: "Make", icon: "M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z", group: "Automation & Data" },
  { name: "REST APIs", icon: "M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z", group: "Automation & Data" }
];

const projects: ProjectItem[] = [
  {
    title: "Aaron Israel",
    category: "No-Code Development",
    summary: "No-code web developer and digital builder shipping production-ready websites in days.",
    metrics: "40+ projects shipped",
    outcome: "3x faster delivery than traditional dev cycles with a 98% client satisfaction rate.",
    image: aaronCaseStudyImageOne,
    caseStudy: aaronIsraelCaseStudy,
    liveUrl: "https://aaron.pxxl.click"
  },
  {
    title: "Codeless Solutions",
    category: "Product Design + Development",
    summary: "A home for a no-code agency that needed to look anything but ordinary",
    metrics: "38% increase in activation",
    outcome: "Reduced drop-offs with data-driven flows and personalized nudges.",
    image: atlasMockupImage,
    caseStudy: codelessAgencyCaseStudy,
    liveUrl: "https://agency.codelessify.org"
  },
  {
    title: "DreamAI",
    category: "No-Code Build & Design",
    summary: "Designed and shipped AI-Powered Dream Journaling & Interpretation web App",
    metrics: "Built on Bubble",
    outcome: "AI-powered interpretation delivered in seconds with a journaling-first UX.",
    image: dreamAiMockupImage,
    caseStudy: dreamAiCaseStudy,
    liveUrl: "https://dreamai-52691.bubbleapps.io/version-test"
  },
  {
    title: "The Glo Up App",
    category: "Product Design",
    summary: "A dating app that helps users find potential dates",
    metrics: "Mobile app in development",
    outcome: "Connect based on sexuality and interests with options beyond romance.",
    image: gloUpMockupImage,
    caseStudy: gloUpCaseStudy,
    liveUrl: "https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FOdXozCiTmU0EFVpB6esD3Y%2FThe-Glo-Up-Dating-App%3Fnode-id%3D0%253A1%26t%3DGpxOALxhnck2XF3y-1"
  },
  {
    title: "Neso",
    category: "Product Design",
    summary: "Workout and Fitness Tracker",
    metrics: "Fitness + nutrition tracking",
    outcome: "Workout setup, progress tracking, and nutrition monitoring in one program-led experience.",
    image: nesoMockupImage,
    caseStudy: nesoCaseStudy,
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

  const carouselRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef({ active: false, startX: 0, scrollLeft: 0 });

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
                  When I'm not designing or building, I'm probably exploring new tools, refining how I work, or listening to music on Spotify.
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
          <div
            className="carousel"
            ref={carouselRef}
            onPointerDown={(e) => {
              dragState.current = { active: true, startX: e.clientX, scrollLeft: carouselRef.current!.scrollLeft };
              carouselRef.current!.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!dragState.current.active) return;
              carouselRef.current!.scrollLeft = dragState.current.scrollLeft - (e.clientX - dragState.current.startX);
            }}
            onPointerUp={() => { dragState.current.active = false; }}
            onPointerCancel={() => { dragState.current.active = false; }}
          >
            <div className="carousel-track">
              {tools.map((tool, index) => (
                <div className="tool-card" key={`${tool.name}-${index}`}>
                  <div className="tool-icon" aria-hidden="true">
                    <ToolIcon d={tool.icon} />
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
  overflow-x: hidden;
}

html, body {
  overflow-x: hidden;
  max-width: 100%;
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
  margin-top: 0;
  gap: 1.5rem;
  position: sticky;
  top: 1rem;
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
  padding: 5rem 0 2rem;
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
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  padding: 0.5rem 0 0.75rem;
  cursor: grab;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel:active {
  cursor: grabbing;
}

.carousel-track {
  display: flex;
  gap: 1.2rem;
  width: max-content;
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
  color: rgba(245, 220, 160, 0.9);
  flex-shrink: 0;
}

.tool-icon svg {
  width: 20px;
  height: 20px;
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
    align-items: stretch;
    width: 100%;
  }

  .cta-row .cta {
    width: 100%;
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
