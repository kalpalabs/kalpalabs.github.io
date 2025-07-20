import type { Metadata } from 'next'
import './globals.css'
import { theme } from '@/lib/theme'

export const metadata: Metadata = {
  title: 'Kalpa Labs',
  description: 'Kalpa Labs - Duplex Conversational AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: theme.colors.background }}>
        {children}
      </body>
    </html>
  )
}
