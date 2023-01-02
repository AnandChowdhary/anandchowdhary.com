import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Chart,
  ChartOptions,
} from "https://deno.land/x/fresh_charts@0.1.1/mod.ts";
import { Breadcrumbs } from "../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../components/data/SectionTitle.tsx";
import { LoadError } from "../../components/text/LoadError.tsx";
import { SectionLink } from "../../components/text/SectionLink.tsx";
import { fetchLifeData, fetchText } from "../../utils/data.tsx";
import type { AllLifeDataSummary } from "../../utils/interfaces.ts";

const BOLD_REPLACERS: Record<string, string> = {
  "1": "𝟭",
  "2": "𝟮",
  "3": "𝟯",
  "4": "𝟰",
  "5": "𝟱",
  "6": "𝟲",
  "7": "𝟳",
  "8": "𝟴",
  "9": "𝟵",
  "0": "𝟬",
  ",": ",",
  h: "𝗵",
};
export const chartOptions: ChartOptions = {
  legend: {
    align: "end",
    labels: {
      usePointStyle: true,
      boxWidth: 8,
    },
  },
  devicePixelRatio: 1,
  scales: {
    yAxes: [
      {
        display: false,
        stacked: true,
        gridLines: { display: false },
        ticks: { beginAtZero: true },
      },
    ],
    xAxes: [
      {
        stacked: true,
        gridLines: { display: false },
      },
    ],
  },
};

export const replaceToBold = (str: string) => {
  return str.replace(/[0-9h,]/g, (match) => BOLD_REPLACERS[match]);
};

