"use client";

import React from "react";
import { Hero } from "../../sections/Hero/Hero";
import Services, { services } from "../../sections/Services/Services";
import { payload } from "../../Cards/Cards";
import { Head } from "@/components/layouts/Head/Head";
import { AnimatedThumbnails } from "@/components/sections/AnimatedThumbnails/AnimatedThumbnails";
import Contacts from "@/components/sections/Contacts/Contacts";

const HomeTemplate = () => {
  return (
    <>
      <Head />
      <main>
        <Hero />
        <AnimatedThumbnails cards={payload.cards} />
        <Services services={services} />
        <Contacts />
      </main>
    </>
  );
};

export default HomeTemplate;
