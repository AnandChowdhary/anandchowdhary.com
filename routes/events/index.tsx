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
        title="Events"
        description="From time to time, I speak at startup events and technical conferences about engineering, design, and entrepreneurship."
      >
        <p>
          My speaking engagements, like all sections of this site, are open
          source and available on{" "}
          <ExternalLink href="https://github.com/AnandChowdhary/events">
            GitHub
          </ExternalLink>{" "}
          as raw markdown files. Slides from my talks are available on{" "}
          <ExternalLink href="https://speakerdeck.com/anandchowdhary">
            Speaker Deck
          </ExternalLink>
          .
        </p>
      </SectionTitle>
      <Timeline
        timeline={timeline}
        show={timeline.filter(({ type }) => type === "event")}
        query={query}
        yearHrefPrefix="/events"
      />
    </div>
  );
}
