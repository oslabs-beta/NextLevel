import React from 'react';
import styles from '../dashboard.module.css';
import { IoSettingsOutline } from "react-icons/io5";
import Link from 'next/link';

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.topSection}>
        <ul className={styles.sidebarTop}>
          <Link className={styles.link} href="/onboarding">
          <li className={styles.sidebarListItems}>Onboarding</li>
          </Link>
          <Link className={styles.link} href="/onboarding">
          <li className={styles.sidebarListItems}>History</li>
          </Link>
        </ul>
      </div> 
      <div className={styles.bottomSection}>
        <Link className={styles.link} href="/dashboard/settings">
          <div className={styles.sidebarLink}>
            <IoSettingsOutline className={styles.sidebarListIcons} />
            <span className={styles.sidebarListItems}>Settings</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;