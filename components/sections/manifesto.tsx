'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = ['I play', 'I design', 'I build']

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-row',
        { xPercent: 0 },
        {
          xPercent: -25,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} aria-label="I play. I design. I build." role="img" className="overflow-hidden border-y border-border bg-obsidian py-10 md:py-14">
      <div aria-hidden="true" className="manifesto-row flex w-max gap-12 whitespace-nowrap">
        {Array.from({ length: 4 }).flatMap((_, r) =>
          words.map((w, i) => (
            <span key={`${r}-${i}`} className="flex items-center gap-12 font-display text-5xl font-semibold uppercase md:text-8xl">
              <span className={i === 1 ? 'text-violet-metal' : 'text-transparent [-webkit-text-stroke:1px_rgba(200,196,210,0.45)]'}>
                {w}
              </span>
              <span className="size-3 rotate-45 bg-electric/70" />
            </span>
          )),
        )}
      </div>
    </div>
  )
}
