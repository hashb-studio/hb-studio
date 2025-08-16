import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { useAboveTablet } from "@/hooks/useMediaQuery";
import Cursor from "../Cursor/Cursor";

const cx = classNames.bind(styles);

export const Card = ({
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkCursorVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInside =
          cursorPos.x >= rect.left &&
          cursorPos.x <= rect.right &&
          cursorPos.y >= rect.top &&
          cursorPos.y <= rect.bottom;

        setCursorVisible(isInside);
      }
    };

    checkCursorVisibility();
    window.addEventListener("scroll", checkCursorVisibility);

    return () => {
      window.removeEventListener("scroll", checkCursorVisibility);
    };
  }, [cursorPos]);

  return (
    <div>
      <figure
        className={cx("card__media", {
          "card__media--hasBorderRadius": hasRadiusBorder,
        })}
        style={cardStyle}
        ref={containerRef}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
      >
        <img
          src={imageUrl}
          alt={title || "card image"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: hasRadiusBorder ? "1rem" : "0",
          }}
        />
        {cursorVisible && <Cursor position={cursorPos} />}
      </figure>

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
