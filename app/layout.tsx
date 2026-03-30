import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Growtoro — AI-Powered Lead Generation Command Center",
  description:
    "AI-driven outreach systems that find your ideal customers and fill your calendar. Cold email, LinkedIn DMs, AI voice, social campaigns — all from one command center.",
  openGraph: {
    title: "Growtoro — AI-Powered Lead Generation Command Center",
    description:
      "AI-driven outreach systems that find your ideal customers and fill your calendar. Cold email, LinkedIn DMs, AI voice, social campaigns — all from one command center.",
    images: ["/images/hero-bg.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growtoro — AI-Powered Lead Generation Command Center",
    description:
      "AI-driven outreach systems that find your ideal customers and fill your calendar.",
    images: ["/images/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Growtoro",
              url: "https://growtoro.com",
              description:
                "AI-powered lead generation agency specializing in cold email, LinkedIn DMs, AI voice, and social campaigns.",
              founder: {
                "@type": "Person",
                name: "Brendan Ward",
                jobTitle: "Founder & CEO",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
