import { getAllProjects } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import ProjectContent from "@/views/projects/component";
import type { Metadata } from "@/lib/metadata";

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
