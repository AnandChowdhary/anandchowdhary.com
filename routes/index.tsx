/** @jsx h */
import { asset } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { ComponentChildren, h } from "preact";
import * as colors from "twind/colors";
import { DataFooterLinks } from "../components/data/DataFooterLinks.tsx";
import { OKRCards } from "../components/data/OKRs.tsx";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { SectionLink } from "../components/text/SectionLink.tsx";
import Age from "../islands/Age.tsx";
import Filters from "../islands/Filters.tsx";
import TimeAgo from "../islands/TimeAgo.tsx";
import type { IOkrs, ITheme } from "../utils/data.ts";
import { getGyroscope, getGyroscopeSports } from "../utils/data.ts";
import { t } from "../utils/i18n.tsx";
import { humanizeMmSs } from "../utils/string.ts";

interface HomeData {
  okr: {
    title: string;
    description: string;
    data: IOkrs["years"][0]["quarters"][0];
  };
  gyroscope: {
    lastSeenAt: {
      name: string;
      locationTimeAgo: string;
    };
    heart: {
      value: string;
      timeAgo: string;
      diffValue: string;
      diffValueTimeAgo: string;
    };
    steps: {
      value: string;
      timeAgo: string;
    };
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
  { color: keyof typeof colors; icon: string; prefix: string; title: string }
> = {
  okr: {
    color: "orange",
    icon: "book-open",
    prefix: "New quarterly OKRs",
    title: "OKR",
  },
  "blog-post": {
    color: "indigo",
    icon: "book-open",
    prefix: "Wrote a blog post",
    title: "Blog post",
  },
  project: {
    color: "lightBlue",
    icon: "newspaper",
    prefix: "Published a project",
    title: "Project",
  },
  travel: {
    color: "green",
    icon: "plane",
    prefix: "Traveled to a new place",
    title: "Travel",
  },
  event: {
    color: "cyan",
    icon: "podium",
    prefix: "Spoke at an event",
    title: "Event",
  },
  book: {
    color: "purple",
    icon: "book-open",
    prefix: "Finished a book",
    title: "Book",
  },
  "life-event": {
    color: "rose",
    icon: "alarm",
    prefix: "Life milestone",
    title: "Life event",
  },
  video: {
    color: "red",
    icon: "video-camera",
    prefix: "Featured in a video",
    title: "Video",
  },
  award: {
    color: "yellow",
    icon: "award",
    prefix: "Received an award",
    title: "Award",
  },
  "podcast-interview": {
    color: "fuchsia",
    icon: "microphone",
    prefix: "Featured in a podcast",
    title: "Podcast",
  },
  "press-feature": {
    color: "teal",
    icon: "newspaper",
    prefix: "Featured in the press",
    title: "Press",
  },
  "open-source-project": {
    color: "green",
    icon: "newspaper",
    prefix: "Launched an open source project",
    title: "Open source",
  },
};

export const handler: Handlers<HomeData> = {
  async GET(request, context) {
    const timeline = (await (
      await fetch("https://anandchowdhary.github.io/everything/api.json")
    ).json()) as HomeData["timeline"];

    const okr = timeline.find(({ type }) => type === "okr") as
      | HomeData["okr"]
      | undefined;
    if (!okr) throw new Error("OKR not found");

    const gyroscope = await getGyroscope();
    const document = new DOMParser().parseFromString(gyroscope, "text/html");
    if (!document) throw new Error("Unable to fetch gyroscope");
    const locationName = document.querySelector(".location-name");
    if (!locationName) throw new Error("Unable to find location time ago");
    const locationTimeAgo = document.querySelector(".location-time-ago");
    if (!locationTimeAgo) throw new Error("Unable to find location time ago");

    const sports = await getGyroscopeSports();
    const document2 = new DOMParser().parseFromString(sports, "text/html");
    if (!document2) throw new Error("Unable to fetch gyroscope");

    const props = {
      timeline,
      okr,
      gyroscope: {
        lastSeenAt: {
          name: locationName.innerText,
          locationTimeAgo: locationTimeAgo.innerText,
        },
        heart: {
          value: document2.querySelector(".bpm-increment")?.innerText ?? "",
          timeAgo: (
            document2.querySelector(".heart-rate .updated")?.innerText ?? ""
          ).split(" with ")[0],
          diffValue:
            document2.querySelector(".heart-rate .diff .amount")?.innerText ??
            "",
          diffValueTimeAgo:
            document2.querySelector(".heart-rate .diff .time")?.innerText ?? "",
        },
        steps: {
          value:
            document2.querySelector(".step-circle:last-child .amount")
              ?.innerText ?? "",
          timeAgo:
            document2.querySelector(".step-circle:last-child .timestamp")
              ?.innerText ?? "",
        },
      },
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
  const { timeline, okr, theme, gyroscope } = data;

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
      </section>
      <section className={tw`overflow-auto`}>
        <div
          className={tw`grid grid-cols-5 text-center gap-12 overflow-auto`}
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
              title: "2020–22",
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
              className={tw`opacity-70 hover:opacity-100 transition relative h-12 flex flex-col items-center justify-center px-6`}
            >
              <div
                className={tw`absolute top-0 left-0 bottom-0 h-12 bg-contain bg-no-repeat bg-left`}
                style={{
                  backgroundImage: "url(/awards/leaf.svg)",
                  aspectRatio: "86 / 150",
                }}
              />
              <div
                className={tw`absolute top-0 right-0 bottom-0 h-12 bg-contain bg-no-repeat bg-right`}
                style={{
                  backgroundImage: "url(/awards/leaf.svg)",
                  transform: "scaleX(-1)",
                  aspectRatio: "86 / 150",
                }}
              />
              <img alt="" src={`/awards/${award.logo}`} />
              <div
                className={tw`font-medium -mt-1`}
                style={{ fontSize: "60%" }}
              >
                {award.title}
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className={tw`grid-cols-2 gap-8 gap-y-12 sm:grid`}>
        <div className={tw`space-y-8`}>
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
              className={tw`relative space-y-2 bg-white p-4 rounded shadow-sm`}
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
                links={[{ label: "View past OKRs", href: "/life/okrs" }]}
              />
            </div>
          </article>
        </div>
        <article className={tw`space-y-4`}>
          <header>
            <h2
              className={tw`flex items-center space-x-2 text-xl font-semibold font-display`}
            >
              <span aria-hidden="true">🌍</span>
              <SectionLink label={`Live`} href="/life" />
            </h2>
            <p className={tw`text-gray-500`}>
              Tracking my life data in real time
            </p>
          </header>
          <div className={tw`relative space-y-4`}>
            <div className={tw`bg-white rounded shadow-sm p-4 space-y-4`}>
              <div className={tw`flex space-x-2`}>
                <span aria-hidden="true">🎂</span>
                <div>
                  <p>
                    <Age />
                    {" years old"}
                  </p>
                  <p className={tw`text-sm text-gray-500`}>
                    Next birthday <TimeAgo date={"2022-12-29"} />
                  </p>
                </div>
              </div>
              <div className={tw`flex space-x-2`}>
                <span aria-hidden="true">📍</span>
                <div>
                  <p>
                    Last seen at{" "}
                    <strong className={tw`font-medium`}>
                      {gyroscope.lastSeenAt.name}
                    </strong>
                  </p>
                  <p className={tw`text-sm text-gray-500`}>
                    {gyroscope.lastSeenAt.locationTimeAgo}
                  </p>
                </div>
              </div>
              <div className={tw`flex space-x-2`}>
                <span aria-hidden="true">🫀</span>
                <div>
                  <p>
                    <span className={tw`mr-2`}>
                      Heart beating at{" "}
                      <strong className={tw`font-medium`}>
                        {gyroscope.heart.value} bpm
                      </strong>
                    </span>
                    <span
                      className={
                        gyroscope.heart.diffValue.includes("▲")
                          ? tw`text-sm text-red-700`
                          : tw`text-sm text-green-700`
                      }
                    >
                      {gyroscope.heart.diffValue}
                    </span>
                  </p>
                  <p className={tw`text-sm text-gray-500`}>
                    {gyroscope.heart.timeAgo}
                  </p>
                </div>
              </div>
              <div className={tw`flex space-x-2`}>
                <span aria-hidden="true">🏃‍♂️</span>
                <div>
                  <p>{gyroscope.steps.value}</p>
                  <p className={tw`text-sm text-gray-500`}>
                    {gyroscope.steps.timeAgo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section className={tw`space-y-4`}>
        <header className={tw`space-y-2`}>
          <h2
            className={tw`space-x-2 text-2xl font-semibold font-display`}
            id="changelog"
          >
            <span aria-hidden="true">🕰</span>
            <span>Changelog</span>
          </h2>
          <p className={tw`text-gray-500`}>
            {"The latest from my desk, curated from different sources."}
          </p>
          <Filters categoryData={categoryData} />
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
                      width={300}
                      height={450}
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
