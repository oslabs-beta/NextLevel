import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import TopNav from "./components/topnav";
// import { WebVitals } from './_components/web-vitals';
// import { NextWebVitals } from "nextlevelpackage";

import SessionWrapper from './components/SessionWrapper'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Level",
  description: "A Next.js performance dashboard",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
      <TopNav />
      <body className={inter.className}>
        {children}
        </body>
    </html>
    </SessionWrapper>
    
  );
}
