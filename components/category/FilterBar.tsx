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
    <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur-md border-b border-[#E8E4DE] px-4 py-2.5">
      {/* Traveler type row */}
      <div className="flex items-center gap-2 overflow-x-auto scroll-x pb-1">
        {TRAVELER_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTravelerTag(tag)}
            className={`flex-shrink-0 h-9 px-4 rounded-[18px] text-[13px] font-medium transition-all ${
              activeTags.includes(tag)
                ? 'bg-navy text-white'
                : 'bg-white text-navy border border-[#E0DDD8] hover:border-navy/30'
            }`}
          >
            {tag}
          </button>
        ))}

        <div className="w-px h-5 bg-[#E8E4DE] shrink-0 mx-0.5" />

        <button
          onClick={() => setShowMore(!showMore)}
          className={`flex-shrink-0 flex items-center gap-1.5 h-9 px-4 rounded-[18px] text-[13px] font-medium transition-all ${
            showMore || activePrice || activeNeighborhood
              ? 'bg-navy text-white'
              : 'bg-white text-navy border border-[#E0DDD8] hover:border-navy/30'
          }`}
        >
          <SlidersHorizontal size={13} />
          Filters
        </button>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex-shrink-0 flex items-center gap-1 text-[12px] text-terra hover:text-terra-dark transition-colors px-1"
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
            <span className="text-[12px] text-[#888888] shrink-0">Price:</span>
            {PRICE_RANGES.map(range => (
              <button
                key={range}
                onClick={() => updateFilter('priceRange', range)}
                className={`flex-shrink-0 h-8 px-3 rounded-full text-[13px] font-semibold transition-all ${
                  activePrice === range
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy border border-[#E0DDD8] hover:border-navy/30'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Neighborhood */}
          {neighborhoods.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto scroll-x">
              <span className="text-[12px] text-[#888888] shrink-0">Area:</span>
              {neighborhoods.map(n => (
                <button
                  key={n}
                  onClick={() => updateFilter('neighborhood', n)}
                  className={`flex-shrink-0 h-8 px-3 rounded-full text-[12px] font-medium transition-all ${
                    activeNeighborhood === n
                      ? 'bg-navy text-white'
                      : 'bg-white text-navy border border-[#E0DDD8] hover:border-navy/30'
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
