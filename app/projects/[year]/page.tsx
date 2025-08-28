import { getAllProjects } from "@/app/api";
import ProjectContent from "@/app/projects/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Projects / Anand Chowdhary`,
    description: `Projects I built in ${year}, from small experiments to full-scale products.`,
  };
}

export default async function ProjectYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const projectDataFiltered = await getAllProjects();
  const yearProjectData = projectDataFiltered.filter(
    (project) => new Date(project.date).getUTCFullYear() === yearNumber
  );
  return <ProjectContent projectDataFiltered={yearProjectData} year={year} />;
}
