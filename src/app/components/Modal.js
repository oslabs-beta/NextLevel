import React from 'react';
import './Modal.css'; // Create and import modal specific styles
import { FcGoogle } from 'react-icons/fc';
import { DiGithubBadge } from 'react-icons/di';

export default function Modal({ isOpen, onClose, handleOAuthSignIn }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login with</h2>
        <button type="button" className="oauth-button" onClick={() => handleOAuthSignIn('google')}>
          <FcGoogle className="google-icon" /> Login with Google
        </button>
        <button type="button" className="oauth-button" onClick={() => handleOAuthSignIn('github')}>
          <DiGithubBadge className="github-icon" /> Login with GitHub
        </button>
        <button type="button" className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
