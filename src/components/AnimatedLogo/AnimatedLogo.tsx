import React from "react";
import styles from "./AnimatedLogo.module.scss";

export const AnimatedLogo = () => {
  return (
    <div className={styles.logoWrapper}>
      <svg
        viewBox="0 0 220 220"
        className={styles.logo}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="circlePath"
            d="M110,110 m-100,0 a100,100 0 1,1 200,0 a100,100 0 1,1 -200,0"
          />
        </defs>
        <text fontSize="14" fill="#333">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            HB STUDIO • HB STUDIO • HB STUDIO •
          </textPath>
        </text>
      </svg>
    </div>
  );
};
