'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type RevealProps = {
  id?: string
  className?: string
  children: ReactNode
  'aria-labelledby'?: string
}

/**
 * Section wrapper that animates descendants marked with
 * `data-reveal` (rise + fade) and `data-reveal-img` (clip-path unveil).
 */
export function RevealSection({ id, className, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal-img]').forEach((el) => {
        const img = el.querySelector('img')
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } })
        tl.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
        )
        if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.1)
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -Number(el.dataset.parallax ?? 10) },
          {
            yPercent: Number(el.dataset.parallax ?? 10),
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id={id} className={cn('relative', className)} {...rest}>
      {children}
    </section>
  )
}
