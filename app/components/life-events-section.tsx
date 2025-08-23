import { LifeEvent, getLifeEvents } from "@/app/api";
import { GenericSection } from "@/app/components/generic-section";

export async function LifeEventsSection() {
  const lifeEvents = await getLifeEvents();

  // Sort by date and take only recent items for homepage
  const recentLifeEvents = lifeEvents
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const getLifeEventTitle = (item: LifeEvent) => item.title;

  const getLifeEventSubtitle = (item: LifeEvent) =>
    new Date(item.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  return (
    <GenericSection
      title="life"
      subtitle="/life"
      items={recentLifeEvents.map((item) => ({
        ...item,
        slug: item.slug || "",
        path: `/life/${item.slug}`,
        source: "life",
        excerpt: item.description || "",
        emoji: "🎉",
        attributes: {},
      }))}
      description="Key milestones and memorable moments from my life."
      linkText="Go to /life"
      getItemTitle={getLifeEventTitle}
      getItemSubtitle={getLifeEventSubtitle}
    />
  );
}
