"use client";

import React, { useEffect } from 'react';
import './home.css';
import { IoMdVideocam } from 'react-icons/io';

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

    // Cleanup observer on unmount
    return () => {
      hiddenFadeElements.forEach((el) => observer.unobserve(el));
      hiddenFlyLeftElements.forEach((el) => observer.unobserve(el));
      hiddenFlyRightElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main>
      <div className='navbar-gap'></div>
      <section className='hidden-fade'>
        <img src = '/Transparent Logo White.png' className = "home-logo"></img>
        <h2>Take your app to the NextLevel</h2>
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

