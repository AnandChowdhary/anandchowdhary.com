/** @jsx h */
import { h, ComponentChildren } from "preact";
import { encode } from "https://deno.land/std@0.146.0/encoding/base64.ts";
import { orange } from "twind/colors";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Layout } from "../components/layout/Layout.tsx";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { SectionLink } from "../components/text/SectionLink.tsx";
import TimeAgo from "../islands/TimeAgo.tsx";
import { t } from "../utils/i18n.tsx";
import { humanizeMmSs } from "../utils/string.ts";
import * as colors from "twind/colors";
import type { IOkrs } from "../utils/data.ts";
import {
  getOkrs,
  getEvents,
  getProjects,
  getTravel,
  getBlogPosts,
  getBooks,
  getLifeEvents,
  getPress,
  getVideos,
  getRepos,
} from "../utils/data.ts";

interface HomeData {
  okrs: IOkrs;
  timeline: (
    | {
        type: "event";
        date: string;
        title: string;
        location: string;
        emoji: string;
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
        words: number;
      }
    | {
        type: "book";
        date: string;
        title: string;
        authors: string[];
        image: string;
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
        city: string;
        country: string;
        img: string;
        publisher: string;
        duration: string;
      }
    | {
        type: "award";
        date: string;
        title: string;
        publisher: string;
      }
    | {
        type: "travel";
        date: string;
        title: string;
        assets: string[];
      }
    | {
        type: "podcast-interview";
        date: string;
        title: string;
        publisher: string;
        embed?: string;
      }
    | {
        type: "press-feature";
        date: string;
        title: string;
        href: string;
        publisher: string;
        author?: string;
        description?: string;
      }
    | {
        type: "open-source-project";
        date: string;
        title: string;
        href: string;
        language?: string;
        languageColor?: string;
        stars: number;
        issues: number;
        forks: number;
        watchers: number;
        description?: string;
      }
  )[];
}

const categoryData: Record<
  HomeData["timeline"][0]["type"],
  { color: keyof typeof colors; icon: string; prefix: string }
