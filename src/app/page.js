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
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const metricsInfo = {
    ttfb: "Time to First Byte measures the time it takes for a user's browser to receive the first byte of page content.",
    lcp: "Largest Contentful Paint marks the time at which the largest content element in the viewport is fully rendered.",
    fcp: "First Contentful Paint measures the time from when the page starts loading to when any part of the page's content is rendered.",
    fid: "First Input Delay measures the time from when a user first interacts with your site to the time when the browser is able to respond to that interaction.",
    inp: "Interaction to Next Paint evaluates responsiveness to user interactions by measuring the time taken from user input to the next frame.",
    cls: "Cumulative Layout Shift measures the movement of visible elements within the viewport, important for visual stability.",
    buildtime: "Build Time is the duration taken to compile and bundle your project's source code.",
    bundlesize: "Bundle Size refers to the total size of all the files that are sent to the user's browser."
  };

  return (
    <main>
      <div className='navbar-gap'></div>
      <section className='sec-1'>
        <h1 className="animate">Take your application to the</h1>
        <video width="1200" preload="none" autoPlay muted >
          <source src="/NEXTLEVEL.mp4" type="video/mp4" />
        </video>
      </section>

      <section className='sec-2'>
        <h1 className="animate">STEP ONE</h1>
        <p className="animate">Download our npm package</p>
      </section>

      <section className='sec-3'>
        <h1 className="animate">STEP TWO</h1>
        <p className="animate">Connect your application</p>
      </section>

      <section className='sec-4'>
        <h1 className="animate">STEP THREE</h1>
        <p className="animate">Collect and log your data</p>
      </section>

      <section className='sec-5'>
        <h1 className = "animate">Tracked Metrics Include :</h1>
        <div className="images">
          {Object.keys(metricsInfo).slice(0, 4).map((metric, index) => (
            <div className="image-container" key={metric}>
              <Image src={`/METRICS/${metric}.svg`} alt={metric.toUpperCase()} className="animate" style={{ "--i": index }} width={170} height={238} />
              <div className="info-box">{metricsInfo[metric]}</div>
            </div>
          ))}
        </div>
        <div className="images">
          {Object.keys(metricsInfo).slice(4).map((metric, index) => (
            <div className="image-container" key={metric}>
              <Image src={`/METRICS/${metric}.svg`} alt={metric.toUpperCase()} className="animate" style={{ "--i": index }} width={170} height={238} />
              <div className="info-box">{metricsInfo[metric]}</div>
            </div>
          ))}
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