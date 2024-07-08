'use client';

import React, { useEffect, useState } from 'react';
import styles from './topnav.module.css';
import Link from 'next/link';

function TopNav({ userLoggedIn, handleLogout }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            {/* //add logo */}
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          {/* add logout logic?? or move to account page */}
          {isClient && userLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default TopNav;