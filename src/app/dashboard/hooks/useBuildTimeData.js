'use client';

import React, { useEffect, useState } from 'react';

const useBuildTimeData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Dummy data for demonstration
    const dummyData = [
        { buildDate: '2024-07-08T14:23:13Z', buildTime: 15123 },
        { buildDate: '2024-07-09T15:16:45Z', buildTime: 13876 },
        { buildDate: '2024-07-09T16:08:56Z', buildTime: 12987 },
        { buildDate: '2024-07-10T16:43:44Z', buildTime: 12234 },
        { buildDate: '2024-07-11T17:37:22Z', buildTime: 11289 },
        // Add more dummy data as needed
    ];
      

    // Simulate fetching data (asynchronously)
    const fetchData = async () => {
      // Simulate delay for loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(dummyData);
    };

    fetchData();
  }, []);

  return data;
};

export default useBuildTimeData; 