import type { FunctionComponent } from "preact";
export const BarChart: FunctionComponent<{
  data: { label?: string; date: string; value: number }[];
  rgb: string;
}> = ({ data, rgb }) => {
  return (
    <div
      className="rounded bg-white shadow-sm flex items-end justify-between p-4 text-center"
    >
      {data.map(({ date, label, value }, _, array) => (
        <div
          key={date}
          className="h-48 flex flex-col"
          style={{ width: `${Math.round(100 / 7) - 2}%` }}
        >
          <div className="flex-grow flex flex-col justify-end">
            <div
              className="pt-2 rounded"
              style={{
                height: `${
                  (value / Math.max(...array.map(({ value }) => value))) * 100
                }%`,
                backgroundColor: `rgba(${rgb}, ${
                  value / Math.max(...array.map(({ value }) => value))
                })`,
              }}
            >
              {label ?? value}
            </div>
          </div>
          <div className="mt-2 text-xs">
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
