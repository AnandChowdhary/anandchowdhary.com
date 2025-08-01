"use client";

import { focusStyles } from "@/app/components/external-link";
import { TimelineItem } from "@/app/components/timeline-item";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const BIRTHDAY = new Date("1997-12-29");

export function TimelineItemBirthday() {
  const [age, setAge] = useState<number>(() => {
    const now = new Date();
    return Math.floor((now.getTime() - BIRTHDAY.getTime()) / 1000);
  });

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date();
      const ageInSeconds = Math.floor(
        (now.getTime() - BIRTHDAY.getTime()) / 1000
      );
      setAge(ageInSeconds);
    };
    calculateAge();
    const interval = setInterval(calculateAge, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimelineItem
      icon="🎂"
      title={
        <>
          <NumberFlow
            aria-label={(age / 31536000).toLocaleString("en-US")}
            value={age / 31536000}
            format={{
              minimumFractionDigits: 7,
              maximumFractionDigits: 7,
            }}
          />{" "}
          years old
        </>
      }
      subtitle="Next birthday in 5 months"
      href="/"
      hoverLabel="Timeline"
      focusStyles={`${focusStyles} full-link`}
    />
  );
}
