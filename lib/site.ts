export const socials = {
  youtube: 'https://www.youtube.com/@SmithWilliams',
  twitch: 'https://www.twitch.tv/smithwilliams',
  instagram: 'https://www.instagram.com/smithwilliams',
  github: 'https://github.com/smithwilliams',
} as const

export const socialLinks = [
  { label: 'YouTube', href: socials.youtube },
  { label: 'Twitch', href: socials.twitch },
  { label: 'Instagram', href: socials.instagram },
  { label: 'GitHub', href: socials.github },
]

export const navLinks = [
  { label: 'Realms', href: '#realms' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const serviceOptions = [
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'branding', label: 'Logo & Branding' },
  { value: 'thumbnails', label: 'Thumbnails & Social Graphics' },
  { value: 'web-development', label: 'Web Development' },
  { value: '3d-website', label: 'Interactive 3D Website' },
  { value: 'other', label: 'Something else' },
] as const

export type ServiceValue = (typeof serviceOptions)[number]['value']
