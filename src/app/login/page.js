"use client";

import React, { useState } from "react";
import "./login.css";
import { FaCircleUser } from "react-icons/fa6";
import { Si1Password } from "react-icons/si";
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from "react-icons/io";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Modal from "../components/Modal.js"
//import Github from 'next-auth/providers/github';
//import { Home } from './Oauth/page.js';

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOAuthSignIn = (provider) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
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
            <button type="button" className="oauth-button" onClick={toggleModal}>
              <FcGoogle className="google-icon" />
            </button>
            <button type="button" className="oauth-button" onClick={toggleModal}>
              <IoLogoGithub className="github-icon" />
            </button>
          </div>
          <div className="register-link">
            <p>
              Don't have an account? <Link href="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal} handleOAuthSignIn={handleOAuthSignIn} />
    </body>
  );
}
