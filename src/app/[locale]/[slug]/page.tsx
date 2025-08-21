import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";

type tParamsSlug = Promise<{ locale: string; slug: string }>;
export default async function ProjectDetailsPage(props: {
  params: tParamsSlug;
}) {
  const { slug, locale } = await props.params;
  console.log(slug, locale);

  return <ProjectDetails />;
}
