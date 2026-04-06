import type { Recommendation } from '@/lib/types'
import RecommendationCard from '@/components/cards/RecommendationCard'
import EmptyState from './EmptyState'

interface RecommendationGridProps {
  items: Recommendation[]
  hasFilters: boolean
}

export default function RecommendationGrid({ items, hasFilters }: RecommendationGridProps) {
  if (items.length === 0) {
    return <EmptyState hasFilters={hasFilters} />
  }

  return (
    <div className="px-4 lg:px-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(item => (
        <RecommendationCard key={item.id} item={item} showCategory={false} />
      ))}
    </div>
  )
}
