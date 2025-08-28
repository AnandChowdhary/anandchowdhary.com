import { getArchiveItemsByYear, getAllArchiveItems } from "@/app/api";
import ArchiveContent from "@/app/archive/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Archive / Anand Chowdhary`,
    description: `Browse through archived content and past projects from ${year} by Anand Chowdhary.`,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const archiveItems = await getAllArchiveItems();
  const years = Array.from(
    new Set(
      archiveItems.map((item) => new Date(item.date).getFullYear().toString()),
    ),
  );
  return years.map((year) => ({ year }));
}

export default async function ArchiveYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const archiveData = await getArchiveItemsByYear(yearNumber);
  if (archiveData.length === 0) notFound();

  // Get all archive items to find available years
  const allArchiveItems = await getAllArchiveItems();
  const availableYears = Array.from(
    new Set(allArchiveItems.map((item) => new Date(item.date).getFullYear())),
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
    <ArchiveContent
      archiveData={archiveData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
