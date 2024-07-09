//index.js

'use client'

import { useReportWebVitals } from 'next/web-vitals'
 
export default function NextWebVitals() {
  useReportWebVitals((metric) => {
    if (!process.env.NEXT_PUBLIC_API_KEY) {
      console.log('API key not found in environment variables');
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const data = {...metric, apiKey};
    const body = JSON.stringify(data);
    const url = 'https://www.nextlevel-dash.com/dashboard/api'

    
    
    if(navigator.sendBeacon) {
      navigator.sendBeacon(url, body)
    } else {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': apiKey
        },
        body,
        keepalive: true
      })
    }
    // switch (metric.name) {
    //   case 'FCP': {
    //     console.log('FCP val:', metric.value);
        
    //     break;
    //   }
    //   case 'TTFB': {
    //     console.log('TTFB val:', metric.value);
    //     console.log('TTFB:', metric);
    //     break;
    //   }
    //   default: {
    //     break;
    //   }
    // }
  })
}