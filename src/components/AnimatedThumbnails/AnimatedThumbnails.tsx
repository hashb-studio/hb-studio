import React from "react";
import styles from "./AnimatedThumbnails.module.scss";
import classNames from "classnames/bind";
import { AnimatedLogo } from "../AnimatedLogo/AnimatedLogo";
import { Card } from "../Card/Card";

const cx = classNames.bind(styles);

type AnimatedThumbnailsProps = {
  cards: {
    imageUrlPortrait?: string;
    imageUrlLandscape?: string;
    title?: string;
    description?: string;
    hasRadiusBorder?: boolean;
    hoverText?: string;
    hoverLink?: string;
    size?: string;
    marginTop?: string;
    marginBottom?: string;
  }[];
};

export const AnimatedThumbnails: React.FC<AnimatedThumbnailsProps> = ({
  cards,
}) => {
  const isOdd = cards.length % 2 !== 0;

  return (
    <section className={cx("animated-thumbnails")}>
      <AnimatedLogo />
      <div
        className={cx("animated-thumbnails__grid", {
          "odd-number": isOdd,
        })}
      >
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  );
};