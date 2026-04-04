import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { PATH_TO_CATEGORY, CATEGORY_META } from '@/lib/types'
import type { Recommendation } from '@/lib/types'
import CEOIntro from '@/components/category/CEOIntro'
import FilterBar from '@/components/category/FilterBar'
import SearchInput from '@/components/category/SearchInput'
import RecommendationGrid from '@/components/category/RecommendationGrid'
import {
  ChevronLeft, UtensilsCrossed, Wine, Building2, Music2,
  Sailboat, Landmark, FerrisWheel, Waves,
} from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  restaurant: UtensilsCrossed,
  bar: Wine,
  rooftop: Building2,
  club: Music2,
  sports: Sailboat,
  cultural: Landmark,
  kids: FerrisWheel,
  'beach-club': Waves,
}

export const dynamic = 'force-dynamic'

interface PageParams {
  params: Promise<{ category: string }>
  searchParams: Promise<{
    travelerTag?: string | string[]
    priceRange?: string
    neighborhood?: string
    search?: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(PATH_TO_CATEGORY).map(slug => ({ category: slug }))
}

export default async function CategoryPage({ params, searchParams }: PageParams) {
  const { category: pathCategory } = await params
  const sp = await searchParams

  const dbCategory = PATH_TO_CATEGORY[pathCategory]
  if (!dbCategory) notFound()

  const meta = CATEGORY_META[dbCategory]
  const CategoryIcon = CATEGORY_ICONS[dbCategory] ?? UtensilsCrossed

  // Build filters
  const travelerTags = Array.isArray(sp.travelerTag)
    ? sp.travelerTag
    : sp.travelerTag
    ? [sp.travelerTag]
    : []

  const where: Record<string, unknown> = { category: dbCategory, active: true }
  if (travelerTags.length > 0) where.travelerTags = { hasSome: travelerTags }
  if (sp.priceRange) where.priceRange = sp.priceRange
  if (sp.neighborhood) where.neighborhood = sp.neighborhood
  if (sp.search) {
    where.OR = [
      { name: { contains: sp.search, mode: 'insensitive' } },
      { description: { contains: sp.search, mode: 'insensitive' } },
    ]
  }

  const hasFilters = !!(travelerTags.length || sp.priceRange || sp.neighborhood || sp.search)

  const [items, intro, neighborhoods] = await Promise.all([
    prisma.recommendation.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true, name: true, slug: true, description: true,
        category: true, priceRange: true, travelerTags: true,
        neighborhood: true, imageUrl: true, seasonalPick: true,
        seasonalLabel: true, sortOrder: true,
      },
    }).catch(() => []),
    prisma.categoryIntro.findUnique({ where: { category: dbCategory } }).catch(() => null),
    prisma.recommendation.findMany({
      where: { category: dbCategory, active: true, neighborhood: { not: null } },
      select: { neighborhood: true },
      distinct: ['neighborhood'],
      orderBy: { neighborhood: 'asc' },
    }).then(res => res.map(r => r.neighborhood).filter((n): n is string => n !== null)).catch(() => []),
  ])

  return (
    <div className="min-h-screen bg-cream">
      {/* Category header — light background */}
      <div className="bg-cream px-5" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        {/* Back button row */}
        <div className="flex items-center gap-1.5 h-[50px]">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-navy hover:text-navy/70 transition-colors"
          >
            <ChevronLeft size={20} strokeWidth={2} />
            <span className="text-[14px] text-navy">Home</span>
          </Link>
        </div>

        {/* Title row */}
        <div className="flex items-center gap-3 pb-5">
          <CategoryIcon size={32} className="text-navy flex-shrink-0" strokeWidth={1.75} />
          <div className="flex flex-col gap-0.5">
            <h1 className="text-[24px] font-bold text-navy leading-none">{meta.label}</h1>
            <p className="text-[13px] text-[#888888]">
              {items.length} place{items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* CEO Intro */}
      {intro && (
        <div className="pt-2">
          <CEOIntro text={intro.introText} categoryIcon={meta.icon} />
        </div>
      )}

      {/* Search */}
      <div className="pt-4">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>

      {/* Sticky filter bar */}
      <Suspense>
        <FilterBar neighborhoods={neighborhoods} />
      </Suspense>

      {/* Results */}
      <div className="pt-4 pb-8">
        <RecommendationGrid
          items={items as Recommendation[]}
          hasFilters={hasFilters}
        />
      </div>
    </div>
  )
}
