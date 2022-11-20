import { Handlers, PageProps } from "$fresh/server.ts";
import { LoadError } from "../../components/text/LoadError.tsx";
import { Timeline } from "../../components/data/Timeline.tsx";
import { fetchJson } from "../../utils/data.tsx";
import { getFlagUrl } from "../../utils/urls.ts";
import {
  LocationApiResult,
  Timeline as ITimeline,
} from "../../utils/interfaces.ts";

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
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <section className="space-y-4">
        <h1 class="font-semibold text-3xl">Travel</h1>
        <section className="grid-cols-1 gap-8 gap-y-12 sm:grid">
          <article className="space-y-4">
            <header>
              <h2 className="text-xl font-semibold font-display">{`${countries.length.toLocaleString()} countries`}</h2>
            </header>
            <div class="flex justify-between space-x-3">
              {countries
                .filter((code) => code != null)
                .map((code) => (
                  <div key={code} class="w-full">
                    <img
                      alt=""
                      src={getFlagUrl(code ?? "")}
                      class="rounded-sm w-full"
                    />
                  </div>
                ))}
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
        <Timeline hideFilters timeline={travel} query={query} />
      </section>
    </div>
  );
}
