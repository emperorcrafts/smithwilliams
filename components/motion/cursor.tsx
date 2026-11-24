'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce || !dot.current || !ring.current) return

    document.documentElement.classList.add('has-custom-cursor')
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 })

    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

    let shown = false
    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 })
        shown = true
      }
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
    }

    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, [data-cursor], input, select, textarea, label')
      gsap.to(ring.current, {
        scale: target ? 1.9 : 1,
        borderColor: target ? 'rgba(155,77,255,0.9)' : 'rgba(200,196,210,0.5)',
        duration: 0.3,
      })
    }

    const leave = () => {
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 })
      shown = false
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[200] size-1.5 rounded-full bg-ghost opacity-0 mix-blend-difference"
      />
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[200] size-9 rounded-full border border-silver/50 opacity-0"
      />
    </>
  )
}
