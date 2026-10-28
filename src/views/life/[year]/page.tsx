import { getLifeEvents } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import LifeContent from "@/views/life/component";
import type { Metadata } from "@/lib/metadata";
import { notFound } from "@/lib/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Life / Anand Chowdhary`,
    description: `Major milestones and meaningful moments from ${year} that have shaped my personal and professional journey.`,
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/life/${year}`),
        },
      ],
    },
  };
}


export default async function LifeYear({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const allLifeEvents = await getLifeEvents();
  const yearLifeData = allLifeEvents.filter(
    (event) => new Date(event.date).getUTCFullYear() === yearNumber,
  );

  // Get all years that have life events
  const availableYears = Array.from(
    new Set(
      allLifeEvents.map((event) => new Date(event.date).getUTCFullYear()),
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
    <LifeContent
      lifeEventsData={yearLifeData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
