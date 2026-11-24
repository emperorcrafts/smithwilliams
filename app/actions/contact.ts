'use server'

import { serviceOptions } from '@/lib/site'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message: string
  errors?: Partial<Record<'name' | 'email' | 'service' | 'message', string>>
  values?: { name: string; email: string; service: string; budget: string; message: string }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get('company_website') ?? '').length > 0) {
    return { status: 'success', message: 'Thanks — your message has been received.' }
  }

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const service = String(formData.get('service') ?? '').trim()
  const budget = String(formData.get('budget') ?? '').trim().slice(0, 60)
  const message = String(formData.get('message') ?? '').trim()

  const errors: ContactState['errors'] = {}
  if (name.length < 2 || name.length > 80) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email) || email.length > 160) errors.email = 'Please enter a valid email address.'
  if (!serviceOptions.some((o) => o.value === service)) errors.service = 'Please choose a service.'
  if (message.length < 20 || message.length > 4000) errors.message = 'Tell me a bit more about your project (at least 20 characters).'

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      errors,
      values: { name, email, service, budget, message },
    }
  }

  // Delivery hook: connect an email provider (e.g. Resend) here to forward enquiries.
  console.log('[contact] New enquiry', { name, email, service, budget, length: message.length })

  return {
    status: 'success',
    message: `Thanks, ${name.split(' ')[0]} — your enquiry has been received. I will reply to ${email} soon.`,
  }
}
