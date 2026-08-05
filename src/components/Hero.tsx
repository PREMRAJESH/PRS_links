import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Copy, Check, Flame, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
// Square 320px crop of the uploaded portrait — the original is 1.9 MB.
import avatarImage from '../assets/pfp.png'
import { site } from '../data/site'
import { mostVisitedCard, track } from '../lib/analytics'
import { TrackedLink } from './primitives'

const ROLE_INTERVAL = 2600

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()
  const { person } = site

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % person.roles.length),
      ROLE_INTERVAL,
    )
    return () => clearInterval(id)
  }, [person.roles.length])

  const copyEmail = async () => {
    await navigator.clipboard.writeText('sargarapremrajesh@gmail.com')
    track('email_copied')
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <header className="relative">
      <div className="flex items-start gap-5 sm:gap-7">
        {/* Avatar with a slow orbiting halo */}
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
        </div>

        <div className="min-w-0 pt-1">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1 font-mono text-[10.5px] tracking-[0.14em] text-secondary-foreground uppercase">
            <span className="relative flex size-[6px]">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-[6px] rounded-full bg-accent" />
            </span>
            {person.status.label}
          </p>

          <h1 className="font-display text-[2.6rem] leading-[0.95] tracking-[-0.015em] text-foreground sm:text-[3.4rem]">
            {person.name}
          </h1>

          {/* Rotating role, height-locked so nothing below shifts */}
          <div className="mt-2 h-6 overflow-hidden">
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
        </div>
      </div>

      <p className="mt-7 max-w-[46ch] text-[15.5px] leading-[1.7] text-secondary-foreground">
        {person.intro}
      </p>

      <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
        {person.location}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <TrackedLink
          href={site.featured.href}
          event="cta_click"
          meta={{ cta: 'featured_roadmap' }}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[13.5px] font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
        >
          Start the roadmap
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </TrackedLink>

        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-5 py-3 text-[13.5px] text-secondary-foreground transition-colors duration-300 hover:border-[rgba(173,186,255,0.34)] hover:text-foreground"
        >
          {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
          {copied ? 'Copied to clipboard' : 'Copy email'}
        </button>
      </div>

      <FeaturedResource />
    </header>
  )
}

/**
 * The gravity well of the page. Everything else is a flat glass panel; this one
 * gets a live gradient border, a breathing glow, and badges — so the eye lands
 * here first without any single element shouting.
 */
function FeaturedResource() {
  const { featured } = site
  const reduced = useReducedMotion()
  const [isMostVisited, setIsMostVisited] = useState(false)

  // Read after mount so the badge reflects real recorded behaviour, not a guess.
  useEffect(() => setIsMostVisited(mostVisitedCard() === 'featured_roadmap'), [])

  return (
    <section
      aria-labelledby="featured-title"
      className="relative mt-12 lg:-mx-4 xl:-mx-6"
    >
      {/* Outer breathing glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[36px] blur-2xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(125,224,208,0.16), rgba(139,157,255,0.14) 55%, transparent 78%)',
          animation: reduced ? undefined : 'breathe 7s ease-in-out infinite',
        }}
      />

      {/* Animated gradient border: a rotating conic sheet clipped to a 1px ring */}
      <div className="relative rounded-[24px] p-px">
        <span
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-[24px]"
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
          className="relative overflow-hidden rounded-[23px] bg-[rgba(14,19,38,0.72)] p-7 backdrop-blur-2xl sm:p-9"
          style={{
            boxShadow:
              '0 1px 0 0 rgba(255,255,255,0.10) inset, 0 40px 90px -40px rgba(4,7,20,0.95)',
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-28 -top-28 size-72 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(125,224,208,0.20), transparent 70%)',
            }}
          />

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[9.5px] font-medium tracking-[0.16em] text-accent-foreground uppercase">
              <Sparkles className="size-3" />
              Featured
            </span>
            {isMostVisited && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,178,120,0.4)] bg-[rgba(255,150,80,0.12)] px-2.5 py-1 font-mono text-[9.5px] tracking-[0.16em] text-[#ffc79a] uppercase">
                <Flame className="size-3" />
                Most visited
              </span>
            )}
            <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              {featured.kicker}
            </span>
          </div>

          <h2
            id="featured-title"
            className="mt-4 font-display text-[2.35rem] leading-[1.02] tracking-[-0.015em] sm:text-[3rem]"
          >
            {featured.title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-secondary-foreground">
            {featured.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
            {featured.meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {m.label}
                </dt>
                <dd className="mt-1.5 text-[14px] text-foreground">{m.value}</dd>
              </div>
            ))}
          </dl>

          <TrackedLink
            href={featured.href}
            event="link_click"
            meta={{ card: 'featured_roadmap' }}
            className="group relative mt-8 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-primary px-7 py-4 text-[15px] font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            {/* Sheen sweep on hover */}
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
