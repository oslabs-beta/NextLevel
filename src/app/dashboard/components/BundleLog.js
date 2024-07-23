import React, { useEffect, useState } from 'react';
import styles from '../dashboard.module.css';
import useBundleData from '../hooks/useBundleData';
import { set } from 'mongoose';


function BundleLog({username}) {
  console.log('entering build time metrics for username:', username);

  const [bundleLogs, setBundleLogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLog, setCurrentLog] = useState({});


  useEffect(() => {
    useBundleData(username)
    .then(logs => {
      // console.log('Bundle Logs:', logs);
      setBundleLogs(logs);
      return logs;
    }).then(logs => {
      // console.log('logs length ', logs.length)
      const logsLength = logs.length
      setCurrentIndex(logsLength - 1);
      // console.log('Current Index:', currentIndex);
      setCurrentLog(bundleLogs[currentIndex]);
      // console.log('Current Log:', currentLog);
    })
    .catch(error => {
      console.error('Error fetching bundle log:', error);
    });

  }, []);

  useEffect(() => {
    const logsLength = bundleLogs.length;
    setCurrentIndex(logsLength - 1);
    // console.log('Current Index:', currentIndex);
    setCurrentLog(bundleLogs[currentIndex]);
    // console.log('Current Log:', currentLog);
  }, [bundleLogs]);

  const toggleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentLog(bundleLogs[currentIndex - 1]);
    }
  }

  const toggleForward = () => {
    if (currentIndex < bundleLogs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentLog(bundleLogs[currentIndex + 1]);
    }
  }

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  if (!currentLog) {
    return <div>No logs available.</div>; // or handle accordingly
  }


  return (
    <div className={styles.bundleLogContainer}>
      <h3 className={styles.bundleLogTitle}>Bundle Logs</h3>
      <div className={styles.bundleToggleBox}>
        <div className={styles.bundleHeader}>
          <button className={styles.toggleButton} onClick={toggleBack} disabled={currentIndex === 0}>{`<`}</button> 
          {/* back doesn't work when index = 0, next doesnt work when index = length-1 */}
          <div>{formatDateTime(currentLog.bundleDate)}</div>
          <button className={styles.toggleButton} onClick={toggleForward} disabled={currentIndex === bundleLogs.length - 1}>{`>`}</button>
        </div>
        <div className={styles.bundleLog}>
          <pre>{currentLog.bundleLog}</pre>
        </div>
        
      </div>
    </div>
  );
}

export default BundleLog;