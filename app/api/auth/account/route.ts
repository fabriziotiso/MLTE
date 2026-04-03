import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function DELETE() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Cascade delete via Prisma relations (favorites deleted automatically)
  await prisma.user.delete({ where: { id: session.user.id } })

  return Response.json({ success: true, message: 'Account and all data deleted' })
}
