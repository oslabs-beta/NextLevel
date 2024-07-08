import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import TopNav from "./components/topnav";
// import { WebVitals } from './_components/web-vitals';
// import { NextWebVitals } from "nextlevelpackage";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Level",
  description: "A Next.js performance dashboard",
};

export default function RootLayout({ children, userLoggedIn, handleLogout }) {
  return (
    <html lang="en">
      <TopNav userLoggedIn={userLoggedIn} handleLogout={handleLogout} />
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
