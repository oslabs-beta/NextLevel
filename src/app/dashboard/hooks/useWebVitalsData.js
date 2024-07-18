'use client';

import React, { useEffect, useState } from 'react';

// const useWebVitalsData = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Dummy data for demonstration
//     const dummyData = [
//       { timestamp: '2024-07-06T12:00:00Z', ttfb: 350, lcp: 1400, fcp: 2000, fid: 240, inp: 500  },
//       { timestamp: '2024-07-07T12:05:00Z', ttfb: 280, lcp: 1150, fcp: 1900, fid: 180, inp: 300  },
//       { timestamp: '2024-07-08T12:10:00Z', ttfb: 250, lcp: 1100, fcp: 1800, fid: 110, inp: 200  },
//       { timestamp: '2024-07-09T12:15:00Z', ttfb: 240, lcp: 1300, fcp: 1700, fid: 100, inp: 190  },
//       { timestamp: '2024-07-10T02:20:00Z', ttfb: 260, lcp: 1250, fcp: 1900, fid: 90, inp: 170  },
//       { timestamp: '2024-07-11T12:25:00Z', ttfb: 220, lcp: 1050, fcp: 1500, fid: 85, inp: 180  },
//       // Add more dummy data as needed
//     ];

//     // Simulate fetching data (asynchronously)
//     const fetchData = async () => {
//       // Simulate delay for loading
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setData(dummyData);
//     };

//     fetchData();
//   }, []);

//   return data;
// };

const useWebVitalsData = async (username) => {
  console.log('entering use effect useWebVitalsData for:', username);
  try {
    const res = await fetch(`http://localhost:3000/dashboard/api/webvitals?username=${username}`);
    if (res.ok) {
      console.log('Res from useWebVitalsData:', res);
      const data = await res.json();
      console.log('Data from useWebVitalsData:', data);
      return data;
    } else {
      console.error('Response not ok');
      return null;
    }
  } catch (error) {
    console.error('Error fetching bundle log:', error);
    return null;
  }
};

export default useWebVitalsData; 