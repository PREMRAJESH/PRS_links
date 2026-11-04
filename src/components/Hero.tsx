import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
// Square 320px crop of the uploaded portrait — the original is 1.9 MB.
import avatarImage from '../assets/pfp.png'
import { site } from '../data/site'
import { mostVisitedCard } from '../lib/analytics'
import { TrackedLink } from './primitives'
import { SOCIAL_ICONS } from './icons'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const reduced = useReducedMotion()
  const { person } = site

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % person.roles.length),
      2600,
    )
    return () => clearInterval(id)
  }, [person.roles.length])

  return (
    <header className="relative min-w-0 max-w-full">
      <div className="flex items-start gap-4 sm:gap-7 min-w-0 max-w-full">
        {/* Avatar with slow orbiting halo and live status indicator */}
        <div className="relative shrink-0">
          <span
            aria-hidden
            className="absolute -inset-[3px] rounded-full opacity-90"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(125,224,208,0.9), rgba(169,182,255,0.9), rgba(196,132,255,0.7), rgba(125,224,208,0.9))',
              animation: reduced ? undefined : 'halo-spin 9s linear infinite',
              filter: 'blur(0.5px)',
            }}
          />
          <span
            aria-hidden
            className="absolute -inset-[12px] sm:-inset-[14px] rounded-full blur-xl"
            style={{
              background: 'radial-gradient(circle, rgba(139,157,255,0.35), transparent 70%)',
              animation: reduced ? undefined : 'breathe 6s ease-in-out infinite',
            }}
          />
          <img
            src={avatarImage}
            alt={`Illustrated portrait of ${person.name}`}
            width={104}
            height={104}
            fetchPriority="high"
            className="relative block size-[72px] sm:size-[104px] rounded-full border border-white/20 bg-[#0d1330] object-cover"
          />

          {/* Status badge */}
          {person.status && (
            <span
              className="absolute bottom-0 right-0 z-10 flex size-3.5 sm:size-4 items-center justify-center rounded-full bg-[#0d1330] ring-2 ring-[#0d1330]"
              title={person.status.label}
              aria-label={person.status.label}
            >
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 sm:size-2.5 rounded-full bg-emerald-400" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5 overflow-hidden">
          <h1 className="font-display text-[1.7rem] leading-[0.98] tracking-[-0.015em] text-foreground sm:text-[3.4rem] break-words min-w-0 overflow-hidden">
            {person.name}
          </h1>

          {/* Rotating role, height-locked so nothing below shifts */}
          <div className="mt-1.5 h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={reduced ? undefined : { y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduced ? undefined : { y: -18, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[11.5px] sm:text-[12.5px] tracking-[0.1em] text-primary truncate"
                aria-live="polite"
              >
                {person.roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-1 text-[13.5px] sm:text-[15px] leading-[1.6] sm:leading-[1.7] text-secondary-foreground break-words">
            {person.subtitle}
          </p>

          {/* Desktop Connection Link Icons Bar — clean stationary flex row */}
          <div className="hidden sm:flex flex-wrap items-center gap-4 pt-1.5">
            {site.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon] ?? SOCIAL_ICONS.globe
              return (
                <TrackedLink
                  key={social.label}
                  href={social.href}
                  event="link_click"
                  meta={{ card: 'hero_icon', name: social.label }}
                  aria-label={social.label}
                  title={social.label}
                  className="group relative flex size-9 items-center justify-center text-foreground/85 transition-all duration-200 hover:scale-115 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Icon className="size-[23px] transition-colors group-hover:text-white" />
                </TrackedLink>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Connection Links Marquee — smooth endless gliding ribbon (isolated container) */}
      <div
        className="block sm:hidden relative mt-4 w-full overflow-hidden py-1"
        style={{
          contain: 'content',
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="animate-marquee items-center gap-6">
          {/* Triple set guarantees seamless infinite loop across all viewport widths */}
          {[...site.socials, ...site.socials, ...site.socials].map((social, idx) => {
            const Icon = SOCIAL_ICONS[social.icon] ?? SOCIAL_ICONS.globe
            return (
              <TrackedLink
                key={`${social.label}-${idx}`}
                href={social.href}
                event="link_click"
                meta={{ card: 'hero_marquee_icon', name: social.label }}
                aria-label={social.label}
                title={social.label}
                className="group shrink-0 flex size-9 items-center justify-center text-white/85 transition-all duration-200 hover:scale-120 hover:text-white active:scale-95 focus-visible:outline-none"
              >
                <Icon className="size-[22px] transition-colors group-hover:text-white" />
              </TrackedLink>
            )
          })}
        </div>
      </div>

      {/* Featured Roadmap - Curated Microsoft Learn Collection */}
      <FeaturedRoadmap />
    </header>
  )
}

/**
 * Featured Roadmap - Curated flagship resource with signature smooth rounded card styling
 */
function FeaturedRoadmap() {
  const reduced = useReducedMotion()
  const featured = site.featured
  const [isMostVisited, setIsMostVisited] = useState(false)

  useEffect(() => setIsMostVisited(mostVisitedCard() === 'featured_roadmap'), [])

  return (
    <section
      aria-labelledby="featured-roadmap-title"
      className="relative mt-6 sm:mt-10 min-w-0 max-w-full overflow-hidden lg:-mx-4 xl:-mx-6"
    >
      {/* Outer breathing glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 sm:-inset-6 blur-xl sm:blur-2xl"
        style={{
          borderRadius: '32px',
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(125,224,208,0.16), rgba(139,157,255,0.14) 55%, transparent 78%)',
          animation: reduced ? undefined : 'breathe 7s ease-in-out infinite',
        }}
      />

      <div
        className="relative p-px min-w-0 max-w-full"
        style={{ borderRadius: '26px' }}
      >
        <span
          aria-hidden
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: '26px' }}
        >
          <span
            className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(125,224,208,0.95), rgba(169,182,255,0.85) 25%, rgba(196,132,255,0.6) 45%, rgba(255,255,255,0.06) 62%, rgba(125,224,208,0.95))',
              animation: reduced ? undefined : 'halo-spin 7s linear infinite',
            }}
          />
        </span>

        <div
          className="relative overflow-hidden bg-[rgba(14,19,38,0.72)] p-5 sm:p-9 backdrop-blur-2xl min-w-0 max-w-full"
          style={{
            borderRadius: '25px',
            boxShadow:
              '0 1px 0 0 rgba(255,255,255,0.10) inset, 0 40px 90px -40px rgba(4,7,20,0.95)',
          }}
        >
          {/* Subtle cyan accent glow in top corner */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-28 -top-28 size-72 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(125,224,208,0.20), transparent 70%)',
            }}
          />

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] sm:text-[9.5px] font-medium tracking-[0.16em] text-accent-foreground uppercase">
              Featured
            </span>
            {isMostVisited && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,178,120,0.4)] bg-[rgba(255,150,80,0.12)] px-2.5 py-1 font-mono text-[9px] sm:text-[9.5px] tracking-[0.16em] text-[#ffc79a] uppercase">
                Most visited
              </span>
            )}
            <span className="font-mono text-[9.5px] sm:text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              {featured.kicker}
            </span>
          </div>

          <h2
            id="featured-roadmap-title"
            className="mt-3.5 font-display text-[1.75rem] leading-[1.05] tracking-[-0.015em] sm:text-[2.8rem] lg:text-[3rem] break-words"
          >
            {featured.title}
          </h2>
          <p className="mt-3 max-w-[52ch] text-[13.5px] leading-[1.6] text-secondary-foreground sm:text-[15px] sm:leading-[1.7] break-words">
            {featured.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-border pt-5 sm:grid-cols-4 sm:gap-x-6 sm:pt-6">
            {featured.meta.map((item) => (
              <div key={item.label} className="min-w-0">
                <dt className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] text-muted-foreground uppercase truncate">
                  {item.label}
                </dt>
                <dd className="mt-1 text-[13px] sm:text-[14px] font-medium text-foreground truncate">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <TrackedLink
            href={featured.href}
            event="link_click"
            meta={{ card: 'featured_roadmap' }}
            className="group relative mt-6 sm:mt-8 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-primary px-6 py-3.5 sm:py-4 text-[14px] sm:text-[15px] font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/35 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[320%]"
            />
            <span className="relative">{featured.cta}</span>
            <ArrowUpRight className="relative size-[17px] sm:size-[18px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </TrackedLink>

          <p className="mt-3 text-center font-mono text-[10px] sm:text-[10.5px] tracking-[0.12em] text-muted-foreground">
            Free · No sign-up · Hosted on Microsoft Learn
          </p>
        </div>
      </div>
    </section>
  )
}
