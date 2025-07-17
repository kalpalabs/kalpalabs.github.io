import Link from "next/link"
import { theme } from "@/lib/theme"

export function Navbar() {
  return (
    <header className="py-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group" style={{ textDecoration: "none" }}>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              // style={{ backgroundColor: theme.colors.primary }}
            >
              <img src="/logo.svg" alt="Kalpa Labs Logo" className="" />
            </div>
            <span className="text-lg font-medium group-hover:opacity-80 transition-opacity" style={{ color: theme.colors.header.logo }}>
              KALPA LABS
            </span>
          </Link>

          <nav className="flex items-center space-x-6">
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
          </nav>
        </div>
      </div>
    </header>
  )
}
