import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google"; // Using fonts defined in globals.css variables
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethercraft Guild | Master Digital Craftsmanship",
  description:
    "Ethercraft Guild is an elite engineering collective providing high-performance Flutter mobile apps, scalable Node.js backends, and AI-driven operational automation for high-growth startups.",
  keywords: [
    "Software Engineering",
    "Technical Architecture",
    "Flutter Development",
    "SaaS Scaleup",
    "AI Automation",
    "Node.js Architects",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${spaceMono.variable}`}>
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
