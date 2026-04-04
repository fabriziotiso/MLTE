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
      <Link href="/" className="flex items-center gap-2 mr-auto">
        <MapPin size={18} className="text-navy" strokeWidth={2} />
        <span className="text-[16px] font-bold text-navy leading-none">
          {title || 'MLTE Guide'}
        </span>
      </Link>
    </header>
  )
}
