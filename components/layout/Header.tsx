import Link from 'next/link'
import { MapPin } from 'lucide-react'

interface HeaderProps {
  title?: string
  showBack?: boolean
  transparent?: boolean
}

export default function Header({
  title,
  transparent = false,
}: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-40 flex items-center px-4 ${
        transparent
          ? 'bg-transparent'
          : 'bg-cream/90 backdrop-blur-md border-b border-sand/60'
      }`}
      style={{ 
        height: 'calc(3.5rem + env(safe-area-inset-top))',
        paddingTop: 'env(safe-area-inset-top)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Link href="/" className="flex items-center gap-1.5 mr-auto">
        <div className="w-7 h-7 rounded-lg bg-forest flex items-center justify-center">
          <MapPin size={14} className="text-cream" strokeWidth={2.5} />
        </div>
        <span className="font-heading text-navy font-medium text-lg leading-none">
          {title || 'MLTE Guide'}
        </span>
      </Link>
    </header>
  )
}
