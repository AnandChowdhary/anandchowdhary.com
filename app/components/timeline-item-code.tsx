import { getLastDayCodingTime, getTotalLastMonthCodingTime } from "@/app/api";
import { TimelineItem } from "@/app/components/timeline-item";

export async function TimelineItemCodingTime() {
  const lastDayCodingTime = await getLastDayCodingTime();
  const lastDayCodingTimeValue =
    lastDayCodingTime?.[Object.keys(lastDayCodingTime)[0]];
  const lastMonthCodingTime = await getTotalLastMonthCodingTime();
  return (
    <TimelineItem
      icon="💻"
      title={
        lastDayCodingTimeValue != null
          ? `${(lastDayCodingTimeValue / 3600).toLocaleString("en-US", {
              maximumFractionDigits: 1,
            })} hours coded yesterday`
          : "No data found"
      }
      subtitle={`${(lastMonthCodingTime / 3600).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })} hours this month`}
    />
  );
}
