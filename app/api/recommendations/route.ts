import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const category = searchParams.get('category')
  const travelerTags = searchParams.getAll('travelerTag')
  const priceRange = searchParams.get('priceRange')
  const neighborhood = searchParams.get('neighborhood')
  const search = searchParams.get('search')
  const seasonalPick = searchParams.get('seasonalPick')
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '50', 10)))

  const where: Record<string, unknown> = { active: true }

  if (category) where.category = category
  if (priceRange) where.priceRange = priceRange
  if (neighborhood) where.neighborhood = neighborhood
  if (seasonalPick === 'true') where.seasonalPick = true

  if (travelerTags.length > 0) {
    where.travelerTags = { hasSome: travelerTags }
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [recommendations, total] = await Promise.all([
    prisma.recommendation.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
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
        sortOrder: true,
      },
    }),
    prisma.recommendation.count({ where }),
  ])

  return Response.json({ recommendations, total, page, limit })
}
