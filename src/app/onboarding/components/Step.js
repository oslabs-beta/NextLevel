'use client';

import React, { useEffect, useState } from 'react';
import CodeBox from './CodeBox';

const Step = ({ stepNumber, title, description, code, language, api }) => {
  const APIkey = () => {
    return "XVAOgIvvFHSEf_B5CpOiC";
    // make fetch request here to get actual api key
  }
  
  const formattedCode = code.split('\n').map((line, index) => (
    <span key={index}>{line}<br /></span>
  ));

  return (
    <div>
      {stepNumber && <h2>Step {stepNumber}: {title}</h2>}
      <p>{description}</p>
      <CodeBox fileName={language} codeText={formattedCode} />
      {api === true && <CodeBox fileName="API Key" codeText={APIkey()} />}
    </div>
  );
};

export default Step;

// import React from 'react';
// import CodeBox from './CodeBox';

// const Step = ({ stepNumber, title, description, code, language, api }) => {
//   return (
//     <div>
//       {stepNumber && <h2>Step {stepNumber}: {title}</h2>}
//       <p>{description}</p>
//       <CodeBox fileName={language} codeText={code} />

//     </div>
//   );
// };

// export default Step;