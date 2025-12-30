import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_Mono({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Basic Terminal",
  description: "Website demo untuk tugas besar mata kuliah Analisis Kompleksitas Algoritma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${noto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
