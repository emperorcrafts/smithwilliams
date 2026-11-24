import Image from 'next/image'
import { navLinks, socialLinks } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-obsidian">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_50%_0%,rgba(100,38,184,0.2),transparent_68%)]" />
      <div className="relative mx-auto grid max-w-[1600px] gap-14 px-5 py-20 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Image
            src="/images/logo.webp"
            alt="Smith Williams"
            width={517}
            height={483}
            className="h-auto w-56 drop-shadow-[0_0_30px_rgba(100,38,184,0.35)] md:w-64"
          />
          <p className="mt-6 text-[10px] font-semibold tracking-[0.42em] text-electric uppercase">The Dark Creator</p>
          <p className="mt-3 font-display text-lg tracking-[0.3em] text-silver uppercase">I play. I design. I build.</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <p className="text-[11px] tracking-[0.45em] text-electric uppercase">Navigate</p>
          <ul className="mt-6 flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-silver transition-colors hover:text-ghost">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="text-[11px] tracking-[0.45em] text-electric uppercase">Follow the darkness</p>
          <ul className="mt-6 flex flex-col gap-4">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-silver transition-colors hover:text-ghost">
                  <Image src={s.mark} alt="" aria-hidden="true" width={16} height={16} unoptimized className="size-4 object-contain" />
                  <span>{s.label}</span>
                  <span className="text-xs text-silver/50 transition-colors group-hover:text-electric">{s.username}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-6 text-xs tracking-[0.2em] text-silver/60 uppercase sm:flex-row sm:justify-between md:px-10">
          <p>© {new Date().getFullYear()} Smith Williams. All rights reserved.</p>
          <a href="#top" className="transition-colors hover:text-ghost">
            Back to top ↑
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.18em] text-center font-display text-[18vw] leading-none font-semibold text-transparent select-none [-webkit-text-stroke:1px_rgba(200,196,210,0.08)]"
      >
        Dark Creator
      </p>
    </footer>
  )
}
