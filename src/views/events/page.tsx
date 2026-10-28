import { getAllEvents } from "@/views/api";
import { buildScreenshotOpenGraphImageUrl } from "@/views/lib/opengraph";
import EventsContent from "@/views/events/component";
import type { Metadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Events / Anand Chowdhary",
  description:
    "From time to time, Anand Chowdhary speaks at startup events and technical conferences about engineering, design, and entrepreneurship.",
  openGraph: {
    images: [
      {
        url: buildScreenshotOpenGraphImageUrl("/events"),
      },
    ],
  },
};

export default async function Events() {
  const eventsDataFiltered = await getAllEvents();
  return <EventsContent eventsDataFiltered={eventsDataFiltered} />;
}
