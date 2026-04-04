'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('mlte_cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('mlte_cookie_consent', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 max-w-sm mx-auto">
      <div className="bg-navy text-cream rounded-2xl p-4 shadow-warm-lg border border-navy/20" style={{ backdropFilter: 'none', opacity: 1 }}>
        <p className="text-sm leading-relaxed mb-3">
          We use essential cookies only — no tracking, no analytics.{' '}
          <Link href="/privacy" className="underline underline-offset-2 text-terra-light">
            Privacy policy
          </Link>
        </p>
        <button
          onClick={accept}
          className="w-full bg-forest text-cream text-sm font-medium py-2.5 rounded-xl hover:bg-forest-light transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
