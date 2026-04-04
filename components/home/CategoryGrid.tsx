import Link from 'next/link'
import Image from 'next/image'
import { CATEGORY_META, CATEGORY_TO_PATH } from '@/lib/types'

const CATEGORY_IMAGES: Record<string, string> = {
  restaurant: '/images/generated-1775333765764.png',
  bar: '/images/generated-1775333779807.png',
  rooftop: '/images/generated-1775333984949.png',
  club: '/images/generated-1775333834587.png',
  sports: '/images/generated-1775333858431.png',
  cultural: '/images/generated-1775343070120.png',
  kids: '/images/generated-1775333917255.png',
  'beach-club': '/images/generated-1775333929985.png',
}

export default function CategoryGrid() {
  const categories = Object.entries(CATEGORY_META)

  return (
    <section className="px-5 pt-2">
      <h2 className="text-base font-bold text-navy mb-3">
        Explore Marbella
      </h2>

      <div className="grid grid-cols-2 gap-[10px]">
        {categories.map(([slug, meta]) => {
          const pathSlug = CATEGORY_TO_PATH[slug] ?? slug
          const imgSrc = CATEGORY_IMAGES[slug]

          return (
            <Link
              key={slug}
              href={`/${pathSlug}`}
              className="group relative h-[140px] rounded-[14px] overflow-hidden shadow-card active:scale-[0.97] transition-transform"
            >
              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt={meta.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 200px"
                  loading="lazy"
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                <span className="text-[13px] font-semibold text-white leading-tight">
                  {meta.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
