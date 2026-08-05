import { useEffect } from 'react'
import Atmosphere from './components/Atmosphere'
import Hero from './components/Hero'
import { Certifications, Collections, Learning, Projects, Social } from './components/Sections'
import { Reveal } from './components/primitives'
import { site } from './data/site'
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

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Asymmetric split: hero holds still on the left, the dossier scrolls. */}
        <main
          id="hub"
          className="grid gap-14 py-14 sm:py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24"
        >
          <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-16">
            <Reveal>
              <Hero />
            </Reveal>
          </div>

          {/*
            Mobile reads roadmap → links → work → collections → credentials, so a
            visitor arriving from a bio reaches the links in one thumb scroll.
            Desktop keeps the editorial order, with links closing the column.
          */}
          <div className="flex flex-col gap-14 lg:py-24">
            <div className="order-1 lg:order-5">
              <Social />
            </div>
            <div className="order-2 lg:order-1">
              <Projects />
            </div>
            <div className="order-3 lg:order-2">
              <Collections />
            </div>
            <div className="order-4 lg:order-3">
              <Certifications />
            </div>
            <div className="order-5 lg:order-4">
              <Learning />
            </div>

            <footer className="order-6 border-t border-border pt-8 pb-4 lg:order-6">
              <p className="font-display text-[1.5rem] leading-tight text-foreground">
                Built late, on purpose.
              </p>
              <p className="mt-2 max-w-[42ch] text-[13px] leading-[1.7] text-muted-foreground">
                Designed and coded by {site.person.shortName}. React, TypeScript, Tailwind — no
                template, no builder.
              </p>
              <p className="mt-6 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                © {new Date().getFullYear()} {site.person.name}
              </p>
            </footer>
          </div>
        </main>
      </div>
    </>
  )
}
