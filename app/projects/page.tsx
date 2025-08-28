import { getAllProjects } from "@/app/api";
import ProjectContent from "@/app/projects/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects / Anand Chowdhary",
  description:
    "Projects I've built over the years, from small experiments to full-scale products.",
};

export default async function Projects() {
  const projectDataFiltered = await getAllProjects();
  return <ProjectContent projectDataFiltered={projectDataFiltered} />;
}
