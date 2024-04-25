import { Handlers, PageProps } from "$fresh/server.ts";
import { default as smartQuotes } from "https://esm.sh/smartquotes-ts@0.0.2";
import {
  TimelineBook,
  TimelineTravel,
} from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { ComponentChildren } from "preact";
import { Breadcrumbs } from "../components/data/Breadcrumbs.tsx";
import { DataFooterLinks } from "../components/data/DataFooterLinks.tsx";
import { OKRCards } from "../components/data/OKRs.tsx";
import { LoadError } from "../components/text/LoadError.tsx";
import { SectionLink } from "../components/text/SectionLink.tsx";
import Age from "../islands/Age.tsx";
import TimeAgo from "../islands/TimeAgo.tsx";
import { fetchLifeData } from "../utils/data.tsx";
import { t } from "../utils/i18n.tsx";
import type { AllLifeDataSummary } from "../utils/interfaces.ts";
import { countryName } from "../utils/string.ts";
import { imageUrl } from "../utils/urls.ts";
import { STARTUPS } from "./about.tsx";
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
    return context.render(props);
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
    <div class="max-w-screen-md px-4 mx-auto space-y-16 md:px-0">
      <section class="grid-cols-2 gap-16 sm:grid">
        <div class="items-start justify-center mb-6 mt-7 sm:flex">
          <figure>
            <img
              alt="Portrait of Anand looking towards the right, smiling with his hands crossed"
              src="/anand.jpg"
              class="object-contain object-bottom w-full rounded-xl shadow"
              width={1067}
              height={1317}
              loading="eager"
            />
            <figcaption class="text-center text-gray-500 text-xs mt-2 inline-flex items-center justify-center w-full">
              <span>
                &copy;{" "}
                <a href="http://www.jimmyontherun.com">
                  Jimmy on the Run Studio
                </a>
              </span>
              <span
                aria-hidden="true"
                title="Portrait of Anand looking towards the right, smiling with his hands crossed"
                class="bg-gray-200 rounded uppercase px-1 ml-2 font-medium cursor-default"
                style={{ fontSize: "80%" }}
              >
                Alt
              </span>
            </figcaption>
          </figure>
        </div>
        <div class="space-y-5">
          <Breadcrumbs items={[]} />
          <h2 class="space-x-3 text-3xl font-semibold font-display">
            <span class="wave" aria-hidden="true">
              {"👋 "}
            </span>
            <span>{smartQuotes("Hi, I'm Anand")}</span>
          </h2>
          <p class="text-lg text-gray-500">
            {t(
              "I'm currently building <0>FirstQuadrant</0>, an AI sales platform that encompasses a complete suite of tools for inbound, outbound, and nurturing sales.",
              {},
              [
                ({ children }: { children: ComponentChildren }) => (
                  <a
                    href="https://firstquadrant.ai"
                    target="_blank"
                    class="underline"
                    children={children}
                  />
                ),
              ]
            )}
          </p>
          <p>
            {t(
              "I also make <0>angel investments</0> and do <1>nonprofit work</1>. Previously, I founded rent-to-own furniture with interior design company <2>Pabio</2> and accessibility technology company <3>Oswald Labs</3>. I'm also an award-winning open source contributor and Y Combinator and Forbes 30 Under 30 alum.",
              {},
              [
                ({ children }: { children: ComponentChildren }) => (
                  <a
                    href="https://chowdhary.co"
                    class="underline"
                    children={children}
                  />
                ),
                ({ children }: { children: ComponentChildren }) => (
                  <a
                    href="https://chowdhary.org"
                    class="underline"
                    children={children}
                  />
                ),
                ({ children }: { children: ComponentChildren }) => (
                  <a
                    href="/projects/tags/pabio"
                    class="underline"
                    children={children}
                  />
                ),
                ({ children }: { children: ComponentChildren }) => (
                  <a
                    href="/projects/tags/oswald-labs"
                    class="underline"
                    children={children}
                  />
                ),
              ]
            )}
          </p>
          <SectionLink label="Learn more about me" href="/about" />
        </div>
      </section>
      <section class="grid-cols-2 gap-16 sm:grid space-y-8 sm:space-y-0">
        <div class="space-y-12">
          <article class="space-y-4">
            <header class="space-y-1">
              <h2 class="flex items-center space-x-3 text-xl font-semibold font-display">
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
            <DataFooterLinks
              apiUrl="https://anandchowdhary.github.io/themes/api.json"
              githubUrl="https://github.com/AnandChowdhary/themes"
            />
          </article>
          <article class="space-y-4">
            <header class="space-y-1">
              <h2 class="flex items-center space-x-3 text-xl font-semibold font-display">
                <span aria-hidden="true">💻</span>
                <SectionLink label="Projects" href="/projects" />
              </h2>
              <p class="text-gray-500">My current and favorite work pieces</p>
            </header>
            <div class="grid grid-cols-4 gap-4 text-xs text-center">
              <div class="space-y-3 text-gray-500">
                <a
                  href="https://firstquadrant.ai"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square text-white"
                  style={{ backgroundColor: STARTUPS[0].color }}
                >
                  <img
                    alt=""
                    class="rounded-2xl w-full aspect-square object-cover"
                    src="https://avatars.githubusercontent.com/u/122780401?s=200&v=4"
                  />
                </a>
                <div>FirstQuadrant</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/tags/pabio"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square p-1 text-white"
                  style={{ backgroundColor: STARTUPS[1].color }}
                >
                  <img
                    alt=""
                    class="rounded-2xl w-full aspect-square object-cover"
                    src="https://avatars.githubusercontent.com/u/81462859?s=200&v=4"
                  />
                </a>
                <div>Pabio</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/tags/oswald-labs"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square p-4 text-white"
                  style={{ backgroundColor: STARTUPS[2].color }}
                >
                  <img
                    alt=""
                    class="rounded-2xl w-full aspect-square object-cover"
                    src="https://avatars.githubusercontent.com/u/21421587?s=200&v=4"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </a>
                <div>Oswald Labs</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/2020/upptime"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square p-4 text-white"
                  style={{ backgroundColor: "#1abc9c" }}
                >
                  <img
                    alt=""
                    class="rounded-2xl w-full aspect-square object-cover"
                    src="https://avatars.githubusercontent.com/u/72692977?s=200&v=4"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </a>
                <div>Upptime</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="https://chowdhary.co"
                  class="opacity-100 flex items-center justify-center rounded-2xl p-1 shadow aspect-square text-white overflow-hidden bg-white"
                >
                  <img
                    alt=""
                    class="rounded-2xl w-full aspect-square object-cover"
                    src="https://chowdhary.co/apple-touch-icon.png"
                  />
                </a>
                <div>Chowdhary Holdings</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="https://chowdhary.org"
                  class="opacity-100 flex items-center justify-center rounded-2xl p-1 shadow aspect-square text-white overflow-hidden bg-white"
                >
                  <img
                    alt=""
                    class="rounded-2xl w-full aspect-square object-cover"
                    src="https://chowdhary.org/apple-touch-icon.png"
                  />
                </a>
                <div>Chowdhary Foundation</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/2014/made-with-love-in-india"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square text-white overflow-hidden p-3"
                  style={{ backgroundColor: "#f43f5f" }}
                >
                  <img
                    alt=""
                    class="rounded-2xl w-full aspect-square object-cover"
                    src="https://avatars.githubusercontent.com/u/67188469?s=200&v=4"
                  />
                </a>
                <div>Made with &hearts; in India</div>
              </div>
            </div>
            <DataFooterLinks
              apiUrl="https://anandchowdhary.github.io/projects/api.json"
              githubUrl="https://github.com/AnandChowdhary/projects"
            />
          </article>
          <article class="space-y-4">
            <header class="space-y-1">
              <h2 class="flex items-center space-x-3 text-xl font-semibold font-display">
                <span aria-hidden="true">📊</span>
                <SectionLink
                  label={okr ? `OKRs for Q${okr.data.name}` : "OKRs"}
                  href="/okrs"
                />
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
            <header class="space-y-1">
              <h2 class="flex items-center space-x-3 text-xl font-semibold font-display">
                <span aria-hidden="true">✍️</span>
                <SectionLink label="Blog" href="/blog" />
              </h2>
              <p class="text-gray-500">Most recent longform writings</p>
            </header>
            <div class="space-y-3 flex flex-col">
              {timeline
                .filter((i) => i.type === "blog-post")
                .slice(0, 3)
                .map((item) => (
                  <div
                    key={item.url}
                    class="bg-white shadow rounded-md text-sm grid grid-cols-3 gap-2 relative"
                  >
                    <div class="overflow-hidden rounded-l-md flex">
                      <img
                        alt=""
                        src={imageUrl(
                          `https://anandchowdhary.github.io/blog/assets/${item.url
                            .split("/")
                            .pop()}.png`,
                          { w: "112", h: "90", fit: "cover" }
                        )}
                        width={112}
                        height={90}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div class="p-3 col-span-2 space-y-1.5">
                      <div class="leading-snug">
                        <a href={item.url} className="full-link no-underline">
                          {item.title}
                        </a>
                      </div>
                      <div class="text-gray-500 text-sm">
                        {new Date(item.date).toLocaleString("en-US", {
                          dateStyle: "long",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <DataFooterLinks
              apiUrl="https://anandchowdhary.github.io/blog/api.json"
              githubUrl="https://github.com/AnandChowdhary/blog"
            />
          </article>
        </div>
        <div class="space-y-12">
          <article class="space-y-4 flex flex-col">
            <header class="space-y-1">
              <h2 class="flex items-center space-x-3 text-xl font-semibold font-display">
                <span aria-hidden="true">🧬</span>
                <SectionLink label={`Life`} href="/life" />
              </h2>
              <p class="text-gray-500">Tracking my life data in real time</p>
            </header>
            <div class="p-4 bg-white rounded shadow-sm sm:flex sm:flex-col sm:justify-between space-y-4">
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
                      Currently in{" "}
                      <strong class="font-medium">{location.label}</strong>
                      {`, ${countryName(location.country.name)}`}
                    </p>
                    {location.timezone && (
                      <p class="text-sm text-gray-500">
                        {smartQuotes(
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
            <DataFooterLinks
              apiUrl="https://github.com/AnandChowdhary/life"
              githubUrl="https://github.com/AnandChowdhary/life"
            />
          </article>
          <article class="space-y-4">
            <header class="space-y-1">
              <h2 class="flex items-center space-x-3 text-xl font-semibold font-display">
                <span aria-hidden="true">🗓️</span>
                <SectionLink label="Events" href="/events" />
              </h2>
              <p class="text-gray-500">Speaking engagements at conferences</p>
            </header>
            <div class="space-y-2 flex flex-col">
              {timeline
                .filter((i) => i.type === "event")
                .slice(0, 3)
                .map((item) => (
                  <div
                    key={item.url}
                    class="bg-white rounded shadow-sm p-3 text-sm grid grid-cols-6 space-x-4"
                  >
                    <div class="flex flex-col justify-center items-center space-y-1">
                      <div class="text-2xl font-display">
                        {new Date(item.date).toLocaleString("en-US", {
                          day: "numeric",
                        })}
                      </div>
                      <div class="text-xs text-rose-600">
                        {new Date(item.date).toLocaleString("en-US", {
                          month: "short",
                        })}
                      </div>
                    </div>
                    <div class="space-y-1.5 col-span-5">
                      <div class="leading-snug mt-0.5">
                        <a href={item.url} class="no-underline">
                          {item.title}
                        </a>
                      </div>
                      <div class="text-gray-500 text-sm truncate">
                        {item.data && "venue" in item.data && item.data.venue
                          ? item.data.venue
                          : item.data && "city" in item.data && item.data.city
                          ? item.data.city
                          : null}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <DataFooterLinks
              apiUrl="https://anandchowdhary.github.io/events/api.json"
              githubUrl="https://github.com/AnandChowdhary/events"
            />
          </article>
          <article class="space-y-4">
            <header class="space-y-1">
              <h2 class="flex items-center space-x-3 text-xl font-semibold font-display">
                <span aria-hidden="true">📕</span>
                <SectionLink label="Books" href="/books" />
              </h2>
              <p class="text-gray-500">
                Currently reading and recently finished
              </p>
            </header>
            <div class="grid grid-cols-5 gap-4">
              {timeline
                .filter((i) => i.type === "book")
                .slice(0, 15)
                .map((item) => (
                  <a key={item.url} href={item.url}>
                    <img
                      alt={item.title}
                      src={imageUrl((item as TimelineBook).data.image, {
                        w: "300",
                        h: "450",
                        fit: "cover",
                      })}
                      loading="lazy"
                      width={300}
                      height={450}
                      className="w-full rounded shadow"
                    />
                  </a>
                ))}
            </div>
            <DataFooterLinks
              apiUrl="https://anandchowdhary.github.io/books/api.json"
              githubUrl="https://github.com/AnandChowdhary/books"
            />
          </article>
        </div>
      </section>
      <section class="overflow-auto pt-4 -mb-16!">
        <div
          class="grid grid-cols-5 gap-12 overflow-auto text-center"
          style={{ minWidth: "700px" }}
        >
          {[
            {
              href: "/press/2018/21-under-21",
              logo: "yourstory.svg",
              title: "21 Under 21",
              publication: "YourStory 21 Under 21",
            },
            {
              href: "/press/2019/the-next-web-t500",
              logo: "the-next-web.svg",
              title: "TNW T500",
              publication: "The Next Web T500",
            },
            {
              href: "/press/2021/github-stars",
              logo: "github-stars.svg",
              title: "GitHub Stars",
              publication: "GitHub",
            },
            {
              href: "/press/2018/forbes-30-under-30",
              logo: "forbes.svg",
              title: "30 Under 30",
              publication: "Forbes 30 Under 30",
            },
            {
              href: "/press/2018/50-talents-under-the-age-of-35",
              logo: "het-financieele-dagblad.svg",
              title: "50 Under 25",
              publication: "FD Persoonlijk",
            },
          ].map((award) => (
            <a
              key={award.title}
              href={award.href}
              class="relative flex flex-col items-center justify-center h-12 px-6 transition opacity-70 hover:opacity-100 no-underline"
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
      </section>
    </div>
  );
}
