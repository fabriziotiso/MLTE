'use client'

import { useRouter, usePathname } from 'next/navigation'
import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  hasFilters: boolean
}

export default function EmptyState({ hasFilters }: EmptyStateProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mb-4">
        <SearchX size={28} className="text-navy/30" />
      </div>
      <h3 className="font-heading text-navy text-xl mb-2">
        {hasFilters ? 'No matches found' : 'Nothing here yet'}
      </h3>
      <p className="text-navy/50 text-sm leading-relaxed mb-6 max-w-xs">
        {hasFilters
          ? 'Try adjusting or clearing your filters to see more options.'
          : 'The CEO is working on curating picks for this category. Check back soon!'}
      </p>
      {hasFilters && (
        <button
          onClick={() => router.replace(pathname, { scroll: false })}
          className="px-6 py-2.5 bg-forest text-white rounded-xl text-sm font-medium hover:bg-forest-light transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
