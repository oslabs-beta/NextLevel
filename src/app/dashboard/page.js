'use client';

import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import WebVitalsContainer from './components/WebVitalsContainer';
import APIKey from './components/APIkey';
import BuildTimeContainer from './components/buildtimecontainer';
import withAuth from '../components/withAuth';
import SideBar from './components/sidebar';

function Dashboard(props) {
  console.log('Props:', props);
  const username = props.searchParams.username;
  console.log('Username:', username);
  //hard coded dates for now
  const startDate = '2024-07-18T14:35:50'; // July 18, 2024, at 14:35:50
  const endDate = '2024-07-19T12:45:00'; // July 19, 2024, at 11:45:00
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
        <WebVitalsContainer username={username}/>
        <BuildTimeContainer username={username}/>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);

