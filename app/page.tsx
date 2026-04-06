import Image from 'next/image'
import { prisma } from '@/lib/prisma'
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
      {/* Hero — illustration + wordmark */}
      <div className="bg-cream px-6 lg:px-12 pb-7 lg:pb-9 flex flex-col items-center lg:items-start" style={{ paddingTop: 'max(2.25rem, env(safe-area-inset-top))' }}>
        <Image
          src="/images/generated-1775333470233.png"
          alt="MLTE illustration"
          width={220}
          height={200}
          className="object-contain lg:w-[280px] lg:h-[160px]"
          priority
        />
        <div className="flex flex-col items-center lg:items-start gap-[2px] pt-3">
          <p className="text-[26px] font-bold text-navy leading-tight tracking-[1px]">
            MARBELLA LIFE
          </p>
          <p className="text-[12px] font-semibold text-[#FF8C42] tracking-[3px] uppercase">
            TOUR EXPERIENCE
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#EEEEEE] mx-6 lg:mx-12" />

      {/* Headline */}
      <div className="px-5 lg:px-12 pt-5 pb-2">
        <h1 className="text-[28px] lg:text-[36px] font-bold text-navy leading-[1.2]">
          Curated Local Picks<br />for You
        </h1>
      </div>

      <div className="pb-8">
        {/* Seasonal Picks */}
        <div className="pt-4">
          <SeasonalCarousel items={seasonalPicks} />
        </div>

        {/* Category Grid */}
        <CategoryGrid />

        {/* Footer */}
        <footer className="mt-10 px-4 lg:px-12 text-center lg:text-left space-y-2">
          <p className="text-[10px] text-[#999999]">
            Curated by the MLTE team · Marbella, Spain
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-3 text-[10px] text-[#999999]">
            <a href="/privacy" className="hover:text-[#666666] transition-colors">Privacy Policy</a>
            <span className="text-[#CCCCCC]">·</span>
            <a href="/bug-report" className="hover:text-[#666666] transition-colors">Report a bug</a>
          </div>
        </footer>
      </div>
    </div>
  )
}
