import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { RevealSection } from '@/components/motion/reveal'
import { socialLinks } from '@/lib/site'

export function Contact() {
  return (
    <RevealSection id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-obsidian py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_50%_15%,rgba(100,38,184,0.19),transparent_58%),radial-gradient(ellipse_at_50%_100%,rgba(25,12,43,0.55),transparent_55%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[48%] h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p data-reveal className="flex items-center justify-center gap-4 text-[10px] font-medium tracking-[0.45em] text-electric uppercase md:text-xs">
            <span aria-hidden="true" className="h-px w-8 bg-electric/70" />
            Find me beyond the realm
            <span aria-hidden="true" className="h-px w-8 bg-electric/70" />
          </p>
          <h2 id="contact-title" className="mt-7 font-display text-[clamp(2.35rem,7vw,6.4rem)] leading-[0.94] font-semibold tracking-tight text-ghost uppercase">
            Let&apos;s connect
            <br />
            <span className="text-violet-metal">across dimensions.</span>
          </h2>
          <p data-reveal className="mx-auto mt-7 max-w-lg text-xs leading-[1.9] font-medium tracking-[0.24em] text-silver/75 uppercase md:text-sm">
            Follow the journey.<br />
            Witness the creation.<br />
            Enter my world.
          </p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-7 md:mt-20 lg:grid-cols-4 lg:gap-6">
          {socialLinks.map((portal) => (
            <li key={portal.label} data-reveal>
              <a
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${portal.label} profile ${portal.username} in a new tab`}
                className={`group/portal relative isolate flex aspect-[0.78] min-h-[248px] flex-col items-center justify-center overflow-hidden rounded-t-full rounded-b-[38%] border border-white/10 bg-abyss/80 px-3 py-8 text-center transition-[border-color,transform,background-color] duration-700 hover:-translate-y-2 hover:border-white/30 hover:bg-abyss focus-visible:-translate-y-2 focus-visible:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric sm:min-h-[300px] ${portal.border}`}
              >
                <span aria-hidden="true" className={`pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-700 group-hover/portal:opacity-100 ${portal.glow}`} />
                <span aria-hidden="true" className="pointer-events-none absolute inset-[9px] rounded-t-full rounded-b-[38%] border border-white/10 transition-transform duration-700 group-hover/portal:inset-[6px]" />
                <span aria-hidden="true" className={`pointer-events-none absolute bottom-[14%] size-[58%] rounded-full blur-3xl transition-opacity duration-700 group-hover/portal:opacity-80 ${portal.orb}`} />

                <span className="relative flex flex-col items-center">
                  <span className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-obsidian/55 shadow-[0_0_36px_rgba(5,4,7,0.8)] backdrop-blur-sm transition-transform duration-700 group-hover/portal:scale-110 sm:size-[4.5rem]">
                    <Image src={portal.mark} alt="" aria-hidden="true" width={36} height={36} unoptimized className="size-8 object-contain" />
                  </span>
                  <span className="mt-5 font-display text-lg font-semibold tracking-[0.14em] text-ghost uppercase sm:text-xl">
                    {portal.label}
                  </span>
                  <span className="mt-2 translate-y-0 text-xs tracking-[0.1em] text-silver transition-all duration-500 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/portal:translate-y-0 [@media(hover:hover)]:group-hover/portal:opacity-100 group-focus-visible/portal:translate-y-0 group-focus-visible/portal:opacity-100 sm:text-sm">
                    {portal.username}
                  </span>
                </span>

                <span className="relative mt-5 inline-flex items-center gap-2 text-[9px] font-semibold tracking-[0.3em] text-silver/65 uppercase transition-colors duration-500 group-hover/portal:text-ghost sm:text-[10px]">
                  Enter portal
                  <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform duration-500 group-hover/portal:-translate-y-0.5 group-hover/portal:translate-x-0.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  )
}
