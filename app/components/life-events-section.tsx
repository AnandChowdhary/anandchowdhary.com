import { LifeEvent, getLifeEvents } from "@/app/api";
import { GenericSectionContainer } from "@/app/components/generic-section";

export async function LifeEventsSection() {
  const lifeEvents = await getLifeEvents();
  const recentLifeEvents = lifeEvents
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
  const getLifeEventTitle = (item: LifeEvent) => item.title;
  const getLifeEventSubtitle = (item: LifeEvent) =>
    new Date(item.date).getUTCFullYear();

  return (
    <GenericSectionContainer
      title="life"
      subtitle="/life"
      description="Key milestones and memorable moments from my life."
      linkText="Go to /life"
    >
      <ul className="text-xs space-y-1 text-neutral-600 dark:text-neutral-400 pointer-events-none">
        {recentLifeEvents.slice(0, 4).map((item, index) => (
          <li
            key={item.slug}
            className="flex items-center gap-2 justify-between relative"
          >
            <div className="shrink-0">
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
            </div>
            <div className="truncate grow">{getLifeEventTitle(item)}</div>
            <div className="shrink-0 text-neutral-500">
              {getLifeEventSubtitle(item)}
            </div>
            {index !== 0 && (
              <div className="w-px absolute left-1 -top-4 bottom-1 bg-neutral-300 -ml-[0.5px] -z-10" />
            )}
          </li>
        ))}
      </ul>
    </GenericSectionContainer>
  );
}
