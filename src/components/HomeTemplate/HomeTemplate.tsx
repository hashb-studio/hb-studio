"use client";

import React from "react";
import { Hero } from "../Hero/Hero";
import { AnimatedThumbnails } from "@/components/AnimatedThumbnails/AnimatedThumbnails";
import { Head } from "../Head/Head";
import Services, { services } from "../Services/Services";
import { payload } from "../Cards/Cards";
import Contacts from "../Contacts/Contacts";

const HomeTemplate = () => {
  return (
    <>
      <Head />
      <Hero />
      <AnimatedThumbnails cards={payload.cards} />
      <Services services={services} />
      <Contacts />
    </>
  );
};

export default HomeTemplate;
