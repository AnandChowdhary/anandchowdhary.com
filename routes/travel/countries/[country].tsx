import { Handlers, PageProps } from "$fresh/server.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { Timeline as ITimeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../../components/data/SectionTitle.tsx";
import { Timeline } from "../../../components/data/Timeline.tsx";
import { fetchJson } from "../../../utils/data.tsx";
import { countryName } from "../../../utils/string.ts";

interface ArchiveData {
  timeline: ITimeline;
  country: string;
  query: string;
}

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const timeline = await fetchJson<ITimeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );

    const country = context.params.country;
    const props = {
      country,
      timeline: country
        ? timeline.filter(
            ({ data, type }) =>
              type === "travel" &&
              data &&
              slugify(countryName(data.country!.name), { lower: true }) ===
                slugify(countryName(country), { lower: true })
          )
        : timeline,
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { timeline, query, country } = data;
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs
        items={[
          { href: "/travel", title: "Travel" },
          { href: `/travel/${country}`, title: country.toString() },
        ]}
      />
      <SectionTitle title={country.toString()} />
      <Timeline
        timeline={timeline}
        show={timeline}
        query={query}
        yearHrefPrefix="/travel"
        hideYearHeading
      />
    </div>
  );
}
