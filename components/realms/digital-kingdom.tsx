import Image from 'next/image'
import { RevealSection } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const builds = [
  { title: 'Business websites', copy: 'Fast, credible sites that turn visitors into clients.' },
  { title: 'Portfolio websites', copy: 'Editorial showcases that make your work impossible to ignore.' },
  { title: 'Landing pages', copy: 'Focused, conversion-driven pages for launches and campaigns.' },
  { title: 'Frontend development', copy: 'Clean, accessible, performant React & Next.js interfaces.' },
  { title: 'Interactive 3D websites', copy: 'WebGL worlds, scroll storytelling and cinematic motion.' },
]

const caseStudies = [
  {
    image: '/images/web-business.png',
    alt: 'Dark premium business website design displayed on a laptop',
    type: 'Business website',
    title: 'Premium brand presence',
    copy: 'A dark, editorial layout with product grids, refined typography and a clear path to contact.',
    stack: ['Next.js', 'Tailwind CSS', 'CMS-ready'],
  },
  {
    image: '/images/web-3d.png',
    alt: 'Interactive 3D landing page with a glowing obsidian crystal displayed on a monitor',
    type: 'Interactive 3D',
    title: 'Obsidian WebGL experience',
    copy: 'A real-time 3D hero object, scroll-driven camera and atmospheric lighting.',
    stack: ['Three.js', 'React Three Fiber', 'GSAP'],
  },
]

export function DigitalKingdom() {
  return (
    <RevealSection id="digital" aria-labelledby="digital-title" className="overflow-hidden bg-abyss py-28 md:py-40">
      <div aria-hidden="true" className="absolute top-0 right-0 h-[60%] w-[60%] bg-[radial-gradient(ellipse_at_top_right,rgba(100,38,184,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          id="digital-title"
          index="03"
          eyebrow="The Digital Kingdom"
          title={
            <>
              I build worlds
              <br />
              <span className="text-violet-metal">you can enter.</span>
            </>
          }
          description="From high-converting business sites to fully interactive 3D experiences — engineered with modern tooling and designed like key art."
        />

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-2">
          {caseStudies.map((cs) => (
            <article key={cs.title} className="group">
              <div data-reveal-img className="relative aspect-[16/10] overflow-hidden border border-border bg-obsidian">
                <Image
                  src={cs.image}
                  alt={cs.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-8 items-center gap-1.5 border-b border-border bg-obsidian/80 px-4 backdrop-blur">
                  <span className="size-2 rounded-full bg-silver/30" />
                  <span className="size-2 rounded-full bg-silver/30" />
                  <span className="size-2 rounded-full bg-electric/60" />
                </div>
              </div>
              <div data-reveal className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.4em] text-electric uppercase">{cs.type}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-ghost">{cs.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{cs.copy}</p>
                </div>
                <ul className="flex flex-wrap gap-2 md:max-w-[200px] md:justify-end">
                  {cs.stack.map((s) => (
                    <li key={s} className="border border-border px-3 py-1.5 text-[10px] tracking-[0.2em] text-silver uppercase">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <ol className="mt-20 border-t border-border md:mt-28">
          {builds.map((b, i) => (
            <li
              key={b.title}
              data-reveal
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b border-border py-7 transition-colors duration-500 hover:bg-dusk/30 md:grid-cols-[80px_1fr_1fr] md:px-4"
            >
              <span className="font-display text-sm text-silver/50">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-2xl font-semibold text-ghost transition-colors group-hover:text-electric md:text-4xl">
                {b.title}
              </h3>
              <p className="col-start-2 leading-relaxed text-muted-foreground md:col-start-3">{b.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </RevealSection>
  )
}
