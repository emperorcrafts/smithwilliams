import { RevealSection } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { socialLinks } from '@/lib/site'
import { ContactForm } from './contact-form'

export function Contact() {
  return (
    <RevealSection id="contact" aria-labelledby="contact-title" className="overflow-hidden bg-obsidian py-28 md:py-40">
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 h-[70%] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(100,38,184,0.2),transparent_65%)]" />
      <div className="relative mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            eyebrow="Contact me"
            title={
              <>
                {"Let's create"}
                <br />
                <span className="text-violet-metal">something legendary.</span>
              </>
            }
            description="Use one of the social links to reach me directly. This enquiry form does not send or store messages."
          />
          <div data-reveal className="mt-12">
            <p className="text-[11px] tracking-[0.45em] text-silver/70 uppercase">Find me</p>
            <ul className="mt-5 flex flex-col">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-border py-4 font-display text-xl text-ghost transition-colors hover:text-electric"
                  >
                    {s.label}
                    <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div data-reveal className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </RevealSection>
  )
}
