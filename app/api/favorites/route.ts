import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      recommendation: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          category: true,
          priceRange: true,
          travelerTags: true,
          neighborhood: true,
          imageUrl: true,
          seasonalPick: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(favorites.map(f => f.recommendation))
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { recommendationId } = await request.json()
  if (!recommendationId) {
    return Response.json({ error: 'recommendationId required' }, { status: 400 })
  }

  const favorite = await prisma.favorite.upsert({
    where: {
      userId_recommendationId: {
        userId: session.user.id,
        recommendationId,
      },
    },
    create: { userId: session.user.id, recommendationId },
    update: {},
  })

  return Response.json({ favorite }, { status: 201 })
}
