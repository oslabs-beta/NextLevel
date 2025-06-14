'use client';

import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';
import { AiOutlineGoogle } from 'react-icons/ai';
import { IoLogoGithub } from 'react-icons/io';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Spinner from '../components/Spinner.js';
import Image from 'next/image';

export default function Login({ initialLoading = true }) {  //added prop for testing purposes
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(initialLoading); // Initially set to true via prop

  useEffect(() => {
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.minHeight = '100vh';
    document.body.style.background = 'url("https://getwallpapers.com/wallpaper/full/2/8/f/537844.jpg") no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.height = '100%';

    // Simulate loading time (for demonstration purposes)
    setTimeout(() => {
      setLoading(false); // Hide preloader after the component has mounted
    }, 4000); // Adjust the timeout as needed

    return () => {
      document.body.style.fontFamily = '';
      document.body.style.display = '';
      document.body.style.justifyContent = '';
      document.body.style.alignItems = '';
      document.body.style.minHeight = '';
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = 'repeat';
      document.body.style.backgroundSize = 'auto';
      document.body.style.backgroundPosition = '0% 0%';
      document.body.style.backgroundAttachment = '';
      document.body.style.height = '';
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
    setLoading(true);

    try {
      // Direct authentication instead of using NextAuth
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful');
        setError('');
        setUsername('');
        setPassword('');
        window.location.href = `/dashboard/?username=${encodeURIComponent(username)}`;
      } else {
        console.log('Login error:', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true); // Show preloader
    const result = await signIn(provider, { redirect: false });
    // console.log('RESULT', result);

    if (!result?.error) {
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
    <div className={styles.login}>
      <div className={styles.bodyLogin}>
        <div className={styles.wrapper}>
          <div className={styles.headerContainer}>
            <h1>NextLevel</h1>
            <Image 
              src="/TransparentIcon.png"
              alt="NextLevel Logo" 
              priority={true}
              width={100}
              height={100}
              style={{ 
                objectFit: 'contain',
                background: 'transparent'
              }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaCircleUser className={styles.icon} />
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Si1Password className={styles.icon} />
            </div>
            <div className={styles.rememberForgot}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
            <button type="submit">Login</button>
            <a href="#">Forgot password?</a>

            {error && (
              <p className={styles.message} style={{ color: 'red' }}>
                {error}
              </p>
            )}
            {success && (
              <p className={styles.message} style={{ color: 'green' }}>
                Login successful!
              </p>
            )}
            <div className={styles.oauthLink}>
              <button
                type="button"
                className={styles.oauthButton}
                aria-label="Sign in with Google"
                onClick={() => handleOAuthSignIn('google')}
              >
                <AiOutlineGoogle className={styles.googleIcon} />
              </button>
              <button
                type="button"
                className={styles.oauthButton}
                aria-label="Sign in with GitHub"
                onClick={() => handleOAuthSignIn('github')}
              >
                <IoLogoGithub className={styles.githubIcon} />
              </button>
            </div>
            <div className={styles.registerLink}>
              <p style={{ margin: 0, color: '#fff', fontSize: '14.5px' }}>
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className={styles.registerLink}>
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}









