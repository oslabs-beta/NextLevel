import { Poppins } from "@next/font/google";
import React from "react";
import "./globals.css";
import TopNav from "./components/topnav";

import SessionWrapper from './components/SessionWrapper'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '400', '600'],
  style: ['normal', 'italic']
})

export const metadata = {
  title: "NextLevel",
  description: "A Next.js performance dashboard",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en" >
        <body className={ poppins.className }>
          <TopNav />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
