'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/motion/magnetic'
import { SoundToggle } from '@/components/motion/sound-toggle'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open ? 'border-b border-border bg-obsidian/75 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="Smith Williams — back to top">
          <Image
            src="/images/logo.webp"
            alt=""
            width={517}
            height={483}
            priority
            className="h-12 w-auto drop-shadow-[0_0_12px_rgba(100,38,184,0.35)] md:h-16"
          />
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-[11px] font-medium tracking-[0.3em] text-silver uppercase transition-colors hover:text-ghost"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-electric transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <SoundToggle />
          <Magnetic>
            <a
              href="#contact"
              className="hidden border border-electric/60 px-5 py-2.5 text-[11px] font-semibold tracking-[0.3em] text-ghost uppercase transition-colors hover:bg-royal sm:inline-flex"
            >
              Find me
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center border border-silver/20 text-ghost lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-border lg:hidden">
        <ul className="flex flex-col px-5 py-6">
          {[...navLinks, { label: 'Find me', href: '#contact' }].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-2xl tracking-wider text-ghost uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
