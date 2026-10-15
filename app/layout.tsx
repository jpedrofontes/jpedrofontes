import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "João Pedro Fontes — Senior Backend Engineer",
  description:
    "João Pedro Fontes, Senior Backend Engineer at Loka and Ph.D. in Information Systems and Technology. Python, FastAPI, cloud systems, and applied AI research.",
  keywords: [
    "João Pedro Fontes",
    "AI Researcher",
    "R&D Engineer",
    "Machine Learning",
    "Computer Vision",
    "Backend Development",
    "Senior Backend Engineer",
    "Python",
    "PyTorch",
  ],
  authors: [{ name: "João Pedro Fontes", url: "https://jpedrofontes.com" }],
  openGraph: {
    title: "João Pedro Fontes — Senior Backend Engineer",
    description:
      "Senior Backend Engineer at Loka with a Ph.D. in Information Systems and Technology, specialising in Python backend systems and applied AI research.",
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
