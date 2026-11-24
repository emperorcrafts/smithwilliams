import Image from 'next/image'
import { Play, Radio, Swords } from 'lucide-react'
import { RevealSection } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaLink } from '@/components/site/cta-link'
import { socials } from '@/lib/site'

const channels = [
  {
    icon: Radio,
    title: 'Live on Twitch',
    copy: 'Late-night sessions, boss fights and real-time chaos with the community.',
    href: socials.twitch,
    label: 'Watch live',
  },
  {
    icon: Play,
    title: 'YouTube Videos',
    copy: 'Full playthroughs, edited highlights and the best moments from every stream.',
    href: socials.youtube,
    label: 'Watch videos',
  },
  {
    icon: Swords,
    title: 'Gameplay Highlights',
    copy: 'Clutch plays, fails and cinematic cuts — crafted with the same eye I bring to design.',
    href: socials.youtube,
    label: 'See highlights',
  },
]

function HudCorners() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute top-3 left-3 size-5 border-t border-l border-electric/70" />
      <span className="absolute top-3 right-3 size-5 border-t border-r border-electric/70" />
      <span className="absolute bottom-3 left-3 size-5 border-b border-l border-electric/70" />
      <span className="absolute right-3 bottom-3 size-5 border-r border-b border-electric/70" />
    </div>
  )
}

export function GamingRealm() {
  return (
    <RevealSection id="gaming" aria-labelledby="gaming-title" className="overflow-hidden bg-transparent py-28 md:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(155,77,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(155,77,255,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          id="gaming-title"
          index="01"
          eyebrow="The Gaming Realm"
          title={
            <>
              I play where
              <br />
              <span className="text-violet-metal">legends are made.</span>
            </>
          }
          description="Streaming is where the universe began. Every session is a story — and every story is built for the people who show up for it."
        />

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12">
          <div data-reveal-img className="relative aspect-video overflow-hidden lg:col-span-8">
            <Image
              src="/images/realm-gaming.png"
              alt="Smith Williams' dark streaming setup with an ultrawide monitor, microphone and violet lighting"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-transparent to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
              <span className="scanline absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-electric/[0.06] to-transparent" />
            </div>
            <HudCorners />
            <div className="absolute bottom-6 left-6 flex items-center gap-3 md:bottom-8 md:left-8">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-electric opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-electric" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.4em] text-ghost uppercase">Streaming identity</span>
            </div>
          </div>

          <div data-reveal className="relative flex flex-col justify-between gap-10 border border-border bg-obsidian/60 p-8 lg:col-span-4">
            <HudCorners />
            <div>
              <p className="text-[11px] tracking-[0.45em] text-silver/70 uppercase">Player profile</p>
              <p className="mt-4 font-display text-4xl font-semibold text-ghost">Smith Williams</p>
              <p className="mt-2 text-sm tracking-[0.3em] text-electric uppercase">The Dark Creator</p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Dark fantasy, action RPGs and anything with a brutal boss fight. Calm voice, chaotic gameplay, cinematic presentation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CtaLink href={socials.twitch} external>
                Twitch
              </CtaLink>
              <CtaLink href={socials.youtube} external variant="ghost">
                YouTube
              </CtaLink>
            </div>
          </div>
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {channels.map(({ icon: Icon, ...c }) => (
            <li key={c.title} data-reveal>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col gap-6 border border-border bg-obsidian/40 p-8 transition-colors duration-500 hover:border-electric/50 hover:bg-dusk/40"
              >
                <Icon aria-hidden="true" className="size-6 text-electric" />
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ghost">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{c.copy}</p>
                </div>
                <span className="mt-auto text-[11px] font-semibold tracking-[0.35em] text-silver uppercase transition-colors group-hover:text-ghost">
                  {c.label} <span aria-hidden="true">→</span>
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
