import { getAllProjects, getProjectTags } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import ProjectContent from "@/views/projects/component";
import slugify from "@sindresorhus/slugify";
import type { Metadata } from "@/lib/metadata";
import { notFound } from "@/lib/navigation";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = (await params).tag;
  const projects = await getAllProjects();
  const tags = projects.flatMap(getProjectTags);
  const found = tags.find((t) => slugify(t.toLowerCase()) === tag);
  if (!found) notFound();
  return {
    title: `${found} / Projects / Anand Chowdhary`,
    description: `Projects I built with the tag ${found}.`,
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/projects/tags/${tag}`),
        },
      ],
    },
  };
}

export default async function ProjectYear({ params }: Props) {
  const { tag } = await params;
  const projects = await getAllProjects();
  const tags = projects.flatMap(getProjectTags);
  const found = tags.find((t) => slugify(t.toLowerCase()) === tag);
  if (!found) notFound();
  const projectDataFiltered = await getAllProjects();
  const tagProjectData = projectDataFiltered.filter((project) =>
    getProjectTags(project).includes(found),
  );
  return <ProjectContent projectDataFiltered={tagProjectData} tag={found} />;
}
