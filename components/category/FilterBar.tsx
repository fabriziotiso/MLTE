'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { PRICE_RANGES, TRAVELER_TAGS } from '@/lib/types'

interface FilterBarProps {
  category: string
  neighborhoods: string[]
  cuisineTypes?: string[]
}

type FilterKey = 'priceRange' | 'neighborhood' | 'travelerTag' | 'cuisineType'

interface FilterDef {
  key: FilterKey
  label: string
  options: string[]
  multi?: boolean
}

const PRICE_OPTIONS = [...PRICE_RANGES]
const TAG_OPTIONS = [...TRAVELER_TAGS]

function buildFilters(
  category: string,
  neighborhoods: string[],
  cuisineTypes: string[]
): FilterDef[] {
  const price: FilterDef = { key: 'priceRange', label: 'Price', options: PRICE_OPTIONS }
  const hood: FilterDef = { key: 'neighborhood', label: 'Neighborhood', options: neighborhoods }
  const travelers: FilterDef = { key: 'travelerTag', label: 'For', options: TAG_OPTIONS, multi: true }
  const cuisine: FilterDef = { key: 'cuisineType', label: 'Cuisine', options: cuisineTypes }

  switch (category) {
    case 'restaurant':
      return [price, cuisine, hood]
    case 'bar':
    case 'club':
    case 'kids':
      return [price, hood]
    case 'rooftop':
    case 'beach-club':
      return [price, hood, travelers]
    case 'sports':
    case 'cultural':
      return [price, travelers, hood]
    default:
      return [price, hood]
  }
}

export default function FilterBar({ category, neighborhoods, cuisineTypes = [] }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openKey, setOpenKey] = useState<FilterKey | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenKey(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function getValue(key: FilterKey): string | string[] | null {
    if (key === 'travelerTag') return searchParams.getAll('travelerTag')
    return searchParams.get(key)
  }

  function isActive(key: FilterKey): boolean {
    const v = getValue(key)
    return Array.isArray(v) ? v.length > 0 : v !== null
  }

  function getDisplayLabel(filter: FilterDef): string {
    const v = getValue(filter.key)
    if (Array.isArray(v) && v.length > 0) {
      return v.length === 1 ? v[0] : `${filter.label} (${v.length})`
    }
    if (typeof v === 'string' && v) return v
    return filter.label
  }

  function selectOption(key: FilterKey, value: string, multi?: boolean) {
    const params = new URLSearchParams(searchParams.toString())
    if (multi) {
      const existing = params.getAll(key)
      if (existing.includes(value)) {
        params.delete(key)
        existing.filter(t => t !== value).forEach(t => params.append(key, t))
      } else {
        params.append(key, value)
      }
    } else {
      if (params.get(key) === value) {
        params.delete(key)
      } else {
        params.set(key, value)
        setOpenKey(null)
      }
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function clearFilter(key: FilterKey) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    setOpenKey(null)
  }

  const allFilters = buildFilters(category, neighborhoods, cuisineTypes)
  // Hide filters with no options (except price, travelerTag which always have options)
  const filters = allFilters.filter(f =>
    f.key === 'priceRange' || f.key === 'travelerTag' || f.options.length > 0
  )

  if (filters.length === 0) return null

  return (
    <div ref={barRef} className="sticky top-0 z-30 bg-cream/95 backdrop-blur-md border-b border-[#ECEAE4]">
      <div className="flex items-center gap-[10px] px-4 py-3">
        {filters.map(filter => {
          const active = isActive(filter.key)
          const label = getDisplayLabel(filter)
          const isOpen = openKey === filter.key
          const currentValues = filter.multi
            ? (getValue(filter.key) as string[])
            : [getValue(filter.key) as string]

          return (
            <div key={filter.key} className="relative flex-shrink-0">
              <button
                onClick={() => setOpenKey(isOpen ? null : filter.key)}
                className="flex items-center gap-[6px] h-9 px-[14px] rounded-[18px] text-[13px] font-medium transition-all border bg-white text-navy border-[#E0DDD8]"
              >
                <span>{label}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && filter.options.length > 0 && (
                <div className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-[#E8E4DE] z-50 min-w-[160px] max-h-[240px] overflow-y-auto py-1">
                  {active && (
                    <button
                      onClick={() => clearFilter(filter.key)}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-navy font-semibold hover:bg-[#F5F4F2] transition-colors"
                    >
                      All
                    </button>
                  )}
                  {filter.options.map(option => {
                    const selected = currentValues.includes(option)
                    return (
                      <button
                        key={option}
                        onClick={() => selectOption(filter.key, option, filter.multi)}
                        className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors flex items-center justify-between gap-2 ${
                          selected
                            ? 'text-navy font-semibold bg-navy/5'
                            : 'text-[#444444] hover:bg-[#F5F4F2]'
                        }`}
                      >
                        <span>{option}</span>
                        {selected && <span className="text-terra text-[11px]">✓</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

      </div>
    </div>
  )
}
