import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, MapPin } from 'lucide-react'
import type { Recommendation } from '@/lib/types'
import { CATEGORY_META } from '@/lib/types'

interface ImageHeroProps {
  item: Recommendation
  backHref: string
}

export default function ImageHero({ item, backHref }: ImageHeroProps) {
  const meta = CATEGORY_META[item.category]

  return (
    <div className="relative w-full h-[300px] lg:h-[420px] bg-sand overflow-hidden">
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

      {/* Gradient overlay — bottom to top darkening */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-black/80" />

      {/* Back button — solid white */}
      <div className="absolute left-4" style={{ top: 'calc(env(safe-area-inset-top) + 52px)' }}>
        <Link
          href={backHref}
          className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.20)] text-navy hover:bg-cream transition-colors"
        >
          <ChevronLeft size={18} />
        </Link>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 lg:px-12 pb-5 lg:pb-8">
        <p className="text-[11px] lg:text-[12px] text-white/80 mb-1">
          {meta?.label ?? item.category}
        </p>
        <h1 className="text-[26px] lg:text-[42px] font-bold text-white leading-[1.1]">
          {item.name}
        </h1>
        {item.neighborhood && (
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin size={11} className="text-terra flex-shrink-0" />
            <p className="text-[11px] text-white/85">{item.neighborhood}</p>
          </div>
        )}
      </div>
    </div>
  )
}
