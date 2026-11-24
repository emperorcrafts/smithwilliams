'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { introStore } from '@/lib/stores'
import { Feather } from '@/components/motion/feather'

const SEEN_KEY = 'sw-intro-seen'

const particles = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 1 + ((i * 7) % 3),
  delay: (i % 9) * 0.12,
}))

const feathers = [
  { left: '12%', rotate: -20, delay: 0 },
  { left: '28%', rotate: 15, delay: 0.4 },
  { left: '70%', rotate: -35, delay: 0.2 },
  { left: '84%', rotate: 25, delay: 0.6 },
  { left: '55%', rotate: 5, delay: 0.9 },
]

export function CinematicIntro() {
  const [mounted, setMounted] = useState(true)
  const [loadedAssets, setLoadedAssets] = useState(0)
  const [entryReady, setEntryReady] = useState(false)
  const progress = Math.round((loadedAssets / 2) * 100)
  const root = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  const finish = useCallback(() => {
    sessionStorage.setItem(SEEN_KEY, '1')
    document.documentElement.classList.remove('intro-lock')
    introStore.set(true)
    setMounted(false)
  }, [])

  const skip = useCallback(() => {
    window.dispatchEvent(new Event('sw:enter-dark-realm'))
    timeline.current?.kill()
    gsap.to(root.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.out', onComplete: finish })
  }, [finish])

  const enterRealm = useCallback(() => skip(), [skip])

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || sessionStorage.getItem(SEEN_KEY)) {
      finish()
      return
    }

    document.documentElement.classList.add('intro-lock')
    root.current?.querySelector<HTMLButtonElement>('.intro-skip')?.focus({ preventScroll: true })

    const ctx = gsap.context(() => {
      gsap.set('.intro-char', { scale: 7, y: '33vh', filter: 'brightness(0)' })
      gsap.set('.intro-eyes, .intro-blade, .intro-logo-wrap, .intro-feather, .intro-particle, .intro-caption, .intro-runes', {
        autoAlpha: 0,
      })
      gsap.set('.intro-logo', { clipPath: 'inset(0% 100% 0% 0%)' })

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      timeline.current = tl

      // Scene 1 — particles emerge from darkness
      tl.to('.intro-particle', { autoAlpha: 1, duration: 1.2, stagger: { each: 0.03, from: 'random' } }, 0.2)
        .to('.intro-particle', { y: -40, duration: 6, ease: 'none' }, 0.2)
        .to('.intro-runes', { autoAlpha: 1, duration: 0.9 }, 0.35)
        .to('.intro-runes', { autoAlpha: 0, duration: 0.55 }, 1.25)
        .to('.intro-caption', { autoAlpha: 1, duration: 0.8 }, 0.6)

        // Scene 2 — eyes ignite
        .to('.intro-eyes', { autoAlpha: 1, duration: 0.9 }, 1.3)
        .to('.intro-char', { filter: 'brightness(0.22)', duration: 1 }, 1.4)
        .to('.intro-caption', { autoAlpha: 0, duration: 0.6 }, 2)

        // Scene 3 — camera pulls back to reveal the character and wings
        .to('.intro-char', { scale: 1, y: 0, duration: 3, ease: 'power3.inOut' }, 2.3)
        .to('.intro-char', { filter: 'brightness(0.95)', duration: 2.4, ease: 'power1.in' }, 2.6)
        .to('.intro-eyes', { autoAlpha: 0.5, duration: 1.5 }, 3.6)

        // Scene 4 — blade energy + feathers
        .to('.intro-blade', { autoAlpha: 1, duration: 0.15, repeat: 3, yoyo: true }, 4.6)
        .to('.intro-blade', { autoAlpha: 0.85, duration: 0.6 }, 5.2)
        .fromTo(
          '.intro-feather',
          { autoAlpha: 0, y: '-30vh' },
          { autoAlpha: 0.9, y: '110vh', duration: 5, ease: 'none', stagger: 0.25 },
          4.6,
        )

        // Scene 5 — metallic logo reveal
        .to('.intro-stage', { autoAlpha: 0.22, scale: 0.94, duration: 1.2 }, 5.8)
        .to('.intro-logo-wrap', { autoAlpha: 1, duration: 0.4 }, 6)
        .to('.intro-logo', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 6)
        .fromTo('.intro-shine', { xPercent: -120 }, { xPercent: 120, duration: 1.4, ease: 'power2.inOut' }, 6.9)
        .to('.intro-enter', { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 3.2)
        .call(() => setEntryReady(true), [], 3.2)
    }, root)

    return () => {
      ctx.revert()
      document.documentElement.classList.remove('intro-lock')
    }
  }, [finish])

  if (!mounted) return null

  return (
    <div
      ref={root}
      role="dialog"
      aria-label="Cinematic introduction"
      aria-modal="true"
      onKeyDown={(event) => {
        if (event.key === 'Escape') skip()
        if (event.key === 'Tab') {
          event.preventDefault()
          const visibleControls = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])
            .filter((button) => Number(window.getComputedStyle(button).opacity) > 0.05)
          const current = visibleControls.indexOf(document.activeElement as HTMLButtonElement)
          visibleControls[(current + 1) % visibleControls.length]?.focus()
        }
      }}
      className="fixed inset-0 z-[150] overflow-hidden bg-obsidian"
    >
      <div aria-hidden="true" className="absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="intro-particle absolute rounded-full bg-electric"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size * 2,
              height: p.size * 2,
              boxShadow: '0 0 8px rgba(155,77,255,0.8)',
            }}
          />
        ))}
      </div>

      <p aria-hidden="true" className="intro-runes absolute inset-x-0 top-[43%] text-center font-display text-[15px] tracking-[0.9em] text-[#cba4f4] [text-shadow:0_0_22px_rgba(180,112,255,0.82)] sm:text-lg">
        ᚷ · ᚨ · ᛟ · ᚱ · ᚠ
      </p>
      <p className="intro-caption absolute inset-x-0 top-[62%] text-center font-display text-xs tracking-[0.6em] text-silver/70 uppercase">
        From the darkness
      </p>

      <div className="intro-stage absolute inset-0 flex items-center justify-center">
        <div
          className="intro-char relative h-[88svh] will-change-transform"
          style={{ aspectRatio: '1280 / 1920', transformOrigin: '53.6% 12.3%' }}
        >
          <Image
            src="/images/character.webp"
            alt=""
            fill
            priority
            sizes="60vh"
            onLoad={() => setLoadedAssets((current) => Math.min(current + 1, 2))}
            className="object-contain"
          />
          {[
            { left: '51.9%', top: '11.7%' },
            { left: '55.4%', top: '12.85%' },
          ].map((eye) => (
            <span
              key={eye.left}
              className="intro-eyes absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: eye.left,
                top: eye.top,
                width: '3.2%',
                height: '1%',
                background:
                  'radial-gradient(ellipse at center, rgba(225,200,255,1) 0%, rgba(155,77,255,0.75) 35%, transparent 70%)',
                mixBlendMode: 'screen',
              }}
            />
          ))}
          <span
            className="intro-blade absolute"
            style={{
              left: '2%',
              top: '54%',
              width: '26%',
              height: '38%',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(155,77,255,0.55) 0%, transparent 65%)',
              mixBlendMode: 'screen',
              transform: 'rotate(20deg)',
            }}
          />
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-0">
        {feathers.map((f, i) => (
          <div
            key={i}
            className="intro-feather absolute top-0"
            style={{ left: f.left, transform: `rotate(${f.rotate}deg)` }}
          >
            <Feather className="h-16 w-6 md:h-24 md:w-8" />
          </div>
        ))}
      </div>

      <div className="intro-logo-wrap absolute inset-0 flex items-center justify-center px-6">
        <div className="relative w-[min(78vw,520px)]">
          <div
            className="intro-logo relative"
            style={{
              maskImage: 'url(/images/logo.webp)',
              WebkitMaskImage: 'url(/images/logo.webp)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <Image
              src="/images/logo.webp"
              alt="Smith Williams"
              width={517}
              height={483}
              priority
              onLoad={() => setLoadedAssets((current) => Math.min(current + 1, 2))}
              className="h-auto w-full"
            />
            <span
              aria-hidden="true"
              className="intro-shine absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.75) 48%, rgba(200,170,255,0.5) 52%, transparent 65%)',
                mixBlendMode: 'overlay',
              }}
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,4,7,0.9) 100%)' }}
      />

      <div className="absolute bottom-20 left-5 z-10 w-[min(72vw,280px)] md:bottom-10 md:left-10">
        <p className="font-display text-[9px] tracking-[0.22em] text-ghost uppercase sm:text-[10px]">Entering the Dark Realm</p>
        <p className="mt-2 text-[9px] tracking-[0.3em] text-silver/60 uppercase">Key art · {progress}%</p>
        <div
          role="progressbar"
          aria-label="Key art loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="mt-3 h-px overflow-hidden bg-silver/20"
        >
          <span className="block h-full bg-gradient-to-r from-royal to-silver transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <button
        type="button"
        onClick={enterRealm}
        disabled={!entryReady}
        aria-hidden={!entryReady}
        className="intro-enter absolute bottom-[154px] left-1/2 z-10 -translate-x-1/2 translate-y-3 border border-[#c8a8ec]/65 bg-[#0b0812]/75 px-8 py-4 text-[10px] font-medium tracking-[0.38em] text-[#eee7f5] uppercase opacity-0 backdrop-blur-sm transition-colors hover:border-[#eadbfa] hover:bg-[#21152d] focus-visible:outline-2 focus-visible:outline-[#d2b2f0] sm:bottom-[164px]"
      >
        Enter the Dark Realm
      </button>
      <button
        type="button"
        onClick={skip}
        className="intro-skip absolute right-5 bottom-6 z-10 flex items-center gap-3 border border-silver/25 bg-obsidian/60 px-5 py-2.5 text-[11px] font-medium tracking-[0.35em] text-silver uppercase backdrop-blur transition-colors hover:border-electric hover:text-ghost focus-visible:outline-2 focus-visible:outline-electric md:right-10 md:bottom-10"
      >
        Skip intro
        <span aria-hidden="true" className="h-px w-6 bg-current" />
      </button>
    </div>
  )
}
