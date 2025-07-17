import { theme } from "@/lib/theme"

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-4xl mx-auto px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-serif mb-8" style={{ color: theme.colors.text }}>
            Blog
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: theme.colors.textMuted }}>
            Stay updated with the latest insights and developments from Kalpa Labs.
          </p>
        </div>
      </div>
    </div>
  )
}
