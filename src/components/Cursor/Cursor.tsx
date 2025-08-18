import styles from "./Cursor.module.scss";
import classNames from "classnames/bind";

interface CursorProps {
  position: { x: number; y: number };
}

const cx = classNames.bind(styles);

export const Cursor = ({ position }: CursorProps) => {
  return (
    <div className={cx("cursor")} style={{ top: position.y, left: position.x }}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#00C9A7" />
        <path
          d="M24 16L30 24L24 32"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="14"
          y1="24"
          x2="30"
          y2="24"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
