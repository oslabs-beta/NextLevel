'use client';

import React, { useState } from 'react';
import styles from './CopyButton.module.css';

function CopyButton({ text }) {
  const [ copySuccess, setCopySuccess ] = useState('');

  const copyToClipboard = () => { 
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Failed to copy!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };
  return (
    <div className={styles.apiContainer}>
      <button onClick={copyToClipboard} className={styles.copyButton}>
        Copy
      </button>
      {copySuccess && <span className={styles.copySuccess}>{copySuccess}</span>}
    </div>
  );
}

export default CopyButton;