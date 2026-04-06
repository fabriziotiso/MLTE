import Link from 'next/link'
import Image from 'next/image'
import type { Recommendation } from '@/lib/types'
import { CATEGORY_META } from '@/lib/types'

interface SeasonalCardProps {
  item: Recommendation
  desktop?: boolean
}

export default function SeasonalCard({ item, desktop }: SeasonalCardProps) {
  const meta = CATEGORY_META[item.category]

  return (
    <Link
      href={`/r/${item.slug}`}
      className={`group bg-white overflow-hidden flex flex-col shadow-[0_4px_16px_rgba(0,0,0,0.09)] active:scale-[0.97] transition-transform rounded-[14px] ${
        desktop ? 'w-full' : 'flex-shrink-0 w-40 h-[220px]'
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden rounded-t-[14px] flex-shrink-0 bg-sand ${desktop ? 'h-[200px]' : 'h-[130px]'}`}>
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes={desktop ? '(min-width: 1024px) 33vw, 160px' : '160px'}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${meta?.bgColor ?? 'from-navy to-navy/60'} flex items-center justify-center`}>
            <span className={`opacity-60 ${desktop ? 'text-5xl' : 'text-3xl'}`}>{meta?.icon ?? '📍'}</span>
          </div>
        )}
      </div>

      {/* Text area */}
      <div className={`flex flex-col gap-[3px] flex-1 ${desktop ? 'px-4 py-[14px]' : 'px-3 py-[10px]'}`}>
        {meta && (
          <p className="text-[9px] font-bold text-[#FF8C42] tracking-[1.5px]">
            {meta.label.toUpperCase()}
          </p>
        )}
        <h3 className={`font-bold text-navy leading-snug line-clamp-2 ${desktop ? 'text-[18px]' : 'text-[14px]'}`}>
          {item.name}
        </h3>
        {item.neighborhood && (
          <p className={`text-[#888888] line-clamp-1 ${desktop ? 'text-[13px]' : 'text-[11px]'}`}>
            {item.neighborhood}
          </p>
        )}
      </div>
    </Link>
  )
}
