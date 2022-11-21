import { Handlers, PageProps } from "$fresh/server.ts";
import { Timeline } from "../../../components/data/Timeline.tsx";
import { fetchJson } from "../../../utils/data.tsx";
import { Timeline as ITimeline } from "../../../utils/interfaces.ts";

interface ArchiveData {
  timeline: ITimeline;
  year: number;
  query: string;
  nextYear?: string;
  previousYear?: string;
}

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const timeline = await fetchJson<ITimeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );

    const year = Number(context.params.year);
    const props = {
      year,
      timeline: year
        ? timeline.filter(({ date }) => new Date(date).getFullYear() === year)
        : timeline,
      previousYear: timeline
        .find(({ date }) => new Date(date).getUTCFullYear() < year)
        ?.date?.substring(0, 4),
      nextYear: [...timeline]
        .reverse()
        .find(({ date }) => new Date(date).getUTCFullYear() > year)
        ?.date?.substring(0, 4),
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { timeline, year, query, nextYear, previousYear } = data;
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-12 md:px-0">
      <nav>
        <ol className="flex flex-wrap breadcrumbs">
          <li className="hidden">
            <a href="/">Anand Chowdhary</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ol>
      </nav>
      <section className="space-y-4">
        {timeline.length > 0 && (
          <header className="grid grid-cols-3">
            <div className="text-left">
              {previousYear && (
                <a href={`/blog/${previousYear}`}>{`← ${previousYear}`}</a>
              )}
            </div>
            <h1 className="space-x-2 text-2xl font-semibold text-center font-display">
              <span>{year}</span>
            </h1>
            <div className="text-right">
              {nextYear && <a href={`/blog/${nextYear}`}>{`${nextYear} →`}</a>}
            </div>
          </header>
        )}
        <Timeline
          hideYearHeading={year !== undefined}
          timeline={timeline.filter(({ type }) => type === "blog-post")}
          query={query}
          hasMoreHref={previousYear ? `/blog/${previousYear}` : undefined}
          hasMoreLabel={previousYear}
          y
        />
      </section>
    </div>
  );
}
