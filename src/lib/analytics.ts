/**
 * Thin, provider-agnostic event bus. GA4 / Clarity are picked up automatically
 * when their scripts exist; swap `sinks` for Supabase or a custom endpoint later.
 */

type Payload = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

const COUNTS_KEY = 'prs-hub:click-counts'

/** Local click tally — powers the "Most visited" badge until a backend exists. */
export function readClickCounts(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(COUNTS_KEY) ?? '{}') as Record<string, number>
  } catch {
    return {}
  }
}

function bumpClickCount(key: string) {
  try {
    const counts = readClickCounts()
    counts[key] = (counts[key] ?? 0) + 1
    localStorage.setItem(COUNTS_KEY, JSON.stringify(counts))
  } catch {
    /* storage unavailable — tracking is best-effort */
  }
}

/** The card with the most recorded clicks, if any card is a clear favourite. */
export function mostVisitedCard(): string | null {
  const entries = Object.entries(readClickCounts())
  if (!entries.length) return null
  return entries.sort((a, b) => b[1] - a[1])[0][0]
}

export function track(event: string, payload: Payload = {}) {
  if (typeof payload.card === 'string') bumpClickCount(payload.card)

  const enriched: Payload = {
    ...payload,
    referrer: document.referrer || 'direct',
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  }

  window.gtag?.('event', event, enriched)
  window.clarity?.('event', event)

  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, enriched)
  }
}

/** Page view + time-on-page + max scroll depth, reported once on unload. */
export function initSessionTracking() {
  const started = Date.now()
  let maxDepth = 0

  track('page_view', { path: location.pathname })

  const onScroll = () => {
    const scrollable = document.body.scrollHeight - window.innerHeight
    const depth = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100
    maxDepth = Math.max(maxDepth, Math.min(depth, 100))
  }

  const onLeave = () => {
    track('session_end', {
      seconds_on_page: Math.round((Date.now() - started) / 1000),
      scroll_depth: maxDepth,
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('pagehide', onLeave)

  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('pagehide', onLeave)
  }
}
