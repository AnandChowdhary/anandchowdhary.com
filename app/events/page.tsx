import { getAllEvents } from "@/app/api";
import EventsContent from "@/app/events/component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events / Anand Chowdhary",
  description:
    "From time to time, Anand Chowdhary speaks at startup events and technical conferences about engineering, design, and entrepreneurship.",
};

export default async function Events() {
  const eventsDataFiltered = await getAllEvents();
  return <EventsContent eventsDataFiltered={eventsDataFiltered} />;
}
