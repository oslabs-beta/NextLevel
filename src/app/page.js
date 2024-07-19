'use client';

import React, { useEffect } from 'react';
import './home.css';
import Link from 'next/link';

export default function Home() {

  useEffect(() => {
    document.querySelector('.sec-1').classList.add('show-animate');

    const sections = document.querySelectorAll('section');
    

    const handleScroll = () => {
      const top = window.scrollY;
      sections.forEach((sec) => {
        const offset = sec.offsetTop - 300;
        const height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
          sec.classList.add('show-animate');
        } 
        // else {
        //   sec.classList.remove('show-animate'); // repeats animation
        // }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      <div className='navbar-gap'></div>
      <section className='sec-1'>
        <h1 className="animate">THIS IS SECTION 1</h1>
        <p className="animate">Section 1 P1</p>
        <img className = "animate" src ="../public/TransparentLogo.png" alt ="transparentLogo"/>
      </section>

      <section className='sec-2'>
        <h1 className="animate">THIS IS SECTION 2</h1>
        <p className="animate">Section 2 P1</p>
      </section>

      <section className='sec-3'>
        <h1 className="animate">THIS IS SECTION 3</h1>
        <p className="animate">Section 3 P1</p>
      </section>

      <section className='sec-4'>
        <h1 className="animate">THIS IS SECTION 4</h1>
        <p className="animate">Section 4 P1</p>
      </section>

      <section className='sec-4'>
        <div className="images">
          <img src="../METRICS/ttfb.png" alt="TTFB" class="animate" style ={{ "--i": 0 }}/>
          <img src="../METRICS/lcp.png" alt="LCP" class="animate" style ={{ "--i": 1 }}/>
          <img src="../METRICS/fcp.png" alt="FCP" class="animate" style ={{ "--i": 2 }}/>
          <img src="../METRICS/fid.png" alt="FID" class="animate" style ={{ "--i": 3 }}/>
          <img src="../METRICS/itnp.png" alt="INP" class="animate" style ={{ "--i": 4 }}/>
        </div>
      </section>
    </main>
  );
}


{/* // 1st Section:
// LOGO + Login or sign up buttons
// Animation: 
// logo -> fade in after gif
// buttons -> fly up

// 2nd Section:
// What is next.js?
//

//3rd Section */}
{/* <section className='hidden-fly-up'>
  <div className="buttonsDiv"> 
    <div className='homepageButtons'>
      <Link className='homepage-link' href="/login">
        <div className="login-button">Login</div> 
      </Link>
    </div>
    <div className='or'> or </div>
    <div className='homepageButtons'>
      <Link className='homepage-link' href="/signup">
        <div className="signup-button">Get Started</div>
      </Link>
    </div>
  </div>
</section> */}