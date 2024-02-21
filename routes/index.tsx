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
              "Previously, I founded rent-to-own furniture with interior design company <0>Pabio</0> and accessibility technology company <1>Oswald Labs</1>. I'm also an award-winning open source contributor and Y Combinator and Forbes 30 Under 30 alum.",
              {},
              [
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
                  target="_blank"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square p-4 text-white"
                  style={{ backgroundColor: "#333333" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 144 144"
                    fill="none"
                  >
                    <path fill="currentColor" d="M62 0h20v144H62z" />
                    <path fill="currentColor" d="M144 62v20H0V62z" />
                    <path fill="currentColor" d="m119 11 14 14-51 51-14-14z" />
                  </svg>
                </a>
                <div>FirstQuadrant</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/2020/upptime"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square p-4 text-white"
                  style={{ backgroundColor: "#1abc9c" }}
                >
                  <svg
                    viewBox="0 0 54 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M53.7565 32.9637L33.9514 10.8852L26.8782 3L19.805 10.8852L0 32.9637L7.07316 40.8488L26.8782 18.7703L46.6833 40.8488L53.7565 32.9637Z"
                      fill="currentColor"
                    />
                    <ellipse
                      cx="26.5659"
                      cy="42.375"
                      rx="7.81344"
                      ry="7.63081"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <div>Upptime</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/tags/pabio"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square p-3 text-white"
                  style={{ backgroundColor: STARTUPS[0].color }}
                >
                  {STARTUPS[0].icon}
                </a>
                <div>Pabio</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/tags/oswald-labs"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square p-4 text-white"
                  style={{ backgroundColor: STARTUPS[1].color }}
                >
                  {STARTUPS[1].icon}
                </a>
                <div>Oswald Labs</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/2020/uppload"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square p-4 text-white"
                  style={{ backgroundColor: "#f74041" }}
                >
                  <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M107.275 135.57c16.512.0686 31.5322-9.5443 38.3858-24.567 6.8536-15.0227 4.2687-32.6674-6.6059-45.093a42.29 42.29 0 00-22.8-13.6 43.7799 43.7799 0 00-1.26-5.37c3.33-2.11 13.17-9.3 13.17-20.81 0-6.86-3.64-11.13-9.48-11.13-6.9 0-19.66 8.63-21.09 9.62l.2.29a27.69 27.69 0 00-19-2.88 20.19 20.19 0 01-8.12 0 27.66 27.66 0 00-19 2.88l.2-.29c-.14-.1-3.48-2.38-7.64-4.7-6.01-3.31-10.41-4.92-13.53-4.92-5.84 0-9.47 4.27-9.47 11.13 0 11.51 9.83 18.7 13.16 20.8a44.38 44.38 0 00-1.26 5.38C14.0711 56.551.3832 73.2838.005 92.81c-.2281 14.9413 7.4772 28.885 20.2488 36.6425 12.7716 7.7576 28.6974 8.1676 41.8512 1.0775a26 26 0 015.67-2.25c4.163 2.8947 9.6871 2.8947 13.85 0a26.1 26.1 0 015.66 2.25 42.15 42.15 0 0019.99 5.04zm11.41-114.88c.94 0 3.78 0 3.78 5.44 0 7.69-6.39 13.13-9.55 15.34a37.06 37.06 0 00-10.3-13.36c5.05-3.26 12.63-7.42 16.07-7.42zm-91.76 5.44c0-5.44 2.85-5.44 3.78-5.44 3.44 0 11 4.16 16.07 7.42a37.17 37.17 0 00-10.3 13.36c-3.16-2.22-9.55-7.66-9.55-15.34zm47.77 98.62c-4.13 0-7.58-3.93-8.37-9.13a18.4 18.4 0 008.37-2.41 18.43 18.43 0 008.37 2.41c-.78 5.2-4.24 9.13-8.37 9.13zm21.77-25.32c-1.074 6.1168-6.3898 10.576-12.6 10.57a12.63 12.63 0 01-6.32-1.68V97.61c2.86-1.75 6.86-4.79 6.86-8.21 0-3.42-3.54-6.19-9.74-6.19s-9.74 2.65-9.74 6.19c0 3.54 4 6.46 6.9 8.21v10.67a12.79 12.79 0 01-18.93-8.85l-5.6 1c1.2391 7.0011 6.389 12.6683 13.24 14.57a19.09 19.09 0 002.85 8.76 32.3299 32.3299 0 00-4 1.8c-12.7143 6.803-28.2455 5.4615-39.605-3.4208C8.4205 113.257 3.3732 98.5077 6.9093 84.5282c3.536-13.9797 14.989-24.5553 29.2056-26.9682l2.1-.35.26-2.12c1.89-15.91 13.29-27.9 26.52-27.9 1.5014 0 2.9989.1504 4.47.45a25.75 25.75 0 0010.42 0 22.3978 22.3978 0 014.47-.45c13.23 0 24.64 12 26.52 27.9l.26 2.12 2.1.35c17.3167 2.9471 30.0997 17.778 30.46 35.34.1997 12.9213-6.4627 24.9808-17.5075 31.6899-11.0447 6.7091-24.8177 7.063-36.1925.9301a32.4599 32.4599 0 00-4-1.8 19.1 19.1 0 002.86-8.76c6.8267-1.9042 11.9579-7.5525 13.2-14.53l-5.59-1z"
                      fill="currentColor"
                      fill-rule="nonzero"
                    />
                  </svg>
                </a>
                <div>Uppload</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/2015/saga-music"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square text-white overflow-hidden p-3"
                  style={{ backgroundColor: "#57bed4" }}
                >
                  <img
                    alt=""
                    src="https://raw.githubusercontent.com/AnandChowdhary/projects/main/assets/saga-music/icon.png"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </a>
                <div>Saga Music</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="/projects/2014/made-with-love-in-india"
                  class="opacity-100 flex items-center justify-center rounded-2xl shadow aspect-square text-white overflow-hidden p-4"
                  style={{ backgroundColor: "#e14f62" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 197 168"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      d="M98 30s14-30 45-30c35 0 53 29 53 59 0 48-98 108-98 108S0 108 0 59C0 29 19 0 52 0s46 30 46 30Z"
                    />
                  </svg>
                </a>
                <div>Made with &hearts; in India</div>
              </div>
              <div class="space-y-3 text-gray-500">
                <a
                  href="https://chowdhary.org"
                  class="opacity-100 flex items-center justify-center rounded-2xl p-3 shadow aspect-square text-white overflow-hidden bg-white"
                  style={{ color: "#00ec97" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 577 577"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M289 0h-73v70h-72v74H72v73H0v145h72v71h72v72h74v72h145v-72h70v-72h72v-72h72V216h-72v-72h-72V70h-72V0h-72Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill="currentColor"
                      d="M146 505h72v72h-72z"
                      opacity=".6"
                    />
                    <path
                      fill="currentColor"
                      d="M72 433h72v72H72zM72 72h72v72H72zM433 433h72v72h-72z"
                      opacity=".9"
                    />
                    <path
                      fill="currentColor"
                      d="M363 505h72v72h-72zM144 0h72v72h-72zM361 0h72v72h-72zM72 145v72H0v-72zM72 361v72H0v-72zM577 144v72h-72v-72zM577 361v72h-72v-72z"
                      opacity=".6"
                    />
                    <path
                      fill="currentColor"
                      d="M433 72h72v72h-72z"
                      opacity=".9"
                    />
                  </svg>
                </a>
                <div>Chowdhary .org</div>
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
