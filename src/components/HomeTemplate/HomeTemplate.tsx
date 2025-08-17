"use client";

import React from "react";
import { Hero } from "../Hero/Hero";
import { AnimatedThumbnails } from "@/components/AnimatedThumbnails/AnimatedThumbnails";
import { Head } from "../Head/Head";

type CardType = {
  imageUrlPortrait?: string;
  imageUrlLandscape?: string;
  videoMedia?: string;
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
      title: "Expérience utilisateur fluide",
      description:
        "Nos solutions sont pensées pour être intuitives, accessibles et adaptées",
      mediaWidth: "40vw",
      mediaheight: "50vh",
    },
    {
      marginTop: "20vw",
      imageUrlPortrait: "/images/vancouver-7434702_640.jpg",
      imageUrlLandscape: "/images/vancouver-7434702_640.jpg",
      title: "Innovation",
      description:
        "Des projets pensés pour s’intégrer dans des projets modernes et dynamiques",
      mediaheight: "35vh",
      mediaWidth: "35vw",
    },
    {
      mediaWidth: "35vw",
      mediaheight: "35vh",
      imageUrlPortrait: "/images/vietnam-9757895_1280.png",
      imageUrlLandscape: "/images/vietnam-9757895_1280.png",
      title: "Ouverture internationale",
      description:
        "Nous développons des projets capables de s’adapter aux besoins globaux et multiculturels.",
      marginRight: "10vw",
    },
    {
      marginTop: "10vw",
      videoMedia: "/videos/barista_video.mp4",
      title: "Savoir-faire en action",
      description:
        "Découvrez nos processus en mouvement, entre précision et créativité",
      mediaWidth: "35vw",
      mediaheight: "35vh",
    },
    {
      imageUrlPortrait: "/images/nature-9558835_1280.jpg",
      imageUrlLandscape: "/images/nature-9558835_1280.jpg",
      title: "Durabilité et harmonie",
      description:
        "Nous plaçons l’écologie et l’équilibre au cœur de nos conceptions.",
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
