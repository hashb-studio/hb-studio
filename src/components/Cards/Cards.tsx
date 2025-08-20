import React, { useEffect, useRef, useState } from "react";
import styles from "./Cards.module.scss";
import classNames from "classnames/bind";
import { Orientation, useOrientation } from "@/hooks/useOrientation";
import { useAboveTablet } from "@/hooks/useMediaQuery";
import { Cursor } from "../Cursor/Cursor";
import { useScroll, useTransform, motion, useInView } from "framer-motion";

const cx = classNames.bind(styles);

type CardType = {
  imageUrlPortrait?: string;
  imageUrlLandscape?: string;
  videoMedia?: string;
  title?: string;
  description?: string;
  hasRadiusBorder?: boolean;
  hoverText?: string;
  hoverLink?: string;
  mediaWidth?: string;
  mediaheight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
};

export const payload = {
  cards: [
    {
      imageUrlPortrait: "/images/kid-6582547_1280.jpg",
      imageUrlLandscape: "/images/kid-6582547_1280.jpg",
      title: "Expérience utilisateur fluide",
      description:
        "Nos solutions sont pensées pour être intuitives, accessibles et adaptées",
      mediaWidth: "40vw",
      mediaheight: "50vh",
    },
    {
      marginTop: "20vw",
      imageUrlPortrait: "/images/vancouver-7434702_640.jpg",
      imageUrlLandscape: "/images/vancouver-7434702_640.jpg",
      title: "Innovation",
      description:
        "Des templates pensés pour s’intégrer dans des projets modernes et agiles",
      mediaheight: "35vh",
      mediaWidth: "35vw",
    },
    {
      mediaWidth: "35vw",
      mediaheight: "35vh",
      imageUrlPortrait: "/images/vietnam-9757895_1280.png",
      imageUrlLandscape: "/images/vietnam-9757895_1280.png",
      title: "Ouverture internationale",
      description:
        "Des projets capables de s’adapter aux besoins globaux et multiculturels.",
      marginRight: "10vw",
    },
    {
      marginTop: "10vw",
      videoMedia: "/videos/barista_video.mp4",
      title: "Savoir-faire en action",
      description: "Des composants animés, entre précision et créativité",
      mediaWidth: "35vw",
      mediaheight: "35vh",
    },
    {
      imageUrlPortrait: "/images/nature-9558835_1280.jpg",
      imageUrlLandscape: "/images/nature-9558835_1280.jpg",
      title: "Durabilité et harmonie",
      description: "écologie et équilibre au cœur de nos conceptions.",
      mediaWidth: "50vw",
    },
  ] as CardType[],
};

const Cards = ({
  imageUrlPortrait,
  imageUrlLandscape,
  videoMedia,
  title,
  description,
  hasRadiusBorder = false,
  displayInLine = false,
  context = "default",
  mediaWidth,
  mediaheight,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}: {
  imageUrlPortrait?: string;
  imageUrlLandscape?: string;
  videoMedia?: string;
  title?: string;
  description?: string;
  hasRadiusBorder?: boolean;
  displayInLine?: boolean;
  context?: "carousel" | "default";
  mediaWidth?: string;
  mediaheight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === Orientation.Portrait;
  const isLaptop = useAboveTablet();

  const imageUrl = isPortrait ? imageUrlPortrait : imageUrlLandscape;

  const isSquareFullWidth = !isLaptop && isPortrait;

  const cardStyle = {
    cursor: "none",
    width:
      !isSquareFullWidth && mediaWidth
        ? mediaWidth
        : isSquareFullWidth
          ? "100%"
          : context === "carousel"
            ? "50vw"
            : "100%",
    marginTop: (!isSquareFullWidth && marginTop) || undefined,
    marginBottom: (!isSquareFullWidth && marginBottom) || undefined,
    marginRight: (!isSquareFullWidth && marginRight) || undefined,
    marginLeft: (!isSquareFullWidth && marginLeft) || undefined,
    height: !isSquareFullWidth && mediaheight ? mediaheight : undefined,
    "--card-aspect": isSquareFullWidth ? "1 / 1" : "initial",
  } as React.CSSProperties & { [key: string]: string };

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const isInView = useInView(containerRef, { amount: 0.8 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play();
    } else {
      video.pause();
    }
  }, [isInView]);

  const [zoomActive, setZoomActive] = useState(false);

  return (
    <div>
      <motion.figure
        className={cx("card__media", {
          "card__media--hasBorderRadius": hasRadiusBorder,
        })}
        style={cardStyle}
        ref={containerRef}
        onMouseMove={(e) => {
          if (!isLaptop) return;
          const rect = containerRef.current!.getBoundingClientRect();
          const padding = 5;
          const inside =
            e.clientX > rect.left - padding &&
            e.clientX < rect.right + padding &&
            e.clientY > rect.top - padding &&
            e.clientY < rect.bottom + padding;
          setCursorVisible(inside);
          setCursorPos({ x: e.clientX, y: e.clientY });

          if (inside) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const offsetX = Math.abs(e.clientX - centerX);
            const offsetY = Math.abs(e.clientY - centerY);

            const triggerPadding = 30;
            const insideZoom =
              offsetX < rect.width / 2 - triggerPadding &&
              offsetY < rect.height / 2 - triggerPadding;
            setZoomActive(insideZoom);
          } else {
            setZoomActive(false);
          }
        }}
        onMouseLeave={() => {
          if (!isLaptop) return;
          setCursorVisible(false);
          setZoomActive(false);
        }}
        animate={{ scale: zoomActive ? 0.9 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {!videoMedia ? (
          <motion.img
            src={imageUrl}
            alt={title || "card image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: hasRadiusBorder ? "1rem" : "0",
              y,
            }}
            animate={{ scale: zoomActive ? 1.3 : 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        ) : (
          <motion.video
            ref={videoRef}
            src={videoMedia}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: hasRadiusBorder ? "1rem" : "0",
            }}
            animate={{ scale: zoomActive ? 1.3 : 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            loop
            muted
            playsInline
          />
        )}
      </motion.figure>

      {cursorVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <Cursor position={cursorPos} />
        </motion.div>
      )}

      <div
        className={cx("content", {
          "content--inline": displayInLine,
        })}
      >
        {title && <h5>{title}</h5>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default Cards;
