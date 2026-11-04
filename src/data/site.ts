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
    status: { label: 'Available for AI & Engineering roles', tone: 'available' as const },
    subtitle: 'Exploring AI, building useful things, and sharing what I learn.',
    roles: [
      'AI Engineer',
      'Software Engineer',
      'Microsoft Learn Creator',
      'Open Source Builder',
    ],
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

  featuredCollections: [
    {
      title: 'From Zero to Machine Learning Engineer',
      description:
        'A structured 3-stage path from zero to real machine learning engineering — no prior ML experience needed. Learn core concepts and build actual models with Python and scikit-learn: regression, classification, clustering, and deep learning. Then train and manage models at scale with Azure Machine Learning, and finish with MLOps — automating, tuning, and deploying models to production. This is the same official content behind Microsoft\'s Azure Data Scientist Associate (DP-100) certification. Follow the stages in order for the best experience.  ',
      estimatedTime: '12 hours',
      moduleCount: 22,
      cost: 'Free',
      publisher: 'Microsoft Learn',
      href: 'https://learn.microsoft.com/collections/86w0cztk0gjpm4',
    },
  ],

  featuredVideo: {
    title: 'Director\'s Ghost — AI Co-Director for Every Shot',
    description:
      'Pre-visualize any scene from screenplay to storyboard, shot breakdowns, camera plans, and animatics in seconds.',
    thumbnail: 'directors-ghost.png',
    href: 'https://youtu.be/zOSu5D0_HTI',
  },

  /**
   * Ordered by what a first-time visitor should tap first. `subtitle` answers
   * "why should I click this?" — it is the whole point of the row.
   */
  socials: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/_prem_sargara/',
      icon: 'instagram',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@Merged_PRs',
      icon: 'youtube',
    },
    {
      label: 'X',
      href: 'https://x.com/sargara_prem',
      icon: 'x',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/PREMRAJESH',
      icon: 'github',
    },
    {
      label: 'Threads',
      href: 'https://www.threads.com/@_prem_sargara',
      icon: 'threads',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/prem-rajesh-sargara',
      icon: 'linkedin',
    },
    {
      label: 'Portfolio',
      href: 'https://premsargara.me',
      icon: 'globe',
    },
    {
      label: 'Email',
      href: 'mailto:sargarapremrajesh@gmail.com',
      icon: 'mail',
    },
  ],
} as const

export type Social = (typeof site.socials)[number]