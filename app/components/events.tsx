import { Event, getAllEvents } from "@/app/api";
import { GenericSection } from "@/app/components/generic-section";

export async function Events() {
  const eventsDataSorted = await getAllEvents();

  const getEventTitle = (event: Event) => (
    <>
      {event.attributes.event ?? event.title}
      {event.attributes.city && (
        <span className="text-neutral-500">
          {` · ${event.attributes.city}`}
        </span>
      )}
    </>
  );

  const getEventSubtitle = (event: Event) => {
    return (
      event.attributes.talk ??
      event.attributes.venue ??
      new Date(event.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  };

  return (
    <GenericSection
      title="events"
      subtitle="/events"
      items={eventsDataSorted}
      description="From time to time, I speak at startup events and technical conferences about engineering, design, and entrepreneurship."
      linkText="Go to events"
      getItemTitle={getEventTitle}
      getItemSubtitle={getEventSubtitle}
    />
  );
}
