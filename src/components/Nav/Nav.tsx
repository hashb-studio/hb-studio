"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./Nav.module.scss";
import { useBelowLaptop } from "@/hooks/useMediaQuery";
import { LocaleSwitcher } from "../LocaleSwitcher/LocaleSwitcher";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const cx = classNames.bind(styles);

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBelowLaptop();
  const { theme } = useTheme();
  const t = useTranslations("Navbar");
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const dataNav = [
    {
      label: t("projects"),
      href: "#projects",
    },

    {
      label: t("services"),
      href: "#services",
    },

    {
      label: t("contact"),
      href: "#contact",
    },
  ];

  return (
    <>
      {!isMobile ? (
        <>
          <nav className={cx("navbar")}>
            {dataNav.map((item, index) => (
              <div key={index}>
                <Link href={item.href} className={cx("navbar__link")}>
                  {item.label}
                </Link>
              </div>
            ))}
            <LocaleSwitcher />
            <ThemeToggle />
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
              <span className={cx("line", { active: theme === "dark" })} />
              <span className={cx("line", { active: theme === "dark" })} />
              <span className={cx("line", { active: theme === "dark" })} />
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
                {dataNav.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      className={cx("navMobile__mobile-nav-link")}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
