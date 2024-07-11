import React from 'react';
import CodeBox from './CodeBox';

const Step = ({ stepNumber, title, description, code, language }) => {
  return (
    <div>
      {stepNumber && <h2>Step {stepNumber}: {title}</h2>}
      <p>{description}</p>
      <CodeBox fileName={language} codeText={code} />
    </div>
  );
};

export default Step;