import React, { useEffect, useRef, useState } from "react"
import styles from "./Cards.module.scss";
import classNames from "classnames/bind";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { useAboveTablet } from "@/hooks/useMediaQuery";
import { Cursor } from "../Cursor/Cursor";
import { useScroll, useTransform, motion } from "framer-motion";

const cx = classNames.bind(styles);

const Cards = ({
  imageUrlPortrait,
  imageUrlLandscape,
  title,
  description,
  hasRadiusBorder = false,
  displayInLine = false,
  context = "default",
  mediaWidth,
  mediaheight,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}: {
  imageUrlPortrait?: string;
  imageUrlLandscape?: string;
  title?: string;
  description?: string;
  hasRadiusBorder?: boolean;
  displayInLine?: boolean;
  context?: "carousel" | "default";
  mediaWidth?: string;
  mediaheight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === Orientation.Portrait;
  const isLaptop = useAboveTablet();

  const imageUrl = isPortrait ? imageUrlPortrait : imageUrlLandscape;

  const isSquareFullWidth = !isLaptop && isPortrait;

  const cardStyle = {
    cursor: "none",
    width:
      !isSquareFullWidth && mediaWidth
        ? mediaWidth
        : isSquareFullWidth
          ? "100%"
          : context === "carousel"
            ? "50vw"
            : "100%",
    marginTop: (!isSquareFullWidth && marginTop) || undefined,
    marginBottom: (!isSquareFullWidth && marginBottom) || undefined,
    marginRight: (!isSquareFullWidth && marginRight) || undefined,
    marginLeft: (!isSquareFullWidth && marginLeft) || undefined,
    height: !isSquareFullWidth && mediaheight ? mediaheight : undefined,
    "--card-aspect": isSquareFullWidth ? "1 / 1" : "initial",
  } as React.CSSProperties & { [key: string]: string };

  const contentStyle = {
    width: cardStyle["--card-width"],
  } as React.CSSProperties;

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleEnter = () => setCursorVisible(true);
    const handleLeave = () => setCursorVisible(false);

    const el = containerRef.current;
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div>
      <motion.figure
        className={cx("card__media", {
          "card__media--hasBorderRadius": hasRadiusBorder,
        })}
        style={cardStyle}
        ref={containerRef}
        onMouseMove={(e) => {
          const rect = containerRef.current!.getBoundingClientRect();
          setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
        initial={{ scale: 1 }}
        whileHover={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <motion.img
          src={imageUrl}
          alt={title || "card image"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: hasRadiusBorder ? "1rem" : "0",
            y,
          }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: cursorVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: "absolute", pointerEvents: "none" }}
        >
          <Cursor position={cursorPos} />
        </motion.div>
      </motion.figure>

      <div
        className={cx("content", {
          "content--inline": displayInLine,
        })}
        style={contentStyle}
      >
        {title && <h5>{title}</h5>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default Cards;