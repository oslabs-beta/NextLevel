import React from 'react';
import styles from './dashboard.module.css';
import SideBar from './components/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardContainer}>
      <SideBar />
      <div className={styles.mainContent}>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>
        {children}
      </div>
    </div>
  );
}