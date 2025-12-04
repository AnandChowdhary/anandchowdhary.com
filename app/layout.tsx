import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anand Chowdhary",
  description:
    "Anand Chowdhary is a technology entrepreneur, engineer, and designer from New Delhi, India, living in Utrecht, the Netherlands. He previously founded FirstQuadrant, an AI sales platform funded by Y Combinator.",
  metadataBase: new URL("https://anandchowdhary.com"),
  authors: [{ name: "Anand Chowdhary", url: "https://anandchowdhary.com" }],
  creator: "Anand Chowdhary",
  publisher: "Anand Chowdhary",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anandchowdhary.com",
    siteName: "Anand Chowdhary",
    title: "Anand Chowdhary",
    description:
      "Anand Chowdhary is a technology entrepreneur, engineer, and designer from New Delhi, India, living in Utrecht, the Netherlands. He previously founded FirstQuadrant, an AI sales platform funded by Y Combinator.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anand Chowdhary",
    description:
      "Anand Chowdhary is a technology entrepreneur, engineer, and designer from New Delhi, India, living in Utrecht, the Netherlands. He previously founded FirstQuadrant, an AI sales platform funded by Y Combinator.",
    creator: "@AnandChowdhary",
    site: "@AnandChowdhary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-neutral-500/20`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
