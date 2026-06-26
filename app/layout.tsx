import { Geist_Mono, Space_Grotesk } from "next/font/google"
import { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PortfolioChat } from "@/components/chat/portfolio-chat"
import { cn } from "@/lib/utils";
import { portfolioData } from "@/lib/data";

/** Same as `.dark` `--background` in globals.css; paints before CSS/WebGL load. */
const rootBackground = "#0e0e10";

// Two families only: Space Grotesk for all sans/display, Geist Mono for labels.
const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  // No maximumScale / user-scalable lock: users must be able to zoom (WCAG 1.4.4).
  width: "device-width",
  initialScale: 1,
  // App is forced-dark; advertise the actual painted background.
  themeColor: rootBackground,
};

export const metadata: Metadata = {
  metadataBase: new URL(portfolioData.seo.url),
  title: {
    default: portfolioData.seo.title,
    template: `%s | ${portfolioData.profile.fullName}`,
  },
  description: portfolioData.seo.description,
  keywords: portfolioData.seo.keywords,
  authors: [{ name: portfolioData.profile.fullName, url: portfolioData.seo.url }],
  creator: portfolioData.profile.fullName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: portfolioData.seo.locale,
    url: portfolioData.seo.url,
    siteName: portfolioData.seo.siteName,
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    images: [
      {
        url: portfolioData.seo.image,
        width: 1200,
        height: 630,
        alt: `${portfolioData.profile.fullName} - ${portfolioData.profile.role} Portfolio Preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    images: [portfolioData.seo.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark", "antialiased", "scroll-smooth", fontSans.variable, fontMono.variable, "font-sans")}
      style={{ backgroundColor: rootBackground }}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black focus:shadow-lg"
        >
          Skip to content
        </a>
        <div className="bg-grain" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <PortfolioChat />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
