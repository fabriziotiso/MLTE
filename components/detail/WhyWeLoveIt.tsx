interface WhyWeLoveItProps {
  text: string
}

export default function WhyWeLoveIt({ text }: WhyWeLoveItProps) {
  return (
    <div className="mx-4 mb-5 flex gap-3">
      {/* Orange accent bar */}
      <div className="w-[3px] h-20 bg-terra rounded-sm flex-shrink-0 mt-0.5" />

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[9px] font-bold text-terra uppercase tracking-[1.5px]">
          WHY WE LOVE IT
        </p>
        <p className="text-[15px] italic text-navy leading-[1.55]">
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </div>
  )
}
