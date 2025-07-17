import Link from "next/link"
import { theme } from "@/lib/theme"

export function Footer() {
  return (
    <footer
      className="py-12"
      style={{
        borderColor: theme.colors.footer.border,
        borderOpacity: theme.opacity.heavy,
      }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-end">
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
