'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { introStore } from '@/lib/stores'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -64 }, autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    if (!introStore.get()) lenis.stop()
    const unsubscribe = introStore.subscribe(() => {
      if (introStore.get()) {
        lenis.start()
        ScrollTrigger.refresh()
      }
    })

    return () => {
      unsubscribe()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
