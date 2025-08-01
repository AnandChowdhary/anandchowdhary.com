import { GenericItem, GenericSection } from "@/app/components/generic-section";

interface Event extends GenericItem {
  attributes: {
    date: string;
    remote?: boolean;
    video?: string;
    talk?: string;
    event?: string;
    venue?: string;
    coordinates?: [number, number];
    city?: string;
    country?: string;
  };
}

export async function Events() {
  const events = await fetch(
    "https://anandchowdhary.github.io/events/api.json",
    { next: { revalidate: 36000 } }
  );
  const eventsData = (await events.json()) as Event[];
  const eventsDataSorted = eventsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
