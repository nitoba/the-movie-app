import logo from "../../assets/logo.svg";

import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        <div className={styles.brand}>
          <img src={logo} alt="Logo" />
          <h3>The Movie App</h3>
        </div>

        <span className={styles.copyright}>
          2022 · All rights reserved to XXXX
        </span>

        <button className={styles.contact}>Contact</button>
      </div>
    </footer>
  );
}
