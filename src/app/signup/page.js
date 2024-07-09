import React, { useState } from 'react';
import './signUp.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';
import { AiOutlineGoogle } from "react-icons/ai";
import { IoLogoGithub } from "react-icons/io";
import Link from 'next/link';
// import { useSession, signIn, signOut } from 'next-auth/react';
// import {backimage} from '../../../assets/4k-tech-untb6o7k25k9gvy1.jpg';
// import { Home } from './Oauth.jsx';

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass){
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('./api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // const handleOAuthSignIn = (provider) => {
      //   signIn(provider, { callbackUrl: '/dashboard' });
        // };

      if (response.ok) {
        setSuccess('User registered successfully');
        setError('');
        setUsername('');
        setPassword('');
        setConfirmPass('');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };
  return (
    <body>
      <div className="wrapper">
        <form onSubmit = {handleSubmit}>
          <h1> Sign Up </h1>
          <div className="input-box">
            <input type="text" placeholder="Username" value = {username} onChange={(e) => setUsername(e.target.value)} required />
            <FaCircleUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)}required />
            <Si1Password className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confirm Password" value = {confirmPass} onChange={(e) => setConfirmPass(e.target.value)}required />
            <Si1Password className="icon" />
          </div>
          <button type="submit"> Sign Up </button>

          <div className="oauth-link">
            <Link href="/Oauth">
              <button type="button" className="oauth-button">
                <AiOutlineGoogle className="google-icon" />
              </button>
            </Link>
            <Link href="/Oauth">
            <button type="button" className="oauth-button">
              <IoLogoGithub className="github-icon" />
            </button>
          </Link>
          </div>
          <div className="register-link">
            <p>
              Already have an account? <Link href = "/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </body>
  );
}
