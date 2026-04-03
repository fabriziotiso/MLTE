'use client'

import { Share2, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonProps {
  title: string
  slug: string
}

export default function ShareButton({ title, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = `${window.location.origin}/r/${slug}`
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={share}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sand text-navy/60 hover:text-navy hover:border-navy/30 transition-all text-sm font-medium"
    >
      {copied ? (
        <>
          <Check size={16} className="text-forest" />
          Copied!
        </>
      ) : (
        <>
          <Share2 size={16} />
          Share
        </>
      )}
    </button>
  )
}
