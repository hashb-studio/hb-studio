import React from "react";
import styles from "./AnimatedLogo.module.scss";

export const AnimatedLogo = () => {
  return (
    <div className={styles.logoWrapper}>
      <svg
        viewBox="0 0 200 200"
        className={styles.logo}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="90" stroke="#333" fill="none" />

        <text>
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            HB Studio • HB Studio • HB Studio
          </textPath>
        </text>

        <defs>
          <path
            id="circlePath"
            d="M100,100 m-90,0 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0"
          />
        </defs>
      </svg>
    </div>
  );
};
