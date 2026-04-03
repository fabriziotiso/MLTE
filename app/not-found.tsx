import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-forest flex items-center justify-center mb-6">
        <MapPin size={36} className="text-cream" strokeWidth={1.5} />
      </div>
      <h1 className="font-heading text-navy text-4xl mb-2">Lost in Marbella?</h1>
      <p className="text-navy/50 text-sm mb-8 max-w-xs">
        This page doesn&apos;t exist. Let&apos;s get you back to the guide.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 bg-forest text-white rounded-xl font-semibold text-sm hover:bg-forest-light transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
