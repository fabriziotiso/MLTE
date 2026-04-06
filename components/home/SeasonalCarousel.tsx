import type { Recommendation } from '@/lib/types'
import SeasonalCard from '@/components/cards/SeasonalCard'

interface SeasonalCarouselProps {
  items: Recommendation[]
}

export default function SeasonalCarousel({ items }: SeasonalCarouselProps) {
  if (items.length === 0) return null

  return (
    <section className="mb-8">
      <div className="px-4 lg:px-12 mb-3">
        <h2 className="text-base lg:text-[18px] font-bold text-navy">
          Seasonal Picks
        </h2>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="lg:hidden flex gap-3 overflow-x-auto px-4 pb-2 scroll-x">
        {items.map(item => (
          <SeasonalCard key={item.id} item={item} />
        ))}
        <div className="flex-shrink-0 w-4" />
      </div>

      {/* Desktop: grid (max 3 per row) */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-5 lg:px-12">
        {items.slice(0, 3).map(item => (
          <SeasonalCard key={item.id} item={item} desktop />
        ))}
      </div>
    </section>
  )
}
