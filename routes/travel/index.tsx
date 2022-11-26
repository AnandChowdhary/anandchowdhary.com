import { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { SectionTitle } from "../../components/data/SectionTitle.tsx";
import { Timeline } from "../../components/data/Timeline.tsx";
import { ExternalLink } from "../../components/text/ExternalLink.tsx";
import { fetchJson } from "../../utils/data.tsx";
import {
  LocationApiResult,
  Timeline as ITimeline,
} from "../../utils/interfaces.ts";
import { getFlagUrl } from "../../utils/urls.ts";

interface ArchiveData {
  timeline: ITimeline;
  query: string;
  summary: Record<string, number>;
}

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const [timeline, history] = await Promise.all([
      fetchJson<ITimeline>(
        "https://anandchowdhary.github.io/everything/api.json"
      ),
      fetchJson<LocationApiResult[]>(
        "https://raw.githubusercontent.com/AnandChowdhary/location/gh-pages/history.json"
      ),
    ]);
    const summary: Record<string, number> = {};
    history.forEach((item) => {
      const year = new Date(item.updatedAt).getUTCFullYear();
      summary[year] = summary[year] ? summary[year] + 1 : 1;
    });
    const props = {
      timeline,
      summary,
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { timeline, query } = data;
  const travel = timeline.filter(({ type }) => type === "travel");
  const countries = Array.from(
    new Set(
      [...travel]
        .reverse()
        .map((i) =>
          typeof i.data?.country === "object"
            ? i.data?.country?.code?.toLowerCase()
            : undefined
        )
    )
  );

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <SectionTitle
        title="Travel"
        description="For over ten years, I've been tracking my location in real time. This page is a list of my trips to new cities and countries over the years."
      >
        <p>
          My trips, like all sections of this site, are open source and
          available on{" "}
          <ExternalLink href="https://github.com/AnandChowdhary/location">
            GitHub
          </ExternalLink>{" "}
          as raw markdown files.
        </p>
      </SectionTitle>
      <section className="grid-cols-1 gap-8 gap-y-12 sm:grid">
        <article className="space-y-4">
          <header>
            <h2 className="text-xl font-semibold font-display">{`${countries.length.toLocaleString()} countries`}</h2>
          </header>
          <div class="flex justify-between space-x-3">
            {countries
              .filter((code) => code != null)
              .map((code) => {
                const countryName = travel.find(
                  (item) => item.data.country.code === code
                ).data.country.name;
                return (
                  <a
                    href={`/travel/countries/${slugify(countryName, {
                      lower: true,
                    })}`}
                    key={code}
                    class="block w-full"
                  >
                    <img
                      alt={countryName}
                      src={getFlagUrl(code ?? "")}
                      class="rounded-sm w-full"
                    />
                  </a>
                );
              })}
          </div>
        </article>
        <article className="space-y-4">
          <header>
            <h2 className="text-xl font-semibold font-display">
              Travel metrics
            </h2>
          </header>
          <div class="flex relative -mx-2 h-64">
            {Object.entries(data.summary).map(([year, count]) => (
              <div key={year} class="flex-1 w-full flex items-end">
                <div class="w-full px-2 h-full flex flex-col justify-end">
                  <a
                    href={`/travel/${year}`}
                    aria-label={year}
                    class="rounded-lg relative overflow-hidden"
                    style={{
                      background: "#2dd4bf",
                      height: `${Math.round(
                        (100 * count) /
                          Math.max(
                            ...Object.values(data.summary ?? {}).map(
                              (x) => x ?? 0
                            )
                          )
                      )}%`,
                    }}
                  />
                  <div class="text-xs text-center mt-2 truncate">
                    <div>{year}</div>
                    <div>
                      <strong class="font-medium">{`${Number(
                        count
                      ).toLocaleString("en-US")} trip${
                        count === 1 ? "" : "s"
                      }`}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
      <Timeline
        timeline={timeline}
        show={travel}
        query={query}
        yearHrefPrefix="/travel"
      />
    </div>
  );
}
