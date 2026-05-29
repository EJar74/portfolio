import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://elijaramillo.com";
const TITLE = "Eli Jaramillo · Software Engineer";
const DESCRIPTION =
  "Software engineer and project lead. On my own time I built and run Siliconian Showdown, a real-time multiplayer game with 1,300+ players, 86,000 lines of code, and a 3-tier distributed backend. Built solo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Eli Jaramillo",
  authors: [{ name: "Eli Jaramillo" }],
  keywords: [
    "Eli Jaramillo",
    "Software Engineer",
    "Product Manager",
    "Siliconian Showdown",
    "distributed systems",
    "real-time multiplayer",
    "Next.js",
    "Node.js",
    "Python",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Eli Jaramillo",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans bg-stage antialiased">{children}</body>
    </html>
  );
}
