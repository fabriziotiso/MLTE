import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results = await prisma.recommendation.findMany({
    where: { active: true, neighborhood: { not: null } },
    select: { neighborhood: true },
    distinct: ['neighborhood'],
    orderBy: { neighborhood: 'asc' },
  })

  const neighborhoods = results
    .map(r => r.neighborhood)
    .filter((n): n is string => n !== null)

  return Response.json(neighborhoods)
}
