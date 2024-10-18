import { Poppins } from "next/font/google";
import React from "react";
import "./globals.css";
import TopNav from "./components/topnav";
import NextWebVitals from "nextlevelpackage";
import Script from 'next/script';

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
      <html lang="en" >
        <head>
          <Script src="https://code.jscharting.com/latest/jscharting.js"></Script>
          <Script type="text/javascript" src="https://code.jscharting.com/latest/modules/types.js"></Script>
        </head>
        <body className={ poppins.className }>
          <SessionWrapper>
            <TopNav />
            {children}
          </SessionWrapper>
        </body>
      </html>
  );
}
