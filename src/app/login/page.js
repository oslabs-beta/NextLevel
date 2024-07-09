import React from 'react';
import './login.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from "react-icons/io";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from 'next/link';
// import { useSession, signIn, signOut } from "next-auth/react";
// import {backimage} from '../../../assets/4k-tech-untb6o7k25k9gvy1.jpg';
// import { Home } from './Oauth.jsx';
//MONGODB_URI: mongodb+srv://ianmann:nextlevelpass321!@nextlevel.3kqg581.mongodb.net/?retryWrites=true&w=majority&appName=NextLevel


export default function Login() {
  return (
    <body>
      <div className="wrapper">
        <form action="">
        <div className="logo-container">
            <img src="./TransparentIcon.png" alt="Logo" className="logo" />
            <h1>NextLevel</h1>
          </div>
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
              Don't have an account? <Link href = "/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </body>
  );
}
