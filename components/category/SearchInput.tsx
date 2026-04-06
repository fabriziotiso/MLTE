'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, X } from 'lucide-react'

export default function SearchInput({ className }: { className?: string }) {
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
    <div className={`relative mx-4 mb-3 ${className ?? ''}`}>
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] pointer-events-none"
      />
      <input
        type="search"
        placeholder="Search by name or description…"
        value={value}
        onChange={handleChange}
        className="w-full h-11 pl-10 pr-10 bg-white rounded-full border border-[#E8E4DE] text-[13px] text-navy placeholder:text-[#BBBBBB] focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/10 transition-all"
      />
      {value && (
        <button
          onClick={clear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-navy/70"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
