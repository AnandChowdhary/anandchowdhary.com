import { LifeEvent } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { NavigationLinks } from "@/app/components/navigation-links";
import Link from "next/link";

const LifeEventCard = ({
  item,
  hasMore,
}: {
  item: LifeEvent;
  hasMore: boolean;
}) => {
  const year = new Date(item.date).getFullYear();
  const permalink = `/life/${year}/${item.slug}`;

  return (
    <article className="pb-4 relative">
      <div className="flex items-start justify-between gap-4">
        <div className="shrink-0 w-3 h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 mt-1" />
        {hasMore && (
          <div className="absolute left-1.25 top-5 -bottom-4 w-0.5 bg-neutral-200 dark:bg-neutral-800" />
        )}
        <div className="min-w-0 flex-1">
          <Link
            href={permalink}
            className={`${focusStyles} full-link font-medium hover:text-neutral-500`}
          >
            {item.title}
          </Link>
          <p className="text-sm text-neutral-500 mt-1">
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          {item.description && (
            <p
              className="text-sm text-neutral-500 mt-2 truncate whitespace-nowrap pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(to right, black 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 70%, transparent 100%)",
              }}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export function LifeEventsSection({
  lifeEventsData,
}: {
  lifeEventsData: LifeEvent[];
}) {
  // Group events by decade
  const eventsByDecade = lifeEventsData.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    const decade = Math.floor(year / 10) * 10;
    const decadeKey = `${decade}s`;
    if (!acc[decadeKey]) acc[decadeKey] = [];
    acc[decadeKey].push(event);
    return acc;
  }, {} as Record<string, LifeEvent[]>);

  // Sort events within each decade by date (newest first)
  Object.keys(eventsByDecade).forEach((decade) => {
    eventsByDecade[decade].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  // Sort decades (newest first)
  const sortedDecades = Object.keys(eventsByDecade).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <>
      <h2 className="font-medium text-xl mb-0">Life events</h2>
      <NavigationLinks
        source="https://github.com/AnandChowdhary/everything"
        api="https://anandchowdhary.github.io/everything/data/life-events.json"
        readme="https://github.com/AnandChowdhary/everything/blob/refs/heads/main/README.md"
        className="mb-6 justify-start ml-0"
      />
      {sortedDecades.map((decade) => (
        <section key={decade} className="space-y-4">
          <h2 className="text-lg font-medium text-neutral-500">{decade}</h2>
          <div className="space-y-4">
            {eventsByDecade[decade].map((item, index, array) => (
              <LifeEventCard
                key={`${decade}-${index}`}
                item={item}
                hasMore={index < array.length - 1}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
