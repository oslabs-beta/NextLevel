'use client';

import React from 'react';
import styles from './dashboard.module.css';
import WebVitalsChart from './components/webvitalschart';
import APIKey from './components/APIkey';
import BuildTimeContainer from './components/buildtimecontainer';
import useWebVitalsData from './hooks/useWebVitalsData';
import useBuildTimeData from './hooks/useBuildTimeData';

export default function Dashboard() {
  //add custom API key generation? 
  const userAPIKey = 'XVAOgIvvFHSEf_B5CpOiC';
  const webVitalsData = useWebVitalsData();
  const buildTimeData = useBuildTimeData();

  return (
  <>
    <APIKey api={userAPIKey} />
    <WebVitalsChart data={webVitalsData}/>
    <BuildTimeContainer data={buildTimeData}/>  
  </>
  );
}
