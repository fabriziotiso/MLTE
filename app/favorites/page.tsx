import Link from 'next/link'
import { Heart } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Recommendation } from '@/lib/types'
import RecommendationCard from '@/components/cards/RecommendationCard'
import FavoritesClient from './FavoritesClient'

export const dynamic = 'force-dynamic'

export default async function FavoritesPage() {
  const session = await auth()

  if (!session?.user?.id) {
    // Show client-side localStorage favorites
    return <FavoritesClient />
  }

  // Server-side favorites for logged-in users
  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      recommendation: {
        select: {
          id: true, name: true, slug: true, description: true,
          category: true, priceRange: true, travelerTags: true,
          neighborhood: true, imageUrl: true, seasonalPick: true,
          seasonalLabel: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const items = favorites.map(f => f.recommendation) as Recommendation[]

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-cream px-5 lg:px-12 pb-5 lg:pb-8" style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}>
        <div className="flex items-center gap-3">
          <Heart size={28} className="text-navy" fill="currentColor" />
          <h1 className="text-[24px] lg:text-[28px] font-bold text-navy">Saved Places</h1>
        </div>
        <p className="text-[#888888] text-[13px] mt-0.5">{items.length} saved</p>
      </div>

      <div className="pt-5 pb-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
            <Heart size={40} className="text-navy/20 mb-4" />
            <h3 className="font-heading text-navy text-xl mb-2">No saved places yet</h3>
            <p className="text-navy/50 text-sm mb-6">
              Tap the heart on any recommendation to save it here.
            </p>
            <Link
              href="/"
              className="px-6 py-2.5 bg-forest text-white rounded-xl text-sm font-medium"
            >
              Explore Marbella
            </Link>
          </div>
        ) : (
          <div className="px-4 lg:px-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(item => (
              <RecommendationCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
