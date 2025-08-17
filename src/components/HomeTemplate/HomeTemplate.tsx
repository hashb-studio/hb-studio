"use client";

import React from "react";
import { Hero } from "../Hero/Hero";
import { AnimatedThumbnails } from "@/components/AnimatedThumbnails/AnimatedThumbnails";
import { Head } from "../Head/Head";

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
  cards: [
    {
      imageUrlPortrait: "/images/kid-6582547_1280.jpg",
      imageUrlLandscape: "/images/kid-6582547_1280.jpg",
      title: "Carte 1",
      description: "Description 1",
      hoverText: "See more",
      mediaWidth: "40vw",
      mediaheight: "50vh",
    },
    {
      marginTop: "20vw",
      imageUrlPortrait: "/images/vancouver-7434702_640.jpg",
      imageUrlLandscape: "/images/vancouver-7434702_640.jpg",
      title: "Carte 2",
      description: "Description 2",
      mediaheight: "35vh",
      mediaWidth: "35vw",
    },
    {
      mediaWidth: "35vw",
      mediaheight: "35vh",
      imageUrlPortrait: "/images/vietnam-9757895_1280.png",
      imageUrlLandscape: "/images/vietnam-9757895_1280.png",
      title: "Carte 3",
      description: "Description 3",
      marginRight: "10vw",
    },
    {
      marginTop: "10vw",
      imageUrlPortrait: "/images/horse-9531049_1280.jpg",
      imageUrlLandscape: "/images/horse-9531049_1280.jpg",
      title: "Carte 4",
      description: "Description 4",
      mediaWidth: "34vw",
      mediaheight: "45vh",
    },
    {
      imageUrlPortrait: "/images/nature-9558835_1280.jpg",
      imageUrlLandscape: "/images/nature-9558835_1280.jpg",
      title: "Carte 5",
      description: "Description 5",
      mediaWidth: "50vw",
    },
  ] as CardType[],
};

const HomeTemplate = () => {
  return (
    <>
      <Head />
      <Hero />
      <div>
        <AnimatedThumbnails cards={payload.cards} />
      </div>
    </>
  );
};

export default HomeTemplate;
