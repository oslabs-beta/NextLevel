'use client';

import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import WebVitalsChart from './components/webvitalschart';
import APIKey from './components/APIkey';
import BuildTimeContainer from './components/buildtimecontainer';
import withAuth from '../components/withAuth';
import SideBar from './components/sidebar';

function Dashboard(props) {
  console.log('Props:', props);
  const username = props.searchParams.username;
  console.log('Username:', username);
  // const webVitalsData = useWebVitalsData();

  // useEffect(() => {
  //   console.log('Dashboard component mounted');
  //   console.log('Web Vitals Data:', webVitalsData);

  //   return () => {
  //     console.log('Dashboard component unmounted');
  //   };
  // }, [webVitalsData]);

  return (
    <div className={styles.dashboardContainer}>
      <SideBar username={username}/>
      <div className={styles.mainContent}>
        <APIKey username={username} />
        <WebVitalsChart username={username} />
        <BuildTimeContainer username={username}/>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);

