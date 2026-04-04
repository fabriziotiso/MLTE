import Link from 'next/link'
import Image from 'next/image'
import type { Recommendation } from '@/lib/types'
import { CATEGORY_META } from '@/lib/types'
import Badge from '@/components/ui/Badge'

interface SeasonalCardProps {
  item: Recommendation
}

export default function SeasonalCard({ item }: SeasonalCardProps) {
  const meta = CATEGORY_META[item.category]

  return (
    <Link
      href={`/r/${item.slug}`}
      className="group relative flex-shrink-0 w-52 h-72 rounded-2xl overflow-hidden shadow-warm active:scale-[0.97] transition-transform"
    >
      {/* Background */}
      {item.imageUrl ? (
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="208px"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${meta?.bgColor ?? 'from-navy to-navy/60'}`} />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-3.5">
        <div className="flex justify-between items-start">
          {item.seasonalLabel && (
            <Badge text={item.seasonalLabel} variant="seasonal" />
          )}
          <span className="ml-auto text-xl">{meta?.icon}</span>
        </div>

        <div className="bg-navy/80 rounded-xl px-3 py-2.5 backdrop-blur-sm">
          <p className="text-cream/70 text-xs mb-0.5 font-medium tracking-wide uppercase">
            {meta?.label}
          </p>
          <h3 className="font-heading text-cream text-lg font-medium leading-snug line-clamp-2">
            {item.name}
          </h3>
          {item.neighborhood && (
            <p className="text-cream/60 text-xs mt-0.5">{item.neighborhood}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
