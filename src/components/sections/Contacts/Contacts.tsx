import {
  MotionStyle,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Contacts.module.scss";
import MailButton from "@/components/MailButton/MailButton";
import { useAboveTablet } from "@/hooks/useMediaQuery";
import TypeWriter from "@/components/TypeWritter/TypeWritter";

const cx = classNames.bind(styles);

export const Contacts = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const isLaptop = useAboveTablet();

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [isLaptop ? "40%" : "45%", isLaptop ? "-40%" : "-45%"],
  );

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.35, 0.5, 0.65, 0.8, 1],
    [-400, 0, -120, 0, -60, 0, 1000],
  );

  const y = useSpring(rawY, { stiffness: 220, damping: 16, mass: 0.6 });

  const infoRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(infoRef);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(isInView);
  }, [isInView]);

  return (
    <section>
      <div ref={ref} className={cx("contacts")} id="contact">
        <div className={cx("sticky")}>
          <motion.h2 style={{ x }} className={cx("text")}>
            On en parle ?
          </motion.h2>
          <motion.div
            style={{ y, x: "50%", translateX: "-50%" } as MotionStyle}
            className={cx("ball")}
          />
          <MailButton email="" className={cx("mail-button")} />
        </div>
      </div>
      <div ref={infoRef} className={cx("contact-info")}>
        <TypeWriter
          text="Instagram:"
          linkText="hbstudioparis2025"
          link="https://www.instagram.com/hbstudioparis2025/"
          start={startAnimation}
        />
        <TypeWriter
          text="E-Mail: hbstudioparis2025@gmail.com"
          start={startAnimation}
        />
      </div>
    </section>
  );
};

export default Contacts;
