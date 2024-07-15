'use client';

import React, { useEffect, useState } from 'react';

const useBundleData = async (username) => {
  console.log('entering use effect usebundledata for:', username);
  try {
    const res = await fetch(`http://localhost:3000/dashboard/api/bundle?username=${username}`);
    if (res.ok) {
      console.log('res from useBundleData:', res);
      const data = await res.json();
      console.log('Data from useBundleData:', data);
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

export default useBundleData;

// 'use client';

// import React, { useEffect, useState } from 'react';

// const useBundleData = (username) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     console.log('entering use effect usebundledata for:', username);
//     if(api === true) {
//       fetch(`http://localhost:3000/dashboard/api/bundle?username=${username}`)
//       .then((res) => {
//         if (res.ok) {
//           console.log('res from useBundleData:', res);
//           return res.json();
//         }
//       })
//       .then((data) => {
//         console.log('Data from useBundleData:', data);
//         setData(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching bundle log:', error);
//       });
//     }
//   }, []);

//   return data;
// };

// export default useBundleData; 