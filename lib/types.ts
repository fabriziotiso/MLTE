// Matches the Prisma Recommendation model shape returned by API
export interface Recommendation {
  id: string
  name: string
  slug: string
  description: string
  whyWeLoveIt?: string | null
  category: string
  priceRange?: string | null
  travelerTags: string[]
  neighborhood?: string | null
  address?: string | null
  latitude?: number | null
  longitude?: number | null
  googleMapsUrl?: string | null
  phone?: string | null
  website?: string | null
  instagram?: string | null
  imageUrl?: string | null
  imageGallery?: string[]
  seasonalPick: boolean
  seasonalLabel?: string | null
  active?: boolean
  sortOrder?: number
  extraFields?: Record<string, string | null> | null
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  slug: string
  label: string
  icon: string
  count: number
}

export const CATEGORY_META: Record<string, { label: string; icon: string; plural: string; bgColor: string; path: string }> = {
  restaurant: {
    label: 'Restaurants',
    plural: 'Restaurants',
    icon: '🍽️',
    bgColor: 'from-amber-900/60 to-amber-700/40',
    path: '/restaurants',
  },
  bar: {
    label: 'Bars',
    plural: 'Bars',
    icon: '🍹',
    bgColor: 'from-purple-900/60 to-purple-700/40',
    path: '/bars',
  },
  rooftop: {
    label: 'Rooftops',
    plural: 'Rooftops',
    icon: '🌆',
    bgColor: 'from-sky-900/60 to-sky-700/40',
    path: '/rooftops',
  },
  club: {
    label: 'Clubs',
    plural: 'Clubs',
    icon: '🎵',
    bgColor: 'from-rose-900/60 to-rose-700/40',
    path: '/clubs',
  },
  sports: {
    label: 'Sports & Outdoors',
    plural: 'Sports',
    icon: '⛵',
    bgColor: 'from-emerald-900/60 to-emerald-700/40',
    path: '/sports',
  },
  cultural: {
    label: 'Cultural Activities',
    plural: 'Cultural',
    icon: '🏛️',
    bgColor: 'from-stone-900/60 to-stone-700/40',
    path: '/cultural',
  },
  kids: {
    label: 'Kids',
    plural: 'Kids',
    icon: '🎡',
    bgColor: 'from-orange-900/60 to-orange-700/40',
    path: '/kids',
  },
  'beach-club': {
    label: 'Beach Clubs',
    plural: 'Beach Clubs',
    icon: '🏖️',
    bgColor: 'from-cyan-900/60 to-cyan-700/40',
    path: '/beach-clubs',
  },
}

// Map URL slugs (path segment) to category values in DB
export const PATH_TO_CATEGORY: Record<string, string> = {
  restaurants: 'restaurant',
  bars: 'bar',
  rooftops: 'rooftop',
  clubs: 'club',
  sports: 'sports',
  cultural: 'cultural',
  kids: 'kids',
  'beach-clubs': 'beach-club',
}

export const CATEGORY_TO_PATH: Record<string, string> = Object.fromEntries(
  Object.entries(PATH_TO_CATEGORY).map(([k, v]) => [v, k])
)

export const TRAVELER_TAGS = ['Couple', 'Solo', 'Family', 'Group'] as const
export const PRICE_RANGES = ['€', '€€', '€€€', '€€€€'] as const
