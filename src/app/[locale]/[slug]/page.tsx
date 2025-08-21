import { ProjectDetails } from "@/components/pages/ProjectDetails/ProjectDetails";
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

const projects: Record<string, Project> = {
  "dependant-tv": {
    id: "dependant-tv",
    title: "Dependant.tv",
    description:
      "Un site portfolio pour une boite de production de réalisations audiovisuelles originales",
    longDescription: `Dependant.tv est un site portfolio moderne et élégant pour une boîte de production audiovisuelle. Le projet met en valeur leur créativité et leur expertise dans le domaine de la production vidéo.
      
      Le site présente leurs réalisations avec une interface intuitive et des animations fluides, permettant aux visiteurs de découvrir facilement leur portfolio de projets.`,
    images: [],
    technologies: ["React", "Next.js", "TypeScript", "SCSS", "Framer Motion"],
    category: "Frontend",
    demoUrl: "https://dependant.tv",
    githubUrl: "https://github.com/dependant-tv/portfolio",
    features: [
      "Design responsive et moderne",
      "Animations fluides avec Framer Motion",
      "Portfolio de projets audiovisuels",
      "Interface utilisateur intuitive",
      "Performance optimisée",
    ],
  },
  "ali-bensaali": {
    id: "ali-bensaali",
    title: "Ali Bensaali Portfolio",
    description: "Portfolio personnel d'un développeur créatif",
    longDescription: `Portfolio personnel moderne et créatif pour Ali Bensaali, développeur full-stack passionné par l'innovation et la créativité.`,
    images: [],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    category: "Frontend",
    demoUrl: "https://ali-bensaali.dev",
    githubUrl: "https://github.com/ali-bensaali/portfolio",
    features: [
      "Design moderne et minimaliste",
      "Animations créatives",
      "Portfolio de projets",
      "Blog intégré",
    ],
  },
  "labcom-optimaa": {
    id: "labcom-optimaa",
    title: "Labcom Optimaa",
    description: "Plateforme de laboratoire communautaire",
    longDescription: `Labcom Optimaa est une plateforme collaborative pour les laboratoires communautaires, facilitant le partage de ressources et la collaboration entre chercheurs.`,
    images: [],
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    category: "Fullstack",
    demoUrl: "https://labcom-optimaa.com",
    githubUrl: "https://github.com/labcom/optimaa",
    features: [
      "Gestion de projets collaboratifs",
      "Partage de ressources",
      "Système de messagerie",
      "Dashboard utilisateur",
    ],
  },
  "cocoa-bio": {
    id: "cocoa-bio",
    title: "Cocoa Bio",
    description: "Site e-commerce pour produits bio",
    longDescription: `Cocoa Bio est une boutique en ligne spécialisée dans les produits biologiques et durables, offrant une expérience d'achat éthique et responsable.`,
    images: [],
    technologies: ["React", "Next.js", "Stripe", "PostgreSQL"],
    category: "E-commerce",
    demoUrl: "https://cocoa-bio.com",
    githubUrl: "https://github.com/cocoa-bio/shop",
    features: [
      "Catalogue de produits bio",
      "Système de commande",
      "Paiements sécurisés",
      "Gestion des stocks",
    ],
  },
  "nature-project": {
    id: "nature-project",
    title: "Nature Project",
    description: "Projet de sensibilisation environnementale",
    longDescription: `Nature Project est une initiative de sensibilisation à l'environnement, combinant technologie et écologie pour créer un impact positif sur notre planète.`,
    images: [],
    technologies: ["React", "Three.js", "WebGL", "SCSS"],
    category: "Creative",
    demoUrl: "https://nature-project.org",
    githubUrl: "https://github.com/nature/project",
    features: [
      "Visualisations 3D interactives",
      "Contenu éducatif",
      "Animations immersives",
      "Interface écologique",
    ],
  },
};

type tParamsSlug = Promise<{ locale: string; slug: string }>;
export default async function ProjectDetailsPage(props: {
  params: tParamsSlug;
}) {
  const { slug } = await props.params;

  const project = projects[slug as keyof typeof projects];

  if (!project) {
    notFound();
  }
  return <ProjectDetails project={project} />;
}
