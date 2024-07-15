'use client';

import { useState } from 'react';
import './signUp.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';
import { AiOutlineGoogle } from 'react-icons/ai';
import { IoLogoGithub } from 'react-icons/io';
import { ImMail4 } from "react-icons/im";
import Link from 'next/link';
import Modal from "../components/Modal.js";
import { signIn } from "next-auth/react";
import Str from '@supercharge/strings';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [APIkey, setAPIkey] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setError('Passwords do not match');
      return;
    }

    const randomAPI = Str.random();

    setAPIkey(randomAPI);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, APIkey}),
      });

      if (response.ok) {
        const usernameData = username;
        setSuccess(true);
        setError('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPass('');
        window.location.href = `/onboarding?username=${usernameData}`;
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccess(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess(false);
    }
  };

  const handleOAuthSignIn = (provider) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaCircleUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ImMail4 className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Si1Password className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
          <Si1Password className="icon" />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p className="message" style={{ color: 'red' }}>{error}</p>}
        {success && (
          <p className="message" style={{ color: 'green' }}>
            User registered successfully.
          </p>
        )}
        <div className="oauth-link">
          <button type="button" className="oauth-button" onClick={toggleModal}>
            <AiOutlineGoogle className="google-icon" />
          </button>
          <button type="button" className="oauth-button" onClick={toggleModal}>
            <IoLogoGithub className="github-icon" />
          </button>
        </div>
        <div className="register-link">
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={toggleModal} handleOAuthSignIn={handleOAuthSignIn} />
    </div>
  );
}
