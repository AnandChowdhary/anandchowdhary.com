import { getAllEvents } from "@/app/api";
import EventsContent from "@/app/events/component";
import { notFound } from "next/navigation";

export default async function EventsYear({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const eventsDataFiltered = await getAllEvents();
  const yearEventsData = eventsDataFiltered.filter(
    (post) => new Date(post.date).getUTCFullYear() === yearNumber
  );
  return <EventsContent eventsDataFiltered={yearEventsData} year={year} />;
}
