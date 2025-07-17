import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Twitter, GraduationCap, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { theme } from "@/lib/theme"

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <main>
        {/* Hero Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-7xl font-serif leading-tight mb-8" style={{ color: theme.colors.text }}>
                A New Era
                <br />
                of Voice Agents
              </h1>
              <p className="text-xl mb-12 leading-relaxed" style={{ color: theme.colors.text }}>
                Real-time Voice Agents with millions of voices.
              </p>
              <Link href="/contactus">
                <Button
                  className="px-6 py-3 rounded-full text-white font-medium flex items-center space-x-2 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: theme.colors.button.primary, color: theme.colors.button.text }}
                >
                  <span>Talk to Us</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Decorative dots pattern */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-30">
              <div className="grid grid-cols-8 gap-3">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.decorative }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="about" className="py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-serif mb-4" style={{ color: theme.colors.text }}>
                Meet Our Team
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
              {/* Prashant Shishodia */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
                  <img
                    src="/pshishodia.jpeg?height=128&width=128"
                    alt="Prashant Shishodia"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.colors.text }}>
                  Prashant Shishodia
                </h3>
                <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>
                  CEO & Co-Founder
                </p>
                <div className="flex justify-center space-x-3 mb-6">
                  <Link
                    href="https://linkedin.com/in/pshishodia/"
                    className="transition-colors hover:opacity-70"
                    style={{ color: theme.colors.text }}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://x.com/pshishodiaa"
                    className="transition-colors hover:opacity-70"
                    style={{ color: theme.colors.text }}
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://scholar.google.com/citations?user=CKQd3XAAAAAJ"
                    className="transition-colors hover:opacity-70"
                    style={{ color: theme.colors.text }}
                  >
                    <GraduationCap className="h-4 w-4" />
                  </Link>
                  <Link
                    href="mailto:prashant.cse.iitkgp@gmail.com"
                    className="transition-colors hover:opacity-70"
                    style={{ color: theme.colors.text }}
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                  Full Stack ML & Serving Efficiency @ Google Assistant, improving user-experience with Gemini models.
                </p>
              </div>

              {/* Ashish Agarwal */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
                  <img
                    src="/ashish.jpg?height=128&width=128"
                    alt="Ashish Agarwal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.colors.text }}>
                  Ashish Agarwal
                </h3>
                <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>
                  Co-Founder
                </p>
                <div className="flex justify-center space-x-3 mb-6">
                  <Link
                    href="https://www.linkedin.com/in/ashish-2000"
                    className="transition-colors hover:opacity-70"
                    style={{ color: theme.colors.text }}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="mailto:ashish01012000@gmail.com"
                    className="transition-colors hover:opacity-70"
                    style={{ color: theme.colors.text }}
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                  AI-native features @ Quizizz, Ex-Sprinklr
                </p>
              </div>

              {/* Gautam Jha */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
                  <img
                    src="/gautam.jpg?height=128&width=128"
                    alt="Gautam Jha"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.colors.text }}>
                  Gautam Jha
                </h3>
                <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>
                  Co-Founder
                </p>
                <div className="flex justify-center space-x-3 mb-6">
                  <Link
                    href="https://www.linkedin.com/in/gautam-jha-790a7216a/"
                    className="transition-colors hover:opacity-70"
                    style={{ color: theme.colors.text }}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="mailto:gauti.jha37@gmail.com"
                    className="transition-colors hover:opacity-70"
                    style={{ color: theme.colors.text }}
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
                  sub-microseconds low-latency sytems at HFTs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
