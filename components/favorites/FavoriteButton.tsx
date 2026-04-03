'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface FavoriteButtonProps {
  recommendationId: string
  slug: string
  className?: string
  size?: number
}

export default function FavoriteButton({
  recommendationId,
  slug,
  className = '',
  size = 20,
}: FavoriteButtonProps) {
  const { data: session } = useSession()
  const [isFav, setIsFav] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.id) return // Server favorites handled separately
    const stored = JSON.parse(localStorage.getItem('mlte_favorites') ?? '[]') as string[]
    setIsFav(stored.includes(slug))
  }, [session, slug])

  async function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return
    setLoading(true)

    if (session?.user?.id) {
      if (isFav) {
        await fetch(`/api/favorites/${recommendationId}`, { method: 'DELETE' })
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recommendationId }),
        })
      }
      setIsFav(prev => !prev)
    } else {
      const stored = JSON.parse(localStorage.getItem('mlte_favorites') ?? '[]') as string[]
      const updated = isFav ? stored.filter(s => s !== slug) : [...stored, slug]
      localStorage.setItem('mlte_favorites', JSON.stringify(updated))
      setIsFav(!isFav)
    }

    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      className={`flex items-center justify-center w-9 h-9 rounded-full transition-all active:scale-90 ${
        isFav
          ? 'bg-terra text-white shadow-warm'
          : 'bg-white/80 text-navy/50 hover:text-terra hover:bg-white shadow-warm'
      } ${className}`}
    >
      <Heart
        size={size}
        strokeWidth={isFav ? 0 : 1.75}
        fill={isFav ? 'currentColor' : 'none'}
        className={loading ? 'opacity-50' : ''}
      />
    </button>
  )
}
