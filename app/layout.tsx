import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/layout/BottomNav'
import Sidebar from '@/components/layout/Sidebar'
import CookieConsent from '@/components/layout/CookieConsent'
import SessionProvider from '@/components/auth/SessionProvider'
import { auth } from '@/lib/auth'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
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
  themeColor: '#FAFAF8',
  viewportFit: 'cover',
  colorScheme: 'light dark',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="bg-cream text-navy font-body flex" style={{ height: '100dvh', overflow: 'hidden' }}>
        <SessionProvider session={session}>
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <main className="flex-1 overflow-y-auto pb-4" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
              {children}
            </main>
            <BottomNav />
          </div>
          <CookieConsent />
        </SessionProvider>
      </body>
    </html>
  )
}
