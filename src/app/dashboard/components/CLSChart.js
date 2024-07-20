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

function CLSChart({ username, startDate, endDate }) {
  const [clsData, setClsData] = useState([]);
  const chartRef = useRef(null);

  // set end date to one day ago
  // const now = new Date();
  // const defaultEnd = now.toISOString().slice(0, 16);
  // const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  // const defaultStart = oneDayAgo.toISOString().slice(0, 16);

  // const [startDate, setStartDate] = useState(defaultStart);
  // const [endDate, setEndDate] = useState(defaultEnd);

  const onSubmit = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    useWebVitalsData(username, startDate, endDate)
      .then(data => {
        const filteredData = data.filter(entry => entry.metricType === 'CLS');
        setClsData(filteredData);
      })
      .catch(error => {
        console.error('Error fetching CLS data', error);
      });
  }, [username, startDate, endDate]);

  const chartData = {
    labels: clsData.map(entry => new Date(entry.metricDate)),
    datasets: [
      {
        label: 'Cumulative Layout Shift',
        data: clsData.map(entry => entry.metricValue),
        fill: false,
        borderColor: 'rgb(255,189,89)',
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
          tooltipFormat: 'MMM dd, yyyy HH:mm',
          displayFormats: {
            minute: 'MMM dd, yyyy HH:mm',
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
          text: 'CLS Value',
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
      link.download = 'cls-chart.png';
      link.click();
    }
  };

  return (
    <div>
      <div className={styles.webVitalsChart}>
        <Line data={chartData} options={options} ref={chartRef} />
      </div>
      <button onClick={downloadChart} id={styles.downloadCLS} className={styles.downloadButton}>Download</button>
    </div>
  );
}

export default CLSChart;