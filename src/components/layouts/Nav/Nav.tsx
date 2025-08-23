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
import { AnimatePresence, motion } from "framer-motion";

const cx = classNames.bind(styles);

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBelowLaptop();
  const { theme } = useTheme();
  const t = useTranslations("Navbar");
  const [overlay, setOverlay] = useState<{
    show: boolean;
    label: string;
    href: string;
  }>({
    show: false,
    label: "",
    href: "",
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const dataNav = [
    {
      label: t("projects"),
      href: "/#projects",
    },

    {
      label: t("services"),
      href: "/#services",
    },
    {
      label: t("contact"),
      href: "/#contact",
    },
  ];

  const triggerOverlay = (label: string, href: string) => {
    setIsOpen(false);

    setOverlay({ show: true, label, href });
    setTimeout(() => {
      setOverlay({ show: false, label: "", href: "" });

      if (href.startsWith("/#")) {
        const id = href.replace("/#", "");
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "auto" });
        }
      } else {
        window.location.href = href;
      }
    }, 1500);
  };

  return (
    <>
      {!isMobile ? (
        <>
          <nav className={cx("navbar")}>
            {dataNav.map((item, index) => (
              <div key={index}>
                <Link
                  href={item.href}
                  className={cx("navbar__link")}
                  onClick={(e) => {
                    e.preventDefault();
                    triggerOverlay(item.label, item.href);
                  }}
                >
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
                      onClick={(e) => {
                        e.preventDefault();
                        triggerOverlay(item.label, item.href);
                      }}
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

      {/* --- Overlay Animation --- */}
      <AnimatePresence>
        {overlay.show && (
          <motion.div
            className={cx("overlay")}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5 }}
          >
            <div className={cx("overlay__content")}>
              <img
                src="/images/HBstudiologo.png"
                alt="Logo"
                className={cx("overlay__logo")}
              />
              <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 1, delay: 0.5 }}
                className={cx("overlay__label")}
              >
                {overlay.label}
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
