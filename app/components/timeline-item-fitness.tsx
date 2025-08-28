"use client";

import { TimelineItem } from "@/app/components/timeline-item";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

export function TimelineItemFitness() {
  const [steps, setSteps] = useState<number>(9882);

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
      subtitle="474 active calories of 2,648 total"
    />
  );
}
