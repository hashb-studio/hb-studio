"use client";

import React from "react";
import { payload } from "../Cards/Cards";
import Contacts from "../sections/Contacts/Contacts";
import { Hero } from "../sections/Hero/Hero";
import { Head } from "@/components/layouts/Head/Head";
import { AnimatedThumbnails } from "../sections/AnimatedThumbnails/AnimatedThumbnails";
import Services, { services } from "../sections/Services/Services";

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
