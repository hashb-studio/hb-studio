"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { useBelowLaptop } from "@/hooks/useMediaQuery";

const cx = classNames.bind(styles);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBelowLaptop();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isMobile ? (
        <>
          <nav className={cx("navbar")}>
            <a href="#" className={cx("navbar__link")}>
              Accueil
            </a>
            <a href="#" className={cx("navbar__link")}>
              À propos
            </a>
            <a href="#" className={cx("navbar__link")}>
              Services
            </a>
            <a href="#" className={cx("navbar__link")}>
              Contact
            </a>
          </nav>
        </>
      ) : (
        <>
          <div className={cx("navMobile")}>
            <button
              className={cx("navMobile__burger-button", { active: isOpen })}
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>

            <div
              className={cx("navMobile__menu-overlay", { open: isOpen })}
              onClick={closeMenu}
            />

            <nav className={cx("navMobile__mobile-menu", { open: isOpen })}>
              <div className={cx("navMobile__menu-header")}>
                <button
                  className={cx("navMobile__close-button")}
                  onClick={closeMenu}
                  aria-label="Fermer le menu"
                >
                  ×
                </button>
              </div>
              <div className={cx("navMobile__menu-links")}>
                <a
                  href="#"
                  className={cx("navMobile__mobile-nav-link")}
                  onClick={closeMenu}
                >
                  Accueil
                </a>
                <a
                  href="#"
                  className={cx("navMobile__mobile-nav-link")}
                  onClick={closeMenu}
                >
                  À propos
                </a>
                <a
                  href="#"
                  className={cx("navMobile__mobile-nav-link")}
                  onClick={closeMenu}
                >
                  Services
                </a>
                <a
                  href="#"
                  className={cx("navMobile__mobile-nav-link")}
                  onClick={closeMenu}
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
