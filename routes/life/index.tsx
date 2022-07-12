/** @jsx h */
import { h, ComponentChildren } from "preact";
import { orange } from "twind/colors";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ExternalLink } from "../../components/text/ExternalLink.tsx";
import { SectionLink } from "../../components/text/SectionLink.tsx";
import TimeAgo from "../../islands/TimeAgo.tsx";
import { t } from "../../utils/i18n.tsx";
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
  languages: {
    updatedAt: string;
    data: { name: string; duration: string; percent: number }[];
  };
  music: {
    updatedAt: string;
    data: { name: string; plays: number; percent: number }[];
  };
  productivity: {
    updatedAt: string;
    data: { date: string; pulse: number; duration: string }[];
  };
  contributionsGraph: string;
}

export const handler: Handlers<HomeData> = {
  async GET(_req, ctx) {
    const okrs = (await (
      await fetch("https://anandchowdhary.github.io/okrs/api.json")
    ).json()) as HomeData["okrs"];
    const lastWeekCode = await (
      await (
        await fetch(
          "https://gist.githubusercontent.com/AnandChowdhary/e5e2ae3ca3bf2ae1a36a1a113045e7de/raw"
        )
      ).blob()
    ).text();
    const lastWeekCodeData = (await (
      await fetch(
        "https://api.github.com/gists/e5e2ae3ca3bf2ae1a36a1a113045e7de"
      )
    ).json()) as { id: string; created_at: string; updated_at: string };
    const languages: HomeData["languages"] = {
      data: lastWeekCode.split("\n").map((line) => {
        return {
          name: line.match("[A-Za-z]+")?.[0] ?? "",
          duration: line.match("[0-9]+ hrs? [0-9]+ min?")?.[0] ?? "",
          percent:
            parseInt(line.match("[0-9]+ hrs? [0-9]+ min?")?.[0] ?? "0") /
            lastWeekCode
              .split("\n")
              .map((line) =>
                parseInt(line.match("[0-9]+ hrs? [0-9]+ min?")?.[0] ?? "0")
              )
              .reduce((a, b) => a + b, 0),
        };
      }),
      updatedAt: lastWeekCodeData.updated_at,
    };
    const lastWeekMusic = await (
      await (
        await fetch(
          "https://gist.githubusercontent.com/AnandChowdhary/14a66f452302d199c4abde0ffe891922/raw"
        )
      ).blob()
    ).text();
    const lastWeekMusicData = (await (
      await fetch(
        "https://api.github.com/gists/14a66f452302d199c4abde0ffe891922"
      )
    ).json()) as { id: string; created_at: string; updated_at: string };
    const music: HomeData["music"] = {
      data: lastWeekMusic.split("\n").map((line) => {
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
            lastWeekMusic
              .split("\n")
              .map((line) =>
                parseInt(line.replace(" plays", "").split(" ").pop() ?? "0")
              )
              .reduce((a, b) => a + b, 0),
        };
      }),
      updatedAt: lastWeekMusicData.updated_at,
    };
    const rescueTimeData = (await (
      await fetch(
        `https://www.rescuetime.com/anapi/daily_summary_feed?restrict_begin=2022-06-25&restrict_end=2022-07-02&key=${Deno.env.get(
          "RESCUETIME_API_KEY"
        )}`
      )
    ).json()) as {
      id: string;
      date: string;
      productivity_pulse: number;
      total_duration_formatted: string;
    }[];
    const contributionsGraph =
      `<svg viewbox="0 0 717 112" class="js-calendar-graph-svg">` +
      (
        await (
          await (
            await fetch("https://github.com/users/AnandChowdhary/contributions")
          ).blob()
        ).text()
      )
        .split(
          `<svg width="717" height="112" class="js-calendar-graph-svg">`
        )[1]
        .split("</svg>")[0] +
      "</svg>";
    return ctx.render({
      okrs,
      languages,
      music,
      contributionsGraph,
      productivity: {
        updatedAt: new Date().toISOString(),
        data: rescueTimeData.slice(0, 5).map((item) => ({
          date: item.date,
          pulse: item.productivity_pulse,
          duration: item.total_duration_formatted,
        })),
      },
    });
  },
};

