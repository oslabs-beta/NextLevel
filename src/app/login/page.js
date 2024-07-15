'use client';

import React, { useState, useEffect } from 'react';
import './login.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';
import { AiOutlineGoogle } from 'react-icons/ai';
import { IoLogoGithub } from 'react-icons/io';
import Link from 'next/link';
import Modal from '../components/Modal';
import { signIn } from 'next-auth/react';

export default function Login() {
  useEffect(() => {
    // Stops background/other css elements from bleeding to next page
    console.log('Setting up login page styles');
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.minHeight = '100vh';
    document.body.style.background =
      'url("https://getwallpapers.com/wallpaper/full/2/8/f/537844.jpg") no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    return () => {
      console.log('Cleaning up login page styles');
      document.body.style.fontFamily = '';
      document.body.style.display = '';
      document.body.style.justifyContent = '';
      document.body.style.alignItems = '';
      document.body.style.minHeight = '';
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    };
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login form with username:', username);

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      console.log('Login error:', result.error);
      setError(result.error);
      setSuccess(false);
    } else {
      console.log('Login successful');
      setSuccess(true);
      setError('');
      setUsername('');
      setPassword('');
      window.location.href = '/dashboard';
    }
  };

  const handleOAuthSignIn = (provider) => {
    console.log(`Signing in with ${provider}`);
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="logo-container">
          <img src="./TransparentIcon.png" alt="Logo" className="logo" />
          <h1>NextLevel</h1>
        </div>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Si1Password className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>

        {error && (
          <p className="message" style={{ color: 'red' }}>
            {error}
          </p>
        )}
        {success && (
          <p className="message" style={{ color: 'green' }}>
            Login successful!
          </p>
        )}
        <div className="oauth-link">
          <button
            type="button"
            className="oauth-button"
            onClick={() => handleOAuthSignIn('google')}
          >
            <AiOutlineGoogle className="google-icon" />
          </button>
          <button
            type="button"
            className="oauth-button"
            onClick={() => handleOAuthSignIn('github')}
          >
            <IoLogoGithub className="github-icon" />
          </button>
        </div>
        <div className="register-link">
          <p>
            Don't have an account? <Link href="/signup">Register</Link>
          </p>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        handleOAuthSignIn={handleOAuthSignIn}
      />
    </div>
  );
}
