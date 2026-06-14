import type { Metadata } from 'next'
import { Montserrat, Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

// Display Font: Montserrat (Bold, geometric, highly professional)
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

// Body Font: Plus Jakarta Sans (Clean, modern, highly legible)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

// Elegant Font: Playfair Display (Professional serif for accents)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-elegant',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Mono Font: JetBrains Mono (For tech/code elements)
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bhavya Srivastava — Full-Stack Developer & AI Engineer',
  description:
    'Portfolio of Bhavya Srivastava — B.Tech Computer Science student specializing in Full-Stack Development and AI/ML Engineering. Crafting intelligent systems and immersive digital experiences.',
  keywords: [
    'Bhavya Srivastava',
    'Full-Stack Developer',
    'AI Engineer',
    'Portfolio',
    'React',
    'Next.js',
    'Three.js',
    'Machine Learning',
  ],
  authors: [{ name: 'Bhavya Srivastava' }],
  openGraph: {
    title: 'Bhavya Srivastava — Full-Stack Developer & AI Engineer',
    description:
      'Crafting intelligent systems and immersive digital experiences — from neural architectures to pixel-perfect interfaces.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${plusJakarta.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