export default function Home({ data }: PageProps<HomeData>) {
  const okrYear = data.okrs.years.sort((a, b) => b.name - a.name)[0];
  const okrQuarter = okrYear.quarters.sort((a, b) => b.name - a.name)[1]; // Change to [0]

  return (
    <div class={tw`max-w-screen-md px-4 mx-auto space-y-16 md:px-0`}>
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
        <h2 className={tw`space-x-1 text-2xl font-semibold font-display`}>
          <span aria-hidden="true">👨‍💻</span>
          <span>{" Last year in contributions"}</span>
        </h2>
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
        <div dangerouslySetInnerHTML={{ __html: data.contributionsGraph }} />
        <SectionLink label="See my GitHub profile" href="/life/okrs" />
      </section>
      <div className={tw`grid-cols-2 gap-8 sm:grid`}>
        <section className={tw`space-y-4`}>
          <header className={tw`space-y-1`}>
            <h2 className={tw`space-x-1 text-2xl font-semibold font-display`}>
              <span aria-hidden="true">💻</span>
              <span>{" Last week in productivity"}</span>
            </h2>
            <p className={tw`text-gray-500`}>
              Last updated <TimeAgo date={data.productivity.updatedAt} />
            </p>
          </header>
          <div className={tw`space-y-2`}>
            {data.productivity.data.slice(0, 5).map((language) => (
              <div
                key={language.date}
                className={tw`flex bg-white rounded-lg shadow-sm`}
                style={{
                  backgroundImage: `linear-gradient(to right, ${
                    orange[400]
                  } ${Math.round(language.pulse)}%, white ${
                    Math.round(language.pulse) + 0.01
                  }%)`,
                  backgroundSize: "100% 0.1rem",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                }}
              >
                <div
                  className={tw`flex items-center justify-between flex-grow h-12 px-4`}
                >
                  <div>
                    {new Date(language.date).toLocaleDateString("en-US", {
                      dateStyle: "long",
                    })}
                  </div>
                  <div
                    className={tw`text-gray-500`}
                  >{`${language.pulse}%`}</div>
                </div>
              </div>
            ))}
          </div>
          <SectionLink label="See past scores" href="/life/productivity" />
        </section>
        <section className={tw`space-y-4`}>
          <SectionLink label="See more music data" href="/life/okrs" />
        </section>
      </div>
      <div className={tw`grid-cols-2 gap-8 sm:grid`}>
        <section className={tw`space-y-4`}>
          <header className={tw`space-y-1`}>
            <h2 className={tw`space-x-1 text-2xl font-semibold font-display`}>
              <span aria-hidden="true">💻</span>
              <span>{" Last week in code"}</span>
            </h2>
            <p className={tw`text-gray-500`}>
              Last updated <TimeAgo date={data.languages.updatedAt} />
            </p>
          </header>
          <div className={tw`space-y-2`}>
            {data.languages.data.slice(0, 5).map((language) => (
              <div
                key={language.name}
                className={tw`flex bg-white rounded-lg shadow-sm`}
                style={{
                  backgroundImage: `linear-gradient(to right, ${
                    orange[400]
                  } ${Math.round(language.percent * 100)}%, white ${
                    Math.round(language.percent * 100) + 0.01
                  }%)`,
                  backgroundSize: "100% 0.1rem",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                }}
              >
                <div
                  className={tw`flex items-center justify-between flex-grow h-12 px-4`}
                >
                  <div>{language.name}</div>
                  <div className={tw`text-gray-500`}>{language.duration}</div>
                </div>
              </div>
            ))}
          </div>
          <SectionLink label="See more code data" href="/life/okrs" />
        </section>
        <section className={tw`space-y-4`}>
          <header className={tw`space-y-1`}>
            <h2 className={tw`space-x-1 text-2xl font-semibold font-display`}>
              <span aria-hidden="true">🎵</span>
              <span>{" Last week in music"}</span>
            </h2>
            <p className={tw`text-gray-500`}>
              Last updated <TimeAgo date={data.music.updatedAt} />
            </p>
          </header>
          <div className={tw`space-y-2`}>
            {data.music.data.slice(0, 5).map((artist) => (
              <div
                key={artist.name}
                className={tw`flex bg-white rounded-lg shadow-sm`}
                style={{
                  backgroundImage: `linear-gradient(to right, ${
                    orange[400]
                  } ${Math.round(artist.percent * 100)}%, white ${
                    Math.round(artist.percent * 100) + 0.01
                  }%)`,
                  backgroundSize: "100% 0.1rem",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "3rem 100%",
                }}
              >
                <div className={tw`min-w-12`}>
                  <img
                    alt=""
                    src={`https://images.weserv.nl/?&maxage=1y&url=${encodeURIComponent(
                      `tse2.mm.bing.net/th?q=${encodeURIComponent(
                        artist.name
                      )}&w=100&h=100&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate`
                    )}&w=100&h=100&fit=cover`}
                    width={100}
                    height={100}
                    loading="lazy"
                    className={tw`object-cover w-12 h-full rounded-l-lg`}
                  />
                </div>
                <div
                  className={tw`flex items-center justify-between flex-grow h-12 px-4`}
                >
                  <div>{artist.name}</div>
                  <div className={tw`text-gray-500`}>{`${artist.plays} ${
                    artist.plays === 1 ? "play" : "plays"
                  }`}</div>
                </div>
              </div>
            ))}
          </div>
          <SectionLink label="See more music data" href="/life/okrs" />
        </section>
      </div>
    </div>
  );
}
