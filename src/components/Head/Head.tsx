"use client";

import classNames from "classnames/bind";
import React from "react";
import styles from "./Head.module.scss";
import { Nav } from "../Nav/Nav";
import Logo from "../Logo/Logo";

const cx = classNames.bind(styles);

export const Head = () => {
  return (
    <header className={cx("header")}>
      <Logo src="/images/HBstudiologo.png" />
      <Nav />
    </header>
  );
};
