'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'The Dark Creator Universe',
    category: 'Interactive 3D website',
    image: '/images/realm-gothic.png',
    alt: 'Gothic obsidian cathedral environment used across the Dark Creator website',
  },
  {
    title: 'Smith Williams Identity',
    category: 'Logo & character branding',
    image: '/images/logo.webp',
    alt: 'Smith Williams logo with horned character and gothic lettering',
    contain: true,
  },
  {
    title: 'Eclipse Blade',
    category: 'Poster design',
    image: '/images/design-poster.png',
    alt: 'Poster with silver sword and violet eclipse',
  },
  {
    title: 'Obsidian Crest',
    category: 'Brand identity',
    image: '/images/design-branding.png',
    alt: 'Black and silver stationery brand identity',
  },
  {
    title: 'Shatterpoint',
    category: 'Gaming thumbnail',
    image: '/images/design-thumbnail.png',
    alt: 'Gaming thumbnail with a dark knight and violet energy',
  },
]

export function FeaturedWork() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!section.current || !track.current) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current!
      const distance = () => el.scrollWidth - window.innerWidth
      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={section} id="work" aria-labelledby="work-title" className="relative overflow-hidden bg-transparent py-24 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:pt-20 lg:pb-0">
      <div className="mx-auto mb-12 flex w-full max-w-[1600px] items-end justify-between gap-6 px-5 md:px-10 lg:mb-14">
        <div>
          <p className="mb-4 flex items-center gap-4 text-[11px] font-medium tracking-[0.45em] text-electric uppercase">
            <span aria-hidden="true" className="h-px w-10 bg-electric/70" />
            Featured projects
          </p>
          <h2 id="work-title" className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none font-semibold text-ghost">
            Selected work
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground md:block">
          Scroll to travel through a selection of identities, artwork and digital builds.
        </p>
      </div>

      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:px-10 lg:snap-none lg:overflow-visible lg:pb-0 lg:pl-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))]"
      >
        {projects.map((p, i) => (
          <li key={p.title} className="group w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[38vw] xl:w-[32vw]">
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-[radial-gradient(ellipse_at_center,#190c2b,#050407_75%)]">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 82vw"
                className={
                  p.contain
                    ? 'object-contain p-10 transition-transform duration-1000 group-hover:scale-105'
                    : 'object-cover transition-transform duration-1000 group-hover:scale-105'
                }
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-80" />
              <span className="absolute top-5 left-5 font-display text-sm text-silver/70">{String(i + 1).padStart(2, '0')}</span>
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-[10px] tracking-[0.4em] text-electric uppercase">{p.category}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ghost md:text-3xl">{p.title}</h3>
              </div>
            </div>
          </li>
        ))}
        <li aria-hidden="true" className="w-px shrink-0 lg:w-[10vw]" />
      </ul>
    </section>
  )
}
