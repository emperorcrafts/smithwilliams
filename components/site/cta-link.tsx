import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/motion/magnetic'

type CtaLinkProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  external?: boolean
  className?: string
  onClick?: () => void
}

export const ctaClasses = {
  base: 'group relative inline-flex items-center gap-3 overflow-hidden px-7 py-4 text-[11px] font-semibold tracking-[0.32em] uppercase transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric',
  primary:
    'bg-ghost text-obsidian hover:text-ghost before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-royal before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100',
  ghost:
    'border border-silver/30 text-ghost hover:border-electric before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-electric/10 before:transition-transform before:duration-500 hover:before:scale-y-100',
}

export function CtaLink({ href, children, variant = 'primary', external, className, onClick }: CtaLinkProps) {
  return (
    <Magnetic>
      <a
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={cn(ctaClasses.base, ctaClasses[variant], className)}
      >
        <span className="relative z-10">{children}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="relative z-10 size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45"
        />
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </Magnetic>
  )
}
