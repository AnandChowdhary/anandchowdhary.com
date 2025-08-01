import { getAllEvents } from "@/app/api";
import EventsContent from "@/app/events/component";

export default async function Events() {
  const eventsDataFiltered = await getAllEvents();
  return <EventsContent eventsDataFiltered={eventsDataFiltered} />;
}
