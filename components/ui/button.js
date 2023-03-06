import React from "react";
import styles from "./button.module.css";
import Link from "next/link";

function Button({ link, children }) {
  if (link) {
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    );
  }

  return <button className={styles.btn}>{children}</button>;
}

export default Button;
