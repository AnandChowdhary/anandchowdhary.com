import { Handlers, PageProps } from "$fresh/server.ts";
import smartquotes from "https://esm.sh/smartquotes-ts@0.0.2";
import { TimelineTravel } from "https://esm.sh/timeline-types@3.0.0/index.d.ts";
import * as colors from "twind/colors";
import { DataFooterLinks } from "../../components/data/DataFooterLinks.tsx";
import { OKRCards } from "../../components/data/OKRs.tsx";
import { LoadError } from "../../components/text/LoadError.tsx";
import { SectionLink } from "../../components/text/SectionLink.tsx";
import { fetchLifeData, fetchText } from "../../utils/data.tsx";
import type { AllLifeDataSummary } from "../../utils/interfaces.ts";
import { countryName } from "../../utils/string.ts";
import { getFlagUrl, imageUrl } from "../../utils/urls.ts";

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

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <header class="space-y-2">
        <h1 class="text-4xl font-semibold font-display">Life</h1>
        <p class="text-xl leading-relaxed">
          For several years, I've been tracking all my life data (health,
          activity, location, etc.) in near-real time using automated tools and
          microservices.
        </p>
        <p>
          All data is also available as a publicly-available JSON API and under
          permissive licenses on GitHub. In the (near?) future, I will write a
          blog post on how I set this up.
        </p>
      </header>
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
              <SectionLink label="Location" href="/travel" />
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
                      colors.orange[400]
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
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🔥</span>
              <SectionLink label="Calories burned" href="/health/calories" />
            </h2>
            <p class="text-gray-500">Tracked every day with Oura</p>
          </header>
          <div class="flex relative -mx-2 h-64">
            <div
              class="absolute z-10 right-4 top-2 flex space-x-4 text-xs justify-center py-1 px-2 rounded"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(0.5rem)",
              }}
            >
              <div class="flex items-center space-x-2">
                <div
                  class="h-3 w-3 rounded"
                  style={{ background: "#fca5a5" }}
                ></div>
                <span>Total</span>
              </div>
              <div class="flex items-center space-x-2">
                <div
                  class="h-3 w-3 rounded"
                  style={{
                    background: "#ef4444",
                  }}
                ></div>
                <span>Active</span>
              </div>
            </div>
            {activity ? (
              Object.entries(activity)
                .filter(([_, { cal_total }]) => cal_total > 0)
                .slice(-7)
                .map(([date, { cal_total, cal_active }]) => (
                  <div key={date} class="flex-1 w-full flex items-end">
                    <div class="w-full px-2 h-full flex flex-col justify-end">
                      <div
                        class="rounded-lg relative overflow-hidden"
                        style={{
                          background: "#fca5a5",
                          height: `${Math.round(
                            (100 * cal_total) /
                              Math.max(
                                ...Object.values(activity ?? {}).map(
                                  (x) => x.cal_total ?? 0
                                )
                              )
                          )}%`,
                        }}
                      >
                        <div
                          class="absolute left-0 right-0"
                          style={{
                            background: "#ef4444",
                            height: `${Math.round(
                              (100 * cal_active) / cal_total
                            )}%`,
                            bottom: "0",
                          }}
                        ></div>
                      </div>
                      <div class="text-xs text-center mt-2 truncate">
                        <div>
                          {`${new Date(date)
                            .toLocaleString("en-US", {
                              weekday: "long",
                            })
                            .substring(0, 3)} ${new Date(date).getDate()}`}
                        </div>
                        <div>
                          <strong class="font-medium">{`${Number(
                            cal_total
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1,
                          })}`}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <LoadError items="activity" />
            )}
          </div>
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🛌</span>
              <SectionLink label="Sleep" href="/health/sleep" />
            </h2>
            <p class="text-gray-500">Different stages of sleep</p>
          </header>
          <div class="flex relative -mx-2 h-64">
            <div
              class="absolute z-10 right-4 top-2 flex space-x-4 text-xs justify-center py-1 px-2 rounded"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(0.5rem)",
              }}
            >
              <div class="flex items-center space-x-2">
                <div
                  class="h-3 w-3 rounded"
                  style={{ background: "#818cf8" }}
                ></div>
                <span>Light</span>
              </div>
              <div class="flex items-center space-x-2">
                <div
                  class="h-3 w-3 rounded"
                  style={{ background: "#6366f1" }}
                ></div>
                <span>Deep</span>
              </div>
              <div class="flex items-center space-x-2">
                <div
                  class="h-3 w-3 rounded"
                  style={{ background: "#3730a3" }}
                ></div>
                <span>REM</span>
              </div>
            </div>
            {sleep ? (
              Object.entries(sleep)
                .filter(([_, { total }]) => total > 0)
                .slice(-7)
                .map(([date, { deep, rem, total }]) => (
                  <div key={date} class="flex-1 w-full flex items-end">
                    <div class="w-full px-2 h-full flex flex-col justify-end">
                      <div
                        class="rounded-lg relative overflow-hidden"
                        style={{
                          background: "#818cf8",
                          height: `${Math.round(
                            (100 * total) /
                              Math.max(
                                ...Object.values(sleep ?? {}).map(
                                  (x) => x.total ?? 0
                                )
                              )
                          )}%`,
                        }}
                      >
                        <div
                          class="absolute left-0 right-0"
                          style={{
                            background: "#6366f1",
                            height: `${Math.round((100 * deep) / total)}%`,
                            bottom: `${Math.round((100 * rem) / total)}%`,
                          }}
                        ></div>
                        <div
                          class="absolute left-0 right-0"
                          style={{
                            background: "#3730a3",
                            height: `${Math.round((100 * rem) / total)}%`,
                            bottom: "0",
                          }}
                        ></div>
                      </div>
                      <div class="text-xs text-center mt-2 truncate">
                        <div>
                          {`${new Date(date)
                            .toLocaleString("en-US", {
                              weekday: "long",
                            })
                            .substring(0, 3)} ${new Date(date).getDate()}`}
                        </div>
                        <div>
                          <strong class="font-medium">{`${Number(
                            total / 3600
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1,
                          })}h`}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <LoadError items="sleep" />
            )}
          </div>
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🏃‍♂️</span>
              <SectionLink label="Steps" href="/health/steps" />
            </h2>
            <p class="text-gray-500">Tracked every day using Oura</p>
          </header>
          <div class="flex relative -mx-2 h-64">
            {activity ? (
              Object.entries(activity)
                .filter(([_, { steps }]) => steps > 0)
                .slice(-7)
                .map(([date, { steps }]) => (
                  <div key={date} class="flex-1 w-full flex items-end">
                    <div class="w-full px-2 h-full flex flex-col justify-end">
                      <div
                        class="rounded-lg relative overflow-hidden"
                        style={{
                          background: "#2dd4bf",
                          height: `${Math.round(
                            (100 * steps) /
                              Math.max(
                                ...Object.values(activity ?? {}).map(
                                  (x) => x.steps ?? 0
                                )
                              )
                          )}%`,
                        }}
                      />
                      <div class="text-xs text-center mt-2 truncate">
                        <div>
                          {`${new Date(date)
                            .toLocaleString("en-US", {
                              weekday: "long",
                            })
                            .substring(0, 3)} ${new Date(date).getDate()}`}
                        </div>
                        <div>
                          <strong class="font-medium">{`${Number(
                            steps
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1,
                          })}`}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <LoadError items="sleep" />
            )}
          </div>
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🏃‍♂️</span>
              <SectionLink label="Readiness" href="/health/readiness" />
            </h2>
            <p class="text-gray-500">How ready am I for the day?</p>
          </header>
          <div class="flex relative -mx-2 h-64">
            {activity ? (
              Object.entries(activity)
                .filter(([_, { score }]) => score > 0)
                .slice(-7)
                .map(([date, { score }]) => (
                  <div key={date} class="flex-1 w-full flex items-end">
                    <div class="w-full px-2 h-full flex flex-col justify-end">
                      <div
                        class="rounded-lg relative overflow-hidden"
                        style={{
                          background: "#fbbf24",
                          height: `${Math.round(score)}%`,
                        }}
                      />
                      <div class="text-xs text-center mt-2 truncate">
                        <div>
                          {`${new Date(date)
                            .toLocaleString("en-US", {
                              weekday: "long",
                            })
                            .substring(0, 3)} ${new Date(date).getDate()}`}
                        </div>
                        <div>
                          <strong class="font-medium">{`${Number(
                            score
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1,
                          })}%`}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <LoadError items="activity" />
            )}
          </div>
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
    </div>
  );
}
