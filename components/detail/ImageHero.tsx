import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Recommendation } from '@/lib/types'
import { CATEGORY_META } from '@/lib/types'
import Badge from '@/components/ui/Badge'

interface ImageHeroProps {
  item: Recommendation
  backHref: string
}

export default function ImageHero({ item, backHref }: ImageHeroProps) {
  const meta = CATEGORY_META[item.category]

  return (
    <div className="relative w-full h-[62vh] min-h-72 max-h-[28rem] bg-sand overflow-hidden">
      {item.imageUrl ? (
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${meta?.bgColor ?? 'from-navy to-navy/60'} flex items-center justify-center`}>
          <span className="text-7xl opacity-40">{meta?.icon}</span>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Back button */}
      <div className="absolute top-4 left-4" style={{ top: 'calc(env(safe-area-inset-top) + 1rem)' }}>
        <Link
          href={backHref}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge text={meta?.label ?? item.category} variant="category" category={item.category} className="bg-white/20 text-white border-none" />
          {item.priceRange && (
            <Badge text={item.priceRange} variant="price" className="bg-gold/30 text-gold-light border-none" />
          )}
          {item.seasonalPick && item.seasonalLabel && (
            <Badge text={item.seasonalLabel} variant="seasonal" />
          )}
        </div>
        <h1 className="font-heading text-cream text-3xl leading-tight">
          {item.name}
        </h1>
        {item.neighborhood && (
          <p className="text-cream/70 text-sm mt-0.5">{item.neighborhood}</p>
        )}
      </div>
    </div>
  )
}
