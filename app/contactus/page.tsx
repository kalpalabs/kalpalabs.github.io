import { theme } from "@/lib/theme"

export default function ContactUsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-4xl mx-auto px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-serif mb-8" style={{ color: theme.colors.text }}>
            Contact Us
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: theme.colors.textMuted }}>
            Get in touch with the Kalpa Labs team to learn more about our voice agent technology.
          </p>
        </div>
      </div>
    </div>
  )
}
