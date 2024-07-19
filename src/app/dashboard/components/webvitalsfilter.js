'use client';

import React, { useState } from 'react';
import styles from '../dashboard.module.css';

const WebVitalsFilter = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // call the onUpdate function passed as a prop with the new start and end dates
    onSubmit(startDate, endDate);
  };

  const handleStartDateChange = (event) => {
      setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
      setEndDate(event.target.value);
  };

  return (
      <div>
          <form className={styles.webVitalsFilter} onSubmit={handleSubmit}>
              <input type='datetime-local' id='start' name='start' className={styles.dateFilter} value={startDate} onChange={handleStartDateChange} required />
              <input type='datetime-local' id='end' name='end' className={styles.dateFilter} value={endDate} onChange={handleEndDateChange} required />
              <button type='submit' className={styles.filterDateSubmit}>Filter</button>
          </form>
      </div>
  );
}

export default WebVitalsFilter;