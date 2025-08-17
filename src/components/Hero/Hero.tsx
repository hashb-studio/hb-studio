import classNames from "classnames/bind";
import React from "react";
import styles from "./Hero.module.scss";
import { useTranslations } from "next-intl";

const cx = classNames.bind(styles);

const Hero = () => {
  const t = useTranslations("Hero");
  return (
    <section className={cx("hero")}>
      <div className={cx("hero__content")}>
        <h1>{t("title")}</h1>
      </div>
    </section>
  );
};

export default Hero;
