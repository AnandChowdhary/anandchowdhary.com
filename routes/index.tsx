import { asset } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import smartquotes from "https://esm.sh/smartquotes-ts@0.0.2";
import { ComponentChildren } from "preact";
import { DataFooterLinks } from "../components/data/DataFooterLinks.tsx";
import { OKRCards } from "../components/data/OKRs.tsx";
import { Timeline } from "../components/data/Timeline.tsx";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { LoadError } from "../components/text/LoadError.tsx";
import { SectionLink } from "../components/text/SectionLink.tsx";
import { Socials } from "../components/text/Socials.tsx";
import Age from "../islands/Age.tsx";
import TimeAgo from "../islands/TimeAgo.tsx";
import { categoryData, fetchJson } from "../utils/data.tsx";
import { t } from "../utils/i18n.tsx";
import type {
  ApiWeeklyValues,
  HomeData,
  LocationApiResult,
  OptionalItemSummaryValue,
  OuraActivity,
  OuraReadiness,
  OuraSleepData,
  Timeline as ITimeline,
} from "../utils/interfaces.ts";

const birthdayThisYear = new Date("1997-12-29");
birthdayThisYear.setUTCFullYear(new Date().getUTCFullYear());
const nextBirthday =
  Date.now() < birthdayThisYear.getTime()
    ? birthdayThisYear
    : new Date(birthdayThisYear.getTime() + 31536000000);

export const handler: Handlers<HomeData> = {
  async GET(request, context) {
    let heart: OptionalItemSummaryValue = undefined;
    let sleep: OptionalItemSummaryValue = undefined;
    let steps: OptionalItemSummaryValue = undefined;
    let location: OptionalItemSummaryValue = undefined;
    let timeline: ITimeline = [];
    let sleepApi: ApiWeeklyValues = { weeks: {} };
    let activityApi: ApiWeeklyValues = { weeks: {} };
    let readinessApi: ApiWeeklyValues = { weeks: {} };

    try {
      const [_timeline, _sleepApi, _activityApi, _readinessApi] =
        await Promise.all([
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
        ]);
      timeline = _timeline;
      sleepApi = _sleepApi;
      activityApi = _activityApi;
      readinessApi = _readinessApi;
    } catch (error) {
      //
    }

    const okr = timeline?.find(({ type }) => type === "okr") as
      | HomeData["okr"]
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
        ],
        timeAgo: locationData.updatedAt,
      };
    } catch (error) {
      //
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
      query: new URL(request.url).search,
    };
    const response = await context.render(props);
    response.headers.set("Cache-Control", "public, max-age=600");
    return response;
  },
};

