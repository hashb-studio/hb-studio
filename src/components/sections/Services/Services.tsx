import React, { useRef } from "react";
import Service from "./Service/Service";
import classNames from "classnames/bind";
import styles from "./Services.module.scss";
import { useScroll, motion, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const cx = classNames.bind(styles);

const services = [
  {
    tags: ["Mobile App", "PWA", "Performance", "Design System"],
    backgroundColor: "#00C9A7",
    dynamicColor: "#FFFFFF",
  },
  {
    tags: ["UI Design", "UX Design", "Showcase Site", "Ecommerce Site"],
    backgroundColor: "#B3B3B3",
    dynamicColor: "#000000",
  },
  {
    tags: ["Visual Identity", "Animation", "Prototyping", "UX Audit"],
    backgroundColor: "#FF6B6B",
    dynamicColor: "#FFFFFF",
  },
];

const Services = () => {
  const t = useTranslations("Services");

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const inputRange = services.map((_, i) => i / (services.length - 1));
  const outputRange = services.map((s) => s.backgroundColor);
  const outputColor = services.map((s) => s.dynamicColor);

  const background = useTransform(scrollYProgress, inputRange, outputRange);
  const colorMV = useTransform(scrollYProgress, inputRange, outputColor);

  const [dynamicColor, setDynamicColor] = React.useState(outputColor[0]);
  React.useEffect(() => {
    const unsubscribe = colorMV.on("change", (v) => setDynamicColor(v));
    return unsubscribe;
  }, [colorMV]);

  return (
    <motion.section
      className={cx("services")}
      ref={containerRef}
      style={{
        background,
        minHeight: "100vh",
        padding: "4rem 2rem",
      }}
      id="services"
    >
      <ul>
        {services.map((service, i) => (
          <Service
            key={i}
            {...service}
            dynamicColor={dynamicColor}
            title={t(`${i}.title`)}
            description={[
              t(`${i}.description1`),
              t(`${i}.description2`),
              t(`${i}.description3`),
            ]}
          />
        ))}
      </ul>
    </motion.section>
  );
};

export default Services;
