/** @jsx h */
import { h, ComponentChildren } from "preact";
import { orange } from "twind/colors";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Layout } from "../components/layout/Layout.tsx";
import { ExternalLink } from "../components/text/ExternalLink.tsx";
import { SectionLink } from "../components/text/SectionLink.tsx";
import { t } from "../utils/i18n.tsx";

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
}

export const handler: Handlers<HomeData> = {
  async GET(_req, ctx) {
    const okrs = (await (
      await fetch("https://anandchowdhary.github.io/okrs/api.json")
    ).json()) as HomeData["okrs"];
    return ctx.render({ okrs });
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
              I'm a creative technologist and entrepreneur, currently working
              remotely as the co-founder and CTO of Pabio, a rent-to-own
              furniture company in Europe.
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
                    ).toLocaleDateString("en-US", { dateStyle: "long" })}`}
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
      </div>
    </Layout>
  );
}
