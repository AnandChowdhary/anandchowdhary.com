/** @jsx h */
import { h } from "preact";
import type { FunctionComponent } from "preact";
import { tw } from "@twind";

export const BarChart: FunctionComponent<{
  data: { date: string; value: number }[];
  rgb: string;
}> = ({ data, rgb }) => {
  return (
    <div
      className={tw`rounded bg-white shadow-sm flex items-end justify-between p-4 text-center`}
    >
      {data.map(({ date, value }, _, array) => (
        <div
          key={date}
          className={tw`h-48 flex flex-col`}
          style={{ width: `${Math.round(100 / 7) - 2}%` }}
        >
          <div className={tw`flex-grow flex flex-col justify-end`}>
            <div
              className={tw`pt-2 rounded`}
              style={{
                height: `${
                  (value / Math.max(...array.map(({ value }) => value))) * 100
                }%`,
                backgroundColor: `rgba(${rgb}, ${
                  value / Math.max(...array.map(({ value }) => value))
                })`,
              }}
            >
              {value}
            </div>
          </div>
          <div className={tw`mt-2 text-xs`}>
            {`${
              [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ][new Date(date).getMonth()]
            } ${new Date(date).getDate()}`}
          </div>
        </div>
      ))}
    </div>
  );
};
