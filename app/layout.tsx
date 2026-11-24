import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Geist } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Smith Williams — The Dark Creator | Gamer, Designer, Developer',
  description:
    'Smith Williams is a gaming streamer, professional graphic designer and web developer. I play. I design. I build. Hire me for branding, design and cinematic websites.',
  generator: 'v0.app',
  openGraph: {
    title: 'Smith Williams — The Dark Creator',
    description: 'I play. I design. I build. Gaming streamer, graphic designer and web developer.',
    images: ['/images/logo.webp'],
  },
  icons: {
    icon: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050407',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${geist.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
