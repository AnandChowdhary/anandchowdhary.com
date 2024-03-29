import { Handlers, PageProps } from "$fresh/server.ts";
import { Chart } from "https://deno.land/x/fresh_charts@0.1.1/mod.ts";
import { Fragment } from "preact";
import { Breadcrumbs } from "../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../components/data/SectionTitle.tsx";
import { EmptyError } from "../../components/text/LoadError.tsx";
import { fetchJson } from "../../utils/data.tsx";
import type { OuraActivity } from "../../utils/interfaces.ts";
import { chartOptions, replaceToBold } from "../life.tsx";

interface ActivityData {
  readiness: [string, OuraActivity][];
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

    const activityData = await fetchJson<Record<string, OuraActivity>>(
      `https://anandchowdhary.github.io/life/data/oura-readiness/summary/days.json`
    );
    const readiness = Object.entries(activityData).filter(
      ([_, { score }]) => score > 0
    );
    const filteredActivity = readiness
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
      readiness: filteredActivity,
      previousDate,
      cursor: cursor,
      take,
    };
    return context.render(props);
  },
};

export default function Home({ data }: PageProps<ActivityData>) {
  const { readiness, previousDate, cursor, take } = data;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <div class="space-y-5">
        <Breadcrumbs
          items={[
            { title: "Health", href: "/health" },
            { title: "Readiness", href: "/health/readiness" },
          ]}
        />
        <SectionTitle
          title="Readiness"
          description="I occasionally pen down my thoughts about technology, productivity, and design."
        />
        {readiness.length ? (
          <Fragment>
            <nav class="flex justify-between">
              {previousDate && (
                <a
                  href={`/health/readiness?take=${take}&cursor=${previousDate}`}
                >{`← ${new Date(previousDate).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}`}</a>
              )}
              <ul class="flex flex-wrap space-x-4">
                <li>
                  <a href={`/health/readiness?take=7&cursor=${cursor}`}>
                    7 days
                  </a>
                </li>
                <li>
                  <a href={`/health/readiness?take=30&cursor=${cursor}`}>
                    30 days
                  </a>
                </li>
                <li>
                  <a href={`/health/readiness?take=90&cursor=${cursor}`}>
                    90 days
                  </a>
                </li>
                <li>
                  <a href={`/health/readiness?take=365&cursor=${cursor}`}>
                    365 days
                  </a>
                </li>
                <li>
                  <a href={`/health/readiness?take=all&cursor=${cursor}`}>
                    All time
                  </a>
                </li>
              </ul>
            </nav>
            <div class="col-span-2 text-center">
              <time dateTime={readiness[0][0]}>
                {new Date(readiness[0][0]).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </time>
              <span>{"–"}</span>
              <time dateTime={readiness[readiness.length - 1][0]}>
                {new Date(
                  readiness[readiness.length - 1][0]
                ).toLocaleDateString("en-US", { dateStyle: "long" })}
              </time>
            </div>
            <div class="chart-container">
              <Chart
                width={720}
                height={400}
                type="bar"
                options={chartOptions}
                data={{
                  labels: readiness.map(([date, { score }]) => [
                    `${new Date(date).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}`,
                    replaceToBold(
                      Number(score).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 1,
                      })
                    ),
                  ]),
                  datasets: [
                    ...(readiness.length > 10
                      ? [
                          {
                            type: "line",
                            label: "Trend line",
                            data: readiness
                              .map(([_, { score }]) => score)
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
                                  return average;
                                }
                                return value;
                              }),
                            backgroundColor: "none",
                            borderColor: "rgba(0, 0, 0, 0.3)",
                          },
                        ]
                      : []),
                    ...[
                      {
                        label: "Score",
                        data: readiness.map(([_, { score }]) => score),
                        backgroundColor: "#fbbf24",
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
            <a href="/health/readiness">Remove all filters</a>
          </Fragment>
        )}
      </div>
    </div>
  );
}
