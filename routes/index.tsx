import { Handlers, PageProps } from "$fresh/server.ts";
import {
  default as smartquotes,
  default as smartQuotes,
} from "https://esm.sh/smartquotes-ts@0.0.2";
import {
  TimelineBook,
  TimelineTravel,
} from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { ComponentChildren } from "preact";
import { Breadcrumbs } from "../components/data/Breadcrumbs.tsx";
import { DataFooterLinks } from "../components/data/DataFooterLinks.tsx";
import { OKRCards } from "../components/data/OKRs.tsx";
import { Timeline } from "../components/data/Timeline.tsx";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { LoadError } from "../components/text/LoadError.tsx";
import { SectionLink } from "../components/text/SectionLink.tsx";
import Age from "../islands/Age.tsx";
import TimeAgo from "../islands/TimeAgo.tsx";
import { categoryData, fetchLifeData } from "../utils/data.tsx";
import { t } from "../utils/i18n.tsx";
import type { AllLifeDataSummary } from "../utils/interfaces.ts";
import { countryName } from "../utils/string.ts";
import { imageUrl } from "../utils/urls.ts";
import { toHoursAndMinutes } from "./health/index.tsx";

const birthdayThisYear = new Date("1997-12-29");
birthdayThisYear.setUTCFullYear(new Date().getUTCFullYear());
const nextBirthday =
  Date.now() < birthdayThisYear.getTime()
    ? birthdayThisYear
    : new Date(birthdayThisYear.getTime() + 31536000000);

interface HomeData extends AllLifeDataSummary {
  query: string;
}

export const handler: Handlers<HomeData> = {
  async GET(request, context) {
    let lifeData: AllLifeDataSummary | undefined = undefined;

    try {
      const [_lifeData] = await Promise.allSettled([fetchLifeData()]);

      if (_lifeData.status !== "fulfilled")
        throw new Error("Failed to fetch life data");
      lifeData = _lifeData.value;
    } catch (error) {
      // Ignore errors for now
    }

    if (!lifeData) throw new Error("Failed to fetch life data");

    const props: HomeData = {
      ...lifeData,
      query: new URL(request.url).search,
    };
    const response = await context.render(props);
    response.headers.set("Cache-Control", "public, max-age=600");
    return response;
  },
};

const getLast7Keys = (obj: Record<string, unknown>) =>
  Object.keys(obj)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .filter((item) => Object.values(Object(obj)[item]).length > 0)
    .slice(0, 7);

const averageObjectKeys = (objects: Record<string, number>[]) => {
  const result: Record<string, number> = {};
  objects.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      result[key] = result[key] ?? 0;
      result[key] += value;
    });
  });
  Object.entries(result).forEach(([key, value]) => {
    result[key] = value / objects.length;
  });
  return result;
};

