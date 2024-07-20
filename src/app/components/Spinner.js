// Spinner.js
import React from 'react';
import './Spinner.module.css';

export default function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <video className="spinner-video" autoPlay loop muted>
          <source src="/LOADINGLOGO.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}