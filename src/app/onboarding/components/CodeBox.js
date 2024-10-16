import React from 'react';
import CopyButton from './CopyButton';
import styles from './CodeBox.module.css';

const CodeBox = ({ fileName, codeText, formattedCode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{fileName}</span>
        <CopyButton text={codeText} />
      </div>
      <div className={styles.codeArea}>
        <pre>{formattedCode}</pre>
      </div>
    </div>
  );
};

export default CodeBox;
