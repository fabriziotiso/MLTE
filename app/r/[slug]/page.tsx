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
import Image from 'next/image'
import { MapPin } from 'lucide-react'

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

      {/* Action bar */}
      <div className="bg-white border-b border-[#E8E4DE] px-4 py-[14px] flex items-center gap-3">
        <FavoriteButton
          recommendationId={item.id}
          slug={item.slug}
          size={18}
        />

        {item.travelerTags.length > 0 && (
          <>
            <div className="w-px h-6 bg-[#E8E4DE] flex-shrink-0" />
            <div className="flex gap-2 overflow-x-auto scroll-x">
              {item.travelerTags.map(tag => (
                <span
                  key={tag}
                  className="flex-shrink-0 h-8 px-[14px] rounded-full bg-[#F0EDE8] text-[12px] text-navy font-medium flex items-center"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="ml-auto">
          <ShareButton title={item.name} slug={item.slug} />
        </div>
      </div>

      <div className="pt-5 pb-12">
        {/* Description */}
        <div className="px-4 mb-5">
          <p className="text-[14px] text-[#444444] leading-[1.6]">{item.description}</p>
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
            <p className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-[1.5px] px-4 mb-2">
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
          <div className="px-4 pt-2 pb-5">
            <a
              href={item.googleMapsUrl ?? `https://maps.google.com/?q=${encodeURIComponent(item.address ?? '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-4 text-terra font-semibold text-[13px] hover:opacity-80 transition-opacity"
            >
              <MapPin size={14} className="text-terra" />
              Open in Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
