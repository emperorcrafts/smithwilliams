'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { useIntroDone } from '@/lib/stores'
import { CtaLink } from '@/components/site/cta-link'

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false, loading: () => null })

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const introDone = useIntroDone()

  useEffect(() => {
    if (!introDone) return
    root.current?.classList.add('hero-is-entered')
  }, [introDone])

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="hero-film relative isolate min-h-svh overflow-hidden bg-[#07060b]"
    >
      <HeroScene />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_44%,transparent_17%,rgba(5,4,7,0.34)_68%,rgba(5,4,7,0.74)_100%)]" />
      <div className="relative mx-auto flex min-h-svh max-w-[1600px] items-end px-5 pt-28 pb-12 sm:items-center sm:px-9 sm:pb-20 lg:px-16">
        <div className="hero-title-block max-w-[660px] pb-14 sm:pb-0">
          <p className="mb-5 flex items-center gap-4 text-[9px] font-medium tracking-[0.46em] text-[#c8a8ec] uppercase sm:text-[11px] sm:tracking-[0.58em]">
            <span aria-hidden="true" className="h-px w-10 bg-[#b995df]" />
            The Dark Creator
          </p>
          <h1 id="hero-title" className="font-display leading-[0.78] font-semibold tracking-[-0.055em]">
            <span className="block text-[clamp(3.65rem,10vw,9.7rem)] text-[#ded9e4]">Smith</span>
            <span className="mt-3 block text-[clamp(3.65rem,10vw,9.7rem)] text-[#a9a0b2]">Williams</span>
          </h1>
          <div className="mt-7 h-px w-full max-w-[410px] bg-gradient-to-r from-[#b8a2cb]/70 via-[#88729a]/25 to-transparent sm:mt-9" />
          <p className="mt-5 text-[10px] font-medium tracking-[0.28em] text-[#d0c8d8] uppercase sm:mt-6 sm:text-[12px] sm:tracking-[0.43em]">
            I play. I design. I build.
          </p>
          <p className="mt-3 max-w-[430px] text-pretty text-[13px] leading-[1.75] text-[#b6b0bd] sm:mt-4 sm:text-[15px]">
            A creator at the edge of worlds — building bold visual identities, live experiences and digital realms.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9">
            <CtaLink href="#realms" variant="ghost" className="border-[#bba4d0]/50 bg-[#100c15]/70 px-5 py-3 text-[9px] tracking-[0.23em] sm:px-7 sm:py-4 sm:text-[10px] sm:tracking-[0.3em]">
              Enter the realms
            </CtaLink>
            <CtaLink href="#contact" variant="ghost" className="border-transparent px-3 py-3 text-[9px] tracking-[0.2em] text-[#d0c8d8] sm:text-[10px] sm:tracking-[0.3em]">
              Connect with me
            </CtaLink>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute right-6 bottom-8 hidden items-center gap-4 text-[9px] tracking-[0.34em] text-[#c6bfce]/60 uppercase md:flex md:right-12">
        <span className="h-px w-12 bg-[#c6bfce]/40" />
        A world beyond the ordinary
      </div>
    </section>
  )
}
