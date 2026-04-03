import { prisma } from './prisma'
import { getGoogleSheetsClient, SHEET_TABS, parseSheetData } from './sheets'

export interface SyncResult {
  rowsUpdated: number
  status: 'success' | 'error'
  errorMessage?: string
  durationMs: number
}

export async function syncFromGoogleSheets(): Promise<SyncResult> {
  const start = Date.now()
  let rowsUpdated = 0

  try {
    const sheets = getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID!

    // Collect all slugs we process to soft-delete missing ones at the end
    const processedSlugs: string[] = []

    for (const { tab, category } of SHEET_TABS) {
      // Fetch the full tab
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${tab}!A:AH`, // Wide enough to catch all columns
      })

      const rows = (response.data.values ?? []) as string[][]
      const { items, introText } = parseSheetData(rows, category)

      // Upsert CategoryIntro if found
      if (introText) {
        await prisma.categoryIntro.upsert({
          where: { category },
          create: { category, introText, updatedAt: new Date() },
          update: { introText, updatedAt: new Date() },
        })
      }

      // Upsert each recommendation
      for (const item of items) {
        processedSlugs.push(item.slug)

        await prisma.recommendation.upsert({
          where: { slug: item.slug },
          create: {
            name: item.name,
            slug: item.slug,
            description: item.description,
            whyWeLoveIt: item.whyWeLoveIt,
            category,
            priceRange: item.priceRange,
            travelerTags: item.travelerTags,
            neighborhood: item.neighborhood,
            address: item.address,
            latitude: item.latitude,
            longitude: item.longitude,
            googleMapsUrl: item.googleMapsUrl,
            phone: item.phone,
            website: item.website,
            instagram: item.instagram,
            imageUrl: item.imageUrl,
            imageGallery: item.imageGallery,
            seasonalPick: item.seasonalPick,
            seasonalLabel: item.seasonalLabel,
            active: item.active,
            sortOrder: item.sortOrder,
            extraFields: item.extraFields,
          },
          update: {
            name: item.name,
            description: item.description,
            whyWeLoveIt: item.whyWeLoveIt,
            category,
            priceRange: item.priceRange,
            travelerTags: item.travelerTags,
            neighborhood: item.neighborhood,
            address: item.address,
            latitude: item.latitude,
            longitude: item.longitude,
            googleMapsUrl: item.googleMapsUrl,
            phone: item.phone,
            website: item.website,
            instagram: item.instagram,
            imageUrl: item.imageUrl,
            imageGallery: item.imageGallery,
            seasonalPick: item.seasonalPick,
            seasonalLabel: item.seasonalLabel,
            active: item.active,
            sortOrder: item.sortOrder,
            extraFields: item.extraFields,
          },
        })
        rowsUpdated++
      }
    }

    // Soft-delete any active recommendations not in the sheet anymore
    await prisma.recommendation.updateMany({
      where: {
        slug: { notIn: processedSlugs },
        active: true,
      },
      data: { active: false },
    })

    const durationMs = Date.now() - start

    await prisma.syncLog.create({
      data: { rowsUpdated, status: 'success', durationMs },
    })

    return { rowsUpdated, status: 'success', durationMs }
  } catch (error) {
    const durationMs = Date.now() - start
    const errorMessage = error instanceof Error ? error.message : String(error)

    await prisma.syncLog.create({
      data: { rowsUpdated, status: 'error', errorMessage, durationMs },
    }).catch(() => {}) // Don't throw if we can't log

    return { rowsUpdated, status: 'error', errorMessage, durationMs }
  }
}
