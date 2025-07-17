import Link from "next/link"
import { theme } from "@/lib/theme"

export function Footer() {
  return (
    <footer
      className="py-12 border-t"
      style={{
        borderColor: theme.colors.footer.border,
        borderOpacity: theme.opacity.heavy,
      }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="font-medium" style={{ color: theme.colors.footer.text }}>
              Kalpa Labs
            </span>
          </div>
          <div className="flex space-x-8">
            <Link
              href="/#about"
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: theme.colors.footer.text }}
            >
              About
            </Link>
            <Link
              href="/contactus"
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: theme.colors.footer.text }}
            >
              Contact Us
            </Link>
            <Link
              href="/blog"
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: theme.colors.footer.text }}
            >
              Blog
            </Link>
          </div>
        </div>
        <div
          className="text-center mt-8 pt-8 border-t"
          style={{
            borderColor: theme.colors.footer.border,
            borderOpacity: theme.opacity.heavy,
          }}
        >
          <p className="text-sm opacity-70" style={{ color: theme.colors.footer.text }}>
            &copy; {new Date().getFullYear()} Kalpa Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
