'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, MapPin } from 'lucide-react'

export default function RegisterForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [gdprConsent, setGdprConsent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!gdprConsent) {
      setError('Please accept the privacy policy to continue')
      return
    }

    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, gdprConsent }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Registration failed')
      setLoading(false)
      return
    }

    // Auto sign in
    await signIn('credentials', { email, password, redirect: false })
    router.push('/favorites')
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center">
              <MapPin size={20} className="text-cream" strokeWidth={2.5} />
            </div>
            <span className="font-heading text-navy text-2xl">MLTE Guide</span>
          </div>

          <h1 className="font-heading text-navy text-3xl text-center mb-1">Create account</h1>
          <p className="text-navy/50 text-sm text-center mb-8">Save your Marbella picks across devices</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wide mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-white rounded-xl border border-sand text-navy placeholder:text-navy/30 text-sm focus:outline-none focus:border-forest/40 focus:ring-1 focus:ring-forest/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wide mb-1.5">
                Password <span className="normal-case font-normal text-navy/40">(min 8 chars)</span>
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-sand text-navy placeholder:text-navy/30 text-sm focus:outline-none focus:border-forest/40 focus:ring-1 focus:ring-forest/20 transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy/60 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={gdprConsent}
                  onChange={e => setGdprConsent(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${gdprConsent ? 'bg-forest border-forest' : 'border-sand group-hover:border-forest/40'}`}>
                  {gdprConsent && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
              <span className="text-xs text-navy/60 leading-relaxed">
                I have read and agree to the{' '}
                <Link href="/privacy" className="text-forest underline" target="_blank">
                  Privacy Policy
                </Link>
                . I understand my data (email and favorites) will be stored securely.
              </span>
            </label>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !gdprConsent}
              className="w-full py-3.5 bg-forest text-white rounded-xl font-semibold text-sm hover:bg-forest-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-sm text-navy/50 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-forest font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
