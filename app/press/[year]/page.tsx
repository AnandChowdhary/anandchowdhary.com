import { getPress, getAllPressItems } from "@/app/api";
import PressContent from "@/app/press/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Press / Anand Chowdhary`,
    description: `Press coverage and media mentions from ${year} featuring Anand Chowdhary.`,
  };
}

export const revalidate = 60;
export async function generateStaticParams(): Promise<{ year: string }[]> {
  const allPressItems = await getAllPressItems();
  const years = Array.from(
    new Set(
      allPressItems.map((item) =>
        new Date(item.date).getUTCFullYear().toString(),
      ),
    ),
  );
  return years.map((year) => ({ year }));
}

export default async function PressYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const pressData = await getPress();
  const allPressItems = await getAllPressItems();

  // Filter each category by year
  const yearPressData = {
    awards: pressData.awards.filter(
      (item) => new Date(item.date).getUTCFullYear() === yearNumber,
    ),
    podcasts: pressData.podcasts.filter(
      (item) => new Date(item.date).getUTCFullYear() === yearNumber,
    ),
    features: pressData.features.filter(
      (item) => new Date(item.date).getUTCFullYear() === yearNumber,
    ),
  };

  // Get all years that have press items
  const availableYears = Array.from(
    new Set(allPressItems.map((item) => new Date(item.date).getUTCFullYear())),
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
    <PressContent
      pressData={yearPressData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
