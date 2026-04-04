import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-cream px-5 pb-5" style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}>
        <Link href="/" className="flex items-center gap-1.5 text-navy hover:text-navy/70 text-[14px] mb-4 w-fit">
          <ChevronLeft size={16} /> Home
        </Link>
        <h1 className="text-[24px] font-bold text-navy">Privacy Policy</h1>
        <p className="text-[#888888] text-[13px] mt-0.5">Last updated: April 2026</p>
      </div>

      <div className="px-4 py-6 pb-12 max-w-2xl mx-auto space-y-6 text-navy/80 text-sm leading-relaxed">
        <section>
          <h2 className="font-heading text-navy text-xl mb-2">About this app</h2>
          <p>
            The MLTE Local Guide is a curated recommendation app operated by Marbella Life Tour Experience (MLTE).
            This policy explains what data we collect, why, and your rights under GDPR.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-navy text-xl mb-2">What we collect</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong>Account creation (optional):</strong> Email address and password hash. Creating an account is not required to use the app.</li>
            <li><strong>Favorites:</strong> If you create an account, we store the list of places you save. Without an account, favorites are stored locally on your device.</li>
            <li><strong>No analytics:</strong> We do not use Google Analytics, tracking pixels, or any third-party analytics tools.</li>
            <li><strong>No cookies beyond session:</strong> We only use essential session cookies for authentication.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-navy text-xl mb-2">Why we collect it</h2>
          <p>We collect your email and password solely to allow you to log in and sync your saved places across devices. Your data is never sold or shared with third parties.</p>
        </section>

        <section>
          <h2 className="font-heading text-navy text-xl mb-2">Data storage</h2>
          <p>All data is stored on Railway infrastructure. We use industry-standard security practices including bcrypt password hashing and HTTPS-only connections.</p>
        </section>

        <section>
          <h2 className="font-heading text-navy text-xl mb-2">Your rights (GDPR)</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong>Right to access:</strong> Your email and favorites are visible in your account.</li>
            <li><strong>Right to deletion:</strong> You can permanently delete your account and all associated data from the Profile page. This is irreversible.</li>
            <li><strong>Right to portability:</strong> Contact us to request an export of your data.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-navy text-xl mb-2">Contact</h2>
          <p>Questions? Email <a href="mailto:info@mlte.com" className="text-forest underline">info@mlte.com</a></p>
        </section>
      </div>
    </div>
  )
}
