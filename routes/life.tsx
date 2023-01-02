import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Chart,
  ChartOptions,
} from "https://deno.land/x/fresh_charts@0.1.1/mod.ts";
import smartquotes from "https://esm.sh/smartquotes-ts@0.0.2";
import { TimelineTravel } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import * as colors from "twind/colors";
import { Breadcrumbs } from "../components/data/Breadcrumbs.tsx";
import { DataFooterLinks } from "../components/data/DataFooterLinks.tsx";
import { OKRCards } from "../components/data/OKRs.tsx";
import { SectionTitle } from "../components/data/SectionTitle.tsx";
import { Timeline } from "../components/data/Timeline.tsx";
import { LoadError } from "../components/text/LoadError.tsx";
import { SectionLink } from "../components/text/SectionLink.tsx";
import { fetchLifeData, fetchText } from "../utils/data.tsx";
import type { AllLifeDataSummary } from "../utils/interfaces.ts";
import { countryName } from "../utils/string.ts";
import { getFlagUrl, imageUrl } from "../utils/urls.ts";

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
    return context.render(props);
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
      <Breadcrumbs items={[{ href: "/life", title: "Life" }]} />
      <SectionTitle
        title="Life"
        description="For several years, I've been tracking all my life data (health,
          activity, location, etc.) in near-real time using automated tools and
          microservices."
      >
        <p>
          All data is also available as a publicly-available JSON API and under
          permissive licenses on GitHub. In the (near?) future, I will write a
          blog post on how I set this up.
        </p>
      </SectionTitle>
      <section class="grid md:grid-cols-2 gap-8">
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🌈</span>
              <SectionLink label="Yearly themes" href="/themes" />
            </h2>
            <p class="text-gray-500">
              Yearly theme that dictates quarterly goals
            </p>
          </header>
          <div class="relative space-y-2 bg-white p-4 rounded shadow-sm">
            <p class="text-2xl">{theme.title}</p>
            <p class="h-20 overflow-hidden text-sm text-gray-500">
              {theme.data.description}
            </p>
            <div
              class="absolute bottom-0 left-0 right-0 h-24 rounded-b pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255, 255, 255, 0.001), rgba(255, 255, 255, 1))",
              }}
            />
          </div>
          <DataFooterLinks
            apiUrl="https://anandchowdhary.github.io/themes/api.json"
            githubUrl="https://github.com/AnandChowdhary/themes"
          />
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">📊</span>
              <SectionLink label="Quarterly OKRs" href="/okrs" />
            </h2>
            <p class="text-gray-500">Personal Objectives and Key Results</p>
          </header>
          {okr ? <OKRCards okr={okr} /> : <LoadError items="OKRs" />}
          <DataFooterLinks
            apiUrl="https://anandchowdhary.github.io/okrs/api.json"
            githubUrl="https://github.com/AnandChowdhary/okrs"
          />
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">📍</span>
              <SectionLink label="Location" href="/location" />
            </h2>
            <p class="text-gray-500">Find me where I currently am</p>
          </header>
          <div class="relative bg-white rounded shadow-sm">
            {location && (
              <img
                alt=""
                src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${location.approximateCoordinates
                  .join()
                  .split(",")
                  .reverse()
                  .join()},12/368x200?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
                class="w-full rounded-t"
              />
            )}
            <div class="p-4">
              {location ? (
                <div class="space-y-2">
                  <p class="flex items-center mb-1 space-x-3 leading-5">
                    <img
                      alt=""
                      src={getFlagUrl(location.country.code)}
                      class="rounded-sm w-5"
                    />
                    <strong class="font-medium">{location.label}</strong>
                    {`, ${countryName(location.country.name)}`}
                  </p>
                  {location.timezone && (
                    <p class="text-sm text-gray-500">
                      {smartquotes(
                        `It's ${new Date()
                          .toLocaleTimeString("en-US", {
                            timeStyle: "short",
                            timeZone: location.timezone?.name,
                          })
                          .toLowerCase()} (UTC ${toHoursAndMinutes(
                          location.timezone.utcOffset ?? 0
                        )})`
                      )}
                    </p>
                  )}
                </div>
              ) : (
                <LoadError items="location" />
              )}
            </div>
          </div>
          <DataFooterLinks
            apiUrl="https://anandchowdhary.github.io/location/api.json"
            githubUrl="https://github.com/AnandChowdhary/location"
          />
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🛩️</span>
              <SectionLink label="Travel" href="/travel" />
            </h2>
            <p class="text-gray-500">Most recently visited new countries</p>
          </header>
          <div class="space-y-2">
            {(
              Array.from(
                new Set(
                  (
                    [
                      ...data.timeline.filter((i) => i.type === "travel"),
                    ] as TimelineTravel[]
                  )
                    .reverse()
                    .map((i) => i.data.country.code.toLowerCase())
                )
              )
                .map((key) =>
                  data.timeline.findLast(
                    (i) =>
                      i.type === "travel" &&
                      i.data.country.code.toLowerCase() === key
                  )
                )
                .filter((item) => !!item) as TimelineTravel[]
            )
              .reverse()
              .slice(0, 5)
              .sort(
                (a, b) =>
                  new Date(b?.date ?? 0).getTime() -
                  new Date(a?.date ?? 0).getTime()
              )
              .map((location) => {
                if (!location) return null;
                return (
                  <div
                    key={location.url}
                    class="flex bg-white rounded-lg shadow-sm items-center"
                  >
                    <div class="min-w-12 relative">
                      <img
                        alt=""
                        src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${location.data.approximateCoordinates
                          .reverse()
                          .join(
                            ","
                          )},6/48x48?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
                        width={48}
                        height={48}
                        loading="lazy"
                        class="object-cover w-12 h-full rounded-l-lg opacity-50"
                      />
                      <div class="absolute right-0 bottom-0 left-0 top-0 flex items-center justify-center">
                        <img
                          alt=""
                          src={getFlagUrl(Object(location.data?.country)?.code)}
                          class="rounded-sm w-5"
                        />
                      </div>
                    </div>
                    <div class="flex items-center justify-between flex-grow h-12 px-4">
                      <div>{Object(location.data?.country)?.name}</div>
                      <div
                        class="text-gray-500 text-right"
                        style={{ minWidth: "6rem" }}
                      >
                        {new Date(location.date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <DataFooterLinks
            apiUrl="https://anandchowdhary.github.io/location/history-unique.json"
            githubUrl="https://github.com/AnandChowdhary/location"
          />
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">📕</span>
              <SectionLink label="Books" href="/books" />
            </h2>
            <p class="text-gray-500">Most recently completed books</p>
          </header>
          <div class="space-y-2">
            {data.timeline
              .filter((i) => i.type === "book")
              .slice(0, 5)
              .map((book) => (
                <div
                  key={book.url}
                  class="flex bg-white rounded-lg shadow-sm items-center"
                >
                  <div class="min-w-12">
                    <img
                      alt=""
                      src={imageUrl(
                        `https://tse2.mm.bing.net/th?q=${encodeURIComponent(
                          `${book.title} audiobook cover`
                        )}&w=48&h=48&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate`,
                        { w: "48", h: "48", fit: "cover" }
                      )}
                      width={48}
                      height={48}
                      loading="lazy"
                      class="object-cover w-12 h-full rounded-l-lg"
                    />
                  </div>
                  <div class="flex items-center justify-between flex-grow h-12 px-4">
                    <div>{book.title}</div>
                    <div
                      class="text-gray-500 text-right"
                      style={{ minWidth: "6rem" }}
                    >
                      {new Date(book.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <DataFooterLinks
            apiUrl="https://anandchowdhary.github.io/books/api.json"
            githubUrl="https://github.com/AnandChowdhary/books"
          />
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🎵</span>
              <SectionLink label="Music" href="/music" />
            </h2>
            <p class="text-gray-500">Last week in Spotify listening history</p>
          </header>
          <div class="space-y-2">
            {music ? (
              music.slice(0, 5).map((artist) => (
                <div
                  key={artist.name}
                  class="flex bg-white rounded-lg shadow-sm"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${
                      colors.rose[400]
                    } ${Math.round(artist.percent * 100)}%, white ${
                      Math.round(artist.percent * 100) + 0.01
                    }%)`,
                    backgroundSize: "100% 0.1rem",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "3rem 100%",
                  }}
                >
                  <div class="min-w-12">
                    <img
                      alt=""
                      src={imageUrl(
                        `https://tse2.mm.bing.net/th?q=${encodeURIComponent(
                          artist.name
                        )}&w=48&h=48&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate`,
                        { w: "48", h: "48", fit: "cover" }
                      )}
                      width={48}
                      height={48}
                      loading="lazy"
                      class="object-cover w-12 h-full rounded-l-lg"
                    />
                  </div>
                  <div class="flex items-center justify-between flex-grow h-12 px-4">
                    <div>{artist.name}</div>
                    <div class="text-gray-500">{`${artist.plays} ${
                      artist.plays === 1 ? "play" : "plays"
                    }`}</div>
                  </div>
                </div>
              ))
            ) : (
              <LoadError items="music" />
            )}
          </div>
          <DataFooterLinks
            apiUrl="https://api.github.com/gists/14a66f452302d199c4abde0ffe891922"
            githubUrl="https://gist.github.com/AnandChowdhary/14a66f452302d199c4abde0ffe891922"
          />
        </article>
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
      <section class="space-y-4">
        <header>
          <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
            <span aria-hidden="true">👨‍💻</span>
            <SectionLink label="Contributions" href="/open-source" />
          </h2>
          <p class="text-gray-500">Last year in GitHub activity</p>
        </header>
        <style
          dangerouslySetInnerHTML={{
            __html: `
.js-calendar-graph-svg {
  width: 100%;
}
.ContributionCalendar-label {
  font-size: 70%;
  opacity: 0.5;
}
.ContributionCalendar-day[data-level="0"] {
  fill: white;
}
.ContributionCalendar-day[data-level="1"] {
  fill: ${colors.green[300]};
}
.ContributionCalendar-day[data-level="2"] {
  fill: ${colors.green[500]};
}
.ContributionCalendar-day[data-level="3"] {
  fill: ${colors.green[700]};
}
.ContributionCalendar-day[data-level="4"] {
  fill: ${colors.green[900]};
}
`,
          }}
        />
        {contributionsGraph ? (
          <div dangerouslySetInnerHTML={{ __html: contributionsGraph }} />
        ) : (
          <LoadError items="contributions" />
        )}
      </section>
      <section>
        <h2 class="text-xl font-medium font-display">Timeline</h2>
        <Timeline
          timeline={data.timeline}
          show={data.timeline.filter(({ type }) => type === "life-event")}
          query={data.query}
          yearHrefPrefix=""
          hideYearHeading
        />
      </section>
    </div>
  );
}
