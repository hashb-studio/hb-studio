import React from "react";
import classNames from "classnames/bind";
import styles from "./Service.module.scss";

const cx = classNames.bind(styles);

export type ServiceProps = {
  title: string;
  description: string[];
  tags: string[];
  backgroundColor: string;
  dynamicColor: string;
};

const Service: React.FC<ServiceProps> = ({
  title,
  description,
  tags,
  backgroundColor,
  dynamicColor,
}) => {
  return (
    <li className={cx("section")} data-color={backgroundColor}>
      <h4 style={{ "--color": dynamicColor } as React.CSSProperties}>
        {title}
      </h4>
      <div
        className={cx("description")}
        style={{ "--color": dynamicColor } as React.CSSProperties}
      >
        {description.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
      <ul className={cx("tags")}>
        {tags.map((tag, i) => (
          <li
            key={i}
            style={{ "--color": dynamicColor } as React.CSSProperties}
          >
            {tag}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Service;
