import React from 'react';
import './login.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
<<<<<<< HEAD
import { DiGithubBadge } from "react-icons/di";
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";
//import Github from 'next-auth/providers/github';
=======
import { IoLogoGithub } from "react-icons/io";
import Link from 'next/link';
// import { useSession, signIn, signOut } from "next-auth/react";
// import {backimage} from '../../../assets/4k-tech-untb6o7k25k9gvy1.jpg';
>>>>>>> 36c4ab04a61ce8a89a7a412c79fcf3208d51834f
// import { Home } from './Oauth.jsx';

export default function Login() {
  return (
    <body>
      <div className="wrapper">
        <form action="">
          <h1> NextLevel </h1>
          <div className="input-box"> 
            <input type="text" placeholder="Username" required /> 
            <FaCircleUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <Si1Password className="icon" />
          </div>
          
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit"> Login </button>

          <div className="oauth-link">
          <Link href="/Oauth">
            <button type="button" className="oauth-button">
              <FcGoogle className="google-icon" />
            </button>
          </Link>
          <Link href="/Oauth">
            <button type="button" className="oauth-button">
              <IoLogoGithub className="github-icon" />
            </button>
          </Link>
          <Link href="/Oauth">
            <button type="button" className="oauth-button">
              <DiGithubBadge className="Github-icon" /> Login with Github
            </button>
          </Link>
        </div>

          <div className="register-link">
            <p>
              Don't have an account? <Link href = "/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </body>
  );
}
