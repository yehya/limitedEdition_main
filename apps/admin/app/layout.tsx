import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Limited Edition Admin',
  description: 'Admin panel for Limited Edition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
