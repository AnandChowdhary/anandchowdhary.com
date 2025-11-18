import { getGitHubContributionCount } from "@/app/api";
import { TimelineItem } from "@/app/components/timeline-item";

export async function TimelineItemGitHub() {
  const contributionCount = await getGitHubContributionCount();
  return (
    <TimelineItem
      icon="⌨️"
      title={
        contributionCount != null
          ? `${contributionCount.toLocaleString("en-US")} contributions`
          : "Contributions unavailable"
      }
      subtitle="On GitHub in the last year"
    />
  );
}
