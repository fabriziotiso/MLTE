import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CATEGORY_META, CATEGORY_TO_PATH } from '@/lib/types'
import type { Recommendation } from '@/lib/types'
import ImageHero from '@/components/detail/ImageHero'
import WhyWeLoveIt from '@/components/detail/WhyWeLoveIt'
import PracticalInfo from '@/components/detail/PracticalInfo'
import CategoryFields from '@/components/detail/CategoryFields'
import ShareButton from '@/components/detail/ShareButton'
import FavoriteButton from '@/components/favorites/FavoriteButton'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const categoryMeta = CATEGORY_META[item.category]

  const actionBar = (
    <>
      <FavoriteButton recommendationId={item.id} slug={item.slug} size={18} />
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
    </>
  )

  const gallery = recommendation.imageGallery && recommendation.imageGallery.length > 0 && (
    <div className="mb-5">
      <p className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-[1.5px] px-4 lg:px-0 mb-2">
        Gallery
      </p>
      <div className="flex gap-2 overflow-x-auto scroll-x px-4 lg:px-0">
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
  )

  return (
    <div className="min-h-screen bg-cream">
      {/* Desktop breadcrumb topbar */}
      <div className="hidden lg:flex items-center gap-2 h-[52px] px-12 bg-white border-b border-[#ECEAE4]">
        <Link href={backHref} className="flex items-center gap-1.5 text-[#888888] hover:text-navy transition-colors text-[13px]">
          <ChevronLeft size={16} className="text-navy" />
          {categoryMeta?.label ?? item.category}
        </Link>
        <ChevronRight size={14} className="text-[#CCCCCC]" />
        <span className="text-[13px] font-semibold text-navy">{item.name}</span>
      </div>

      {/* Hero image */}
      <ImageHero item={recommendation} backHref={backHref} />

      {/* Action bar — mobile */}
      <div className="lg:hidden bg-white border-b border-[#E8E4DE] px-4 py-[14px] flex items-center gap-3">
        {actionBar}
      </div>

      {/* Two-column layout on desktop, single column on mobile */}
      <div className="lg:flex lg:gap-10 lg:px-12 lg:pt-10 lg:pb-12 lg:items-start">

        {/* Left column — main content */}
        <div className="flex-1 min-w-0 pt-5 lg:pt-0">
          <div className="px-4 lg:px-0 mb-5">
            <p className="text-[14px] lg:text-[15px] text-[#444444] leading-[1.6] lg:leading-[1.65]">{item.description}</p>
          </div>

          {item.whyWeLoveIt && <WhyWeLoveIt text={item.whyWeLoveIt} />}

          {/* Gallery — in left col on desktop */}
          <div className="hidden lg:block">
            {gallery}
          </div>
        </div>

        {/* Right column — desktop only */}
        <div className="lg:w-[360px] lg:shrink-0 lg:flex lg:flex-col lg:gap-5">
          {/* Action bar on desktop */}
          <div className="hidden lg:flex items-center gap-3 pb-1">
            {actionBar}
          </div>

          {/* Category fields card */}
          <CategoryFields item={recommendation} />

          {/* Practical info */}
          <PracticalInfo item={recommendation} />
        </div>
      </div>

      {/* Gallery — mobile only */}
      <div className="lg:hidden pb-12">
        {gallery}
      </div>
    </div>
  )
}
