import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaunchPad AI – Your Business Idea, Coded in 60 Seconds",
  description:
    "Describe your vision in plain English. LaunchPad AI architects the database, writes the code, and deploys your fully-functional SaaS instantly.",
  keywords: ["AI SaaS builder", "no-code", "app generator", "startup", "AI coding"],
  openGraph: {
    title: "LaunchPad AI – Your Business Idea, Coded in 60 Seconds",
    description:
      "Describe your vision in plain English. LaunchPad AI architects the database, writes the code, and deploys your fully-functional SaaS instantly.",
    url: "https://launchpad-ai.com",
    siteName: "LaunchPad AI",
    images: [{ url: "https://launchpad-ai.com/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchPad AI",
    description: "Your Business Idea, Coded in 60 Seconds.",
    images: ["https://launchpad-ai.com/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://launchpad-ai.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LaunchPad AI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "AI-powered SaaS builder that turns your business idea into a fully deployed application in 60 seconds.",
  url: "https://launchpad-ai.com",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free Plan" },
    { "@type": "Offer", price: "49", priceCurrency: "USD", name: "Pro Plan" },
    { "@type": "Offer", price: "199", priceCurrency: "USD", name: "Enterprise Plan" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
