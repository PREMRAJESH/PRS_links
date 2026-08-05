import { useEffect, useMemo, useRef } from 'react'

/**
 * The cinematic ground: night sky gradient, drifting aurora ribbons, low fog,
 * a distant ridge + city glow, and a sparse star field. Everything is heavily
 * blurred so foreground copy always wins on contrast.
 */
export default function Atmosphere() {
  const skyRef = useRef<HTMLDivElement>(null)

  // Gentle mouse parallax on the whole sky, applied via CSS vars (no re-render).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      skyRef.current?.style.setProperty('--px', `${x * 14}px`)
      skyRef.current?.style.setProperty('--py', `${y * 10}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: `${(i * 37.4) % 100}%`,
        top: `${(i * 61.7) % 72}%`,
        size: i % 9 === 0 ? 2.2 : 1.2,
        delay: `${(i % 13) * 0.7}s`,
        duration: `${5 + (i % 7)}s`,
      })),
    [],
  )

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#05070f]">
      <div
        ref={skyRef}
        className="absolute -inset-[10%] will-change-transform"
        style={{ transform: 'translate3d(var(--px, 0px), var(--py, 0px), 0)' }}
      >
        {/* Base night sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% -10%, #1b2a63 0%, #101a44 32%, #080c22 62%, #05070f 100%)',
          }}
        />

        {/* Stars */}
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}

        {/* Aurora ribbons */}
        <div
          className="absolute -top-[18%] left-[-10%] h-[70vh] w-[80vw] blur-[110px]"
          style={{
            background:
              'conic-gradient(from 200deg at 40% 50%, rgba(125,224,208,0.30), rgba(120,132,255,0.34), rgba(196,132,255,0.22), transparent 70%)',
            animation: 'aurora-drift 34s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -top-[8%] right-[-16%] h-[62vh] w-[70vw] blur-[130px]"
          style={{
            background:
              'conic-gradient(from 20deg at 60% 40%, rgba(122,150,255,0.30), rgba(88,206,214,0.20), transparent 68%)',
            animation: 'aurora-drift 46s ease-in-out -12s infinite reverse',
          }}
        />

        {/* Distant city glow on the horizon */}
        <div
          className="absolute bottom-[26%] left-1/2 h-[26vh] w-[120vw] -translate-x-1/2 blur-[80px]"
          style={{
            background:
              'radial-gradient(60% 100% at 50% 100%, rgba(150,190,255,0.30), rgba(90,120,220,0.10) 55%, transparent 80%)',
            animation: 'breathe 12s ease-in-out infinite',
          }}
        />

        {/* Mountain ridges */}
        <svg
          className="absolute bottom-0 left-0 w-[130%] max-w-none opacity-90"
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
        >
          <path
            d="M0 300 L180 210 L320 268 L470 168 L620 258 L760 196 L900 272 L1060 200 L1220 262 L1440 190 L1440 420 L0 420 Z"
            fill="#0a1030"
            opacity="0.72"
          />
          <path
            d="M0 352 L160 300 L300 340 L460 272 L640 336 L820 288 L1000 344 L1180 292 L1440 348 L1440 420 L0 420 Z"
            fill="#060a1c"
          />
        </svg>

        {/* Low fog banks */}
        <div
          className="absolute bottom-[6%] left-0 h-[24vh] w-[160%] blur-[60px]"
          style={{
            background:
              'linear-gradient(to top, rgba(180,200,255,0.16), rgba(180,200,255,0.05) 55%, transparent)',
            animation: 'fog-slide 60s linear infinite alternate',
          }}
        />
        <div
          className="absolute bottom-0 left-0 h-[16vh] w-[150%] blur-[40px]"
          style={{
            background: 'linear-gradient(to top, rgba(140,170,255,0.20), transparent)',
            animation: 'fog-slide 90s linear -20s infinite alternate-reverse',
          }}
        />
      </div>

      {/* Rain: fine diagonal streaks, barely there */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(78deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 9px)',
          maskImage: 'linear-gradient(to bottom, black, transparent 78%)',
        }}
      />

      {/* Vignette + grain keep the glass panels legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(100% 70% at 50% 40%, transparent 40%, rgba(3,5,12,0.55) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