export default function Home({ data }: PageProps<HomeData>) {
  const { timeline, okr, theme, gyroscope, query } = data;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <section className="grid-cols-2 gap-8 gap-y-12 sm:grid">
        <div className="items-start justify-center mb-6 sm:flex">
          <img
            alt="Illustrated portrait of Anand in comic-book style"
            src={asset("anand.svg")}
            className="object-contain object-bottom w-1/2 sm:w-2/3"
            width={198}
            height={198}
            loading="eager"
          />
        </div>
        <div className="space-y-4">
          <h2 className="space-x-2 text-2xl font-semibold font-display">
            <span className="wave" aria-hidden="true">
              👋
            </span>
            <span>{smartquotes(" Hi, I'm Anand")}</span>
          </h2>
          <p className="text-lg text-gray-500">
            {t(
              "I'm a creative technologist and entrepreneur currently working remotely as the co-founder and CTO of <0>Pabio</0>, a rent-to-own furniture with interior design company in Europe.",
              {},
              [
                ({ children }: { children: ComponentChildren }) => (
                  <ExternalLink
                    href="https://pabio.com"
                    className="underline"
                    children={children}
                  />
                ),
              ]
            )}
          </p>
          <p>
            {smartquotes(
              "I'm also an award-winning open source contributor and Y Combinator and Forbes 30 Under 30 alum."
            )}
          </p>
          <SectionLink label="Learn more about me" href="/about" />
        </div>
      </section>
      <section className="overflow-auto">
        <div
          className="grid grid-cols-5 text-center gap-12 overflow-auto"
          style={{ minWidth: "700px" }}
        >
          {[
            {
              logo: "yourstory.svg",
              title: "20 Under 20",
              publication: "YourStory 20 Under 20",
            },
            {
              logo: "the-next-web.svg",
              title: "TNW T500",
              publication: "The Next Web T500",
            },
            {
              logo: "github-stars.svg",
              title: "GitHub Star",
              publication: "GitHub Stars",
            },
            {
              logo: "forbes.svg",
              title: "30 Under 30",
              publication: "Forbes 30 Under 30",
            },
            {
              logo: "het-financieele-dagblad.svg",
              title: "50 Under 25",
              publication: "FD Persoonlijk",
            },
          ].map((award) => (
            <a
              key={award.title}
              href="#"
              className="opacity-70 hover:opacity-100 transition relative h-12 flex flex-col items-center justify-center px-6"
            >
              <div
                className="absolute top-0 left-0 bottom-0 h-12 bg-contain bg-no-repeat bg-left"
                style={{
                  backgroundImage: "url(/awards/leaf.svg)",
                  aspectRatio: "86 / 150",
                }}
              />
              <div
                className="absolute top-0 right-0 bottom-0 h-12 bg-contain bg-no-repeat bg-right"
                style={{
                  backgroundImage: "url(/awards/leaf.svg)",
                  transform: "scaleX(-1)",
                  aspectRatio: "86 / 150",
                }}
              />
              <img alt="" src={`/awards/${award.logo}`} />
              <div className="font-medium -mt-1" style={{ fontSize: "60%" }}>
                {award.title}
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="grid-cols-2 gap-8 gap-y-12 sm:grid">
        <div className="space-y-8">
          <article className="space-y-4">
            <header>
              <h2 className="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">🌈</span>
                <SectionLink
                  label={`Theme for ${theme.year}`}
                  href="/life/themes"
                />
              </h2>
              <p className="text-gray-500">
                Yearly theme that dictates quarterly goals
              </p>
            </header>
            <div className="relative space-y-2 bg-white p-4 rounded shadow-sm">
              <p className="text-2xl">{theme.title}</p>
              <p className="h-20 overflow-hidden text-sm text-gray-500">
                {theme.description}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-24 rounded-b pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255, 255, 255, 0.001), rgba(255, 255, 255, 1))",
                }}
              />
            </div>
            <div className="pt-1">
              <DataFooterLinks
                apiUrl="https://anandchowdhary.github.io/everything/api.json"
                githubUrl="https://github.com/AnandChowdhary/everything"
                // links={[{ label: "View past themes", href: "/life/themes" }]}
              />
            </div>
          </article>
          <article className="space-y-4">
            <header>
              <h2 className="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">📊</span>
                <SectionLink
                  label={okr ? `OKRs for Q${okr.data.name}` : "OKRs"}
                  href="/life/okrs"
                />
              </h2>
              <p className="text-gray-500">
                Personal Objectives and Key Results
              </p>
            </header>
            {okr ? <OKRCards okr={okr} /> : <LoadError items="OKRs" />}
            <div className="pt-1">
              <DataFooterLinks
                apiUrl="https://anandchowdhary.github.io/okrs/api.json"
                githubUrl="https://github.com/AnandChowdhary/okrs"
                // links={[{ label: "View past OKRs", href: "/life/okrs" }]}
              />
            </div>
          </article>
        </div>
        <div className="space-y-8">
          <article className="space-y-4">
            <header>
              <h2 className="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">🌍</span>
                <SectionLink label={`Live`} href="/life" />
              </h2>
              <p className="text-gray-500">
                Tracking my life data in real time
              </p>
            </header>
            <div className="relative space-y-4">
              <div className="bg-white rounded shadow-sm p-4 space-y-4">
                <div className="flex space-x-2">
                  <span aria-hidden="true">🎂</span>
                  <div>
                    <p>
                      <Age />
                      {" years old"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Next birthday{" "}
                      <TimeAgo date={nextBirthday.toISOString()} />
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span aria-hidden="true">📍</span>
                  {gyroscope.location ? (
                    <div>
                      <p className="leading-5 mb-1">
                        Last seen in{" "}
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
                <div className="flex space-x-2">
                  <span aria-hidden="true">🛌</span>
                  {gyroscope.sleep ? (
                    <div>
                      <p className="leading-5 mb-1">
                        <span className="mr-2">
                          {"Slept "}
                          <strong className="font-medium">
                            {`${gyroscope.sleep.values[0]} hours`}
                          </strong>
                        </span>
                        <p className="text-sm text-gray-500">
                          {`${gyroscope.sleep.values[1]} hours REM sleep, ${gyroscope.sleep.values[2]}% efficient`}
                        </p>
                      </p>
                    </div>
                  ) : (
                    <LoadError items="sleep data" />
                  )}
                </div>
                <div className="flex space-x-2">
                  <span aria-hidden="true">🏃‍♂️</span>
                  {gyroscope.steps ? (
                    <div>
                      <p className="leading-5 mb-1">
                        <strong className="font-medium">
                          {`${gyroscope.steps.values[0]} steps`}
                        </strong>
                        {" walked"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {`${gyroscope.steps.values[1]} active calories of ${gyroscope.steps.values[2]} total`}
                      </p>
                    </div>
                  ) : (
                    <LoadError items="step count" />
                  )}
                </div>
                <div className="flex space-x-2">
                  <span aria-hidden="true">🫀</span>
                  {gyroscope.heart ? (
                    <div>
                      <p className="leading-5 mb-1">
                        <span className="mr-2">
                          {"Readiness score is "}
                          <strong className="font-medium">
                            {`${gyroscope.heart.values[0]}%`}
                          </strong>
                        </span>
                        <p className="text-sm text-gray-500">
                          {`Was ${gyroscope.heart.values[1]}% on the previous day`}
                        </p>
                      </p>
                    </div>
                  ) : (
                    <LoadError items="heart rate" />
                  )}
                </div>
              </div>
            </div>
            <div className="pt-1">
              <DataFooterLinks
                apiUrl="https://github.com/AnandChowdhary/life"
                githubUrl="https://github.com/AnandChowdhary/life"
                // links={[{ label: "View past themes", href: "/life/themes" }]}
              />
            </div>
          </article>
          <article className="space-y-2">
            <header>
              <h2 className="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">📇</span>
                <SectionLink label={`Connect`} href="/contact" />
              </h2>
            </header>
            <div className="flex flex-wrap items-center space-x-2 -mx-1">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm bg-white"
              >
                📫
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm bg-white"
              >
                📘
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm bg-white"
              >
                🐦
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm bg-white"
              >
                🔍
              </a>
            </div>
          </article>
          {/* <article className="space-y-4">
            <header>
              <h2 className="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">🥷</span>
                <span>Hacker News feed</span>
              </h2>
              <p className="text-gray-500">My top projects on the top of HN</p>
            </header>
            <ul className="space-y-4 bg-white rounded shadow-sm p-4 block">
              {[
                {
                  id: 30468793,
                  points: 260,
                  comments: 290,
                  title:
                    "Explain the first 10 lines of Twitter's source code to me",
                },
                {
                  id: 31927902,
                  points: 168,
                  comments: 58,
                  title:
                    "upptime/upptime: Uptime monitor and status page powered by GitHub",
                },
                {
                  id: 27783939,
                  points: 112,
                  comments: 103,
                  title:
                    "Launch HN: Pabio (YC S21) – Interior design and furniture rental as a service",
                },
              ].map(({ id, title, points, comments }) => (
                <li className="space-y-2" key={id}>
                  <div className="leading-6">{smartquotes(title)}</div>
                  <footer className="text-sm flex space-x-3 flex-wrap text-gray-500">
                    <span>{points} points</span>
                    <span>{comments} comments</span>
                  </footer>
                </li>
              ))}
            </ul>
          </article> */}
        </div>
      </section>
      <section className="space-y-4">
        <header>
          <h2 className="flex items-center space-x-2 text-xl font-semibold font-display">
            <span aria-hidden="true">🕰</span>
            <SectionLink
              label={`Changelog`}
              href={`/archive/${new Date(timeline[0].date).getUTCFullYear()}`}
            />
          </h2>
          <p className="text-gray-500">
            {"The latest from my desk, curated from different sources."}
          </p>
        </header>
        {timeline.length ? (
          <Timeline
            timeline={timeline}
            query={query}
            selected={Object.keys(categoryData).filter(
              (item) => item !== "book"
            )}
            maxItems={10}
            hasMoreHref="special://last-archive-year"
          />
        ) : (
          <LoadError items="changelog" />
        )}
      </section>
    </div>
  );
}
