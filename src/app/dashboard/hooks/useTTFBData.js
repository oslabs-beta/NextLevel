'use client';

import React, { useEffect, useState } from 'react';

const useTTFBData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Dummy data for demonstration
    const dummyData = [
      { timestamp: '2024-07-08T12:00:00Z', ttfb: 200 },
      { timestamp: '2024-07-08T12:05:00Z', ttfb: 180 },
      { timestamp: '2024-07-08T12:10:00Z', ttfb: 220 },
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

export default useTTFBData; 