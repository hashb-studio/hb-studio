import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Contacts.module.scss";
import MailButton from "@/components/MailButton/MailButton";
import { useAboveTablet } from "@/hooks/useMediaQuery";

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

  return (
    <section ref={ref} className={cx("contacts")}>
      <div className={cx("sticky")}>
        <motion.h2 style={{ x }} className={cx("text")}>
          On en parle ?
        </motion.h2>
        <MailButton email="" className={cx("mail-button")} />
      </div>
    </section>
  );
};

export default Contacts;
