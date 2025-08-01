import { TimelineItemBirthday } from "@/app/components/timeline-item-birthday";
import { TimelineItemFitness } from "@/app/components/timeline-item-fitness";
import { TimelineItemLocation } from "@/app/components/timeline-item-location";
import { TimelineItemMusic } from "@/app/components/timeline-item-music";
import { TimelineItemSleep } from "@/app/components/timeline-item-sleep";
import { TimelineItemTheme } from "@/app/components/timeline-item-theme";

export function LifeSection() {
  return (
    <section className="space-y-4 max-w-5xl mx-auto">
      <h2 className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        /life
      </h2>
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-xs lg:text-sm">
        <TimelineItemBirthday />
        <TimelineItemLocation />
        <TimelineItemTheme />
        <TimelineItemFitness />
        <TimelineItemSleep />
        {/* <TimelineItem
          icon="📘"
          title="Reading Nick Bostrom"
          subtitle="Finished 2 books this year"
          hoverLabel="Reading"
        /> */}
        <TimelineItemMusic />
        {/* <TimelineItem
          icon="🗺️"
          title="Traveled to 16 countries"
          subtitle="Most recently to Italy"
          hoverLabel="Travel"
        /> */}
      </ul>
    </section>
  );
}
