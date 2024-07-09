'use client';

import React, { useEffect, useState } from 'react';
import styles from './topnav.module.css';
import Link from 'next/link';

function TopNav({ userLoggedIn, handleLogout }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            {/* //add logo */}
            <img src="./../../../public/Transparent Logo.png" alt="Logo" />
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          {isMounted && (
            userLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
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
