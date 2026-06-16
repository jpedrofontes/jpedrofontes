import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "João Pedro Fontes — R&D Engineer & AI Researcher",
  description:
    "Personal website of João Pedro Fontes — R&D Engineer and AI Researcher specialising in Machine Learning, Computer Vision, and Backend Development.",
  keywords: [
    "João Pedro Fontes",
    "AI Researcher",
    "R&D Engineer",
    "Machine Learning",
    "Computer Vision",
    "Backend Development",
    "Python",
    "PyTorch",
  ],
  authors: [{ name: "João Pedro Fontes", url: "https://jpedrofontes.com" }],
  openGraph: {
    title: "João Pedro Fontes — R&D Engineer & AI Researcher",
    description:
      "Personal website of João Pedro Fontes — R&D Engineer and AI Researcher.",
    url: "https://jpedrofontes.com",
    siteName: "jpedrofontes.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
