"use client";
import React, { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const LocaleSwitcher = () => {
  const router = useRouter();
  const currentLocale = useLocale();
  const pathname = usePathname();

  const [isHover, setIsHover] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const locales = routing.locales.filter((locale) => locale !== currentLocale);

  const handleLocaleChange = (locale: string) => {
    startTransition(() => {
      router.replace({ pathname }, { locale });
    });
  };

  const handleHoverOpen = () => {
    setIsHover(true);
  };

  const handleHoverClose = () => {
    setIsHover(false);
  };

  return (
    <div
      className={cx("localeButton")}
      onMouseEnter={handleHoverOpen}
      onMouseLeave={handleHoverClose}
    >
      <span className={cx("currentLocale")}>{currentLocale}</span>
      {isHover && (
        <ul className={cx("localeList")}>
          {locales.map((locale, index) => (
            <li
              key={index}
              className={cx("locale")}
              onClick={() => handleLocaleChange(locale)}
            >
              {locale}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
