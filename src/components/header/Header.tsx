"use client"

import classNames from "classnames/bind";
import React from "react";
import styles from "./Header.module.scss";
import Navbar from "../Navbar/Navbar";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx("header")}>
      <h1>Hb studio</h1>
      <Navbar />
    </header>
  );
};

export default Header;
