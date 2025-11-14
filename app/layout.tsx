
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic"

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'THE HOUSE OF ARTS - Miami Digital Art Gallery',
  description: 'Miami-based digital art gallery representing emerging and established artists through strategic career development and digital representation.',
  keywords: ['art gallery', 'Miami', 'contemporary art', 'digital art', 'Wynwood', 'artists', 'exhibitions'],
  authors: [{ name: 'THE HOUSE OF ARTS' }],
  creator: 'THE HOUSE OF ARTS',
  publisher: 'THE HOUSE OF ARTS',
  openGraph: {
    title: 'THE HOUSE OF ARTS - Miami Digital Art Gallery',
    description: 'Miami-based digital art gallery representing emerging and established artists through strategic career development and digital representation.',
    url: '/',
    siteName: 'THE HOUSE OF ARTS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'THE HOUSE OF ARTS Miami Art Gallery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE HOUSE OF ARTS - Miami Digital Art Gallery',
    description: 'Miami-based digital art gallery representing emerging and established artists',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
