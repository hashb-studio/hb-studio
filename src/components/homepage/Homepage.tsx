"use client";

import { useTranslations } from "next-intl";
import React from "react";

const Homepage = () => {
  const t = useTranslations("HomePage");
  return (
    <>
      <h1>{t("title")}</h1>
      <p>test</p>
    </>
  );
};

export default Homepage;
