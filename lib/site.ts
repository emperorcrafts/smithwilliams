export const socials = {
  instagram: 'https://www.instagram.com/_smith_williams_/',
  tiktok: 'https://www.tiktok.com/@_smithwilliams',
  youtube: 'https://www.youtube.com/@SmithWilliams1',
  twitch: 'https://www.twitch.tv/smithwilliams1',
} as const

export const socialLinks = [
  {
    label: 'Instagram',
    username: '@_smith_williams_',
    href: socials.instagram,
    mark: 'https://thesvg.org/icons/instagram/default.svg',
    border: 'hover:border-[#d94d91]/60 focus-visible:border-[#d94d91]/60',
    glow: 'bg-[radial-gradient(ellipse_at_50%_48%,rgba(214,51,132,0.19),transparent_58%),radial-gradient(ellipse_at_50%_100%,rgba(255,146,55,0.16),transparent_58%)]',
    orb: 'bg-[#d94d91]/25 opacity-40',
  },
  {
    label: 'TikTok',
    username: '@_smithwilliams',
    href: socials.tiktok,
    mark: 'https://thesvg.org/icons/tiktok/light.svg',
    border: 'hover:border-[#25f4ee]/60 focus-visible:border-[#25f4ee]/60',
    glow: 'bg-[radial-gradient(ellipse_at_35%_55%,rgba(37,244,238,0.16),transparent_52%),radial-gradient(ellipse_at_65%_85%,rgba(255,0,80,0.2),transparent_58%)]',
    orb: 'bg-[#25f4ee]/20 opacity-40',
  },
  {
    label: 'YouTube',
    username: '@SmithWilliams1',
    href: socials.youtube,
    mark: 'https://thesvg.org/icons/youtube/default.svg',
    border: 'hover:border-[#ff4242]/60 focus-visible:border-[#ff4242]/60',
    glow: 'bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,66,66,0.21),transparent_60%)]',
    orb: 'bg-[#ff4242]/20 opacity-40',
  },
  {
    label: 'Twitch',
    username: 'smithwilliams1',
    href: socials.twitch,
    mark: 'https://thesvg.org/icons/twitch/default.svg',
    border: 'hover:border-[#a970ff]/60 focus-visible:border-[#a970ff]/60',
    glow: 'bg-[radial-gradient(ellipse_at_50%_50%,rgba(145,70,255,0.23),transparent_60%)]',
    orb: 'bg-[#9146ff]/25 opacity-40',
  },
] as const

export const navLinks = [
  { label: 'Realms', href: '#realms' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
