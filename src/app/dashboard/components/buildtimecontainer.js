import React from 'react';
import styles from '../dashboard.module.css';
import BuildTimeChart from './buildtimechart';
import BuildTimeMetrics from './buildtimemetrics';

function BuildTimeContainer() {
  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Build Time Container</h2>
      <BuildTimeChart />
      <BuildTimeMetrics />
    </div>
  );
}

export default BuildTimeContainer;