export default function Home({ data }: PageProps<HomeData>) {
  const {
    timeline,
    okr,
    theme,
    query,
    location,
    activity: activityData,
    readiness: readinessData,
    sleep: sleepData,
  } = data;
  const sleep = sleepData
    ? averageObjectKeys(
        getLast7Keys(sleepData).map((key) => Object(sleepData[key]))
      )
    : undefined;
  const activity = activityData
    ? averageObjectKeys(
        getLast7Keys(activityData).map((key) => Object(activityData[key]))
      )
    : undefined;
  const readiness = readinessData
    ? averageObjectKeys(
        getLast7Keys(readinessData).map((key) => Object(readinessData[key]))
      )
    : undefined;
  const book = timeline.find(({ type }) => type === "book") as TimelineBook;
  const countries = Array.from(
    new Set(
      (
        [...timeline]
          .reverse()
          .filter(({ type }) => type === "travel") as TimelineTravel[]
      ).map((i) => i.data.country.code.toLowerCase())
    )
  );
  const travel = timeline.find(
    ({ type, data }) =>
      type === "travel" &&
      "country" in data &&
      typeof data.country === "object" &&
      data.country.code.toLowerCase() === countries[countries.length - 1]
  ) as TimelineTravel;

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-8 md:px-0">
      <section class="grid-cols-2 gap-8 gap-y-12 sm:grid">
        <div class="items-start justify-center mb-6 sm:flex">
          <img
            alt="Illustrated portrait of Anand"
            src={imageUrl("https://anandchowdhary.com/anand.png", {
              w: "245",
              h: "245",
            })}
            srcSet={`${imageUrl("https://anandchowdhary.com/anand.png", {
              w: "245",
              h: "245",
            })} 1x, ${imageUrl("https://anandchowdhary.com/anand.png", {
              w: "490",
              h: "490",
            })} 2x`}
            class="object-contain object-bottom w-1/2 sm:w-2/3"
            width={198}
            height={198}
            loading="eager"
          />
        </div>
        <div class="space-y-4">
          <Breadcrumbs items={[]} />
          <h2 class="space-x-2 text-2xl font-semibold font-display">
            <span class="wave" aria-hidden="true">
              👋
            </span>
            <span>{smartQuotes(" Hi, I'm Anand")}</span>
          </h2>
          <p class="text-lg text-gray-500">
            {t(
              "I'm a creative technologist and entrepreneur currently working remotely as the co-founder and CTO of <0>Pabio</0>, a rent-to-own furniture with interior design company in Europe.",
              {},
              [
                ({ children }: { children: ComponentChildren }) => (
                  <ExternalLink
                    href="https://pabio.com"
                    class="underline"
                    children={children}
                  />
                ),
              ]
            )}
          </p>
          <p>
            {smartQuotes(
              "I'm also an award-winning open source contributor and Y Combinator and Forbes 30 Under 30 alum."
            )}
          </p>
          <SectionLink label="Learn more about me" href="/about" />
        </div>
      </section>
      {/* <section class="overflow-auto">
        <div
          class="grid grid-cols-5 gap-12 overflow-auto text-center"
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
              class="relative flex flex-col items-center justify-center h-12 px-6 transition opacity-70 hover:opacity-100"
            >
              <div
                class="absolute top-0 bottom-0 left-0 h-12 bg-left bg-no-repeat bg-contain"
                style={{
                  backgroundImage: "url(/awards/leaf.svg)",
                  aspectRatio: "86 / 150",
                }}
              />
              <div
                class="absolute top-0 bottom-0 right-0 h-12 bg-right bg-no-repeat bg-contain"
                style={{
                  backgroundImage: "url(/awards/leaf.svg)",
                  transform: "scaleX(-1)",
                  aspectRatio: "86 / 150",
                }}
              />
              <img alt="" src={`/awards/${award.logo}`} />
              <div class="-mt-1 font-medium" style={{ fontSize: "60%" }}>
                {award.title}
              </div>
            </a>
          ))}
        </div>
      </section> */}
      <section class="grid-cols-2 gap-8 gap-y-12 sm:grid">
        <div class="space-y-8">
          <article class="space-y-4">
            <header>
              <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">🌈</span>
                <SectionLink
                  label={`Theme for ${theme.data.year}`}
                  href="/themes"
                />
              </h2>
              <p class="text-gray-500">
                Yearly theme that dictates quarterly goals
              </p>
            </header>
            <div class="relative p-4 space-y-2 bg-white rounded shadow-sm">
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
            <div class="pt-1">
              <DataFooterLinks
                apiUrl="https://anandchowdhary.github.io/themes/api.json"
                githubUrl="https://github.com/AnandChowdhary/themes"
              />
            </div>
          </article>
          <article class="space-y-4">
            <header>
              <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">📊</span>
                <SectionLink
                  label={okr ? `OKRs for Q${okr.data.name}` : "OKRs"}
                  href="/okrs"
                />
              </h2>
              <p class="text-gray-500">Personal Objectives and Key Results</p>
            </header>
            {okr ? <OKRCards okr={okr} /> : <LoadError items="OKRs" />}
            <div class="pt-1">
              <DataFooterLinks
                apiUrl="https://anandchowdhary.github.io/okrs/api.json"
                githubUrl="https://github.com/AnandChowdhary/okrs"
              />
            </div>
          </article>
        </div>
        <div class="space-y-8">
          <article class="space-y-4 sm:h-full flex flex-col">
            <header>
              <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">🧬</span>
                <SectionLink label={`Life`} href="/life" />
              </h2>
              <p class="text-gray-500">Tracking my life data in real time</p>
            </header>
            <div class="p-4 bg-white rounded shadow-sm sm:h-full sm:flex sm:flex-col sm:justify-between space-y-4 sm:space-y-0">
              <div class="flex space-x-3">
                <span aria-hidden="true">🎂</span>
                <div>
                  <p>
                    <Age />
                    {" years old"}
                  </p>
                  <p class="text-sm text-gray-500">
                    Next birthday <TimeAgo date={nextBirthday.toISOString()} />
                  </p>
                </div>
              </div>
              <div class="flex space-x-3">
                <span aria-hidden="true">📍</span>
                {location ? (
                  <div>
                    <p class="mb-1 leading-5">
                      Last seen in{" "}
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
              <div class="flex space-x-3">
                <span aria-hidden="true">🛌</span>
                {sleep ? (
                  <div>
                    <p class="mb-1 leading-5">
                      <span class="mr-2">
                        {"Slept "}
                        <strong class="font-medium">
                          {`${(sleep.total / 3600).toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1,
                          })} hours`}
                        </strong>
                      </span>
                      <p class="text-sm text-gray-500">
                        {`${(sleep.rem / 3600).toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 1,
                        })} hours REM sleep, ${sleep.efficiency.toLocaleString(
                          "en-US",
                          { maximumFractionDigits: 0 }
                        )}% efficient`}
                      </p>
                    </p>
                  </div>
                ) : (
                  <LoadError items="sleep data" />
                )}
              </div>
              <div class="flex space-x-3">
                <span aria-hidden="true">🏃‍♂️</span>
                {activity ? (
                  <div>
                    <p class="mb-1 leading-5">
                      <strong class="font-medium">
                        {`${activity.steps.toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })} steps`}
                      </strong>
                      {" walked"}
                    </p>
                    <p class="text-sm text-gray-500">
                      {`${activity.cal_active.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })} active calories of ${activity.cal_total.toLocaleString(
                        "en-US",
                        { maximumFractionDigits: 0 }
                      )} total`}
                    </p>
                  </div>
                ) : (
                  <LoadError items="step count" />
                )}
              </div>
              <div class="flex space-x-3">
                <span aria-hidden="true">🫀</span>
                {readiness ? (
                  <div>
                    <p class="mb-1 leading-5">
                      <span class="mr-2">
                        {"Readiness score is "}
                        <strong class="font-medium">
                          {`${readiness.score.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}%`}
                        </strong>
                      </span>
                      <p class="text-sm text-gray-500">
                        {`Was ${readiness.score_previous_day.toLocaleString(
                          "en-US",
                          { maximumFractionDigits: 0 }
                        )}% on the previous day`}
                      </p>
                    </p>
                  </div>
                ) : (
                  <LoadError items="heart rate" />
                )}
              </div>
              <div class="flex space-x-3">
                <span aria-hidden="true">📚</span>
                {book ? (
                  <div>
                    <p class="mb-1 leading-5">
                      <span class="mr-2">
                        {"Finished reading "}
                        <strong class="font-medium">{book.title}</strong>
                      </span>
                      <p class="text-sm text-gray-500">
                        {`Completed in ${new Date(book.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            year: "numeric",
                          }
                        )}`}
                      </p>
                    </p>
                  </div>
                ) : (
                  <LoadError items="heart rate" />
                )}
              </div>
              <div class="flex space-x-3">
                <span aria-hidden="true">🛩️</span>
                {travel ? (
                  <div>
                    <p class="mb-1 leading-5">
                      <span class="mr-2">
                        {"Traveled to "}
                        <strong class="font-medium">{`${countries.length} countries`}</strong>
                      </span>
                      <p class="text-sm text-gray-500">
                        {`Most recently to ${countryName(
                          travel.data.country.name
                        )}`}
                      </p>
                    </p>
                  </div>
                ) : (
                  <LoadError items="heart rate" />
                )}
              </div>
            </div>
            <div class="pt-1">
              <DataFooterLinks
                apiUrl="https://github.com/AnandChowdhary/life"
                githubUrl="https://github.com/AnandChowdhary/life"
              />
            </div>
          </article>
          {/* <article class="space-y-2">
            <header>
              <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">📇</span>
                <SectionLink label={`Connect`} href="/contact" />
              </h2>
            </header>
            <div class="flex flex-wrap items-center -mx-1 space-x-4">
              <a
                href="https://github.com/AnandChowdhary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub class="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/AnandChowdhary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn class="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/AnandChowdhary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter class="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/anandchowdhary/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram class="w-6 h-6" />
              </a>
            </div>
          </article>
          <article class="space-y-4">
            <header>
              <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
                <span aria-hidden="true">🥷</span>
                <span>Hacker News feed</span>
              </h2>
              <p class="text-gray-500">My top projects on the top of HN</p>
            </header>
            <ul class="block p-4 space-y-4 bg-white rounded shadow-sm">
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
                <li class="space-y-2" key={id}>
                  <div class="leading-6">{smartQuotes(title)}</div>
                  <footer class="flex flex-wrap space-x-3 text-sm text-gray-500">
                    <span>{points} points</span>
                    <span>{comments} comments</span>
                  </footer>
                </li>
              ))}
            </ul>
          </article> */}
        </div>
      </section>
      <section class="space-y-4">
        <header>
          <h2 class="flex items-center space-x-2 text-xl font-semibold font-display">
            <span aria-hidden="true">🕰</span>
            <SectionLink
              label={`Changelog`}
              href={`/archive/${new Date(timeline[0].date).getUTCFullYear()}`}
            />
          </h2>
          <p class="text-gray-500">
            {"The latest from my desk, curated from different sources."}
          </p>
        </header>
        {timeline.length ? (
          <Timeline
            timeline={timeline}
            show={timeline}
            query={query}
            selected={Object.keys(categoryData).filter(
              (item) => item !== "book"
            )}
            maxItems={10}
            hasMoreHref="special://last-archive-year"
            yearHrefPrefix="/archive"
          />
        ) : (
          <LoadError items="changelog" />
        )}
      </section>
    </div>
  );
}
