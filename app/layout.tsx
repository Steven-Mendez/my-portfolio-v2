import { Geist, Geist_Mono, Syne, Space_Grotesk } from "next/font/google"
import { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

/** Same as `.dark` `--background` in globals.css; paints before CSS/WebGL load. */
const rootBackground = "oklch(0.141 0.005 285.823)";

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
  metadataBase: new URL("https://stevenmendez.dev"),
  title: {
    default: "Steven Mendez | Mid-Level Backend & Gen AI Engineer",
    template: "%s | Steven Mendez",
  },
  description: "Mid-Level Backend Engineer specializing in Python, FastAPI, AWS, and Generative AI. Building scalable data pipelines and RAG architectures.",
  keywords: [
    "Backend Engineer",
    "Python Developer",
    "FastAPI",
    "AWS",
    "Gen AI",
    "LLMs",
    "RAG",
    "Data Pipelines",
    "Nicaragua Software Engineer",
    "Scalable APIs",
    "Cloud Infrastructure"
  ],
  authors: [{ name: "Steven Mendez", url: "https://stevenmendez.dev" }],
  creator: "Steven Mendez",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stevenmendez.dev",
    siteName: "Steven Mendez Portfolio",
    title: "Steven Mendez | Backend & Gen AI Engineer",
    description: "Explore the portfolio of Steven Mendez, building scalable APIs, cloud infrastructure, and AI-driven solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Steven Mendez - Backend & Gen AI Engineer Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steven Mendez | Backend & Gen AI Engineer",
    description: "Building scalable APIs and AI-driven solutions.",
    images: ["/og-image.png"],
    creator: "@Steven-Mendez",
    site: "@Steven-Mendez",
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
