interface WhyWeLoveItProps {
  text: string
}

export default function WhyWeLoveIt({ text }: WhyWeLoveItProps) {
  return (
    <div className="mx-4 mb-5 bg-terra/5 rounded-2xl p-4 border-l-4 border-terra">
      <p className="text-xs font-bold text-terra uppercase tracking-widest mb-2">
        Why we love it
      </p>
      <p className="font-heading text-navy text-xl leading-snug italic">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  )
}
