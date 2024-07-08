'use client';

import React, { useState } from 'react';
import styles from '../dashboard.module.css';

function APIKey({ api }) {
  //new code
  const [ copySuccess, setCopySuccess ] = useState('');

  const copyToClipboard = () => { 
    navigator.clipboard.writeText(api).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Failed to copy!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };
  return (
    <div className={styles.apiContainer}>
      <h2>API Key</h2>
      <input
        type="text"
        value={api}
        readOnly
        className={styles.apiCodeInput}
      />
      <button onClick={copyToClipboard} className={styles.copyButton}>
        Copy
      </button>
      {copySuccess && <span className={styles.copySuccess}>{copySuccess}</span>}
    </div>
  );
}

export default APIKey;