import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { PATH_TO_CATEGORY, CATEGORY_META } from '@/lib/types'
import type { Recommendation } from '@/lib/types'
import CEOIntro from '@/components/category/CEOIntro'
import FilterBar from '@/components/category/FilterBar'
import SearchInput from '@/components/category/SearchInput'
import RecommendationGrid from '@/components/category/RecommendationGrid'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

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
      {/* Category hero */}
      <div className="relative bg-navy px-4 pt-4 pb-8">
        <div style={{ paddingTop: 'env(safe-area-inset-top)' }} />
        <Link
          href="/"
          className="flex items-center gap-1 text-cream/60 hover:text-cream/90 text-sm mb-4 transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Home
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{meta.icon}</span>
          <div>
            <h1 className="font-heading text-cream text-3xl">{meta.label}</h1>
            <p className="text-cream/50 text-sm">
              {items.length} place{items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* CEO Intro */}
      {intro && (
        <div className="pt-5">
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
