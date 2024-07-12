'use client';

import React, { useEffect, useState } from 'react';
import CodeBox from './CodeBox';

const Step = ({ stepNumber, title, description, code, language, api }) => {
  const APIkey = () => {
    return "1234";
    // make fetch request here to get actual api key
  }

  return (
    <div>
      {stepNumber && <h2>Step {stepNumber}: {title}</h2>}
      <p>{description}</p>
      <CodeBox fileName={language} codeText={code} />
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