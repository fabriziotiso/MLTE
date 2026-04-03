import Link from 'next/link'
import { CATEGORY_META, CATEGORY_TO_PATH } from '@/lib/types'

// Category image placeholders — CEO will update with real photography
const CATEGORY_IMAGES: Record<string, string> = {
  restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
  bar: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80',
  rooftop: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&q=80',
  club: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&q=80',
  sports: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80',
  cultural: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&q=80',
  kids: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
  'beach-club': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
}

export default function CategoryGrid() {
  const categories = Object.entries(CATEGORY_META)

  return (
    <section className="px-4">
      <h2 className="font-heading text-navy text-2xl mb-4">
        Explore Marbella
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {categories.map(([slug, meta]) => {
          const pathSlug = CATEGORY_TO_PATH[slug] ?? slug
          const imgSrc = CATEGORY_IMAGES[slug]

          return (
            <Link
              key={slug}
              href={`/${pathSlug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card active:scale-[0.97] transition-transform"
            >
              {/* Background image */}
              {imgSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imgSrc}
                  alt={meta.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              )}

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${meta.bgColor}`} />
              <div className="absolute inset-0 bg-gradient-card" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <span className="text-2xl mb-1">{meta.icon}</span>
                <span className="font-heading text-cream text-base font-medium leading-tight">
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
