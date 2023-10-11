import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  count: number;
  average: number;
  sum: number;
  minimum: number;
  maximum: number;
  breakdown: ({ start: string; end: string } & Omit<Data, "breakdown">)[];
}

interface Props {
  after: string;
  before: string;
  steps: Data;
  exerciseTime: Data;
  activeEnergy: Data;
  flightsClimbed: Data;
  breakdown: "year" | "month" | "week" | "day" | "hour";
}

const fetchJson = async <T = unknown,>(url: string): Promise<T> => {
  const data = await fetch(url);
  return data.json();
};

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const searchParams = new URL(req.url).searchParams;
    let before: Date | undefined = searchParams.has("before")
      ? new Date(String(searchParams.get("before")))
      : undefined;
    let after: Date | undefined = searchParams.has("after")
      ? new Date(String(searchParams.get("after")))
      : undefined;

    if (!before || !after) {
      const mostRecentItem = (
        await fetchJson<
          {
            id: number;
            synced_at: string;
            hash: string;
            date: string;
            type: string;
            value: number;
            unit: string;
          }[]
        >("https://anandlifedata.fly.dev/data?sort=date:desc")
      )[0];
      after = new Date(new Date(mostRecentItem.date));
      after.setUTCDate(after.getDate() - 7);
      before = new Date(mostRecentItem.date);
    }
    if (after) after.setUTCHours(0, 0, 0, 0);
    if (before) before.setUTCHours(23, 59, 59, 999);

    const diff = before.getTime() - after.getTime();
    const breakdown =
      diff > 63072000000
        ? "year"
        : diff > 5260000000
        ? "month"
        : diff > 864000000
        ? "week"
        : diff > 86400000
        ? "day"
        : "hour";

    const [steps, exerciseTime, activeEnergy, flightsClimbed] =
      await Promise.all([
        fetchJson<Props["steps"]>(
          `https://anandlifedata.fly.dev/?type=step_count&after=${after.toISOString()}&before=${before.toISOString()}&breakdown=${breakdown}`
        ),
        fetchJson<Props["exerciseTime"]>(
          `https://anandlifedata.fly.dev/?type=apple_exercise_time&after=${after.toISOString()}&before=${before.toISOString()}&breakdown=${breakdown}`
        ),
        fetchJson<Props["activeEnergy"]>(
          `https://anandlifedata.fly.dev/?type=active_energy&after=${after.toISOString()}&before=${before.toISOString()}&breakdown=${breakdown}`
        ),
        fetchJson<Props["flightsClimbed"]>(
          `https://anandlifedata.fly.dev/?type=flights_climbed&after=${after.toISOString()}&before=${before.toISOString()}&breakdown=${breakdown}`
        ),
      ]);

    return ctx.render({
      after: after.toISOString().substring(0, 10),
      before: before.toISOString().substring(0, 10),
      steps,
      exerciseTime,
      breakdown,
      activeEnergy,
      flightsClimbed,
    });
  },
};

function Records({
  data,
  breakdown,
  unit,
  format,
  children,
}: {
  data: Data;
  breakdown: Props["breakdown"];
  unit: string;
  format?: (value: number) => string;
  children: any;
}) {
  format ??= (val) => `${val.toLocaleString("en-US")} ${unit}`;
  const max = Math.round(
    data.breakdown.map((i) => i.sum).sort((a, b) => b - a)[0]
  );

  return (
    <section>
      {children}
      <div className="grid grid-cols-4">
        <div>
          <div className="text-2xl">
            {format(
              Math.round(
                data.breakdown.map((i) => i.sum).reduce((a, b) => a + b, 0) /
                  data.breakdown.length
              )
            )}
          </div>
          <div>
            Average{" "}
            {breakdown === "day"
              ? "daily"
              : breakdown === "month"
              ? "monthly"
              : breakdown === "week"
              ? "weekly"
              : breakdown === "year" && "yearly"}
          </div>
        </div>
        <div>
          <div className="text-2xl">{format(max)}</div>
          <div>Maximum</div>
        </div>
        <div>
          <div className="text-2xl">
            {format(
              Math.round(
                data.breakdown.map((i) => i.sum).sort((a, b) => a - b)[0]
              )
            )}
          </div>
          <div>Minimum</div>
        </div>
        <div>
          <div className="text-2xl">
            {data.breakdown
              .map((i) => i.count)
              .reduce((a, b) => a + b, 0)
              .toLocaleString("en-US")}
          </div>
          <div>Datapoints</div>
        </div>
      </div>
      <div className="mt-4 bg-white rounded shadow-sm p-6 space-x-6 flex align-center justify-stretch">
        {data.breakdown.map((i) => (
          <div key={i.end} className="w-full">
            <div className="h-64 flex flex-col justify-end">
              <div
                className="bg-gray-100 text-center text-xs overflow-hidden p-4 rounded"
                style={{ height: `${Math.round((100 * i.sum) / max)}%` }}
              >
                {format?.(Math.round(i.sum))}
              </div>
            </div>
            <div className="text-center text-xs mt-2">
              {breakdown === "week" && "Week of "}
              {breakdown === "hour"
                ? new Date(i.start).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : new Date(i.end).toLocaleDateString("en-US", {
                    dateStyle:
                      breakdown === "day"
                        ? "full"
                        : breakdown === "week"
                        ? "medium"
                        : undefined,
                    year:
                      breakdown === "year" || breakdown === "month"
                        ? "numeric"
                        : undefined,
                    month: breakdown === "month" ? "long" : undefined,
                  })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Props({ data }: PageProps<Props>) {
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-8 md:px-0">
      <header>
        <form className="grid grid-cols-7 gap-6">
          <label className="col-span-2 flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">
              Date range
            </span>
            <select name="template" className="px-2 h-10 rounded shadow-sm">
              <option>Custom</option>
            </select>
          </label>
          <label className="col-span-2 flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">From</span>
            <input
              name="after"
              type="date"
              defaultValue={data.after}
              className="px-2 h-10 rounded shadow-sm"
            />
          </label>
          <label className="col-span-2 flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">To</span>
            <input
              name="before"
              type="date"
              defaultValue={data.before}
              className="px-2 h-10 rounded shadow-sm"
            />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              className="px-2 h-10 bg-white w-full rounded shadow-sm bg-gray-100"
            >
              &rarr;
            </button>
          </div>
        </form>
      </header>
      <Records breakdown={data.breakdown} data={data.steps} unit="steps">
        <h2 className="mb-4 text-2xl font-semibold font-display">Steps</h2>
      </Records>
      <Records
        breakdown={data.breakdown}
        data={data.exerciseTime}
        unit="min"
        format={(value: number) =>
          value < 60
            ? `${value.toLocaleString("en-US")} min`
            : `${Math.floor(value / 60)} hr ${value % 60} min`
        }
      >
        <h2 className="mb-4 text-2xl font-semibold font-display">
          Exercise time
        </h2>
      </Records>
      <Records breakdown={data.breakdown} data={data.activeEnergy} unit="kcal">
        <h2 className="mb-4 text-2xl font-semibold font-display">
          Active energy
        </h2>
      </Records>
      <Records
        breakdown={data.breakdown}
        data={data.flightsClimbed}
        unit="stairs"
      >
        <h2 className="mb-4 text-2xl font-semibold font-display">
          Flights climbed
        </h2>
      </Records>
    </div>
  );
}
