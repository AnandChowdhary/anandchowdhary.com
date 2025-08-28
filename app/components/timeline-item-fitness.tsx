"use client";

import { TimelineItem } from "@/app/components/timeline-item";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

export function TimelineItemFitness({
  value,
  total,
}: {
  value: number;
  total: number;
}) {
  const [steps, setSteps] = useState<number>(value);

  useEffect(() => {
    const interval = setInterval(() => setSteps(steps + 1), 8800);
    return () => clearInterval(interval);
  }, [steps]);

  return (
    <TimelineItem
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
