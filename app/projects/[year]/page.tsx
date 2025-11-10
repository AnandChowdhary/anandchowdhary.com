import { getAllProjects } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
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
    description: `Projects I built in ${year}, from small experiments to full-scale products for my startups.`,
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/projects/${year}`),
        },
      ],
    },
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const projects = await getAllProjects();
  const years = Array.from(
    new Set(
      projects.map((project) =>
        new Date(project.date).getUTCFullYear().toString()
      )
    )
  );
  return years.map((year) => ({ year }));
}

export default async function ProjectYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allProjects = await getAllProjects();
  const yearProjectData = allProjects.filter(
    (project) => new Date(project.date).getUTCFullYear() === yearNumber
  );

  // Get all years that have projects
  const availableYears = Array.from(
    new Set(
      allProjects.map((project) => new Date(project.date).getUTCFullYear())
    )
  ).sort((a, b) => a - b);

  // Find previous and next years
  const currentYearIndex = availableYears.indexOf(yearNumber);
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined;
  const nextYear =
    currentYearIndex < availableYears.length - 1
      ? availableYears[currentYearIndex + 1]
      : undefined;

  return (
    <ProjectContent
      projectDataFiltered={yearProjectData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
