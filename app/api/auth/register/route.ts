import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, gdprConsent } = body

  if (!email || !password || !gdprConsent) {
    return Response.json(
      { error: 'Email, password, and GDPR consent are required' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 })
  }

  if (password.length < 8) {
    return Response.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 }
    )
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return Response.json({ error: 'Email already registered' }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      gdprConsentAt: new Date(),
    },
    select: { id: true, email: true, createdAt: true },
  })

  return Response.json({ user }, { status: 201 })
}
