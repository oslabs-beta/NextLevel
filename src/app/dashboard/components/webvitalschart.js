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

function WebVitalsChart({ webVitalsData }) {
    const chartRef = useRef(null);
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
    <div>
      <div> 
        <Line data={chartData} options={options} ref={chartRef}/>
      </div>
      <button onClick={downloadChart} id={styles.downloadWebVitals} className={styles.downloadButton}>
        Download
      </button>
    </div>
  );
}

export default WebVitalsChart;