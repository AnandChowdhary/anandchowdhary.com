/** @jsx h */
import { h, ComponentChildren } from "preact";
import { tw } from "@twind";
import { asset } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { SectionLink } from "../components/text/SectionLink.tsx";
import { OKRCards } from "../components/data/OKRs.tsx";
import { DataFooterLinks } from "../components/data/DataFooterLinks.tsx";
import { BarChart } from "../components/data/BarChart.tsx";
import { t } from "../utils/i18n.tsx";
import { humanizeMmSs } from "../utils/string.ts";
import * as colors from "twind/colors";
import type { IOkrs, ITheme } from "../utils/data.ts";

interface HomeData {
  okr: {
    title: string;
    description: string;
    data: IOkrs["years"][0]["quarters"][0];
  };
  theme: ITheme;
  timeline: (
    | {
        type: "okr";
        date: string;
        title: string;
      }
    | {
        type: "event";
        date: string;
        title: string;
        data: { location: string; emoji: string };
      }
    | {
        type: "project";
        date: string;
        title: string;
      }
    | {
        type: "blog-post";
        date: string;
        title: string;
        data: { words: number };
      }
    | {
        type: "book";
        date: string;
        title: string;
        data: { authors: string[]; image: string };
      }
    | {
        type: "life-event";
        date: string;
        title: string;
        description?: string;
      }
    | {
        type: "video";
        date: string;
        title: string;
        data: {
          city: string;
          country: string;
          img: string;
          publisher: string;
          duration: string;
        };
      }
    | {
        type: "award";
        date: string;
        title: string;
        data: { publisher: string };
      }
    | {
        type: "travel";
        date: string;
        title: string;
        data: { assets: string[] };
      }
    | {
        type: "podcast-interview";
        date: string;
        title: string;
        data: { publisher: string; embed?: string };
      }
    | {
        type: "press-feature";
        date: string;
        title: string;
        description?: string;
        href: string;
        data: {
          publisher: string;
          author?: string;
        };
      }
    | {
        type: "open-source-project";
        date: string;
        title: string;
        href: string;
        data: {
          language?: string;
          languageColor?: string;
          stars: number;
          issues: number;
          forks: number;
          watchers: number;
          description?: string;
        };
      }
  )[];
}

const categoryData: Record<
  HomeData["timeline"][0]["type"],
  { color: keyof typeof colors; icon: string; prefix: string }
> = {
  okr: {
    color: "orange",
    icon: "book-open",
    prefix: "New quarterly OKRs",
  },
  "blog-post": {
    color: "indigo",
    icon: "book-open",
    prefix: "Wrote a blog post",
  },
  project: {
    color: "lightBlue",
    icon: "newspaper",
    prefix: "Published a project",
  },
  travel: {
    color: "green",
    icon: "plane",
    prefix: "Traveled to a new place",
  },
  event: { color: "cyan", icon: "podium", prefix: "Spoke at an event" },
  book: { color: "purple", icon: "book-open", prefix: "Finished a book" },
  "life-event": { color: "rose", icon: "alarm", prefix: "Life milestone" },
  video: {
    color: "red",
    icon: "video-camera",
    prefix: "Featured in a video",
  },
  award: {
    color: "yellow",
    icon: "award",
    prefix: "Received an award",
  },
  "podcast-interview": {
    color: "fuchsia",
    icon: "microphone",
    prefix: "Featured in a podcast",
  },
  "press-feature": {
    color: "teal",
    icon: "newspaper",
    prefix: "Featured in the press",
  },
  "open-source-project": {
    color: "green",
    icon: "newspaper",
    prefix: "Launched an open source project",
  },
};

export const handler: Handlers<HomeData> = {
  async GET(request, context) {
    const timeline = (await (
      await fetch("https://anandchowdhary.github.io/everything/api.json")
    ).json()) as {
      date: string;
      type: string;
      title: string;
      description?: string;
      data?: unknown;
    }[];

    const props = {
      timeline,
      okr: timeline.find(({ type }) => type === "okr"),
      theme: {
        year: "2022",
        title: "Year of Teamwork",
        description:
          "I want to delegate more and plan for further into the future, do a better job at internalizing feedback, and continue to do the things I did right while investing more in my support system.",
      },
    };
    const response = await context.render(props);
    response.headers.set("Cache-Control", "public, max-age=600");
    return response;
  },
};

