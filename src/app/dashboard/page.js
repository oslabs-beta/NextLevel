import React from 'react';
import styles from './dashboard.module.css';
import SideBar from './components/sidebar';
import DataContainer from './components/datacontainer';

export default async function Dashboard() {
  // adding fake data to test
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const allData = await res.json();
  return (
   <main>
    <h1>Dashboard Page</h1>
    <div className={styles.SideBar}>
      <SideBar />
      <DataContainer />
    </div>
    <div>
      <ul>
        {/* adding fake data to test */}
        {allData.map(webVital => <li key={webVital.id}> {webVital.title} </li>)}
      </ul>
    </div>
   </main>
  );
}
