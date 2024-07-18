'use client';

async function fetchWebVitals (username, metricType) {
  try {
    // const res = await fetch(`https://nextlevel-dash.com/dashboard/api/webvitals?username=${username}&metricType=${metricType}`);
    const res = await fetch(`http://localhost:3000/dashboard/api/webvitals?username=${username}&metricType=${metricType}`);
      if (res.ok) {
        console.log('Res from useWebVitalsData:', res);
        const resData = await res.json();
        console.log('Data from useWebVitalsData:', resData);
        return resData;  //array of obj with all metric types
      } else {
        console.error('Response not ok');
        return [];
      }
  } catch (error) {
    console.error('Error fetching web vitals', error);
    return [];
  }
}

const useWebVitalsData = async (username) => {
  console.log('entering use effect useWebVitalsData for:', username);
  const metricTypes = ['FCP', 'LCP', 'TTFB', 'FID', 'INP'];
  try {
    const metricsCombined = await Promise.all(metricTypes.map(metricType => fetchWebVitals(username, metricType)));
    console.log('Metrics Combined:', metricsCombined.flat());
    return metricsCombined.flat(); // Flatten the array of arrays into a single array
  } catch (error) {
    console.error('Error in useWebVitals:', error);
  }
};

export default useWebVitalsData; 