export default function Home({ data }: PageProps<HomeData>) {
  const { timeline, okr, theme } = data;

  return (
    <div class={tw`max-w-screen-md px-4 mx-auto space-y-12 md:px-0`}>
      <section className={tw`grid-cols-2 gap-8 gap-y-12 sm:grid`}>
        <div className={tw`items-start justify-center mb-6 sm:flex`}>
          <img
            alt="Illustrated portrait of Anand in comic-book style"
            src={asset("anand.svg")}
            className={tw`object-contain object-bottom w-1/2 sm:w-2/3`}
            width={198}
            height={198}
            loading="eager"
          />
        </div>
        <div className={tw`space-y-4`}>
          <h2 className={tw`space-x-2 text-2xl font-semibold font-display`}>
            <span className="wave" aria-hidden="true">
              👋
            </span>
            <span>{" Hi, I'm Anand"}</span>
          </h2>
          <p className={tw`text-lg text-gray-500`}>
            {t(
              "I'm a creative technologist and entrepreneur currently working remotely as the co-founder and CTO of <0>Pabio</0>, a rent-to-own furniture with interior design company in Europe.",
              {},
              [
                ({ children }: { children: ComponentChildren }) => (
                  <ExternalLink
                    href="https://pabio.com"
                    className={tw`underline`}
                    children={children}
                  />
                ),
              ]
            )}
          </p>
          <p>
            I'm also an award-winning open source contributor and Y Combinator
            and Forbes 30 Under 30 alum.
          </p>
          <SectionLink label="Learn more about me" href="/about" />
        </div>
        <article className={tw`space-y-4`}>
          <header>
            <h2
              className={tw`flex items-center space-x-2 text-xl font-semibold font-display`}
            >
              <span aria-hidden="true">🌈</span>
              <SectionLink
                label={`Theme for ${theme.year}`}
                href="/life/themes"
              />
            </h2>
            <p className={tw`text-gray-500`}>
              Yearly theme that dictates quarterly goals
            </p>
          </header>
          <div
            className={tw`relative p-4 space-y-2 bg-white rounded shadow-sm`}
          >
            <p className={tw`text-2xl`}>{theme.title}</p>
            <p className={tw`h-20 overflow-hidden text-sm text-gray-500`}>
              {theme.description}
            </p>
            <div
              className={tw`absolute bottom-0 left-0 right-0 h-24 rounded-b pointer-events-none`}
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255, 255, 255, 0.001), rgba(255, 255, 255, 1))",
              }}
            />
          </div>
          <div className={tw`pt-1`}>
            <DataFooterLinks
              apiUrl="https://anandchowdhary.github.io/everything/api.json"
              githubUrl="https://github.com/AnandChowdhary/everything"
              links={[{ label: "View past themes", href: "/life/themes" }]}
            />
          </div>
        </article>
        <article className={tw`space-y-4`}>
          <header>
            <h2
              className={tw`flex items-center space-x-2 text-xl font-semibold font-display`}
            >
              <span aria-hidden="true">📊</span>
              <SectionLink
                label={`OKRs for Q${okr.data.name}`}
                href="/life/okrs"
              />
            </h2>
            <p className={tw`text-gray-500`}>
              Personal Objectives and Key Results
            </p>
          </header>
          <OKRCards okr={okr} />
          <div className={tw`pt-1`}>
            <DataFooterLinks
              apiUrl="https://anandchowdhary.github.io/okrs/api.json"
              githubUrl="https://github.com/AnandChowdhary/okrs"
              links={[{ label: "View past OKRs", href: "/life/themes" }]}
            />
          </div>
        </article>
        <article className={tw`space-y-4`}>
          <header>
            <h2
              className={tw`flex items-center space-x-2 text-xl font-semibold font-display`}
            >
              <span aria-hidden="true">💼</span>
              <SectionLink
                label={`Last week in productivity`}
                href="/life/productivity"
              />
            </h2>
            <p className={tw`text-gray-500`}>
              Daily productivity score by RescueTime
            </p>
          </header>
          <BarChart
            rgb="150, 220, 220"
            data={[
              { date: "2022-07-01", value: 91 },
              { date: "2022-07-02", value: 31 },
              { date: "2022-07-03", value: 43 },
              { date: "2022-07-04", value: 94 },
              { date: "2022-07-05", value: 65 },
              { date: "2022-07-06", value: 86 },
              { date: "2022-07-07", value: 57 },
            ]}
          />
          <DataFooterLinks
            apiUrl="https://anandchowdhary.github.io/everything/api.json"
            githubUrl="https://github.com/AnandChowdhary/everything"
            updatedAt={"2022-01-01"}
          />
        </article>
        <article className={tw`space-y-4`}>
          <header>
            <h2
              className={tw`flex items-center space-x-2 text-xl font-semibold font-display`}
            >
              <span aria-hidden="true">😴</span>
              <SectionLink label={`Last week in sleep`} href="/life/health" />
            </h2>
            <p className={tw`text-gray-500`}>
              Number of hours asleep by Oura Ring
            </p>
          </header>
          <BarChart
            rgb="255, 180, 180"
            data={[
              { date: "2022-07-01", label: "8:06", value: 8.1 },
              { date: "2022-07-02", label: "7:06", value: 7.1 },
              { date: "2022-07-03", label: "7:42", value: 7.7 },
              { date: "2022-07-04", label: "9:06", value: 9.1 },
              { date: "2022-07-05", label: "6:30", value: 6.5 },
              { date: "2022-07-06", label: "8:36", value: 8.6 },
              { date: "2022-07-07", label: "7:48", value: 7.8 },
            ]}
          />
          <DataFooterLinks
            apiUrl="https://anandchowdhary.github.io/everything/api.json"
            githubUrl="https://github.com/AnandChowdhary/everything"
            updatedAt={"2022-01-01"}
          />
        </article>
      </section>
      <section className={tw`space-y-4`}>
        <header className={tw`space-y-2`}>
          <h2 className={tw`space-x-2 text-2xl font-semibold font-display`}>
            <span aria-hidden="true">🕰</span>
            <span>Changelog</span>
          </h2>
          <p className={tw`text-gray-500`}>
            {"The latest from my desk, curated from different sources."}
          </p>
        </header>
        <div className={tw`relative space-y-4`}>
          <div
            className={tw`absolute top-0 w-1 bg-orange-200 bottom-6 left-4`}
          />
          {timeline.map((item, index) => (
            <div key={item.title}>
              {(index === 0 ||
                new Date(item.date).getFullYear() !==
                  new Date(data.timeline[index - 1].date).getFullYear()) && (
                <div className={tw`flex flex-grow ${index > 0 && "pt-6"}`}>
                  <div className={tw`shrink-0`} style={{ minWidth: "3rem" }}>
                    <div
                      className={tw`relative w-5 h-5 ml-2 bg-orange-600 border-4 rounded-full border-orange-50`}
                    />
                  </div>
                  <div>
                    <h3 className={tw`mb-6 text-xl font-semibold`}>
                      {new Date(item.date).getFullYear()}
                    </h3>
                  </div>
                </div>
              )}
              <article className={tw`sm:flex`}>
                <div className={tw`flex flex-grow`}>
                  <div className={tw`shrink-0`} style={{ minWidth: "3rem" }}>
                    <div>
                      <div
                        className={tw`relative flex items-center justify-center text-center text-white border-4 rounded-full h-9 w-9 border-orange-50 bg-${
                          categoryData[item.type].color
                        }-500`}
                      >
                        <svg aria-hidden="true" width="1em" height="1em">
                          <use href={`#${categoryData[item.type].icon}`}></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={tw`flex-grow space-y-1`}>
                    <div className={tw`text-gray-500`}>
                      <span>
                        <span
                          className={tw`text-${
                            categoryData[item.type].color
                          }-500`}
                        >
                          {categoryData[item.type].prefix}
                        </span>
                        {` on ${new Date(item.date).toLocaleDateString(
                          "en-US",
                          {
                            dateStyle: "long",
                          }
                        )}`}
                      </span>
                    </div>
                    {"href" in item && item.href ? (
                      <h4 className={tw`text-lg font-medium leading-6`}>
                        {item.href.startsWith("http") ? (
                          <ExternalLink href={item.href}>
                            {item.title}
                          </ExternalLink>
                        ) : (
                          <a href="item.href">{item.title}</a>
                        )}
                      </h4>
                    ) : (
                      <h4 className={tw`text-lg font-medium leading-6`}>
                        {item.title}
                      </h4>
                    )}
                    {item.type === "book" && (
                      <p>{`by ${item.data.authors.join(", ")}`}</p>
                    )}
                    {item.type === "blog-post" && (
                      <p
                        className={tw`text-gray-500`}
                      >{`Reading time: ${humanizeMmSs(
                        String(item.data.words / 250)
                      )}`}</p>
                    )}
                    {item.type === "event" && (
                      <p className={tw`text-gray-500`}>
                        <span className={tw`mr-1`}>{item.data.emoji}</span>
                        <span>{` ${item.data.location}`}</span>
                      </p>
                    )}
                    {item.type === "podcast-interview" && (
                      <p className={tw`text-gray-500`}>{item.data.publisher}</p>
                    )}
                    {item.type === "press-feature" && (
                      <p
                        className={tw`flex items-center space-x-2 text-gray-500`}
                      >
                        <img
                          alt=""
                          src={`https://images.weserv.nl/?&maxage=1y&url=${encodeURIComponent(
                            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
                              item.href
                            )}&size=128`
                          )}&w=48&h=48&fit=cover&bg=white`}
                          loading="lazy"
                          width={24}
                          height={24}
                          className={tw`w-6 h-6 rounded-full`}
                        />
                        <span>
                          {t(
                            `${
                              item.data.author
                                ? `by <0>${item.data.author}</0> for `
                                : ""
                            } ${item.data.publisher}`.trim(),
                            {},
                            [
                              ({
                                children,
                              }: {
                                children: ComponentChildren;
                              }) => (
                                <strong
                                  key={0}
                                  children={children}
                                  className={tw`font-medium`}
                                />
                              ),
                            ]
                          )}
                        </span>
                      </p>
                    )}
                    {item.type === "award" && (
                      <p
                        className={tw`text-gray-500`}
                      >{`Awarded by ${item.data.publisher}`}</p>
                    )}
                    {item.type === "video" && (
                      <ul className={tw`text-gray-500`}>
                        <li>{`${item.data.publisher}, ${item.data.city}`}</li>
                        <li>{`Watch time: ${humanizeMmSs(
                          item.data.duration
                        )}`}</li>
                      </ul>
                    )}
                    {"description" in item && item.description && (
                      <p className={tw`text-gray-500`}>{item.description}</p>
                    )}
                    {item.type === "open-source-project" && (
                      <ul className={tw`flex space-x-4`}>
                        {item.data.language && (
                          <li
                            className={tw`flex flex-wrap items-center space-x-1`}
                          >
                            <svg
                              aria-hidden="true"
                              width="1em"
                              height="1em"
                              style={{
                                color: item.data.languageColor ?? "#aaa",
                              }}
                            >
                              <use href="#circle"></use>
                            </svg>
                            <span>{item.data.language}</span>
                          </li>
                        )}
                        <li
                          className={tw`flex flex-wrap items-center space-x-1`}
                        >
                          <svg aria-hidden="true" width="1em" height="1em">
                            <use href="#star"></use>
                          </svg>
                          <span>
                            {t(
                              `<0>${item.data.stars.toLocaleString()}</0> stars`,
                              {},
                              [
                                ({
                                  children,
                                }: {
                                  children: ComponentChildren;
                                }) => (
                                  <strong
                                    className={tw`font-medium`}
                                    children={children}
                                  />
                                ),
                              ]
                            )}
                          </span>
                        </li>
                        <li
                          className={tw`flex flex-wrap items-center space-x-1`}
                        >
                          <svg aria-hidden="true" width="1em" height="1em">
                            <use href="#watchers"></use>
                          </svg>
                          <span>
                            {t(
                              `<0>${item.data.watchers.toLocaleString()}</0> watchers`,
                              {},
                              [
                                ({
                                  children,
                                }: {
                                  children: ComponentChildren;
                                }) => (
                                  <strong
                                    className={tw`font-medium`}
                                    children={children}
                                  />
                                ),
                              ]
                            )}
                          </span>
                        </li>{" "}
                        <li
                          className={tw`flex flex-wrap items-center space-x-1`}
                        >
                          <svg aria-hidden="true" width="1em" height="1em">
                            <use href="#forks"></use>
                          </svg>
                          <span>
                            {t(
                              `<0>${item.data.forks.toLocaleString()}</0> forks`,
                              {},
                              [
                                ({
                                  children,
                                }: {
                                  children: ComponentChildren;
                                }) => (
                                  <strong
                                    className={tw`font-medium`}
                                    children={children}
                                  />
                                ),
                              ]
                            )}
                          </span>
                        </li>
                      </ul>
                    )}
                    {item.type === "podcast-interview" &&
                      "embed" in item &&
                      "data" in item &&
                      item.data.embed && (
                        <div className={tw`pt-2`}>
                          <iframe
                            src={item.data.embed}
                            loading="lazy"
                            scrolling="no"
                            className={tw`w-full overflow-hidden rounded-lg`}
                            style={{ height: "152px" }}
                          />
                        </div>
                      )}
                  </div>
                </div>
                <div className={tw`mt-4 ml-12 sm:mt-0 sm:ml-6 shrink-0`}>
                  {item.type === "book" ? (
                    <img
                      alt=""
                      src={`https://images.weserv.nl/?&maxage=1y&url=${encodeURIComponent(
                        item.data.image.split("//")[1]
                      )}&w=300&h=450&fit=cover`}
                      loading="lazy"
                      className={tw`w-24 rounded-lg shadow`}
                    />
                  ) : (
                    item.type === "video" && (
                      <div className={tw`relative`}>
                        <svg
                          aria-hidden="true"
                          width="2rem"
                          height="2rem"
                          className={tw`absolute text-white -translate-x-1/2 -translate-y-1/2 drop-shadow left-1/2 top-1/2`}
                        >
                          <use href="#triangle"></use>
                        </svg>
                        <img
                          alt=""
                          src={`https://images.weserv.nl/?&maxage=1y&url=${encodeURIComponent(
                            item.data.img.split("//")[1]
                          )}&w=700&h=370&fit=cover`}
                          loading="lazy"
                          width={512}
                          height={370}
                          className={tw`w-full rounded-lg sm:w-64`}
                        />
                      </div>
                    )
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
