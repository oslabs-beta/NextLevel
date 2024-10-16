"use client";

import React from 'react';
import Step from './components/Step';
import styles from './Onboarding.module.css';
import NextButton from './components/NextButton';
import withAuth from '../components/withAuth';
import { useState, useEffect } from 'react';

const onboardingSteps = [
  {
    stepNumber: 1,
    title: "Install and Configure Next.js Bundle Analyzer",
    description: "NPM install Next.js Bundle Analyzer:",
    code: `npm install @next/bundle-analyzer`,
    language: "terminal",
    api: false,
  },
  {
    stepNumber: "",
    title: "",
    description: "Configure next.config.mjs file:",
    code: `import pkg from '@next/bundle-analyzer';
  const withBundleAnalyzer = pkg({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {};

export default withBundleAnalyzer(nextConfig);`,
    language: "next.config.mjs",
    api: false,
  },
  {
    stepNumber: 2,
    title: "Install and configure NextLevelPackage",
    description: "NPM Install NextLevelPackage:",
    code: `npm install nextlevelpackage`,
    language: "terminal",
    api: false,
  },
  {
    stepNumber: "",
    title: "",
    description: "Import NextLevelPackage in layout.js:",
    code: `import NextWebVitals from 'nextlevelpackage';`,
    language: "layout.js",
    api: false,
  },
  {
    stepNumber: "",
    title: "",
    description: "Add NextWebVitals component in RootLayout body:",
    code: `export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextWebVitals />
        {children}
      </body>
    </html>
  );
}`,
    language: "layout.js",
    api: false,
  },
  {
    stepNumber: 3,
    title: 'Configure Environment Variables',
    description: 'Add the following line to your .env.local file:',
    code: `NEXT_PUBLIC_API_KEY=<your-api-key>`,
    language: '.env.local',
    api: true,
  },
  {
    stepNumber: 4,
    title: "Add Build Script to package.json",
    description: "Add the following script to your package.json:",
    code: `"scripts": {
  "nextlevelbuild": "node ./node_modules/nextlevelpackage/cli.js"
}`,
    language: "terminal",
    api: false,
  },
  {
    stepNumber: '',
    title: '',
    description: 'Run this build script instead of \'npm next build\' to track metrics in the dashboard:',
    code: `npm run nextlevelbuild`,
    language: "terminal",
    api: false,
  },
];

 function Onboarding () {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const currentUrl = window.location.href;
    console.log('Current URL:', currentUrl);
    const url = new URL(currentUrl);
    const usernameFromUrl = url.searchParams.get('username');
    console.log('Username:', usernameFromUrl);
    setUsername(usernameFromUrl);
  }, []);

  if (!username) {
    return null; 
  }

  return (
    <div className={styles.onboardingContainer}>
      <h1 className={styles.onboardingTitle}>
        NextLevel Onboarding Instructions
      </h1>
      {onboardingSteps.map((step, index) => (
        <Step
          key={index}
          className={styles.step}
          stepNumber={step.stepNumber}
          title={step.title}
          description={step.description}
          code={step.code}
          language={step.language}
          api={step.api}
          username={username}
        />
      ))}
      <NextButton username={username}/>
    </div>
  );
};

export default withAuth(Onboarding);