export function toHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${hours > 0 ? "+" : ""}${padTo2Digits(hours)}:${padTo2Digits(
    minutes
  )}`;
}
function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

interface LifeData extends AllLifeDataSummary {
  query: string;
  music?: {
    name: string;
    plays: number;
    percent: number;
  }[];
  contributionsGraph?: string;
}

export const handler: Handlers<LifeData> = {
  async GET(request, context) {
    let lifeData: AllLifeDataSummary | undefined = undefined;
    let music: LifeData["music"] = undefined;
    let contributionsGraph: LifeData["contributionsGraph"] = undefined;

    try {
      const [_lifeData, _contributionsApi, _lastWeekMusicApi] =
        await Promise.allSettled([
          fetchLifeData(),
          fetchText("https://github.com/users/AnandChowdhary/contributions"),
          fetchText(
            "https://gist.githubusercontent.com/AnandChowdhary/14a66f452302d199c4abde0ffe891922/raw"
          ),
        ]);

      if (_lifeData.status !== "fulfilled")
        throw new Error("Failed to fetch life data");
      lifeData = _lifeData.value;

      if (_contributionsApi.status === "fulfilled")
        contributionsGraph =
          `<svg viewbox="0 0 717 112" class="js-calendar-graph-svg">` +
          _contributionsApi.value
            .split(
              `<svg width="717" height="112" class="js-calendar-graph-svg">`
            )[1]
            .split("</svg>")[0] +
          "</svg>";

      if (_lastWeekMusicApi.status === "fulfilled") {
        music = _lastWeekMusicApi.value.split("\n").map((line) => {
          return {
            name: line
              .split("▋")[0]
              .split("▌")[0]
              .split("▌")[0]
              .split("░")[0]
              .split("█")[0]
              .split("▊")[0]
              .split("▍")[0]
              .split("▎")[0]
              .trim(),
            plays: parseInt(line.replace(" plays", "").split(" ").pop() ?? "0"),
            percent:
              parseInt(line.replace(" plays", "").split(" ").pop() ?? "0") /
              (_lastWeekMusicApi.value ?? "")
                .split("\n")
                .map((line) =>
                  parseInt(line.replace(" plays", "").split(" ").pop() ?? "0")
                )
                .reduce((a, b) => a + b, 0),
          };
        });
      }
    } catch (error) {
      // Ignore errors for now
    }

    if (!lifeData) throw new Error("Failed to fetch life data");

    const props: LifeData = {
      ...lifeData,
      music,
      contributionsGraph,
      query: new URL(request.url).search,
    };
    const response = await context.render(props);
    response.headers.set("Cache-Control", "public, max-age=600");
    return response;
  },
};

export default function Home({ data }: PageProps<LifeData>) {
  const { okr, theme, contributionsGraph, music, location, activity, sleep } =
    data;
  const activityData = activity
    ? Object.entries(activity)
        .filter(([_, { cal_total }]) => cal_total > 0)
        .slice(-7)
    : undefined;
  const sleepData = sleep
    ? Object.entries(sleep)
        .filter(([_, { total }]) => total > 0)
        .slice(-7)
    : undefined;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <Breadcrumbs items={[{ href: "/health", title: "Health" }]} />
      <SectionTitle
        title="Health"
        description="I occasionally pen down my thoughts about technology, productivity, and design."
      />
      <section class="grid md:grid-cols-2 gap-8">
        <article>
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🔥</span>
              <SectionLink label="Calories burned" href="/health/calories" />
            </h2>
            <p class="text-gray-500">Tracked every day with Oura</p>
          </header>
          {activityData ? (
            <div class="chart-container">
              <Chart
                width={380}
                height={250}
                type="bar"
                options={chartOptions}
                data={{
                  labels: activityData.map(([date, { cal_total }]) => [
                    `${new Date(date)
                      .toLocaleString("en-US", {
                        weekday: "long",
                      })
                      .substring(0, 3)} ${new Date(date).getDate()}`,
                    replaceToBold(
                      Number(cal_total).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 1,
                      })
                    ),
                  ]),
                  datasets: [
                    {
                      label: "Active",
                      data: activityData.map(
                        ([_, { cal_active }]) => cal_active
                      ),
                      backgroundColor: "#ef4444",
                    },
                    {
                      label: "Total",
                      data: activityData.map(([_, { cal_total }]) => cal_total),
                      backgroundColor: "#fca5a5",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <LoadError items="activity" />
          )}
        </article>
        <article>
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🛌</span>
              <SectionLink label="Sleep" href="/health/sleep" />
            </h2>
            <p class="text-gray-500">Different stages of sleep</p>
          </header>
          {sleepData ? (
            <div class="chart-container">
              <Chart
                width={380}
                height={250}
                type="bar"
                options={chartOptions}
                data={{
                  labels: sleepData.map(([date, { total }]) => [
                    `${new Date(date)
                      .toLocaleString("en-US", {
                        weekday: "long",
                      })
                      .substring(0, 3)} ${new Date(date).getDate()}`,
                    replaceToBold(
                      `${Number(total / 3600).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 1,
                      })}h`
                    ),
                  ]),
                  datasets: [
                    {
                      label: "REM",
                      data: sleepData.map(([_, { rem }]) => rem),
                      backgroundColor: "#3730a3",
                    },
                    {
                      label: "Deep",
                      data: sleepData.map(([_, { deep }]) => deep),
                      backgroundColor: "#6366f1",
                    },
                    {
                      label: "Light",
                      data: sleepData.map(([_, { light }]) => light),
                      backgroundColor: "#818cf8",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <LoadError items="sleep" />
          )}
        </article>
        <article>
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🏃‍♂️</span>
              <SectionLink label="Steps" href="/health/steps" />
            </h2>
            <p class="text-gray-500">Tracked every day using Oura</p>
          </header>
          {activityData ? (
            <div class="chart-container">
              <Chart
                width={380}
                height={250}
                type="bar"
                options={chartOptions}
                data={{
                  labels: activityData.map(([date, { steps }]) => [
                    `${new Date(date)
                      .toLocaleString("en-US", {
                        weekday: "long",
                      })
                      .substring(0, 3)} ${new Date(date).getDate()}`,
                    replaceToBold(
                      `${Number(steps).toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}`
                    ),
                  ]),
                  datasets: [
                    {
                      label: "Steps",
                      data: activityData.map(([_, { steps }]) => steps),
                      backgroundColor: "#2dd4bf",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <LoadError items="sleep" />
          )}
        </article>
        <article>
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🤾‍♀️</span>
              <SectionLink label="Readiness" href="/health/readiness" />
            </h2>
            <p class="text-gray-500">How ready am I for the day?</p>
          </header>
          {activityData ? (
            <div class="chart-container">
              <Chart
                width={380}
                height={250}
                type="bar"
                options={chartOptions}
                data={{
                  labels: activityData.map(([date, { score }]) => [
                    `${new Date(date)
                      .toLocaleString("en-US", {
                        weekday: "long",
                      })
                      .substring(0, 3)} ${new Date(date).getDate()}`,
                    replaceToBold(
                      `${Number(score).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 1,
                      })}%`
                    ),
                  ]),
                  datasets: [
                    {
                      label: "Score",
                      data: activityData.map(([_, { score }]) => score),
                      backgroundColor: "#fbbf24",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <LoadError items="activity" />
          )}
        </article>
      </section>
    </div>
  );
}
