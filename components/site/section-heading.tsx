import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id: string
  index?: string
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ id, index, eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <p
        data-reveal
        className={cn(
          'mb-6 flex items-center gap-4 text-[11px] font-medium tracking-[0.45em] text-electric uppercase',
          align === 'center' && 'justify-center',
        )}
      >
        {index && <span className="font-display text-silver/70">{index}</span>}
        <span aria-hidden="true" className="h-px w-10 bg-electric/70" />
        {eyebrow}
      </p>
      <h2
        id={id}
        data-reveal
        className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-tight text-balance text-ghost"
      >
        {title}
      </h2>
      {description && (
        <p data-reveal className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
