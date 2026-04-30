import { CaseStudyData } from './components/CaseStudyModal';

export const codelessAgencyCaseStudy: CaseStudyData = {
  title: 'JRUN Global',
  category: 'EdTech · Design System',
  coverMeta: [
    { label: 'Client', value: 'JRUN Global' },
    { label: 'Deliverable', value: 'Design system + 3 surfaces' },
    { label: 'Scope', value: 'UX architecture + system' },
    { label: 'Stack', value: 'React · Storybook · Tokens' },
  ],
  sections: [
    {
      eyebrow: 'Overview',
      title: 'A 120-token system across student, tutor, and admin.',
      paragraphs: [
        'JRUN Global is an EdTech platform serving 40,000 students and 2,500 tutors. The product spanned three surfaces — student web, tutor portal, and admin — each with its own visual debt and conventions. As Senior Product Designer, I owned the design system and UX architecture for all three.',
        'The brief: replace the patchwork with a single token-driven system, ship a documented React component library, and migrate the surfaces without freezing feature work.',
      ],
      stats: [
        { num: '120', desc: 'Design tokens shipped' },
        { num: '−70%', desc: 'Design-review cycle time' },
        { num: '3', desc: 'Surfaces migrated' },
      ],
    },
    {
      eyebrow: 'Approach',
      title: 'Tokens first, components second, surfaces last.',
      steps: [
        { step: '01', title: 'Audit', body: 'Catalogued every spacing value, color, and component used across the three apps. Found 14 shades of "primary blue" and seven button shapes.' },
        { step: '02', title: 'Tokens', body: 'Defined a 120-token scale — color, type, spacing, radius, motion — and ratified it with engineering before any component work started.' },
        { step: '03', title: 'Components', body: 'Built and documented a React component library in Storybook with 3 engineering partners. Every component carried token references and accessibility notes.' },
        { step: '04', title: 'Migration', body: 'Migrated surfaces over 8 sprints, one feature area at a time. Design-review cycle dropped 70% by sprint 4.' },
      ],
    },
  ],
};

export const nesoCaseStudy: CaseStudyData = {
  title: 'Shyne Africa',
  category: 'Fintech · Mobile',
  coverMeta: [
    { label: 'Client', value: 'Shyne Africa' },
    { label: 'Deliverable', value: 'KYC + home redesign' },
    { label: 'Scope', value: 'Lead Product Designer' },
    { label: 'Duration', value: '12 months' },
  ],
  sections: [
    {
      eyebrow: 'Overview',
      title: 'Founder onboarding, redesigned.',
      paragraphs: [
        'Shyne Africa is a Pan-African neobank serving founders and SMEs. As the first design hire, I built the design function from zero and led the redesign of KYC and the home surface.',
        'The redesign reframed compliance as a conversation, not a checklist. KYC completion went from industry-typical to category-leading inside a quarter.',
      ],
      stats: [
        { num: '92%', desc: 'KYC completion rate' },
        { num: '4.7★', desc: 'App store rating' },
        { num: '+47%', desc: 'Card adds vs prior flow' },
      ],
    },
    {
      eyebrow: 'What changed',
      title: 'Three decisions that did most of the work.',
      cards: [
        { title: 'Conversational KYC', body: 'Replaced the traditional checklist with a conversational flow that explained why each piece of information was needed and what would be done with it.' },
        { title: 'Progressive disclosure', body: 'Surfaced advanced features only after the user completed primary tasks. The home screen feels calm to a new user and rich to a power user.' },
        { title: 'Consistent micro-feedback', body: 'Every state change in the app was accompanied by clear, immediate feedback — making compliance steps feel like progress, not friction.' },
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
      stats: [
        { num: '+38%', desc: 'D7 retention' },
        { num: '×2.4', desc: 'Activation lift' },
        { num: '6w', desc: 'Idea → live' },
      ],
    },
    {
      eyebrow: 'The Problem',
      title: "Existing tools store your dreams. They don't engage with them.",
      paragraphs: [
        "Dreams are notoriously difficult to capture. You wake up with a vivid impression that fades within minutes, and even when you try to write it down, the meaning feels just out of reach. Existing solutions — physical journals, generic apps, or symbolic dream dictionaries — all share the same flaw: they're passive.",
        'For wellness-oriented users, this is a missed opportunity. Dreams are increasingly recognised as a window into emotional processing, stress patterns, and subconscious thinking.',
      ],
    },
    {
      eyebrow: 'Design Goals',
      cards: [
        { title: 'Zero friction at capture', body: 'The journaling interface had to be the first thing a user encountered — no onboarding walls, no feature tours.' },
        { title: 'Warmth over clinical sterility', body: 'DreamAI needed to feel intimate and slightly otherworldly — reflective of the dream state itself. The visual language had to signal safety and curiosity, not productivity.' },
        { title: 'Interpretation as conversation', body: "AI output shouldn't feel like a printout. Responses read like something a thoughtful, empathetic friend might say — inviting reflection rather than delivering verdicts." },
      ],
    },
    {
      eyebrow: 'UX Decisions',
      title: 'Every micro-decision in service of trust.',
      steps: [
        { step: '01', title: 'Journaling First, Account Later', body: 'The entry point is a large, open text area — not a sign-up screen. Authentication was pushed to a natural save moment.' },
        { step: '02', title: 'Visual Language: Dark, Soft, Spatial', body: 'Deep indigos and muted purples evoke the liminal quality of sleep. Typography was chosen for readability under low-light conditions.' },
        { step: '03', title: 'Progressive Interpretation', body: 'After a dream is submitted, the AI interpretation is revealed progressively — slowing the user down and encouraging them to read, not skim.' },
        { step: '04', title: 'Pattern-Surfacing History', body: 'Thematic echoes between dreams are gently highlighted, turning the archive into something that rewards ongoing use.' },
        { step: '05', title: 'Mobile-First Thinking', body: 'The most natural moment to log a dream is immediately after waking — phone in hand. The entire layout was designed mobile-first.' },
      ],
    },
  ],
};
