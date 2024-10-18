## Getting Started

1. To get started, visit nextlevel-dash.com and create an account. After account creation, you will be navigated to an onboardingp page which will direct you to complete the below steps.

2. Install configure next.js bundle analyzer in your Next.js application

    NPM install Next.js Bundle Analyzer:
    ```bash
    npm install @next/bundle-analyzer
    ```

    Configure next.config.mjs file:
    ```bash
    import pkg from '@next/bundle-analyzer';
    const withBundleAnalyzer = pkg({
        enabled: process.env.ANALYZE === 'true',
    });

    const nextConfig = {};

    export default withBundleAnalyzer(nextConfig);
    ```

3. Install and configure our npm package, NextLevelPackage, through the terminal. It can also be found [here](https://www.npmjs.com/package/nextlevelpackage).

    NPM Install NextLevelPackage:
    ```bash
    npm install nextlevelpackage
    ```

    Import NextLevelPackage in layout.js:
    ```bash
    import NextWebVitals from 'nextlevelpackage';
    ```

    Add NextWebVitals component in RootLayout body:
    ```bash
    export default function RootLayout({ children }) {
        return (
            <html lang="en">
            <body>
                <NextWebVitals />
                {children}
            </body>
            </html>
        );
    }
    ```

4. Configure yoour Environmental Variables

    Add the following line to your .env.local file:
    ```bash
    NEXT_PUBLIC_API_KEY=<your-api-key>
    ```
    When you create an account, the setup page will provide you with your API key.

5.  Add Build Script to package.json

    Add the following script to your package.json:
    ```bash
    "scripts": {
        "nextlevelbuild": "node ./node_modules/nextlevelpackage/cli.js"
    }
    ```

    Run this build script instead of 'npm next build' to track metrics in the dashboard:
    ```bash
    npm run nextlevelbuild
    ```

6. Navitage to your NextLevel dashboard to view tracked metrics!

## Tracked Metrics

Metrics displayed on the page include:

- Time to First Byte:
  - measures the time taken from a user's request to the first byte of data received from the server, indicating server responsiveness.
- Largest Contentful Paint:
  - gauges the time it takes for the largest visible content element on a webpage to load, impacting user perception of loading speed.
- First Contentful Paint:
  - tracks the time from page load to when the first piece of content is rendered on the screen, marking the start of the visual loading process.
- First Input Delay:
  - measures the delay between the user's first interaction with the page and the browser's response, reflecting input responsiveness.
- Interaction to Next Paint:
  - evaluates the time from user interaction to the next visual update, assessing how quickly a page responds to user inputs.
- Cumulative Layout Shift:
  - quantifies the total of all individual layout shifts that occur during the entire lifespan of the page, indicating visual stability.
- Build Time:
  - refers to the duration taken to compile and bundle code and assets into a deployable format during the development process.
- Bundle Size:
  - denotes the total size of all the compiled assets sent to the client, affecting load times and overall performance.