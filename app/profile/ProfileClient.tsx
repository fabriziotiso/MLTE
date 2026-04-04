'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User, LogOut, Trash2, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface ProfileClientProps {
  email: string
  userId: string
}

export default function ProfileClient({ email }: ProfileClientProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  async function handleSignOut() {
    localStorage.removeItem('mlte_favorites')
    await signOut({ callbackUrl: '/' })
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    const res = await fetch('/api/auth/account', { method: 'DELETE' })
    if (res.ok) {
      localStorage.removeItem('mlte_favorites')
      await signOut({ callbackUrl: '/' })
    } else {
      setDeleting(false)
      setShowDeleteConfirm(false)
      alert('Failed to delete account. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-cream px-5 pb-5" style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-navy hover:text-navy/70 text-[14px] mb-4 transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center">
            <User size={28} className="text-navy" />
          </div>
          <div>
            <h1 className="text-[24px] font-bold text-navy">Profile</h1>
            <p className="text-[#888888] text-[13px]">{email}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 pb-12 space-y-3">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <p className="text-xs font-bold text-navy/40 uppercase tracking-widest mb-3">Account</p>
          <div className="flex items-center gap-3 py-2">
            <User size={16} className="text-navy/40" />
            <div>
              <p className="text-xs text-navy/40">Email</p>
              <p className="text-sm text-navy font-medium">{email}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card hover:bg-sand/30 transition-colors text-left"
        >
          <LogOut size={18} className="text-navy/50" />
          <span className="text-navy font-medium text-sm">Sign out</span>
        </button>

        <div className="bg-white rounded-2xl p-4 shadow-card">
          <p className="text-xs font-bold text-navy/40 uppercase tracking-widest mb-3">Privacy</p>
          <Link
            href="/privacy"
            className="flex items-center justify-between py-2 text-sm text-navy/70 hover:text-navy transition-colors"
          >
            Privacy Policy
            <ChevronLeft size={14} className="rotate-180" />
          </Link>
        </div>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card hover:bg-red-50 transition-colors text-left"
          >
            <Trash2 size={18} className="text-red-500" />
            <div>
              <p className="text-red-600 font-medium text-sm">Delete account</p>
              <p className="text-xs text-navy/40">Permanently removes all your data</p>
            </div>
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-red-700 font-semibold text-sm mb-1">Are you sure?</p>
            <p className="text-red-600/70 text-xs mb-4">
              This will permanently delete your account and all saved favorites. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 bg-white border border-red-200 text-red-700 rounded-xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium disabled:opacity-60"
              >
                {deleting ? 'Deleting…' : 'Delete account'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
