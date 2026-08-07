import { getAverageSleepTime, getWalkingStepsSummary } from "@/app/api";
import { focusStyles } from "@/app/components/external-link";
import { TimelineItemBirthday } from "@/app/components/timeline-item-birthday";
import { TimelineItemFitness } from "@/app/components/timeline-item-fitness";
import { TimelineItemFood } from "@/app/components/timeline-item-food";
import { TimelineItemGitHub } from "@/app/components/timeline-item-github";
import { TimelineItemLocation } from "@/app/components/timeline-item-location";
import { TimelineItemMusic } from "@/app/components/timeline-item-music";
import { TimelineItemSleep } from "@/app/components/timeline-item-sleep";
import { TimelineItemTheme } from "@/app/components/timeline-item-theme";
import Link from "next/link";

export async function LifeSection() {
  const { average: lastDayWalkingSteps, total: totalWalkingSteps } =
    await getWalkingStepsSummary();
  const lastNightSleepTime = await getAverageSleepTime();

  return (
    <section className="space-y-4 max-w-5xl mx-auto">
      <h2 className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        <Link href="/life" className={`${focusStyles}`}>
          /life
        </Link>
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
