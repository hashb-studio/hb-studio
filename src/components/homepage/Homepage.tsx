"use client";

import React from "react";
import { AnimatedThumbnails } from "../AnimatedThumbnails/AnimatedThumbnails";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";

type CardType = {
  imageUrlPortrait?: string;
  imageUrlLandscape?: string;
  title?: string;
  description?: string;
  hasRadiusBorder?: boolean;
  hoverText?: string;
  hoverLink?: string;
  mediaWidth?: string;
  mediaheight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
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
      hoverText: "See more",
      mediaWidth: "40vw",
      mediaheight: "50vh",
    },
    {
      marginTop: "20vw",
      imageUrlPortrait: "https://fillthis.io/i/400x400",
      imageUrlLandscape: "https://fillthis.io/i/400x400",
      title: "Carte 2",
      description: "Description 2",
      mediaheight: "35vh",
      mediaWidth: "35vw",
    },
    {
      mediaWidth: "35vw",
      mediaheight: "35vh",
      imageUrlPortrait: "https://fillthis.io/i/400x400",
      imageUrlLandscape: "https://fillthis.io/i/400x400",
      title: "Carte 3",
      description: "Description 3",
      marginRight: "10vw",
    },
    {
      marginTop: "10vw",
      imageUrlPortrait: "https://fillthis.io/i/400x400",
      imageUrlLandscape: "https://fillthis.io/i/400x400",
      title: "Carte 4",
      description: "Description 4",
      mediaWidth: "37vw",
    },
    {
      imageUrlPortrait: "https://fillthis.io/i/400x400",
      imageUrlLandscape: "https://fillthis.io/i/400x400",
      title: "Carte 5",
      description: "Description 5",
      mediaWidth: "50vw",
    },
  ] as CardType[],
};

const Homepage = () => {
  return (
    <>
    <Header />
    <Hero />
      <div>
        <AnimatedThumbnails cards={payload.cards} header={payload.header} />
      </div>
    </>
  );
};

export default Homepage;
