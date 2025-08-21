import React from "react";
import styles from "./AnimatedThumbnails.module.scss";
import classNames from "classnames/bind";
import { AnimatedLogo } from "../AnimatedLogo/AnimatedLogo";
import Cards from "../Cards/Cards";
import { Link } from "@/i18n/navigation";

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
    slug?: string;
  }[];
};

export const AnimatedThumbnails: React.FC<AnimatedThumbnailsProps> = ({
  cards,
}) => {
  const isOdd = cards.length % 2 !== 0;

  return (
    <section className={cx("animated-thumbnails")} id="projects">
      <div
        className={cx("animated-thumbnails__grid", {
          "odd-number": isOdd,
        })}
      >
        <AnimatedLogo />
        {cards.map((card, index) => (
          <Link key={index} href={`/${card.slug}`}>
            <Cards key={index} {...card} />
          </Link>
        ))}
      </div>
    </section>
  );
};
