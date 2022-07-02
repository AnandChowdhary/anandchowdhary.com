/** @jsx h */
import { h, ComponentChildren, Fragment } from "preact";
import { orange } from "twind/colors";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Layout } from "../components/layout/Layout.tsx";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { SectionLink } from "../components/text/SectionLink.tsx";
import { t } from "../utils/i18n.tsx";
import { humanizeMmSs } from "../utils/string.ts";
import * as colors from "twind/colors";

interface HomeData {
  okrs: {
    updatedAt: string;
    years: {
      name: number;
      progress: number;
      success: number;
      quarters: {
        name: number;
        progress: number;
        success: number;
        objectives: {
          name: string;
          progress: number;
          success: number;
          key_results: {
            name: string;
            target_result: number;
            current_result: number;
            progress: number;
            success: number;
          }[];
        }[];
      }[];
    }[];
  };
  timeline: (
    | {
        type: "event";
        date: string;
        title: string;
        location: string;
        emoji: string;
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
        publisher: string;
        author?: string;
        description?: string;
      }
  )[];
}

const categoryData: Record<
  HomeData["timeline"][0]["type"],
  { color: keyof typeof colors; icon: string; prefix: string }
> = {
  "blog-post": {
    color: "blue",
    icon: "book-open",
    prefix: "Wrote a blog post",
  },
  event: { color: "cyan", icon: "podium", prefix: "Spoke at an event" },
  book: { color: "indigo", icon: "book-open", prefix: "Finished a book" },
  "life-event": { color: "lime", icon: "alarm", prefix: "Life milestone" },
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
    color: "rose",
    icon: "microphone",
    prefix: "Featured in a podcast",
  },
  "press-feature": {
    color: "teal",
    icon: "newspaper",
    prefix: "Featured in the press",
  },
};

export const handler: Handlers<HomeData> = {
  async GET(_req, ctx) {
    const okrs = (await (
      await fetch("https://anandchowdhary.github.io/okrs/api.json")
    ).json()) as HomeData["okrs"];
    const events = (await (
      await fetch("https://anandchowdhary.github.io/events/api.json")
    ).json()) as {
      slug: string;
      name: string;
      date: string;
      emoji: string;
      venue: string;
      city: string;
    }[];
    const blog = (await (
      await fetch(
        "https://raw.githubusercontent.com/AnandChowdhary/blog/HEAD/api.json"
      )
    ).json()) as {
      slug: string;
      title: string;
      words: number;
      date: string;
    }[];
    const books = (await (
      await fetch(
        "https://raw.githubusercontent.com/AnandChowdhary/books/HEAD/api.json"
      )
    ).json()) as {
      title: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      image: string;
      issueNumber: number;
      progressPercent: number;
      state: "reading" | "completed";
      startedAt: string;
    }[];
    const lifeEvents = JSON.parse(
      await Deno.readTextFile("./data/life-events.json")
    ) as {
      date: string;
      title: string;
      description?: string;
    }[];
    const press = JSON.parse(await Deno.readTextFile("./data/press.json")) as {
      awards: {
        title: string;
        publisher: string;
        date: string;
        href: string;
      }[];
      podcasts: {
        title: string;
        publisher: string;
        date: string;
        href: string;
        embed?: string;
      }[];
      features: {
        title: string;
        publisher: string;
        date: string;
        href: string;
        author?: string;
        description?: string;
      }[];
    };
    const videos = JSON.parse(
      await Deno.readTextFile("./data/videos.json")
    ) as {
      title: string;
      href: string;
      city: string;
      country: string;
      date: string;
      img: string;
      publisher: string;
      duration: string;
      description: string;
    }[];
    return ctx.render({
      okrs,
      timeline: [
        ...events.map(
          (event) =>
            ({
              type: "event",
              title: event.name,
              date: event.date,
              location: [event.venue, event.city].filter((i) => !!i).join(", "),
              emoji: event.emoji,
            } as const)
        ),
        ...blog.map(
          (post) =>
            ({
              type: "blog-post",
              title: post.title,
              date: post.date,
              words: post.words,
            } as const)
        ),
        ...books
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
        ...lifeEvents.map(
          (event) =>
            ({
              type: "life-event",
              title: event.title,
              date: event.date,
              description: event.description,
            } as const)
        ),
        ...videos.map(
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
        ...press.awards.map(
          (event) =>
            ({
              type: "award",
              title: event.title,
              date: event.date,
              publisher: event.publisher,
            } as const)
        ),
        ...press.podcasts.map(
          (event) =>
            ({
              type: "podcast-interview",
              title: event.title,
              date: event.date,
              embed: event.embed,
              publisher: event.publisher,
            } as const)
        ),
        ...press.features.map(
          (article) =>
            ({
              type: "press-feature",
              title: article.title,
              date: article.date,
              publisher: article.publisher,
              author: article.author,
              description: article.description,
            } as const)
        ),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    });
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
              <span className="wave">👋</span>
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
          <h2
            className={tw`text-2xl font-semibold font-display`}
          >{`OKRs for Q${okrQuarter.name} ${okrYear.name}`}</h2>
          <p className={tw`text-gray-500`}>
            {t(
              "I use <0>Objectives and Key Results</0> both for my personal and professional life. These numbers are updated <1>weekly</1> and are open source, available on <2>GitHub</2>.",
              {},
              [
                ({ children }: { children: ComponentChildren }) => (
                  <strong children={children} />
                ),
                ({ children }: { children: ComponentChildren }) => (
                  <span
                    title={`Last updated on ${new Date(
                      data.okrs.updatedAt
                    ).toLocaleDateString("en-US", { dateStyle: "full" })}`}
                    className={tw`border-b border-gray-500 border-dotted`}
                    children={children}
                  />
                ),
                ({ children }: { children: ComponentChildren }) => (
                  <ExternalLink
                    href="https://github.com/AnandChowdhary/okrs"
                    className={tw`underline`}
                    children={children}
                  />
                ),
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
                    backgroundPosition: "bottom left",
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
                        backgroundPosition: "bottom left",
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
              className={tw`absolute top-0 w-1 h-full bg-orange-200 left-4`}
            />
            {data.timeline.map((item) => (
              <article key={item.title} className={tw`flex`}>
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
                    <h3 className={tw`text-lg font-medium leading-6`}>
                      {item.title}
                    </h3>
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
                      <p className={tw`text-gray-500`}>
                        {`${item.author ? `by ${item.author} for ` : ""} ${
                          item.publisher
                        }`.trim()}
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
                        <li>{`Watch time: ${humanizeMmSs(item.duration)}`}</li>
                      </ul>
                    )}
                    {"description" in item && item.description && (
                      <p className={tw`text-gray-500`}>{item.description}</p>
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
                <div className={tw`ml-6 shrink-0`}>
                  {item.type === "book" ? (
                    <img
                      alt=""
                      src={`https://images.weserv.nl/?url=${encodeURIComponent(
                        item.image.split("//")[1]
                      )}&w=300&h=450&fit=cover`}
                      loading="lazy"
                      className={tw`w-24 rounded-lg`}
                    />
                  ) : (
                    item.type === "video" && (
                      <img
                        alt=""
                        src={`https://images.weserv.nl/?url=${encodeURIComponent(
                          item.img.split("//")[1]
                        )}&w=700&h=450&fit=cover`}
                        loading="lazy"
                        className={tw`w-48 rounded-lg`}
                      />
                    )
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
