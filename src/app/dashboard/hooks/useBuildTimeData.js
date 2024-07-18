'use client';

import React, { useEffect, useState } from 'react';

const useBuildTimeData = async (username) => {
  console.log('entering use effect useBuildTimeData for:', username);
  try {
    const res = await fetch(`https://nextlevel-dash.com/dashboard/api/build?username=${username}`);
    if (res.ok) {
      console.log('Res from useBuildTimeData:', res);
      const data = await res.json();
      console.log('Data from useBuildTimeData:', data);
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

export default useBuildTimeData;