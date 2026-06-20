import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import GlobalChatbot from '@/components/global-chatbot'

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Radar T — Conexión Productiva Local (Piloto 2026)',
  description: 'Plataforma de productividad local que conecta organizaciones con estudiantes para pasantías transformadoras en comunidades en transición económica.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${nunito.className} antialiased min-h-screen pt-2 pb-16`}>
        {/* TOP RAINBOW BAR */}
        <div className="rainbow-bar h-2 w-full fixed top-0 left-0 right-0 z-50"></div>
        {children}
        <GlobalChatbot />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}


