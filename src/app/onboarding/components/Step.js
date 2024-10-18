'use client';

import React, { useEffect, useState } from 'react';
import CodeBox from './CodeBox';
import styles from '../Onboarding.module.css';

const Step = ({ stepNumber, title, description, code, language, api, username }) => {
  const [APIkey, setAPIkey] = useState('');
  
  useEffect(() => {
    if(api === true) {
      fetch(`https://www.nextlevel-dash.com/onboarding/api?username=${username}`)
      .then((res) => {
        if (res.ok) {
          // console.log('res:', res);
          return res.json();
        }
      })
      .then((data) => {
        // console.log('API key in onboardin page:', data.APIkey);
        setAPIkey(data.APIkey);
      })
      .catch((error) => {
        console.error('Error fetching API key:', error);
      });
    }
  }, [username]);
  
  const formattedCode = code.split('\n').map((line, index) => (
    <span key={index}>{line}<br /></span>
  ));

  return (
    <div>
      {stepNumber && <h2>Step {stepNumber}: {title}</h2>}
      <p className={styles.description}>{description}</p>
      <CodeBox fileName={language} codeText={code} formattedCode={formattedCode} />
      {api === true && <CodeBox fileName="API Key" formattedCode={APIkey} />}
    </div>
  );
};

export default Step;