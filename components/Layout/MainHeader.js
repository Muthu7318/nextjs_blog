import React from "react";
import Link from "next/link";
import styles from "./mainheader.module.css";

function MainHeader(props) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Next Events</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li className={styles.list}>
            <Link href="/events">All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
