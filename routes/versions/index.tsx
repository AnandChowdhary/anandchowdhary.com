import { Handlers, PageProps } from "$fresh/server.ts";
import { Timeline as ITimeline } from "https://esm.sh/timeline-types@9.0.0/index.d.ts";
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
      <SectionTitle
        title="Versions"
        description="Over the years, I've designed and redesigned my personal website several times; I ﬁnd it to be a great way to explore new technologies. Looking back, I can connect the dots for what I was interested in way back when."
      >
        <p>
          In fact, one of my first repositories on GitHub was my personal
          website,{" "}
          <ExternalLink href="https://github.com/AnandChowdhary/anandchowdhary.com">
            AnandChowdhary/anandchowdhary.com
          </ExternalLink>
          , where you can see the git history to track each version. The summary
          of these redesigns, like all sections of this site, are open source
          and available on{" "}
          <ExternalLink href="https://github.com/AnandChowdhary/versions">
            GitHub
          </ExternalLink>{" "}
          as raw markdown files.
        </p>
      </SectionTitle>
      <Timeline
        timeline={timeline}
        show={timeline.filter(({ type }) => type === "version")}
        query={query}
        yearHrefPrefix="/versions"
      />
    </div>
  );
}
