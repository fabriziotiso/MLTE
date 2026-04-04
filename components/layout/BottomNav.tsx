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
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sand"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all min-w-[3rem] ${
                isActive
                  ? 'text-forest'
                  : 'text-navy/40 hover:text-navy/70'
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.75}
                className={isActive ? 'text-forest' : ''}
              />
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'text-forest' : ''}`}>
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-forest rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
