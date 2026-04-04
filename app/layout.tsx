import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/layout/BottomNav'
import CookieConsent from '@/components/layout/CookieConsent'
import SessionProvider from '@/components/auth/SessionProvider'
import { auth } from '@/lib/auth'

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MLTE Local Guide — Your Curated Marbella',
  description: "The CEO's personal picks for restaurants, bars, rooftops, clubs, sports, culture, kids, and beach clubs in Marbella.",
  keywords: ['Marbella', 'guide', 'restaurants', 'rooftops', 'beach clubs', 'Spain'],
  openGraph: {
    title: 'MLTE Local Guide',
    description: 'Curated Marbella recommendations from the CEO of Marbella Life Tour Experience',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFFBF5',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable} h-full`}>
      <body className="min-h-full bg-cream text-navy font-body">
        <SessionProvider session={session}>
          <main className="pb-24">
            {children}
          </main>
          <BottomNav />
          <CookieConsent />
        </SessionProvider>
      </body>
    </html>
  )
}
