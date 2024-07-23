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
  const chartRef = useRef(null);
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

  // console.log('Build Time Data:', buildTimeData);

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
      link.download = 'build-time-chart.png';
      link.click();
    }
  };

  return (
    <div className={styles.buildTimeDiv}>
      <div className={styles.buildTimeChart}>
        <Line data={chartData} options={options} ref={chartRef}/>
      </div>
      <button onClick={downloadChart} id={styles.downloadBuildTime} className={styles.downloadButton}>Download</button>
    </div>
  );
}

export default BuildTimeChart;
