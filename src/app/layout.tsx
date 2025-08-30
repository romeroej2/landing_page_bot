import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Landing Page Template',
  description: 'A beautiful, modern landing page template built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}