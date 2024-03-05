import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mindotion',
  description: 'A Notion plugin to use notion pages as a mind map',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} h-screen`} suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
