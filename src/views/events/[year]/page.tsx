import { getAllEvents } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import EventsContent from "@/views/events/component";
import type { Metadata } from "@/lib/metadata";
import { notFound, redirect } from "@/lib/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Events / Anand Chowdhary`,
    description: `From time to time, Anand Chowdhary speaks at startup events and technical conferences about engineering, design, and entrepreneurship.`,
    openGraph: {
      images: [
        {
          url: buildScreenshotOpenGraphImageUrl(`/events/${year}`),
        },
      ],
    },
  };
}


export default async function Page({ params }: Props) {
  const { year } = await params;
  const allEvents = await getAllEvents();
  const foundEvent = allEvents.find(
    (event) => event.slug.replace(".md", "") === year
  );
  if (foundEvent)
    redirect(
      `/events/${new Date(
        foundEvent.date
      ).getUTCFullYear()}/${foundEvent.slug.replace(".md", "")}`
    );

  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const yearEventsData = allEvents.filter(
    (post) => new Date(post.date).getUTCFullYear() === yearNumber,
  );

  // Get all years that have events
  const availableYears = Array.from(
    new Set(allEvents.map((event) => new Date(event.date).getUTCFullYear())),
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
    <EventsContent
      eventsDataFiltered={yearEventsData}
      year={year}
      previousYear={previousYear}
      nextYear={nextYear}
    />
  );
}
