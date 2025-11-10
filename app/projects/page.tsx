import { getAllProjects } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import ProjectContent from "@/app/projects/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects / Anand Chowdhary",
  description:
    "Projects I've built over the years, from small experiments to full-scale products for my startups.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/projects"),
      },
    ],
  },
};

export default async function Projects() {
  const projectDataFiltered = await getAllProjects();
  return <ProjectContent projectDataFiltered={projectDataFiltered} />;
}
