import { prisma } from '@/lib/prisma'
import Header from '@/components/layout/Header'
import SeasonalCarousel from '@/components/home/SeasonalCarousel'
import CategoryGrid from '@/components/home/CategoryGrid'
import type { Recommendation } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getSeasonalPicks(): Promise<Recommendation[]> {
  try {
    const items = await prisma.recommendation.findMany({
      where: { seasonalPick: true, active: true },
      orderBy: { sortOrder: 'asc' },
      take: 12,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        category: true,
        priceRange: true,
        travelerTags: true,
        neighborhood: true,
        imageUrl: true,
        seasonalPick: true,
        seasonalLabel: true,
      },
    })
    return items as Recommendation[]
  } catch {
    return []
  }
}

export default async function HomePage() {
  const seasonalPicks = await getSeasonalPicks()

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero header */}
      <div className="relative bg-gradient-to-b from-forest to-forest-dark px-4 pt-12 pb-10">
        <div style={{ paddingTop: 'env(safe-area-inset-top)' }} />
        <p className="text-terra-light text-xs font-semibold tracking-widest uppercase mb-2">
          Marbella Life Tour Experience
        </p>
        <h1 className="font-heading text-cream text-4xl leading-tight mb-2">
          Your Curated<br />Marbella Guide
        </h1>
        <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
          Hand-picked by the CEO — the places locals actually love.
        </p>
      </div>

      {/* Wave separator */}
      <div className="h-6 bg-gradient-to-b from-forest-dark to-cream" />

      <div className="pb-8">
        {/* Seasonal Picks */}
        <div className="pt-6">
          <SeasonalCarousel items={seasonalPicks} />
        </div>

        {/* Category Grid */}
        <CategoryGrid />

        {/* Footer */}
        <footer className="mt-12 px-4 text-center space-y-1">
          <p className="text-xs text-navy/30">
            Curated by the MLTE team · Marbella, Spain
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-navy/40">
            <a href="/privacy" className="hover:text-navy/60 transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="/bug-report" className="hover:text-navy/60 transition-colors">Report a bug</a>
          </div>
        </footer>
      </div>
    </div>
  )
}
