import { ArrowUpRight, AtSign, ChevronRight, Globe, GraduationCap, Mail } from 'lucide-react'
import { useEffect, useState, type ComponentType } from 'react'
import { site } from '../data/site'
import { mostVisitedCard } from '../lib/analytics'
import { GlassPanel, Meter, Reveal, SectionLabel, TrackedLink } from './primitives'

/* ── 03 Projects ─────────────────────────────────────────────── */

const STATUS_TONE: Record<string, string> = {
  Live: 'text-accent',
  'In development': 'text-primary',
  Prototype: 'text-muted-foreground',
}

export function Projects() {
  return (
    <section aria-labelledby="projects-heading">
      <SectionLabel>
        <span id="projects-heading">Selected work</span>
      </SectionLabel>
      <div className="grid gap-3 sm:grid-cols-2">
        {site.projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.06}>
            <GlassPanel tilt className="h-full">
              <TrackedLink
                href={project.href}
                event="link_click"
                meta={{ card: `project:${project.name}`, name: project.name }}
                className="flex h-full flex-col p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[1.4rem] leading-tight">{project.name}</h3>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </div>
                <p className="mt-1 font-mono text-[10.5px] tracking-[0.12em] text-primary uppercase">
                  {project.tagline}
                </p>
                <p className="mt-3 flex-1 text-[13.5px] leading-[1.65] text-secondary-foreground">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-4">
                  <span
                    className={`font-mono text-[10px] tracking-[0.14em] uppercase ${STATUS_TONE[project.status] ?? 'text-muted-foreground'}`}
                  >
                    ● {project.status}
                  </span>
                  <span className="ml-auto font-mono text-[10.5px] text-muted-foreground">
                    {project.stack.join(' · ')}
                  </span>
                </div>
              </TrackedLink>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── 04 Microsoft Learn collections ──────────────────────────── */

export function Collections() {
  return (
    <section aria-labelledby="collections-heading">
      <SectionLabel>
        <span id="collections-heading">Microsoft Learn collections</span>
      </SectionLabel>
      <GlassPanel className="divide-y divide-[rgba(173,186,255,0.12)]">
        {site.collections.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <div className="p-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[14.5px] font-medium text-foreground">{c.title}</h3>
                <span className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {c.state}
                </span>
              </div>
              <p className="mt-1 mb-3 text-[12.5px] text-muted-foreground">{c.note}</p>
              <div className="flex items-center gap-3">
                <Meter value={c.progress} tone={c.progress === 100 ? 'accent' : 'primary'} />
                <span className="w-9 shrink-0 text-right font-mono text-[10.5px] text-secondary-foreground">
                  {c.progress}%
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </GlassPanel>
    </section>
  )
}

/* ── 05 Certifications ───────────────────────────────────────── */

export function Certifications() {
  return (
    <section aria-labelledby="certs-heading">
      <SectionLabel>
        <span id="certs-heading">Credentials &amp; experience</span>
      </SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {site.certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.05}>
            <GlassPanel tilt className="h-full p-5">
              <p className="font-display text-[1.15rem] leading-tight text-foreground">
                {cert.issuer}
              </p>
              <p className="mt-2 text-[12.5px] leading-[1.5] text-secondary-foreground">
                {cert.name}
              </p>
              <p className="mt-3 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                <span
                  aria-hidden
                  className={`size-[5px] rounded-full ${
                    cert.state === 'In progress' ? 'bg-primary' : 'bg-accent'
                  }`}
                />
                {cert.state} · {cert.year}
              </p>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── 06 Current learning ─────────────────────────────────────── */

export function Learning() {
  return (
    <section aria-labelledby="learning-heading">
      <SectionLabel>
        <span id="learning-heading">Currently learning</span>
      </SectionLabel>
      <GlassPanel className="p-6">
        <ul className="space-y-4">
          {site.learning.map((item, i) => (
            <li key={item.topic}>
              <Reveal delay={i * 0.05}>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <span className="text-[13.5px] text-foreground">{item.topic}</span>
                  <span className="font-mono text-[10.5px] text-muted-foreground">
                    {item.progress}%
                  </span>
                </div>
                <Meter value={item.progress} />
              </Reveal>
            </li>
          ))}
        </ul>
      </GlassPanel>
    </section>
  )
}

/* ── 07 Social ───────────────────────────────────────────────── */

/** Brand marks are hand-inlined — lucide dropped brand icons in v1. */
function Brand({ className, path }: { className?: string; path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d={path} />
    </svg>
  )
}

const BRAND_PATHS = {
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z',
  github:
    'M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.15-.612-3.35-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.075.638-1.325-2.225-.25-3.65-1.125-3.65-3.85 0-.788.275-1.45.725-1.963-.062-.187-.325-.975.075-2.025 0 0 .613-.187 2.013.75a6.855 6.855 0 0 1 1.837-.25c.625 0 1.25.087 1.838.25 1.4-.95 2.012-.75 2.012-.75.4 1.05.138 1.838.075 2.025.45.513.725 1.163.725 1.963 0 2.737-1.437 3.6-3.662 3.85.4.35.65 1.087.65 1.837 0 1.325-.013 2.35-.013 2.687 0 .263.188.575.688.475A10.005 10.005 0 0 0 22 12c0-5.525-4.475-10-10-10Z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.227.415.56.217.96.477 1.382.899.421.421.682.82.899 1.381.164.422.36 1.057.413 2.227.059 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.249 1.805-.413 2.227-.217.56-.478.96-.9 1.382-.421.421-.82.682-1.381.899-.422.164-1.057.36-2.227.413-1.266.059-1.646.07-4.85.07s-3.584-.011-4.85-.07c-1.17-.053-1.805-.249-2.227-.413a3.719 3.719 0 0 1-1.382-.9c-.421-.421-.682-.82-.898-1.381-.165-.422-.361-1.057-.414-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.249-1.805.414-2.227.216-.56.477-.96.898-1.382.422-.421.821-.682 1.382-.898.422-.165 1.057-.361 2.227-.414 1.266-.058 1.646-.07 4.85-.07Zm0 5.675a4.162 4.162 0 1 0 0 8.324 4.162 4.162 0 0 0 0-8.324Zm0 6.865a2.703 2.703 0 1 1 0-5.406 2.703 2.703 0 0 1 0 5.406Zm5.299-7.03a.972.972 0 1 1-1.944 0 .972.972 0 0 1 1.944 0Z',
  youtube:
    'M23.5 6.507a2.78 2.78 0 0 0-1.957-1.964C19.8 4.073 12 4.073 12 4.073s-7.8 0-9.543.47A2.78 2.78 0 0 0 .5 6.507C.03 8.256.03 12 .03 12s0 3.744.47 5.493a2.78 2.78 0 0 0 1.957 1.964c1.743.47 9.543.47 9.543.47s7.8 0 9.543-.47a2.78 2.78 0 0 0 1.957-1.964c.47-1.749.47-5.493.47-5.493s0-3.744-.47-5.493ZM9.545 15.568V8.432L15.727 12l-6.182 3.568Z',
} as const

const brand = (path: string): ComponentType<{ className?: string }> =>
  ({ className }) => <Brand className={className} path={path} />

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  github: brand(BRAND_PATHS.github),
  globe: Globe,
  instagram: brand(BRAND_PATHS.instagram),
  youtube: brand(BRAND_PATHS.youtube),
  mail: Mail,
  at: AtSign,
  graduation: GraduationCap,
  x: brand(BRAND_PATHS.x),
}

/**
 * Grouped inset list, iOS Settings style: one panel, hairline separators, and a
 * subtitle on every row that says why the destination is worth a tap.
 */
export function Social() {
  const [topCard, setTopCard] = useState<string | null>(null)
  useEffect(() => setTopCard(mostVisitedCard()), [])

  return (
    <section aria-labelledby="social-heading">
      <SectionLabel>
        <span id="social-heading">Find me everywhere</span>
      </SectionLabel>
      <GlassPanel className="divide-y divide-[rgba(173,186,255,0.1)]">
        {site.socials.map((social, i) => {
          const Icon = ICONS[social.icon] ?? Globe
          const cardKey = `social:${social.label}`
          return (
            <Reveal key={social.label} delay={i * 0.035}>
              <TrackedLink
                href={social.href}
                event="link_click"
                meta={{ card: cardKey, name: social.label }}
                aria-label={`${social.label} — ${social.subtitle}`}
                className="group/row flex items-center gap-4 px-4 py-3.5 transition-colors duration-300 hover:bg-white/[0.045] active:bg-white/[0.07]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-[12px] border border-border bg-white/[0.06] transition-colors duration-300 group-hover/row:border-[rgba(125,224,208,0.35)]">
                  <Icon className="size-[17px] text-secondary-foreground transition-colors duration-300 group-hover/row:text-accent" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[14px] font-medium text-foreground">{social.label}</span>
                    {topCard === cardKey && (
                      <span className="rounded-full bg-[rgba(255,150,80,0.14)] px-1.5 py-px font-mono text-[8.5px] tracking-[0.14em] text-[#ffc79a] uppercase">
                        Popular
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-[12.5px] text-muted-foreground">
                    {social.subtitle}
                  </span>
                </span>
                <ChevronRight className="size-[18px] shrink-0 text-muted-foreground transition-all duration-300 group-hover/row:translate-x-0.5 group-hover/row:text-accent" />
              </TrackedLink>
            </Reveal>
          )
        })}
      </GlassPanel>
    </section>
  )
}
