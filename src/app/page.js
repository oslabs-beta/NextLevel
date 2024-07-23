'use client';

import React, { useEffect } from 'react';
import './home.css';
import Link from 'next/link';
import Image from 'next/image';
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";


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
        <Link href="https://www.npmjs.com/package/nextlevelpackage?activeTab=code" target="_blank" rel="noopener noreferrer" className="no-decoration">
          <p className="animate">Download our npm package</p>
        </Link>
      </section>

      <section className='sec-3'>
        <h1 className="animate">STEP TWO</h1>
        <p className="animate">Connect your Next.js application</p>
      </section>

      <section className='sec-4'>
        <h1 className="animate">STEP THREE</h1>
        <p className="animate">Collect and log your data</p>
      </section>

      <section className='sec-5'>
        <h1 className = "animate" id="trackedMetricsHeading">Tracked Metrics Include :</h1>
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

      <section className='sec-6'>
        <h1 className="meetTheTeam">MEET THE TEAM </h1>
        <p> Feel free to contact us if you have any questions!</p>
        <div className="team">
          <div className="team-member">
            <Image src='/HEADSHOTS/kim.png' alt="Kim Cuomo Headshot" width={200} height={200} className="headshot"/>
            <h2 className="name">Kim Cuomo</h2>
            <p className="role">Software Engineer</p>
            <div className="links">
              <Link href="https://github.com/kimcuomo" target="_blank" rel="noopener noreferrer" className="githubLink">
                <IoLogoGithub className="githubLogo"/>
              </Link>
              <Link href="https://www.linkedin.com/in/kimcuomo/" target="_blank" rel="noopener noreferrer" className="linkedinLink">
                <FaLinkedin className="linkedinLogo"/>
              </Link>
            </div>
          </div>
          <div className="team-member">
            <Image src='/HEADSHOTS/nelly.png' alt="Nelly Segimoto Headshot" width={200} height={200} className="headshot"/>
            <h2 className="name">Nelly Segimoto</h2>
            <p className="role">Software Engineer</p>
            <div className="links">
              <Link href="https://github.com/nellysegi" target="_blank" rel="noopener noreferrer" className="githubLink">
                <IoLogoGithub className="githubLogo"/>
              </Link>
              <Link href="https://www.linkedin.com/in/nellysegimoto/" target="_blank" rel="noopener noreferrer" className="linkedinLink">
                <FaLinkedin className="linkedinLogo"/>
              </Link>
            </div>
          </div>
          <div className="team-member">
            <Image src='/HEADSHOTS/ian.png' alt="Ian Mann Headshot" width={200} height={200} className="headshot"/>
            <h2 className="name">Ian Mann</h2>
            <p className="role">Software Engineer</p>
            <div className="links">
              <Link href="https://github.com/ianmannn" target="_blank" rel="noopener noreferrer" className="githubLink">
                <IoLogoGithub className="githubLogo"/>
              </Link>
              <Link href="https://www.linkedin.com/in/iancmann99/" target="_blank" rel="noopener noreferrer" className="linkedinLink">
                <FaLinkedin className="linkedinLogo"/>
              </Link>
            </div>
          </div>
          <div className="team-member">
            <Image src='/HEADSHOTS/fred.png' alt="Frederico Aires Headshot" width={200} height={200} className="headshot"/>
            <h2 className="name">Frederico Aires</h2>
            <p className="role">Software Engineer</p>
            <div className="links">
              <Link href="https://github.com/FredAires" target="_blank" rel="noopener noreferrer" className="githubLink">
                <IoLogoGithub className="githubLogo"/>
              </Link>
              <Link href="https://www.linkedin.com/in/frederico-neto-a3722b221/" target="_blank" rel="noopener noreferrer" className="linkedinLink">
                <FaLinkedin className="linkedinLogo"/>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
