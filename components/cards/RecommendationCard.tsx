import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Heart } from 'lucide-react'
import type { Recommendation } from '@/lib/types'
import { CATEGORY_META } from '@/lib/types'
import FavoriteButton from '@/components/favorites/FavoriteButton'

interface RecommendationCardProps {
  item: Recommendation
  showFavorite?: boolean
  showCategory?: boolean
}

export default function RecommendationCard({
  item,
  showFavorite = true,
  showCategory = true,
}: RecommendationCardProps) {
  const meta = CATEGORY_META[item.category]
  const href = `/r/${item.slug}`

  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 active:scale-[0.98]"
    >
      {/* Image — fixed 200px height */}
      <div className="relative h-[200px] overflow-hidden rounded-t-2xl bg-sand">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${meta?.bgColor ?? 'from-navy/40 to-navy/20'}`} />
        )}

        {/* Heart button — top right */}
        {showFavorite ? (
          <div className="absolute top-3 right-3">
            <FavoriteButton recommendationId={item.id} slug={item.slug} />
          </div>
        ) : (
          <div className="absolute top-3 right-3 w-[34px] h-[34px] bg-white rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.12)] flex items-center justify-center">
            <Heart size={16} className="text-[#CCCCCC]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pt-[14px] pb-4 flex flex-col gap-[5px]">
        {/* Price */}
        {item.priceRange && (
          <p className="text-[13px] text-[#AAAAAA]">{item.priceRange}</p>
        )}

        {/* Name */}
        <h3 className="text-[17px] font-bold text-navy leading-snug line-clamp-1">
          {item.name}
        </h3>

        {/* Location */}
        {item.neighborhood && (
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-terra flex-shrink-0" strokeWidth={2} />
            <span className="text-xs text-[#888888] line-clamp-1">{item.neighborhood}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
