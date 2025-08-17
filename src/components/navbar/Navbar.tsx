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
            <a href="#" className={cx("nav-link")}>
              Accueil
            </a>
            <a href="#" className={cx("nav-link")}>
              À propos
            </a>
            <a href="#" className={cx("nav-link")}>
              Services
            </a>
            <a href="#" className={cx("nav-link")}>
              Contact
            </a>
          </nav>
        </>
      ) : (
        <>
          <div className={cx("mobile-nav")}>
            <button
              className={cx("burger-button", { active: isOpen })}
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>

            <div
              className={cx("menu-overlay", { open: isOpen })}
              onClick={closeMenu}
            />

            <nav className={cx("mobile-menu", { open: isOpen })}>
              <div className={cx("menu-header")}>
                <button
                  className={cx("close-button")}
                  onClick={closeMenu}
                  aria-label="Fermer le menu"
                >
                  ×
                </button>
              </div>
              <div className={cx("menu-links")}>
                <a
                  href="#"
                  className={cx("mobile-nav-link")}
                  onClick={closeMenu}
                >
                  Accueil
                </a>
                <a
                  href="#"
                  className={cx("mobile-nav-link")}
                  onClick={closeMenu}
                >
                  À propos
                </a>
                <a
                  href="#"
                  className={cx("mobile-nav-link")}
                  onClick={closeMenu}
                >
                  Services
                </a>
                <a
                  href="#"
                  className={cx("mobile-nav-link")}
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
