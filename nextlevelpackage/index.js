//index.js

function helloNpm() {
  return "hello NPM"
}

import { useReportWebVitals } from 'next/web-vitals'
 

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP': {
        // handle FCP results
      }
      case 'LCP': {
        // handle LCP results
      }
      // ...
    }
  })
 
  return <Component {...pageProps} />
}



module.exports = helloNpm