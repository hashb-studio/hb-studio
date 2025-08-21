import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Contacts.module.scss";

const cx = classNames.bind(styles);

export const Contacts = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  return (
    <section ref={ref} className={cx("contacts")}>
      <div className={cx("sticky")}>
        <motion.h2 style={{ x }} className={cx("text")}>
          On en parle ?
        </motion.h2>
      </div>
    </section>
  );
};

export default Contacts;
