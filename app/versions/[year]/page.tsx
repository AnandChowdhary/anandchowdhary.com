import { getAllVersions } from "@/app/api";
import VersionContent from "@/app/versions/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Versions / Anand Chowdhary`,
    description: `Over the years, I've designed and redesigned my personal website several times; I ﬁnd it to be a great way to explore new technologies. Looking back, I can connect the dots for what I was interested in way back when.`,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const versions = await getAllVersions();
  const years = Array.from(
    new Set(
      versions.map((version) =>
        new Date(version.date).getUTCFullYear().toString(),
      ),
    ),
  );
  return years.map((year) => ({ year }));
}

export default async function VersionYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allVersions = await getAllVersions();
  const yearVersionData = allVersions.filter(
    (version) => new Date(version.date).getUTCFullYear() === yearNumber,
  );

  // Get all years that have versions
  const availableYears = Array.from(
    new Set(
      allVersions.map((version) => new Date(version.date).getUTCFullYear()),
    ),
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
    <VersionContent
      versionDataFiltered={yearVersionData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
