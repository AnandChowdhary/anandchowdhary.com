import { NavigationLinks } from "@/app/components/navigation-links";
import humanizeDuration from "humanize-duration";

export function SleepSection({
  sleepTime,
}: {
  sleepTime: Record<string, number>;
}) {
  return (
    <div>
      <h2 className="font-medium text-xl">Sleep</h2>
      <NavigationLinks
        source="https://github.com/AnandChowdhary/life"
        api="https://raw.githubusercontent.com/AnandChowdhary/life/refs/heads/master/data/google-fit-sleep/summary/days.json"
        readme="https://github.com/AnandChowdhary/life/blob/refs/heads/main/README.md"
        className="mb-6 justify-start mx-0"
      />
      <div className="space-y-3">
        {Object.entries(sleepTime)
          .filter(([_, time]) => time > 0)
          .slice(-6)
          .map(([month, time]) => (
            <div
              key={month}
              className="flex items-center gap-3 justify-between"
            >
              <div className="truncate">
                {humanizeDuration(time * 1000, { round: true })
                  .split(", ")
                  .slice(0, 2)
                  .join(", ")}
              </div>
              <div className="truncate text-neutral-500 tabular-nums">
                {new Date(month).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
