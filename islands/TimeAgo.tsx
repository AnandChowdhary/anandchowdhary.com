/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

interface CounterProps {
  date: string;
}

/**
 * Human readable elapsed or remaining time (example: 3 minutes ago)
 * @param  {Date|Number|String} date A Date object, timestamp or string parsable with Date.parse()
 * @param  {Date|Number|String} [nowDate] A Date object, timestamp or string parsable with Date.parse()
 * @param  {Intl.RelativeTimeFormat} [trf] A Intl formater
 * @return {string} Human readable elapsed or remaining time
 * @see https://stackoverflow.com/a/67338038/938822
 */
function fromNow(
  date: Date,
  nowDate: Date,
  rft = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" })
): string | undefined {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;
  const intervals: {
    ge: number;
    divisor: number;
    text?: string;
    unit?: Intl.RelativeTimeFormatUnit;
  }[] = [
    { ge: YEAR, divisor: YEAR, unit: "year" },
    { ge: MONTH, divisor: MONTH, unit: "month" },
    { ge: WEEK, divisor: WEEK, unit: "week" },
    { ge: DAY, divisor: DAY, unit: "day" },
    { ge: HOUR, divisor: HOUR, unit: "hour" },
    { ge: MINUTE, divisor: MINUTE, unit: "minute" },
    { ge: 30 * SECOND, divisor: SECOND, unit: "seconds" },
    { ge: 0, divisor: 1, text: "just now" },
  ];
  const now =
    typeof nowDate === "object"
      ? nowDate.getTime()
      : new Date(nowDate).getTime();
  const diff =
    now - (typeof date === "object" ? date : new Date(date)).getTime();
  const diffAbs = Math.abs(diff);
  for (const interval of intervals) {
    if (diffAbs >= interval.ge) {
      const x = Math.round(Math.abs(diff) / interval.divisor);
      const isFuture = diff < 0;
      return interval.unit
        ? rft.format(isFuture ? x : -x, interval.unit)
        : interval.text;
    }
  }
}

export default function TimeAgo(props: CounterProps) {
  return (
    <time
      dateTime={new Date(props.date).toISOString()}
      title={new Date(props.date).toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      })}
      className={tw`border-b border-gray-500 border-dotted`}
    >
      {fromNow(new Date(props.date), new Date())}
    </time>
  );
}
