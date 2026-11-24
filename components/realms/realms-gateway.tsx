import Image from 'next/image'
import { ArrowDownRight } from 'lucide-react'
import { RevealSection } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const realms = [
  {
    index: '01',
    name: 'The Gaming Realm',
    role: 'I play',
    href: '#gaming',
    image: '/images/realm-gaming.png',
    copy: 'Live streams, gameplay highlights and a community forged in the dark.',
  },
  {
    index: '02',
    name: 'The Creative Realm',
    role: 'I design',
    href: '#creative',
    image: '/images/design-poster.png',
    copy: 'Logos, brand identities, posters, thumbnails and social graphics.',
  },
  {
    index: '03',
    name: 'The Digital Kingdom',
    role: 'I build',
    href: '#digital',
    image: '/images/web-3d.png',
    copy: 'Business sites, portfolios, landing pages and interactive 3D experiences.',
  },
]

export function RealmsGateway() {
  return (
    <RevealSection id="realms" aria-labelledby="realms-title" className="bg-obsidian py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            id="realms-title"
            eyebrow="Enter the universe"
            title={
              <>
                Three realms.
                <br />
                <span className="text-violet-metal">One creator.</span>
              </>
            }
          />
          <p data-reveal className="max-w-sm leading-relaxed text-muted-foreground">
            Every world I build follows the same law: obsessive craft, cinematic atmosphere and zero tolerance for ordinary.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 md:mt-24 lg:grid-cols-3">
          {realms.map((realm) => (
            <li key={realm.index} data-reveal className="min-w-0">
              <a
                href={realm.href}
                className="group relative flex h-full min-h-[440px] flex-col justify-between overflow-hidden rounded-t-full rounded-b-sm border border-border p-8 transition-colors duration-700 hover:border-electric/50 md:min-h-[560px] md:p-10"
              >
                <Image
                  src={realm.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover opacity-25 grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:opacity-55 group-hover:grayscale-0"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-4 rounded-t-full rounded-b-sm border border-silver/15 transition-all duration-700 group-hover:inset-3 group-hover:border-electric/35" />
                <div aria-hidden="true" className="absolute inset-x-[20%] bottom-0 h-14 bg-[radial-gradient(ellipse_at_bottom,rgba(100,38,184,0.42),transparent_72%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-electric transition-transform duration-700 group-hover:scale-x-100" />

                <div className="relative flex items-start justify-between">
                  <span className="font-display text-6xl font-semibold text-silver/20 transition-colors duration-700 group-hover:text-electric/60 md:text-7xl">
                    {realm.index}
                  </span>
                  <ArrowDownRight
                    aria-hidden="true"
                    className="size-6 text-silver transition-transform duration-500 group-hover:rotate-[-45deg] group-hover:text-electric"
                  />
                </div>

                <div className="relative">
                  <p className="text-[11px] tracking-[0.45em] text-electric uppercase">{realm.role}</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-ghost md:text-4xl">{realm.name}</h3>
                  <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">{realm.copy}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  )
}
