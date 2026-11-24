import Image from 'next/image'
import { RevealSection } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const skills = [
  {
    group: 'Design',
    items: ['Brand identity', 'Logo design', 'Illustration direction', 'Poster & key art', 'Thumbnail design', 'Typography'],
  },
  {
    group: 'Development',
    items: ['Next.js & React', 'TypeScript', 'Tailwind CSS', 'Three.js / R3F', 'GSAP motion', 'Responsive & accessible UI'],
  },
  {
    group: 'Gaming & Content',
    items: ['Live streaming', 'Video editing', 'Stream branding', 'Community building', 'Overlays & scenes', 'Storytelling'],
  },
]

export function About() {
  return (
    <RevealSection id="about" aria-labelledby="about-title" className="overflow-hidden bg-transparent py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <div data-reveal-img className="relative aspect-[4/5] overflow-hidden border border-border bg-[radial-gradient(ellipse_at_50%_30%,#2a1450,#050407_70%)]">
            <div data-parallax="6" className="absolute inset-0">
              <Image
                src="/images/character.webp"
                alt="Full-body artwork of Smith Williams as The Dark Creator"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_8%] scale-[1.35]"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-transparent" />
          </div>
          <p className="mt-6 font-display text-sm tracking-[0.4em] text-silver/60 uppercase">
            {"I don't follow reality. I create it."}
          </p>
        </div>

        <div className="lg:col-span-7 lg:pl-10">
          <SectionHeading
            id="about-title"
            eyebrow="About me"
            title={
              <>
                Gamer. Designer.
                <br />
                <span className="text-violet-metal">Developer.</span>
              </>
            }
          />
          <div data-reveal className="mt-8 flex max-w-2xl flex-col gap-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            <p>
              {"I'm Smith Williams — known online as The Dark Creator. I started out streaming games, and quickly became obsessed with everything around the gameplay: the branding, the thumbnails, the overlays, the atmosphere."}
            </p>
            <p>
              That obsession turned into a craft. Today I design visual identities and build websites for brands and creators who want to stand out with the same cinematic intensity I bring to my own universe.
            </p>
          </div>

          <div className="mt-16">
            <h3 data-reveal className="text-[11px] font-medium tracking-[0.45em] text-electric uppercase">
              My skills
            </h3>
            <div className="mt-8 grid gap-10 sm:grid-cols-3">
              {skills.map((s) => (
                <div key={s.group} data-reveal>
                  <p className="border-b border-border pb-3 font-display text-xl font-semibold text-ghost">{s.group}</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="text-sm text-silver">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
