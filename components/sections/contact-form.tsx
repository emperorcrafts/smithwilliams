'use client'

import { useActionState } from 'react'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { submitContact, type ContactState } from '@/app/actions/contact'
import { serviceOptions } from '@/lib/site'
import { useQuotePreset } from '@/lib/stores'
import { cn } from '@/lib/utils'
import { ctaClasses } from '@/components/site/cta-link'

const initial: ContactState = { status: 'idle', message: '' }

const fieldClass =
  'w-full border-0 border-b border-silver/25 bg-transparent px-0 py-3 text-lg text-ghost placeholder:text-silver/35 transition-colors focus:border-electric focus:outline-none focus:ring-0 aria-[invalid=true]:border-destructive'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[11px] font-medium tracking-[0.35em] text-silver/80 uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial)
  const preset = useQuotePreset()
  const errors = state.errors ?? {}
  const values = state.values

  if (state.status === 'success') {
    return (
      <div role="status" className="flex min-h-[420px] flex-col justify-center border border-electric/40 bg-abyss p-10 md:p-14">
        <p className="text-[11px] tracking-[0.45em] text-electric uppercase">Message sent</p>
        <p className="mt-4 text-2xl leading-snug font-medium text-pretty text-ghost md:text-3xl">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} noValidate aria-label="Project enquiry" className="relative border border-border bg-abyss/80 p-6 backdrop-blur md:p-12">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            defaultValue={values?.name}
            required
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values?.email}
            required
            placeholder="you@brand.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass}
          />
        </Field>
        <Field id="service" label="Service" error={errors.service}>
          <select
            key={`${preset}-${values?.service ?? ""}`}
            id="service"
            name="service"
            required
            defaultValue={values?.service || preset}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
            className={cn(fieldClass, 'appearance-none [&>option]:bg-abyss')}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Budget (optional)">
          <input id="budget" name="budget" defaultValue={values?.budget} placeholder="e.g. $500 – $2,000" className={fieldClass} />
        </Field>
        <Field id="deadline" label="Expected deadline (optional)">
          <input
            id="deadline"
            name="deadline"
            defaultValue={values?.deadline}
            placeholder="Flexible or date"
            className={fieldClass}
          />
        </Field>
        <div className="md:col-span-2">
          <Field id="references" label="Reference links (optional)">
            <textarea
              id="references"
              name="references"
              rows={2}
              defaultValue={values?.references}
              placeholder="Portfolio, inspiration, or project links"
              className={cn(fieldClass, 'resize-y')}
            />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field id="message" label="Project details" error={errors.message}>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              defaultValue={values?.message}
              placeholder="What are we creating together?"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={cn(fieldClass, 'resize-none')}
            />
          </Field>
        </div>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-12 flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className={cn('text-sm', state.status === 'error' ? 'text-destructive' : 'text-muted-foreground')}>
          {state.status === 'error' ? state.message : 'Usually replies within 48 hours.'}
        </p>
        <button
          type="submit"
          disabled={pending}
          className={cn(ctaClasses.base, ctaClasses.primary, 'whitespace-nowrap text-[10px] tracking-[0.16em] disabled:opacity-60')}
        >
          <span className="relative z-10">{pending ? 'Sending' : 'Send enquiry'}</span>
          {pending ? (
            <Loader2 aria-hidden="true" className="relative z-10 size-4 animate-spin" />
          ) : (
            <ArrowUpRight aria-hidden="true" className="relative z-10 size-4 transition-transform duration-500 group-hover:rotate-45" />
          )}
        </button>
      </div>
    </form>
  )
}
