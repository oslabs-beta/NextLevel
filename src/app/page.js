"use client";

import React, { useEffect } from 'react';
import './home.css';
import { IoMdVideocam } from 'react-icons/io';
import Link from 'next/link';

export default function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenFadeElements = document.querySelectorAll('.hidden-fade');
    hiddenFadeElements.forEach((el) => observer.observe(el));

    const hiddenFlyLeftElements = document.querySelectorAll('.hidden-fly-left');
    hiddenFlyLeftElements.forEach((el) => observer.observe(el));

    const hiddenFlyRightElements = document.querySelectorAll('.hidden-fly-right');
    hiddenFlyRightElements.forEach((el) => observer.observe(el));

    const hiddenFlyUpElements = document.querySelectorAll('.hidden-fly-up');
    hiddenFlyUpElements.forEach((el) => observer.observe(el));

    // Cleanup observer on unmount
    return () => {
      hiddenFadeElements.forEach((el) => observer.unobserve(el));
      hiddenFlyLeftElements.forEach((el) => observer.unobserve(el));
      hiddenFlyRightElements.forEach((el) => observer.unobserve(el));
      hiddenFlyUpElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main>
      <div className='navbar-gap'></div>
      <div className="gif-container">
        <img src="/transparent gif v2 (1).gif" alt="GIF" className="gif" />
        <img src="/Transparent Logo White.png" alt="Logo" className="static-logo" />
      </div>
      <section className='hidden-fade'>
        <h2>Take your app to the NextLevel</h2>
        <section className='hidden-fly-up'>
          <div className="buttonsDiv"> 
            <div className='homepageButtons'>
              <Link className='homepage-link' href="/login">
                <div className="login-button">Login</div> {/* Added button to route to the login page */}
              </Link>
            </div>
            <div className='or'> or </div>
            <div className='homepageButtons'>
              <Link className='homepage-link' href="/signup">
                <div className="signup-button">Get Started</div> {/* Added button to route to the login page */}
              </Link>
            </div>
          </div>
        </section>
      </section>
      <section className='hidden-fly-left'>
        <h2>Level up with Next.js</h2>
        <p>NextLevel is a performance metrics dashboard tailored to Next.js applications that visualizes critical performance data, such as build time and key web vitals, enabling developers to pinpoint inefficiencies and improve both development productivity and end-user experience.</p>
      </section>
      <section className='hidden-fly-left'>
        <h2>This is so cool</h2>
      </section>
    </main>
  );
}

