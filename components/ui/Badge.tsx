import { CATEGORY_META } from '@/lib/types'

interface BadgeProps {
  text: string
  variant?: 'category' | 'tag' | 'seasonal' | 'price'
  category?: string
  className?: string
}

export default function Badge({ text, variant = 'tag', category, className = '' }: BadgeProps) {
  if (variant === 'category' && category) {
    const meta = CATEGORY_META[category]
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-forest/10 text-forest ${className}`}>
        {meta?.label ?? text}
      </span>
    )
  }

  if (variant === 'seasonal') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-terra text-white ${className}`}>
        ✦ {text}
      </span>
    )
  }

  if (variant === 'price') {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-gold bg-gold/10 ${className}`}>
        {text}
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sand text-navy/70 ${className}`}>
      {text}
    </span>
  )
}
