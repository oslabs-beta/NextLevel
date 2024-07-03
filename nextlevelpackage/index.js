//index.js

'use client'

import { useReportWebVitals } from 'next/web-vitals'
 
export default function NextWebVitals() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP': {
        console.log('FCP val:', metric.value);
        console.log('FCP:', metric);
        break;
      }
      case 'TTFB': {
        console.log('TTFB val:', metric.value);
        console.log('TTFB:', metric);
        break;
      }
      default: {
        break;
      }
    }
  })
}