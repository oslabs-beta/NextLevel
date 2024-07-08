'use client';

import React from 'react';
import styles from './dashboard.module.css';
import WebVitalsChart from './components/webvitalschart';
import APIKey from './components/APIkey';
import BuildTimeContainer from './components/buildtimecontainer';
import useTTFBData from './hooks/useTTFBData';

export default function Dashboard() {
  //add custom API key generation? 
  const userAPIKey = '1234567890';
  const ttfbData = useTTFBData();

  return (
  <>
    <APIKey api={userAPIKey} />
    <WebVitalsChart data={ttfbData}/>
    <BuildTimeContainer />  
  </>
  );
}
