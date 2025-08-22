import { ProjectDetails } from "@/components/pages/ProjectDetails/ProjectDetails";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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

type tParamsSlug = Promise<{ locale: string; slug: string }>;
export default async function ProjectDetailsPage(props: {
  params: tParamsSlug;
}) {
  const { slug, locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Projects" });
  setRequestLocale(locale);
  if (!t.has(`${slug}.id`)) {
    notFound();
  }

  const project = t.raw(slug) as Project;
  return <ProjectDetails project={project} />;
}
