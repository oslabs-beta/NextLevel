import React from 'react';
import styles from './topnav.module.css';
import Link from 'next/link';

function TopNav({ userLoggedIn, handleLogout }) {
  return (
    <header className={styles.header}>
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
        {/* //add logo */}
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/">
          Home
        </Link>
        {/* add logout logic?? or move to account page */}
        {userLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
    </header>
  );
}

export default TopNav;