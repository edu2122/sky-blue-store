import type { Metadata } from 'next'
import { Inter, Playfair_Display, Geist } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap'
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sky-blue-store.vercel.app'

export const metadata: Metadata = {
  title: 'Sky Blue Shop VE | Camisetas de Futbol',
  description: 'Camisetas oficiales del Mundial 2026 con envio rapido.',
  metadataBase: new URL(siteUrl),
  applicationName: 'Sky Blue Shop VE',
  category: 'Ecommerce',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Sky Blue Shop VE | Camisetas de Futbol',
    description: 'Camisetas oficiales del Mundial 2026 con envio rapido.',
    url: siteUrl,
    siteName: 'Sky Blue Shop VE',
    locale: 'es_VE',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sky Blue Shop VE | Camisetas de Futbol',
    description: 'Camisetas oficiales del Mundial 2026 con envio rapido.'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={cn(
        'h-full',
        'antialiased',
        inter.variable,
        playfair.variable,
        'font-sans',
        geist.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
