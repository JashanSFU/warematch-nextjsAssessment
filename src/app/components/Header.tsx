import React from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";

/** NavLink data shape */
interface NavLink {
  label: string;
  path: string;
}

/** Props for the Header component */
interface HeaderProps {
  brand?: string;
  links?: NavLink[];
}

const Header: React.FC<HeaderProps> = ({
  // default props
  brand = "WareMatch",
  links = [
    { label: "Home", path: "/" },
    { label: "Listings", path: "/listing" },
    { label: "About", path: "/about" },
  ],
}) => {
  return (
    <header className={styles.headerContainer}>
      {/* Brand or Logo */}
      <div className={styles.brand}>{brand}</div>

      {/* Hidden checkbox for "checkbox hack" */}
      <input
        type="checkbox"
        id="toggle-checkbox"
        className={styles.toggleCheckbox}
      />

      {/* Label tied to the checkbox above; toggles the "checked" state */}
      <label htmlFor="toggle-checkbox" className={styles.hamburger}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </label>

      {/* Navigation Menu */}
      <nav className={styles.nav}>
        {links.map((link) => (
          <Link key={link.path} href={link.path} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
