import type { Metadata } from "next";
import { Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PC Finder - Recomendador de productos",
  description:
    "Encuentra el computador perfecto para ti. Laptops, Desktops y All-in-One recomendados por nuestro algoritmo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${urbanist.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="relative min-h-screen w-full flex flex-col font-sans">
          {children}
        </main>
      </body>
    </html>
  );
}
