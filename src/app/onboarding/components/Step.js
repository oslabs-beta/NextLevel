'use client';

import React, { useEffect, useState } from 'react';
import CodeBox from './CodeBox';

const Step = ({ stepNumber, title, description, code, language, api, username }) => {
  const [APIkey, setAPIkey] = useState('');
  // {"APIkey":"0nHYsAj9s6Ai2j31oSLut"}
  
  useEffect(() => {
    if(api === true) {
      fetch(`http://localhost:3000/onboarding/api?username=${username}`)
      .then((res) => {
        if (res.ok) {
          console.log('res:', res);
          return res.json(); // not res.json() because its returning
        }
      })
      .then((data) => {
        setAPIkey(data.APIkey);
      })
      .catch((error) => {
        console.error('Error fetching API key:', error);
      });
    }
  }, []);
  
  const formattedCode = code.split('\n').map((line, index) => (
    <span key={index}>{line}<br /></span>
  ));

  return (
    <div>
      {stepNumber && <h2>Step {stepNumber}: {title}</h2>}
      <p>{description}</p>
      <CodeBox fileName={language} codeText={formattedCode} />
      {api === true && <CodeBox fileName="API Key" codeText={APIkey} />}
    </div>
  );
};

export default Step;