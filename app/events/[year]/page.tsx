import { getAllEvents } from "@/app/api";
import EventsContent from "@/app/events/component";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = (await params).year;
  return {
    title: `${year} / Events / Anand Chowdhary`,
    description: `From time to time, Anand Chowdhary speaks at startup events and technical conferences about engineering, design, and entrepreneurship.`,
  };
}

export default async function Page({ params }: Props) {
  const { year } = await params;
  if (!/^\d{4}$/.test(year)) notFound();
  const yearNumber = parseInt(year);
  const eventsDataFiltered = await getAllEvents();
  const yearEventsData = eventsDataFiltered.filter(
    (post) => new Date(post.date).getUTCFullYear() === yearNumber
  );
  return <EventsContent eventsDataFiltered={yearEventsData} year={year} />;
}
