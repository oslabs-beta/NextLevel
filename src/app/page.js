"use client";

import React, { useEffect } from 'react';
import './home.css';
import Link from 'next/link';

export default function Home() {


  return (
    <main>
      <div className='navbar-gap'></div>
      <section class ="sec-1">
        <h1 class="animate">THIS IS SECTION 1</h1>
        <p class="animate">Section 1 P1</p>
      </section>

      <section class ="sec-2">
        <h1 class="animate">THIS IS SECTION 2</h1>
        <p class="animate">Section 2 P1</p>
      </section>

      <section class ="sec-3">
        <h1 class="animate">THIS IS SECTION 3</h1>
        <p class="animate">Section 2 P1</p>
      </section>

      <section class ="sec-4">
        <h1 class="animate">THIS IS SECTION 4</h1>
        <p class="animate">Section 4 P1</p>
      </section>

      <section class ="sec-4">
        <div class="images">
          {/* IMAGES HERE */}
        </div>
      </section>
    </main>
  );
}

// 1st Section:
// LOGO + Login or sign up buttons
// Animation: 
// logo -> fade in after gif
// buttons -> fly up

// 2nd Section:
// What is next.js?
//

//3rd Section
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