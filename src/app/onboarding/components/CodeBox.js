import React from 'react';
import CopyButton from './CopyButton';
import styles from './CodeBox.module.css';

const CodeBox = ({ fileName, codeText }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{fileName}</span>
        <CopyButton text={codeText} />
      </div>
      <div className={styles.codeArea}>
        <code>{codeText}</code>
      </div>
    </div>
  );
};

export default CodeBox;
