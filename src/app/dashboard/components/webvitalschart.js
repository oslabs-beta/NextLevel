'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../dashboard.module.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import useWebVitalsData from '../hooks/useWebVitalsData';
import WebVitalsFilter from './webvitalsfilter';
import CLSChart from './CLSChart';
import WebVitalRatings from './WebVitalRatings';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

function WebVitalsChart({ username}) {
  const [webVitalsData, setWebVitalsData] = useState([]);
  const chartRef = useRef(null);
  // set end date to one day ago
  // set start date to now
  const now = new Date();
  const defaultEnd = now.toISOString().slice(0, 16);
  const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  const defaultStart = oneDayAgo.toISOString().slice(0, 16); // format to 'YYYY-MM-DDTHH:MM'

  const [startDate, setStartDate] = useState(defaultStart); // July 18, 2024, at 14:35:50 '2024-07-18T14:35:50'
  const [endDate, setEndDate] = useState(defaultEnd); // July 19, 2024, at 11:45:00 '2024-07-19T12:45:00'

  const onSubmit = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    useWebVitalsData(username, startDate, endDate)
    .then(data => {
      setWebVitalsData(data);
      return data;
    }).catch(error => {
    console.error('Error fetching web vitals', error);
    });
  }, [username, startDate, endDate]);

console.log('Web Vitals Data:', webVitalsData);

  const chartData = {
    labels: webVitalsData.map(entry => new Date(entry.metricDate)),
    datasets: [
      {
        label: 'Time to First Byte (ms)',
        data: webVitalsData.map(entry => {
          if (entry.metricType === 'TTFB') {
            return entry.metricValue;
          } else {
            return null;
          }
        }),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Largest Contentful Paint (ms)',
        data: webVitalsData.map(entry => {
          if (entry.metricType === 'LCP') {
            return entry.metricValue;
          } else {
            return null;
          }
        }),
        fill: false,
        borderColor: 'rgb(199,235,185)',
        tension: 0.1,
      },
      {
        label: 'First Contentful Paint (ms)',
        data: webVitalsData.map(entry => {
          if (entry.metricType === 'FCP') {
            return entry.metricValue;
          } else {
            return null;
          }
        }),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'First Input Delay (ms)',
        data: webVitalsData.map(entry => {
          if (entry.metricType === 'FID') {
            return entry.metricValue;
          } else {
            return null;
          }
        }),
        fill: false,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
      {
        label: 'Interaction to Next Paint (ms)',
        data: webVitalsData.map(entry => {
          if (entry.metricType === 'INP') {
            return entry.metricValue;
          } else {
            return null;
          }
        }),
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'MMM dd, yyyy HH:mm', // Format the tooltip
          displayFormats: {
            minute: 'MMM dd, yyyy HH:mm', // Format for the x-axis labels
          },
        },
        title: {
          display: true,
          text: 'Date/Time',
        },
        // ticks: {
        //   source: 'data', // Ensures only data points are used for ticks
        // },
      },
      y: {
        title: {
          display: true,
          text: 'Speed (ms)',
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  const downloadChart = () => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      const link = document.createElement('a');
      link.href = chartInstance.toBase64Image();
      link.download = 'web-vitals-chart.png';
      link.click();
    }
  };
  
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h2 className={styles.chartTitle}>Web Vitals</h2>
        <WebVitalsFilter onSubmit={onSubmit} />
      </div>
      {/* <ul>
        adding fake data to test
        {allData.map(webVital => <li key={webVital.id}> {webVital.title} </li>)}
      </ul> */}
      <div className={styles.webVitalsChart}> 
        <Line data={chartData} options={options} ref={chartRef}/>
       {/* {children} */}
      </div>
      <button onClick={downloadChart} id={styles.downloadWebVitals} className={styles.downloadButton}>Download</button>
      <div>
        <CLSChart username={username} startDate={startDate} endDate={endDate}/>
        <WebVitalRatings data={webVitalsData}/>
      </div>
    </div>
  );
}

export default WebVitalsChart;

