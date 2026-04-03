import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import type { Recommendation } from '@/lib/types'
import { CATEGORY_META, CATEGORY_TO_PATH } from '@/lib/types'
import Badge from '@/components/ui/Badge'
import FavoriteButton from '@/components/favorites/FavoriteButton'

interface RecommendationCardProps {
  item: Recommendation
  showFavorite?: boolean
}

export default function RecommendationCard({
  item,
  showFavorite = true,
}: RecommendationCardProps) {
  const meta = CATEGORY_META[item.category]
  const categoryPath = CATEGORY_TO_PATH[item.category] ?? item.category
  const href = `/r/${item.slug}`

  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 active:scale-[0.98]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-sand overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${meta?.bgColor ?? 'from-navy/40 to-navy/20'} flex items-center justify-center`}>
            <span className="text-4xl opacity-60">{meta?.icon ?? '📍'}</span>
          </div>
        )}

        {/* Seasonal label */}
        {item.seasonalPick && item.seasonalLabel && (
          <div className="absolute top-2 left-2">
            <Badge text={item.seasonalLabel} variant="seasonal" />
          </div>
        )}

        {/* Favorite button */}
        {showFavorite && (
          <div className="absolute top-2 right-2">
            <FavoriteButton recommendationId={item.id} slug={item.slug} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Badge text={meta?.label ?? item.category} variant="category" category={item.category} />
          {item.priceRange && (
            <Badge text={item.priceRange} variant="price" />
          )}
        </div>

        <h3 className="font-heading text-navy font-medium text-lg leading-snug line-clamp-1">
          {item.name}
        </h3>

        {item.neighborhood && (
          <p className="flex items-center gap-0.5 text-xs text-navy/50 mt-0.5 mb-2">
            <MapPin size={10} strokeWidth={2} />
            {item.neighborhood}
          </p>
        )}

        {item.travelerTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.travelerTags.slice(0, 3).map(tag => (
              <Badge key={tag} text={tag} variant="tag" />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
