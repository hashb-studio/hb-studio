import classNames from "classnames/bind";
import React from "react";
import styles from "./BlocDetails.module.scss";

const cx = classNames.bind(styles);

export const BlocDetails = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx("bloc-details")}>{children}</div>;
};
