import { getGitHubContributionCount } from "@/views/api";
import { TimelineItem } from "@/views/components/timeline-item";

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
