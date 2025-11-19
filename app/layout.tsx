import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Suspense } from "react"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/Chatbot"
// 1. Import the ThemeProvider
import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Health Guard Pharmacy | Pharmaceutical services to Queens, NY",
  description: "Est. September 2010. Delivery available to all 5 boroughs. We speak Spanish, Mandarin & Cantonese.",
  generator: "Jaylin Man",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // 2. Add suppressHydrationWarning to html
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} antialiased`}>
        
        {/* 3. Wrap everything inside ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            {children}
          </Suspense>
          <Footer />
          <Chatbot />
          <Analytics />
        </ThemeProvider>
        
      </body>
    </html>
  )
}