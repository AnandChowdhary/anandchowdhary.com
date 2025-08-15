import { getLocation } from "@/app/api";
import { TimelineItem } from "@/app/components/timeline-item";

export async function TimelineItemLocation() {
  const location = await getLocation();
  return (
    <TimelineItem
      icon="📍"
      title={`Currently in ${location.label}`}
      subtitle={`It is ${new Date().toLocaleString("en-US", {
        timeStyle: "short",
        timeZone: location.timezone.name,
      })} (UTC ${location.timezone.utcOffsetStr})`}
    />
  );
}
