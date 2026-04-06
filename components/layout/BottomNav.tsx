'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, User } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/favorites', label: 'Saved', icon: Heart },
  { href: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="lg:hidden bg-white border-t border-sand shrink-0"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-[72px] max-w-lg mx-auto px-8">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 py-1 w-[60px] transition-all"
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 1.75}
                className={isActive ? 'text-navy' : 'text-[#AAAAAA]'}
              />
              <span className={`text-[10px] tracking-wide ${isActive ? 'text-navy font-semibold' : 'text-[#AAAAAA] font-medium'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
