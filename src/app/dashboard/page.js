'use client';

import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import WebVitalsContainer from './components/WebVitalsContainer';
import APIKey from './components/APIkey';
import BuildTimeContainer from './components/BuildTimeContainer';
import withAuth from '../components/withAuth';
import SideBar from './components/Sidebar';

function Dashboard(props) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const currentUrl = window.location.href;
    console.log('Current URL:', currentUrl);
    const url = new URL(currentUrl);
    const usernameFromUrl = url.searchParams.get('username');
    console.log('Username:', usernameFromUrl);
    setUsername(usernameFromUrl);
  }, []);

  if (!username) {
    return null; 
  }
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


