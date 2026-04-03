interface CEOIntroProps {
  text: string
  categoryIcon: string
}

export default function CEOIntro({ text, categoryIcon }: CEOIntroProps) {
  return (
    <div className="mx-4 mb-5 bg-white rounded-2xl p-4 shadow-card border-l-4 border-terra">
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5 shrink-0">{categoryIcon}</span>
        <div>
          <p className="text-xs font-semibold text-terra uppercase tracking-widest mb-1">
            From the CEO
          </p>
          <p className="text-navy/80 text-sm leading-relaxed italic">
            &ldquo;{text}&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
