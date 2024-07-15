import React, { useEffect, useState } from 'react';
import styles from '../dashboard.module.css';
import useBundleData from '../hooks/useBundleData';
import { set } from 'mongoose';

// const bundleLogs = [
//   {
//     dateTime: '2024-07-08T14:23:13Z',
//     log: `Page                               Size         First Load JS
// ┌ ○ /                              5.23 kB        160.7 kB
// ├   /_app                          0 B             110.4 kB
// ├ ○ /404                           3.29 kB         113.7 kB
// ├ ○ /about                         3.93 kB         112.4 kB
// ├ ○ /contact                       3.89 kB         112.4 kB
// ├ ○ /products                      5.55 kB         115.6 kB
// ├ λ /api/hello                     0 B             110.4 kB
// └ λ /api/products                  0 B             110.4 kB
// + First Load JS shared by all      110.4 kB
//   ├ chunks/framework-abcdef.js     60 kB
//   ├ chunks/main-ghijkl.js          20.3 kB
//   ├ chunks/pages/_app-mnopqr.js    15.1 kB
//   ├ chunks/webpack-stuvwx.js       12.6 kB
//   └ css/0123abcd.css               2.4 kB`
//   },
//   {
//     dateTime: '2024-07-09T15:16:45Z',
//     log: `Page                               Size         First Load JS
// ┌ ○ /                              4.93 kB        150.7 kB
// ├   /_app                          0 B             100.4 kB
// ├ ○ /404                           3.29 kB         103.7 kB
// ├ ○ /about                         3.93 kB         102.4 kB
// ├ ○ /contact                       3.89 kB         102.4 kB
// ├ ○ /products                      5.55 kB         105.6 kB
// ├ λ /api/hello                     0 B             100.4 kB
// └ λ /api/products                  0 B             100.4 kB
// + First Load JS shared by all      100.4 kB
//   ├ chunks/framework-abcdef.js     55 kB
//   ├ chunks/main-ghijkl.js          18.3 kB
//   ├ chunks/pages/_app-mnopqr.js    14.1 kB
//   ├ chunks/webpack-stuvwx.js       10.6 kB
//   └ css/0123abcd.css               2.4 kB`
//   },
//   {
//     dateTime: '2024-07-09T16:08:56Z',
//     log: `Page                               Size         First Load JS
// ┌ ○ /                              4.53 kB        140.7 kB
// ├   /_app                          0 B             90.4 kB
// ├ ○ /404                           3.29 kB         93.7 kB
// ├ ○ /about                         3.93 kB         92.4 kB
// ├ ○ /contact                       3.89 kB         92.4 kB
// ├ ○ /products                      5.55 kB         95.6 kB
// ├ λ /api/hello                     0 B             90.4 kB
// └ λ /api/products                  0 B             90.4 kB
// + First Load JS shared by all      90.4 kB
//   ├ chunks/framework-abcdef.js     50 kB
//   ├ chunks/main-ghijkl.js          15.3 kB
//   ├ chunks/pages/_app-mnopqr.js    10.1 kB
//   ├ chunks/webpack-stuvwx.js       8.6 kB
//   └ css/0123abcd.css               2.4 kB`
//   },
//   {
//     dateTime: '2024-07-10T16:43:44Z',
//     log: `Page                               Size         First Load JS
// ┌ ○ /                              4.23 kB        130.7 kB
// ├   /_app                          0 B             80.4 kB
// ├ ○ /404                           3.29 kB         83.7 kB
// ├ ○ /about                         3.93 kB         82.4 kB
// ├ ○ /contact                       3.89 kB         82.4 kB
// ├ ○ /products                      5.55 kB         85.6 kB
// ├ λ /api/hello                     0 B             80.4 kB
// └ λ /api/products                  0 B             80.4 kB
// + First Load JS shared by all      80.4 kB
//   ├ chunks/framework-abcdef.js     45 kB
//   ├ chunks/main-ghijkl.js          12.3 kB
//   ├ chunks/pages/_app-mnopqr.js    8.1 kB
//   ├ chunks/webpack-stuvwx.js       6.6 kB
//   └ css/0123abcd.css               2.4 kB`
//   },
//   {
//     dateTime: '2024-07-11T17:37:22Z',
//     log: `Page                               Size         First Load JS
// ┌ ○ /                              3.93 kB        120.7 kB
// ├   /_app                          0 B             70.4 kB
// ├ ○ /404                           3.29 kB         73.7 kB
// ├ ○ /about                         3.93 kB         72.4 kB
// ├ ○ /contact                       3.89 kB         72.4 kB
// ├ ○ /products                      5.55 kB         75.6 kB
// ├ λ /api/hello                     0 B             70.4 kB
// └ λ /api/products                  0 B             70.4 kB
// + First Load JS shared by all      70.4 kB
//   ├ chunks/framework-abcdef.js     40 kB
//   ├ chunks/main-ghijkl.js          10.3 kB
//   ├ chunks/pages/_app-mnopqr.js    6.1 kB
//   ├ chunks/webpack-stuvwx.js       4.6 kB
//   └ css/0123abcd.css               2.4 kB`
//   }
// ]

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
      console.log('Bundle Logs:', logs);
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