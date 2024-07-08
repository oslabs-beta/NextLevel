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
  // adding fake data to test
  // const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  // const allData = await res.json();

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
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
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
        text: 'Time to First Byte Over Time',
      },
    },
  };
  
  return (
    <div className={styles.chart}>
      <h2>Web Vitals Chart</h2>
      {/* <ul>
        adding fake data to test
        {allData.map(webVital => <li key={webVital.id}> {webVital.title} </li>)}
      </ul> */}
      <Line data={chartData} options={options} />
      {/* {children} */}
    </div>
  );
}

export default WebVitalsChart;