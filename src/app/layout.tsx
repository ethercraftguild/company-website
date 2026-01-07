import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google"; // Using fonts defined in globals.css variables
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  description: "Your dedicated guild of globally-vetted specialists in Software Development, Digital Growth, and Strategic Operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
