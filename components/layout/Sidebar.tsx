'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, User, MapPin } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/favorites', label: 'Saved', icon: Heart },
  { href: '/profile', label: 'Profile', icon: User },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-[#ECEAE4] h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pt-9 pb-6">
        <MapPin size={20} className="text-navy" />
        <span className="text-[16px] font-bold text-navy">MLTE Guide</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#ECEAE4]" />

      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-3 pt-5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-[10px] rounded-lg text-[14px] transition-colors ${
                isActive
                  ? 'bg-[#F0EDE8] text-navy font-bold'
                  : 'text-[#AAAAAA] hover:bg-[#F5F4F2] hover:text-navy font-normal'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
