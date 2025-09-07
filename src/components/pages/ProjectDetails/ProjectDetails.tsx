/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Head } from "@/components/layouts/Head/Head";
import classNames from "classnames/bind";
import React, { useMemo, useCallback } from "react";
import styles from "./ProjectDetails.module.scss";
import { Badge } from "@/components/Badge/Badge";
import { BlocDetails } from "@/components/BlocDetails/BlocDetails";
import { ExternalLink, LucideIcon, SquareCode } from "lucide-react";
import {
  useReducedMotion,
  motion,
  LazyMotion,
  domAnimation,
} from "motion/react";

const cx = classNames.bind(styles);

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  technologies: string[];
  category: string;
  demoUrl: string;
  githubUrl: string;
  features: string[];
}

interface ActionButton {
  label: string;
  href?: string;
  Icon?: LucideIcon;
}

interface ProjectDetailProps {
  project: Project;
}

type AnimationVariants = Record<string, unknown>;

// Variants d'animation extraits et optimisés
const ANIMATION_VARIANTS: AnimationVariants = {
  containerStagger: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  },
  fromTop: {
    hidden: { opacity: 0, y: -12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 140, damping: 18 },
    },
  },
  fromUp: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 140, damping: 18 },
    },
  },
  fromRight: {
    hidden: { opacity: 0, x: 24 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 140, damping: 18 },
    },
  },
};

// Variants pour les utilisateurs avec motion réduit
const REDUCED_MOTION_VARIANTS: AnimationVariants = {
  containerStagger: {
    hidden: {},
    show: { transition: { duration: 0 } },
  },
  fromTop: {
    hidden: { opacity: 0, y: -12 },
    show: { opacity: 1, y: 0, transition: { duration: 0 } },
  },
  fromUp: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0 } },
  },
  fromRight: {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0 } },
  },
};

export const ProjectDetails = ({ project }: ProjectDetailProps) => {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? REDUCED_MOTION_VARIANTS : ANIMATION_VARIANTS;

  const actionButtons = useMemo<ActionButton[]>(
    () => [
      {
        label: "Demo",
        href: project.demoUrl,
        Icon: ExternalLink,
      },
      {
        label: "Code source",
        href: project.githubUrl,
        Icon: SquareCode,
      },
    ],
    [project.demoUrl, project.githubUrl],
  );

  const leftColumnSections = useMemo(
    () => [
      {
        id: "description",
        title: "Description du projet",
        content: <p>{project.longDescription}</p>,
      },
      {
        id: "features",
        title: "Fonctionnalités principales",
        content: (
          <div className={cx("features-list")}>
            {project.features.map((f, index) => (
              <React.Fragment key={f}>
                <div className={cx("feature-item")}>{f}</div>
                {index < project.features.length - 1 && (
                  <div className={cx("feature-separator")} />
                )}
              </React.Fragment>
            ))}
          </div>
        ),
      },
    ],
    [project.longDescription, project.features],
  );

  const rightColumnSections = useMemo(
    () => [
      {
        id: "technologies",
        title: "Technologies utilisées",
        content: (
          <div className={cx("tech-list")}>
            {project.technologies.map((t) => (
              <Badge key={t} label={t} />
            ))}
          </div>
        ),
      },
      {
        id: "info",
        title: "Informations",
        content: <p>Catégorie : {project.category}</p>,
      },
    ],
    [project.technologies, project.category],
  );

  const handleInteraction = useCallback(
    (type: "hover" | "tap") => {
      if (reducedMotion) return undefined;

      return type === "hover" ? { y: -2 } : { scale: 0.98 };
    },
    [reducedMotion],
  );

  return (
    <LazyMotion features={domAnimation}>
      <Head />
      <main className={cx("project-details")}>
        <section className={cx("project-details__container")}>
          <motion.div
            className={cx("project-details__header")}
            viewport={{ once: true, amount: 0.3 }}
            variants={variants.fromTop as any}
            initial="hidden"
            animate="show"
          >
            <Badge label={project.category} />
            <h2>{project.title}</h2>
          </motion.div>

          <motion.p
            viewport={{ once: true, amount: 0.3 }}
            variants={variants.fromUp as any}
            initial="hidden"
            animate="show"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants.containerStagger as any}
            className={cx("project-details__buttons")}
          >
            {actionButtons
              .filter((b) => !!b.href)
              .map((button, index) => (
                <motion.a
                  key={index}
                  className={cx(
                    "project-details__button",
                    index === 0
                      ? "project-details__button--red"
                      : "project-details__button--white",
                  )}
                  href={button.href}
                  variants={variants.fromUp as any}
                  whileHover={handleInteraction("hover")}
                  whileTap={handleInteraction("tap")}
                >
                  {button.Icon && (
                    <button.Icon
                      aria-hidden="true"
                      className={cx("project-details__icon")}
                    />
                  )}
                  <span>{button.label}</span>
                </motion.a>
              ))}
          </motion.div>
        </section>

        <section className={cx("project-details__bloc-details")}>
          <motion.div
            className={cx("project-details__col", "project-details__col--left")}
            initial="hidden"
            animate="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants.containerStagger as any}
          >
            {leftColumnSections.map((section) => (
              <motion.div key={section.id} variants={variants.fromUp as any}>
                <BlocDetails>
                  {section.title && <h3>{section.title}</h3>}
                  {section.content}
                </BlocDetails>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={cx(
              "project-details__col",
              "project-details__col--right",
            )}
            initial="hidden"
            animate="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={variants.containerStagger as any}
          >
            {rightColumnSections.map((section) => (
              <motion.div key={section.id} variants={variants.fromRight as any}>
                <BlocDetails key={section.id}>
                  {section.title && <h3>{section.title}</h3>}
                  {section.content}
                </BlocDetails>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </LazyMotion>
  );
};
