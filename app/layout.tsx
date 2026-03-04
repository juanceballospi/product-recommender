import type { Metadata } from "next";
import { Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import { LaptopMinimalCheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Recomendador de productos",
  description: "Recomendador de productos",
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
        <main className="relative min-h-screen w-full flex flex-col gap-3 bg-mist-50 font-sans dark:bg-black p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
