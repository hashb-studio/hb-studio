"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { AnimatedThumbnails } from "../AnimatedThumbnails/AnimatedThumbnails";

type CardType = {
  imageUrlPortrait?: string;
  imageUrlLandscape?: string;
  title?: string;
  description?: string;
  hasRadiusBorder?: boolean;
  hoverText?: string;
  hoverLink?: string;
  size?: "s" | "l" | "xl";
};

export const payload = {
  header: {
    title: "Galerie Animée",
    description: "Découvrez nos images avec effets et tailles variées.",
  },
  cards: [
    {
      imageUrlPortrait: "https://fillthis.io/i/400x400",
      imageUrlLandscape: "https://fillthis.io/i/400x400",
      title: "Carte 1",
      description: "Description 1",
    },
    {
      marginTop: "20vw",
      imageUrlPortrait: "https://fillthis.io/i/400x400",
      imageUrlLandscape: "https://fillthis.io/i/400x400",
      title: "Carte 2",
      description: "Description 2",
      size: "20vw",
    },
    {
      imageUrlPortrait: "https://fillthis.io/i/400x400",
      imageUrlLandscape: "https://fillthis.io/i/400x400",
      title: "Carte 3",
      description: "Description 3",
    },
    {
      marginTop: "10vw",
      imageUrlPortrait: "https://fillthis.io/i/400x400",
      imageUrlLandscape: "https://fillthis.io/i/400x400",
      title: "Carte 4",
      description: "Description 4",
    },
    {
      imageUrlPortrait: "https://fillthis.io/i/400x400",
      imageUrlLandscape: "https://fillthis.io/i/400x400",
      title: "Carte 5",
      description: "Description 5",
      size: "50vw",
    },
  ] as CardType[],
};

const Homepage = () => {
  const t = useTranslations("HomePage");
  return (
    <>
      <h1>{t("title")}</h1>
      <div>
        <AnimatedThumbnails cards={payload.cards} header={payload.header} />
      </div>
    </>
  );
};

export default Homepage;
