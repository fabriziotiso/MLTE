'use client'

import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { TRAVELER_TAGS, PRICE_RANGES } from '@/lib/types'

interface FilterBarProps {
  neighborhoods: string[]
}

export default function FilterBar({ neighborhoods }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showMore, setShowMore] = useState(false)

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || params.get(key) === value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function toggleTravelerTag(tag: string) {
    const params = new URLSearchParams(searchParams.toString())
    const existing = params.getAll('travelerTag')
    if (existing.includes(tag)) {
      params.delete('travelerTag')
      existing.filter(t => t !== tag).forEach(t => params.append('travelerTag', t))
    } else {
      params.append('travelerTag', tag)
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function clearAll() {
    router.replace(pathname, { scroll: false })
  }

  const activeTags = searchParams.getAll('travelerTag')
  const activePrice = searchParams.get('priceRange')
  const activeNeighborhood = searchParams.get('neighborhood')
  const activeSearch = searchParams.get('search')
  const hasFilters = activeTags.length > 0 || activePrice || activeNeighborhood || activeSearch

  return (
    <div className="sticky top-0 z-30 bg-cream/90 backdrop-blur-md border-b border-sand/60 px-4 py-2.5">
      {/* Traveler type row */}
      <div className="flex items-center gap-2 overflow-x-auto scroll-x pb-1">
        {TRAVELER_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTravelerTag(tag)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTags.includes(tag)
                ? 'bg-forest text-white'
                : 'bg-white text-navy/70 border border-sand hover:border-forest/40'
            }`}
          >
            {tag}
          </button>
        ))}

        <div className="w-px h-5 bg-sand shrink-0 mx-0.5" />

        <button
          onClick={() => setShowMore(!showMore)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
            showMore || activePrice || activeNeighborhood
              ? 'bg-navy text-white'
              : 'bg-white text-navy/70 border border-sand hover:border-navy/40'
          }`}
        >
          <SlidersHorizontal size={13} />
          Filters
        </button>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex-shrink-0 flex items-center gap-1 text-xs text-terra hover:text-terra-dark transition-colors px-1"
          >
            <X size={12} />
            Clear
          </button>
        )}
      </div>

      {/* Expanded filters */}
      {showMore && (
        <div className="mt-2 space-y-2 pb-1">
          {/* Price range */}
          <div className="flex items-center gap-2 overflow-x-auto scroll-x">
            <span className="text-xs text-navy/50 shrink-0">Price:</span>
            {PRICE_RANGES.map(range => (
              <button
                key={range}
                onClick={() => updateFilter('priceRange', range)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                  activePrice === range
                    ? 'bg-gold text-white'
                    : 'bg-white text-gold border border-gold/30 hover:border-gold/60'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Neighborhood */}
          {neighborhoods.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto scroll-x">
              <span className="text-xs text-navy/50 shrink-0">Area:</span>
              {neighborhoods.map(n => (
                <button
                  key={n}
                  onClick={() => updateFilter('neighborhood', n)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeNeighborhood === n
                      ? 'bg-navy text-white'
                      : 'bg-white text-navy/70 border border-sand hover:border-navy/40'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
