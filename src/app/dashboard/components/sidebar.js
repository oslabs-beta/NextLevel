import React from 'react';
import styles from '../dashboard.module.css';
import { IoSettingsOutline } from "react-icons/io5";
import Link from 'next/link';

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Link href="/dashboard/settings">
      <ul className={styles.sidebarList}>
        <IoSettingsOutline className={styles.sidebarListIcons} />
        <li className={styles.sidebarListItems}>Settings</li>
      </ul>
      </Link>
    </div>
  );
}

export default SideBar;