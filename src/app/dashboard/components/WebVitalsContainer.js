'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../dashboard.module.css';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale
// } from 'chart.js';
// import 'chartjs-adapter-date-fns';
import useWebVitalsData from '../hooks/useWebVitalsData';
import WebVitalsFilter from './webvitalsfilter';
import CLSChart from './CLSChart';
import WebVitalRatings from './WebVitalRatings';
import WebVitalsChart from './webvitalschart';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale
// );

function WebVitalsContainer({ username}) {
  const [webVitalsData, setWebVitalsData] = useState([]);
  const [clsData, setClsData] = useState([]);
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
      const filteredData = data.filter(entry => entry.metricType === 'CLS');
      setClsData(filteredData);
      return data;
    }).catch(error => {
    console.error('Error fetching web vitals', error);
    });
  }, [username, startDate, endDate]);

  // console.log('Web Vitals Data:', webVitalsData);
  
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h2 className={styles.chartTitle}>Web Vitals</h2>
        <WebVitalsFilter onSubmit={onSubmit} />
      </div>
      <div>
        <WebVitalsChart webVitalsData={webVitalsData}/>
      </div>
      <div className={styles.clsAndRatings}>
        <CLSChart clsData={clsData}/>
        <WebVitalRatings data={webVitalsData}/>
      </div>
    </div>
  );
}

export default WebVitalsContainer;

