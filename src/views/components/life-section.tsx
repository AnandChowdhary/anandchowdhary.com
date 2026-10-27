import { getAverageSleepTime, getWalkingStepsSummary } from "@/views/api";
import { focusStyles } from "@/views/components/external-link";
import { TimelineItemBirthday } from "@/views/components/timeline-item-birthday";
import { TimelineItemFitness } from "@/views/components/timeline-item-fitness";
import { TimelineItemFood } from "@/views/components/timeline-item-food";
import { TimelineItemGitHub } from "@/views/components/timeline-item-github";
import { TimelineItemLocation } from "@/views/components/timeline-item-location";
import { TimelineItemMusic } from "@/views/components/timeline-item-music";
import { TimelineItemSleep } from "@/views/components/timeline-item-sleep";
import { TimelineItemTheme } from "@/views/components/timeline-item-theme";

export async function LifeSection() {
  const { average: lastDayWalkingSteps, total: totalWalkingSteps } =
    await getWalkingStepsSummary();
  const lastNightSleepTime = await getAverageSleepTime();

  return (
    <section className="space-y-4 max-w-5xl mx-auto">
      <h2 className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        <a href="/life" className={`${focusStyles}`}>
          /life
        </a>
      </h2>
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-xs lg:text-sm">
        <TimelineItemBirthday />
        <TimelineItemLocation />
        <TimelineItemTheme />
        <TimelineItemFitness
          value={lastDayWalkingSteps}
          total={totalWalkingSteps}
        />
        <TimelineItemSleep hours={lastNightSleepTime / 3600} />
        <TimelineItemFood />
        <TimelineItemMusic />
        <TimelineItemGitHub />
      </ul>
    </section>
  );
}
