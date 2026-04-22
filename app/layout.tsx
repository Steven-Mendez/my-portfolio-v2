import { Geist, Geist_Mono, Syne, Space_Grotesk } from "next/font/google"
import { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { portfolioData } from "@/lib/data";

/** Same as `.dark` `--background` in globals.css; paints before CSS/WebGL load. */
const rootBackground = "#0e0e10";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
    creator: portfolioData.seo.twitterHandle,
    site: portfolioData.seo.twitterHandle,
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
      className={cn("dark", "antialiased", "scroll-smooth", fontMono.variable, fontDisplay.variable, spaceGrotesk.variable, "font-sans", geist.variable)}
      style={{ backgroundColor: rootBackground }}
    >
      <body>
        <div className="bg-grain" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
