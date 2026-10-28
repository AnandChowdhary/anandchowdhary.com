import { TimelineItem } from "@/views/components/timeline-item";

export function TimelineItemSleep({ hours }: { hours: number }) {
  return (
    <TimelineItem
      icon="🛌"
      title={`Slept ${hours.toLocaleString("en-US", {
        maximumFractionDigits: 1,
      })} hours last night`}
      subtitle="Tracked via Oura & Apple"
    />
  );
}
