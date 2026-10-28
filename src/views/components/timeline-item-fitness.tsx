
import { TimelineItem } from "@/views/components/timeline-item";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

export function TimelineItemFitness({
  value,
  total,
  contentOnly = false,
}: {
  value: number;
  total: number;
  contentOnly?: boolean;
}) {
  const [steps, setSteps] = useState<number>(value);

  useEffect(() => {
    const interval = setInterval(() => setSteps((prev) => prev + 1), 8800);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimelineItem
      contentOnly={contentOnly}
      counter="fitness"
      counterValue={value}
      counterTotal={total}
      icon="🏃‍♂️"
      title={
        <>
          <NumberFlow value={steps} /> steps walked today
        </>
      }
      subtitle={`${((total / 1000) * 0.762).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })} km walked this month`}
    />
  );
}
