import { Handlers, PageProps } from "$fresh/server.ts";
import { Timeline as ITimeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
import { Breadcrumbs } from "../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../components/data/SectionTitle.tsx";
import { Timeline } from "../../components/data/Timeline.tsx";
import { fetchJson } from "../../utils/data.tsx";

interface ArchiveData {
  timeline: ITimeline;
  query: string;
}

export const handler: Handlers<ArchiveData> = {
  async GET(request, context) {
    const timeline = await fetchJson<ITimeline>(
      "https://anandchowdhary.github.io/everything/api.json"
    );

    const props = {
      timeline,
      query: new URL(request.url).search,
    };
    return context.render(props);
  },
};

export default function Archive({ data }: PageProps<ArchiveData>) {
  const { timeline, query } = data;
  return (
    <div class="max-w-screen-md px-4 mx-auto space-y-4 md:px-0">
      <Breadcrumbs items={[{ href: "/archive", title: "Archive" }]} />
      <SectionTitle title="Archive" />
      <Timeline
        timeline={timeline}
        show={timeline}
        query={query}
        yearHrefPrefix="/archive"
      />
    </div>
  );
}
