import { CinematicIntro } from '@/components/intro/cinematic-intro'
import { SmoothScroll } from '@/components/motion/smooth-scroll'
import { Cursor } from '@/components/motion/cursor'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/site-footer'
import { Hero } from '@/components/hero/hero'
import { WorldLoader } from '@/components/hero/world-loader'
import { RealmsGateway } from '@/components/realms/realms-gateway'
import { GamingRealm } from '@/components/realms/gaming-realm'
import { CreativeRealm } from '@/components/realms/creative-realm'
import { DigitalKingdom } from '@/components/realms/digital-kingdom'
import { Manifesto } from '@/components/sections/manifesto'
import { FeaturedWork } from '@/components/sections/featured-work'
import { Services } from '@/components/sections/services'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'

export default function Page() {
  return (
    <>
      <CinematicIntro />
      <SmoothScroll />
      <Cursor />
      <WorldLoader />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-ghost focus:px-4 focus:py-2 focus:text-obsidian"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="grain relative z-10">
        <Hero />
        <RealmsGateway />
        <GamingRealm />
        <CreativeRealm />
        <DigitalKingdom />
        <Manifesto />
        <FeaturedWork />
        <Services />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
