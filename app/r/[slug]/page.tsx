import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CATEGORY_TO_PATH } from '@/lib/types'
import type { Recommendation } from '@/lib/types'
import ImageHero from '@/components/detail/ImageHero'
import WhyWeLoveIt from '@/components/detail/WhyWeLoveIt'
import PracticalInfo from '@/components/detail/PracticalInfo'
import CategoryFields from '@/components/detail/CategoryFields'
import ShareButton from '@/components/detail/ShareButton'
import FavoriteButton from '@/components/favorites/FavoriteButton'
import Badge from '@/components/ui/Badge'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params

  const item = await prisma.recommendation.findUnique({
    where: { slug, active: true },
  }).catch(() => null)

  if (!item) notFound()

  const recommendation = item as unknown as Recommendation
  const categoryPath = CATEGORY_TO_PATH[item.category] ?? item.category
  const backHref = `/${categoryPath}`

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero image */}
      <ImageHero item={recommendation} backHref={backHref} />

      <div className="pt-5 pb-12">
        {/* Action row */}
        <div className="flex items-center gap-3 px-4 mb-5">
          <FavoriteButton
            recommendationId={item.id}
            slug={item.slug}
            size={18}
          />
          <ShareButton title={item.name} slug={item.slug} />

          {item.travelerTags.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto scroll-x flex-1">
              {item.travelerTags.map(tag => (
                <Badge key={tag} text={tag} variant="tag" />
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="px-4 mb-5">
          <p className="text-navy/80 text-base leading-relaxed">{item.description}</p>
        </div>

        {/* Why we love it */}
        {item.whyWeLoveIt && <WhyWeLoveIt text={item.whyWeLoveIt} />}

        {/* Category-specific fields */}
        <CategoryFields item={recommendation} />

        {/* Practical info */}
        <PracticalInfo item={recommendation} />

        {/* Image gallery */}
        {recommendation.imageGallery && recommendation.imageGallery.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-bold text-navy/40 uppercase tracking-widest px-4 mb-2">
              Gallery
            </p>
            <div className="flex gap-2 overflow-x-auto scroll-x px-4">
              {recommendation.imageGallery.map((url, i) => (
                <div key={i} className="flex-shrink-0 w-36 h-36 rounded-xl overflow-hidden bg-sand">
                  <Image
                    src={url}
                    alt={`${item.name} photo ${i + 1}`}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map link */}
        {(item.googleMapsUrl || item.address) && (
          <div className="px-4 mb-5">
            <a
              href={item.googleMapsUrl ?? `https://maps.google.com/?q=${encodeURIComponent(item.address ?? '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white rounded-2xl shadow-card text-forest font-medium text-sm hover:bg-forest/5 transition-colors"
            >
              <span>📍</span>
              Open in Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
