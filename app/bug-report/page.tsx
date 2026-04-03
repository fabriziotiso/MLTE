'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Bug, CheckCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function BugReportPage() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await fetch('/api/bug-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, email, page: pathname }),
    })

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
        <CheckCircle size={48} className="text-forest mb-4" />
        <h2 className="font-heading text-navy text-2xl mb-2">Thanks for the report!</h2>
        <p className="text-navy/60 text-sm mb-6">We&apos;ll look into it and fix it as soon as possible.</p>
        <Link href="/" className="px-6 py-3 bg-forest text-white rounded-xl font-medium text-sm">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-navy px-4 pt-4 pb-8">
        <div style={{ paddingTop: 'env(safe-area-inset-top)' }} />
        <Link href="/" className="flex items-center gap-1 text-cream/60 text-sm mb-4 w-fit">
          <ChevronLeft size={16} /> Home
        </Link>
        <div className="flex items-center gap-3">
          <Bug size={28} className="text-terra" />
          <h1 className="font-heading text-cream text-3xl">Report a Bug</h1>
        </div>
      </div>

      <div className="px-4 pt-6 pb-12 max-w-lg mx-auto">
        <p className="text-navy/60 text-sm mb-6">
          Found something broken or confusing? Let us know and we&apos;ll fix it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wide mb-1.5">
              What happened? *
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Describe the issue — what did you do, what did you expect, what actually happened?"
              required
              minLength={10}
              rows={5}
              className="w-full px-4 py-3 bg-white rounded-xl border border-sand text-navy placeholder:text-navy/30 text-sm focus:outline-none focus:border-forest/40 focus:ring-1 focus:ring-forest/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wide mb-1.5">
              Your email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="In case we need to follow up"
              className="w-full px-4 py-3 bg-white rounded-xl border border-sand text-navy placeholder:text-navy/30 text-sm focus:outline-none focus:border-forest/40 focus:ring-1 focus:ring-forest/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || message.length < 10}
            className="w-full py-3.5 bg-forest text-white rounded-xl font-semibold text-sm hover:bg-forest-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending…' : 'Send report'}
          </button>
        </form>
      </div>
    </div>
  )
}
