import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function DELETE(_req: Request, ctx: RouteContext<'/api/favorites/[id]'>) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id: recommendationId } = await ctx.params

  await prisma.favorite.deleteMany({
    where: {
      userId: session.user.id,
      recommendationId,
    },
  })

  return Response.json({ success: true })
}
