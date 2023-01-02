import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.1/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { TimelineTravel } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { Timeline } from "../../../components/data/Timeline.tsx";
import { fetchJson } from "../../../utils/data.tsx";

interface ArchiveData {
  locationHistory: Datapoint[];
  year: number;
  query: string;
  nextYear?: string;
  previousYear?: string;
}
export type Datapoint = TimelineTravel["data"] & {
  updatedAt: string;
  hash: string;
};
export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const year = Number(context.params.year);
    if (isNaN(year)) return context.renderNotFound();
    const locationHistory = await fetchJson<Datapoint[]>(
      "https://anandchowdhary.github.io/location/history.json"
    );
    const props = {
      year,
      locationHistory,
      previousYear: locationHistory
        .find(({ updatedAt }) => new Date(updatedAt).getUTCFullYear() < year)
        ?.updatedAt?.substring(0, 4),
      nextYear: [...locationHistory]
        .reverse()
        .find(({ updatedAt }) => new Date(updatedAt).getUTCFullYear() > year)
        ?.updatedAt?.substring(0, 4),
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { locationHistory, query, year, previousYear } = data;
  const timeline = locationHistory.map((item) => {
    return {
      type: "travel",
      url: `https://anandchowdhary.com/location/${new Date(
        item.updatedAt
      ).getUTCFullYear()}/${slugify(
        `${item.label} ${item.hash.substring(0, 7)}`,
        { lower: true }
      )}`,
      source: "https://anandchowdhary.github.io/location/history.json",
      title: item.label,
      date: item.updatedAt,
      data: item,
    } as TimelineTravel;
  });
  const show = timeline.filter((item) => {
    return new Date(item.date).getUTCFullYear() === year;
  });

  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs
        items={[
          { href: "/location", title: "Location" },
          { href: `/location/${year}`, title: year.toString() },
        ]}
      />
      <SectionTitle title={year.toString()} />
      <Timeline
        timeline={timeline}
        show={show}
        query={query}
        yearHrefPrefix="/location"
        hideYearHeading
        hasMoreLabel={previousYear}
        hasMoreHref={`/location/${previousYear}`}
      />
    </div>
  );
}
