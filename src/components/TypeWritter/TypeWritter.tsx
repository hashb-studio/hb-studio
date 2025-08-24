import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./TypeWritter.module.scss";

const cx = classNames.bind(styles);

interface TypeWriterProps {
  text: string;
  link?: string;
  linkText?: string;
  speed?: number;
  start?: boolean;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  link,
  linkText,
  speed = 50,
  start = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!start) {
      setDisplayedText("");
      return;
    }

    setDisplayedText("");
    let i = 0;

    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        return;
      }
      const char = text[i];
      setDisplayedText((prev) => prev + char);
      i++;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, start]);

  return (
    <p className={cx("typewriter")}>
      {displayedText}
      {link && linkText && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      )}
    </p>
  );
};

export default TypeWriter;
