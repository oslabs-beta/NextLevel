'use client';

import React, { useEffect } from 'react';
import './home.css';
import Link from 'next/link';
import Image from 'next/image';


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
        <h1 className="animate">Take your application to the</h1>
        <video width="1200" preload="none" autoPlay muted >
          <source src="/NEXTLEVEL.mp4" type="video/mp4" />
        </video>
        {/* <Image className = "animate" src="/TransparentLogo.png" alt ="transparentLogo" width={500} height={500}/> */}
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

      <section className='sec-5'>
        <h1>Tracked Metrics</h1>
        <div className="images">
          <Image src="/METRICS/ttfb.svg" alt="TTFB" className="animate" style ={{ "--i": 0 }} width={170} height={238}/>
          <Image src="/METRICS/lcp.svg" alt="LCP" className="animate" style ={{ "--i": 1 }} width={170} height={238}/>
          <Image src="/METRICS/fcp.svg" alt="FCP" className="animate" style ={{ "--i": 2 }} width={170} height={238}/>
          <Image src="/METRICS/fid.svg" alt="FID" className="animate" style ={{ "--i": 3 }} width={170} height={238}/>
          <Image src='/METRICS/inp.svg' alt="INP" className="animate" style ={{ "--i": 4 }} width={170} height={238}/>
          <Image src='/METRICS/cls.svg' alt="CLS" className="animate" style ={{ "--i": 5 }} width={170} height={238}/>
        </div>
        <div className="images">
          <Image src="/METRICS/buildtime.svg" alt="Build Time" className="animate" style ={{ "--i": 0 }} width={170} height={238}/>
          <Image src="/METRICS/bundlesize.svg" alt="Bundle Size" className="animate" style ={{ "--i": 1 }} width={170} height={238}/>
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