"use client"

import classNames from "classnames/bind";
import React from "react";
import styles from "./Head.module.scss";
import { Nav } from "../Nav/Nav";

const cx = classNames.bind(styles);

export const Head = () => {
  return (
    <header className={cx("header")}>
      <h1>Hb studio</h1>
      <Nav />
    </header>
  );
};