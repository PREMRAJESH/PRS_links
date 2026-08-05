/**
 * Single source of truth for the identity hub. Every section of the UI is
 * generated from this object — add an entry here and it renders itself.
 */

export type Link = { label: string; href: string }

export const site = {
  person: {
    name: 'Prem Rajesh Sargara',
    shortName: 'Prem',
    initials: 'PS',
    location: 'Gujarat, India · IST (UTC+5:30)',
    status: { label: 'Open to internships & collaborations', tone: 'available' as const },
    roles: [
      'Computer Engineering Student',
      'Software Engineer',
      'AI Engineer',
      'Open Source Builder',
      'Microsoft Learn Creator',
      'Lifelong Learner',
    ],
    intro:
      'I build software the way I wish more software were built — quietly, carefully, and with the seams finished. Right now that means agentic AI systems, Azure-native data platforms, and open source tools I actually use every day.',
  },

  featured: {
    kicker: 'Featured roadmap',
    title: 'From Zero to Agentic AI Engineer',
    description:
      'An official Microsoft Learn Collection I curated — a linear path from Python fundamentals through prompt engineering, Azure AI Foundry, and multi-agent orchestration. Built for people starting from nothing.',
    meta: [
      { label: 'Estimated time', value: '10 hours' },
      { label: 'Modules', value: '18' },
      { label: 'Cost', value: 'Free' },
      { label: 'Publisher', value: 'Microsoft Learn' },
    ],
    cta: 'Open Roadmap',
    href: 'https://learn.microsoft.com/collections/6q08f7tjr3yg4m/?wt.mc_id=studentamb_523020',
  },

  projects: [
    {
      name: "Director's Ghost",
      tagline: 'Agentic film pre-production studio',
      description:
        'Multi-agent pipeline that turns a logline into shot lists, mood boards, and a schedule. Agents negotiate over a shared script graph.',
      stack: ['TypeScript', 'LangGraph', 'Azure OpenAI'],
      status: 'In development',
      href: 'https://github.com/PREMRAJESH',
    },
    {
      name: 'Yojana Saathi',
      tagline: 'Government scheme copilot',
      description:
        'Retrieval-grounded assistant that matches Indian citizens to welfare schemes they qualify for, in their own language.',
      stack: ['Python', 'RAG', 'Vector search'],
      status: 'Live',
      href: 'https://github.com/PREMRAJESH',
    },
    {
      name: 'NimbusX',
      tagline: 'Cloud cost intelligence',
      description:
        'Reads Azure billing exports and surfaces the five decisions that actually move the invoice — with forecasted impact.',
      stack: ['Next.js', 'Azure', 'DuckDB'],
      status: 'Prototype',
      href: 'https://github.com/PREMRAJESH',
    },
    {
      name: 'PRS-OS Portfolio',
      tagline: 'Desktop OS in the browser',
      description:
        'My engineering portfolio rebuilt as a windowed operating system — draggable panes, a file tree, a working terminal.',
      stack: ['React', 'Framer Motion', 'Vercel'],
      status: 'Live',
      href: 'https://prs-os.vercel.app/',
    },
  ],

  collections: [
    {
      title: 'From Zero to Agentic AI Engineer',
      state: 'Published',
      progress: 100,
      note: '18 modules · Microsoft Learn',
    },
    {
      title: 'Azure Data Engineering with Microsoft Fabric',
      state: 'In progress',
      progress: 62,
      note: 'Lakehouse, pipelines, semantic models',
    },
    {
      title: 'MLOps on Azure, End to End',
      state: 'Drafting',
      progress: 24,
      note: 'Tracking, registries, deployment gates',
    },
    {
      title: 'Responsible AI for Student Builders',
      state: 'Planned',
      progress: 0,
      note: 'Evaluation, red-teaming, guardrails',
    },
  ],

  certifications: [
    { issuer: 'Oracle', name: 'AI Foundations Associate', year: '2025', state: 'Earned' },
    {
      issuer: 'Microsoft',
      name: 'Fabric Analytics Engineer Associate (DP-600)',
      year: '2026',
      state: 'In progress',
    },
    { issuer: 'IBM', name: 'AI & Automation Internship', year: '2025', state: 'Completed' },
    { issuer: 'Google', name: 'Cloud Digital Leader', year: '2024', state: 'Earned' },
  ],

  learning: [
    { topic: 'Machine Learning', progress: 78 },
    { topic: 'Agentic AI', progress: 71 },
    { topic: 'Azure', progress: 66 },
    { topic: 'Microsoft Fabric', progress: 48 },
    { topic: 'MLOps', progress: 35 },
  ],

  /**
   * Ordered by what a first-time visitor should tap first. `subtitle` answers
   * "why should I click this?" — it is the whole point of the row.
   */
  socials: [
    {
      label: 'GitHub',
      subtitle: 'Open source projects & commits',
      handle: 'PREMRAJESH',
      href: 'https://github.com/PREMRAJESH',
      icon: 'github',
    },
    {
      label: 'Portfolio',
      subtitle: 'Live demos, built as a desktop OS',
      handle: 'prs-os.vercel.app',
      href: 'https://prs-os.vercel.app/',
      icon: 'globe',
    },
    {
      label: 'Microsoft Learn',
      subtitle: 'My published learning collections',
      handle: 'From Zero to Agentic AI Engineer',
      href: 'https://learn.microsoft.com/collections/6q08f7tjr3yg4m/?wt.mc_id=studentamb_523020',
      icon: 'graduation',
    },
    {
      label: 'YouTube',
      subtitle: 'Build logs & engineering walkthroughs',
      handle: '@Merged_PRs',
      href: 'https://www.youtube.com/@Merged_PRs',
      icon: 'youtube',
    },
    {
      label: 'X',
      subtitle: 'Daily notes on AI & shipping',
      handle: '@sargara_prem',
      href: 'https://x.com/sargara_prem',
      icon: 'x',
    },
    {
      label: 'Instagram',
      subtitle: 'Behind the scenes, late-night builds',
      handle: '@_prem_sargara',
      href: 'https://www.instagram.com/_prem_sargara/',
      icon: 'instagram',
    },
    {
      label: 'Threads',
      subtitle: 'Longer thoughts & conversations',
      handle: '@_prem_sargara',
      href: 'https://www.threads.com/@_prem_sargara',
      icon: 'at',
    },
    {
      label: 'Email',
      subtitle: 'Work with me, or just say hello',
      handle: 'sargarapremrajesh@gmail.com',
      href: 'mailto:sargarapremrajesh@gmail.com',
      icon: 'mail',
    },
  ],
} as const

export type Project = (typeof site.projects)[number]
export type Social = (typeof site.socials)[number]
