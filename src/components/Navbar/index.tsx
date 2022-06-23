import logo from "../../assets/logo.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
import { useFiltersContext } from "../../contexts/content-context";

export function Navbar() {
  const { filters, setCurrentFilter } = useFiltersContext();

  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="Logo image" />
      </Link>
      <nav className={styles.navLinks}>
        <ul>
          <li className={styles.navItem}>
            <a
              href="#"
              onClick={() => {
                setCurrentFilter(filters[1]);
              }}
            >
              Movies
            </a>
          </li>
          <li
            className={styles.navItem}
            onClick={() => {
              setCurrentFilter(filters[2]);
            }}
          >
            <a href="#">Tv shows</a>
          </li>
          <li className={styles.navItem}>
            <a href="#">Suggest me</a>
            <img
              src={arrowRight}
              style={{
                width: "2rem",
                height: "2rem",
              }}
              alt="Arrow right image"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
