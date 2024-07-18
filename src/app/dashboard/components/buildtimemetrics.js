import React, { useEffect, useState } from 'react';
import styles from '../dashboard.module.css';
import useBundleData from '../hooks/useBundleData';
import { set } from 'mongoose';


function BuildTimeMetrics({username}) {
  console.log('entering build time metrics for username:', username);
  // const bundleLogs = useBundleData(username);
  // console.log('Bundle Logs:', bundleLogs);

  // const [bundleLogs, setBundleLogs] = useState('');
  // useEffect(() => {
  //   setBundleLogs(useBundleData(username));
  //   console.log('Bundle Logs:', bundleLogs);
  // }, []);

  //new
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
      console.log('logs length ', logs.length)
      const logsLength = logs.length
      setCurrentIndex(logsLength - 1);
      console.log('Current Index:', currentIndex);
      setCurrentLog(bundleLogs[currentIndex]);
      console.log('Current Log:', currentLog);
    })
    .catch(error => {
      console.error('Error fetching bundle log:', error);
    });

    // console.log('Fetching bundle logs for:', username);
    // const fetchData = async () => {
    //   const logs = await useBundleData(username); // Assuming useBundleData fetches logs asynchronously
    //   console.log('Bundle Logs:', logs);
    //   setBundleLogs(logs);
    //   setCurrentLog(bundleLogs[bundleLogs.length - 1]);
    //   console.log('Current Log:', currentLog);
    // };

    // fetchData();
  }, []);

  useEffect(() => {
    const logsLength = bundleLogs.length;
    setCurrentIndex(logsLength - 1);
    console.log('Current Index:', currentIndex);
    setCurrentLog(bundleLogs[currentIndex]);
    console.log('Current Log:', currentLog);
  }, [bundleLogs]);

  // const currentLog = bundleLogs[currentIndex];

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

  // // Guard against rendering when bundleLogs is empty or currentIndex is out of bounds
  // if (bundleLogs.length === 0) {
  //   return <div>Loading...</div>; // or any loading indicator
  // }

  if (!currentLog) {
    return <div>No logs available.</div>; // or handle accordingly
  }


  return (
    <div className={styles.bundleLogContainer}>
      <h3>Bundle Logs</h3>
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

export default BuildTimeMetrics;