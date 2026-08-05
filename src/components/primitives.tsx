import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { track } from '../lib/analytics'

const SPRING = { type: 'spring' as const, stiffness: 220, damping: 26, mass: 0.9 }

/** Fades + lifts its children once, when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -8% 0px' })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? undefined : { opacity: 0, y: 22, filter: 'blur(6px)' }}
      animate={
        inView || reduced ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined
      }
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Frosted panel with a cursor spotlight and an optional 3D tilt that tracks the
 * pointer. Both effects are pointer-driven only — no motion on touch or reduced
 * motion, where they would just cost battery.
 */
export function GlassPanel({
  children,
  className = '',
  tilt = false,
  as = 'div',
  ...rest
}: {
  children: ReactNode
  className?: string
  tilt?: boolean
  as?: 'div' | 'section' | 'article'
} & ComponentPropsWithoutRef<'div'>) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const Tag = as

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${nx * 100}%`)
    el.style.setProperty('--my', `${ny * 100}%`)
    el.style.setProperty('--spot', '1')
    if (tilt && !reduced) {
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - ny) * 6}deg) rotateY(${(nx - 0.5) * 8}deg) translateZ(0)`
    }
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--spot', '0')
    el.style.transform = ''
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative overflow-hidden rounded-[var(--radius)] border border-border bg-card backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-500 ease-out hover:border-[rgba(173,186,255,0.3)] ${className}`}
      style={{
        boxShadow:
          '0 1px 0 0 rgba(255,255,255,0.07) inset, 0 24px 60px -32px rgba(4,7,20,0.9)',
      }}
      {...rest}
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--spot,0)] transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(169,182,255,0.14), transparent 70%)',
        }}
      />
      {/* Glass reflection along the top edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />
      <div className="relative">{children}</div>
    </Tag>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span aria-hidden className="text-[9px] text-accent/80">
        ◆
      </span>
      <h2 className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
        {children}
      </h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

/** Outbound link that reports a click event before the browser navigates. */
export function TrackedLink({
  href,
  event,
  meta,
  children,
  className,
  ...rest
}: {
  href: string
  event: string
  meta?: Record<string, string | number>
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={className}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      onClick={() => track(event, { href, ...meta })}
      {...rest}
    >
      {children}
    </a>
  )
}

/** Hairline progress meter — value is also exposed as text for screen readers. */
export function Meter({ value, tone = 'primary' }: { value: number; tone?: 'primary' | 'accent' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-[3px] w-full overflow-hidden rounded-full bg-white/10"
    >
      <motion.div
        className={`h-full rounded-full ${tone === 'accent' ? 'bg-accent' : 'bg-primary'}`}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${value}%` : 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
