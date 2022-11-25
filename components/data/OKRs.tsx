import { TimelineOkr } from "https://esm.sh/timeline-types@7.0.0/index.d.ts";
import type { ComponentChildren, FunctionComponent } from "preact";
import { orange } from "twind/colors";
import TimeAgo from "../../islands/TimeAgo.tsx";
import { t } from "../../utils/i18n.tsx";
import { ExternalLink } from "../text/ExternalLink.tsx";
import { SectionLink } from "../text/SectionLink.tsx";

export const OKRCards: FunctionComponent<{
  okr: TimelineOkr;
}> = ({ okr }) => {
  const { data } = okr;

  return (
    <div class="space-y-3">
      {data.objectives.map(({ name, success, progress, key_results }) => (
        <details key={name} class="appearance-none">
          <summary
            class="flex flex-col px-4 py-2 bg-white rounded-lg shadow-sm"
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
            <div class="flex justify-between">
              <div class="flex items-center space-x-2">
                <div>{name}</div>
                <svg
                  class="text-gray-400 rotate-on-open"
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
              <div
                class="pl-4 text-gray-500"
                title={`${Math.round(success * 100)}% success, ${Math.round(
                  progress * 100
                )}% progress`}
              >
                {Math.round(success * 100)}%
              </div>
            </div>
          </summary>
          <div class="mx-4 mb-4 space-y-1">
            {key_results.map(({ name, success, progress }) => (
              <div
                key={name}
                class="flex justify-between px-4 py-2 bg-white rounded-lg shadow-sm"
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
                      <span class="relative px-2 py-1 text-xs font-medium tracking-widest uppercase">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="absolute top-0 left-0 w-full h-full rounded-sm pointer-events-none"
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
                <div
                  class="pl-4 text-gray-500"
                  title={`${Math.round(success * 100)}% success, ${Math.round(
                    progress * 100
                  )}% progress`}
                >
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
  okr: TimelineOkr;
}> = ({ okr }) => {
  const { title } = okr;

  return (
    <section class="space-y-4">
      <h2 class="space-x-1 text-2xl font-semibold font-display">
        <span aria-hidden="true">📊</span>
        <span>{` OKRs for ${title}`}</span>
      </h2>
      <p class="text-gray-500">
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
                class="underline"
                children={children}
              />
            ),
            () => <TimeAgo date={"2022-01-01"} />,
          ]
        )}
      </p>
      <OKRCards okr={okr} />
      <SectionLink label="See past OKRs" href="/okrs" />
    </section>
  );
};
