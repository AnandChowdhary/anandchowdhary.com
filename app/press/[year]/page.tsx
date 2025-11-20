import { getPress, getAllPressItems } from "@/app/api";
import { buildScreenshotOpenGraphImageUrl } from "@/app/lib/opengraph";
import PressContent from "@/app/press/component";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Press / Anand Chowdhary`,
    description: `Press coverage and media mentions from ${year} featuring Anand Chowdhary.`,
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/press/${year}`),
        },
      ],
    },
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
  const allPressItems = await getAllPressItems();
  const foundPressItem = allPressItems.find(
    (item) => item.slug?.replace(".md", "") === year
  );
  if (foundPressItem && foundPressItem.slug)
    redirect(
      `/press/${new Date(
        foundPressItem.date
      ).getUTCFullYear()}/${foundPressItem.slug.replace(".md", "")}`
    );

  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);

  const pressData = await getPress();

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
