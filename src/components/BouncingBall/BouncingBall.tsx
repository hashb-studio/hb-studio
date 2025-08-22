import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export const BouncingBall = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: ref });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y = useSpring(rawY, {
    stiffness: 200,
    damping: 10,
    mass: 0.5,
  });

  return (
    <section ref={ref} style={{ height: "200vh", position: "relative" }}>
      <motion.div
        style={{
          y,
          x: "50%",
          translateX: "-50%",
          position: "sticky",
          top: "40%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "blue",
        }}
      />
      <h2 style={{ position: "sticky", top: "60%" }}>On en parle ?</h2>
    </section>
  );
};
