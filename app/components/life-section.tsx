"use client";

import { focusStyles } from "@/app/components/external-link";
import { TimelineItem } from "@/app/components/timeline-item";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const BIRTHDAY = new Date("1997-12-29");

export function LifeSection() {
  const [steps, setSteps] = useState<number>(9882);
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

  useEffect(() => {
    const interval = setInterval(() => setSteps(steps + 1), 8800);
    return () => clearInterval(interval);
  }, [steps]);

  return (
    <section className="space-y-4 max-w-5xl mx-auto">
      <h2 className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        /life
      </h2>
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-xs lg:text-sm">
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
        <TimelineItem
          icon="📍"
          title="Currently in California"
          subtitle="It is 4:06 am (UTC -8:00)"
          hoverLabel="Location"
        />
        <TimelineItem
          icon="🌈"
          title="Year of Gratitude"
          subtitle="Yearly theme for 2024"
          hoverLabel="Theme"
        />
        <TimelineItem
          icon="🏃‍♂️"
          title={
            <>
              <NumberFlow value={steps} /> steps walked today
            </>
          }
          subtitle="474 active calories of 2,648 total"
          hoverLabel="Fitness"
        />
        <TimelineItem
          icon="🛌"
          title="Slept 7.6 hours last night"
          subtitle="1.2 hours REM, 85% efficient"
          hoverLabel="Sleep"
        />
        {/* <TimelineItem
          icon="📘"
          title="Reading Nick Bostrom"
          subtitle="Finished 2 books this year"
          hoverLabel="Reading"
        /> */}
        <TimelineItem
          icon="🎧"
          title="Listening to Gracie Abrams"
          subtitle="Top artist this month"
          hoverLabel="Music"
        />
        {/* <TimelineItem
          icon="🗺️"
          title="Traveled to 16 countries"
          subtitle="Most recently to Italy"
          hoverLabel="Travel"
        /> */}
      </ul>
    </section>
  );
}
