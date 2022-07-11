/** @jsx h */
import { h } from "preact";
import type { FunctionComponent, ComponentChildren } from "preact";
import { tw } from "@twind";
import type { IOkrs } from "../../utils/data.ts";
import { orange } from "twind/colors";
import { ExternalLink } from "../text/ExternalLink.tsx";
import { SectionLink } from "../text/SectionLink.tsx";
import TimeAgo from "../../islands/TimeAgo.tsx";
import { t } from "../../utils/i18n.tsx";

export const OKRCards: FunctionComponent<{
  data: IOkrs;
}> = ({ data }) => {
  const okrYear = data.years.sort((a, b) => b.name - a.name)[0];
  const okrQuarter = okrYear.quarters.sort((a, b) => b.name - a.name)[1]; // Change to [0]

  return (
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
              <div className={tw`text-gray-500 pl-4`}>
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
                <div className={tw`text-gray-500 pl-4`}>
                  {Math.round(success * 100)}%
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
};

export const OKRs: FunctionComponent<{
  data: IOkrs;
}> = ({ data }) => {
  const okrYear = data.years.sort((a, b) => b.name - a.name)[0];
  const okrQuarter = okrYear.quarters.sort((a, b) => b.name - a.name)[1]; // Change to [0]

  return (
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
            () => <TimeAgo date={data.updatedAt} />,
          ]
        )}
      </p>
      <OKRCards data={data} />
      <SectionLink label="See past OKRs" href="/life/okrs" />
    </section>
  );
};