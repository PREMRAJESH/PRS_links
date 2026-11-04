import { ArrowUpRight, ChevronRight, GraduationCap, Play, Sparkles, X as CloseIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { mostVisitedCard, track } from '../lib/analytics'
import directorsGhostImage from '../assets/directors-ghost.png'
import { GlassPanel, Reveal, SectionLabel, TrackedLink } from './primitives'
import { SOCIAL_ICONS } from './icons'
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
      className="relative mb-8 min-w-0 max-w-full"
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
    <section aria-labelledby="collections-heading" className="space-y-6 min-w-0 max-w-full">
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

export function Social() {
  const [topCard, setTopCard] = useState<string | null>(null)
  useEffect(() => setTopCard(mostVisitedCard()), [])

  return (
    <section aria-labelledby="social-heading" className="min-w-0 max-w-full">
      <SectionLabel>
        <span id="social-heading">Connect with me</span>
      </SectionLabel>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <GlassPanel className="divide-y divide-[rgba(173,186,255,0.1)]">
          {site.socials.map((social, i) => {
            const Icon = SOCIAL_ICONS[social.icon] ?? SOCIAL_ICONS.globe
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
          const Icon = SOCIAL_ICONS[social.icon] ?? SOCIAL_ICONS.globe
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