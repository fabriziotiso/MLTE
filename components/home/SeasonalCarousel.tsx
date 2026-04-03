import type { Recommendation } from '@/lib/types'
import SeasonalCard from '@/components/cards/SeasonalCard'

interface SeasonalCarouselProps {
  items: Recommendation[]
}

export default function SeasonalCarousel({ items }: SeasonalCarouselProps) {
  if (items.length === 0) return null

  return (
    <section className="mb-8">
      <div className="px-4 mb-3 flex items-baseline justify-between">
        <h2 className="font-heading text-navy text-2xl">
          Picks of the moment
        </h2>
        <span className="text-terra text-xs font-medium uppercase tracking-widest">
          Seasonal
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scroll-x">
        {items.map(item => (
          <SeasonalCard key={item.id} item={item} />
        ))}
        {/* Fade-out edge hint */}
        <div className="flex-shrink-0 w-4" />
      </div>
    </section>
  )
}
