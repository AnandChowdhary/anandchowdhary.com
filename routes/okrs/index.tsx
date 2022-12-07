import { Handlers, PageProps } from "$fresh/server.ts";
import { Timeline as ITimeline } from "https://esm.sh/timeline-types@8.0.0/index.d.ts";
import { Breadcrumbs } from "../../components/data/Breadcrumbs.tsx";
import { SectionTitle } from "../../components/data/SectionTitle.tsx";
import { Timeline } from "../../components/data/Timeline.tsx";
import { ExternalLink } from "../../components/text/ExternalLink.tsx";
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
      <Breadcrumbs items={[{ href: "/okrs", title: "OKRs" }]} />
      <SectionTitle
        emoji="📊"
        title="Personal OKRs"
        description="I use Objectives and Key Results (the OKR framework) both for my personal and professional life."
      >
        <p>
          My OKRs and progress, like all sections of this site, are open source
          and available on{" "}
          <ExternalLink href="https://github.com/AnandChowdhary/okrs">
            GitHub
          </ExternalLink>{" "}
          as raw markdown files. All thumbnails are generated using Stable
          Diffusion.
        </p>
      </SectionTitle>
      <Timeline
        timeline={timeline}
        show={timeline.filter(({ type }) => type === "okr")}
        query={query}
        yearHrefPrefix="/okrs"
      />
    </div>
  );
}
