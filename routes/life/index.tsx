import { asset } from "$fresh/runtime.ts";
import * as colors from "twind/colors";
import { Handlers, PageProps } from "$fresh/server.ts";
import smartquotes from "https://esm.sh/smartquotes-ts@0.0.2";
import { ComponentChildren } from "preact";
import { DataFooterLinks } from "../../components/data/DataFooterLinks.tsx";
import { OKRCards } from "../../components/data/OKRs.tsx";
import { Timeline } from "../../components/data/Timeline.tsx";
import { ExternalLink } from "../../components/text/ExternalLink.tsx";
import { LoadError } from "../../components/text/LoadError.tsx";
import { SectionLink } from "../../components/text/SectionLink.tsx";
import Age from "../../islands/Age.tsx";
import TimeAgo from "../../islands/TimeAgo.tsx";
import { categoryData, fetchJson, fetchText } from "../../utils/data.tsx";
import { t } from "../../utils/i18n.tsx";
import type {
  ApiWeeklyValues,
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
    let heart: OptionalItemSummaryValue = undefined;
    let sleep: OptionalItemSummaryValue = undefined;
    let steps: OptionalItemSummaryValue = undefined;
    let location: OptionalItemSummaryValue = undefined;
    let timeline: ITimeline = [];
    let sleepApi: ApiWeeklyValues = { weeks: {} };
    let activityApi: ApiWeeklyValues = { weeks: {} };
    let readinessApi: ApiWeeklyValues = { weeks: {} };
    let contributionsApi: string | undefined = undefined;
    let lastWeekMusicApi: string | undefined = undefined;

    try {
      const [
        _timeline,
        _sleepApi,
        _activityApi,
        _readinessApi,
        _contributionsApi,
        _lastWeekMusicApi,
      ] = await Promise.all([
        fetchJson<ITimeline>(
          "https://anandchowdhary.github.io/everything/api.json"
        ),
        fetchJson<ApiWeeklyValues>(
          "https://anandchowdhary.github.io/life/data/oura-sleep/api.json"
        ),
        fetchJson<ApiWeeklyValues>(
          "https://anandchowdhary.github.io/life/data/oura-activity/api.json"
        ),
        fetchJson<ApiWeeklyValues>(
          "https://anandchowdhary.github.io/life/data/oura-readiness/api.json"
        ),
        fetchText("https://github.com/users/AnandChowdhary/contributions"),
        fetchText(
          "https://gist.githubusercontent.com/AnandChowdhary/14a66f452302d199c4abde0ffe891922/raw"
        ),
      ]);
      timeline = _timeline;
      sleepApi = _sleepApi;
      activityApi = _activityApi;
      readinessApi = _readinessApi;
      contributionsApi = _contributionsApi;
      lastWeekMusicApi = _lastWeekMusicApi;
    } catch (error) {
      //
    }

    const okr = timeline?.find(({ type }) => type === "okr") as
      | LifeData["okr"]
      | undefined;

    const sleepApiYear = Number(
      Object.keys(sleepApi.weeks).sort((a, b) => Number(b) - Number(a))[0]
    );
    const activityApiYear = Number(
      Object.keys(activityApi.weeks).sort((a, b) => Number(b) - Number(a))[0]
    );
    const readinessApiYear = Number(
      Object.keys(readinessApi.weeks).sort((a, b) => Number(b) - Number(a))[0]
    );
    let contributionsGraph: string | undefined = undefined;

    try {
      const [sleepData, activityData, readinessData, locationData] =
        await Promise.all([
          fetchJson<Record<string, OuraSleepData>>(
            `https://anandchowdhary.github.io/life/data/oura-sleep/summary/weeks/2022/${sleepApi.weeks[
              sleepApiYear
            ].pop()}`
          ),
          fetchJson<Record<string, OuraActivity>>(
            `https://anandchowdhary.github.io/life/data/oura-activity/summary/weeks/2022/${activityApi.weeks[
              activityApiYear
            ].pop()}`
          ),
          fetchJson<Record<string, OuraReadiness>>(
            `https://anandchowdhary.github.io/life/data/oura-readiness/summary/weeks/2022/${readinessApi.weeks[
              readinessApiYear
            ].pop()}`
          ),
          fetchJson<LocationApiResult>(
            "https://anandchowdhary.github.io/location/api.json"
          ),
        ]);
      const sleepDataLast = Object.entries(sleepData)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .find((item) => item[1].total > 1);
      const activityDataLast = Object.entries(activityData)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .find((item) => item[1].total > 1);
      const readinessDataLast = Object.entries(readinessData)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .find((item) => item[1].score_resting_hr > 1);

      if (sleepDataLast)
        sleep = {
          values: [
            (sleepDataLast[1].total / 3600).toLocaleString("en-US", {
              maximumFractionDigits: 1,
            }),
            (sleepDataLast[1].rem / 3600).toLocaleString("en-US", {
              maximumFractionDigits: 1,
            }),
            sleepDataLast[1].efficiency.toLocaleString("en-US"),
          ],
        };
      if (activityDataLast)
        steps = {
          values: [
            Math.round(activityDataLast[1].steps).toLocaleString("en-US"),
            Math.round(activityDataLast[1].cal_active).toLocaleString("en-US"),
            Math.round(activityDataLast[1].cal_total).toLocaleString("en-US"),
          ],
        };
      if (readinessDataLast)
        heart = {
          values: [
            Math.round(readinessDataLast[1].score).toLocaleString("en-US"),
            Math.round(readinessDataLast[1].score_previous_day).toLocaleString(
              "en-US"
            ),
          ],
        };
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
        steps,
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
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold font-display dark:text-gray-200">
          Life
        </h1>
        <p className="text-xl leading-relaxed">
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
                  <p className="flex items-center mb-1 space-x-3 leading-5">
                    {gyroscope.location.values[4] && (
                      <img
                        alt=""
                        src={`https://cdn.jsdelivr.net/gh/Yummygum/flagpack-core@v2.0.0/svg/m/${gyroscope.location.values[4].toUpperCase()}.svg`}
                        class="rounded-sm"
                      />
                    )}
                    <strong className="font-medium">
                      {gyroscope.location.values[0]}
                    </strong>
                    {`, ${gyroscope.location.values[1]}`}
                  </p>
                  {gyroscope.location.values[2] && (
                    <p className="text-sm text-gray-500">
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
          <div className="space-y-2">
            {music ? (
              music.slice(0, 5).map((artist) => (
                <div
                  key={artist.name}
                  className="flex bg-white rounded-lg shadow-sm"
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
                  <div className="min-w-12">
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
                      className="object-cover w-12 h-full rounded-l-lg"
                    />
                  </div>
                  <div className="flex items-center justify-between flex-grow h-12 px-4">
                    <div>{artist.name}</div>
                    <div className="text-gray-500">{`${artist.plays} ${
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
      </section>
      <section className="space-y-4">
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
