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
import useBuildTimeData from '../hooks/useBuildTimeData';

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


function BuildTimeChart({ username }) {
  const [buildTimeData, setBuildTimeData] = useState([]);
  useEffect(() => {
    useBuildTimeData(username)
    .then(data => {
      // console.log('Bundle Logs:', logs);
      setBuildTimeData(data);
      return data;
    }).catch(error => {
      console.error('Error fetching build time:', error);
    });
  }, []);

  console.log('Build Time Data:', buildTimeData);

  const chartData = {
    labels: buildTimeData.map(entry => new Date(entry.buildDate)),
    datasets: [
      {
        label: 'Build Time',
        data: buildTimeData.map(entry => entry.buildTime),
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

      },
    },
  };

  return (
    <div className={styles.chart}>

      <Line data={chartData} options={options} />

    </div>
  );
}

export default BuildTimeChart;