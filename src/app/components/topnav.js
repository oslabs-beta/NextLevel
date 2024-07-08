import React from 'react';
import styles from './topnav.module.css';
import Link from 'next/link';

function TopNav({ userLoggedIn, handleLogout }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <img src="/logo.png" alt="Logo" />
          </a>
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
        {userLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login">
            <a>Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default TopNav;