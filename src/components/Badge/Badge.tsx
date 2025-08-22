import classNames from "classnames/bind";
import React from "react";
import styles from "./Badge.module.scss";

interface BadgeProps {
  label: string;
}

const cx = classNames.bind(styles);

export const Badge = ({ label }: BadgeProps) => {
  return <div className={cx("badge")}>{label}</div>;
};
