import { Handlers, PageProps } from "$fresh/server.ts";
import { Timeline as ITimeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { Timeline } from "../../../components/data/Timeline.tsx";
import { fetchJson } from "../../../utils/data.tsx";

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
  const { timeline, query, year, previousYear } = data;
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs
        items={[
          { href: "/okrs", title: "OKRs" },
          { href: `/okrs/${year}`, title: year.toString() },
        ]}
      />
      <SectionTitle title={year.toString()} />
      <Timeline
        timeline={timeline}
        show={timeline.filter(({ type }) => type === "okr")}
        query={query}
        yearHrefPrefix="/okrs"
        hideYearHeading
        hasMoreLabel={previousYear}
        hasMoreHref={`/okrs/${previousYear}`}
      />
    </div>
  );
}
