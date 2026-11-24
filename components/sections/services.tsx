import { Check } from 'lucide-react'
import { RevealSection } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { ProjectConnectLink } from './project-connect-link'

const services = [
  {
    index: 'I',
    title: 'Graphic Design',
    summary:
      'Visual identities and artwork that make your brand feel legendary — from the first logo sketch to a full social media system.',
    items: [
      'Logo design & brand identity',
      'Character & mascot branding',
      'Posters & key art',
      'YouTube thumbnails',
      'Stream overlays & social media graphics',
    ],
  },
  {
    index: 'II',
    title: 'Web Development',
    summary:
      'Fast, responsive and memorable websites — designed and built end-to-end, ready to grow with your business.',
    items: [
      'Business & portfolio websites',
      'Landing pages for launches',
      'Frontend development (React, Next.js)',
      'Interactive 3D & motion experiences',
      'Responsive, accessible, SEO-ready builds',
    ],
  },
]

const process = [
  { step: 'Summon', copy: 'We talk goals, audience and the feeling your brand should leave behind.' },
  { step: 'Forge', copy: 'I design concepts and direction, refined together until it is right.' },
  { step: 'Unleash', copy: 'Final files or a launched website — delivered polished and ready.' },
]

export function Services() {
  return (
    <RevealSection id="services" aria-labelledby="services-title" className="bg-obsidian py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          id="services-title"
          eyebrow="Professional services"
          title={
            <>
              Hire the
              <span className="text-violet-metal"> Dark Creator.</span>
            </>
          }
          description="Available for freelance projects and collaborations with brands, creators, streamers and businesses."
        />

        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.title}
              data-reveal
              className="group relative flex flex-col overflow-hidden border border-border bg-abyss p-8 transition-colors duration-700 hover:border-electric/40 md:p-12"
            >
              <div
                aria-hidden="true"
                className="absolute -top-1/2 -right-1/4 size-[80%] rounded-full bg-royal/0 blur-3xl transition-colors duration-1000 group-hover:bg-royal/20"
              />
              <div className="relative flex items-start justify-between">
                <h3 className="font-display text-4xl font-semibold text-ghost md:text-5xl">{s.title}</h3>
                <span className="font-display text-2xl text-silver/30">{s.index}</span>
              </div>
              <p className="relative mt-6 max-w-lg leading-relaxed text-muted-foreground">{s.summary}</p>
              <ul className="relative mt-10 flex flex-col gap-4 border-t border-border pt-8">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-silver">
                    <Check aria-hidden="true" className="size-4 shrink-0 text-electric" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="relative mt-12">
                <ProjectConnectLink />
              </div>
            </article>
          ))}
        </div>

        <ol className="mt-6 grid gap-px border border-border bg-border md:grid-cols-3">
          {process.map((p, i) => (
            <li key={p.step} data-reveal className="bg-obsidian p-8">
              <span className="font-display text-sm text-electric">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ghost">{p.step}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </RevealSection>
  )
}
