'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import RecommendationCard from '@/components/cards/RecommendationCard'
import type { Recommendation } from '@/lib/types'
import { CardSkeleton } from '@/components/ui/Skeleton'

export default function FavoritesClient() {
  const [items, setItems] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFavorites() {
      const slugs = JSON.parse(localStorage.getItem('mlte_favorites') ?? '[]') as string[]
      if (slugs.length === 0) {
        setLoading(false)
        return
      }

      const results = await Promise.all(
        slugs.map(slug =>
          fetch(`/api/recommendations/${slug}`)
            .then(r => r.ok ? r.json() : null)
            .catch(() => null)
        )
      )
      setItems(results.filter(Boolean) as Recommendation[])
      setLoading(false)
    }

    loadFavorites()
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-navy px-4 pt-4 pb-8">
        <div style={{ paddingTop: 'env(safe-area-inset-top)' }} />
        <div className="flex items-center gap-3">
          <Heart size={28} className="text-terra" fill="currentColor" />
          <h1 className="font-heading text-cream text-3xl">Saved Places</h1>
        </div>
      </div>

      {/* Sign-in nudge */}
      <div className="mx-4 mt-4 bg-forest/8 rounded-2xl p-4">
        <p className="text-forest text-sm font-medium mb-1">Save across devices</p>
        <p className="text-navy/60 text-xs mb-3">
          Create a free account to access your favorites from any device.
        </p>
        <Link
          href="/auth/register"
          className="inline-block px-4 py-2 bg-forest text-white rounded-xl text-xs font-medium"
        >
          Create free account
        </Link>
      </div>

      <div className="pt-4 pb-8 px-4">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart size={40} className="text-navy/20 mb-4" />
            <h3 className="font-heading text-navy text-xl mb-2">No saved places yet</h3>
            <p className="text-navy/50 text-sm mb-6">
              Tap the heart on any recommendation to save it here.
            </p>
            <Link href="/" className="px-6 py-2.5 bg-forest text-white rounded-xl text-sm font-medium">
              Explore Marbella
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map(item => <RecommendationCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  )
}
