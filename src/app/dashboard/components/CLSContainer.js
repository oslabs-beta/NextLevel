import React from 'react';
import styles from '../dashboard.module.css';
import CLSChart from './CLSChart.js';
//add ratings component

function CLSContainer({ username }) {
  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Build Time</h2>
      <div className={styles.buildCharts}>
        <CLSChart className={styles.buildTimeDiv} username={username}/>
        {/* add ratings component */}
      </div>
    </div>
  );
}

export default CLSContainer;