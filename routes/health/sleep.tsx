import { Handlers, PageProps } from "$fresh/server.ts";
import { Chart } from "https://deno.land/x/fresh_charts@0.1.1/mod.ts";
import { Fragment } from "preact";
import { Breadcrumbs } from "../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../components/data/SectionTitle.tsx";
import { EmptyError } from "../../components/text/LoadError.tsx";
import { fetchJson } from "../../utils/data.tsx";
import type { OuraSleepData } from "../../utils/interfaces.ts";
import { chartOptions } from "../life.tsx";

interface ActivityData {
  sleep: [string, OuraSleepData][];
  cursor: string;
  take: number;
  previousDate?: string;
}

export const handler: Handlers<ActivityData> = {
  async GET(request, context) {
    const url = new URL(request.url);
    const takeQueryString = url.searchParams.get("take");
    const take =
      takeQueryString === "all"
        ? 1000
        : Number(takeQueryString)
        ? Number(takeQueryString)
        : 7;
    const cursor =
      url.searchParams.get("cursor") ??
      new Date().toISOString().substring(0, 10);

    const activityData = await fetchJson<Record<string, OuraSleepData>>(
      `https://anandchowdhary.github.io/life/data/oura-sleep/summary/days.json`
    );
    const sleep = Object.entries(activityData).filter(
      ([_, { total }]) => total > 0
    );
    const filteredActivity = sleep
      .filter(([key]) => new Date(key).getTime() < new Date(cursor).getTime())
      .slice(-1 * take);

    let previousDate: string | undefined = undefined;
    let nextDate: string | undefined = undefined;
    if (filteredActivity.length) {
      const firstKey = new Date(filteredActivity[0][0]);
      firstKey.setDate(firstKey.getDate() - 1);
      previousDate = firstKey.toISOString().substring(0, 10);
      const lastKey = new Date(
        filteredActivity[filteredActivity.length - 1][0]
      );
      lastKey.setDate(lastKey.getDate() + 1);
      nextDate = lastKey.toISOString().substring(0, 10);
    }

    const props: ActivityData = {
      sleep: filteredActivity,
      previousDate,
      cursor: cursor,
      take,
    };
    return context.render(props);
  },
};

export default function Home({ data }: PageProps<ActivityData>) {
  const { sleep, previousDate, cursor, take } = data;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <div class="space-y-5">
        <Breadcrumbs
          items={[
            { title: "Health", href: "/health" },
            { title: "Sleep", href: "/health/sleep" },
          ]}
        />
        <SectionTitle
          title="Sleep"
          description="I occasionally pen down my thoughts about technology, productivity, and design."
        />
        {sleep.length ? (
          <Fragment>
            <nav class="flex justify-between">
              {previousDate && (
                <a
                  href={`/health/sleep?take=${take}&cursor=${previousDate}`}
                >{`← ${new Date(previousDate).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}`}</a>
              )}
              <ul class="flex flex-wrap space-x-4">
                <li>
                  <a href={`/health/sleep?take=7&cursor=${cursor}`}>7 days</a>
                </li>
                <li>
                  <a href={`/health/sleep?take=30&cursor=${cursor}`}>30 days</a>
                </li>
                <li>
                  <a href={`/health/sleep?take=90&cursor=${cursor}`}>90 days</a>
                </li>
                <li>
                  <a href={`/health/sleep?take=365&cursor=${cursor}`}>
                    365 days
                  </a>
                </li>
                <li>
                  <a href={`/health/sleep?take=all&cursor=${cursor}`}>
                    All time
                  </a>
                </li>
              </ul>
            </nav>
            <div class="col-span-2 text-center">
              <time dateTime={sleep[0][0]}>
                {new Date(sleep[0][0]).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </time>
              <span>{"–"}</span>
              <time dateTime={sleep[sleep.length - 1][0]}>
                {new Date(sleep[sleep.length - 1][0]).toLocaleDateString(
                  "en-US",
                  { dateStyle: "long" }
                )}
              </time>
            </div>
            <div class="chart-container">
              <Chart
                width={720}
                height={400}
                type="bar"
                options={{
                  ...chartOptions,
                  scales: {
                    ...chartOptions.scales,
                    yAxes: [
                      {
                        stacked: false,
                        gridLines: { display: false },
                        ticks: { beginAtZero: true },
                      },
                    ],
                  },
                }}
                data={{
                  labels: sleep.map(([date]) => [
                    `${new Date(date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}`,
                  ]),
                  datasets: [
                    {
                      type: "line",
                      label: "8 hours",
                      data: sleep.map(() => 8),
                      backgroundColor: "none",
                      borderColor: "#2980b940",
                      pointRadius: 1,
                    },
                    ...(sleep.length > 10
                      ? [
                          {
                            type: "line",
                            label: "Trend line",
                            data: sleep
                              .map(([_, { total }]) => total)
                              .map((value, index, array) => {
                                const trend =
                                  array.length < 40
                                    ? 5
                                    : array.length < 100
                                    ? 10
                                    : 20;
                                if (index > trend) {
                                  const average =
                                    array
                                      .slice(index - trend, index)
                                      .reduce((a, b) => a + b, 0) / trend;
                                  return average / 3600;
                                }
                                return value / 3600;
                              }),
                            backgroundColor: "none",
                            borderColor: "#2c3e5050",
                            pointRadius: 1,
                          },
                        ]
                      : []),
                    ...[
                      {
                        label: "REM",
                        data: sleep.map(([_, { rem }]) => rem / 3600),
                        backgroundColor: "#3730a3",
                      },
                      {
                        label: "Deep",
                        data: sleep.map(
                          ([_, { rem, deep }]) => (rem + deep) / 3600
                        ),
                        backgroundColor: "#6366f1",
                      },
                      {
                        label: "Light",
                        data: sleep.map(
                          ([_, { rem, deep, light }]) =>
                            (rem + deep + light) / 3600
                        ),
                        backgroundColor: "#818cf8",
                      },
                    ],
                  ],
                }}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <EmptyError items="data" />
            <a href="/health/sleep">Remove all filters</a>
          </Fragment>
        )}
      </div>
    </div>
  );
}
