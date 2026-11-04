import { ArrowUpRight, AtSign, ChevronRight, Globe, GraduationCap, Mail, Play, Sparkles, X as CloseIcon } from 'lucide-react'
import { useEffect, useState, type ComponentType } from 'react'
import { site } from '../data/site'
import { mostVisitedCard, track } from '../lib/analytics'
import directorsGhostImage from '../assets/directors-ghost.png'
import { GlassPanel, Reveal, SectionLabel, TrackedLink } from './primitives'
import { useReducedMotion } from 'motion/react'

/** Helper to extract YouTube video ID from standard URLs or youtu.be shortlinks */
function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
  return match ? match[1] : 'zOSu5D0_HTI'
}

/* ── 04 Featured YouTube Video ──────────────────────────────── */

export function FeaturedVideo() {
  const reduced = useReducedMotion()
  const video = site.featuredVideo
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = getYouTubeId(video.href)

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPlaying(true)
    track('video_play', { title: video.title, id: videoId })
  }

  return (
    <section
      aria-labelledby="featured-video-title"
      className="relative mb-8"
    >
      <SectionLabel>
        <span id="featured-video-heading">Featured video</span>
      </SectionLabel>

      <div
        className="relative p-px"
        style={{ borderRadius: '24px' }}
      >
        <span
          aria-hidden
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: '24px' }}
        >
          <span
            className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'conic-gradient(from 180deg, rgba(125,224,208,0.95), rgba(169,182,255,0.75) 30%, rgba(196,132,255,0.4) 55%, rgba(255,255,255,0.06) 70%, rgba(125,224,208,0.95))',
              animation: reduced ? undefined : 'halo-spin 9s linear infinite',
            }}
          />
        </span>

        <div
          className="relative overflow-hidden bg-[rgba(14,19,38,0.85)] p-4 sm:p-6 backdrop-blur-2xl transition-all duration-300"
          style={{ borderRadius: '23px' }}
        >
          {/* Video Container (16:9 Aspect Ratio) */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl">
            {isPlaying ? (
              <div className="relative size-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
                <button
                  type="button"
                  onClick={() => setIsPlaying(false)}
                  className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/70 text-white/90 backdrop-blur-sm transition-colors hover:bg-black hover:text-white"
                  title="Close player"
                  aria-label="Close player"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handlePlayClick}
                className="group/thumb relative block size-full text-left focus:outline-none"
                aria-label={`Play ${video.title}`}
              >
                <img
                  src={directorsGhostImage}
                  alt={video.title}
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Badge top-left */}
                <div className="absolute left-3 top-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[9.5px] font-medium tracking-wider text-accent uppercase backdrop-blur-md border border-white/10">
                    <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                    Video Demo
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 group-hover/thumb:bg-black/10">
                  <div className="grid size-12 sm:size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all duration-300 group-hover/thumb:scale-110 group-hover/thumb:bg-accent group-hover/thumb:text-accent-foreground">
                    <Play className="size-5 sm:size-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom hint on thumbnail */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-white/90">
                  <span className="font-mono text-[10.5px] tracking-wide text-white/70">
                    Click to play preview
                  </span>
                  <span className="rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white/80">
                    YouTube
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Details & Actions */}
          <div className="mt-4 sm:mt-5">
            <h3 id="featured-video-title" className="font-display text-[1.25rem] sm:text-[1.4rem] leading-snug text-foreground">
              {video.title}
            </h3>
            <p className="mt-1.5 text-[13px] sm:text-[14px] leading-relaxed text-secondary-foreground">
              {video.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 pt-2">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={handlePlayClick}
                  className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-2 font-mono text-[11px] font-medium tracking-wide text-accent transition-all duration-300 hover:bg-accent hover:text-accent-foreground active:scale-95"
                >
                  <Play className="size-3.5 fill-current" />
                  <span>Play In-Page</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(false)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-mono text-[11px] text-muted-foreground hover:bg-white/15 hover:text-foreground"
                >
                  <CloseIcon className="size-3" />
                  <span>Reset Player</span>
                </button>
              )}

              <TrackedLink
                href={video.href}
                event="link_click"
                meta={{ card: 'featured_video_external' }}
                className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-accent"
              >
                <span>Watch on YouTube</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-accent" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 05 Microsoft Learn collections ──────────────────────────── */

