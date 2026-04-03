import { MapPin, Phone, Globe, ExternalLink } from 'lucide-react'
import type { Recommendation } from '@/lib/types'

interface PracticalInfoProps {
  item: Recommendation
}

interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}

function InfoRow({ icon, label, value, href, external }: InfoRowProps) {
  const content = (
    <div className="flex items-start gap-3 py-3 border-b border-sand last:border-0">
      <div className="w-8 h-8 rounded-full bg-forest/8 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-forest">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-navy/40 font-medium uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-navy text-sm leading-snug break-words">{value}</p>
      </div>
      {href && <ExternalLink size={14} className="text-navy/30 shrink-0 mt-2" />}
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="block hover:bg-forest/5 rounded-xl -mx-2 px-2 transition-colors"
      >
        {content}
      </a>
    )
  }

  return content
}

export default function PracticalInfo({ item }: PracticalInfoProps) {
  const rows: InfoRowProps[] = []

  if (item.address) {
    rows.push({
      icon: <MapPin size={15} />,
      label: 'Address',
      value: item.address,
      href: item.googleMapsUrl ?? `https://maps.google.com/?q=${encodeURIComponent(item.address)}`,
      external: true,
    })
  }

  if (item.phone) {
    rows.push({
      icon: <Phone size={15} />,
      label: 'Phone',
      value: item.phone,
      href: `tel:${item.phone.replace(/\s/g, '')}`,
    })
  }

  if (item.website) {
    rows.push({
      icon: <Globe size={15} />,
      label: 'Website',
      value: item.website.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      href: item.website,
      external: true,
    })
  }

  if (item.instagram) {
    const handle = item.instagram.startsWith('@') ? item.instagram : `@${item.instagram}`
    rows.push({
      icon: <span className="text-[15px] leading-none">📸</span>,
      label: 'Instagram',
      value: handle,
      href: `https://instagram.com/${handle.replace('@', '')}`,
      external: true,
    })
  }

  if (rows.length === 0) return null

  return (
    <div className="mx-4 mb-5 bg-white rounded-2xl px-4 py-1 shadow-card">
      <p className="text-xs font-bold text-navy/40 uppercase tracking-widest pt-3 pb-1">
        Practical Info
      </p>
      {rows.map((row, i) => (
        <InfoRow key={i} {...row} />
      ))}
    </div>
  )
}
