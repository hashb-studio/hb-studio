/* eslint-disable @next/next/no-img-element */
import React from "react";
import classNames from "classnames/bind";
import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);

type LogoProps = {
  src: string;
  alt?: string;
  size?: number | string;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({
  src,
  alt = "Logo",
  size = 58,
  className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cx("logo", className)}
      style={{ width: size, height: size }}
    />
  );
};

export default Logo;
