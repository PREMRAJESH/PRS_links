import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
// Square 320px crop of the uploaded portrait — the original is 1.9 MB.
import avatarImage from '../assets/pfp.png'
import { site } from '../data/site'
import { mostVisitedCard } from '../lib/analytics'
import { TrackedLink } from './primitives'

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
    <header className="relative">
      <div className="flex items-start gap-5 sm:gap-7">
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
            className="absolute -inset-[14px] rounded-full blur-xl"
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
            className="relative block size-[84px] rounded-full border border-white/20 bg-[#0d1330] object-cover sm:size-[104px]"
          />

          {/* Status badge */}
          {person.status && (
            <span
              className="absolute bottom-0 right-0 z-10 flex size-4 items-center justify-center rounded-full bg-[#0d1330] ring-2 ring-[#0d1330]"
              title={person.status.label}
              aria-label={person.status.label}
            >
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
          )}
        </div>

        <div className="min-w-0 pt-0.5">
          <h1 className="font-display text-[2.5rem] leading-[0.95] tracking-[-0.015em] text-foreground sm:text-[3.4rem]">
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
                className="font-mono text-[12.5px] tracking-[0.1em] text-primary"
                aria-live="polite"
              >
                {person.roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-1 text-[14.5px] leading-[1.65] text-secondary-foreground sm:text-[15px] sm:leading-[1.7]">
            {person.subtitle}
          </p>
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
      className="relative mt-7 sm:mt-10 lg:-mx-4 xl:-mx-6"
    >
      {/* Outer breathing glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 blur-2xl"
        style={{
          borderRadius: '36px',
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(125,224,208,0.16), rgba(139,157,255,0.14) 55%, transparent 78%)',
          animation: reduced ? undefined : 'breathe 7s ease-in-out infinite',
        }}
      />

      <div
        className="relative p-px"
        style={{ borderRadius: '28px' }}
      >
        <span
          aria-hidden
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: '28px' }}
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
          className="relative overflow-hidden bg-[rgba(14,19,38,0.72)] p-6 backdrop-blur-2xl sm:p-9"
          style={{
            borderRadius: '27px',
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[9.5px] font-medium tracking-[0.16em] text-accent-foreground uppercase">
              Featured
            </span>
            {isMostVisited && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,178,120,0.4)] bg-[rgba(255,150,80,0.12)] px-2.5 py-1 font-mono text-[9.5px] tracking-[0.16em] text-[#ffc79a] uppercase">
                Most visited
              </span>
            )}
            <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              {featured.kicker}
            </span>
          </div>

          <h2
            id="featured-roadmap-title"
            className="mt-4 font-display text-[2.2rem] leading-[1.02] tracking-[-0.015em] sm:text-[2.8rem] lg:text-[3rem]"
          >
            {featured.title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-[14.5px] leading-[1.65] text-secondary-foreground sm:text-[15px] sm:leading-[1.7]">
            {featured.description}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border pt-6 sm:grid-cols-4 sm:gap-x-6">
            {featured.meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-[14px] text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <TrackedLink
            href={featured.href}
            event="link_click"
            meta={{ card: 'featured_roadmap' }}
            className="group relative mt-8 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-primary px-7 py-4 text-[15px] font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/35 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[320%]"
            />
            <span className="relative">{featured.cta}</span>
            <ArrowUpRight className="relative size-[18px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </TrackedLink>

          <p className="mt-3 text-center font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground">
            Free · No sign-up · Hosted on Microsoft Learn
          </p>
        </div>
      </div>
    </section>
  )
}
