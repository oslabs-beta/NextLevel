import React from 'react';
import styles from './dashboard.module.css';
import SideBar from './components/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardContainer}>
      <SideBar />
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}