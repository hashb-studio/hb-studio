import React, { useRef } from "react";
import Service, { ServiceProps } from "./Service/Service";
import classNames from "classnames/bind";
import styles from "./Services.module.scss";
import { useScroll, motion, useTransform } from "framer-motion";

export const services: ServiceProps[] = [
  {
    title: "Applications",
    description: [
      "Conception d’applications mobiles et web intuitives.",
      "Nous développons des expériences fluides pour vos utilisateurs.",
      "Optimisation des performances et maintenance continue.",
    ],
    tags: ["Application mobile", "PWA", "Performance", "Design system"],
    backgroundColor: "#00C9A7",
    dynamicColor: "#FFFFFF",
  },
  {
    title: "Sites Web",
    description: [
      "Création de sites vitrines modernes et performants.",
      "Nos sites sont pensés pour refléter votre identité et séduire vos clients.",
      "Responsive design et SEO intégré pour une visibilité optimale.",
    ],
    tags: ["UI Design", "UX Conception", "Site vitrine", "Site ecommerce"],
    backgroundColor: "#B3B3B3",
    dynamicColor: "#000",
  },
  {
    title: "Créatif",
    description: [
      "Nous imaginons des expériences digitales uniques.",
      "Un design impactant pour captiver et inspirer vos utilisateurs.",
      "Création d’animations et prototypes immersifs.",
    ],
    tags: ["Identité visuelle", "Animation", "Prototypage", "Audit UX"],
    backgroundColor: "#FF6B6B",
    dynamicColor: "#FFFFFF",
  },
];

interface Services {
  services: ServiceProps[];
}

const cx = classNames.bind(styles);

const Services = ({ services }: Services) => {
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
          <Service key={i} {...service} dynamicColor={dynamicColor} />
        ))}
      </ul>
    </motion.section>
  );
};

export default Services;
