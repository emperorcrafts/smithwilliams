import Image from 'next/image'
import { RevealSection } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const disciplines = ['Logo design', 'Branding', 'Posters', 'Thumbnails', 'Social media graphics', 'Character branding']

export function CreativeRealm() {
  return (
    <RevealSection id="creative" aria-labelledby="creative-title" className="overflow-hidden bg-obsidian py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="creative-title"
            index="02"
            eyebrow="The Creative Realm"
            className="lg:col-span-7"
            title={
              <>
                I design
                <br />
                <span className="text-metal pr-[0.12em] italic">what others imagine.</span>
              </>
            }
            description="A premium design studio for brands, creators and gamers. Identity systems, artwork and graphics with weight, mood and intention."
          />
          <ul data-reveal className="flex flex-wrap gap-2 lg:col-span-5 lg:justify-end">
            {disciplines.map((d) => (
              <li key={d} className="border border-border px-4 py-2 text-[11px] tracking-[0.25em] text-silver uppercase">
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-12">
          <figure className="md:col-span-5 md:row-span-2">
            <div data-reveal-img className="relative aspect-[3/4] overflow-hidden bg-abyss">
              <Image
                src="/images/design-poster.png"
                alt="Dark fantasy event poster with an ornate silver sword piercing a violet eclipse"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex justify-between text-[11px] tracking-[0.3em] text-silver/70 uppercase">
              <span>Poster design</span>
              <span>Key art</span>
            </figcaption>
          </figure>

          <figure className="md:col-span-7">
            <div data-reveal-img className="relative aspect-[16/10] overflow-hidden bg-abyss">
              <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#190c2b,#050407_70%)]">
                <Image
                  src="/images/logo.webp"
                  alt="The Smith Williams logo: an anime-style horned character above gothic dripping lettering"
                  width={517}
                  height={483}
                  className="h-[80%] w-auto drop-shadow-[0_20px_40px_rgba(100,38,184,0.35)]"
                />
              </div>
            </div>
            <figcaption className="mt-4 flex justify-between text-[11px] tracking-[0.3em] text-silver/70 uppercase">
              <span>Logo & character identity</span>
              <span>Smith Williams</span>
            </figcaption>
          </figure>

          <figure className="md:col-span-4">
            <div data-reveal-img className="relative aspect-[4/3] overflow-hidden bg-abyss">
              <Image
                src="/images/design-branding.png"
                alt="Luxury brand identity mockup with embossed silver crest on matte black stationery"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-[11px] tracking-[0.3em] text-silver/70 uppercase">Brand identity system</figcaption>
          </figure>

          <figure className="md:col-span-3">
            <div data-reveal-img className="relative aspect-[4/3] overflow-hidden bg-abyss md:aspect-[3/4]">
              <Image
                src="/images/design-thumbnail.png"
                alt="Gaming thumbnail artwork of a dark knight silhouette against exploding violet energy"
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-[11px] tracking-[0.3em] text-silver/70 uppercase">Thumbnails</figcaption>
          </figure>
        </div>
      </div>
    </RevealSection>
  )
}
