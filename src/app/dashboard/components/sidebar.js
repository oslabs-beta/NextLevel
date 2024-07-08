import React from 'react';
import styles from '../dashboard.module.css';

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <h2>SideBar</h2>
      <ul>
        <li>Sidebar item 1</li>
        <li>Sidebar item 2</li>
        <li>Sidebar item 3</li>
      </ul>
    </div>
  );
}

export default SideBar;