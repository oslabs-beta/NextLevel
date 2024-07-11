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

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Cleanup observer on unmount
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main>
      <div className='navbar-gap'></div>
      <section className='show'>
        <h1>NextLevel</h1>
        <h2>A new way to javascript</h2>
      </section>
      <section className='hidden'>
        <h1>NEXT JS!</h1>
        <p>Discover the power of modern web development with Next.js, the leading React framework for building fast, scalable, and SEO-friendly applications. Seamlessly integrate server-side rendering, static site generation, and API routes to create high-performance websites that captivate and engage users.</p>
      </section>
      <section className='hidden'>
        <h2>This is so cool</h2>
      </section>
    </main>
  );
}

