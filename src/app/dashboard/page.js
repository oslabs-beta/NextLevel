'use client';

import React, { useEffect } from 'react';
import styles from './dashboard.module.css';
import WebVitalsChart from './components/webvitalschart';
import APIKey from './components/APIkey';
import BuildTimeContainer from './components/buildtimecontainer';
import useWebVitalsData from './hooks/useWebVitalsData';
import useBuildTimeData from './hooks/useBuildTimeData';
import withAuth from '../components/withAuth';

function Dashboard() {
  // Add custom API key generation?
  const userAPIKey = 'XVAOgIvvFHSEf_B5CpOiC';
  const webVitalsData = useWebVitalsData();
  const buildTimeData = useBuildTimeData();

  useEffect(() => {
    console.log('Dashboard component mounted');
    console.log('API Key:', userAPIKey);
    console.log('Web Vitals Data:', webVitalsData);
    console.log('Build Time Data:', buildTimeData);

    return () => {
      console.log('Dashboard component unmounted');
    };
  }, [userAPIKey, webVitalsData, buildTimeData]);

  return (
    <>
      <APIKey api={userAPIKey} />
      <WebVitalsChart data={webVitalsData} />
      <BuildTimeContainer data={buildTimeData} />
    </>
  );
}

export default withAuth(Dashboard);

