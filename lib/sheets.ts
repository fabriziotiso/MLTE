import { google } from 'googleapis'

// Category tab names in Google Sheets and their corresponding category slugs
export const SHEET_TABS = [
  { tab: 'Restaurants', category: 'restaurant' },
  { tab: 'Bars', category: 'bar' },
  { tab: 'Rooftops', category: 'rooftop' },
  { tab: 'Clubs', category: 'club' },
  { tab: 'Sports & Outdoors', category: 'sports' },
  { tab: 'Cultural Activities', category: 'cultural' },
  { tab: 'Kids', category: 'kids' },
  { tab: 'Beach Clubs', category: 'beach-club' },
] as const

// Category-specific extra field column names (from Excel schema)
const CATEGORY_EXTRA_FIELDS: Record<string, string[]> = {
  restaurant: ['cuisine_type', 'opening_hours', 'reservation_needed', 'outdoor_seating'],
  bar: ['bar_type', 'opening_hours', 'outdoor_seating', 'live_music', 'signature_drink', 'happy_hour'],
  rooftop: ['venue_type', 'opening_hours', 'dress_code', 'reservation_needed', 'best_time', 'views', 'minimum_spend'],
  club: ['music_type', 'opening_hours', 'dress_code', 'entry_fee', 'minimum_age', 'vip_tables', 'booking_url', 'best_night'],
  sports: ['activity_type', 'difficulty_level', 'duration', 'season', 'equipment_needed', 'equipment_rental', 'booking_required', 'operator_name', 'operator_url', 'group_activity'],
  cultural: ['activity_type', 'opening_hours', 'ticket_price', 'is_free', 'duration', 'booking_required', 'guided_tours', 'accessibility', 'child_friendly'],
  kids: ['activity_type', 'age_range', 'is_free', 'ticket_adult', 'ticket_child', 'opening_hours', 'duration', 'indoor_outdoor', 'booking_required', 'distance_from_center', 'operator_url'],
  'beach-club': ['location_zone', 'opening_hours', 'reservation_needed', 'minimum_spend', 'day_entry_fee', 'has_pool', 'music_type', 'vibe', 'restaurant_onsite', 'dress_code'],
}

// Common columns shared by all tabs
const COMMON_COLUMNS = [
  'name', 'slug', 'description', 'why_we_love_it', 'price_range',
  'traveler_tags', 'neighborhood', 'address', 'latitude', 'longitude',
  'google_maps_url', 'phone', 'website', 'instagram', 'image_url',
  'image_gallery', 'seasonal_pick', 'seasonal_label', 'active',
  'sort_order', 'notes',
]

export function getGoogleSheetsClient() {
  const keyJson = JSON.parse(Buffer.from(process.env.GOOGLE_PRIVATE_KEY!, 'base64').toString('utf-8'))

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: keyJson.client_email,
      private_key: keyJson.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  return google.sheets({ version: 'v4', auth })
}

export interface SheetRow {
  name: string
  slug: string
  description: string
  whyWeLoveIt: string | null
  priceRange: string | null
  travelerTags: string[]
  neighborhood: string | null
  address: string | null
  latitude: number | null
  longitude: number | null
  googleMapsUrl: string | null
  phone: string | null
  website: string | null
  instagram: string | null
  imageUrl: string | null
  imageGallery: string[]
  seasonalPick: boolean
  seasonalLabel: string | null
  active: boolean
  sortOrder: number
  extraFields: Record<string, string | null>
  introText?: string
  isIntro?: boolean
}

function cellVal(row: string[], idx: number): string {
  return (row[idx] ?? '').toString().trim()
}

function parseBool(val: string): boolean {
  return ['yes', 'true', '1'].includes(val.toLowerCase())
}

function parseNumber(val: string, fallback: number): number {
  const n = parseFloat(val)
  return isNaN(n) ? fallback : n
}

export function parseSheetData(
  rows: string[][],
  category: string
): { items: SheetRow[]; introText: string | null } {
  if (!rows || rows.length < 4) return { items: [], introText: null }

  // Row 0: column headers (actual field names)
  // Row 1: descriptions
  // Row 2: REQUIRED flags
  // Row 3+: data rows
  const headers = rows[0].map(h => h.toString().trim())

  // Build column index map
  const colIdx: Record<string, number> = {}
  headers.forEach((h, i) => { colIdx[h] = i })

  // Helper to get value by column name
  const get = (row: string[], colName: string): string => {
    const i = colIdx[colName]
    return i !== undefined ? cellVal(row, i) : ''
  }

  const extraFieldNames = CATEGORY_EXTRA_FIELDS[category] ?? []
  const items: SheetRow[] = []
  let introText: string | null = null

  for (let r = 3; r < rows.length; r++) {
    const row = rows[r]
    if (!row || row.length === 0) continue

    const slug = get(row, 'slug')
    const name = get(row, 'name')

    // Check for intro row
    if (slug === 'intro' || name === 'INTRO') {
      introText = get(row, 'description') || get(row, 'why_we_love_it')
      continue
    }

    if (!slug || !name) continue

    // Parse traveler tags
    const tagsRaw = get(row, 'traveler_tags')
    const travelerTags = tagsRaw
      ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean)
      : []

    // Parse image gallery
    const galleryRaw = get(row, 'image_gallery')
    const imageGallery = galleryRaw
      ? galleryRaw.split(',').map(u => u.trim()).filter(Boolean)
      : []

    // Parse extra fields
    const extraFields: Record<string, string | null> = {}
    for (const field of extraFieldNames) {
      const val = get(row, field)
      extraFields[field] = val || null
    }

    const latRaw = get(row, 'latitude')
    const lngRaw = get(row, 'longitude')
    const sortRaw = get(row, 'sort_order')

    items.push({
      name,
      slug,
      description: get(row, 'description'),
      whyWeLoveIt: get(row, 'why_we_love_it') || null,
      priceRange: get(row, 'price_range') || null,
      travelerTags,
      neighborhood: get(row, 'neighborhood') || null,
      address: get(row, 'address') || null,
      latitude: latRaw ? parseNumber(latRaw, 0) || null : null,
      longitude: lngRaw ? parseNumber(lngRaw, 0) || null : null,
      googleMapsUrl: get(row, 'google_maps_url') || null,
      phone: get(row, 'phone') || null,
      website: get(row, 'website') || null,
      instagram: get(row, 'instagram') || null,
      imageUrl: get(row, 'image_url') || null,
      imageGallery,
      seasonalPick: parseBool(get(row, 'seasonal_pick')),
      seasonalLabel: get(row, 'seasonal_label') || null,
      active: get(row, 'active').toLowerCase() !== 'no',
      sortOrder: sortRaw ? parseNumber(sortRaw, 999) : 999,
      extraFields,
    })
  }

  return { items, introText }
}
