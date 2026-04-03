import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, ctx: RouteContext<'/api/recommendations/[slug]'>) {
  const { slug } = await ctx.params

  const recommendation = await prisma.recommendation.findUnique({
    where: { slug, active: true },
  })

  if (!recommendation) return Response.json({ error: 'Not found' }, { status: 404 })

  return Response.json(recommendation)
}
