import React from 'react';
import './signUp.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from "react-icons/io";
import Link from 'next/link';
// import { useSession, signIn, signOut } from 'next-auth/react';
// import {backimage} from '../../../assets/4k-tech-untb6o7k25k9gvy1.jpg';
// import { Home } from './Oauth.jsx';

export default function SignUp() {
  return (
    <body>
      <div className="wrapper">
        <form action="">
          <h1> Sign Up </h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaCircleUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <Si1Password className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confirm Password" required />
            <Si1Password className="icon" />
          </div>
          <button type="submit"> Sign Up </button>

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
          </div>
        </form>
      </div>
    </body>
  );
}