export function Collections() {
  return (
    <section aria-labelledby="collections-heading" className="space-y-6">
      <SectionLabel>
        <span id="collections-heading">Microsoft Learn collections</span>
      </SectionLabel>

      {/* Desktop presentation: Featured large cards */}
      <div className="hidden sm:block space-y-6">
        {site.featuredCollections.map((collection, i) => (
          <Reveal key={collection.title} delay={i * 0.05}>
            <GlassPanel tilt className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-2.5 py-1 font-mono text-[9.5px] font-medium tracking-[0.16em] text-accent uppercase border border-accent/30">
                      <Sparkles className="size-3" />
                      Microsoft Learn
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[1.8rem] leading-[1.1] text-foreground">
                    {collection.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-secondary-foreground max-w-[60ch]">
                    {collection.description}
                  </p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-border/60 pt-4">
                <div>
                  <dt className="font-mono text-[9.5px] tracking-[0.14em] text-muted-foreground uppercase">
                    Est. Time
                  </dt>
                  <dd className="mt-1 text-[13px] text-foreground">{collection.estimatedTime}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9.5px] tracking-[0.14em] text-muted-foreground uppercase">
                    Modules
                  </dt>
                  <dd className="mt-1 text-[13px] text-foreground">{collection.moduleCount}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9.5px] tracking-[0.14em] text-muted-foreground uppercase">
                    Cost
                  </dt>
                  <dd className="mt-1 text-[13px] text-foreground">{collection.cost}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9.5px] tracking-[0.14em] text-muted-foreground uppercase">
                    Publisher
                  </dt>
                  <dd className="mt-1 text-[13px] text-foreground">{collection.publisher}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <TrackedLink
                  href={collection.href}
                  event="link_click"
                  meta={{ card: `collection:${collection.title}` }}
                  className="inline-flex items-center gap-2 text-[13.5px] font-medium text-accent hover:underline"
                >
                  Explore Collection
                  <ArrowUpRight className="size-4" />
                </TrackedLink>
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </div>

      {/* Mobile presentation: Compact Linktree-style rectangles */}
      <div className="block sm:hidden space-y-3">
        {site.featuredCollections.map((collection, i) => (
          <Reveal key={collection.title} delay={i * 0.05}>
            <GlassPanel className="p-0 overflow-hidden">
              <TrackedLink
                href={collection.href}
                event="link_click"
                meta={{ card: `collection:${collection.title}` }}
                className="flex items-start gap-3.5 p-4 transition-colors duration-300 hover:bg-white/[0.045] active:bg-white/[0.07]"
              >
                {/* Icon thumbnail */}
                <div className="grid size-10 shrink-0 place-items-center rounded-[12px] border border-border bg-white/[0.06] text-accent mt-0.5">
                  <GraduationCap className="size-[20px]" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13.5px] font-medium text-foreground leading-snug">
                    {collection.title}
                  </h3>
                  <p className="mt-1 text-[11.5px] text-muted-foreground leading-normal line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-accent">
                    <span>{collection.moduleCount} modules</span>
                    <span>·</span>
                    <span>{collection.estimatedTime}</span>
                    <span>·</span>
                    <span>Free</span>
                  </div>
                </div>

                {/* External link arrow */}
                <ChevronRight className="size-[18px] shrink-0 text-muted-foreground mt-1" />
              </TrackedLink>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── 06 Social ───────────────────────────────────────────────── */

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
  linkedin:
    'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.84a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z',
} as const

const brand = (path: string): ComponentType<{ className?: string }> =>
  ({ className }) => <Brand className={className} path={path} />

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  github: brand(BRAND_PATHS.github),
  linkedin: brand(BRAND_PATHS.linkedin),
  globe: Globe,
  instagram: brand(BRAND_PATHS.instagram),
  youtube: brand(BRAND_PATHS.youtube),
  mail: Mail,
  at: AtSign,
  graduation: GraduationCap,
  x: brand(BRAND_PATHS.x),
}

export function Social() {
  const [topCard, setTopCard] = useState<string | null>(null)
  useEffect(() => setTopCard(mostVisitedCard()), [])

  return (
    <section aria-labelledby="social-heading">
      <SectionLabel>
        <span id="social-heading">Connect with me</span>
      </SectionLabel>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
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
                  aria-label={social.label}
                  className="group/row flex items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-white/[0.045] active:bg-white/[0.07]"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-[12px] border border-border bg-white/[0.06] transition-colors duration-300 group-hover/row:border-[rgba(125,224,208,0.35)]">
                    <Icon className="size-[17px] text-secondary-foreground transition-colors duration-300 group-hover/row:text-accent" />
                  </span>
                  <span className="min-w-0 flex-1 flex items-center justify-between pr-2">
                    <span className="text-[14px] font-medium text-foreground">{social.label}</span>
                    {topCard === cardKey && (
                      <span className="rounded-full bg-[rgba(255,150,80,0.14)] px-1.5 py-px font-mono text-[8.5px] tracking-[0.14em] text-[#ffc79a] uppercase">
                        Popular
                      </span>
                    )}
                  </span>
                  <ChevronRight className="size-[18px] shrink-0 text-muted-foreground transition-all duration-300 group-hover/row:translate-x-0.5 group-hover/row:text-accent" />
                </TrackedLink>
              </Reveal>
            )
          })}
        </GlassPanel>
      </div>

      {/* Mobile Layout: Linktree-style compact rounded rectangles */}
      <div className="block sm:hidden space-y-2.5">
        {site.socials.map((social, i) => {
          const Icon = ICONS[social.icon] ?? Globe
          const cardKey = `social:${social.label}`
          return (
            <Reveal key={social.label} delay={i * 0.035}>
              <GlassPanel className="p-0 overflow-hidden">
                <TrackedLink
                  href={social.href}
                  event="link_click"
                  meta={{ card: cardKey, name: social.label }}
                  aria-label={social.label}
                  className="flex items-center gap-3.5 p-3.5 transition-colors duration-300 hover:bg-white/[0.045] active:bg-white/[0.07]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-[10px] border border-border bg-white/[0.06]">
                    <Icon className="size-[16px] text-secondary-foreground" />
                  </span>
                  <span className="text-[14px] font-medium text-foreground flex-1">
                    {social.label}
                  </span>
                  <ChevronRight className="size-[18px] shrink-0 text-muted-foreground" />
                </TrackedLink>
              </GlassPanel>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}