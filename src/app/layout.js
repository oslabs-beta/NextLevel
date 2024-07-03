import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
// import { WebVitals } from './_components/web-vitals';
// import { NextWebVitals } from "nextlevelpackage";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nex Level",
  description: "A Next.js performance dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
