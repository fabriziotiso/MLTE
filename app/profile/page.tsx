import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import ProfileClient from './ProfileClient'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  return <ProfileClient email={session.user.email ?? ''} userId={session.user.id ?? ''} />
}
