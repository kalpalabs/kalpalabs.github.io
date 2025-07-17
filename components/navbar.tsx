import Link from "next/link"
import { theme } from "@/lib/theme"

export function Navbar() {
  return (
    <header className="py-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <img src="/logo.svg?height=128&width=128" alt="Kalpa Labs Logo" className="" />
            </div>
            <span className="text-lg font-medium" style={{ color: theme.colors.header.logo }}>
              KALPA LABS
            </span>
          </div>

          <nav className="flex items-center space-x-12">
            <Link
              href="/#about"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: theme.colors.header.text }}
            >
              About
            </Link>
            <Link
              href="/contactus"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: theme.colors.header.text }}
            >
              Contact Us
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: theme.colors.header.text }}
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
