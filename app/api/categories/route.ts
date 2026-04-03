import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const CATEGORIES = [
  { slug: 'restaurant', label: 'Restaurants', icon: '🍽️' },
  { slug: 'bar', label: 'Bars', icon: '🍹' },
  { slug: 'rooftop', label: 'Rooftops', icon: '🌆' },
  { slug: 'club', label: 'Clubs', icon: '🎵' },
  { slug: 'sports', label: 'Sports & Outdoors', icon: '⛵' },
  { slug: 'cultural', label: 'Cultural', icon: '🏛️' },
  { slug: 'kids', label: 'Kids', icon: '🎡' },
  { slug: 'beach-club', label: 'Beach Clubs', icon: '🏖️' },
]

export async function GET() {
  const counts = await prisma.recommendation.groupBy({
    by: ['category'],
    where: { active: true },
    _count: { category: true },
  })

  const countMap = Object.fromEntries(counts.map(c => [c.category, c._count.category]))

  const categories = CATEGORIES.map(cat => ({
    ...cat,
    count: countMap[cat.slug] ?? 0,
  }))

  return Response.json(categories)
}
