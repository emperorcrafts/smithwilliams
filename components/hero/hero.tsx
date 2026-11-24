'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntroDone } from '@/lib/stores'
import { CtaLink } from '@/components/site/cta-link'

gsap.registerPlugin(ScrollTrigger)

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false })

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const introDone = useIntroDone()
  const reduceMotion = useRef(false)

  useLayoutEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion.current) return
    const ctx = gsap.context(() => {
      gsap.set('.hero-line > span', { yPercent: 110 })
      gsap.set('.hero-fade', { autoAlpha: 0, y: 24 })
      gsap.set('.hero-char', { autoAlpha: 0, scale: 1.08, y: 40 })
      gsap.set('.hero-rule', { scaleX: 0 })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!introDone || reduceMotion.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.to('.hero-char', { autoAlpha: 1, scale: 1, y: 0, duration: 2.2 }, 0)
        .to('.hero-line > span', { yPercent: 0, duration: 1.6, stagger: 0.12 }, 0.15)
        .to('.hero-rule', { scaleX: 1, duration: 1.4, ease: 'power3.inOut' }, 0.6)
        .to('.hero-fade', { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.1 }, 0.8)

      gsap.to('.hero-content', {
        yPercent: -18,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-char-scroll', {
        yPercent: 12,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      if (window.matchMedia('(pointer: fine)').matches) {
        const layers = gsap.utils.toArray<HTMLElement>('[data-depth]').map((el) => ({
          depth: Number(el.dataset.depth),
          x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }),
        }))
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          layers.forEach((l) => {
            l.x(-nx * l.depth * 40)
            l.y(-ny * l.depth * 24)
          })
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      }
    }, root)
    return () => ctx.revert()
  }, [introDone])

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate min-h-svh overflow-hidden bg-obsidian"
    >
      <div aria-hidden="true" data-depth="0.25" className="absolute -inset-10 -z-30">
        <Image
          src="/images/realm-gothic.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-obsidian/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
      </div>

      <div
        aria-hidden="true"
        className="lightning-flash absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_75%_10%,rgba(155,77,255,0.35),transparent_55%)] mix-blend-screen"
      />

      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>

      <div aria-hidden="true" className="fog absolute inset-x-[-20%] bottom-[-10%] -z-10 h-[55%] bg-[radial-gradient(ellipse_at_center,rgba(100,38,184,0.22),transparent_65%)] blur-2xl" />

      {/* Character — layered 2.5D depth */}
      <div data-depth="0.6" className="hero-char-scroll pointer-events-none absolute inset-y-0 right-[-18%] left-[-18%] flex items-end justify-center sm:right-[-6%] sm:left-auto sm:w-[70%] lg:right-[2%] lg:w-[54%]">
        <div className="hero-char relative h-[86svh] w-full sm:h-[96svh] lg:h-[104svh]">
          <div
            aria-hidden="true"
            className="absolute inset-[12%_8%_20%_8%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(100,38,184,0.45),transparent_68%)] blur-3xl"
          />
          <Image
            src="/images/character.webp"
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="translate-x-6 translate-y-6 object-contain object-bottom opacity-50 blur-xl brightness-0"
          />
          <Image
            src="/images/character.webp"
            alt="Smith Williams as The Dark Creator: horned, violet-eyed, with massive black feathered wings, a black gothic coat and a glowing purple sword"
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          />
          <div
            aria-hidden="true"
            className="blade-pulse absolute bg-[radial-gradient(ellipse_at_center,rgba(155,77,255,0.45),transparent_65%)] mix-blend-screen"
            style={{ left: '22%', top: '56%', width: '16%', height: '34%', transform: 'rotate(22deg)' }}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        data-depth="1.1"
        className="fog-slow pointer-events-none absolute inset-x-[-20%] bottom-[-6%] h-[32%] bg-[radial-gradient(ellipse_at_center,rgba(11,8,18,0.95),transparent_70%)] blur-xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-obsidian via-obsidian/85 to-transparent lg:h-[28%]" />

      <div className="hero-content relative mx-auto flex min-h-svh max-w-[1600px] flex-col justify-end px-5 pt-24 pb-10 md:px-10 md:pb-14 lg:justify-center lg:pb-24">
        <div className="max-w-4xl">
          <p className="hero-fade mb-4 flex items-center gap-3 text-[10px] font-medium tracking-[0.38em] text-electric uppercase sm:mb-6 sm:gap-4 sm:text-[11px] sm:tracking-[0.5em]">
            <span aria-hidden="true" className="h-px w-10 bg-electric" />
            The Dark Creator
          </p>

          <h1 id="hero-title" className="font-display leading-[0.82] font-semibold tracking-tight">
            <span className="hero-line block overflow-hidden pb-2">
              <span className="text-metal block text-[clamp(3.2rem,9.5vw,10rem)]">Smith</span>
            </span>
            <span className="hero-line block overflow-hidden pb-3">
              <span className="text-violet-metal block text-[clamp(3.2rem,9.5vw,10rem)]">Williams</span>
            </span>
          </h1>

          <div className="hero-rule mt-4 h-px w-full max-w-md origin-left bg-gradient-to-r from-silver/60 to-transparent sm:mt-6" />

          <p className="hero-fade mt-4 text-[11px] font-medium tracking-[0.28em] text-ghost uppercase sm:mt-6 sm:text-sm sm:tracking-[0.45em] md:text-base">
            Gamer. Designer. Developer.
          </p>
          <p className="hero-fade mt-3 max-w-md text-pretty text-[13px] leading-[1.65] text-muted-foreground sm:mt-4 sm:text-base sm:leading-relaxed">
            {"I don't follow reality. I create it — through streams, striking visuals and cinematic websites built for brands that refuse to blend in."}
          </p>

          <div className="hero-fade mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-10 sm:gap-4">
            <CtaLink href="#realms" className="px-4 py-3 text-[9px] tracking-[0.2em] sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[0.32em]">
              <span className="sm:hidden">Explore universe</span>
              <span className="hidden sm:inline">Explore my universe</span>
            </CtaLink>
            <CtaLink
              href="#contact"
              variant="ghost"
              className="border-0 px-0 py-2 text-[9px] tracking-[0.2em] text-silver sm:border sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[0.32em]"
            >
              <span className="sm:hidden">Socials</span>
              <span className="hidden sm:inline">Find me beyond the realm</span>
            </CtaLink>
          </div>
        </div>
      </div>

      <div className="hero-fade pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="text-[10px] tracking-[0.5em] text-silver/60 uppercase">Scroll</span>
        <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-silver/15">
          <span className="scanline absolute inset-x-0 h-1/2 bg-electric" />
        </span>
      </div>

      <p className="hero-fade absolute right-5 bottom-6 hidden font-display text-xs tracking-[0.4em] text-silver/60 uppercase md:block md:right-10">
        I play. I design. I build.
      </p>
    </section>
  )
}
