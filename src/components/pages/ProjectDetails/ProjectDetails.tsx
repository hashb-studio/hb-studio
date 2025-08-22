/* eslint-disable @next/next/no-img-element */
import { Head } from "@/components/layouts/Head/Head";
import classNames from "classnames/bind";
import React from "react";
import styles from "./ProjectDetails.module.scss";
import { Badge } from "@/components/Badge/Badge";
import { BlocDetails } from "@/components/BlocDetails/BlocDetails";

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

interface ProjectDetailProps {
  project: Project;
}

export const ProjectDetails = ({ project }: ProjectDetailProps) => {
  const dataButtons = [
    {
      label: "Demo",
      onClick: project.demoUrl,
      icon: "",
    },
    {
      label: "Code source",
      onClick: project.githubUrl,
      icon: "",
    },
  ];

  const leftColumnSections = [
    {
      id: "image",
      content: <img src="" alt="" />,
    },
    {
      id: "description",
      title: "Description du projet",
      content: <p>{project.longDescription}</p>,
    },
    {
      id: "features",
      title: "Fonctionnalités principales",
      content: (
        <ul>
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
  ];

  const rightColumnSections = [
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
  ];

  return (
    <>
      <Head />
      <main className={cx("project-details")}>
        <section className={cx("project-details__container")}>
          <div className={cx("project-details__header")}>
            <Badge label={project.category} />
            <h2>{project.title}</h2>
          </div>
          <p>{project.description}</p>
          <div className={cx("project-details__buttons")}>
            {dataButtons.map((button, index) => (
              <a
                key={index}
                className={cx(
                  "project-details__button",
                  index === 0
                    ? "project-details__button--red"
                    : "project-details__button--white",
                )}
                href={button.onClick}
              >
                {button.label}
              </a>
            ))}
          </div>
        </section>
        <section className={cx("project-details__bloc-details")}>
          <div
            className={cx("project-details__col", "project-details__col--left")}
          >
            {leftColumnSections.map((section) => (
              <BlocDetails key={section.id}>
                {section.title && <h3>{section.title}</h3>}
                {section.content}
              </BlocDetails>
            ))}
          </div>

          <div
            className={cx(
              "project-details__col",
              "project-details__col--right",
            )}
          >
            {rightColumnSections.map((section) => (
              <BlocDetails key={section.id}>
                {section.title && <h3>{section.title}</h3>}
                {section.content}
              </BlocDetails>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
