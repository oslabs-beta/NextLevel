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
    const data = {
      "metricType": metric.name,
      "metricValue": metric.value, 
      apiKey};
    console.log('Web vitals data:', data);
    const body = JSON.stringify(data);
    const url = 'https://www.nextlevel-dash.com/dashboard/api/webvitals';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        keepalive: true
      }).then((res) => {
        if (res.ok) {
          console.log('Web vitals data sent successfully');
        } else {
          console.error('index.js .then error Error sending web vitals data:', res.statusText);
        }
      }).catch((error) => {
        console.error('index.js .catch error Error sending web vitals data:', error);
      })
  })
}