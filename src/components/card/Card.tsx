import React from "react";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { useAboveTablet } from "@/hooks/useMediaQuery";

const cx = classNames.bind(styles);

export const Card = ({
  imageUrlPortrait,
  imageUrlLandscape,
  title,
  description,
  hasRadiusBorder = false,
  displayInLine = false,
  context = "default",
  hoverText,
  hoverLink,
  size,
  marginTop,
  marginBottom,
}: {
  imageUrlPortrait?: string;
  imageUrlLandscape?: string;
  title?: string;
  description?: string;
  hasRadiusBorder?: boolean;
  displayInLine?: boolean;
  context?: "carousel" | "default";
  hoverText?: string;
  hoverLink?: string;
  size?: string;
  marginTop?: string;
  marginBottom?: string;
}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === Orientation.Portrait;
  const isLaptop = useAboveTablet();

  const imageUrl = isPortrait ? imageUrlPortrait : imageUrlLandscape;

  const isSquareFullWidth = !isLaptop && isPortrait;

  const wrapperStyle: React.CSSProperties = {
    width:
      !isSquareFullWidth && size
        ? size
        : isSquareFullWidth
          ? "100%"
          : context === "carousel"
            ? "50vw"
            : "30vw",
    marginTop: marginTop || undefined,
    marginBottom: marginBottom || undefined,
    alignItems: "flex-start",
  };

  const cardStyle = {
    "--card-width": isSquareFullWidth
      ? "100%"
      : context === "carousel"
        ? "50vw"
        : !isSquareFullWidth && size
          ? size
          : "30vw",
    "--card-height": context === "carousel" ? "70vh" : "30vh",
    "--card-aspect": isSquareFullWidth ? "1 / 1" : "initial",
  } as React.CSSProperties & { [key: string]: string };

  const contentStyle = {
    width: cardStyle["--card-width"],
  } as React.CSSProperties;

  return (
    <div className={cx("card__wrapper")} style={wrapperStyle}>
      <figure
        className={cx("card__media", {
          "card__media--hasBorderRadius": hasRadiusBorder,
        })}
        style={cardStyle}
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
        {hoverText &&
          (hoverLink ? (
            <a
              href={hoverLink}
              className={cx("card__hoverOverlay", "card__hoverLink")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{hoverText}</span>
            </a>
          ) : (
            <div className={cx("card__hoverOverlay")}>
              <h2>{hoverText}</h2>
            </div>
          ))}
      </figure>

      <div
        className={cx("card__content", {
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
