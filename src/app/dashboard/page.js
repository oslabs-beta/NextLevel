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

