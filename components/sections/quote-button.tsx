'use client'

import { quoteStore } from '@/lib/stores'
import { CtaLink } from '@/components/site/cta-link'

export function QuoteButton({ service }: { service: string }) {
  return (
    <CtaLink href="#contact" onClick={() => quoteStore.set(service)}>
      Get a quote
    </CtaLink>
  )
}
