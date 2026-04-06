import Link from 'next/link'
import Image from 'next/image'
import type { Recommendation } from '@/lib/types'
import { CATEGORY_META } from '@/lib/types'

interface SeasonalCardProps {
  item: Recommendation
}

export default function SeasonalCard({ item }: SeasonalCardProps) {
  const meta = CATEGORY_META[item.category]

  return (
    <Link
      href={`/r/${item.slug}`}
      className="group flex-shrink-0 w-40 h-[220px] rounded-xl bg-white overflow-hidden flex flex-col shadow-[0_4px_12px_rgba(0,0,0,0.07)] active:scale-[0.97] transition-transform"
    >
      {/* Image — top portion */}
      <div className="relative h-[130px] overflow-hidden rounded-t-xl flex-shrink-0 bg-sand">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="160px"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${meta?.bgColor ?? 'from-navy to-navy/60'} flex items-center justify-center`}>
            <span className="text-3xl opacity-60">{meta?.icon ?? '📍'}</span>
          </div>
        )}
      </div>

      {/* Text area — white bottom */}
      <div className="flex flex-col gap-[3px] px-3 py-[10px] flex-1">
        {meta && (
          <p className="text-[9px] font-bold text-[#FF8C42] tracking-[1.5px]">
            {meta.label.toUpperCase()}
          </p>
        )}
        <h3 className="text-[14px] font-bold text-navy leading-snug line-clamp-2">
          {item.name}
        </h3>
        {item.neighborhood && (
          <p className="text-[11px] text-[#888888] line-clamp-1">
            {item.neighborhood}
          </p>
        )}
      </div>
    </Link>
  )
}
