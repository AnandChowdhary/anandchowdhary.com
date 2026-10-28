
import { TimelineItem } from "@/views/components/timeline-item";
import NumberFlow from "@number-flow/react";
import { useEffect, useMemo, useState } from "react";

const BIRTHDAY = new Date("1997-12-29");

export function TimelineItemBirthday({ initialAge = Math.floor((Date.now() - BIRTHDAY.getTime()) / 1000), contentOnly = false }: { initialAge?: number; contentOnly?: boolean } = {}) {
  const [age, setAge] = useState<number>(initialAge);

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

  const relativeFormatter = useMemo(
    () => new Intl.RelativeTimeFormat("en", { numeric: "auto" }),
    []
  );
  const daysSinceBirthday = Math.floor(age / 86400);

  const nextBirthdaySubtitle = useMemo(() => {
    const now = new Date(
      BIRTHDAY.getTime() + daysSinceBirthday * 1000 * 60 * 60 * 24
    );
    const nextBirthday = new Date(
      now.getFullYear(),
      BIRTHDAY.getMonth(),
      BIRTHDAY.getDate()
    );
    if (nextBirthday <= now)
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    const dayInMs = 1000 * 60 * 60 * 24;
    const daysUntil = Math.ceil(
      (nextBirthday.getTime() - now.getTime()) / dayInMs
    );
    return `Next birthday ${relativeFormatter.format(daysUntil, "day")}`;
  }, [daysSinceBirthday, relativeFormatter]);

  return (
    <TimelineItem
      contentOnly={contentOnly}
      counter="birthday"
      counterValue={initialAge}
      icon="🎂"
      title={
        <>
          <NumberFlow
            aria-label={(age / 31536000).toLocaleString("en-US", { minimumFractionDigits: 7, maximumFractionDigits: 7 })}
            value={age / 31536000}
            format={{
              minimumFractionDigits: 7,
              maximumFractionDigits: 7,
            }}
          />{" "}
          years old
        </>
      }
      subtitle={nextBirthdaySubtitle}
    />
  );
}
