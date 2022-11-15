import { Handlers, PageProps } from "$fresh/server.ts";
import smartquotes from "https://esm.sh/smartquotes-ts@0.0.2";
import * as colors from "twind/colors";
import { DataFooterLinks } from "../../components/data/DataFooterLinks.tsx";
import { OKRCards } from "../../components/data/OKRs.tsx";
import { LoadError } from "../../components/text/LoadError.tsx";
import { SectionLink } from "../../components/text/SectionLink.tsx";
import { fetchJson, fetchText } from "../../utils/data.tsx";
import type {
  LifeData,
  LocationApiResult,
  OptionalItemSummaryValue,
  OuraActivity,
  OuraReadiness,
  OuraSleepData,
  Timeline as ITimeline,
} from "../../utils/interfaces.ts";

const birthdayThisYear = new Date("1997-12-29");
birthdayThisYear.setUTCFullYear(new Date().getUTCFullYear());
const nextBirthday =
  Date.now() < birthdayThisYear.getTime()
    ? birthdayThisYear
    : new Date(birthdayThisYear.getTime() + 31536000000);

export const handler: Handlers<LifeData> = {
  async GET(request, context) {
    const heart: OptionalItemSummaryValue = undefined;
    let sleep: Record<string, OuraSleepData> | undefined = undefined;
    let activity: Record<string, OuraActivity> | undefined = undefined;
    let location: OptionalItemSummaryValue = undefined;
    let timeline: ITimeline = [];
    let contributionsApi: string | undefined = undefined;
    let lastWeekMusicApi: string | undefined = undefined;

    try {
      const [_timeline, _contributionsApi, _lastWeekMusicApi] =
        await Promise.all([
          fetchJson<ITimeline>(
            "https://anandchowdhary.github.io/everything/api.json"
          ),
          fetchText("https://github.com/users/AnandChowdhary/contributions"),
          fetchText(
            "https://gist.githubusercontent.com/AnandChowdhary/14a66f452302d199c4abde0ffe891922/raw"
          ),
        ]);
      timeline = _timeline;
      contributionsApi = _contributionsApi;
      lastWeekMusicApi = _lastWeekMusicApi;
    } catch (error) {
      //
    }

    const okr = timeline?.find(({ type }) => type === "okr") as
      | LifeData["okr"]
      | undefined;
    let contributionsGraph: string | undefined = undefined;

    try {
      const [sleepData, activityData, readinessData, locationData] =
        await Promise.all([
          fetchJson<Record<string, OuraSleepData>>(
            `https://anandchowdhary.github.io/life/data/oura-sleep/summary/days.json`
          ),
          fetchJson<Record<string, OuraActivity>>(
            `https://anandchowdhary.github.io/life/data/oura-activity/summary/days.json`
          ),
          fetchJson<Record<string, OuraReadiness>>(
            `https://anandchowdhary.github.io/life/data/oura-readiness/summary/days.json`
          ),
          fetchJson<LocationApiResult>(
            "https://anandchowdhary.github.io/location/api.json"
          ),
        ]);
      location = {
        values: [
          locationData.label,
          locationData.country.name.replace(" of America", ""),
          locationData.timezone?.utcOffsetStr ?? "",
          new Date()
            .toLocaleTimeString("en-US", {
              timeStyle: "short",
              timeZone: locationData?.timezone?.name,
            })
            .toLowerCase(),
          locationData.country.code,
          locationData.approximateCoordinates.join(),
        ],
        timeAgo: locationData.updatedAt,
      };
      if (contributionsApi)
        contributionsGraph =
          `<svg viewbox="0 0 717 112" class="js-calendar-graph-svg">` +
          contributionsApi
            .split(
              `<svg width="717" height="112" class="js-calendar-graph-svg">`
            )[1]
            .split("</svg>")[0] +
          "</svg>";
      sleep = sleepData;
      activity = activityData;
    } catch (error) {
      //
    }

    let music: LifeData["music"] | undefined = undefined;
    if (lastWeekMusicApi) {
      music = lastWeekMusicApi.split("\n").map((line) => {
        return {
          name: line
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
            (lastWeekMusicApi ?? "")
              .split("\n")
              .map((line) =>
                parseInt(line.replace(" plays", "").split(" ").pop() ?? "0")
              )
              .reduce((a, b) => a + b, 0),
        };
      });
    }

    const props = {
      timeline,
      okr,
      gyroscope: {
        location,
        heart,
        activity,
        sleep,
      },
      theme: {
        year: "2022",
        title: "Year of Teamwork",
        description:
          "I want to delegate more and plan for further into the future, do a better job at internalizing feedback, and continue to do the things I did right while investing more in my support system.",
      },
      contributionsGraph,
      query: new URL(request.url).search,
      music,
    };
    const response = await context.render(props);
    response.headers.set("Cache-Control", "public, max-age=600");
    return response;
  },
};

