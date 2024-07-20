'use client';

import React, { useState, useEffect } from 'react';
import './login.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';
import { AiOutlineGoogle } from 'react-icons/ai';
import { IoLogoGithub } from 'react-icons/io';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Spinner from '../components/Spinner.js';
import Image from 'next/image';
import '../globals.css'; // Import the global styles

export default function Login() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true); // Initially set to true

  useEffect(() => {
    // Add loading class to body
    document.body.classList.add('loading');

    // Simulate loading time (for demonstration purposes)
    setTimeout(() => {
      setLoading(false); // Hide preloader after the component has mounted
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 2000); // Adjust the timeout as needed

    return () => {
      document.body.classList.remove('loading');
      document.body.classList.remove('loaded');
    };
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const userNameFromSession = session.user.email;
      console.log('USERNAME OAUTH', userNameFromSession);
      window.location.href = `/dashboard/?username=${encodeURIComponent(userNameFromSession)}`;
    }
  }, [status, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show preloader
    console.log("Submitting login form with username:", username);

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    setLoading(false); // Hide preloader

    if (result.error) {
      console.log('Login error:', result.error);
      setError(result.error);
    } else {
      console.log('Login successful');
      setError('');
      setUsername('');
      setPassword('');
      window.location.href = `/dashboard/?username=${username}`;
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true); // Show preloader
    const result = await signIn(provider, { redirect: false });
    console.log('RESULT', result);

    if (!result.error) {
      const interval = setInterval(() => {
        if (status === 'authenticated' && session) {
          clearInterval(interval);
          const userNameFromSession = session.user.email;
          setLoading(false); // Hide preloader
          window.location.href = `/dashboard/?username=${encodeURIComponent(userNameFromSession)}`;
        }
      }, 100); // Check every 100ms
    } else {
      setLoading(false); // Hide preloader
      console.log(`OAuth sign-in error with ${provider}:`, result.error);
      setError(`Failed to sign in with ${provider}. Please try again.`);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="logo-container">
          <Image src="/TransparentIcon.png" alt="Logo" className="logo" width={250} height={350} />
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
        <div
          className="register-link"
          style={{
            fontSize: '14.5px',
            textAlign: 'center',
            margin: '20px 0 15px',
          }}
        >
          <p style={{ margin: 0, color: '#fff', fontSize: '14.5px' }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: '#fff', textDecoration: 'none', fontWeight: '600', fontSize: '14.5px' }}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}




