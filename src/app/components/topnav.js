'use client';

import React, { useEffect, useState } from 'react';
import styles from './topnav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/TransparentLogoLessSpace.png';
import { useSession, signOut } from 'next-auth/react';

function TopNav() {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} alt="logo" height={40}/>
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          {status === 'authenticated' ? (
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default TopNav;