> = {
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
  async GET(_req, ctx) {
    const { awards, podcasts, features } = await getPress();
    const props = {
      okrs: await getOkrs(),
      timeline: [
        ...(await getEvents()).map(
          (event) =>
            ({
              type: "event",
              title: event.name,
              date: event.date,
              location: [event.venue, event.city].filter((i) => !!i).join(", "),
              emoji: event.emoji,
            } as const)
        ),
        ...(await getProjects()).map(
          (project) =>
            ({
              type: "project",
              title: project.title,
              date: project.date,
            } as const)
        ),
        ...(await getBlogPosts()).map(
          (post) =>
            ({
              type: "blog-post",
              title: post.title,
              date: post.date,
              words: post.words,
            } as const)
        ),
        ...(await getBooks())
          .filter(({ state }) => state == "completed")
          .map(
            (book) =>
              ({
                type: "book",
                title: book.title,
                image: book.image,
                authors: book.authors,
                date: book.startedAt,
              } as const)
          ),
        ...(await getLifeEvents()).map(
          (event) =>
            ({
              type: "life-event",
              title: event.title,
              date: event.date,
              description: event.description,
            } as const)
        ),
        ...(await getVideos()).map(
          (video) =>
            ({
              type: "video",
              date: video.date,
              title: video.title,
              city: video.city,
              country: video.country,
              img: video.img,
              publisher: video.publisher,
              duration: video.duration,
            } as const)
        ),
        ...(await getTravel()).map(
          (place) =>
            ({
              type: "travel",
              date: place.date,
              title: place.title,
              assets: place.assets,
            } as const)
        ),
        ...awards.map(
          (award) =>
            ({
              type: "award",
              title: award.title,
              date: award.date,
              publisher: award.publisher,
            } as const)
        ),
        ...podcasts.map(
          (interview) =>
            ({
              type: "podcast-interview",
              title: interview.title,
              date: interview.date,
              embed: interview.embed,
              publisher: interview.publisher,
            } as const)
        ),
        ...features.map(
          (article) =>
            ({
              type: "press-feature",
              href: article.href,
              title: article.title,
              date: article.date,
              publisher: article.publisher,
              author: article.author,
              description: article.description,
            } as const)
        ),
        ...(await getRepos()).map(
          (repo) =>
            ({
              type: "open-source-project",
              href: repo.html_url,
              title: repo.full_name,
              date: repo.created_at,
              description: repo.description,
              stars: repo.stargazers_count,
              issues: repo.open_issues,
              forks: repo.forks_count,
              watchers: repo.watchers_count,
              language: repo.language,
              languageColor: repo.language_color,
            } as const)
        ),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    };
    return ctx.render(props);
  },
};

export default function Home({ data }: PageProps<HomeData>) {
  const okrYear = data.okrs.years.sort((a, b) => b.name - a.name)[0];
  const okrQuarter = okrYear.quarters.sort((a, b) => b.name - a.name)[1]; // Change to [0]

  return (
    <Layout>
      <div class={tw`max-w-screen-md px-4 mx-auto space-y-16 md:px-0`}>
        <section className={tw`grid-cols-2 gap-8 sm:grid`}>
          <div className={tw`mb-6 sm:mb-0`}>
            <img
              alt=""
              src="https://place-hold.it/500x375"
              className={tw`w-full rounded`}
            />
          </div>
          <div className={tw`space-y-4`}>
            <h2 className={tw`space-x-1 text-2xl font-semibold font-display`}>
              <span className="wave" aria-hidden="true">
                👋
              </span>
              <span>{" Hi, I'm Anand"}</span>
            </h2>
            <p className={tw`text-lg text-gray-500`}>
              {t(
                "I'm a creative technologist and entrepreneur, currently working remotely as the co-founder and CTO of <0>Pabio</0>, a rent-to-own furniture company in Europe.",
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
        <section className={tw`space-y-4`}>
          <h2 className={tw`space-x-1 text-2xl font-semibold font-display`}>
            <span aria-hidden="true">📊</span>
            <span>{` OKRs for Q${okrQuarter.name} ${okrYear.name}`}</span>
          </h2>
          <p className={tw`text-gray-500`}>
            {t(
              "I use <0>Objectives and Key Results</0> both for my personal and professional life. This data is available on <1>GitHub</1> and was last updated <2></2>.",
              {},
              [
                ({ children }: { children: ComponentChildren }) => (
                  <strong children={children} />
                ),
                ({ children }: { children: ComponentChildren }) => (
                  <ExternalLink
                    href="https://github.com/AnandChowdhary/okrs"
                    className={tw`underline`}
                    children={children}
                  />
                ),
                () => <TimeAgo date={data.okrs.updatedAt} />,
              ]
            )}
          </p>
          <div className={tw`space-y-3`}>
            {okrQuarter.objectives.map(({ name, success, key_results }) => (
              <details key={name} className={tw`appearance-none`}>
                <summary
                  className={tw`flex flex-col px-4 py-2 bg-white rounded-lg shadow-sm`}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${
                      orange[400]
                    } ${Math.round(success * 100)}%, white ${
                      Math.round(success * 100) + 0.01
                    }%)`,
                    backgroundSize: "100% 0.1rem",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left bottom",
                  }}
                >
                  <div className={tw`flex justify-between`}>
                    <div className={tw`flex items-center space-x-2`}>
                      <div>{name}</div>
                      <svg
                        className={`${tw`text-gray-400`} rotate-on-open`}
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    <div className={tw`text-gray-500`}>
                      {Math.round(success * 100)}%
                    </div>
                  </div>
                </summary>
                <div className={tw`mx-4 mb-4 space-y-1`}>
                  {key_results.map(({ name, success }) => (
                    <div
                      key={name}
                      className={tw`flex justify-between px-4 py-2 bg-white rounded-lg shadow-sm`}
                      style={{
                        backgroundImage: `linear-gradient(to right, ${
                          orange[400]
                        } ${Math.round(success * 100)}%, white ${
                          Math.round(success * 100) + 0.01
                        }%)`,
                        backgroundSize: "100% 0.1rem",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "left bottom",
                      }}
                    >
                      <div>
                        {t(name.replace(/\[redacted\]/g, "<0></0>"), {}, [
                          () => (
                            <span
                              className={tw`relative px-2 py-1 text-xs font-medium tracking-widest uppercase`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={tw`absolute top-0 left-0 w-full h-full rounded-sm pointer-events-none`}
                              >
                                <filter id="noiseFilter">
                                  <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.65"
                                    numOctaves="3"
                                    stitchTiles="stitch"
                                  />
                                </filter>

                                <rect
                                  width="100%"
                                  height="100%"
                                  filter="url(#noiseFilter)"
                                />
                              </svg>
                              <span>Redacted</span>
                            </span>
                          ),
                        ])}
                      </div>
                      <div className={tw`text-gray-500`}>
                        {Math.round(success * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <SectionLink label="See past OKRs" href="/life/okrs" />
        </section>
        <section className={tw`space-y-4`}>
          <h2 className={tw`text-2xl font-semibold font-display`}>Changelog</h2>
          <p className={tw`text-gray-500`}>
            {"The latest from my desk, curated from different sources."}
          </p>
          <div className={tw`relative space-y-8`}>
            <div
              className={tw`absolute top-0 w-1 bg-orange-200 bottom-6 left-4`}
            />
            {data.timeline.map((item, index) => (
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
                      <h3 className={tw`mb-8 text-xl font-semibold`}>
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
                            <use
                              href={`#${categoryData[item.type].icon}`}
                            ></use>
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
                        <p>{`by ${item.authors.join(", ")}`}</p>
                      )}
                      {item.type === "blog-post" && (
                        <p
                          className={tw`text-gray-500`}
                        >{`Reading time: ${humanizeMmSs(
                          String(item.words / 250)
                        )}`}</p>
                      )}
                      {item.type === "event" && (
                        <p className={tw`text-gray-500`}>
                          <span className={tw`mr-1`}>{item.emoji}</span>
                          <span>{` ${item.location}`}</span>
                        </p>
                      )}
                      {item.type === "podcast-interview" && (
                        <p className={tw`text-gray-500`}>{item.publisher}</p>
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
                                item.author
                                  ? `by <0>${item.author}</0> for `
                                  : ""
                              } ${item.publisher}`.trim(),
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
                        >{`Awarded by ${item.publisher}`}</p>
                      )}
                      {item.type === "video" && (
                        <ul className={tw`text-gray-500`}>
                          <li>{`${item.publisher}, ${item.city}`}</li>
                          <li>{`Watch time: ${humanizeMmSs(
                            item.duration
                          )}`}</li>
                        </ul>
                      )}
                      {"description" in item && item.description && (
                        <p className={tw`text-gray-500`}>{item.description}</p>
                      )}
                      {item.type === "open-source-project" && (
                        <ul className={tw`flex space-x-4`}>
                          {item.language && (
                            <li className={tw`flex items-center space-x-1`}>
                              <svg
                                aria-hidden="true"
                                width="1em"
                                height="1em"
                                style={{ color: item.languageColor ?? "#aaa" }}
                              >
                                <use href="#circle"></use>
                              </svg>
                              <span>{item.language}</span>
                            </li>
                          )}
                          <li className={tw`flex items-center space-x-1`}>
                            <svg aria-hidden="true" width="1em" height="1em">
                              <use href="#star"></use>
                            </svg>
                            <span>
                              {t(
                                `<0>${item.stars.toLocaleString()}</0> stars`,
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
                          <li className={tw`flex items-center space-x-1`}>
                            <svg aria-hidden="true" width="1em" height="1em">
                              <use href="#watchers"></use>
                            </svg>
                            <span>
                              {t(
                                `<0>${item.watchers.toLocaleString()}</0> watchers`,
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
                          <li className={tw`flex items-center space-x-1`}>
                            <svg aria-hidden="true" width="1em" height="1em">
                              <use href="#forks"></use>
                            </svg>
                            <span>
                              {t(
                                `<0>${item.forks.toLocaleString()}</0> forks`,
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
                      {"embed" in item && item.embed && (
                        <div className={tw`pt-2`}>
                          <iframe
                            src={item.embed}
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
                          item.image.split("//")[1]
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
                              item.img.split("//")[1]
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
    </Layout>
  );
}