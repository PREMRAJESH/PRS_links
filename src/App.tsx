import { useEffect } from 'react'
import Atmosphere from './components/Atmosphere'
import Hero from './components/Hero'
import { Collections, FeaturedVideo, Social } from './components/Sections'
import { Reveal } from './components/primitives'
import { initSessionTracking } from './lib/analytics'

export default function App() {
  useEffect(initSessionTracking, [])

  // Scrollbars surface only while the page is actually moving.
  useEffect(() => {
    let timer: number
    const onScroll = () => {
      document.documentElement.classList.add('scrolling')
      clearTimeout(timer)
      timer = window.setTimeout(() => document.documentElement.classList.remove('scrolling'), 700)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Atmosphere />
      <a
        href="#hub"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-[1400px] min-w-0 overflow-hidden px-4 sm:px-8 lg:px-12">
        {/* Asymmetric split: hero on the left, interactive showcase on the right */}
        <main
          id="hub"
          className="grid min-w-0 max-w-full gap-8 py-5 sm:gap-14 sm:py-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24"
        >
          <div className="min-w-0 max-w-full lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-start lg:pt-8 lg:pb-10">
            <Reveal className="min-w-0 w-full">
              <Hero />
            </Reveal>
          </div>

          <div className="flex min-w-0 max-w-full flex-col gap-10 sm:gap-12 lg:py-14">
            <div>
              <Reveal delay={0.05}>
                <FeaturedVideo />
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.1}>
                <Collections />
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.15}>
                <Social />
              </Reveal>
            </div>

            <footer className="border-t border-border pt-8 pb-4">
              <p className="font-display text-[1.35rem] leading-tight text-foreground sm:text-[1.5rem]">
                Built with care by Prem.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </>
  )
}