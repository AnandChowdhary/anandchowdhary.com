import { getAllProjects, getProjectTags } from "@/app/api";
import ProjectContent from "@/app/projects/component";
import slugify from "@sindresorhus/slugify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
