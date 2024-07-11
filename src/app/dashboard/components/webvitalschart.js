'use client';

import React, { useEffect, useState } from 'react';
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
import useWebVitalsData from '../hooks/useWebVitalsData'

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


function WebVitalsChart({ data }) {

  const chartData = {
    labels: data.map(entry => new Date(entry.timestamp)),
    datasets: [
      {
        label: 'Time to First Byte (ms)',
        data: data.map(entry => entry.ttfb),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Largest Contentful Paint (ms)',
        data: data.map(entry => entry.lcp),
        fill: false,
        borderColor: 'rgb(199,235,185)',
        tension: 0.1,
      },
      {
        label: 'First Contentful Paint (ms)',
        data: data.map(entry => entry.fcp),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'First Input Delay (ms)',
        data: data.map(entry => entry.fid),
        fill: false,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
      {
        label: 'Interaction to Next Paint (ms)',
        data: data.map(entry => entry.inp),
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
        ticks: {
          source: 'data', // Ensures only data points are used for ticks
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
        // text: 'Web Vitals Over Time',
      },
    },
  };
  
  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Web Vitals</h2>
      {/* <ul>
        adding fake data to test
        {allData.map(webVital => <li key={webVital.id}> {webVital.title} </li>)}
      </ul> */}
      <div className={styles.chart}> 
        <Line data={chartData} options={options} />
       {/* {children} */}
      </div>
    </div>
  );
}

export default WebVitalsChart;