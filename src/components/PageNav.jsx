import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import useMedia from "../hooks/useMedia";

const PageNav = () => {
  const [menuMobile, setMenuMobile] = React.useState(false);
  const buttonRef = useRef();
  const menuRef = useRef();

  const mobile = useMedia("(max-width: 600px)");

  React.useEffect(() => {
    function handleClickOut(e) {
      if (
        menuMobile &&
        buttonRef &&
        menuRef &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuMobile(false);
      }
    }
    window.addEventListener("click", handleClickOut);
    return () => window.removeEventListener("click", handleClickOut);
  }, [menuMobile]);

  return (
    <>
      <nav className={styles.nav}>
        <Logo />
        {mobile && (
          <button
            ref={buttonRef}
            onClick={() => setMenuMobile(!menuMobile)}
            className={`${styles.mobileButton} ${
              menuMobile ? styles.mobileButtonActive : ""
            }`}
            aria-label="Menu"
          ></button>
        )}
        <ul
          ref={menuRef}
          className={`${mobile ? styles.navMobile : ""} ${
            menuMobile ? styles.navMobileActive : ""
          }`}
        >
          <li>
            <NavLink to="/pricing">Assinatura</NavLink>
          </li>
          <li>
            <NavLink to="/product">Sobre</NavLink>
          </li>
          <li>
            <NavLink className={mobile ? "" : styles.ctaLink} to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PageNav;
