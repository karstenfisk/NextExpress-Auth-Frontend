"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={josefinSans.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
