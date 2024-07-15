'use client';

import React, { useEffect, useState } from 'react';
import styles from './topnav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/TransparentLogoLessSpace.png';
import { useRouter } from 'next/navigation';    //added

function TopNav() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const isLoggedIn = Boolean(localStorage.getItem('userLoggedIn')); // Example check
    setUserLoggedIn(isLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn'); // Example logout logic
    setUserLoggedIn(false);
    router.push('/'); // Redirect to home page
  };

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} alt="logo" layout="intrinsic" height={40}/>
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          {isMounted && (
            userLoggedIn ? (
              <Link href="/" onClick={handleLogout}>Logout</Link>
            ) : (
              <Link href="/login">Login</Link>
            )
          )}
        </div>
      </nav>
    </div>
  );
}

export default TopNav;
