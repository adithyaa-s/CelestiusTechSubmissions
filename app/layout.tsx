import './globals.css'
import { Inter } from 'next/font/google'
import { GeistSans, GeistMono } from '@geist-ui/react'

const inter = Inter({ subsets: ['latin'] })
const geistSans = GeistSans()
const geistMono = GeistMono()

export const metadata = {
  title: 'Student Project Submission',
  description: 'Submit your project details',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
          {children}
        </div>
      </body>
    </html>
  );
}

