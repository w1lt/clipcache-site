import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClipCache - Multi-Item Clipboard Manager for macOS',
  description: 'A lightweight macOS menu bar app that lets you copy multiple images and text snippets, then paste them all at once with a single keyboard shortcut.',
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicons/icon-192-maskable.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicons/icon-512-maskable.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}

