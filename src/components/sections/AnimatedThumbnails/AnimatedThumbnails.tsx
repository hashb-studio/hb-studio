import React from "react";
import styles from "./AnimatedThumbnails.module.scss";
import classNames from "classnames/bind";
import { Link } from "@/i18n/navigation";
import { AnimatedLogo } from "@/components/AnimatedLogo/AnimatedLogo";
import Cards from "@/components/Cards/Cards";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

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
    slug: string;
  }[];
};

export const AnimatedThumbnails: React.FC<AnimatedThumbnailsProps> = ({
  cards,
}) => {
  const isOdd = cards.length % 2 !== 0;
  const { locale } = useParams();
  const t = useTranslations("AnimatedThumbnails");

  return (
    <section className={cx("animated-thumbnails")} id="projects">
      <div
        className={cx("animated-thumbnails__grid", {
          "odd-number": isOdd,
        })}
      >
        <AnimatedLogo />
        {cards.map((card, index) => (
          <Link key={index} href={`/${card.slug}`} locale={locale as string}>
            <Cards
              {...card}
              title={t(`${index}.title`)}
              description={t(`${index}.description`)}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
