'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, X } from 'lucide-react'

export default function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') ?? '')
  const [, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = e.target.value
    setValue(newVal)

    const params = new URLSearchParams(searchParams.toString())
    if (newVal) {
      params.set('search', newVal)
    } else {
      params.delete('search')
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  function clear() {
    setValue('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="relative mx-4 mb-3">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none"
      />
      <input
        type="search"
        placeholder="Search by name or description…"
        value={value}
        onChange={handleChange}
        className="w-full pl-9 pr-9 py-2.5 bg-white rounded-xl border border-sand text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-forest/40 focus:ring-1 focus:ring-forest/20 transition-all"
      />
      {value && (
        <button
          onClick={clear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy/70"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
