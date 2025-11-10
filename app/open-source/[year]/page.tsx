import { getAllOpenSource } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import OpenSourceContent from "@/app/open-source/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Open Source / Anand Chowdhary`,
    description: `Open source projects and contributions from ${year} by Anand Chowdhary.`,
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/open-source/${year}`),
        },
      ],
    },
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const repos = await getAllOpenSource();
  const years = Array.from(
    new Set(
      repos.map((repo) => new Date(repo.date).getUTCFullYear().toString()),
    ),
  );
  return years.map((year) => ({ year }));
}

export default async function OpenSourceYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allRepos = await getAllOpenSource();
  const yearReposData = allRepos.filter(
    (repo) => new Date(repo.date).getUTCFullYear() === yearNumber,
  );

  // Get all years that have open source repos
  const availableYears = Array.from(
    new Set(allRepos.map((repo) => new Date(repo.date).getUTCFullYear())),
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
    <OpenSourceContent
      reposDataFiltered={yearReposData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