export default function Home({ data }: PageProps<LifeData>) {
  const { okr, theme, gyroscope, contributionsGraph, music } = data;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <header class="space-y-2">
        <h1 class="text-4xl font-semibold font-display">Life</h1>
        <p class="text-xl leading-relaxed">
          You can get in touch with me by filling the form below.
        </p>
      </header>
      <section class="grid md:grid-cols-2 gap-8">
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🌈</span>
              <SectionLink label="Yearly themes" href="/life/themes" />
            </h2>
            <p class="text-gray-500">
              Yearly theme that dictates quarterly goals
            </p>
          </header>
          <div class="relative space-y-2 bg-white p-4 rounded shadow-sm">
            <p class="text-2xl">{theme.title}</p>
            <p class="h-20 overflow-hidden text-sm text-gray-500">
              {theme.description}
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
            apiUrl="https://anandchowdhary.github.io/everything/api.json"
            githubUrl="https://github.com/AnandChowdhary/everything"
            links={[{ label: "View past themes", href: "/life/themes" }]}
          />
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">📊</span>
              <SectionLink label="Quarterly OKRs" href="/life/okrs" />
            </h2>
            <p class="text-gray-500">Personal Objectives and Key Results</p>
          </header>
          {okr ? <OKRCards okr={okr} /> : <LoadError items="OKRs" />}
          <DataFooterLinks
            apiUrl="https://anandchowdhary.github.io/okrs/api.json"
            githubUrl="https://github.com/AnandChowdhary/okrs"
            links={[{ label: "View past OKRs", href: "/life/okrs" }]}
          />
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">📍</span>
              <SectionLink label="Location" href="/life/location" />
            </h2>
            <p class="text-gray-500">Tracking my location in real time</p>
          </header>
          <div class="relative bg-white rounded shadow-sm">
            {gyroscope.location && (
              <img
                alt=""
                src={`https://api.mapbox.com/styles/v1/anandchowdhary/cl91jzd61002q14pm7vtwfa2l/static/${gyroscope.location.values[5]
                  .split(",")
                  .reverse()
                  .join()},13/368x200?access_token=pk.eyJ1IjoiYW5hbmRjaG93ZGhhcnkiLCJhIjoiY2w5MWpxbXZ2MDdpMzN2bW92ZnRzZ2Q4bSJ9.WMWxq61EUjQfWtntvGGNKQ`}
                class="w-full rounded-t"
              />
            )}
            <div class="p-4">
              {gyroscope.location ? (
                <div class="space-y-2">
                  <p class="flex items-center mb-1 space-x-3 leading-5">
                    {gyroscope.location.values[4] && (
                      <img
                        alt=""
                        src={`https://cdn.jsdelivr.net/gh/Yummygum/flagpack-core@v2.0.0/svg/m/${gyroscope.location.values[4].toUpperCase()}.svg`}
                        class="rounded-sm"
                      />
                    )}
                    <strong class="font-medium">
                      {gyroscope.location.values[0]}
                    </strong>
                    {`, ${gyroscope.location.values[1]}`}
                  </p>
                  {gyroscope.location.values[2] && (
                    <p class="text-sm text-gray-500">
                      {smartquotes(
                        `It's ${gyroscope.location.values[3]} (UTC ${gyroscope.location.values[2]})`
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
            links={[{ label: "View past location", href: "/life/location" }]}
          />
        </article>
        <article class="space-y-4">
          <header>
            <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
              <span aria-hidden="true">🎵</span>
              <SectionLink label="Music" href="/life/music" />
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
                      src={`https://images.weserv.nl/?&maxage=1y&url=${encodeURIComponent(
                        `tse2.mm.bing.net/th?q=${encodeURIComponent(
                          artist.name
                        )}&w=48&h=48&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate`
                      )}&w=48&h=48&fit=cover`}
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
              <SectionLink label="Calories burned" href="/life/calories" />
            </h2>
            <p class="text-gray-500">Tracked with Oura</p>
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
            {gyroscope.activity ? (
              Object.entries(gyroscope.activity)
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
                                ...Object.values(gyroscope.activity ?? {}).map(
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
              <SectionLink label="Sleep" href="/life/sleep" />
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
            {gyroscope.sleep ? (
              Object.entries(gyroscope.sleep)
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
                                ...Object.values(gyroscope.sleep ?? {}).map(
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
              <SectionLink label="Steps" href="/life/steps" />
            </h2>
            <p class="text-gray-500">Tracked every day using Oura</p>
          </header>
          <div class="flex relative -mx-2 h-64">
            {gyroscope.activity ? (
              Object.entries(gyroscope.activity)
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
                                ...Object.values(gyroscope.activity ?? {}).map(
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
              <SectionLink label="Score" href="/life/steps" />
            </h2>
            <p class="text-gray-500">Tracked every day using Oura</p>
          </header>
          <div class="flex relative -mx-2 h-64">
            {gyroscope.activity ? (
              Object.entries(gyroscope.activity)
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
            <SectionLink label="Contributions" href="/life/location" />
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
